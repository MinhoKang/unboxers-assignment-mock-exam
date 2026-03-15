import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { API_URL } from "../../../constants/api";
import type { TPostExamSchemaOutput } from "../schemas/postExamSchema";

/**
 * 시험 제출 API
 * @param name: 학생 이름
 * @param school: 학교명
 * @param grade: 학년
 * @param studentNumber: 번호
 * @param seatNumber: 좌석 번호
 * @param answers: {
 *  answerType: "objective" | "subjective",
 *  number: number,
 *  answer: number
 * }[]
 * @returns 시험 채점 결과
 */

export const usePostExam = () => {
  return useMutation({
    mutationFn: async (data: TPostExamSchemaOutput) => {
      const response = await fetch(`${API_URL}/api/exams/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.message ?? "답안 제출에 실패했습니다.");
      }

      return payload;
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "답안 제출에 실패했습니다.";

      toast.error(message);
      console.error(error);
    },
  });
};
