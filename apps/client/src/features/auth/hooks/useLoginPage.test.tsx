import { act, renderHook } from "@testing-library/react";
import type * as ReactRouterDom from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useLoginPage } from "./useLoginPage";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof ReactRouterDom>("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("useLoginPage", () => {
  beforeEach(() => {
    navigateMock.mockReset();
  });

  it("initializes with phone field selected and disabled CTA", () => {
    const { result } = renderHook(() => useLoginPage());

    expect(result.current.activeField).toBe("phone");
    expect(result.current.phone).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.ctaLabel).toBe("다음");
    expect(result.current.isCtaDisabled).toBe(true);
  });

  it("routes keypad input to the active field and advances to password on CTA", () => {
    const { result } = renderHook(() => useLoginPage());

    act(() => {
      result.current.handleKeypadClick("0");
      result.current.handleKeypadClick("1");
      result.current.handleKeypadClick("backspace");
      result.current.handleKeypadClick("9");
    });

    expect(result.current.phone).toBe("09");
    expect(result.current.password).toBe("");
    expect(result.current.isCtaDisabled).toBe(false);

    act(() => {
      result.current.handleCtaClick();
    });

    expect(result.current.activeField).toBe("password");
    expect(result.current.ctaLabel).toBe("로그인");
    expect(navigateMock).not.toHaveBeenCalled();

    act(() => {
      result.current.handleKeypadClick("1");
      result.current.handleKeypadClick("2");
    });

    expect(result.current.password).toBe("12");
  });

  it("does not submit when active field is empty and navigates after password entry", () => {
    const { result } = renderHook(() => useLoginPage());

    act(() => {
      result.current.handleFieldSelect("password");
    });

    act(() => {
      result.current.handleCtaClick();
    });

    expect(navigateMock).not.toHaveBeenCalled();

    act(() => {
      result.current.handleKeypadClick("7");
    });

    act(() => {
      result.current.handleCtaClick();
    });

    expect(navigateMock).toHaveBeenCalledWith("/tutorial");
  });
});
