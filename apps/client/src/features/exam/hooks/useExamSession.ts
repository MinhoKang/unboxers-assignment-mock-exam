import { useEffect, useState } from "react";

/**
 * @description 시연 편의를 위해 대기/시험 시간을 축소한 임시 설정입니다.
 */
export const WAITING_TIME_SECONDS = 15;
export const EXAM_TIME_SECONDS = 20;

const TOTAL_SESSION_SECONDS = WAITING_TIME_SECONDS + EXAM_TIME_SECONDS;

/**
 * @description 시작 시각과 현재 시각 차이로 세션 단계와 남은 시간을 계산합니다.
 * @param startedAtMs 시험 세션이 시작된 시각(ms)입니다.
 * @param nowMs 현재 시각(ms)입니다.
 * @returns waiting/examining/finished 상태와 각 구간 기준 remainingTime, totalTime을 반환합니다.
 */
const getExamSessionState = (startedAtMs: number, nowMs: number) => {
  const elapsedSeconds = Math.floor((nowMs - startedAtMs) / 1000);

  if (elapsedSeconds < WAITING_TIME_SECONDS) {
    return {
      status: "waiting" as const,
      remainingTime: WAITING_TIME_SECONDS - elapsedSeconds,
      totalTime: WAITING_TIME_SECONDS,
    };
  }

  if (elapsedSeconds < TOTAL_SESSION_SECONDS) {
    return {
      status: "examining" as const,
      remainingTime: TOTAL_SESSION_SECONDS - elapsedSeconds,
      totalTime: EXAM_TIME_SECONDS,
    };
  }

  return {
    status: "finished" as const,
    remainingTime: 0,
    totalTime: EXAM_TIME_SECONDS,
  };
};

/**
 * @description 시험 세션의 대기 -> 진행 -> 종료 흐름을 시간 기반으로 구독하는 훅입니다.
 * @returns 현재 세션 status, 남은 시간, 현재 구간의 총 시간을 포함한 세션 상태입니다.
 */
export const useExamSession = () => {
  const [startedAtMs] = useState(() => Date.now());
  const [nowMs, setNowMs] = useState(() => startedAtMs);

  const sessionState = getExamSessionState(startedAtMs, nowMs);

  /**
   * @description 종료 전까지 현재 시각을 주기적으로 갱신해 countdown UI가 자연스럽게 줄어들도록 유지합니다.
   */
  useEffect(() => {
    if (sessionState.status === "finished") {
      return;
    }

    const timerId = globalThis.window.setInterval(() => {
      setNowMs(Date.now());
    }, 250);

    return () => {
      globalThis.window.clearInterval(timerId);
    };
  }, [sessionState.status]);

  return sessionState;
};
