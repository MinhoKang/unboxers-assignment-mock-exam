import { describe, expect, it } from "vitest";

import { parseSubjectiveAnswer } from "./postExamSchemaHelpers";

describe("parseSubjectiveAnswer", () => {
  it("keeps finite numeric values", () => {
    expect(parseSubjectiveAnswer(12)).toBe(12);
    expect(parseSubjectiveAnswer(-0.5)).toBe(-0.5);
  });

  it("parses trimmed decimal and fraction strings", () => {
    expect(parseSubjectiveAnswer(" 42 ")).toBe(42);
    expect(parseSubjectiveAnswer(".5")).toBe(0.5);
    expect(parseSubjectiveAnswer("-3.25")).toBe(-3.25);
    expect(parseSubjectiveAnswer(" 3/4 ")).toBe(0.75);
    expect(parseSubjectiveAnswer("-6/2")).toBe(-3);
  });

  it("returns null for blank or non-finite values", () => {
    expect(parseSubjectiveAnswer("")).toBeNull();
    expect(parseSubjectiveAnswer("   ")).toBeNull();
    expect(parseSubjectiveAnswer(Number.NaN)).toBeNull();
    expect(parseSubjectiveAnswer(Number.POSITIVE_INFINITY)).toBeNull();
  });

  it("returns null for malformed expressions", () => {
    expect(parseSubjectiveAnswer("1/0")).toBeNull();
    expect(parseSubjectiveAnswer("1//2")).toBeNull();
    expect(parseSubjectiveAnswer("a/b")).toBeNull();
    expect(parseSubjectiveAnswer("1/2/3")).toBeNull();
    expect(parseSubjectiveAnswer("1-2")).toBeNull();
  });
});
