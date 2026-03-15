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

type OMRCardBaseProps = {
  examTitle: string;
  subject: string;
  studentName: string;
  schoolName: string;
  seatNumber: number;
  supervisorName: string;
  grade: TGradeValue | null;
  studentNumber: TStudentNumberValue;
  objectiveQuestionCount: number;
  subjectiveQuestionCount: number;
  objectiveAnswers: TObjectiveAnswer;
  subjectiveAnswers: TSubjectiveAnswer;
};

type OMRCardInteractiveProps = {
  isMock?: false;
  isStudentNumberReadOnly?: boolean;
  onGradeChange: (value: TGradeValue) => void;
  onNumberChange: (digit: TDigitKey, value: number) => void;
  isObjectiveReadOnly?: boolean;
  onObjectiveBlockedInteraction?: () => void;
  onObjectiveSelect: (question: number, choice: number) => void;
  isSubjectiveReadOnly?: boolean;
  onSubjectiveBlockedInteraction?: () => void;
  focusedField: number | null;
  fieldRefs: { current: TFieldRefs };
  onSubjectiveChange: (questionNumber: number, value: string) => void;
  onSubjectiveFieldFocus: (questionNumber: number) => void;
};

type OMRCardMockProps = {
  isMock: true;
  isStudentNumberReadOnly?: never;
  onGradeChange?: never;
  onNumberChange?: never;
  isObjectiveReadOnly?: never;
  onObjectiveBlockedInteraction?: never;
  onObjectiveSelect?: never;
  isSubjectiveReadOnly?: never;
  onSubjectiveBlockedInteraction?: never;
  focusedField?: never;
  fieldRefs?: never;
  onSubjectiveChange?: never;
  onSubjectiveFieldFocus?: never;
};

type OMRCardProps = OMRCardBaseProps & (OMRCardInteractiveProps | OMRCardMockProps);

export const OMRCard = (props: OMRCardProps) => {
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
    isMock = false,
  } = props;

  // Mock 모드 - 모든 상호작용 비활성화
  if (isMock) {
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
            isReadOnly={true}
            onGradeChange={() => {}}
            onNumberChange={() => {}}
          />

          <OMRObjectiveInputs
            totalQuestions={objectiveQuestionCount}
            choiceCount={5}
            answers={objectiveAnswers}
            isReadOnly={true}
            onBlockedInteraction={undefined}
            onSelect={() => {}}
            variant="examCard"
          />

          <OMRSubjectiveInputs
            questionCount={subjectiveQuestionCount}
            values={subjectiveAnswers}
            isReadOnly={true}
            onBlockedInteraction={undefined}
            onChange={() => {}}
            onFieldFocus={() => {}}
            focusedField={null}
            fieldRefs={{ current: {} }}
            variant="examCard"
          />
        </div>
      </OMRContainer>
    );
  }

  // Interactive 모드 - 실제 핸들러들 사용
  const interactiveProps = props as OMRCardInteractiveProps;
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
          isReadOnly={interactiveProps.isStudentNumberReadOnly ?? false}
          onGradeChange={interactiveProps.onGradeChange}
          onNumberChange={interactiveProps.onNumberChange}
        />

        <OMRObjectiveInputs
          totalQuestions={objectiveQuestionCount}
          choiceCount={5}
          answers={objectiveAnswers}
          isReadOnly={interactiveProps.isObjectiveReadOnly ?? false}
          onBlockedInteraction={interactiveProps.onObjectiveBlockedInteraction}
          onSelect={interactiveProps.onObjectiveSelect}
          variant="examCard"
        />

        <OMRSubjectiveInputs
          questionCount={subjectiveQuestionCount}
          values={subjectiveAnswers}
          isReadOnly={interactiveProps.isSubjectiveReadOnly ?? false}
          onBlockedInteraction={interactiveProps.onSubjectiveBlockedInteraction}
          onChange={interactiveProps.onSubjectiveChange}
          onFieldFocus={interactiveProps.onSubjectiveFieldFocus}
          focusedField={interactiveProps.focusedField}
          fieldRefs={interactiveProps.fieldRefs}
          variant="examCard"
        />
      </div>
    </OMRContainer>
  );
};
