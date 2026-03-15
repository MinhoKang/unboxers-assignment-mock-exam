import { useRef, useState } from "react";

import { isValidChar } from "@/shared/helpers/omrs";
import type { TSubjectiveAnswer } from "@/shared/types/omrsTypes";

export const useSubjectiveAction = () => {
  const [subjectiveAnswers, setSubjectiveAnswers] = useState<TSubjectiveAnswer>({});
  const [focusedField, setFocusedField] = useState<number | null>(null);
  const fieldRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const handleChange = (questionNumber: number, value: string) => {
    setSubjectiveAnswers((prev) => ({ ...prev, [questionNumber]: value }));
  };

  const handleFieldFocus = (questionNumber: number) => {
    setFocusedField(questionNumber);
  };

  const handleKeypadInput = (value: string) => {
    if (!focusedField) return;

    const currentValue = subjectiveAnswers[focusedField] || "";

    if (value === "backspace") {
      const newValue = currentValue.slice(0, -1);
      handleChange(focusedField, newValue);
    } else if (isValidChar(value) && currentValue.length < 15) {
      const newValue = currentValue + value;
      handleChange(focusedField, newValue);
    }
  };

  const handleComplete = () => {
    if (!focusedField || !(subjectiveAnswers[focusedField] || "").length) return;

    fieldRefs.current[focusedField]?.blur();
    setFocusedField(null);
  };

  return {
    answers: subjectiveAnswers,
    subjectiveAnswers,
    focusedField,
    fieldRefs,
    handleChange,
    handleFieldFocus,
    handleKeypadInput,
    handleComplete,
  };
};
