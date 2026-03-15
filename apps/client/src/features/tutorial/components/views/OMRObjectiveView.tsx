import { GuideDescription } from "@/features/tutorial/components/guideDescription/GuideDescription";
import {
  type TOObjectiveTutorialStep,
  useOMRObjectiveView,
} from "@/features/tutorial/hooks/useOMRObjectiveView";
import type { TTutorialDirection } from "@/features/tutorial/types/tutorialTypes";
import { OMRContainer } from "@/shared/components/OMR/OMRBases/OMRContainer";
import { OMRObjectiveInputs } from "@/shared/components/OMR/OMRBases/OMRObjectiveInputs";

import { getGuideDescription } from "../../helpers/getGuideDescription";
import { FooterButtons } from "../footerButtons/FooterButtons";

const getStepComponent = (step: TOObjectiveTutorialStep): [string, string] => {
  switch (step) {
    case "single":
      return ["객관식 답안은 화면을 터치해서 마킹해요", "으로 답안을 마킹해보세요"];
    case "remove":
      return ["마킹한 곳을 한 번 더 터치하면 지울 수 있어요", " 답안을 지워보세요"];
    case "multiple":
      return ["2개 이상의 답안을 골라야 하는 문제에서는", " 두 답안 모두 마킹하면 돼요"];

    default:
      return ["", ""];
  }
};

export const OMRObjectiveView = ({
  onStepChange,
}: {
  onStepChange: (direction: TTutorialDirection) => void;
}) => {
  const {
    answers,
    handleSelect,
    currentStep,
    isLastStep,
    handleClickNextButton,
    handleClickPreviousButton,
    isShowQuestionNumber,
    getIsClickableNextButton,
  } = useOMRObjectiveView({ onStepChange });

  const [comment1, comment2] = getStepComponent(currentStep);

  return (
    <div className="flex w-full flex-col gap-y-12 self-start">
      <div className="flex flex-col gap-y-12">
        <OMRContainer className="mx-auto mt-[-18px] rounded-t-none">
          <OMRObjectiveInputs totalQuestions={30} answers={answers} onSelect={handleSelect} />
        </OMRContainer>

        <GuideDescription description={getGuideDescription(isLastStep)} />
        <p className="text-gs1 text-center text-4xl leading-none font-extrabold tracking-[0.36px]">
          <span className="block">{comment1}</span>
          <span className="mt-1.5 block">
            {isShowQuestionNumber && (
              <span>
                <span className="text-inbrain-lightblue">15번 문제</span>에
              </span>
            )}{" "}
            {isShowQuestionNumber && <span className="text-inbrain-lightblue">3번</span>}
            {comment2}
          </span>
        </p>
      </div>
      <FooterButtons
        isNextButtonClickable={getIsClickableNextButton()}
        handleClickPreviousButton={handleClickPreviousButton}
        handleClickNextButton={handleClickNextButton}
      />
    </div>
  );
};
