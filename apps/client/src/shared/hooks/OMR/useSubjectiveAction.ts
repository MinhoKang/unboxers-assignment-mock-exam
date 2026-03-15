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

  /**
   * 현재 포커스된 주관식 답안에 키패드 입력을 반영합니다.
   * 포커스가 없으면 무시하고, backspace는 마지막 글자를 제거하며 그 외 입력은 허용 문자와 최대 길이 조건을 통과해야만 추가합니다.
   * @param value 키패드에서 들어온 문자 또는 backspace
   * @returns void
   */
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
