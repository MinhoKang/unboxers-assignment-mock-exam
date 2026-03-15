import { ExamControlBar } from "@/features/exam/components/examControlBar/ExamControlBar";
import { ExamHeader } from "@/features/exam/components/header/ExamHeader";
import { NumericKeypad } from "@/shared/components/OMR/OMRBases/NumericKeypad";
import { NumericKeypadGuide } from "@/shared/components/OMR/OMRBases/NumericKeypadGuide";
import { OMRCard } from "@/shared/components/OMR/OMRCard";
import { useObjectiveAction } from "@/shared/hooks/OMR/useObjectiveAction";
import { useSubjectiveAction } from "@/shared/hooks/OMR/useSubjectiveAction";

const ExamPage = () => {
  const { objectiveAnswers, handleSelectObjective } = useObjectiveAction();
  const {
    subjectiveAnswers,
    focusedField,
    fieldRefs,
    handleChange,
    handleFieldFocus,
    handleKeypadInput,
    handleComplete,
  } = useSubjectiveAction();

  return (
    <div className="bg-gs4 flex min-h-screen w-full flex-col gap-y-[130px]">
      <section className="flex w-full flex-1 flex-col gap-y-[63.5px] px-[26.04px] py-[25px]">
        <ExamHeader />
        <div className="flex items-center justify-center gap-x-15">
          {/* OMR 카드 */}
          <OMRCard
            objectiveAnswers={objectiveAnswers}
            onObjectiveSelect={handleSelectObjective}
            subjectiveAnswers={subjectiveAnswers}
            focusedField={focusedField}
            fieldRefs={fieldRefs}
            onSubjectiveChange={handleChange}
            onSubjectiveFieldFocus={handleFieldFocus}
          />

          {/* 키패드 영역 */}
          <div className="flex items-center gap-x-15">
            <div className="flex w-[243px] flex-col gap-y-6">
              <NumericKeypadGuide />
              <NumericKeypad
                onInput={handleKeypadInput}
                onComplete={handleComplete}
                focusedField={focusedField}
                currentValue={focusedField ? subjectiveAnswers[focusedField] || "" : ""}
              />
            </div>
          </div>
        </div>
      </section>
      <ExamControlBar status="waiting" remainingTime={5} totalTime={3600} />
    </div>
  );
};

export default ExamPage;
