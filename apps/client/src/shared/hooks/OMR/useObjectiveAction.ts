import { useState } from "react";

export const useObjectiveAction = () => {
  const [objectiveAnswers, setObjectiveAnswers] = useState<Record<number, number[]>>({});

  const handleSelectObjective = (question: number, choice: number) => {
    setObjectiveAnswers((prev) => {
      const currentAnswers = prev[question] || [];
      const isSelected = currentAnswers.includes(choice);

      if (isSelected) {
        return {
          ...prev,
          [question]: currentAnswers.filter((currentChoice) => currentChoice !== choice),
        };
      }

      return {
        ...prev,
        [question]: [...currentAnswers, choice],
      };
    });
  };

  return {
    objectiveAnswers,
    handleSelectObjective,
  };
};
