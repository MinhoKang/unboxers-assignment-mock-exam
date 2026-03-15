import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ResultView } from "@/features/exam/components/result/ResultView";

import type { TExamResultScreenData } from "../features/exam/types/examResultTypes";

/**
 * 새로고침 시 바로 결과만 표시하는 독립 페이지
 * 같은 탭 새로고침 복구를 위해 sessionStorage에서 데이터를 읽어옵니다.
 */
const ResultPage = () => {
  const navigate = useNavigate();
  const [examResultData, setExamResultData] = useState<TExamResultScreenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResultData = () => {
      try {
        const savedData = sessionStorage.getItem("examResultData");
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setExamResultData(parsedData);
        } else {
          // 결과 데이터가 없으면 시험 페이지로 리다이렉트
          navigate("/exam");
          return;
        }
      } catch (error) {
        console.error("결과 데이터 로딩 실패:", error);
        navigate("/exam");
        return;
      } finally {
        setIsLoading(false);
      }
    };

    loadResultData();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="bg-gs4 flex min-h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-lg text-gray-600">결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!examResultData) {
    return (
      <div className="bg-gs4 flex min-h-screen w-full items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">결과 데이터를 찾을 수 없습니다</h2>
          <button
            onClick={() => navigate("/exam")}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            시험 페이지로 이동
          </button>
        </div>
      </div>
    );
  }

  return <ResultView examResultData={examResultData} />;
};

export default ResultPage;
