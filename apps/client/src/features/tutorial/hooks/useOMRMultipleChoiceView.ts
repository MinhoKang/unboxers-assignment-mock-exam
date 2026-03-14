import { useState } from "react";

// 객관식 OMR 튜토리얼 단계
export type TMultipleChoiceTutorialStep = "single" | "remove" | "multiple";

export const useOMRMultipleChoiceView = () => {
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [currentStep, setCurrentStep] = useState<TMultipleChoiceTutorialStep>("single");

  const getIsClickableNextButton = () => {
    switch (currentStep) {
      case "single":
        return answers[15]?.includes(3);
      case "remove":
        return answers[15]?.length === 0;
      case "multiple":
        return Object.values(answers).some((choices) => choices.length >= 2);
    }
  };

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

  const handleChangeStep = (step: TMultipleChoiceTutorialStep) => {
    setCurrentStep(step);
  };

  const handleClickNextButton = () => {
    if (currentStep === "single") {
      handleChangeStep("remove");
    } else if (currentStep === "remove") {
      handleChangeStep("multiple");
    }
  };

  const handleClickPreviousButton = () => {
    if (currentStep === "multiple") {
      handleChangeStep("remove");
    } else if (currentStep === "remove") {
      handleChangeStep("single");
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
  };
};
