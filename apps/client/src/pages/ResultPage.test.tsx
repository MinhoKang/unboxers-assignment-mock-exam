import { render, screen, waitFor } from "@testing-library/react";
import type * as ReactRouterDom from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ResultPage from "./ResultPage";

const navigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof ReactRouterDom>("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

vi.mock("@/features/exam/components/result/ResultView", () => ({
  ResultView: ({ examResultData }: { examResultData: { resultData: { score: number } } }) => (
    <div data-testid="result-view">score:{examResultData.resultData.score}</div>
  ),
}));

describe("ResultPage", () => {
  beforeEach(() => {
    navigate.mockReset();
    sessionStorage.clear();
  });

  it("renders the result view when sessionStorage data exists", async () => {
    sessionStorage.setItem(
      "examResultData",
      JSON.stringify({
        submittedExamData: {
          examTitle: "시험",
        },
        resultData: {
          score: 91,
        },
      }),
    );

    render(<ResultPage />);

    expect(await screen.findByTestId("result-view")).toHaveTextContent("score:91");
    expect(navigate).not.toHaveBeenCalled();
  });

  it("redirects to /exam when no stored result exists", async () => {
    render(<ResultPage />);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/exam");
    });
  });

  it("redirects to /exam when the stored result JSON is malformed", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    sessionStorage.setItem("examResultData", "{");

    render(<ResultPage />);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/exam");
    });
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
