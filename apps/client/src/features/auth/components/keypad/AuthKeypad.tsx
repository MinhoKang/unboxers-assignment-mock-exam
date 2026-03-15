import { cn } from "@/shared/helpers/cn";
import { Delete } from "@/shared/icons";

import type { TLoginKeypadAction, TLoginKeypadItem } from "../../types/authTypes";

interface AuthKeypadProps {
  items: readonly TLoginKeypadItem[];
  onKeypadClick: (item: TLoginKeypadAction) => void;
}

interface KeypadButtonProps {
  item: TLoginKeypadItem;
  onKeypadClick: (item: TLoginKeypadAction) => void;
}

const KeypadButton = ({ item, onKeypadClick }: KeypadButtonProps) => {
  if (item === "spacer") {
    return <div aria-hidden="true" className="h-[42px]" />;
  }

  return (
    <button
      type="button"
      onClick={() => onKeypadClick(item)}
      aria-label={item === "backspace" ? "한 글자 지우기" : `${item} 입력`}
      className={cn(
        "shadow-floating-xs text-gs1 flex h-[42px] items-center justify-center rounded-xl bg-white text-[30px] font-semibold transition",
        "hover:bg-gs5 active:bg-gs4",
      )}
    >
      {item === "backspace" ? <Delete /> : item}
    </button>
  );
};

export const AuthKeypad = ({ items, onKeypadClick }: AuthKeypadProps) => {
  return (
    <div className="grid grid-cols-3 gap-[9px]">
      {items.map((item, index) => (
        <KeypadButton
          key={item === "spacer" ? `spacer-${index}` : item}
          item={item}
          onKeypadClick={onKeypadClick}
        />
      ))}
    </div>
  );
};
