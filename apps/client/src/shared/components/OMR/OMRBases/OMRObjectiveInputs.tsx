import { Fragment } from "react";

import { getChoicesColumns, getColumnCount, getReaderBarKeys } from "@/shared/helpers/omrs";

import { QuestionRow } from "./OMRQuestionRow";

interface OMRObjectiveInputsProps {
  totalQuestions: number;
  choiceCount?: number;
  answers?: Record<number, number[]>;
  onSelect?: (question: number, choice: number) => void;
}

export const OMRObjectiveInputs = ({
  totalQuestions,
  choiceCount = 5,
  answers = {},
  onSelect,
}: OMRObjectiveInputsProps) => {
  const columnCount = getColumnCount(totalQuestions);
  const columns = getChoicesColumns(columnCount, totalQuestions);
  const readerBarKeys = getReaderBarKeys(choiceCount);

  /**
   *
   * @param question 문항 번호
   * @param choice 선택지 번호
   * @returns void
   */
  const handleSelect = (question: number, choice: number) => {
    onSelect?.(question, choice);
  };

  return (
    <div className="flex flex-col">
      {/* 문항 영역 */}
      <div className="bg-omr-bg border-y-inbrain-lightblue border-r-inbrain-lightblue flex border-y-[1.5px] border-r-[1.5px]">
        {columns.map((questions) => (
          <div key={questions[0]} className="bg-omr-bg flex flex-1 flex-col">
            {questions.map((questionNumber, rowIndex) => (
              <Fragment key={questionNumber}>
                {rowIndex === 5 && (
                  <div className="flex">
                    <div className="bg-inbrain-lightblue/20 border-x-inbrain-lightblue w-7 shrink-0 border-x-[1.5px]" />
                    <div className="border-inbrain-lightblue flex-1 border-t border-dashed" />
                  </div>
                )}
                <QuestionRow
                  questionNumber={questionNumber}
                  choiceCount={choiceCount}
                  selectedChoices={answers[questionNumber] ?? []}
                  onSelect={handleSelect}
                />
              </Fragment>
            ))}
          </div>
        ))}
      </div>

      {/* 리더 마크 영역 */}
      <div className="flex">
        {columns.map((questions) => (
          <div key={questions[0]} className="flex flex-1">
            <div className="w-7 shrink-0" />
            <div className="flex gap-x-2.5 px-2 py-0.5">
              {readerBarKeys.map((key) => (
                <div key={key} className="flex w-5 justify-center">
                  <div className="bg-gs1 h-6 w-2" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
