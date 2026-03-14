import { useState } from "react";

export const useOMRMultipleChoiceView = () => {
  const [answers, setAnswers] = useState<Record<number, number[]>>({});

  const is15thQuestionAnswered = answers[15]?.includes(3);

  /**
   *
   * @param question 문항 번호
   * @param choice 선택지 번호
   * @returns void
   */
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
    is15thQuestionAnswered,
  };
};
