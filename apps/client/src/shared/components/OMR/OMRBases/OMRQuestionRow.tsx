import { OMRObjectiveButton } from "./OMRObjectiveButton";

interface QuestionRowProps {
  questionNumber: number;
  choiceCount: number;
  selectedChoices: number[];
  onSelect: (question: number, choice: number) => void;
}

export const QuestionRow = ({
  questionNumber,
  choiceCount,
  selectedChoices,
  onSelect,
}: QuestionRowProps) => {
  const choices = Array.from({ length: choiceCount }, (_, i) => i + 1);

  return (
    <div className="flex items-center">
      <div className="bg-inbrain-lightblue/20 border-x-inbrain-lightblue flex w-7 shrink-0 items-center justify-center self-stretch border-x-[1.5px]">
        <span className="text-inbrain-blue shrink-0 text-right text-xs font-bold">
          {questionNumber}
        </span>
      </div>
      <div className="flex gap-x-2.5 px-2 py-1.5">
        {choices.map((choice) => (
          <OMRObjectiveButton
            key={choice}
            number={choice}
            isSelected={selectedChoices.includes(choice)}
            onSelect={() => onSelect(questionNumber, choice)}
          />
        ))}
      </div>
    </div>
  );
};
