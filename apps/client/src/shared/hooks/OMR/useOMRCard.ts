import { useState } from "react";

import type { TDigitKey, TGradeValue, TStudentNumberValue } from "@/shared/types/omrsTypes";

export const useOMRCard = () => {
  const [grade, setGrade] = useState<TGradeValue | null>(null);
  const [studentNumber, setStudentNumber] = useState<TStudentNumberValue>({
    tens: null,
    ones: null,
  });

  const handleGradeChange = (value: TGradeValue) => {
    setGrade((prev) => (prev === value ? null : value));
  };

  const handleNumberChange = (digit: TDigitKey, value: number) => {
    setStudentNumber((prev: TStudentNumberValue) => ({
      ...prev,
      [digit]: prev[digit] === value ? null : value,
    }));
  };

  return {
    grade,
    studentNumber,
    handleGradeChange,
    handleNumberChange,
  };
};
