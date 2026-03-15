import { useEffect, useEffectEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getNextTutorialStep, parseTutorialStep } from "../helpers/tutorialStep";
import type { TTutorialDirection, TTutorialStep } from "../types/tutorialTypes";

export const useTutorialPageController = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = parseTutorialStep(searchParams.get("step"));
  const [previousStep, setPreviousStep] = useState(currentStep);
  const [storedDirection, setStoredDirection] = useState<TTutorialDirection>("next");

  const pageDirection =
    currentStep === previousStep ? storedDirection : currentStep < previousStep ? "prev" : "next";

  /**
   * URL에서 계산한 step 변화 결과를 내부 비교 기준 상태에 반영합니다.
   * 다음 렌더에서 이전 단계와 이동 방향을 유지해야 페이지 전환 애니메이션 방향이 뒤집히지 않습니다.
   * @param nextStep URL에서 해석한 최신 단계
   * @param nextDirection 직전 이동으로 계산된 방향
   * @returns void
   */
  const syncStepState = useEffectEvent(
    (nextStep: TTutorialStep, nextDirection: TTutorialDirection) => {
      setPreviousStep(nextStep);
      setStoredDirection(nextDirection);
    },
  );

  useEffect(() => {
    if (currentStep === previousStep) {
      return;
    }

    syncStepState(currentStep, pageDirection);
  }, [currentStep, pageDirection, previousStep]);

  /**
   * 사용자가 누른 방향을 기준으로 다음 step을 계산하고 쿼리스트링을 갱신합니다.
   * 실제 단계 보정은 `getNextTutorialStep`에 위임해 직접 URL 진입과 같은 경로와 같은 규칙을 따릅니다.
   * @param direction 이전/다음 이동 방향
   * @returns void
   */
  const handleStepChange = (direction: TTutorialDirection) => {
    setSearchParams({ step: getNextTutorialStep(currentStep, direction).toString() });
  };

  return {
    currentStep,
    pageDirection,
    handleStepChange,
  };
};
