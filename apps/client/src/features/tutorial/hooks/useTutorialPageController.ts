import { useEffect, useEffectEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getNextTutorialStep, parseTutorialStep } from "../helpers/tutorialStep";
import type { TTutorialDirection, TTutorialStep } from "../types/tutorialTypes";

export const useTutorialPageController = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = parseTutorialStep(searchParams.get("step"));
  const [previousStep, setPreviousStep] = useState(currentStep);
  const [storedDirection, setStoredDirection] = useState<TTutorialDirection>("next");

  const pageDirection =
    currentStep === previousStep ? storedDirection : currentStep < previousStep ? "prev" : "next";

  const syncStepState = useEffectEvent(
    (nextStep: TTutorialStep, nextDirection: TTutorialDirection) => {
      setPreviousStep(nextStep);
      setStoredDirection(nextDirection);
    },
  );

  useEffect(() => {
    if (currentStep === previousStep) {
      return;
    }

    syncStepState(currentStep, pageDirection);
  }, [currentStep, pageDirection, previousStep]);

  const handleStepChange = (direction: TTutorialDirection) => {
    setSearchParams({ step: getNextTutorialStep(currentStep, direction).toString() });
  };

  return {
    currentStep,
    pageDirection,
    handleStepChange,
  };
};
