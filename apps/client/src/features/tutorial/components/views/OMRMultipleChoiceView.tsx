import { useOMRMultipleChoiceView } from "@/features/tutorial/hooks/useOMRMultipleChoiceView";
import { OMRContainer } from "@/shared/components/OMR/OMRBases/OMRContainer";
import { OMRMultipleChoices } from "@/shared/components/OMR/OMRBases/OMRMultipleChoices";

export const OMRMultipleChoiceView = () => {
  const { answers, handleSelect } = useOMRMultipleChoiceView();

  return (
    <div className="self-start">
      <OMRContainer className="mt-[-16.5px] rounded-t-none">
        <OMRMultipleChoices totalQuestions={30} answers={answers} onSelect={handleSelect} />
      </OMRContainer>
    </div>
  );
};
