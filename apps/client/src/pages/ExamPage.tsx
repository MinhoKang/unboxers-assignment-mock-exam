import { ExamCompletionView } from "@/features/exam/components/completion/ExamCompletionView";
import { ExamControlBar } from "@/features/exam/components/examControlBar/ExamControlBar";
import { ExamHeader } from "@/features/exam/components/header/ExamHeader";
import { ResultView } from "@/features/exam/components/result/ResultView";
import { ScanAnimation } from "@/features/exam/components/scan/ScanAnimation";
import { useExamPageController } from "@/features/exam/hooks/useExamPageController";
import { NumericKeypad } from "@/shared/components/OMR/OMRBases/NumericKeypad";
import { NumericKeypadGuide } from "@/shared/components/OMR/OMRBases/NumericKeypadGuide";
import { OMRCard } from "@/shared/components/OMR/OMRCard";

const SCAN_DURATION_MS = 5000;

const ExamPage = () => {
  const {
    examCardProps,
    keypadProps,
    controlBarProps,
    completionStatus,
    examResultData,
    onViewResults,
    onScanComplete,
  } = useExamPageController();

  // 제출 완료 후 상태에 따른 조건부 렌더링
  if (completionStatus === "completed" && examResultData) {
    return <ExamCompletionView examResultData={examResultData} onViewResults={onViewResults} />;
  }

  if (completionStatus === "scanning" && examResultData) {
    return (
      <ScanAnimation
        examResultData={examResultData}
        onScanComplete={onScanComplete}
        scanDurationMs={SCAN_DURATION_MS}
      />
    );
  }

  if (completionStatus === "results" && examResultData) {
    return <ResultView examResultData={examResultData} />;
  }

  // 기본 시험 화면
  return (
    <div className="bg-gs4 flex min-h-screen w-full flex-col gap-y-[130px]">
      <section className="flex w-full flex-1 flex-col gap-y-[63.5px] px-[26.04px] py-[25px]">
        <ExamHeader />
        <div className="flex items-center justify-center gap-x-15">
          <OMRCard {...examCardProps} />
          <div className="flex items-center gap-x-15">
            <div className="flex w-[243px] flex-col gap-y-6">
              <NumericKeypadGuide />
              <NumericKeypad {...keypadProps} />
            </div>
          </div>
        </div>
      </section>
      <ExamControlBar {...controlBarProps} />
    </div>
  );
};

export default ExamPage;
