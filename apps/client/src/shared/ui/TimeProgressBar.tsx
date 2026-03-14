import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/helpers/cn";

const timeProgressBarVariants = cva("relative h-2 w-full rounded-full overflow-hidden", {
  variants: {
    background: {
      default: "bg-gs4",
    },
  },
  defaultVariants: {
    background: "default",
  },
});

const progressFillVariants = cva("h-full transition-all duration-300 ease-out", {
  variants: {
    color: {
      normal: "bg-black-grad",
      critical: "bg-red",
    },
  },
  defaultVariants: {
    color: "normal",
  },
});

interface TimeProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof timeProgressBarVariants> {
  totalTime: number;
  remainingTime: number;
  criticalThreshold?: number;
}

export const TimeProgressBar = ({
  totalTime,
  remainingTime,
  criticalThreshold = 10,
  className,
  ...props
}: TimeProgressBarProps) => {
  const progressPercentage = Math.max(0, Math.min(100, (remainingTime / totalTime) * 100));
  const isCritical = remainingTime <= criticalThreshold;

  return (
    <div className={cn(timeProgressBarVariants(), className)} {...props}>
      <div
        className={cn(
          progressFillVariants({
            color: isCritical ? "critical" : "normal",
          }),
        )}
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};
