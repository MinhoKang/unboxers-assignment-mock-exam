import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useOMRObjectiveView } from "./useOMRObjectiveView";

describe("useOMRObjectiveView", () => {
  it("toggles selections for the guided question and advances through tutorial steps", () => {
    const onStepChange = vi.fn();
    const { result } = renderHook(() => useOMRObjectiveView({ onStepChange }));

    expect(result.current.currentStep).toBe("single");
    expect(result.current.isShowQuestionNumber).toBe(true);
    expect(result.current.getIsClickableNextButton()).toBeFalsy();

    act(() => {
      result.current.handleSelect(15, 3);
    });

    expect(result.current.answers[15]).toEqual([3]);
    expect(result.current.getIsClickableNextButton()).toBe(true);

    act(() => {
      result.current.handleClickNextButton();
    });

    expect(result.current.currentStep).toBe("remove");

    act(() => {
      result.current.handleSelect(15, 3);
    });

    expect(result.current.answers[15]).toEqual([]);
    expect(result.current.getIsClickableNextButton()).toBe(true);

    act(() => {
      result.current.handleClickNextButton();
    });

    expect(result.current.currentStep).toBe("multiple");
    expect(result.current.isShowQuestionNumber).toBe(false);
  });

  it("recognizes multiple selections and delegates next navigation at the last step", () => {
    const onStepChange = vi.fn();
    const { result } = renderHook(() => useOMRObjectiveView({ onStepChange }));

    act(() => {
      result.current.handleSelect(15, 3);
    });

    act(() => {
      result.current.handleClickNextButton();
    });

    act(() => {
      result.current.handleSelect(15, 3);
    });

    act(() => {
      result.current.handleClickNextButton();
    });

    act(() => {
      result.current.handleSelect(1, 2);
      result.current.handleSelect(1, 4);
    });

    expect(result.current.currentStep).toBe("multiple");
    expect(result.current.isLastStep).toBe(true);
    expect(result.current.getIsClickableNextButton()).toBe(true);

    act(() => {
      result.current.handleClickNextButton();
    });

    expect(onStepChange).toHaveBeenCalledWith("next");
  });

  it("moves backward within the tutorial before delegating to the previous page", () => {
    const onStepChange = vi.fn();
    const { result } = renderHook(() => useOMRObjectiveView({ onStepChange }));

    act(() => {
      result.current.handleSelect(15, 3);
    });

    act(() => {
      result.current.handleClickNextButton();
    });

    act(() => {
      result.current.handleSelect(15, 3);
    });

    act(() => {
      result.current.handleClickNextButton();
    });

    act(() => {
      result.current.handleClickPreviousButton();
    });

    expect(result.current.currentStep).toBe("remove");

    act(() => {
      result.current.handleClickPreviousButton();
    });

    expect(result.current.currentStep).toBe("single");

    act(() => {
      result.current.handleClickPreviousButton();
    });

    expect(onStepChange).toHaveBeenCalledWith("prev");
  });
});
