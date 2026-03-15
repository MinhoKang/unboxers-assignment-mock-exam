import { useState } from "react";

import type { TTutorialDirection } from "@/features/tutorial/types/tutorialTypes";
import type { TObjectiveAnswer } from "@/shared/types/omrsTypes";

// 객관식 OMR 튜토리얼 단계
export type TOObjectiveTutorialStep = "single" | "remove" | "multiple";

/**
 * 튜토리얼의 복수 선택 단계가 충족됐는지 확인합니다.
 * 하나라도 2개 이상 선택된 문항이 있으면 복수 선택 학습이 완료된 것으로 봅니다.
 * @param answers 문항별 객관식 선택 상태
 * @returns 복수 선택 문항 존재 여부
 */
const hasMultipleChoices = (answers: TObjectiveAnswer) => {
  return Object.values(answers).some((choices) => choices.length >= 2);
};

export const useOMRObjectiveView = ({
  onStepChange,
}: {
  onStepChange: (direction: TTutorialDirection) => void;
}) => {
  const [answers, setAnswers] = useState<TObjectiveAnswer>({});
  const [currentStep, setCurrentStep] = useState<TOObjectiveTutorialStep>("single");

  /**
   * 현재 튜토리얼 단계별 완료 조건을 검사해 다음 버튼 활성화를 결정합니다.
   * single/remove 단계는 15번 문항의 특정 상태를 보고, multiple 단계는 아무 문항이나 복수 선택되었는지 확인합니다.
   * @returns 현재 단계에서 다음으로 진행 가능한지 여부
   */
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
   * 튜토리얼용 객관식 답안에서 특정 보기를 토글합니다.
   * 이미 선택된 보기는 제거하고, 없으면 추가해서 단계별 안내가 기대하는 선택 상태를 유지합니다.
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
