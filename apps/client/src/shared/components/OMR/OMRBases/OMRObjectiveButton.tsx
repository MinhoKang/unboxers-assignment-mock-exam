import { OMR_STYLES } from "@/shared/constants/omrStyles";
import { cn } from "@/shared/helpers/cn";

interface OMRObjectiveButtonProps {
  number: number;
  isSelected: boolean;
  isDisabled?: boolean;
  onSelect: () => void;
}

export const OMRObjectiveButton = ({
  number,
  isSelected,
  isDisabled = false,
  onSelect,
}: OMRObjectiveButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        isSelected ? "bg-gs1" : "bg-grayscale-500-100",
        isDisabled && "cursor-not-allowed",
        "h-11 rounded-[20px]",
      )}
      style={{ width: OMR_STYLES.BUBBLE_WIDTH }}
      onClick={onSelect}
      aria-disabled={isDisabled}
    >
      <p className="text-gs6 text-xs font-bold">{number}</p>
    </button>
  );
};
