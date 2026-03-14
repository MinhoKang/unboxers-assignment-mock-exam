import { ExamControlBar } from "@/features/exam/components/examControlBar/ExamControlBar";
import { ExamHeader } from "@/features/exam/components/header/ExamHeader";
import { NumericKeypad } from "@/shared/components/OMR/OMRBases/NumericKeypad";
import { NumericKeypadGuide } from "@/shared/components/OMR/OMRBases/NumericKeypadGuide";

const ExamPage = () => {
  return (
    <div className="bg-gs4 flex min-h-screen w-full flex-col">
      <section className="flex w-full flex-1 flex-col px-[26.04px] py-[25px]">
        <ExamHeader />
        <div className="flex items-center gap-x-15">
          <div className="flex w-[243px] flex-col gap-y-6">
            <NumericKeypadGuide />
            <NumericKeypad onInput={() => {}} onComplete={() => {}} />
          </div>
        </div>
      </section>
      <ExamControlBar status="waiting" remainingTime={5} totalTime={3600} />
    </div>
  );
};

export default ExamPage;
