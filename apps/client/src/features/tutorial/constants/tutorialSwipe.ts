import type { Transition, Variants } from "motion/react";

import type { TTutorialDirection } from "../types/tutorialTypes";

const TUTORIAL_SWIPE_OFFSET = 96;
const TUTORIAL_SWIPE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const TUTORIAL_SWIPE_TRANSITION: Transition = {
  duration: 0.38,
  ease: TUTORIAL_SWIPE_EASE,
};

export const TUTORIAL_FADE_TRANSITION: Transition = {
  duration: 0.2,
  ease: "easeOut",
};

export const getTutorialSwipeVariants = (shouldReduceMotion: boolean): Variants => ({
  enter: (direction: TTutorialDirection) => ({
    opacity: 0,
    x: shouldReduceMotion
      ? 0
      : direction === "next"
        ? TUTORIAL_SWIPE_OFFSET
        : -TUTORIAL_SWIPE_OFFSET,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: TTutorialDirection) => ({
    opacity: 0,
    x: shouldReduceMotion
      ? 0
      : direction === "next"
        ? -TUTORIAL_SWIPE_OFFSET
        : TUTORIAL_SWIPE_OFFSET,
  }),
});
