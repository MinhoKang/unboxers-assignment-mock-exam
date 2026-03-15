import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useGetExam } from "./getExam";

const fetchMock = vi.fn();

vi.mock("../../../constants/api", () => ({
  API_URL: "http://test.local",
}));

vi.stubGlobal("fetch", fetchMock);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function QueryWrapper({ children }: PropsWithChildren) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

describe("useGetExam", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("fetches exam metadata successfully", async () => {
    const payload = {
      message: "ok",
      data: {
        title: "TEN-UP 모의고사",
        description: null,
        supervisorName: "신희철",
        totalQuestions: 25,
        totalScore: 100,
      },
    };

    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });

    const { result } = renderHook(() => useGetExam(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(fetchMock).toHaveBeenCalledWith("http://test.local/api/exams");
    expect(result.current.data).toEqual(payload);
  });

  it("surfaces an error when the API response is not ok", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: vi.fn(),
    });

    const { result } = renderHook(() => useGetExam(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toMatchObject({
      message: "Failed to fetch exam information",
    });
  });
});
