import { useState } from "react";

import type { TTutorialDirection } from "@/features/tutorial/types/tutorialTypes";

// 객관식 OMR 튜토리얼 단계
export type TOObjectiveTutorialStep = "single" | "remove" | "multiple";

const hasMultipleChoices = (answers: Record<number, number[]>) => {
  return Object.values(answers).some((choices) => choices.length >= 2);
};

export const useOMRObjectiveView = ({
  onStepChange,
}: {
  onStepChange: (direction: TTutorialDirection) => void;
}) => {
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [currentStep, setCurrentStep] = useState<TOObjectiveTutorialStep>("single");

  const getIsClickableNextButton = () => {
    switch (currentStep) {
      case "single":
        return answers[15]?.includes(3);
      case "remove":
        return answers[15]?.length === 0;
      case "multiple":
        return hasMultipleChoices(answers);
    }
  };
  const isLastStep = currentStep === "multiple" && hasMultipleChoices(answers);

  // 마지막 단계에서는 문제 번호를 표시하지 않음
  const isShowQuestionNumber = currentStep !== "multiple";

  /**
   *
   * @param question 문항 번호
   * @param choice 선택지 번호
   * @returns void
   */
  const handleSelect = (question: number, choice: number) => {
    setAnswers((prev) => {
      const current = prev[question] ?? [];
      const next = current.includes(choice)
        ? current.filter((c) => c !== choice)
        : [...current, choice];
      return { ...prev, [question]: next };
    });
  };

  const handleChangeStep = (step: TOObjectiveTutorialStep) => {
    setCurrentStep(step);
  };

  const handleClickNextButton = () => {
    switch (currentStep) {
      case "single":
        handleChangeStep("remove");
        break;
      case "remove":
        handleChangeStep("multiple");
        break;
      case "multiple":
        onStepChange("next");
        break;
    }
  };

  const handleClickPreviousButton = () => {
    switch (currentStep) {
      case "multiple":
        handleChangeStep("remove");
        break;
      case "remove":
        handleChangeStep("single");
        break;
      default:
        onStepChange("prev");
    }
  };

  return {
    answers,
    handleSelect,
    currentStep,
    handleClickNextButton,
    handleClickPreviousButton,
    isShowQuestionNumber,
    getIsClickableNextButton,
    isLastStep,
  };
};
