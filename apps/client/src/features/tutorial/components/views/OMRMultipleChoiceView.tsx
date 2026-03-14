import { GuideComment } from "@/features/tutorial/components/guideComment/GuideComment";
import {
  type TMultipleChoiceTutorialStep,
  useOMRMultipleChoiceView,
} from "@/features/tutorial/hooks/useOMRMultipleChoiceView";
import type { TTutorialDirection } from "@/features/tutorial/types/tutorialTypes";
import { OMRContainer } from "@/shared/components/OMR/OMRBases/OMRContainer";
import { OMRMultipleChoices } from "@/shared/components/OMR/OMRBases/OMRMultipleChoices";

import { FooterButtons } from "../footerButtons/FooterButtons";

const getStepComponent = (step: TMultipleChoiceTutorialStep): [string, string] => {
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

export const OMRMultipleChoiceView = ({
  onStepChange,
}: {
  onStepChange: (direction: TTutorialDirection) => void;
}) => {
  const {
    answers,
    handleSelect,
    currentStep,
    handleClickNextButton,
    handleClickPreviousButton,
    isShowQuestionNumber,
    getIsClickableNextButton,
  } = useOMRMultipleChoiceView();

  const [comment1, comment2] = getStepComponent(currentStep);

  return (
    <div className="flex w-full flex-col gap-y-12 self-start">
      <div className="flex flex-col gap-y-12">
        <OMRContainer className="mx-auto mt-[-18px] rounded-t-none">
          <OMRMultipleChoices totalQuestions={30} answers={answers} onSelect={handleSelect} />
        </OMRContainer>

        <GuideComment comment={comment1} />
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
