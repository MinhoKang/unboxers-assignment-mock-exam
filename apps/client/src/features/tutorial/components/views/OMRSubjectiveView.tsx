import { GuideDescription } from "@/features/tutorial/components/guideDescription/GuideDescription";
import type { TTutorialDirection } from "@/features/tutorial/types/tutorialTypes";
import { NumericKeypad } from "@/shared/components/OMR/OMRBases/NumericKeypad";
import { OMRContainer } from "@/shared/components/OMR/OMRBases/OMRContainer";
import { OMRSubjectiveInputs } from "@/shared/components/OMR/OMRBases/OMRSubjectiveInputs";
import { useSubjectiveAction } from "@/shared/hooks/OMR/useSubjectiveAction";

import { getGuideDescription } from "../../helpers/getGuideDescription";
import {
  type TSubjectiveTutorialStep,
  useOMRSubjectiveView,
} from "../../hooks/useOMRSubjectiveView";
import { FooterButtons } from "../footerButtons/FooterButtons";

const getStepComponent = (step: TSubjectiveTutorialStep): [string, string] => {
  switch (step) {
    case "input":
      return ["주관식 답안을 입력하려면 입력할 곳을 터치해요", "의 답안을 입력해볼까요?"];
    case "submit":
      return ["아무 숫자나 입력하고", " 버튼을 눌러서 답안을 작성해요"];
    case "edit":
      return ["입력한 답안을 수정하려면", "해당 문제를 다시 한 번 터치해요"];

    default:
      return ["", ""];
  }
};

export const OMRSubjectiveView = ({
  onStepChange,
}: {
  onStepChange: (direction: TTutorialDirection) => void;
}) => {
  const {
    answers,
    focusedField,
    fieldRefs,
    handleChange,
    handleFieldFocus,
    handleKeypadInput,
    handleComplete,
  } = useSubjectiveAction();

  const {
    currentStep,
    isLastStep,
    isClickableNextButton,
    handleClickNextButton,
    handleClickPreviousButton,
    getHighlightedWord,
    handleClickCompleteButton,
  } = useOMRSubjectiveView({ focusedField, onComplete: handleComplete, onStepChange });

  const [comment1, comment2] = getStepComponent(currentStep);

  return (
    <div className="mx-auto mt-[-18px] flex w-full max-w-[1200px] flex-col gap-y-12">
      <section className="mx-auto flex gap-8">
        <OMRContainer className="w-[408px] rounded-t-none">
          <OMRSubjectiveInputs
            questionCount={12}
            values={answers}
            onChange={handleChange}
            onFieldFocus={handleFieldFocus}
            focusedField={focusedField}
            fieldRefs={fieldRefs}
            maxLength={15}
            isTutorial
          />
        </OMRContainer>

        {/* 키패드  */}
        <div className="mt-auto shrink-0">
          <NumericKeypad
            onInput={handleKeypadInput}
            onComplete={handleClickCompleteButton}
            focusedField={focusedField}
            currentValue={focusedField ? answers[focusedField] || "" : ""}
          />
        </div>
      </section>
      <GuideDescription description={getGuideDescription(isLastStep)} />
      <p className="text-gs1 text-center text-4xl leading-none font-extrabold tracking-[0.36px]">
        <span className="block">{comment1}</span>
        <span className="mt-1.5 block">
          <span>
            <span className="text-inbrain-lightblue">{getHighlightedWord()}</span>
          </span>
          {comment2}
        </span>
      </p>
      <FooterButtons
        isNextButtonClickable={isClickableNextButton()}
        handleClickPreviousButton={handleClickPreviousButton}
        handleClickNextButton={handleClickNextButton}
      />
    </div>
  );
};
