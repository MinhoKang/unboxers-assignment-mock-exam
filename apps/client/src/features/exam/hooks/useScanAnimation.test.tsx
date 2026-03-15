import { render, screen } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  SCANNER_LEFT_INSET_PX,
  SCANNER_RIGHT_INSET_PX,
  SCANNER_WIDTH_PX,
  TOTAL_TRAVEL_UNITS,
} from "../constants/scanner";
import type { TScannerTimeline } from "../types/scannerTypes";
import { useScanAnimation } from "./useScanAnimation";

let overlayWidth = 400;
const resizeObserverDisconnect = vi.fn();

class MockResizeObserver {
  observe = vi.fn();
  disconnect = resizeObserverDisconnect;

  constructor(_callback: ResizeObserverCallback) {}
}

vi.stubGlobal("ResizeObserver", MockResizeObserver);

function ScanAnimationHarness({
  onScanComplete,
  scanDurationMs,
}: {
  onScanComplete: () => void;
  scanDurationMs?: number;
}) {
  const { overlayRef, scanDurationSeconds, scannerTimeline } = useScanAnimation({
    onScanComplete,
    scanDurationMs,
  });

  return (
    <>
      <div data-overlay="true" ref={overlayRef} />
      <div data-testid="scan-duration-seconds">{scanDurationSeconds}</div>
      <div data-testid="scanner-timeline">{JSON.stringify(scannerTimeline)}</div>
    </>
  );
}

const readScannerTimeline = () => {
  const timeline = screen.getByTestId("scanner-timeline").textContent;
  return timeline ? (JSON.parse(timeline) as TScannerTimeline | null) : null;
};

describe("useScanAnimation", () => {
  beforeEach(() => {
    overlayWidth = 400;
    resizeObserverDisconnect.mockReset();
    vi.useFakeTimers();

    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
      this: HTMLElement,
    ) {
      if (this.getAttribute("data-overlay") === "true") {
        return {
          width: overlayWidth,
          height: 0,
          top: 0,
          left: 0,
          right: overlayWidth,
          bottom: 0,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        };
      }

      return {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      };
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("computes the scanner timeline from the overlay width and completes on time", async () => {
    const onScanComplete = vi.fn();
    const { unmount } = render(
      <ScanAnimationHarness onScanComplete={onScanComplete} scanDurationMs={4_000} />,
    );

    const scannerTimeline = readScannerTimeline();
    expect(scannerTimeline).not.toBeNull();

    const travelX = Math.max(overlayWidth - SCANNER_WIDTH_PX, 0);
    const startX = Math.min(SCANNER_LEFT_INSET_PX, travelX);
    const endX = Math.max(travelX - SCANNER_RIGHT_INSET_PX, startX);
    const midpointX = startX + (endX - startX) / 2;

    expect(screen.getByTestId("scan-duration-seconds")).toHaveTextContent("4");
    expect(scannerTimeline).toEqual({
      initialX: startX,
      key: `4000-${startX}-${endX}`,
      x: [startX, endX, startX, midpointX],
      times: [0, 1 / TOTAL_TRAVEL_UNITS, 2 / TOTAL_TRAVEL_UNITS, 1],
    });

    act(() => {
      vi.advanceTimersByTime(4_000);
    });

    expect(onScanComplete).toHaveBeenCalledTimes(1);

    unmount();
    expect(resizeObserverDisconnect).toHaveBeenCalled();
  });

  it("completes immediately and skips the scanner timeline when duration is non-positive", async () => {
    overlayWidth = 40;
    const onScanComplete = vi.fn();

    render(<ScanAnimationHarness onScanComplete={onScanComplete} scanDurationMs={0} />);

    expect(onScanComplete).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("scan-duration-seconds")).toHaveTextContent("0");
    expect(readScannerTimeline()).toBeNull();
  });
});
