import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useOMRSubjectiveView } from "./useOMRSubjectiveView";

describe("useOMRSubjectiveView", () => {
  it("advances across input, submit, and edit steps and delegates next navigation", () => {
    const onStepChange = vi.fn();
    const onComplete = vi.fn();
    const { result } = renderHook(() =>
      useOMRSubjectiveView({
        focusedField: 4,
        onComplete,
        onStepChange,
      }),
    );

    expect(result.current.currentStep).toBe("input");
    expect(result.current.getHighlightedWord()).toBe("4번 문제");

    act(() => {
      result.current.handleClickNextButton();
    });

    expect(result.current.currentStep).toBe("submit");
    expect(result.current.getHighlightedWord()).toBe("완료");

    act(() => {
      result.current.handleClickNextButton();
    });

    expect(result.current.currentStep).toBe("edit");
    expect(result.current.getHighlightedWord()).toBe("");

    act(() => {
      result.current.handleClickNextButton();
    });

    expect(onStepChange).toHaveBeenCalledWith("next");
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("marks completion flow from question 4 and ignores duplicate complete clicks in edit mode", () => {
    const onStepChange = vi.fn();
    const onComplete = vi.fn();
    const { result } = renderHook(() =>
      useOMRSubjectiveView({
        focusedField: 4,
        onComplete,
        onStepChange,
      }),
    );

    act(() => {
      result.current.handleClickCompleteButton();
    });

    expect(result.current.currentStep).toBe("edit");
    expect(onComplete).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.handleClickCompleteButton();
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onStepChange).not.toHaveBeenCalled();
  });

  it("moves backward inside the tutorial before delegating previous navigation", () => {
    const onStepChange = vi.fn();
    const onComplete = vi.fn();
    const { result } = renderHook(() =>
      useOMRSubjectiveView({
        focusedField: null,
        onComplete,
        onStepChange,
      }),
    );

    act(() => {
      result.current.handleClickNextButton();
    });

    act(() => {
      result.current.handleClickNextButton();
    });

    act(() => {
      result.current.handleClickPreviousButton();
    });

    expect(result.current.currentStep).toBe("submit");

    act(() => {
      result.current.handleClickPreviousButton();
    });

    expect(result.current.currentStep).toBe("input");

    act(() => {
      result.current.handleClickPreviousButton();
    });

    expect(onStepChange).toHaveBeenCalledWith("prev");
  });
});
