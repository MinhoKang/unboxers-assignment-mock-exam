import { OMR_STYLES } from "@/shared/constants/omrStyles";
import type {
  TDigitKey,
  TFieldRefs,
  TGradeValue,
  TObjectiveAnswer,
  TStudentNumberValue,
  TSubjectiveAnswer,
} from "@/shared/types/omrsTypes";

import { BrandingSection } from "./OMRBases/BrandingSection";
import { OMRContainer } from "./OMRBases/OMRContainer";
import { OMRObjectiveInputs } from "./OMRBases/OMRObjectiveInputs";
import { OMRSubjectiveInputs } from "./OMRBases/OMRSubjectiveInputs";
import { StudentInfoTable } from "./OMRBases/StudentInfoTable";
import { StudentNumberSection } from "./OMRBases/StudentNumberSection";

interface OMRCardProps {
  examTitle: string;
  subject: string;
  studentName: string;
  schoolName: string;
  seatNumber: number;
  supervisorName: string;
  grade: TGradeValue | null;
  studentNumber: TStudentNumberValue;
  isStudentNumberReadOnly?: boolean;
  onGradeChange: (value: TGradeValue) => void;
  onNumberChange: (digit: TDigitKey, value: number) => void;
  objectiveQuestionCount: number;
  subjectiveQuestionCount: number;
  objectiveAnswers: TObjectiveAnswer;
  isObjectiveReadOnly?: boolean;
  onObjectiveBlockedInteraction?: () => void;
  onObjectiveSelect: (question: number, choice: number) => void;
  subjectiveAnswers: TSubjectiveAnswer;
  isSubjectiveReadOnly?: boolean;
  onSubjectiveBlockedInteraction?: () => void;
  focusedField: number | null;
  fieldRefs: { current: TFieldRefs };
  onSubjectiveChange: (questionNumber: number, value: string) => void;
  onSubjectiveFieldFocus: (questionNumber: number) => void;
}

export const OMRCard = ({
  examTitle,
  subject,
  studentName,
  schoolName,
  seatNumber,
  supervisorName,
  grade,
  studentNumber,
  isStudentNumberReadOnly = false,
  onGradeChange,
  onNumberChange,
  objectiveQuestionCount,
  subjectiveQuestionCount,
  objectiveAnswers,
  isObjectiveReadOnly = false,
  onObjectiveBlockedInteraction,
  onObjectiveSelect,
  subjectiveAnswers,
  isSubjectiveReadOnly = false,
  onSubjectiveBlockedInteraction,
  focusedField,
  fieldRefs,
  onSubjectiveChange,
  onSubjectiveFieldFocus,
}: OMRCardProps) => {
  return (
    <OMRContainer className="w-fit overflow-hidden rounded-3xl px-4 py-3 pb-[2px]">
      <div className="flex items-stretch overflow-x-auto">
        <div className="flex flex-col" style={{ width: OMR_STYLES.INFO_TABLE_WIDTH }}>
          <StudentInfoTable
            examTitle={examTitle}
            subject={subject}
            studentName={studentName}
            schoolName={schoolName}
            seatNumber={seatNumber}
            supervisorName={supervisorName}
          />
          <BrandingSection />
        </div>

        <StudentNumberSection
          grade={grade}
          studentNumber={studentNumber}
          isReadOnly={isStudentNumberReadOnly}
          onGradeChange={onGradeChange}
          onNumberChange={onNumberChange}
        />

        <OMRObjectiveInputs
          totalQuestions={objectiveQuestionCount}
          choiceCount={5}
          answers={objectiveAnswers}
          isReadOnly={isObjectiveReadOnly}
          onBlockedInteraction={onObjectiveBlockedInteraction}
          onSelect={onObjectiveSelect}
          variant="examCard"
        />

        <OMRSubjectiveInputs
          questionCount={subjectiveQuestionCount}
          values={subjectiveAnswers}
          isReadOnly={isSubjectiveReadOnly}
          onBlockedInteraction={onSubjectiveBlockedInteraction}
          onChange={onSubjectiveChange}
          onFieldFocus={onSubjectiveFieldFocus}
          focusedField={focusedField}
          fieldRefs={fieldRefs}
          variant="examCard"
          className={isSubjectiveReadOnly ? "opacity-60" : undefined}
        />
      </div>
    </OMRContainer>
  );
};
