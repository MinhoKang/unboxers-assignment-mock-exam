import { useEffect, useState } from "react";

import { isValidChar } from "../helpers/omrs";

interface UseOMRSubjectiveInputProps {
  questionCount: number;
  values: Record<number, string>;
  onChange?: (questionNumber: number, value: string) => void;
  onFieldFocus?: (questionNumber: number) => void;
  maxLength: number;
  isTutorial?: boolean;
  focusedField?: number | null;
}

export const useOMRSubjectiveInput = ({
  questionCount,
  values,
  onChange,
  onFieldFocus,
  maxLength,
  isTutorial = false,
  focusedField,
}: UseOMRSubjectiveInputProps) => {
  const [fieldValues, setFieldValues] = useState<Record<number, string>>(values);

  // questionCount에 따라 질문 번호 배열 생성
  const questionNumbers = Array.from({ length: questionCount }, (_, i) => i + 1);

  const getPlaceholder = (num: number) => {
    if (focusedField === num) {
      return "답안을 입력하세요";
    }

    if (isTutorial && num === 4) {
      return "여기를 터치하세요!";
    }
    return "터치해서 주관식 답안 입력";
  };

  const updateFieldValue = (questionNumber: number, value: string) => {
    const newValues = { ...fieldValues, [questionNumber]: value };
    setFieldValues(newValues);
    onChange?.(questionNumber, value);
  };

  const handleInputFocus = (questionNumber: number) => {
    onFieldFocus?.(questionNumber);
  };

  const handleInputChange = (questionNumber: number, value: string) => {
    // 유효한 문자만 허용
    const filteredValue = value
      .split("")
      .filter((char) => isValidChar(char))
      .join("");
    const truncatedValue = filteredValue.slice(0, maxLength);

    updateFieldValue(questionNumber, truncatedValue);
  };

  useEffect(() => {
    setFieldValues(values);
  }, [values]);

  return {
    fieldValues,
    questionNumbers,
    handleInputFocus,
    handleInputChange,
    getPlaceholder,
  };
};
