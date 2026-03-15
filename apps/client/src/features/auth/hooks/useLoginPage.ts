import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getActiveLoginValue,
  getLoginCtaLabel,
  getNextLoginValue,
  isLoginCtaDisabled,
} from "../helpers/loginHelpers";
import type { TActiveLoginField, TLoginKeypadAction } from "../types/authTypes";

export const useLoginPage = () => {
  const navigate = useNavigate();

  const [activeField, setActiveField] = useState<TActiveLoginField>("phone");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const activeValue = getActiveLoginValue({ activeField, phone, password });
  const ctaLabel = getLoginCtaLabel(activeField);
  const isCtaDisabled = isLoginCtaDisabled(activeValue);

  const handleFieldSelect = (field: TActiveLoginField) => {
    setActiveField(field);
  };

  const handleKeypadClick = (keypadAction: TLoginKeypadAction) => {
    if (activeField === "phone") {
      setPhone((prev) => getNextLoginValue({ value: prev, keypadAction }));
      return;
    }

    setPassword((prev) => getNextLoginValue({ value: prev, keypadAction }));
  };

  const handleCtaClick = () => {
    if (isCtaDisabled) {
      return;
    }

    if (activeField === "phone") {
      setActiveField("password");
      return;
    }

    navigate("/tutorial");
  };

  return {
    activeField,
    phone,
    password,
    ctaLabel,
    isCtaDisabled,
    handleFieldSelect,
    handleKeypadClick,
    handleCtaClick,
  };
};
