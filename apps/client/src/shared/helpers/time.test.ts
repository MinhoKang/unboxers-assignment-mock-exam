import { describe, expect, it } from "vitest";

import { formatSecondsToMinutes, formatSecondsToMinutesAndSeconds } from "./time";

describe("time helpers", () => {
  it("formats minutes by flooring the input seconds", () => {
    expect(formatSecondsToMinutes(0)).toBe(0);
    expect(formatSecondsToMinutes(59)).toBe(0);
    expect(formatSecondsToMinutes(60)).toBe(1);
    expect(formatSecondsToMinutes(61)).toBe(1);
    expect(formatSecondsToMinutes(125)).toBe(2);
  });

  it("formats seconds into a Korean minute/second label", () => {
    expect(formatSecondsToMinutesAndSeconds(0)).toBe("0초");
    expect(formatSecondsToMinutesAndSeconds(1)).toBe("1초");
    expect(formatSecondsToMinutesAndSeconds(60)).toBe("1분");
    expect(formatSecondsToMinutesAndSeconds(61)).toBe("1분 1초");
    expect(formatSecondsToMinutesAndSeconds(120)).toBe("2분");
  });
});
