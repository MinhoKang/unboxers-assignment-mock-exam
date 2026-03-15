import type {
  TObjectiveAnswer,
  TStudentNumberValue,
  TSubjectiveAnswer,
} from "@/shared/types/omrsTypes";

import { OBJECTIVE_QUESTION_COUNT, SUBJECTIVE_QUESTION_COUNT } from "../constants/examForm";
import type { TExamFormValues, TPostExamSchemaInput } from "../schemas/postExamSchema";

export const buildStudentNumber = (studentNumber: TStudentNumberValue) => {
  if (studentNumber.tens === null || studentNumber.ones === null) {
    return null;
  }

  return studentNumber.tens * 10 + studentNumber.ones;
};

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

export const buildPostExamPayload = (formValues: TExamFormValues): TPostExamSchemaInput => ({
  name: formValues.name,
  school: formValues.school,
  seatNumber: formValues.seatNumber,
  grade: formValues.gradeSelection ?? 0,
  studentNumber: buildStudentNumber(formValues.studentNumberDigits) ?? 0,
  answers: buildExamAnswers(formValues.objectiveAnswers, formValues.subjectiveAnswers),
});
