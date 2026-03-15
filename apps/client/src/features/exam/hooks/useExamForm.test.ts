import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useExamForm } from "./useExamForm";

const { mockUseGetExam, mockUsePostExam, submitExamMutation, toastError } = vi.hoisted(() => ({
  mockUseGetExam: vi.fn(),
  mockUsePostExam: vi.fn(),
  submitExamMutation: vi.fn(),
  toastError: vi.fn(),
}));

vi.mock("../api/getExam", () => ({
  useGetExam: mockUseGetExam,
}));

vi.mock("../api/postExam", () => ({
  usePostExam: mockUsePostExam,
}));

vi.mock("react-hot-toast", () => ({
  default: {
    error: toastError,
  },
}));

describe("useExamForm", () => {
  beforeEach(() => {
    submitExamMutation.mockReset();
    toastError.mockReset();
    submitExamMutation.mockResolvedValue({ data: { score: 100, answers: [] } });

    mockUseGetExam.mockReturnValue({
      data: {
        data: {
          title: "테스트 모의고사",
          supervisorName: "감독관",
          totalQuestions: 25,
        },
      },
    });

    mockUsePostExam.mockReturnValue({
      mutateAsync: submitExamMutation,
      isPending: false,
    });
  });

  it("toggles grade and student number values and applies keypad input rules", async () => {
    const { result } = renderHook(() => useExamForm());

    act(() => {
      result.current.handleGradeChange(2);
      result.current.handleNumberChange("tens", 1);
      result.current.handleNumberChange("ones", 4);
      result.current.handleSubjectiveFieldFocus(3);
    });

    await waitFor(() => {
      expect(result.current.focusedField).toBe(3);
    });

    act(() => {
      result.current.handleKeypadInput("1");
      result.current.handleKeypadInput("/");
      result.current.handleKeypadInput("2");
      result.current.handleKeypadInput("x");
      result.current.handleKeypadInput("backspace");
    });

    await waitFor(() => {
      expect(result.current.grade).toBe(2);
      expect(result.current.studentNumber).toEqual({ tens: 1, ones: 4 });
      expect(result.current.currentSubjectiveValue).toBe("1/");
    });

    act(() => {
      result.current.handleGradeChange(2);
      result.current.handleNumberChange("ones", 4);
    });

    await waitFor(() => {
      expect(result.current.grade).toBeNull();
      expect(result.current.studentNumber).toEqual({ tens: 1, ones: null });
    });
  });

  it("submits a normalized payload and emits the success event", async () => {
    const dispatchEventSpy = vi.spyOn(window, "dispatchEvent");
    const { result } = renderHook(() => useExamForm());

    act(() => {
      result.current.handleGradeChange(2);
      result.current.handleNumberChange("tens", 1);
      result.current.handleNumberChange("ones", 4);
      result.current.handleSelectObjective(1, 3);
      result.current.handleSelectObjective(1, 4);
      result.current.handleSubjectiveChange(2, "1/2");
    });

    let submitted = false;
    await act(async () => {
      submitted = await result.current.submitExam();
    });

    expect(submitted).toBe(true);
    expect(submitExamMutation).toHaveBeenCalledWith({
      name: "권성민",
      school: "배방고등학교",
      seatNumber: 21,
      grade: 2,
      studentNumber: 14,
      answers: [
        {
          answerType: "objective",
          number: 1,
          answer: 3,
        },
        {
          answerType: "subjective",
          number: 2,
          answer: 0.5,
        },
      ],
    });
    expect(result.current.hasSubmittedSuccessfully).toBe(true);
    expect(dispatchEventSpy).toHaveBeenCalledTimes(1);

    const customEvent = dispatchEventSpy.mock.calls[0]?.[0];
    expect(customEvent).toBeInstanceOf(CustomEvent);
    expect(customEvent.type).toBe("examSubmitSuccess");
    expect((customEvent as CustomEvent).detail.resultData).toEqual({ score: 100, answers: [] });
  });

  it("shows a validation toast and skips submission when identity is incomplete", async () => {
    const { result } = renderHook(() => useExamForm());

    let submitted = true;
    await act(async () => {
      submitted = await result.current.submitExam();
    });

    expect(submitted).toBe(false);
    expect(submitExamMutation).not.toHaveBeenCalled();
    expect(toastError).toHaveBeenCalledWith("학년을 선택해주세요.");
  });
});
