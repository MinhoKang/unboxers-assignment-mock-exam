/**
 * 시험 제출 API 응답 구조 타입 정의
 */

import type { TSuccessResponse } from "@/shared/types/apiTypes";
import type {
  TGradeValue,
  TObjectiveAnswer,
  TStudentNumberValue,
  TSubjectiveAnswer,
} from "@/shared/types/omrsTypes";

/**
 * 개별 문항의 채점 결과
 */
export type TExamQuestionResult = {
  answerType: "objective" | "subjective";
  number: number;
  result: "correct" | "wrong";
};

/**
 * 시험 채점 결과 데이터
 */
export type TExamResultData = {
  title: string;
  score: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  results: TExamQuestionResult[];
};

/**
 * 시험 제출 API 성공 응답
 */
export type TExamSubmissionResponse = TSuccessResponse<TExamResultData>;

/**
 * 제출된 시험 데이터 (결과 화면에서 OMR 카드 표시용)
 */
export type TSubmittedExamData = {
  examTitle: string;
  subject: string;
  studentName: string;
  schoolName: string;
  seatNumber: number;
  supervisorName: string;
  grade: TGradeValue;
  studentNumber: TStudentNumberValue;
  objectiveAnswers: TObjectiveAnswer;
  subjectiveAnswers: TSubjectiveAnswer;
  objectiveQuestionCount: number;
  subjectiveQuestionCount: number;
};

/**
 * 시험 결과 화면에서 사용하는 전체 데이터
 */
export type TExamResultScreenData = {
  submittedExamData: TSubmittedExamData;
  resultData: TExamResultData;
};

/**
 * 시험 완료 후 화면 상태
 */
export type TExamCompletionStatus =
  | "scanning" // 스캔 애니메이션 중
  | null; // 시험 진행 중
