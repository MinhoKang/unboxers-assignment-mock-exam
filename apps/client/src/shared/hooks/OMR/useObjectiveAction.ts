import { useState } from "react";

import type { TObjectiveAnswer } from "@/shared/types/omrsTypes";

export const useObjectiveAction = () => {
  const [objectiveAnswers, setObjectiveAnswers] = useState<TObjectiveAnswer>({});

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
