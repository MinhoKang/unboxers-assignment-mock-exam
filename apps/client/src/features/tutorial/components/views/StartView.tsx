import { Paper } from "@/features/tutorial/components/paper/Paper";
import { Button } from "@/shared/components/button/Button";

import { PAPER_HEIGHT, STEP_MEDIA_STAGE_WIDTH } from "../../constants/startViewAnimation";
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
    <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col items-center justify-center gap-y-12 pb-20">
      <div className="flex flex-col items-center justify-center gap-y-12 py-[90.89px]">
        <div
          className="flex items-center justify-center"
          style={{ width: STEP_MEDIA_STAGE_WIDTH, height: PAPER_HEIGHT }}
        >
          {currentStep === 1 ? (
            <Paper />
          ) : (
            <div className="flex w-full items-center justify-between gap-x-12">
              <Paper />
              <img src="/assets/omr.png" alt="OMR 카드 예시" />
            </div>
          )}
        </div>
        {comment}
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
