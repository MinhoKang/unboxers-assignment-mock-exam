import type { TLoginBrandingLine, TLoginKeypadItem } from "../types/authTypes";

export const LOGIN_KEYPAD_ITEMS: TLoginKeypadItem[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "spacer",
  "0",
  "backspace",
];

export const LOGIN_BRANDING_LINES: TLoginBrandingLine[] = [
  { text: "안 되면 될 때까지", className: "text-inbrain-blue" },
  { text: "우리는 결국 오른다", className: "text-inbrain-lightblue" },
];

export const LOGIN_BRANDING_SUBTITLE = "베이스 수학학원 ONLINE";

export const LOGIN_FIELD_PLACEHOLDERS = {
  phone: "전화번호",
  password: "비밀번호",
} as const;
