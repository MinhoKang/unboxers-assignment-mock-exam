import { motion } from "motion/react";

import { Button } from "@/shared/components/button/Button";
import { OMRCard } from "@/shared/components/OMR/OMRCard";

import { useExamCompletionView } from "../../hooks/useExamCompletionView";
import type { TExamResultScreenData } from "../../types/examResultTypes";
import { ExamHeader } from "../header/ExamHeader";

const OMR_CARD_SCALE = 0.6;

interface ExamCompletionViewProps {
  examResultData: TExamResultScreenData;
  onViewResults: () => void;
}

/**
 * 시험 제출 완료 후 보여지는 화면
 * OMR 카드 축소 애니메이션과 "결과 보기" 버튼을 표시합니다.
 */
export const ExamCompletionView = ({ examResultData, onViewResults }: ExamCompletionViewProps) => {
  const { submittedExamData } = examResultData;

  const { omrCardRef, omrCardHeight } = useExamCompletionView();

  return (
    <div className="bg-gs4 flex min-h-screen w-full flex-col gap-y-[100px] px-[26.04px] py-[25px]">
      <ExamHeader shouldConfirmExit={false} />
      <div className="flex flex-col items-center gap-y-12">
        <motion.div
          ref={omrCardRef}
          initial={{ scale: 1, y: 0 }}
          animate={{
            scale: OMR_CARD_SCALE,
            marginBottom: -(omrCardHeight * (1 - OMR_CARD_SCALE)),
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="origin-top"
        >
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
        </motion.div>

        {/* 완료 메시지와 버튼 등장 애니메이션 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col items-center gap-y-12"
        >
          {/* 완료 메시지 */}
          <div className="flex flex-col items-center gap-y-2">
            <h2 className="text-gs1 text-4xl font-extrabold">제출 완료!</h2>
            <p className="text-gs1 text-4xl font-extrabold">
              고생하셨어요. 결과를 바로 확인해보세요?
            </p>
          </div>

          {/* 결과 보기 버튼 */}
          <motion.div
            onClick={onViewResults}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button label="결과 보기" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
