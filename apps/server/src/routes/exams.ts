import type { FastifyPluginAsync } from "fastify";
import { AnswerType } from "@prisma/client";
import { z } from "zod";

import { GRADE_RESULT } from "../lib/constants";
import { prisma } from "../lib/prisma";
import { errorResponse, successResponse } from "../lib/response";

const SUBJECTIVE_NUMBER_PATTERN = /^-?(?:\d+\.?\d*|\.\d+)$/;

const parseSubjectiveAnswer = (value: string | number) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  const fractionParts = trimmedValue.split("/");

  if (fractionParts.length === 1) {
    if (!SUBJECTIVE_NUMBER_PATTERN.test(trimmedValue)) {
      return null;
    }

    const parsedValue = Number(trimmedValue);
    return Number.isFinite(parsedValue) ? parsedValue : null;
  }

  if (fractionParts.length !== 2) {
    return null;
  }

  const [rawNumerator, rawDenominator] = fractionParts;

  if (
    !SUBJECTIVE_NUMBER_PATTERN.test(rawNumerator) ||
    !SUBJECTIVE_NUMBER_PATTERN.test(rawDenominator)
  ) {
    return null;
  }

  const numerator = Number(rawNumerator);
  const denominator = Number(rawDenominator);

  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
    return null;
  }

  return numerator / denominator;
};

const objectiveAnswerSchema = z.object({
  answerType: z.literal(AnswerType.objective),
  number: z.number().int().positive(),
  answer: z.number().int()
});

const subjectiveAnswerSchema = z.object({
  answerType: z.literal(AnswerType.subjective),
  number: z.number().int().positive(),
  answer: z
    .union([z.number(), z.string().trim().min(1)])
    .refine((value) => parseSubjectiveAnswer(value) !== null, {
      message: "Subjective answer must be numeric or coercible to a number"
    })
    .transform((value) => parseSubjectiveAnswer(value) as number)
});

const gradeAnswersSchema = z.object({
  name: z.string().trim().min(1),
  school: z.string().trim().min(1),
  grade: z.number().int(),
  studentNumber: z.number().int(),
  seatNumber: z.number().int(),
  answers: z.array(
    z.discriminatedUnion("answerType", [objectiveAnswerSchema, subjectiveAnswerSchema])
  )
});

function buildGradeResponse(
  exam: {
    title: string;
    questions: Array<{
      answerType: AnswerType;
      number: number;
      correctAnswer: number;
      score: number;
    }>;
  },
  rawAnswers: Array<{
    answerType: AnswerType;
    number: number;
    answer: number;
  }>
) {
  const answerMap = new Map<string, number>();

  for (const rawAnswer of rawAnswers) {
    answerMap.set(
      `${rawAnswer.answerType}:${rawAnswer.number}`,
      rawAnswer.answer
    );
  }

  let score = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  const results = exam.questions.map((question) => {
    const submittedAnswer = answerMap.get(
      `${question.answerType}:${question.number}`
    );

    if (submittedAnswer == null) {
      unansweredCount += 1;
      return {
        answerType: question.answerType,
        number: question.number,
        result: GRADE_RESULT.UNANSWERED
      };
    }

    if (submittedAnswer === question.correctAnswer) {
      correctCount += 1;
      score += question.score;
      return {
        answerType: question.answerType,
        number: question.number,
        result: GRADE_RESULT.CORRECT
      };
    }

    wrongCount += 1;
    return {
      answerType: question.answerType,
      number: question.number,
      result: GRADE_RESULT.WRONG
    };
  });

  return {
    title: exam.title,
    score,
    correctCount,
    wrongCount,
    unansweredCount,
    results
  };
}

export const examsRoute: FastifyPluginAsync = async (app) => {
  app.get("/", async (_, reply) => {
    const exam = await prisma.exam.findFirst({
      include: {
        questions: {
          orderBy: [
            {
              answerType: "asc"
            },
            {
              number: "asc"
            }
          ],
          select: {
            score: true
          }
        }
      }
    });

    if (!exam) {
      return reply.code(404).send(errorResponse("Exam not found"));
    }

    const totalScore = exam.questions.reduce(
      (sum, question) => sum + question.score,
      0
    );

    return successResponse(
      "Exam retrieved successfully",
      {
        title: exam.title,
        description: exam.description,
        supervisorName: exam.supervisorName,
        totalQuestions: exam.questions.length,
        totalScore
      }
    );
  });

  app.post<{
    Body: unknown;
  }>("/submit", async (request, reply) => {
    const payload = gradeAnswersSchema.safeParse(request.body);

    if (!payload.success) {
      return reply.code(400).send({
        ...errorResponse("Invalid request"),
        issues: payload.error.flatten()
      });
    }

    const exam = await prisma.exam.findFirst({
      include: {
        questions: {
          orderBy: [
            {
              answerType: "asc"
            },
            {
              number: "asc"
            }
          ],
          select: {
            answerType: true,
            number: true,
            correctAnswer: true,
            score: true
          }
        }
      }
    });

    if (!exam) {
      return reply.code(404).send(errorResponse("Exam not found"));
    }

    return successResponse(
      "Exam submitted successfully",
      buildGradeResponse(exam, payload.data.answers)
    );
  });
};
