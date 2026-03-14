export const getGuideDescription = (isLastStep: boolean) => {
  if (isLastStep) {
    return "좋아요! 다음으로 넘어가볼까요?";
  }
  return "다음으로 넘어가려면 직접 해보세요";
};
