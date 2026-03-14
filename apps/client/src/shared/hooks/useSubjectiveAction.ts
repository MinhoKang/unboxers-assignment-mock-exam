import { useRef, useState } from "react";

import { isValidChar } from "@/shared/helpers/omrs";

export const useSubjectiveAction = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [focusedField, setFocusedField] = useState<number | null>(null);
  const fieldRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const handleChange = (questionNumber: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionNumber]: value }));
  };

  const handleFieldFocus = (questionNumber: number) => {
    setFocusedField(questionNumber);
  };

  const handleKeypadInput = (value: string) => {
    if (!focusedField) return;

    const currentValue = answers[focusedField] || "";

    if (value === "backspace") {
      const newValue = currentValue.slice(0, -1);
      handleChange(focusedField, newValue);
    } else if (isValidChar(value) && currentValue.length < 15) {
      const newValue = currentValue + value;
      handleChange(focusedField, newValue);
    }
  };

  const handleComplete = () => {
    if (!focusedField || !(answers[focusedField] || "").length) return;

    fieldRefs.current[focusedField]?.blur();
    setFocusedField(null);
  };

  return {
    answers,
    focusedField,
    fieldRefs,
    handleChange,
    handleFieldFocus,
    handleKeypadInput,
    handleComplete,
  };
};
