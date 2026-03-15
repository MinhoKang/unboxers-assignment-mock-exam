import { OMR_STYLES } from "@/shared/constants/omrStyles";
import { useOMRCard } from "@/shared/hooks/OMR/useOMRCard";

import { BrandingSection } from "./OMRBases/BrandingSection";
import { OMRContainer } from "./OMRBases/OMRContainer";
import { OMRObjectiveInputs } from "./OMRBases/OMRObjectiveInputs";
import { OMRSubjectiveInputs } from "./OMRBases/OMRSubjectiveInputs";
import { StudentInfoTable } from "./OMRBases/StudentInfoTable";
import { StudentNumberSection } from "./OMRBases/StudentNumberSection";

interface OMRCardProps {
  objectiveAnswers: Record<number, number[]>;
  onObjectiveSelect: (question: number, choice: number) => void;
  subjectiveAnswers: Record<number, string>;
  focusedField: number | null;
  fieldRefs: { current: Record<number, HTMLInputElement | null> };
  onSubjectiveChange: (questionNumber: number, value: string) => void;
  onSubjectiveFieldFocus: (questionNumber: number) => void;
}

export const OMRCard = ({
  objectiveAnswers,
  onObjectiveSelect,
  subjectiveAnswers,
  focusedField,
  fieldRefs,
  onSubjectiveChange,
  onSubjectiveFieldFocus,
}: OMRCardProps) => {
  const { grade, studentNumber, handleGradeChange, handleNumberChange } = useOMRCard();

  return (
    <OMRContainer className="w-fit overflow-hidden rounded-3xl px-4 py-3 pb-[2px]">
      <div className="flex items-stretch overflow-x-auto">
        <div className="flex flex-col" style={{ width: OMR_STYLES.INFO_TABLE_WIDTH }}>
          <StudentInfoTable />
          <BrandingSection />
        </div>

        <StudentNumberSection
          grade={grade}
          studentNumber={studentNumber}
          onGradeChange={handleGradeChange}
          onNumberChange={handleNumberChange}
        />

        <OMRObjectiveInputs
          totalQuestions={30}
          choiceCount={5}
          answers={objectiveAnswers}
          onSelect={onObjectiveSelect}
          variant="examCard"
        />

        <OMRSubjectiveInputs
          questionCount={12}
          values={subjectiveAnswers}
          onChange={onSubjectiveChange}
          onFieldFocus={onSubjectiveFieldFocus}
          focusedField={focusedField}
          fieldRefs={fieldRefs}
          variant="examCard"
        />
      </div>
    </OMRContainer>
  );
};
