import { useState } from "react";

import type { TObjectiveAnswer } from "@/shared/types/omrsTypes";

export const useObjectiveAction = () => {
  const [objectiveAnswers, setObjectiveAnswers] = useState<TObjectiveAnswer>({});

  /**
   * 문항별 선택지 배열에서 특정 보기를 토글합니다.
   * 이미 선택된 보기는 제거하고, 없으면 추가해서 다중 선택 상태를 불변적으로 유지합니다.
   * @param question 변경할 문항 번호
   * @param choice 토글할 선택지 번호
   * @returns void
   */
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
