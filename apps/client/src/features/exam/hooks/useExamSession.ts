import { useEffect, useState } from "react";

export const WAITING_TIME_SECONDS = 15;
export const EXAM_TIME_SECONDS = 20;

const TOTAL_SESSION_SECONDS = WAITING_TIME_SECONDS + EXAM_TIME_SECONDS;

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

export const useExamSession = () => {
  const [startedAtMs] = useState(() => Date.now());
  const [nowMs, setNowMs] = useState(() => startedAtMs);

  const sessionState = getExamSessionState(startedAtMs, nowMs);

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
