import type { TTutorialDirection, TTutorialStep } from "../types/tutorialTypes";

const MIN_TUTORIAL_STEP: TTutorialStep = 1;

export const MAX_TUTORIAL_STEP: TTutorialStep = 4;

export const clampTutorialStep = (step: number): TTutorialStep => {
  if (!Number.isFinite(step)) {
    return MIN_TUTORIAL_STEP;
  }

  const normalizedStep = Math.trunc(step);

  if (normalizedStep <= MIN_TUTORIAL_STEP) {
    return MIN_TUTORIAL_STEP;
  }

  if (normalizedStep >= MAX_TUTORIAL_STEP) {
    return MAX_TUTORIAL_STEP;
  }

  return normalizedStep as TTutorialStep;
};

export const parseTutorialStep = (stepParam: string | null): TTutorialStep => {
  return clampTutorialStep(Number(stepParam));
};

export const getNextTutorialStep = (
  currentStep: TTutorialStep,
  direction: TTutorialDirection,
): TTutorialStep => {
  return clampTutorialStep(currentStep + (direction === "prev" ? -1 : 1));
};
