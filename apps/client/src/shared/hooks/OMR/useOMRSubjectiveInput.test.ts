import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { TSubjectiveAnswer } from "@/shared/types/omrsTypes";

import { useOMRSubjectiveInput } from "./useOMRSubjectiveInput";

describe("useOMRSubjectiveInput", () => {
  it("filters invalid characters and truncates to maxLength", async () => {
    const onChange = vi.fn();
    const values = {};

    const { result } = renderHook(() =>
      useOMRSubjectiveInput({
        questionCount: 4,
        values,
        maxLength: 5,
        onChange,
      }),
    );

    act(() => {
      result.current.handleInputChange(4, "12a./-67");
    });

    expect(result.current.fieldValues[4]).toBe("12./-");
    expect(onChange).toHaveBeenCalledWith(4, "12./-");
  });

  it("returns tutorial-aware placeholders and forwards focus events", () => {
    const onFieldFocus = vi.fn();
    const values = {};

    const { result } = renderHook(() =>
      useOMRSubjectiveInput({
        questionCount: 4,
        values,
        maxLength: 10,
        isTutorial: true,
        focusedField: 2,
        onFieldFocus,
      }),
    );

    expect(result.current.questionNumbers).toEqual([1, 2, 3, 4]);
    expect(result.current.getPlaceholder(2)).toBe("답안을 입력하세요");
    expect(result.current.getPlaceholder(4)).toBe("여기를 터치하세요!");
    expect(result.current.getPlaceholder(1)).toBe("터치해서 주관식 답안 입력");

    act(() => {
      result.current.handleInputFocus(3);
    });

    expect(onFieldFocus).toHaveBeenCalledWith(3);
  });

  it("syncs local field values when the external values prop changes", async () => {
    const { result, rerender } = renderHook(
      ({ values }) =>
        useOMRSubjectiveInput({
          questionCount: 2,
          values,
          maxLength: 10,
        }),
      {
        initialProps: {
          values: { 1: "1/2" } as TSubjectiveAnswer,
        },
      },
    );

    expect(result.current.fieldValues).toEqual({ 1: "1/2" });

    act(() => {
      rerender({
        values: { 2: "9" },
      });
    });

    expect(result.current.fieldValues).toEqual({ 2: "9" });
  });
});
