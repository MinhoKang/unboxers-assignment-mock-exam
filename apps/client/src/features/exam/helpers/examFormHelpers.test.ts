import { describe, expect, it } from "vitest";

import type { TExamFormValues } from "../schemas/postExamSchema";
import { buildExamAnswers, buildPostExamPayload, buildStudentNumber } from "./examFormHelpers";

describe("buildStudentNumber", () => {
  it("returns a two-digit student number when both digits exist", () => {
    expect(buildStudentNumber({ tens: 2, ones: 1 })).toBe(21);
  });

  it("returns null when either digit is missing", () => {
    expect(buildStudentNumber({ tens: null, ones: 1 })).toBeNull();
    expect(buildStudentNumber({ tens: 2, ones: null })).toBeNull();
  });
});

describe("buildExamAnswers", () => {
  it("flattens objective answers first and keeps only the first selected choice", () => {
    const answers = buildExamAnswers(
      {
        1: [3, 1],
        14: [5],
        15: [2],
      },
      {},
    );

    expect(answers).toEqual([
      { answerType: "objective", number: 1, answer: 3 },
      { answerType: "objective", number: 14, answer: 5 },
    ]);
  });

  it("trims subjective answers, skips blank values, and ignores out-of-range questions", () => {
    const answers = buildExamAnswers(
      {},
      {
        1: " 1/2 ",
        2: "   ",
        11: " 9 ",
        12: "7",
      },
    );

    expect(answers).toEqual([
      { answerType: "subjective", number: 1, answer: "1/2" },
      { answerType: "subjective", number: 11, answer: "9" },
    ]);
  });

  it("keeps objective answers before subjective answers", () => {
    const answers = buildExamAnswers(
      {
        2: [4],
      },
      {
        1: "10",
      },
    );

    expect(answers).toEqual([
      { answerType: "objective", number: 2, answer: 4 },
      { answerType: "subjective", number: 1, answer: "10" },
    ]);
  });
});

describe("buildPostExamPayload", () => {
  it("normalizes missing grade and student number", () => {
    const formValues: TExamFormValues = {
      name: "권성민",
      school: "배방고등학교",
      seatNumber: 21,
      gradeSelection: null,
      studentNumberDigits: { tens: 2, ones: null },
      objectiveAnswers: { 1: [2] },
      subjectiveAnswers: { 1: " 3/4 " },
    };

    expect(buildPostExamPayload(formValues)).toEqual({
      name: "권성민",
      school: "배방고등학교",
      seatNumber: 21,
      grade: 0,
      studentNumber: -1,
      answers: [
        { answerType: "objective", number: 1, answer: 2 },
        { answerType: "subjective", number: 1, answer: "3/4" },
      ],
    });
  });

  it("keeps completed identity values intact", () => {
    const formValues: TExamFormValues = {
      name: "권성민",
      school: "배방고등학교",
      seatNumber: 21,
      gradeSelection: 3,
      studentNumberDigits: { tens: 0, ones: 7 },
      objectiveAnswers: {},
      subjectiveAnswers: {},
    };

    expect(buildPostExamPayload(formValues)).toEqual({
      name: "권성민",
      school: "배방고등학교",
      seatNumber: 21,
      grade: 3,
      studentNumber: 7,
      answers: [],
    });
  });
});
