import { useState } from "react";

export type TSubjectiveTutorialStep = "input" | "submit" | "edit";

export const useOMRSubjectiveView = () => {
  const [currentStep, setCurrentStep] = useState<TSubjectiveTutorialStep>("input");

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

  const isClickableNextButton = () => currentStep === "edit";

  const handleChangeStep = (step: TSubjectiveTutorialStep) => {
    setCurrentStep(step);
  };

  const handleClickNextButton = () => {
    if (currentStep === "input") {
      handleChangeStep("submit");
    } else if (currentStep === "submit") {
      handleChangeStep("edit");
    }
  };

  const handleClickPreviousButton = () => {
    if (currentStep === "edit") {
      handleChangeStep("submit");
    } else if (currentStep === "submit") {
      handleChangeStep("input");
    }
  };

  return {
    currentStep,
    isClickableNextButton,
    handleChangeStep,
    handleClickNextButton,
    handleClickPreviousButton,
    getHighlightedWord,
  };
};
