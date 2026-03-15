import { cn } from "@/shared/helpers/cn";

import { LOGIN_FIELD_PLACEHOLDERS } from "../../constants/login";
import type {
  TActiveLoginField,
  TLoginKeypadAction,
  TLoginKeypadItem,
} from "../../types/authTypes";
import { AuthKeypad } from "../keypad/AuthKeypad";
import { LoginField } from "../loginField/LoginField";

interface AuthLoginFormProps {
  phone: string;
  password: string;
  activeField: TActiveLoginField;
  ctaLabel: string;
  isCtaDisabled: boolean;
  keypadItems: readonly TLoginKeypadItem[];
  onFieldSelect: (field: TActiveLoginField) => void;
  onKeypadClick: (item: TLoginKeypadAction) => void;
  onSubmit: () => void;
}

export const AuthLoginForm = ({
  phone,
  password,
  activeField,
  ctaLabel,
  isCtaDisabled,
  keypadItems,
  onFieldSelect,
  onKeypadClick,
  onSubmit,
}: AuthLoginFormProps) => {
  return (
    <div className="flex w-[210px] flex-col gap-[10px]">
      <div className="flex flex-col gap-[10px]">
        <LoginField
          value={phone}
          placeholder={LOGIN_FIELD_PLACEHOLDERS.phone}
          isActive={activeField === "phone"}
          onClick={() => onFieldSelect("phone")}
        />
        <LoginField
          value={password}
          placeholder={LOGIN_FIELD_PLACEHOLDERS.password}
          isActive={activeField === "password"}
          isMasked
          onClick={() => onFieldSelect("password")}
        />
      </div>

      <AuthKeypad items={keypadItems} onKeypadClick={onKeypadClick} />

      <button
        type="button"
        onClick={onSubmit}
        disabled={isCtaDisabled}
        className={cn(
          "shadow-floating-xs mt-1 flex h-[46px] items-center justify-center rounded-[10.5px] text-[14px] font-semibold transition",
          "enabled:bg-blue-grad enabled:text-gs6 enabled:hover:opacity-95 enabled:active:scale-[0.99]",
          "disabled:bg-gs5 disabled:text-[#aab3c3]",
        )}
      >
        {ctaLabel}
      </button>
    </div>
  );
};
