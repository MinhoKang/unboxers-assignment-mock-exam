import type { TTutorialDirection, TTutorialStep } from "../types/tutorialTypes";

const MIN_TUTORIAL_STEP: TTutorialStep = 1;

export const MAX_TUTORIAL_STEP: TTutorialStep = 4;

/**
 * URL이나 내부 상태에서 들어온 step 값을 튜토리얼이 지원하는 범위로 정규화합니다.
 * 유한하지 않은 값은 첫 단계로 되돌리고, 소수는 버린 뒤 최소/최대 step 경계를 강제합니다.
 * @param step 정규화 전 단계 값
 * @returns 항상 유효한 튜토리얼 단계
 */
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

/**
 * 쿼리스트링의 step 파라미터를 안전한 튜토리얼 단계로 해석합니다.
 * 값이 없거나 숫자로 해석되지 않으면 첫 단계로 보정되고, 범위를 벗어나도 clamp됩니다.
 * @param stepParam URL search param의 step 값
 * @returns 라우팅 상태와 동기화 가능한 유효한 단계
 */
export const parseTutorialStep = (stepParam: string | null): TTutorialStep => {
  return clampTutorialStep(Number(stepParam));
};

/**
 * 현재 단계에서 이전/다음 이동 요청을 적용하되, 튜토리얼 범위를 벗어나지 않도록 보정합니다.
 * @param currentStep 현재 튜토리얼 단계
 * @param direction 사용자가 요청한 이동 방향
 * @returns 이동 후 유효한 튜토리얼 단계
 */
export const getNextTutorialStep = (
  currentStep: TTutorialStep,
  direction: TTutorialDirection,
): TTutorialStep => {
  return clampTutorialStep(currentStep + (direction === "prev" ? -1 : 1));
};
