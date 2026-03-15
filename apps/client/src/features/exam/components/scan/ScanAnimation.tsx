import { motion } from "motion/react";

import { Button } from "@/shared/components/button/Button";
import { OMRCard } from "@/shared/components/OMR/OMRCard";

import { SCANNER_VERTICAL_BLEED_PX } from "../../constants/scanner";
import { useScanAnimation } from "../../hooks/useScanAnimation";
import type { TExamResultScreenData } from "../../types/examResultTypes";
import { Scanner } from "./Scanner";

interface ScanAnimationProps {
  examResultData: TExamResultScreenData;
  onScanComplete: () => void;
  scanDurationMs?: number;
}

export const ScanAnimation = ({
  examResultData,
  onScanComplete,
  scanDurationMs,
}: ScanAnimationProps) => {
  const { submittedExamData } = examResultData;
  const { overlayRef, scanDurationSeconds, scannerTimeline } = useScanAnimation({
    onScanComplete,
    scanDurationMs,
  });

  return (
    <div className="bg-gs4 flex min-h-screen w-full flex-col items-center justify-center gap-y-[50px] px-[26.04px] py-[25px]">
      {/* 스캔 중인 OMR 카드 */}
      <div
        className="relative"
        style={{
          paddingTop: `${SCANNER_VERTICAL_BLEED_PX}px`,
          paddingBottom: `${SCANNER_VERTICAL_BLEED_PX}px`,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
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

          {/* 스캔 라인 오버레이 */}
          <Scanner
            scannerTimeline={scannerTimeline}
            scanDurationSeconds={scanDurationSeconds}
            overlayRef={overlayRef}
          />
        </motion.div>
      </div>

      {/* 스캔 상태 메시지 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col items-center gap-y-12"
      >
        <p className="text-gs1 text-center text-4xl font-extrabold">
          OMR 카드 스캔중...
          <br />곧 결과가 나와요
        </p>

        <Button label="과연 몇 점일까요?" variant="white" />
      </motion.div>
    </div>
  );
};
