import { OMR_STYLES } from "@/shared/constants/omrStyles";
import { cn } from "@/shared/helpers/cn";
import { getExamCardBubbleTrackStyle } from "@/shared/helpers/omrs";
import type { TOmrVariant } from "@/shared/types/omrsTypes";

import { OMRObjectiveButton } from "./OMRObjectiveButton";

interface QuestionRowProps {
  questionNumber: number;
  choiceCount: number;
  selectedChoices: number[];
  isReadOnly?: boolean;
  onSelect: (question: number, choice: number) => void;
  isHighlighted?: boolean;
  variant?: TOmrVariant;
}

export const QuestionRow = ({
  questionNumber,
  choiceCount,
  selectedChoices,
  isReadOnly = false,
  onSelect,
  isHighlighted = false,
  variant = "default",
}: QuestionRowProps) => {
  const choices = Array.from({ length: choiceCount }, (_, i) => i + 1);
  const isExamCard = variant === "examCard";
  const bubbleTrackStyle = getExamCardBubbleTrackStyle(choiceCount);

  return (
    <div
      className={cn(
        "flex w-full items-center",
        isHighlighted ? "bg-omr-objective-column-highlight" : "bg-omr-bg",
      )}
      style={isExamCard ? { height: OMR_STYLES.ROW_HEIGHT } : undefined}
    >
      {isExamCard ? (
        <div
          className={cn(
            "border-inbrain-lightblue flex h-full shrink-0 items-center justify-center border-r-[1.5px]",
            isHighlighted ? "bg-omr-objective-column-highlight" : "bg-inbrain-lightblue/15",
          )}
          style={{ width: OMR_STYLES.LABEL_WIDTH }}
        >
          <span className="text-inbrain-blue text-[11px] font-black">{questionNumber}</span>
        </div>
      ) : (
        <div
          className={cn(
            "border-x-inbrain-lightblue flex w-7 shrink-0 items-center justify-center self-stretch border-x-[1.5px]",
            isHighlighted ? "bg-omr-objective-column-highlight" : "bg-inbrain-lightblue/20",
          )}
        >
          <span className="text-inbrain-blue shrink-0 text-right text-xs font-bold">
            {questionNumber}
          </span>
        </div>
      )}
      {isExamCard ? (
        <div className="flex flex-1 justify-center">
          <div
            className="grid items-center px-[6px]"
            style={{
              ...bubbleTrackStyle,
              width: OMR_STYLES.OBJECTIVE_TRACK_WIDTH,
              paddingLeft: OMR_STYLES.OBJECTIVE_TRACK_PADDING_X,
              paddingRight: OMR_STYLES.OBJECTIVE_TRACK_PADDING_X,
            }}
          >
            {choices.map((choice) => (
              <OMRObjectiveButton
                key={choice}
                number={choice}
                isSelected={selectedChoices.includes(choice)}
                isDisabled={isReadOnly}
                onSelect={() => onSelect(questionNumber, choice)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex gap-x-2.5 px-2 py-1.5">
          {choices.map((choice) => (
            <OMRObjectiveButton
              key={choice}
              number={choice}
              isSelected={selectedChoices.includes(choice)}
              isDisabled={isReadOnly}
              onSelect={() => onSelect(questionNumber, choice)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
