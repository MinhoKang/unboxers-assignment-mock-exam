import { useState } from "react";

export const useOMRMultipleChoiceView = () => {
  const [answers, setAnswers] = useState<Record<number, number[]>>({});

  const handleSelect = (question: number, choice: number) => {
    setAnswers((prev) => {
      const current = prev[question] ?? [];
      const next = current.includes(choice)
        ? current.filter((c) => c !== choice)
        : [...current, choice];
      return { ...prev, [question]: next };
    });
  };

  return {
    answers,
    handleSelect,
  };
};
