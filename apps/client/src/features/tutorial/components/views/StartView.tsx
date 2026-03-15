import { AnimatePresence, motion } from "motion/react";

import { Paper } from "@/features/tutorial/components/paper/Paper";
import { Button } from "@/shared/components/button/Button";

import {
  PAPER_CENTER_OFFSET,
  PAPER_HEIGHT,
  STEP_MEDIA_STAGE_WIDTH,
  STEP_TRANSITION,
} from "../../constants/startViewAnimation";
import { useStartView } from "../../hooks/useStartView";
import type { TTutorialDirection } from "../../types/tutorialTypes";

export const StartView = ({
  onStepChange,
}: {
  onStepChange: (direction: TTutorialDirection) => void;
}) => {
  const {
    currentStep,
    previousButtonLabel,
    comment,
    handleClickPreviousButton,
    handleClickNextButton,
  } = useStartView({ onStepChange });

  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-12">
      <div className="flex flex-col items-center justify-center gap-y-12 py-[90.89px]">
        <div className="relative" style={{ width: STEP_MEDIA_STAGE_WIDTH, height: PAPER_HEIGHT }}>
          <div className="absolute top-1/2 left-0 -translate-y-1/2">
            <motion.div
              className="shrink-0"
              animate={{ x: currentStep === 2 ? 0 : PAPER_CENTER_OFFSET }}
              transition={STEP_TRANSITION}
            >
              <Paper />
            </motion.div>
          </div>
          <AnimatePresence initial={false} mode="popLayout">
            {currentStep === 2 && (
              <motion.div
                key="omr-card-image"
                className="absolute top-1/2 right-0 shrink-0 -translate-y-1/2 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={STEP_TRANSITION}
              >
                <img src="/assets/omr.png" alt="OMR 카드 예시" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="text-gs1 text-center text-4xl font-extrabold">{comment}</p>
      </div>
      <div className="flex items-center gap-x-3">
        <Button
          variant="white"
          size="md"
          label={previousButtonLabel}
          onClick={handleClickPreviousButton}
        />
        <Button variant="black" size="md" label="시작하기" onClick={handleClickNextButton} />
      </div>
    </div>
  );
};
