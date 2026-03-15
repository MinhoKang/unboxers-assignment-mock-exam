import { useQuery } from "@tanstack/react-query";

import { API_URL } from "../../../constants/api";
import type { TSuccessResponse } from "../types/apiTypes";

export interface TGetExamResponse {
  title: string;
  description: string | null;
  supervisorName: string;
  totalQuestions: number;
  totalScore: number;
}

const getExam = async (): Promise<TSuccessResponse<TGetExamResponse>> => {
  const response = await fetch(`${API_URL}/api/exams`);

  if (!response.ok) {
    throw new Error("Failed to fetch exam information");
  }

  return response.json();
};

export const useGetExam = () => {
  return useQuery({
    queryKey: ["exam", "info"],
    queryFn: getExam,
  });
};
