import { KEYPAD_ITEMS } from "@/shared/constants/omrs";
import { OMR_STYLES } from "@/shared/constants/omrStyles";
import { cn } from "@/shared/helpers/cn";
import { isValidChar } from "@/shared/helpers/omrs";

interface NumericKeypadProps {
  onInput: (value: string) => void;
  onComplete: () => void;
  focusedField?: number | null;
  currentValue?: string;
  isReadOnly?: boolean;
  onBlockedInteraction?: () => void;
}

interface KeypadButtonProps {
  value: string;
  onClick: (value: string) => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
}

const KeypadButton = ({
  value,
  onClick,
  className = "",
  children,
  disabled = false,
  ariaLabel,
}: KeypadButtonProps) => (
  <button
    type="button"
    className={cn(
      "shadow-floating-xs flex h-13 w-full cursor-pointer items-center justify-center rounded-xl bg-white",
      "text-gs1 text-xl font-bold transition-colors outline-none",
      "enabled:hover:bg-gs5 enabled:active:bg-gs4",
      "focus-visible:ring-inbrain-lightblue focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:bg-gs5 disabled:text-gs3 disabled:cursor-not-allowed",
      className,
    )}
    onClick={() => onClick(value)}
    disabled={disabled}
    aria-label={ariaLabel}
  >
    {children || value}
  </button>
);

export const NumericKeypad = ({
  onInput,
  onComplete,
  focusedField,
  currentValue,
  isReadOnly = false,
  onBlockedInteraction,
}: NumericKeypadProps) => {
  const isCompleteDisabled = !focusedField || !currentValue?.length;

  const handleButtonClick = (value: string) => {
    if (isReadOnly) {
      onBlockedInteraction?.();
      return;
    }

    if (value === "complete") {
      onComplete();
    } else if (value === "backspace") {
      onInput("backspace");
    } else if (isValidChar(value)) {
      onInput(value);
    }
  };

  return (
    <div
      className={cn("grid grid-cols-3 gap-3", isReadOnly && "opacity-60")}
      style={{ width: OMR_STYLES.NUMERIC_KEYPAD_WIDTH }}
    >
      <div
        className={cn(
          "shadow-floating-xs col-span-3 flex h-13 items-center justify-center rounded-xl bg-white px-4 text-center",
          focusedField ? "border-inbrain-lightblue border-2" : "border border-transparent",
        )}
      >
        {!focusedField && (
          <span className="text-grayscale-400-100 text-[17px] font-bold">
            입력할 곳을 터치해주세요
          </span>
        )}
        {!!focusedField && !currentValue && (
          <span className="text-grayscale-400-100 text-[17px] font-bold">
            {focusedField}번 답안을 입력하세요
          </span>
        )}
        {currentValue && <div className="text-gs1 text-[17px] font-bold">{currentValue}</div>}
      </div>

      {KEYPAD_ITEMS.map((item) => {
        const isCompleteButton = item.value === "complete";

        return (
          <KeypadButton
            key={item.value}
            value={item.value}
            onClick={handleButtonClick}
            className={cn(
              item.colSpan === 2 && "col-span-2",
              item.colSpan === 3 && "col-span-3",
              isCompleteButton && "h-13",
              isCompleteButton &&
                !isCompleteDisabled &&
                "bg-blue-grad text-gs6 enabled:hover:opacity-90 enabled:active:opacity-80",
            )}
            disabled={isCompleteButton && !isReadOnly && isCompleteDisabled}
            ariaLabel={item.ariaLabel}
          >
            {item.icon || item.label}
          </KeypadButton>
        );
      })}
    </div>
  );
};
