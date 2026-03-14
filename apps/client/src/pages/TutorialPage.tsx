import { useSearchParams } from "react-router-dom";

import { Header } from "@/features/tutorial/components/header/Header";
import { OMRMultipleChoiceView } from "@/features/tutorial/components/views/OMRMultipleChoiceView";
import { StartView } from "@/features/tutorial/components/views/StartView";

const TutorialPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 현재 진행 중인 튜토리얼 단계
  const currentStep = Number(searchParams.get("step")) || 1;

  /**
   *
   * @param step 다음 단계로 이동할 단계
   */
  const handleStepChange = (step: number) => {
    setSearchParams({ step: step.toString() });
  };

  return (
    <main className="bg-gs4 flex min-h-screen flex-col">
      <Header />
      <section className="flex flex-1 items-center justify-center">
        {currentStep === 1 && <StartView onStepChange={handleStepChange} />}
        {currentStep === 2 && <OMRMultipleChoiceView />}
      </section>
    </main>
  );
};

export default TutorialPage;
