import { describe, expect, it } from "vitest";

import { clampTutorialStep, getNextTutorialStep, parseTutorialStep } from "./tutorialStep";

describe("clampTutorialStep", () => {
  it("falls back to the first step for non-finite values", () => {
    expect(clampTutorialStep(Number.NaN)).toBe(1);
    expect(clampTutorialStep(Number.POSITIVE_INFINITY)).toBe(1);
  });

  it("truncates decimals and clamps the valid range", () => {
    expect(clampTutorialStep(2.9)).toBe(2);
    expect(clampTutorialStep(-5)).toBe(1);
    expect(clampTutorialStep(99)).toBe(4);
  });
});

describe("parseTutorialStep", () => {
  it("parses search params defensively", () => {
    expect(parseTutorialStep(null)).toBe(1);
    expect(parseTutorialStep("")).toBe(1);
    expect(parseTutorialStep("abc")).toBe(1);
    expect(parseTutorialStep("3")).toBe(3);
  });
});

describe("getNextTutorialStep", () => {
  it("moves within the valid bounds", () => {
    expect(getNextTutorialStep(1, "next")).toBe(2);
    expect(getNextTutorialStep(3, "prev")).toBe(2);
  });

  it("does not move outside the valid bounds", () => {
    expect(getNextTutorialStep(1, "prev")).toBe(1);
    expect(getNextTutorialStep(4, "next")).toBe(4);
  });
});
