import type { TStudentNumberValue } from "@/shared/types/omrsTypes";

export const DEFAULT_STUDENT_INFO = {
  name: "권성민",
  school: "배방고등학교",
  seatNumber: 21,
};

export const DEFAULT_EXAM_INFO = {
  title: "TEN-UP 모의고사",
  subject: "공통수학2",
  supervisorName: "신희철",
};

// NOTE: GET /api/exams 는 totalQuestions 만 반환합니다.
// 현재 객관식 14문항 + 주관식 11문항 분리는 서버 exam seed 데이터를 기준으로 맞춥니다.
export const OBJECTIVE_QUESTION_COUNT = 14;
export const SUBJECTIVE_QUESTION_COUNT = 11;
export const TOTAL_QUESTION_COUNT = OBJECTIVE_QUESTION_COUNT + SUBJECTIVE_QUESTION_COUNT;

export const DEFAULT_STUDENT_NUMBER_DIGITS: TStudentNumberValue = {
  tens: null,
  ones: null,
};
