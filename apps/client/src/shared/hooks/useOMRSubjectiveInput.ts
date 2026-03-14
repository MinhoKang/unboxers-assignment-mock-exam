import { useEffect, useState } from "react";

import { isValidChar } from "../helpers/omrs";

interface UseOMRSubjectiveInputProps {
  questionCount: number;
  values: Record<number, string>;
  onChange?: (questionNumber: number, value: string) => void;
  onFieldFocus?: (questionNumber: number) => void;
  maxLength: number;
}

export const useOMRSubjectiveInput = ({
  questionCount,
  values,
  onChange,
  onFieldFocus,
  maxLength,
}: UseOMRSubjectiveInputProps) => {
  const [fieldValues, setFieldValues] = useState<Record<number, string>>(values);

  // questionCount에 따라 질문 번호 배열 생성
  const questionNumbers = Array.from({ length: questionCount }, (_, i) => i + 1);

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
  };
};
