import type { TActiveLoginField, TLoginKeypadAction } from "../types/authTypes";

export const getLoginDisplayValue = ({
  value,
  isMasked = false,
}: {
  value: string;
  isMasked?: boolean;
}) => {
  return isMasked ? "•".repeat(value.length) : value;
};

export const getActiveLoginValue = ({
  activeField,
  phone,
  password,
}: {
  activeField: TActiveLoginField;
  phone: string;
  password: string;
}) => {
  return activeField === "phone" ? phone : password;
};

export const getLoginCtaLabel = (activeField: TActiveLoginField) => {
  return activeField === "phone" ? "다음" : "로그인";
};

export const isLoginCtaDisabled = (value: string) => {
  return value.length === 0;
};

export const getNextLoginValue = ({
  value,
  keypadAction,
}: {
  value: string;
  keypadAction: TLoginKeypadAction;
}) => {
  if (keypadAction === "backspace") {
    return value.slice(0, -1);
  }

  return value + keypadAction;
};
