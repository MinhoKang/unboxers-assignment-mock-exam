import { TutorialHeader } from "@/features/tutorial/components/header/TutorialHeader";
import { TutorialSwipeStage } from "@/features/tutorial/components/TutorialSwipeStage";
import { ExamTimeGuideView } from "@/features/tutorial/components/views/ExamTimeGuideView";
import { OMRObjectiveView } from "@/features/tutorial/components/views/OMRObjectiveView";
import { OMRSubjectiveView } from "@/features/tutorial/components/views/OMRSubjectiveView";
import { StartView } from "@/features/tutorial/components/views/StartView";
import { useTutorialPageController } from "@/features/tutorial/hooks/useTutorialPageController";
import type { TTutorialDirection, TTutorialStep } from "@/features/tutorial/types/tutorialTypes";

const renderTutorialView = (
  currentStep: TTutorialStep,
  handleStepChange: (direction: TTutorialDirection) => void,
) => {
  switch (currentStep) {
    case 1:
      return <StartView onStepChange={handleStepChange} />;
    case 2:
      return <OMRObjectiveView onStepChange={handleStepChange} />;
    case 3:
      return <OMRSubjectiveView onStepChange={handleStepChange} />;
    case 4:
      return <ExamTimeGuideView onStepChange={handleStepChange} />;
  }
};

const TutorialPage = () => {
  const { currentStep, pageDirection, handleStepChange } = useTutorialPageController();

  return (
    <main className="bg-gs4 flex min-h-screen w-full flex-col">
      <TutorialHeader />
      <section className="flex min-h-0 w-full flex-1 overflow-x-hidden">
        <TutorialSwipeStage
          panelKey={currentStep}
          direction={pageDirection}
          className="min-h-0 w-full flex-1"
          panelClassName="flex h-full min-h-0 w-full px-6"
        >
          {renderTutorialView(currentStep, handleStepChange)}
        </TutorialSwipeStage>
      </section>
    </main>
  );
};

export default TutorialPage;
