import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { TTutorialDirection } from "../types/tutorialTypes";

type TStartTutorialStep = 1 | 2;

export const useStartView = ({
  onStepChange,
}: {
  onStepChange: (direction: TTutorialDirection) => void;
}) => {
  const [currentStep, setCurrentStep] = useState<TStartTutorialStep>(1);

  const navigate = useNavigate();

  const previousButtonLabel = currentStep === 1 ? "튜토리얼 건너뛰기" : "이전";

  const getComment = () => {
    switch (currentStep) {
      case 1:
        return (
          <p className="text-gs1 text-center text-4xl font-extrabold">
            모의고사 모드는 처음이시죠? 실전 모의고사는 <br /> 실전과 최대한 비슷한 환경으로
            진행돼요
          </p>
        );
      case 2:
        return (
          <p className="text-gs1 text-center text-4xl font-extrabold">
            실제 시험지 크기에 인쇄된 시험지에 문제를 풀고 <br /> 화면에 표시된 OMR카드에 답을
            마킹해요
          </p>
        );
    }
  };

  const handleChangeStep = (step: TStartTutorialStep) => {
    setCurrentStep(step);
  };

  const handleClickPreviousButton = () => {
    if (currentStep === 1) {
      navigate("/exam");
    } else {
      handleChangeStep(1);
    }
  };

  const handleClickNextButton = () => {
    if (currentStep === 1) {
      handleChangeStep(2);
    } else {
      // 다음 step으로 이동
      onStepChange("next");
    }
  };

  return {
    currentStep,
    previousButtonLabel,
    comment: getComment(),
    handleClickPreviousButton,
    handleClickNextButton,
  };
};
