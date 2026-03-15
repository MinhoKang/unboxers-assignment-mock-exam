import { ExamControlBar } from "@/features/exam/components/examControlBar/ExamControlBar";
import { ExamHeader } from "@/features/exam/components/header/ExamHeader";
import { useExamPageController } from "@/features/exam/hooks/useExamPageController";
import { NumericKeypad } from "@/shared/components/OMR/OMRBases/NumericKeypad";
import { NumericKeypadGuide } from "@/shared/components/OMR/OMRBases/NumericKeypadGuide";
import { OMRCard } from "@/shared/components/OMR/OMRCard";

const ExamPage = () => {
  const { examCardProps, keypadProps, controlBarProps } = useExamPageController();

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
