import { useEffect, useEffectEvent, useState } from "react";

import type { TTutorialDirection } from "../types/tutorialTypes";

export type TSubjectiveTutorialStep = "input" | "submit" | "edit";

export const useOMRSubjectiveView = ({
  focusedField,
  onComplete,
  onStepChange,
}: {
  focusedField: number | null;
  onComplete: () => void;
  onStepChange: (direction: TTutorialDirection) => void;
}) => {
  const [currentStep, setCurrentStep] = useState<TSubjectiveTutorialStep>("input");
  const [isQuestion4Completed, setIsQuestion4Completed] = useState(false);
  const [hasQuestion4FocusBeenLost, setHasQuestion4FocusBeenLost] = useState(false);

  const isLastStep = isQuestion4Completed && focusedField === 4 && hasQuestion4FocusBeenLost;

  const changeHasQuestion4FocusBeenLost = useEffectEvent((status: boolean) => {
    setHasQuestion4FocusBeenLost(status);
  });

  const getHighlightedWord = () => {
    switch (currentStep) {
      case "input":
        return "4번 문제";
      case "submit":
        return "완료";
      case "edit":
        return "";
    }
  };

  const isClickableNextButton = () => currentStep === "edit" && isLastStep;

  const handleChangeStep = (step: TSubjectiveTutorialStep) => {
    setCurrentStep(step);
  };

  const handleClickNextButton = () => {
    switch (currentStep) {
      case "input":
        handleChangeStep("submit");
        break;
      case "submit":
        handleChangeStep("edit");
        break;
      case "edit":
        onStepChange("next");
        break;
    }
  };

  const handleClickPreviousButton = () => {
    switch (currentStep) {
      case "edit":
        handleChangeStep("submit");
        break;
      case "submit":
        handleChangeStep("input");
        break;
      case "input":
        onStepChange("prev");
        break;
    }
  };

  const handleClickCompleteButton = () => {
    if (currentStep === "edit") return;
    setCurrentStep("edit");

    // 4번 문제를 완료했을 때 상태 업데이트
    if (focusedField === 4) {
      setIsQuestion4Completed(true);
    }

    // 포커스 해제를 위해 onComplete 호출
    onComplete();
  };

  useEffect(() => {
    // 4번이 완료된 후 포커스가 해제되면 플래그 설정
    if (isQuestion4Completed && focusedField !== 4) {
      changeHasQuestion4FocusBeenLost(true);
    }
  }, [focusedField, isQuestion4Completed]);

  return {
    currentStep,
    isLastStep,
    isClickableNextButton,
    handleClickNextButton,
    handleClickPreviousButton,
    getHighlightedWord,
    handleClickCompleteButton,
  };
};
