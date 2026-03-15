import { OMR_STYLES } from "@/shared/constants/omrStyles";
import { getObjectiveBubbleTrackStyle, getReaderBarKeys } from "@/shared/helpers/omrs";

import { ReaderMark } from "./ReaderMark";

interface OMRObjectiveReaderMarksProps {
  columns: number[][];
  choiceCount: number;
}

export const OMRObjectiveReaderMarks = ({ columns, choiceCount }: OMRObjectiveReaderMarksProps) => {
  const readerBarKeys = getReaderBarKeys(choiceCount);
  const bubbleTrackStyle = getObjectiveBubbleTrackStyle(choiceCount);

  return (
    <div className="flex">
      {columns.map((questions) => (
        <div key={`${questions[0]}-reader`} className="flex flex-1">
          <div className="shrink-0" style={{ width: OMR_STYLES.LABEL_WIDTH }} />

          <div className="flex flex-1 justify-center">
            <div className="grid items-start pt-0.5" style={bubbleTrackStyle}>
              {readerBarKeys.map((key) => (
                <ReaderMark key={key} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
