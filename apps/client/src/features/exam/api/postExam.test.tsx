import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TPostExamSchemaOutput } from "../schemas/postExamSchema";
import { usePostExam } from "./postExam";

const { fetchMock, toastError } = vi.hoisted(() => ({
  fetchMock: vi.fn(),
  toastError: vi.fn(),
}));

vi.mock("../../../constants/api", () => ({
  API_URL: "http://test.local",
}));

vi.mock("react-hot-toast", () => ({
  default: {
    error: toastError,
  },
}));

vi.stubGlobal("fetch", fetchMock);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
      },
      queries: {
        retry: false,
      },
    },
  });

  return function QueryWrapper({ children }: PropsWithChildren) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

const payload: TPostExamSchemaOutput = {
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
  ],
};

describe("usePostExam", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    toastError.mockReset();
  });

  it("posts the normalized payload and returns the response payload", async () => {
    const responsePayload = {
      message: "submitted",
      data: {
        score: 92,
      },
    };

    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(responsePayload),
    });

    const { result } = renderHook(() => usePostExam(), {
      wrapper: createWrapper(),
    });

    let mutationResult: unknown;
    await act(async () => {
      mutationResult = await result.current.mutateAsync(payload);
    });

    expect(fetchMock).toHaveBeenCalledWith("http://test.local/api/exams/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    expect(mutationResult).toEqual(responsePayload);
    expect(toastError).not.toHaveBeenCalled();
  });

  it("shows the server message when the submission fails with a JSON payload", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    fetchMock.mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({
        message: "서버 제출 실패",
      }),
    });

    const { result } = renderHook(() => usePostExam(), {
      wrapper: createWrapper(),
    });

    await expect(
      act(async () => {
        await result.current.mutateAsync(payload);
      }),
    ).rejects.toThrow("서버 제출 실패");

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("서버 제출 실패");
    });
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("falls back to the default message when the error payload cannot be parsed", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    fetchMock.mockResolvedValue({
      ok: false,
      json: vi.fn().mockRejectedValue(new Error("bad json")),
    });

    const { result } = renderHook(() => usePostExam(), {
      wrapper: createWrapper(),
    });

    await expect(
      act(async () => {
        await result.current.mutateAsync(payload);
      }),
    ).rejects.toThrow("답안 제출에 실패했습니다.");

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("답안 제출에 실패했습니다.");
    });
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
