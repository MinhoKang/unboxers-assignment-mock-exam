import { useNavigate } from "react-router-dom";

import { ExamControlBar } from "@/features/exam/components/examControlBar/ExamControlBar";
import type { TTutorialDirection } from "@/features/tutorial/types/tutorialTypes";
import { Button } from "@/shared/components/button/Button";
import { ChevronLeft } from "@/shared/icons";

export const ExamTimeGuideView = ({
  onStepChange,
}: {
  onStepChange: (direction: TTutorialDirection) => void;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-1 flex-col items-center self-stretch">
      <div className="flex min-h-0 w-[1200px] flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-y-12">
          <ExamControlBar status="examining" remainingTime={5} totalTime={3600} />
          <div className="flex flex-col items-center justify-center gap-y-1 *:text-4xl *:font-extrabold">
            <p>시간이 모두 지나면 시험은 종료되고 OMR카드는 자동으로 제출돼요</p>
            <p className="text-red">마킹하지 못한 답안은 모두 오답 처리되니 미리 마킹하세요</p>
          </div>
        </div>
        <div className="mt-auto flex w-full items-end justify-between">
          <Button
            label="이전으로"
            variant="white"
            size="md"
            iconOptions={{ icon: <ChevronLeft />, position: "left" }}
            onClick={() => onStepChange("prev")}
          />
          <Button label="시험 화면으로 이동" size="md" onClick={() => navigate("/exam")} />
        </div>
      </div>
    </div>
  );
};
