import { OMR_STYLES } from "@/shared/constants/omrStyles";
import { cn } from "@/shared/helpers/cn";

interface OMRObjectiveButtonProps {
  number: number;
  isSelected: boolean;
  onSelect: () => void;
}

export const OMRObjectiveButton = ({ number, isSelected, onSelect }: OMRObjectiveButtonProps) => {
  return (
    <button
      className={cn(isSelected ? "bg-gs1" : "bg-grayscale-500-100", "h-11 rounded-[20px]")}
      style={{ width: OMR_STYLES.BUBBLE_WIDTH }}
      onClick={onSelect}
    >
      <p className="text-gs6 text-xs font-bold">{number}</p>
    </button>
  );
};
