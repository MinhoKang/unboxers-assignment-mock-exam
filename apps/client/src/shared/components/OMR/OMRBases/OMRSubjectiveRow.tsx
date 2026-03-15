import { OMR_STYLES } from "@/shared/constants/omrStyles";
import { cn } from "@/shared/helpers/cn";
import type { TOmrVariant } from "@/shared/types/omrsTypes";

interface OMRSubjectiveRowProps {
  questionNumber: number;
  value: string;
  placeholder: string;
  isFocused: boolean;
  readOnly?: boolean;
  onReadOnlyInteraction?: () => void;
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
  readOnly = false,
  onReadOnlyInteraction,
  maxLength,
  variant = "default",
  onFocus,
  onChange,
  inputRef,
}: OMRSubjectiveRowProps) => {
  return (
    <div className={cn("flex w-full items-stretch", variant === "examCard" && "h-full min-h-0")}>
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
      <div
        className={cn(
          "min-w-0 flex-1 self-stretch",
          isFocused
            ? "bg-gs6 shadow-[inset_0_0_0_2.5px_var(--color-inbrain-lightblue)]"
            : "bg-transparent",
        )}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          className={cn(
            "placeholder:text-grayscale-400-100 block h-full w-full bg-transparent py-[13.83px] text-center text-[17px] font-semibold outline-none placeholder:text-[17px]",
            readOnly && "cursor-not-allowed",
          )}
          onFocus={(event) => {
            if (readOnly) {
              onReadOnlyInteraction?.();
              event.target.blur();
              return;
            }

            onFocus();
          }}
          onChange={(event) => {
            if (readOnly) {
              onReadOnlyInteraction?.();
              return;
            }

            onChange(event.target.value);
          }}
          maxLength={maxLength}
        />
      </div>
    </div>
  );
};
