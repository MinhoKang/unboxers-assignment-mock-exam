import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

import { isValidChar } from "@/shared/helpers/omrs";
import type { TDigitKey, TFieldRefs, TGradeValue } from "@/shared/types/omrsTypes";

import { useGetExam } from "../api/getExam";
import { usePostExam } from "../api/postExam";
import {
  DEFAULT_EXAM_INFO,
  DEFAULT_STUDENT_INFO,
  DEFAULT_STUDENT_NUMBER_DIGITS,
  OBJECTIVE_QUESTION_COUNT,
  SUBJECTIVE_QUESTION_COUNT,
  TOTAL_QUESTION_COUNT,
} from "../constants/examForm";
import { buildPostExamPayload } from "../helpers/examFormHelpers";
import { examFormSchema, postExamSchema, type TExamFormValues } from "../schemas/postExamSchema";

/**
 * 시험 응시 폼의 상태 조회, 입력 처리, 제출 로직을 한곳에서 관리합니다.
 * @returns 시험 화면 렌더링과 제출에 필요한 상태 및 핸들러
 */
export const useExamForm = () => {
  /**
   * @description 현재 키패드 입력 대상이 되는 주관식 문항 번호입니다.
   */
  const [focusedField, setFocusedField] = useState<number | null>(null);

  /**
   * @description 주관식 입력 필드의 DOM ref 집합입니다.
   */
  const fieldRefs = useRef<TFieldRefs>({});

  /**
   * @description 시험 메타데이터 조회 결과입니다.
   */
  const { data: examMetadata } = useGetExam();
  /**
   * @description 시험 제출 mutation과 제출 진행 상태입니다.
   */
  const { mutateAsync: submitExamMutation, isPending: isSubmitting } = usePostExam();

  /**
   * @description react-hook-form 제어 객체와 값 접근 및 변경 API입니다.
   */
  const { control, getValues, setValue, handleSubmit } = useForm<TExamFormValues>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      ...DEFAULT_STUDENT_INFO,
      gradeSelection: null,
      studentNumberDigits: DEFAULT_STUDENT_NUMBER_DIGITS,
      objectiveAnswers: {},
      subjectiveAnswers: {},
    },
  });

  /**
   * @description 화면에 표시할 시험 제목입니다.
   */
  const examTitle = examMetadata?.data?.title ?? DEFAULT_EXAM_INFO.title;
  /**
   * @description 화면에 표시할 시험 과목명입니다.
   */
  const subject = DEFAULT_EXAM_INFO.subject;
  /**
   * @description 화면에 표시할 감독관 이름입니다.
   */
  const supervisorName = examMetadata?.data?.supervisorName ?? DEFAULT_EXAM_INFO.supervisorName;
  /**
   * @description 화면에 표시할 전체 문항 수입니다.
   */
  const totalQuestions = examMetadata?.data?.totalQuestions ?? TOTAL_QUESTION_COUNT;

  /**
   * @description 학생 기본 정보와 마킹 상태를 한 번에 구독한 값입니다.
   */
  const [studentName, schoolName, seatNumber, grade, studentNumber] = useWatch({
    control,
    name: ["name", "school", "seatNumber", "gradeSelection", "studentNumberDigits"] as const,
  });

  /**
   * @description 객관식과 주관식 답안 상태를 한 번에 구독한 값입니다.
   */
  const [objectiveAnswers, subjectiveAnswers] = useWatch({
    control,
    name: ["objectiveAnswers", "subjectiveAnswers"] as const,
  });

  /**
   * 학년 마킹을 토글하고 폼 상태를 검증합니다.
   * @param value 사용자가 선택한 학년 값
   * @returns void
   */
  const handleGradeChange = (value: TGradeValue) => {
    const currentGrade = getValues("gradeSelection");
    const nextGrade = currentGrade === value ? null : value;

    setValue("gradeSelection", nextGrade, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  /**
   * 학번 각 자리 숫자를 토글하고 폼 상태를 검증합니다.
   * @param digit 변경할 학번 자리 키
   * @param value 사용자가 선택한 숫자 값
   * @returns void
   */
  const handleNumberChange = (digit: TDigitKey, value: number) => {
    const currentStudentNumber = getValues("studentNumberDigits");
    const nextStudentNumber = {
      ...currentStudentNumber,
      [digit]: currentStudentNumber[digit] === value ? null : value,
    };

    setValue("studentNumberDigits", nextStudentNumber, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  /**
   * 객관식 보기 선택을 토글하고 답안 상태를 갱신합니다.
   * @param question 보기 선택을 변경할 문항 번호
   * @param choice 사용자가 클릭한 보기 번호
   * @returns void
   */
  const handleSelectObjective = (question: number, choice: number) => {
    const currentObjectiveAnswers = getValues("objectiveAnswers");
    const selectedChoices = currentObjectiveAnswers[question] || [];
    const isSelected = selectedChoices.includes(choice);
    const nextObjectiveAnswers = {
      ...currentObjectiveAnswers,
      [question]: isSelected
        ? selectedChoices.filter((currentChoice) => currentChoice !== choice)
        : [...selectedChoices, choice],
    };

    setValue("objectiveAnswers", nextObjectiveAnswers, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  /**
   * 주관식 입력값을 문항 번호 기준으로 갱신합니다.
   * @param questionNumber 입력값을 변경할 문항 번호
   * @param value 사용자가 입력한 문자열 값
   * @returns void
   */
  const handleSubjectiveChange = (questionNumber: number, value: string) => {
    const currentSubjectiveAnswers = getValues("subjectiveAnswers");
    const nextSubjectiveAnswers = {
      ...currentSubjectiveAnswers,
      [questionNumber]: value,
    };

    setValue("subjectiveAnswers", nextSubjectiveAnswers, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  /**
   * 숫자 키패드가 입력할 주관식 필드를 지정합니다.
   * @param questionNumber 포커스를 둘 주관식 문항 번호
   * @returns void
   */
  const handleSubjectiveFieldFocus = (questionNumber: number) => {
    setFocusedField(questionNumber);
  };

  /**
   * 숫자 키패드 입력을 현재 선택된 주관식 답안에 반영합니다.
   * @param value 키패드에서 입력된 문자 또는 backspace
   * @returns void
   */
  const handleKeypadInput = (value: string) => {
    if (!focusedField) {
      return;
    }

    const currentSubjectiveAnswers = getValues("subjectiveAnswers");
    const currentValue = currentSubjectiveAnswers[focusedField] || "";

    if (value === "backspace") {
      handleSubjectiveChange(focusedField, currentValue.slice(0, -1));
      return;
    }

    if (isValidChar(value) && currentValue.length < 15) {
      handleSubjectiveChange(focusedField, currentValue + value);
    }
  };

  /**
   * 현재 주관식 입력을 종료하고 포커스를 해제합니다.
   * @returns void
   */
  const handleComplete = () => {
    if (!focusedField || !(getValues("subjectiveAnswers")[focusedField] || "").length) {
      return;
    }

    fieldRefs.current[focusedField]?.blur();
    setFocusedField(null);
  };

  /**
   * 폼 제출 시 payload를 조립하고 API 요청을 실행합니다.
   * @returns react-hook-form submit handler
   */
  const submitExam = handleSubmit(
    async (values) => {
      const payloadResult = postExamSchema.safeParse(buildPostExamPayload(values));

      if (!payloadResult.success) {
        toast.error(payloadResult.error.issues[0]?.message ?? "답안 제출에 실패했습니다.");
        console.error(payloadResult.error);
        return;
      }

      await submitExamMutation(payloadResult.data);
    },
    (errors) => {
      const firstError = Object.values(errors)[0];
      const message =
        firstError && "message" in firstError && typeof firstError.message === "string"
          ? firstError.message
          : "답안 제출에 실패했습니다.";

      toast.error(message);
      console.error(errors);
    },
  );

  return {
    examTitle,
    subject,
    supervisorName,
    totalQuestions,
    objectiveQuestionCount: OBJECTIVE_QUESTION_COUNT,
    subjectiveQuestionCount: SUBJECTIVE_QUESTION_COUNT,
    studentName,
    schoolName,
    seatNumber,
    grade,
    studentNumber,
    objectiveAnswers,
    subjectiveAnswers,
    focusedField,
    fieldRefs,
    currentSubjectiveValue: focusedField ? subjectiveAnswers[focusedField] || "" : "",
    isSubmitting,
    handleGradeChange,
    handleNumberChange,
    handleSelectObjective,
    handleSubjectiveChange,
    handleSubjectiveFieldFocus,
    handleKeypadInput,
    handleComplete,
    submitExam,
  };
};
