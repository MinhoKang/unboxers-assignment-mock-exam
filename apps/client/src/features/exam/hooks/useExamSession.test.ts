import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { EXAM_TIME_SECONDS, useExamSession, WAITING_TIME_SECONDS } from "./useExamSession";

describe("useExamSession", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-16T00:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("transitions from waiting to examining to finished at the configured boundaries", () => {
    const { result } = renderHook(() => useExamSession());

    expect(result.current).toMatchObject({
      status: "waiting",
      remainingTime: WAITING_TIME_SECONDS,
      totalTime: WAITING_TIME_SECONDS,
    });

    act(() => {
      vi.advanceTimersByTime(14_000);
    });

    expect(result.current).toMatchObject({
      status: "waiting",
      remainingTime: 1,
      totalTime: WAITING_TIME_SECONDS,
    });

    act(() => {
      vi.advanceTimersByTime(1_000);
    });

    expect(result.current).toMatchObject({
      status: "examining",
      remainingTime: EXAM_TIME_SECONDS,
      totalTime: EXAM_TIME_SECONDS,
    });

    act(() => {
      vi.advanceTimersByTime(EXAM_TIME_SECONDS * 1_000);
    });

    expect(result.current).toMatchObject({
      status: "finished",
      remainingTime: 0,
      totalTime: EXAM_TIME_SECONDS,
    });
  });

  it("clears the active interval after the session finishes", () => {
    const clearIntervalSpy = vi.spyOn(window, "clearInterval");

    renderHook(() => useExamSession());

    act(() => {
      vi.advanceTimersByTime((WAITING_TIME_SECONDS + EXAM_TIME_SECONDS) * 1_000);
    });

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
