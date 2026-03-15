import { motion } from "motion/react";

import { OMRCard } from "@/shared/components/OMR/OMRCard";

import type { TExamResultScreenData } from "../../types/examResultTypes";

interface ResultViewProps {
  examResultData: TExamResultScreenData;
}

/**
 * 시험 결과를 표시하는 컴포넌트
 * 제출된 OMR 카드와 점수 요약, 문항별 결과를 보여줍니다.
 */
export const ResultView = ({ examResultData }: ResultViewProps) => {
  const { submittedExamData, resultData } = examResultData;

  const totalQuestions =
    resultData.correctCount + resultData.wrongCount + resultData.unansweredCount;
  const accuracy =
    totalQuestions > 0 ? Math.round((resultData.correctCount / totalQuestions) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gs4 min-h-screen w-full px-[26.04px] py-[25px]"
    >
      <div className="mx-auto max-w-6xl">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-2 text-3xl font-bold text-gray-900">{resultData.title}</h1>
          <p className="text-lg text-gray-600">채점 결과</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 왼쪽: 제출된 OMR 카드 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="w-fit">
              <h2 className="mb-4 text-center text-xl font-semibold text-gray-900">제출한 답안</h2>
              <OMRCard
                isMock={true}
                examTitle={submittedExamData.examTitle}
                subject={submittedExamData.subject}
                studentName={submittedExamData.studentName}
                schoolName={submittedExamData.schoolName}
                seatNumber={submittedExamData.seatNumber}
                supervisorName={submittedExamData.supervisorName}
                grade={submittedExamData.grade}
                studentNumber={submittedExamData.studentNumber}
                objectiveQuestionCount={submittedExamData.objectiveQuestionCount}
                subjectiveQuestionCount={submittedExamData.subjectiveQuestionCount}
                objectiveAnswers={submittedExamData.objectiveAnswers}
                subjectiveAnswers={submittedExamData.subjectiveAnswers}
              />
            </div>
          </motion.div>

          {/* 오른쪽: 결과 요약 및 문항별 결과 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-6"
          >
            {/* 점수 요약 */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">점수 요약</h2>

              <div className="space-y-4">
                {/* 총점 */}
                <div className="flex items-center justify-between rounded-lg bg-blue-50 p-4">
                  <span className="text-lg font-medium text-blue-900">총점</span>
                  <span className="text-2xl font-bold text-blue-600">{resultData.score}점</span>
                </div>

                {/* 정답률 */}
                <div className="flex items-center justify-between rounded-lg bg-green-50 p-4">
                  <span className="text-lg font-medium text-green-900">정답률</span>
                  <span className="text-2xl font-bold text-green-600">{accuracy}%</span>
                </div>

                {/* 상세 결과 */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-green-100 p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {resultData.correctCount}
                    </div>
                    <div className="text-sm text-green-800">정답</div>
                  </div>
                  <div className="rounded-lg bg-red-100 p-3 text-center">
                    <div className="text-2xl font-bold text-red-600">{resultData.wrongCount}</div>
                    <div className="text-sm text-red-800">오답</div>
                  </div>
                  <div className="rounded-lg bg-gray-100 p-3 text-center">
                    <div className="text-2xl font-bold text-gray-600">
                      {resultData.unansweredCount}
                    </div>
                    <div className="text-sm text-gray-800">미응답</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 문항별 결과 */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">문항별 결과</h2>

              <div className="max-h-64 space-y-2 overflow-y-auto">
                {resultData.results.map((result) => (
                  <div
                    key={`${result.answerType}-${result.number}`}
                    className={`flex items-center justify-between rounded-lg p-3 ${
                      result.result === "correct"
                        ? "border-l-4 border-green-400 bg-green-50"
                        : "border-l-4 border-red-400 bg-red-50"
                    }`}
                  >
                    <span className="font-medium">
                      {result.answerType === "objective" ? "객관식" : "주관식"} {result.number}번
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        result.result === "correct"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {result.result === "correct" ? "정답" : "오답"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 하단 액션 버튼들 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 flex justify-center gap-4"
        >
          <motion.button
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // localStorage 정리 후 시험 페이지로 이동
              localStorage.removeItem("examResultData");
              window.location.href = "/exam";
            }}
          >
            다시 시험 보기
          </motion.button>

          <motion.button
            className="rounded-lg bg-gray-600 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // localStorage 정리 후 홈으로 이동
              localStorage.removeItem("examResultData");
              window.location.href = "/";
            }}
          >
            홈으로 이동
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};
