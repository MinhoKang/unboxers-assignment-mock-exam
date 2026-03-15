import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import { useResultOmrDrag } from "@/features/exam/hooks/useResultOmrDrag";
import { Button } from "@/shared/components/button/Button";
import { OMRCard } from "@/shared/components/OMR/OMRCard";
import { cn } from "@/shared/helpers/cn";

import type { TExamResultScreenData } from "../../types/examResultTypes";
import { ResultSummary } from "./ResultSummary";

interface ResultViewProps {
  examResultData: TExamResultScreenData;
}

/**
 * 시험 결과를 표시하는 컴포넌트
 * 제출된 OMR 카드와 점수 요약, 문항별 결과를 보여줍니다.
 */
export const ResultView = ({ examResultData }: ResultViewProps) => {
  const navigate = useNavigate();
  const { submittedExamData, resultData } = examResultData;
  const {
    dragConstraints,
    isDraggable,
    omrCardRef,
    viewportRef,
    xPosition,
    isDraggingOmr,
    handleDragStart,
    handleDragEnd,
  } = useResultOmrDrag();

  const totalQuestions =
    resultData.correctCount + resultData.wrongCount + resultData.unansweredCount;
  const accuracy =
    totalQuestions > 0 ? Math.round((resultData.correctCount / totalQuestions) * 100) : 0;

  const handleHomeButtonClick = () => {
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gs4 min-h-screen w-full px-[26.04px] py-[25px]"
    >
      <div className="mx-auto max-w-[1520px]">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-gs1 mb-2 text-center text-4xl font-extrabold">{resultData.title}</h1>
        </motion.div>
      </div>

      <div className="w-full lg:grid lg:grid-cols-[minmax(0,1fr)_460px] lg:items-start lg:gap-12">
        {/* 왼쪽: 제출한 OMR 카드 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-10 min-w-0 lg:mb-0"
        >
          <h2 className="text-gs1 mb-4 text-center text-2xl font-bold">제출한 답안</h2>
          <div ref={viewportRef} className="w-full max-w-full overflow-hidden">
            <motion.div
              ref={omrCardRef}
              drag={isDraggable ? "x" : false}
              dragConstraints={dragConstraints}
              dragElastic={0}
              dragMomentum={false}
              style={{ touchAction: "pan-y", x: xPosition }}
              className={cn(
                "w-max select-none",
                isDraggable && "cursor-grab",
                isDraggingOmr && "cursor-grabbing",
              )}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="pointer-events-none w-fit">
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
          </div>
        </motion.div>

        {/* 오른쪽: 결과 요약 */}
        <ResultSummary
          score={resultData.score}
          correctCount={resultData.correctCount}
          wrongCount={resultData.wrongCount}
          unansweredCount={resultData.unansweredCount}
          accuracy={accuracy}
          results={resultData.results}
        />
      </div>
      {/* 하단 액션 버튼들 */}
      <div className="mt-20 flex items-center justify-center gap-x-4">
        <Button label="홈으로 이동" variant="white" onClick={handleHomeButtonClick} />
        <Button label="시험 목록 페이지로" />
      </div>
    </motion.div>
  );
};
