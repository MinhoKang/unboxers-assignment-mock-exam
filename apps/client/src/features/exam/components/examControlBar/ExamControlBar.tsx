import { cn } from "@/shared/helpers/cn";
import { formatSecondsToMinutesAndSeconds } from "@/shared/helpers/time";
import { TimeProgressBar } from "@/shared/ui/TimeProgressBar";

import type { TExamSessionStatus } from "../../types/examSessionTypes";
import { HelpButton } from "./HelpButton";

interface ExamControlBarProps {
  status: TExamSessionStatus;
  totalTime: number;
  remainingTime: number; // 초 단위
  onSubmit?: () => void;
  isSubmitting?: boolean;
  isSubmitDisabled?: boolean;
  submitLabel?: string;
}

export const ExamControlBar = ({
  status,
  totalTime,
  remainingTime,
  onSubmit,
  isSubmitting = false,
  isSubmitDisabled = false,
  submitLabel,
}: ExamControlBarProps) => {
  const isWaiting = status === "waiting";
  const isFinished = status === "finished";

  const getTimeDescription = () => {
    switch (status) {
      case "waiting":
        return "시험 시작까지 남은 시간";
      case "examining":
        return "시험 종료까지 남은 시간";
      case "finished":
        return "시험이 종료되었습니다";
    }
  };
  const resolvedSubmitLabel = submitLabel ?? (isSubmitting ? "제출 중..." : "답안 제출하기");

  return (
    <div className="bg-gs6 shadow-floating-sm flex w-full items-center justify-center gap-x-9 rounded-2xl px-15 py-7.5">
      {/* 시간 영억 */}
      <div className="flex flex-1 flex-col gap-2">
        <span className="text-black-grad text-[17px] font-extrabold">{getTimeDescription()}</span>
        <div className="flex items-end justify-between">
          <span
            className={cn(
              !isFinished && remainingTime <= 10 ? "text-red" : "text-black-grad",
              "text-5xl font-extrabold",
            )}
          >
            {formatSecondsToMinutesAndSeconds(remainingTime)}
            {status === "waiting" && " 후 시작"}
          </span>
          {!isWaiting && (
            <span className="text-black-grad text-[17px] font-semibold">
              시험 시간 {formatSecondsToMinutesAndSeconds(totalTime)}
            </span>
          )}
        </div>
        <TimeProgressBar
          animationKey={status}
          totalTime={totalTime}
          remainingTime={remainingTime}
        />
      </div>
      {/* 버튼 영역 */}
      <div className="flex shrink-0 items-center justify-center gap-x-3">
        <HelpButton />
        {status !== "waiting" && onSubmit && (
          <button
            type="button"
            className={cn(
              "bg-blue-grad text-gs6 h-15 w-50 rounded-2xl",
              (isSubmitting || isSubmitDisabled) && "cursor-not-allowed opacity-60",
            )}
            onClick={onSubmit}
            disabled={isSubmitting || isSubmitDisabled}
          >
            <span className="text-gs6 text-[17px] font-bold">{resolvedSubmitLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
};
