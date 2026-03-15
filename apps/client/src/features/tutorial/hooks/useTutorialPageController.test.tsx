import { act, renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { useTutorialPageController } from "./useTutorialPageController";

const createWrapper = (initialEntry: string) => {
  return function Wrapper({ children }: PropsWithChildren) {
    return <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>;
  };
};

describe("useTutorialPageController", () => {
  it("parses an invalid step query as the first step", () => {
    const { result } = renderHook(() => useTutorialPageController(), {
      wrapper: createWrapper("/tutorial?step=abc"),
    });

    expect(result.current.currentStep).toBe(1);
    expect(result.current.pageDirection).toBe("next");
  });

  it("updates the search param and keeps step bounds when moving", async () => {
    const { result } = renderHook(() => useTutorialPageController(), {
      wrapper: createWrapper("/tutorial?step=4"),
    });

    act(() => {
      result.current.handleStepChange("next");
    });

    await waitFor(() => {
      expect(result.current.currentStep).toBe(4);
      expect(result.current.pageDirection).toBe("next");
    });
  });

  it("tracks previous direction when moving backward", async () => {
    const { result } = renderHook(() => useTutorialPageController(), {
      wrapper: createWrapper("/tutorial?step=3"),
    });

    act(() => {
      result.current.handleStepChange("prev");
    });

    await waitFor(() => {
      expect(result.current.currentStep).toBe(2);
      expect(result.current.pageDirection).toBe("prev");
    });
  });
});
