export type TActiveLoginField = "phone" | "password";

export type TLoginKeypadValue = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type TLoginKeypadItem = TLoginKeypadValue | "spacer" | "backspace";
export type TLoginKeypadAction = Exclude<TLoginKeypadItem, "spacer">;

export interface TLoginBrandingLine {
  text: string;
  className: string;
}
