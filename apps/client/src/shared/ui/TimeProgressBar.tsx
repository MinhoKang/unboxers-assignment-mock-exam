import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";

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

const progressFillVariants = cva("h-full w-full origin-left transform-gpu will-change-transform", {
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
  animationKey?: string | number;
  totalTime: number;
  remainingTime: number;
  criticalThreshold?: number;
}

export const TimeProgressBar = ({
  animationKey,
  totalTime,
  remainingTime,
  criticalThreshold = 10,
  className,
  ...props
}: TimeProgressBarProps) => {
  const clampedRemainingTime = Math.max(0, remainingTime);
  const progressRatio =
    totalTime > 0 ? Math.max(0, Math.min(1, clampedRemainingTime / totalTime)) : 0;
  const isCritical = clampedRemainingTime <= criticalThreshold;
  const resolvedAnimationKey = `${String(animationKey ?? "time-progress-bar")}-${totalTime}`;

  return (
    <div className={cn(timeProgressBarVariants(), className)} {...props}>
      <motion.div
        key={resolvedAnimationKey}
        className={cn(
          progressFillVariants({
            color: isCritical ? "critical" : "normal",
          }),
        )}
        initial={{ scaleX: progressRatio }}
        animate={{ scaleX: 0 }}
        transition={{
          duration: clampedRemainingTime,
          ease: "linear",
        }}
      />
    </div>
  );
};
