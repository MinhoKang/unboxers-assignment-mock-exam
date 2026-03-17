import { OMR_STYLES } from "@/shared/constants/omrStyles";
import { cn } from "@/shared/helpers/cn";
import {
  getChoicesColumns,
  getColumnCount,
  getObjectiveColumnFillerSegments,
  getObjectiveSectionWidth,
  isObjectiveColumnHighlightedRow,
} from "@/shared/helpers/omrs";
import type { TObjectiveAnswer, TOmrVariant } from "@/shared/types/omrsTypes";

import { OMRInputsTitle } from "./OMRInputsTitle";
import { OMRObjectiveReaderMarks } from "./OMRObjectiveReaderMarks";
import { QuestionRow } from "./OMRQuestionRow";

interface OMRObjectiveInputsProps {
  totalQuestions: number;
  choiceCount?: number;
  answers?: TObjectiveAnswer;
  isReadOnly?: boolean;
  onBlockedInteraction?: () => void;
  onSelect?: (question: number, choice: number) => void;
  variant?: TOmrVariant;
  className?: string;
}

export const OMRObjectiveInputs = ({
  totalQuestions,
  choiceCount = 5,
  answers = {},
  isReadOnly = false,
  onBlockedInteraction,
  onSelect,
  variant = "default",
  className,
}: OMRObjectiveInputsProps) => {
  const columnCount = getColumnCount(totalQuestions);
  const columns = getChoicesColumns(columnCount, totalQuestions);
  const objectiveSectionWidth = getObjectiveSectionWidth(columnCount);

  /**
   *
   * @param question 문항 번호
   * @param choice 선택지 번호
   * @returns void
   */
  const handleSelect = (question: number, choice: number) => {
    if (isReadOnly) {
      onBlockedInteraction?.();
      return;
    }

    onSelect?.(question, choice);
  };

  if (variant === "examCard") {
    return (
      <div
        className={cn("flex shrink-0 flex-col", className)}
        style={{ width: objectiveSectionWidth }}
      >
        <OMRInputsTitle title="객관식답안" />

        <div className="border-inbrain-lightblue bg-omr-bg flex border-r-[1.5px] border-b-[1.5px]">
          {columns.map((questions, columnIndex) => {
            const fillerSegments = getObjectiveColumnFillerSegments(questions.length);

            return (
              <div
                key={questions[0]}
                className={cn(
                  "flex flex-1 flex-col",
                  columnIndex > 0 && "border-inbrain-lightblue border-l-[1.5px]",
                )}
              >
                {questions.map((questionNumber, rowIndex) => {
                  const isHighlightedRow = isObjectiveColumnHighlightedRow(columnIndex, rowIndex);

                  return (
                    <div key={questionNumber}>
                      {rowIndex === 5 && (
                        <div className="bg-omr-objective-column-highlight flex">
                          <div
                            className="bg-omr-objective-column-highlight border-inbrain-lightblue shrink-0 border-r-[1.5px]"
                            style={{ width: OMR_STYLES.LABEL_WIDTH }}
                          />
                          <div className="border-inbrain-lightblue flex-1 border-t border-dashed" />
                        </div>
                      )}
                      <QuestionRow
                        questionNumber={questionNumber}
                        choiceCount={choiceCount}
                        selectedChoices={answers[questionNumber] ?? []}
                        isReadOnly={isReadOnly}
                        onSelect={handleSelect}
                        isHighlighted={isHighlightedRow}
                        variant="examCard"
                      />
                    </div>
                  );
                })}
                {fillerSegments.map((segment, segmentIndex) => (
                  <div
                    key={`${questions[0]}-filler-${segmentIndex}`}
                    className={cn(
                      "flex",
                      segment.isHighlighted ? "bg-omr-objective-column-highlight" : "bg-omr-bg",
                    )}
                    style={{ height: segment.rowCount * OMR_STYLES.ROW_HEIGHT }}
                  >
                    <div
                      className={cn(
                        "border-inbrain-lightblue shrink-0 border-r-[1.5px]",
                        segmentIndex === 0 && "border-t-[1.5px]",
                        segment.isHighlighted
                          ? "bg-omr-objective-column-highlight"
                          : "bg-inbrain-lightblue/15",
                      )}
                      style={{ width: OMR_STYLES.LABEL_WIDTH }}
                    />
                    <div
                      className={cn(
                        "border-inbrain-lightblue flex-1",
                        segmentIndex === 0 && "border-t-[1.5px]",
                      )}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <OMRObjectiveReaderMarks columns={columns} choiceCount={choiceCount} />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {/* 문항 영역 */}
      <div className="bg-omr-bg border-y-inbrain-lightblue border-r-inbrain-lightblue flex border-y-[1.5px] border-r-[1.5px]">
        {columns.map((questions, columnIndex) => {
          const fillerSegments = getObjectiveColumnFillerSegments(questions.length);

          return (
            <div key={questions[0]} className="bg-omr-bg flex flex-1 flex-col">
              {questions.map((questionNumber, rowIndex) => {
                const isHighlightedRow = isObjectiveColumnHighlightedRow(columnIndex, rowIndex);

                return (
                  <div key={questionNumber}>
                    {rowIndex === 5 && (
                      <div className="bg-omr-objective-column-highlight flex">
                        <div
                          className="bg-omr-objective-column-highlight border-x-inbrain-lightblue shrink-0 border-x-[1.5px]"
                          style={{ width: OMR_STYLES.LABEL_WIDTH }}
                        />
                        <div className="border-inbrain-lightblue flex-1 border-t border-dashed" />
                      </div>
                    )}
                    <QuestionRow
                      questionNumber={questionNumber}
                      choiceCount={choiceCount}
                      selectedChoices={answers[questionNumber] ?? []}
                      isReadOnly={isReadOnly}
                      onSelect={handleSelect}
                      isHighlighted={isHighlightedRow}
                      variant="default"
                    />
                  </div>
                );
              })}
              {fillerSegments.map((segment, segmentIndex) => (
                <div
                  key={`${questions[0]}-filler-${segmentIndex}`}
                  className={cn(
                    "flex",
                    segment.isHighlighted ? "bg-omr-objective-column-highlight" : "bg-omr-bg",
                  )}
                  style={{ height: segment.rowCount * OMR_STYLES.ROW_HEIGHT }}
                >
                  <div
                    className={cn(
                      "border-x-inbrain-lightblue shrink-0 border-x-[1.5px]",
                      segmentIndex === 0 && "border-t-[1.5px]",
                      segment.isHighlighted
                        ? "bg-omr-objective-column-highlight"
                        : "bg-inbrain-lightblue/20",
                    )}
                    style={{ width: OMR_STYLES.LABEL_WIDTH }}
                  />
                  <div
                    className={cn(
                      "border-inbrain-lightblue flex-1",
                      segmentIndex === 0 && "border-t-[1.5px]",
                    )}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* 리더 마크 영역 */}
      <OMRObjectiveReaderMarks columns={columns} choiceCount={choiceCount} />
    </div>
  );
};
