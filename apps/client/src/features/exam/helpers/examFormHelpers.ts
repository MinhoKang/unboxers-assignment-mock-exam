import type {
  TObjectiveAnswer,
  TStudentNumberValue,
  TSubjectiveAnswer,
} from "@/shared/types/omrsTypes";

import { OBJECTIVE_QUESTION_COUNT, SUBJECTIVE_QUESTION_COUNT } from "../constants/examForm";
import type { TExamFormValues, TPostExamSchemaInput } from "../schemas/postExamSchema";

/**
 * @description 학번의 십의 자리와 일의 자리가 모두 입력된 경우에만 서버 전송용 숫자 학번으로 변환합니다.
 * @param studentNumber OMR 입력 상태에서 관리하는 학번 자리값입니다.
 * @returns 두 자리가 모두 있으면 2자리 숫자 학번을, 하나라도 비어 있으면 null을 반환합니다.
 */
export const buildStudentNumber = (studentNumber: TStudentNumberValue) => {
  if (studentNumber.tens === null || studentNumber.ones === null) {
    return null;
  }

  return studentNumber.tens * 10 + studentNumber.ones;
};

/**
 * @description 객관식/주관식 입력 상태를 제출 API 스키마의 answers 배열로 평탄화합니다.
 * @param objectiveAnswers 문항 번호별 객관식 선택 상태입니다.
 * @param subjectiveAnswers 문항 번호별 주관식 입력 상태입니다.
 * @returns 비어 있는 답안은 제외하고, 문항 순서를 유지한 제출용 answers 배열을 반환합니다.
 */
export const buildExamAnswers = (
  objectiveAnswers: TObjectiveAnswer,
  subjectiveAnswers: TSubjectiveAnswer,
): TPostExamSchemaInput["answers"] => {
  const answers: TPostExamSchemaInput["answers"] = [];

  for (let questionNumber = 1; questionNumber <= OBJECTIVE_QUESTION_COUNT; questionNumber += 1) {
    const objectiveAnswer = objectiveAnswers[questionNumber]?.[0];

    if (objectiveAnswer === undefined) {
      continue;
    }

    answers.push({
      answerType: "objective",
      number: questionNumber,
      answer: objectiveAnswer,
    });
  }

  for (let questionNumber = 1; questionNumber <= SUBJECTIVE_QUESTION_COUNT; questionNumber += 1) {
    const subjectiveAnswer = subjectiveAnswers[questionNumber]?.trim();

    if (!subjectiveAnswer) {
      continue;
    }

    answers.push({
      answerType: "subjective",
      number: questionNumber,
      answer: subjectiveAnswer,
    });
  }

  return answers;
};

/**
 * @description 폼 상태 전체를 postExam API가 요구하는 payload 모양으로 정규화합니다.
 * @param formValues 시험 제출 직전의 폼 값 모음입니다.
 * @returns grade/studentNumber 기본값 보정과 answers 변환이 반영된 제출 payload입니다.
 */
export const buildPostExamPayload = (formValues: TExamFormValues): TPostExamSchemaInput => ({
  name: formValues.name,
  school: formValues.school,
  seatNumber: formValues.seatNumber,
  grade: formValues.gradeSelection ?? 0,
  studentNumber: buildStudentNumber(formValues.studentNumberDigits) ?? -1,
  answers: buildExamAnswers(formValues.objectiveAnswers, formValues.subjectiveAnswers),
});
