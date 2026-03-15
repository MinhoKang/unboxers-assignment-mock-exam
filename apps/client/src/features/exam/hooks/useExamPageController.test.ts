import { act, renderHook, waitFor } from "@testing-library/react";
import type * as ReactRouterDom from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useExamPageController } from "./useExamPageController";

const {
  navigate,
  toastError,
  mockUseExamForm,
  mockUseExamSession,
  clearSubjectiveFocus,
  submitExam,
  handleGradeChange,
  handleNumberChange,
  handleSelectObjective,
  handleSubjectiveChange,
  handleSubjectiveFieldFocus,
  handleKeypadInput,
  handleComplete,
} = vi.hoisted(() => ({
  navigate: vi.fn(),
  toastError: vi.fn(),
  mockUseExamForm: vi.fn(),
  mockUseExamSession: vi.fn(),
  clearSubjectiveFocus: vi.fn(),
  submitExam: vi.fn(),
  handleGradeChange: vi.fn(),
  handleNumberChange: vi.fn(),
  handleSelectObjective: vi.fn(),
  handleSubjectiveChange: vi.fn(),
  handleSubjectiveFieldFocus: vi.fn(),
  handleKeypadInput: vi.fn(),
  handleComplete: vi.fn(),
}));

vi.mock("./useExamForm", () => ({
  useExamForm: mockUseExamForm,
}));

vi.mock("./useExamSession", () => ({
  useExamSession: mockUseExamSession,
}));

vi.mock("react-hot-toast", () => ({
  default: {
    error: toastError,
  },
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof ReactRouterDom>("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

type SessionStatus = "waiting" | "examining" | "finished";

const createExamFormMock = ({
  hasSubmittedSuccessfully = false,
  grade = 2,
  studentNumber = { tens: 1, ones: 4 },
}: {
  hasSubmittedSuccessfully?: boolean;
  grade?: 1 | 2 | 3 | null;
  studentNumber?: { tens: number | null; ones: number | null };
} = {}) => ({
  hasSubmittedSuccessfully,
  clearSubjectiveFocus,
  submitExam,
  handleGradeChange,
  handleNumberChange,
  handleSelectObjective,
  handleSubjectiveChange,
  handleSubjectiveFieldFocus,
  handleKeypadInput,
  handleComplete,
  examTitle: "테스트 모의고사",
  subject: "공통수학2",
  studentName: "권성민",
  schoolName: "배방고등학교",
  seatNumber: 21,
  supervisorName: "감독관",
  grade,
  studentNumber,
  objectiveAnswers: { 1: [3] },
  subjectiveAnswers: { 2: "1/2" },
  objectiveQuestionCount: 14,
  subjectiveQuestionCount: 11,
  focusedField: null,
  fieldRefs: {},
  currentSubjectiveValue: "",
  isSubmitting: false,
});

const setSession = (status: SessionStatus) => {
  mockUseExamSession.mockReturnValue({
    status,
    remainingTime: status === "waiting" ? 15 : status === "examining" ? 20 : 0,
    totalTime: status === "waiting" ? 15 : 20,
  });
};

describe("useExamPageController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    submitExam.mockResolvedValue(true);
    mockUseExamForm.mockReturnValue(createExamFormMock());
    setSession("examining");
  });

  it("locks identity and answer editing while waiting", () => {
    setSession("waiting");

    const { result } = renderHook(() => useExamPageController());

    expect(result.current.examCardProps.isStudentNumberReadOnly).toBe(true);
    expect(result.current.examCardProps.isObjectiveReadOnly).toBe(true);
    expect(result.current.keypadProps.isReadOnly).toBe(true);

    act(() => {
      result.current.examCardProps.onGradeChange(2);
      result.current.examCardProps.onObjectiveSelect(1, 3);
    });

    expect(handleGradeChange).not.toHaveBeenCalled();
    expect(handleSelectObjective).not.toHaveBeenCalled();
    expect(toastError).toHaveBeenCalledWith("시험이 아직 시작되지 않았습니다.", {
      id: "exam-waiting",
    });
  });

  it("blocks submission after finish when identity is incomplete", async () => {
    setSession("finished");
    mockUseExamForm.mockReturnValue(
      createExamFormMock({
        grade: null,
        studentNumber: { tens: null, ones: null },
      }),
    );

    const { result } = renderHook(() => useExamPageController());

    let submitted: boolean | undefined;
    await act(async () => {
      submitted = await result.current.controlBarProps.onSubmit?.();
    });

    expect(submitted).toBe(false);
    expect(submitExam).not.toHaveBeenCalled();
    expect(toastError).toHaveBeenCalledWith("학년과 번호를 기입하고 제출해주세요.", {
      id: "exam-finished",
    });
  });

  it("stores result data on submit success events and navigates to the result page", async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    const { result } = renderHook(() => useExamPageController());

    act(() => {
      window.dispatchEvent(
        new CustomEvent("examSubmitSuccess", {
          detail: {
            resultData: {
              score: 92,
            },
          },
        }),
      );
    });

    await waitFor(() => {
      expect(result.current.completionStatus).toBe("scanning");
      expect(result.current.examResultData?.resultData).toEqual({ score: 92 });
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      "examResultData",
      expect.stringContaining('"score":92'),
    );

    act(() => {
      result.current.onScanComplete();
    });

    expect(navigate).toHaveBeenCalledWith("/exam/result");
  });

  it("submits automatically once when the session first becomes finished", async () => {
    let sessionStatus: SessionStatus = "examining";
    mockUseExamSession.mockImplementation(() => ({
      status: sessionStatus,
      remainingTime: sessionStatus === "waiting" ? 15 : sessionStatus === "examining" ? 20 : 0,
      totalTime: sessionStatus === "waiting" ? 15 : 20,
    }));

    const { rerender } = renderHook(() => useExamPageController());

    expect(submitExam).not.toHaveBeenCalled();

    sessionStatus = "finished";
    rerender();

    await waitFor(() => {
      expect(submitExam).toHaveBeenCalledTimes(1);
    });

    rerender();
    expect(submitExam).toHaveBeenCalledTimes(1);
  });
});
