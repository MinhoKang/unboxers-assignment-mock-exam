import { GRADE_OPTIONS, NUMBER_OPTIONS } from "@/shared/constants/omrs";
import { OMR_STYLES } from "@/shared/constants/omrStyles";
import { cn } from "@/shared/helpers/cn";
import type { TDigitKey, TGradeValue, TStudentNumberValue } from "@/shared/types/omrsTypes";

import { OMRObjectiveButton } from "./OMRObjectiveButton";

interface StudentNumberSectionProps {
  grade?: TGradeValue | null;
  studentNumber?: TStudentNumberValue;
  isReadOnly?: boolean;
  onGradeChange?: (value: TGradeValue) => void;
  onNumberChange?: (digit: TDigitKey, value: number) => void;
  className?: string;
}

export const StudentNumberSection = ({
  grade = null,
  studentNumber = { tens: null, ones: null },
  isReadOnly = false,
  onGradeChange,
  onNumberChange,
  className,
}: StudentNumberSectionProps) => {
  const rows = Array.from({ length: 10 }, (_, index) => index);

  return (
    <div
      className={cn("relative flex shrink-0 flex-col", className)}
      style={{ width: OMR_STYLES.GRADE_COLUMN_WIDTH + OMR_STYLES.NUMBER_COLUMN_WIDTH }}
    >
      <div
        className="bg-inbrain-lightblue pointer-events-none absolute top-0 left-0 z-10 w-[1.5px]"
        style={{
          height: OMR_STYLES.HEADER_HEIGHT + OMR_STYLES.BODY_HEIGHT,
        }}
      />

      <div
        className="bg-inbrain-lightblue pointer-events-none absolute top-0 z-10 w-[1.5px]"
        style={{
          left: OMR_STYLES.GRADE_COLUMN_WIDTH,
          height: OMR_STYLES.HEADER_HEIGHT + OMR_STYLES.BODY_HEIGHT,
        }}
      />

      <div
        className="border-inbrain-lightblue bg-omr-bg grid border-t-[1.5px] border-r-[1.5px] border-b-[1.5px]"
        style={{
          height: OMR_STYLES.HEADER_HEIGHT,
          gridTemplateColumns: `${OMR_STYLES.GRADE_COLUMN_WIDTH}px ${OMR_STYLES.NUMBER_COLUMN_WIDTH}px`,
        }}
      >
        <div className="flex items-center justify-center">
          <span className="text-inbrain-blue text-[14px] leading-[0.95] font-bold">
            {"학년".split("").map((char) => (
              <span key={`grade-header-${char}`} className="block">
                {char}
              </span>
            ))}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-inbrain-blue text-[14px] font-bold">번호</span>
        </div>
      </div>

      <div
        className="border-inbrain-lightblue bg-omr-bg grid border-r-[1.5px] border-b-[1.5px]"
        style={{
          height: OMR_STYLES.BODY_HEIGHT,
          gridTemplateColumns: `${OMR_STYLES.GRADE_COLUMN_WIDTH}px ${OMR_STYLES.NUMBER_COLUMN_WIDTH}px`,
        }}
      >
        <div className="flex h-full justify-center">
          <div
            className="grid"
            style={{
              width: OMR_STYLES.BUBBLE_WIDTH,
              gridTemplateRows: `repeat(10, ${OMR_STYLES.ROW_HEIGHT}px)`,
            }}
          >
            {rows.map((rowIndex) => {
              const value = GRADE_OPTIONS[rowIndex];

              return (
                <div key={`grade-row-${rowIndex}`} className="flex items-center justify-center">
                  {value ? (
                    <OMRObjectiveButton
                      number={value}
                      isSelected={grade === value}
                      isDisabled={isReadOnly}
                      onSelect={() => onGradeChange?.(value)}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex h-full items-start justify-center">
          <div className="flex" style={{ width: OMR_STYLES.NUMBER_TRACK_WIDTH }}>
            <div
              className="grid"
              style={{
                width: OMR_STYLES.BUBBLE_WIDTH,
                gridTemplateRows: `repeat(10, ${OMR_STYLES.ROW_HEIGHT}px)`,
              }}
            >
              {NUMBER_OPTIONS.map((value) => (
                <div key={`tens-row-${value}`} className="flex items-center justify-center">
                  <OMRObjectiveButton
                    number={value}
                    isSelected={studentNumber.tens === value}
                    isDisabled={isReadOnly}
                    onSelect={() => onNumberChange?.("tens", value)}
                  />
                </div>
              ))}
            </div>

            <div
              className="grid"
              style={{
                width: OMR_STYLES.BUBBLE_WIDTH,
                marginLeft: OMR_STYLES.NUMBER_TRACK_GAP,
                gridTemplateRows: `repeat(10, ${OMR_STYLES.ROW_HEIGHT}px)`,
              }}
            >
              {NUMBER_OPTIONS.map((value) => (
                <div key={`ones-row-${value}`} className="flex items-center justify-center">
                  <OMRObjectiveButton
                    number={value}
                    isSelected={studentNumber.ones === value}
                    isDisabled={isReadOnly}
                    onSelect={() => onNumberChange?.("ones", value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="grid items-start pt-0.5"
        style={{
          height: OMR_STYLES.READER_HEIGHT,
          gridTemplateColumns: `${OMR_STYLES.GRADE_COLUMN_WIDTH}px ${OMR_STYLES.NUMBER_COLUMN_WIDTH}px`,
        }}
      >
        <div className="flex justify-center">
          <div className="bg-gs1 h-6" style={{ width: OMR_STYLES.READER_MARK_WIDTH }} />
        </div>

        <div className="flex justify-center">
          <div className="flex" style={{ width: OMR_STYLES.NUMBER_TRACK_WIDTH }}>
            <div className="flex justify-center" style={{ width: OMR_STYLES.BUBBLE_WIDTH }}>
              <div className="bg-gs1 h-6" style={{ width: OMR_STYLES.READER_MARK_WIDTH }} />
            </div>
            <div
              className="flex justify-center"
              style={{ width: OMR_STYLES.BUBBLE_WIDTH, marginLeft: OMR_STYLES.NUMBER_TRACK_GAP }}
            >
              <div className="bg-gs1 h-6" style={{ width: OMR_STYLES.READER_MARK_WIDTH }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
