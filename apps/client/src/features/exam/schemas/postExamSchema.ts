import z from "zod";

import type { TObjectiveAnswer, TSubjectiveAnswer } from "@/shared/types/omrsTypes";

import { parseSubjectiveAnswer } from "../helpers/postExamSchemaHelpers";

/**
 * 객관식 답안 한 문항의 전송 형식을 정의합니다.
 * @description answerType, 문항 번호, 선택한 보기 번호를 포함합니다.
 */
const objectiveAnswerSchema = z.object({
  answerType: z.literal("objective"),
  number: z.number().int().positive(),
  answer: z.number().int(),
});

/**
 * 주관식 답안을 숫자 또는 숫자로 변환 가능한 문자열로 검증하고 숫자로 정규화합니다.
 * @description 문자열 입력도 서버 전송 직전에 숫자 값으로 통일합니다.
 */
const subjectiveAnswerSchema = z
  .union([z.number(), z.string().trim().min(1)])
  .refine((value) => parseSubjectiveAnswer(value) !== null, {
    message: "주관식 답안은 숫자 또는 숫자로 변환 가능한 문자열이어야 합니다.",
  })
  .transform((value) => parseSubjectiveAnswer(value));

/**
 * 주관식 답안 한 문항의 전송 형식을 정의합니다.
 * @description answerType, 문항 번호, 정규화 대상 답안을 포함합니다.
 */
const subjectiveAnswerRequestSchema = z.object({
  answerType: z.literal("subjective"),
  number: z.number().int().positive(),
  answer: subjectiveAnswerSchema,
});

/**
 * 서버에 제출하는 시험 payload 전체 형식을 정의합니다.
 * @description 학생 정보와 전체 답안 배열을 서버 요청 형식으로 검증합니다.
 */
export const postExamSchema = z.object({
  name: z.string().min(2),
  school: z.string().min(1),
  grade: z.number().int().min(1, "학년을 선택해주세요."),
  studentNumber: z.number().int().min(0, "번호를 입력해주세요."),
  seatNumber: z.number().int().min(1, "자리를 선택해주세요."),
  answers: z.array(
    z.discriminatedUnion("answerType", [objectiveAnswerSchema, subjectiveAnswerRequestSchema]),
  ),
});

/**
 * 화면에서 관리하는 시험 응시 폼 상태 형식을 정의합니다.
 * @description UI 입력 상태를 그대로 표현하며 서버 전송용 값으로는 아직 변환되지 않은 상태입니다.
 */
export const examFormSchema = z.object({
  name: postExamSchema.shape.name,
  school: postExamSchema.shape.school,
  seatNumber: postExamSchema.shape.seatNumber,
  gradeSelection: z.union([z.literal(1), z.literal(2), z.literal(3), z.null()]),
  studentNumberDigits: z.object({
    tens: z.number().int().min(0).max(9).nullable(),
    ones: z.number().int().min(0).max(9).nullable(),
  }),
  objectiveAnswers: z.custom<TObjectiveAnswer>(),
  subjectiveAnswers: z.custom<TSubjectiveAnswer>(),
});

/**
 * react-hook-form이 직접 다루는 시험 응시 폼 값 타입입니다.
 * @description examFormSchema를 기준으로 추론한 폼 상태 타입입니다.
 */
export type TExamFormValues = z.infer<typeof examFormSchema>;

/**
 * postExamSchema에 넣기 전 payload 후보 타입입니다.
 * @description transform 실행 전의 입력 타입입니다.
 */
export type TPostExamSchemaInput = z.input<typeof postExamSchema>;
/**
 * postExamSchema 검증과 transform을 통과한 최종 payload 타입입니다.
 * @description 서버 요청에 실제로 사용할 최종 정규화 타입입니다.
 */
export type TPostExamSchemaOutput = z.output<typeof postExamSchema>;
