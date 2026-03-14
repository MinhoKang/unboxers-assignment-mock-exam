import { motion } from "motion/react";

import { useOMRMultipleChoiceView } from "@/features/tutorial/hooks/useOMRMultipleChoiceView";
import type { TTutorialDirection } from "@/features/tutorial/types/tutorialTypes";
import { Button } from "@/shared/components/button/Button";
import { OMRContainer } from "@/shared/components/OMR/OMRBases/OMRContainer";
import { OMRMultipleChoices } from "@/shared/components/OMR/OMRBases/OMRMultipleChoices";
import { ChevronLeft, ChevronUp } from "@/shared/icons";

export const OMRMultipleChoiceView = ({
  onStepChange,
}: {
  onStepChange: (direction: TTutorialDirection) => void;
}) => {
  const { answers, handleSelect, is15thQuestionAnswered } = useOMRMultipleChoiceView();

  return (
    <div className="flex w-full flex-col gap-y-12 self-start">
      <div className="flex flex-col gap-y-12">
        <OMRContainer className="mx-auto mt-[-18px] rounded-t-none">
          <OMRMultipleChoices totalQuestions={30} answers={answers} onSelect={handleSelect} />
        </OMRContainer>
        <div className="flex flex-col items-center justify-center gap-y-1">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
          >
            <ChevronUp />
          </motion.div>
          <p className="text-gs1 text-[19px] font-bold">다음으로 넘어가려면 직접 해보세요</p>
        </div>
        <p className="text-gs1 text-center text-4xl leading-none font-extrabold tracking-[0.36px]">
          <span className="block">객관식 답안은 화면을 터치해서 마킹해요</span>
          <span className="mt-1.5 block">
            <span className="text-inbrain-lightblue">15번 문제</span>에
            <span className="text-inbrain-lightblue">3번</span>으로 답안을 마킹해보세요
          </span>
        </p>
      </div>
      <div className="mx-auto flex w-[1200px] items-center justify-between gap-x-4">
        <Button
          label="이전으로"
          variant="white"
          iconOptions={{ icon: <ChevronLeft />, position: "left" }}
          onClick={() => onStepChange("prev")}
        />
        <div className="flex items-center gap-x-3">
          <Button
            label="튜토리얼 건너뛰기"
            variant="white"
            className="flex-1"
            onClick={() => onStepChange("next")}
          />
          <Button
            label="다음"
            variant="black"
            className="flex-1"
            disabled={!is15thQuestionAnswered}
            onClick={() => onStepChange("next")}
          />
        </div>
      </div>
    </div>
  );
};
