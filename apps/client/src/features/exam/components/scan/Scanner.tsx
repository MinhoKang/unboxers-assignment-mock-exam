import { motion } from "motion/react";

import {
  SCANNER_BEAM_OPACITY,
  SCANNER_CAP_HEIGHT_PX,
  SCANNER_VERTICAL_BLEED_PX,
  SCANNER_WIDTH_PX,
} from "../../constants/scanner";
import type { TScannerTimeline } from "../../types/scannerTypes";

interface ScannerProps {
  scannerTimeline: TScannerTimeline | null;
  scanDurationSeconds: number;
  overlayRef: React.RefObject<HTMLDivElement | null>;
}

export const Scanner = ({ scannerTimeline, scanDurationSeconds, overlayRef }: ScannerProps) => {
  return (
    <div
      ref={overlayRef}
      className="pointer-events-none absolute inset-x-0 overflow-visible"
      style={{
        top: `-${SCANNER_VERTICAL_BLEED_PX}px`,
        bottom: `-${SCANNER_VERTICAL_BLEED_PX}px`,
      }}
    >
      {scannerTimeline && (
        <motion.div
          key={scannerTimeline.key}
          className="absolute top-0 left-0 h-full"
          initial={{ x: scannerTimeline.initialX }}
          animate={{
            x: scannerTimeline.x,
          }}
          transition={{
            duration: scanDurationSeconds,
            ease: "linear",
            times: scannerTimeline.times,
          }}
          style={{
            width: `${SCANNER_WIDTH_PX}px`,
            willChange: "transform",
          }}
        >
          {/* 상단 캡 */}
          <div
            className="bg-black-grad absolute top-0 left-1/2 z-10 -translate-x-1/2 rounded-sm"
            style={{
              height: `${SCANNER_CAP_HEIGHT_PX}px`,
              width: `${SCANNER_WIDTH_PX}px`,
            }}
          />

          {/* 스캔 라인 */}
          <div className="bg-red absolute top-0 left-1/2 h-full w-1 -translate-x-1/2" />
          {/* 스캔 라인 오버레이 */}
          <div
            className="bg-red-grad absolute inset-0"
            style={{
              opacity: SCANNER_BEAM_OPACITY,
            }}
          />

          {/* 하단 캡 */}
          <div
            className="bg-black-grad absolute bottom-0 left-1/2 -translate-x-1/2 rounded-sm"
            style={{
              height: `${SCANNER_CAP_HEIGHT_PX}px`,
              width: `${SCANNER_WIDTH_PX}px`,
            }}
          />
        </motion.div>
      )}
    </div>
  );
};
