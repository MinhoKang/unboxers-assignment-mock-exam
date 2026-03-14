import { cn } from "@/shared/helpers/cn";

interface OMRMultipleChoiceButtonProps {
  number: number;
  isSelected: boolean;
  onSelect: () => void;
}

export const OMRMultipleChoiceButton = ({
  number,
  isSelected,
  onSelect,
}: OMRMultipleChoiceButtonProps) => {
  return (
    <button
      className={cn(isSelected ? "bg-gs1" : "bg-grayscale-500-100", "h-11 w-5 rounded-[20px]")}
      onClick={onSelect}
    >
      <p className="text-gs6 text-xs font-bold">{number}</p>
    </button>
  );
};
