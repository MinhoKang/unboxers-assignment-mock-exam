import { useSearchParams } from "react-router-dom";

import { TutorialHeader } from "@/features/tutorial/components/header/TutorialHeader";
import { ExamTimeGuideView } from "@/features/tutorial/components/views/ExamTimeGuideView";
import { OMRObjectiveView } from "@/features/tutorial/components/views/OMRObjectiveView";
import { OMRSubjectiveView } from "@/features/tutorial/components/views/OMRSubjectiveView";
import { StartView } from "@/features/tutorial/components/views/StartView";
import type { TTutorialDirection } from "@/features/tutorial/types/tutorialTypes";

const TutorialPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 현재 진행 중인 튜토리얼 단계
  const currentStep = Number(searchParams.get("step")) || 1;

  /**
   *
   * @param step 다음 단계로 이동할 단계
   */
  const handleStepChange = (direction: TTutorialDirection) => {
    if (direction === "prev") {
      setSearchParams({ step: (currentStep - 1).toString() });
    } else {
      setSearchParams({ step: (currentStep + 1).toString() });
    }
  };

  return (
    <main className="bg-gs4 flex min-h-screen w-full flex-col pb-20">
      <TutorialHeader />
      <section className="flex w-full flex-1 items-center justify-center">
        {currentStep === 1 && <StartView onStepChange={handleStepChange} />}
        {currentStep === 2 && <OMRObjectiveView onStepChange={handleStepChange} />}
        {currentStep === 3 && <OMRSubjectiveView onStepChange={handleStepChange} />}
        {currentStep === 4 && <ExamTimeGuideView onStepChange={handleStepChange} />}
      </section>
    </main>
  );
};

export default TutorialPage;
