import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/shared/helpers/cn";

import {
  getTutorialSwipeVariants,
  TUTORIAL_FADE_TRANSITION,
  TUTORIAL_SWIPE_TRANSITION,
} from "../constants/tutorialSwipe";
import type { TTutorialDirection } from "../types/tutorialTypes";

interface TutorialSwipeStageProps {
  children: React.ReactNode;
  direction: TTutorialDirection;
  panelKey: number | string;
  className?: string;
  panelClassName?: string;
}

export const TutorialSwipeStage = ({
  children,
  direction,
  panelKey,
  className,
  panelClassName,
}: TutorialSwipeStageProps) => {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <div className={cn("relative min-h-0 min-w-0 overflow-x-hidden", className)}>
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        <motion.div
          key={panelKey}
          custom={direction}
          variants={getTutorialSwipeVariants(shouldReduceMotion)}
          initial="enter"
          animate="center"
          exit="exit"
          transition={shouldReduceMotion ? TUTORIAL_FADE_TRANSITION : TUTORIAL_SWIPE_TRANSITION}
          className={cn(
            "bg-gs4 absolute inset-0 min-h-0 min-w-0 will-change-transform",
            panelClassName,
          )}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
