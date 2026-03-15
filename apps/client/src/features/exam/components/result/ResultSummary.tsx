import { motion } from "motion/react";

import type { TExamQuestionResult } from "../../types/examResultTypes";

interface ResultSummaryProps {
  score: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  accuracy: number;
  results: TExamQuestionResult[];
}

export const ResultSummary = ({
  score,
  correctCount,
  wrongCount,
  unansweredCount,
  accuracy,
  results,
}: ResultSummaryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="w-full space-y-6 lg:w-[460px]"
    >
      {/* 1. 점수 요약 카드 */}
      {/* shadow를 줄이고 border를 미세하게 추가하여 종이 같은 느낌 강조 */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-gs1 mb-5 text-lg font-bold">점수 요약</h2>

        <div className="space-y-3">
          {/* 총점 */}
          <div className="bg-score-bg flex items-center justify-between rounded-lg px-5 py-4">
            <span className="text-inbrain-blue font-bold">총점</span>
            <span className="text-inbrain-blue text-2xl font-extrabold">{score}점</span>
          </div>

          {/* 정답률 */}
          <div className="bg-correct-bg flex items-center justify-between rounded-lg px-5 py-4">
            <span className="text-correct-label font-bold">정답률</span>
            <span className="text-correct-text text-2xl font-extrabold">{accuracy}%</span>
          </div>

          {/* 상세 결과 (그리드 간격 조절 및 배경색 변경) */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="bg-correct-bg flex flex-col items-center justify-center rounded-lg py-4">
              <span className="text-correct-text text-2xl font-bold">{correctCount}</span>
              <span className="text-correct-label mt-1 text-xs font-medium">정답</span>
            </div>
            <div className="bg-incorrect-bg flex flex-col items-center justify-center rounded-lg py-4">
              <span className="text-incorrect-border text-2xl font-bold">{wrongCount}</span>
              <span className="text-incorrect-label mt-1 text-xs font-medium">오답</span>
            </div>
            <div className="bg-unanswered-bg flex flex-col items-center justify-center rounded-lg py-4">
              <span className="text-unanswered-text text-2xl font-bold">{unansweredCount}</span>
              <span className="text-unanswered-text mt-1 text-xs font-medium">미응답</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 문항별 결과 카드 */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-gs1 mb-5 text-lg font-bold">문항별 결과</h2>

        <div className="custom-scrollbar max-h-[320px] space-y-2 overflow-y-auto pr-2">
          {results.map((result) => (
            <div
              key={`${result.answerType}-${result.number}`}
              className={`flex items-center justify-between rounded-md px-4 py-3.5 ${
                result.result === "correct"
                  ? "border-correct-text bg-correct-bg/50 border-l-[3px]"
                  : "border-incorrect-border bg-incorrect-bg/50 border-l-[3px]"
              }`}
            >
              <span className="text-gs1 text-sm font-medium">
                {result.answerType === "objective" ? "객관식" : "주관식"} {result.number}번
              </span>
              <span
                className={`text-sm font-bold ${
                  result.result === "correct" ? "text-correct-label" : "text-incorrect-label"
                }`}
              >
                {result.result === "correct" ? "정답" : "오답"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
