import { OMR_STYLES } from "@/shared/constants/omrStyles";
import { cn } from "@/shared/helpers/cn";
import type { TOmrVariant } from "@/shared/types/omrsTypes";

interface OMRSubjectiveRowProps {
  questionNumber: number;
  value: string;
  placeholder: string;
  isFocused: boolean;
  maxLength: number;
  variant?: TOmrVariant;
  onFocus: () => void;
  onChange: (value: string) => void;
  inputRef?: (ref: HTMLInputElement | null) => void;
}

export const OMRSubjectiveRow = ({
  questionNumber,
  value,
  placeholder,
  isFocused,
  maxLength,
  variant = "default",
  onFocus,
  onChange,
  inputRef,
}: OMRSubjectiveRowProps) => {
  return (
    <div className={cn("flex w-full items-center", variant === "examCard" && "h-full min-h-0")}>
      {variant === "examCard" ? (
        <div
          className="bg-inbrain-lightblue/15 border-inbrain-lightblue flex h-full shrink-0 items-center justify-center border-r-[1.5px]"
          style={{ width: OMR_STYLES.LABEL_WIDTH }}
        >
          <span className="text-inbrain-blue text-[17px] font-semibold">{questionNumber}</span>
        </div>
      ) : (
        <div
          className="bg-inbrain-lightblue/20 border-x-inbrain-lightblue flex shrink-0 items-center justify-center self-stretch border-x-[1.5px]"
          style={{ width: OMR_STYLES.LABEL_WIDTH }}
        >
          <span className="text-inbrain-blue shrink-0 text-right text-[17px] font-semibold">
            {questionNumber}
          </span>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder={placeholder}
          className={cn(
            "placeholder:text-grayscale-400-100 block max-h-[47.67px] w-full py-[13.83px] text-center text-[17px] font-semibold outline-none placeholder:text-[17px]",
            isFocused
              ? "bg-gs6 shadow-[inset_0_0_0_2.5px_var(--color-inbrain-lightblue)]"
              : "bg-transparent",
          )}
          onFocus={onFocus}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
        />
      </div>
    </div>
  );
};
