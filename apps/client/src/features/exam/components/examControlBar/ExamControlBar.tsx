import { cn } from "@/shared/helpers/cn";
import { formatSecondsToMinutes, formatSecondsToMinutesAndSeconds } from "@/shared/helpers/time";
import { TimeProgressBar } from "@/shared/ui/TimeProgressBar";

import { HelpButton } from "./HelpButton";

interface ExamControlBarProps {
  status: "waiting" | "examining";
  totalTime: number;
  remainingTime: number; // 초 단위
  onSubmit?: () => void;
  isSubmitting?: boolean;
  isSubmitDisabled?: boolean;
}

export const ExamControlBar = ({
  status,
  totalTime,
  remainingTime,
  onSubmit,
  isSubmitting = false,
  isSubmitDisabled = false,
}: ExamControlBarProps) => {
  const isExamining = status === "examining";

  const timeDescription = isExamining ? "시험 종료까지 남은 시간" : "시험이 곧 시작됩니다...";

  return (
    <div className="bg-gs6 shadow-floating-sm flex w-full items-center justify-center gap-x-9 rounded-2xl px-15 py-7.5">
      {/* 시간 영억 */}
      <div className="flex flex-1 flex-col gap-2">
        <span className="text-black-grad text-[17px] font-extrabold">{timeDescription}</span>
        <div className="flex items-end justify-between">
          <span
            className={cn(
              remainingTime > 10 ? "text-black-grad" : "text-red",
              "text-5xl font-extrabold",
            )}
          >
            {formatSecondsToMinutesAndSeconds(remainingTime)} {!isExamining && "뒤 시작"}
          </span>
          <span className="text-black-grad text-[17px] font-semibold">
            시험 시간 {formatSecondsToMinutes(totalTime)}분
          </span>
        </div>
        <TimeProgressBar totalTime={totalTime} remainingTime={remainingTime} />
      </div>
      {/* 버튼 영역 */}
      <div className="flex shrink-0 items-center justify-center gap-x-3">
        <HelpButton />
        {status === "examining" && (
          <button
            type="button"
            className={cn(
              "bg-blue-grad text-gs6 h-15 w-50 rounded-2xl",
              (isSubmitting || isSubmitDisabled) && "cursor-not-allowed opacity-60",
            )}
            onClick={onSubmit}
            disabled={isSubmitting || isSubmitDisabled}
          >
            <span className="text-gs6 text-[17px] font-bold">
              {isSubmitting ? "제출 중..." : "답안 제출하기"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
