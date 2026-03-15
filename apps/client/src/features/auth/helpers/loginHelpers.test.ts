import { describe, expect, it } from "vitest";

import {
  getActiveLoginValue,
  getLoginCtaLabel,
  getLoginDisplayValue,
  getNextLoginValue,
  isLoginCtaDisabled,
} from "./loginHelpers";

describe("loginHelpers", () => {
  it("masks the display value only when requested", () => {
    expect(getLoginDisplayValue({ value: "1234" })).toBe("1234");
    expect(getLoginDisplayValue({ value: "1234", isMasked: true })).toBe("••••");
  });

  it("returns the active field value and CTA label", () => {
    expect(
      getActiveLoginValue({
        activeField: "phone",
        phone: "010",
        password: "secret",
      }),
    ).toBe("010");

    expect(
      getActiveLoginValue({
        activeField: "password",
        phone: "010",
        password: "secret",
      }),
    ).toBe("secret");

    expect(getLoginCtaLabel("phone")).toBe("다음");
    expect(getLoginCtaLabel("password")).toBe("로그인");
  });

  it("derives the disabled state from emptiness only", () => {
    expect(isLoginCtaDisabled("")).toBe(true);
    expect(isLoginCtaDisabled("0")).toBe(false);
  });

  it("appends keypad input and handles backspace safely", () => {
    expect(getNextLoginValue({ value: "01", keypadAction: "2" })).toBe("012");
    expect(getNextLoginValue({ value: "012", keypadAction: "backspace" })).toBe("01");
    expect(getNextLoginValue({ value: "", keypadAction: "backspace" })).toBe("");
  });
});
