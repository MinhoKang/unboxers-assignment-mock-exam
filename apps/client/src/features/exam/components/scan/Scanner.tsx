import { motion } from "motion/react";

import type { TScannerTimeline } from "../../types/scannerTypes";

const SCANNER_CAP_HEIGHT_PX = 13.87;
const SCANNER_CAP_RADIUS_PX = 4;
const SCANNER_BEAM_OPACITY = 0.4;

interface ScannerProps {
  scannerTimeline: TScannerTimeline | null;
  scanDurationSeconds: number;
  scannerWidthPx: number;
  scannerVerticalBleedPx: number;
  overlayRef: React.RefObject<HTMLDivElement | null>;
}

export const Scanner = ({
  scannerTimeline,
  scanDurationSeconds,
  scannerWidthPx,
  scannerVerticalBleedPx,
  overlayRef,
}: ScannerProps) => {
  return (
    <div
      ref={overlayRef}
      className="pointer-events-none absolute inset-x-0 overflow-visible"
      style={{
        top: `-${scannerVerticalBleedPx}px`,
        bottom: `-${scannerVerticalBleedPx}px`,
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
            width: `${scannerWidthPx}px`,
            willChange: "transform",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              opacity: SCANNER_BEAM_OPACITY,
              background:
                "linear-gradient(90deg, rgba(255, 0, 0, 0.08) 0%, rgba(255, 0, 0, 0.58) 18%, rgba(255, 255, 255, 0.95) 50%, rgba(255, 0, 0, 0.58) 82%, rgba(255, 0, 0, 0.08) 100%)",
            }}
          />

          <div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              height: `${SCANNER_CAP_HEIGHT_PX}px`,
              width: `${scannerWidthPx}px`,
              borderRadius: `${SCANNER_CAP_RADIUS_PX}px`,
              background: "linear-gradient(180deg, #333333 0%, #333333 60%, #585858 100%)",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
            }}
          />

          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              height: `${SCANNER_CAP_HEIGHT_PX}px`,
              width: `${scannerWidthPx}px`,
              borderRadius: `${SCANNER_CAP_RADIUS_PX}px`,
              background: "linear-gradient(180deg, #585858 0%, #333333 40%, #333333 100%)",
              boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.3)",
            }}
          />

          <div
            className="absolute top-0 left-1/2 h-full -translate-x-1/2"
            style={{
              width: "5px",
              background: "#ff0000",
              boxShadow:
                "0 0 8px rgba(255, 0, 0, 0.95), 0 0 18px rgba(255, 48, 48, 0.7), 0 0 28px rgba(255, 0, 0, 0.45)",
            }}
          />
        </motion.div>
      )}
    </div>
  );
};
