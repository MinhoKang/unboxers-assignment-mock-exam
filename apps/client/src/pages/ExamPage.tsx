import { ExamControlBar } from "@/features/exam/components/examControlBar/ExamControlBar";
import { ExamHeader } from "@/features/exam/components/header/ExamHeader";
import { useExamForm } from "@/features/exam/hooks/useExamForm";
import { NumericKeypad } from "@/shared/components/OMR/OMRBases/NumericKeypad";
import { NumericKeypadGuide } from "@/shared/components/OMR/OMRBases/NumericKeypadGuide";
import { OMRCard } from "@/shared/components/OMR/OMRCard";

const ExamPage = () => {
  const {
    examTitle,
    subject,
    studentName,
    schoolName,
    seatNumber,
    supervisorName,
    grade,
    studentNumber,
    objectiveQuestionCount,
    subjectiveQuestionCount,
    objectiveAnswers,
    subjectiveAnswers,
    focusedField,
    fieldRefs,
    currentSubjectiveValue,
    isSubmitting,
    handleGradeChange,
    handleNumberChange,
    handleSelectObjective,
    handleSubjectiveChange,
    handleSubjectiveFieldFocus,
    handleKeypadInput,
    handleComplete,
    submitExam,
  } = useExamForm();

  return (
    <div className="bg-gs4 flex min-h-screen w-full flex-col gap-y-[130px]">
      <section className="flex w-full flex-1 flex-col gap-y-[63.5px] px-[26.04px] py-[25px]">
        <ExamHeader />
        <div className="flex items-center justify-center gap-x-15">
          <OMRCard
            examTitle={examTitle}
            subject={subject}
            studentName={studentName}
            schoolName={schoolName}
            seatNumber={seatNumber}
            supervisorName={supervisorName}
            grade={grade}
            studentNumber={studentNumber}
            onGradeChange={handleGradeChange}
            onNumberChange={handleNumberChange}
            objectiveQuestionCount={objectiveQuestionCount}
            subjectiveQuestionCount={subjectiveQuestionCount}
            objectiveAnswers={objectiveAnswers}
            onObjectiveSelect={handleSelectObjective}
            subjectiveAnswers={subjectiveAnswers}
            focusedField={focusedField}
            fieldRefs={fieldRefs}
            onSubjectiveChange={handleSubjectiveChange}
            onSubjectiveFieldFocus={handleSubjectiveFieldFocus}
          />

          <div className="flex items-center gap-x-15">
            <div className="flex w-[243px] flex-col gap-y-6">
              <NumericKeypadGuide />
              <NumericKeypad
                onInput={handleKeypadInput}
                onComplete={handleComplete}
                focusedField={focusedField}
                currentValue={currentSubjectiveValue}
              />
            </div>
          </div>
        </div>
      </section>
      <ExamControlBar
        status="examining"
        remainingTime={5}
        totalTime={3600}
        onSubmit={submitExam}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ExamPage;
