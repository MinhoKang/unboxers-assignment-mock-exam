import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import AppRouter from "./AppRouter";

vi.mock("../../pages/LoginPage.tsx", () => ({
  default: () => <div>login-page</div>,
}));

vi.mock("../../pages/TutorialPage.tsx", () => ({
  default: () => <div>tutorial-page</div>,
}));

vi.mock("../../pages/ExamPage.tsx", () => ({
  default: () => <div>exam-page</div>,
}));

vi.mock("../../pages/ResultPage.tsx", () => ({
  default: () => <div>result-page</div>,
}));

const renderRouter = (initialEntry: string) => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <AppRouter />
    </MemoryRouter>,
  );
};

describe("AppRouter", () => {
  it("renders the login page at /", () => {
    renderRouter("/");

    expect(screen.getByText("login-page")).toBeInTheDocument();
  });

  it("renders the tutorial page at /tutorial", () => {
    renderRouter("/tutorial");

    expect(screen.getByText("tutorial-page")).toBeInTheDocument();
  });

  it("renders the exam page at /exam", () => {
    renderRouter("/exam");

    expect(screen.getByText("exam-page")).toBeInTheDocument();
  });

  it("renders the result page at /exam/result", () => {
    renderRouter("/exam/result");

    expect(screen.getByText("result-page")).toBeInTheDocument();
  });

  it("redirects /result to /exam/result", async () => {
    renderRouter("/result");

    expect(await screen.findByText("result-page")).toBeInTheDocument();
  });
});
