import { useEffect, useEffectEvent, useLayoutEffect, useRef, useState } from "react";

import {
  DEFAULT_SCAN_DURATION_MS,
  SCANNER_LEFT_INSET_PX,
  SCANNER_RIGHT_INSET_PX,
  SCANNER_WIDTH_PX,
  TOTAL_TRAVEL_UNITS,
} from "../constants/scanner";
import type { TScannerTimeline } from "../types/scannerTypes";

/**
 * @description 스캔 애니메이션 훅에 필요한 입력값입니다.
 */
interface UseScanAnimationParams {
  onScanComplete: () => void;
  scanDurationMs?: number;
}

/**
 * @description 스캔 화면에서 사용하는 타이머, 오버레이 폭 측정, 스캐너 이동 타임라인 계산을 한 곳에 모읍니다.
 * `ScanAnimation` 컴포넌트는 이 훅이 내려주는 값으로 렌더링만 담당합니다.
 * @param onScanComplete 스캔 완료 후 결과 화면으로 전환시키는 콜백
 * @param scanDurationMs 스캔 애니메이션 전체 지속 시간(ms)
 * @returns 오버레이 ref, 진행 시간 값, 스캐너 타임라인, 렌더링에 필요한 레이아웃 값
 */
export const useScanAnimation = ({
  onScanComplete,
  scanDurationMs = DEFAULT_SCAN_DURATION_MS,
}: UseScanAnimationParams) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [overlayWidth, setOverlayWidth] = useState(0);
  const handleScanComplete = useEffectEvent(onScanComplete);
  const resolvedScanDurationMs = Math.max(scanDurationMs, 0);
  const scanDurationSeconds = resolvedScanDurationMs / 1000;

  /**
   * @description 스캐너 오버레이의 실제 너비를 측정하고, 리사이즈 시에도 이동 범위가 어긋나지 않도록 계속 동기화합니다.
   */
  useLayoutEffect(() => {
    const overlayElement = overlayRef.current;

    if (!overlayElement) {
      return;
    }

    /**
     * @description 현재 오버레이 요소의 너비를 읽어 스캐너 이동 범위 계산에 사용할 상태로 저장합니다.
     * @returns void
     */
    const syncOverlayWidth = () => {
      setOverlayWidth(overlayElement.getBoundingClientRect().width);
    };

    syncOverlayWidth();

    const resizeObserver = new ResizeObserver(syncOverlayWidth);
    resizeObserver.observe(overlayElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  /**
   * @description 현재 오버레이 너비와 좌우 inset 설정을 기준으로 스캐너 이동 경로를 계산합니다.
   * 경로는 좌 -> 우 -> 좌 -> 우(절반) 순서로 구성됩니다.
   * @returns motion transition에 바로 사용할 스캐너 타임라인, 계산이 불가능하면 null
   */
  const getScannerTimeline = (): TScannerTimeline | null => {
    const travelX = Math.max(overlayWidth - SCANNER_WIDTH_PX, 0);
    const startX = Math.min(SCANNER_LEFT_INSET_PX, travelX);
    const endX = Math.max(travelX - SCANNER_RIGHT_INSET_PX, startX);

    if (endX <= startX) {
      return null;
    }

    const midpointX = startX + (endX - startX) / 2;
    const fullPassPortion = 1 / TOTAL_TRAVEL_UNITS;

    return {
      initialX: startX,
      key: `${resolvedScanDurationMs}-${startX}-${endX}`,
      x: [startX, endX, startX, midpointX],
      times: [0, fullPassPortion, fullPassPortion * 2, 1],
    };
  };

  /**
   * @description 스캔 지속 시간 동안 완료 타이머를 유지하고, 시간이 끝나면 완료 콜백을 호출합니다.
   * 0 이하의 시간이 들어오면 애니메이션을 기다리지 않고 즉시 완료 처리합니다.
   */
  useEffect(() => {
    if (resolvedScanDurationMs <= 0) {
      handleScanComplete();
      return;
    }

    const timer = setTimeout(() => {
      handleScanComplete();
    }, resolvedScanDurationMs);

    return () => clearTimeout(timer);
  }, [resolvedScanDurationMs]);

  return {
    overlayRef,
    scanDurationSeconds,
    scannerTimeline: getScannerTimeline(),
  };
};
