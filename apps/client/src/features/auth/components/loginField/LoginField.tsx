import { cn } from "@/shared/helpers/cn";

import { getLoginDisplayValue } from "../../helpers/loginHelpers";

interface LoginFieldProps {
  value: string;
  placeholder: string;
  isActive: boolean;
  isMasked?: boolean;
  onClick: () => void;
}

export const LoginField = ({
  value,
  placeholder,
  isActive,
  isMasked = false,
  onClick,
}: LoginFieldProps) => {
  const displayValue = getLoginDisplayValue({ value, isMasked });

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "shadow-floating-xs w-[210px] rounded-[12px] p-[2px] transition",
        isActive ? "bg-blue-grad" : "bg-white",
      )}
    >
      <div className="flex h-[38px] items-center justify-center rounded-[10px] bg-white px-4">
        <div className="flex h-full items-center justify-center overflow-hidden text-center">
          {displayValue ? (
            <>
              <span className="text-gs1 text-[16px] font-bold">{displayValue}</span>
              {isActive && (
                <span className="bg-gs1 ml-px h-[45%] w-px animate-pulse rounded-full" />
              )}
            </>
          ) : (
            <span
              className={cn(
                "text-[14px] font-bold",
                isActive ? "text-[#c8d1e6]" : "text-[#d6d6d6]",
              )}
            >
              {placeholder}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};
