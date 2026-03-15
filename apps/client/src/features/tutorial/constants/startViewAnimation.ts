export const STEP_TRANSITION = {
  duration: 1.1,
  ease: "easeInOut",
} as const;

const PAPER_WIDTH = 315;
export const PAPER_HEIGHT = 431;
export const OMR_IMAGE_WIDTH = 594;
const STEP_MEDIA_GAP = 48;
export const STEP_MEDIA_STAGE_WIDTH = PAPER_WIDTH + STEP_MEDIA_GAP + OMR_IMAGE_WIDTH;
export const PAPER_CENTER_OFFSET = (OMR_IMAGE_WIDTH + STEP_MEDIA_GAP) / 2;
