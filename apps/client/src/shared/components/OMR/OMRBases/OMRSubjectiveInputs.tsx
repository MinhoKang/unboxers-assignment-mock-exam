import { OMR_STYLES } from "@/shared/constants/omrStyles";
import { cn } from "@/shared/helpers/cn";
import { useOMRSubjectiveInput } from "@/shared/hooks/OMR/useOMRSubjectiveInput";
import type { TOmrVariant, TSubjectiveAnswer } from "@/shared/types/omrsTypes";

import { OMRInputsTitle } from "./OMRInputsTitle";
import { OMRSubjectiveRow } from "./OMRSubjectiveRow";

interface OMRSubjectiveInputProps {
  questionCount: number;
  values?: TSubjectiveAnswer;
  onChange?: (questionNumber: number, value: string) => void;
  onFieldFocus?: (questionNumber: number) => void;
  focusedField?: number | null;
  fieldRefs?: { current: Record<number, HTMLInputElement | null> };
  maxLength?: number;
  isTutorial?: boolean;
  variant?: TOmrVariant;
  className?: string;
}

export const OMRSubjectiveInputs = ({
  questionCount,
  values = {},
  onChange,
  onFieldFocus,
  focusedField,
  fieldRefs,
  maxLength = 10,
  isTutorial = false,
  variant = "default",
  className,
}: OMRSubjectiveInputProps) => {
  const { fieldValues, questionNumbers, handleInputFocus, handleInputChange, getPlaceholder } =
    useOMRSubjectiveInput({
      questionCount,
      values,
      onChange,
      onFieldFocus,
      maxLength,
      isTutorial,
      focusedField,
    });

  if (!fieldValues || !questionNumbers) return null;

  if (variant === "examCard") {
    return (
      <div
        className={cn("flex shrink-0 flex-col", className)}
        style={{ width: OMR_STYLES.SUBJECTIVE_SECTION_WIDTH }}
      >
        <OMRInputsTitle title="주관식답안" />
        <div
          className="border-inbrain-lightblue bg-omr-bg grid border-r-[1.5px] border-b-[1.5px]"
          style={{
            height: OMR_STYLES.BODY_HEIGHT,
            gridTemplateRows: `repeat(${questionNumbers.length}, minmax(0, 1fr))`,
          }}
        >
          {questionNumbers.map((num, index) => (
            <div
              key={num}
              className={cn(
                "border-inbrain-lightblue flex min-h-0 items-center",
                index > 0 && "border-t-[1.5px]",
              )}
            >
              <OMRSubjectiveRow
                questionNumber={num}
                value={fieldValues[num] || ""}
                placeholder={getPlaceholder(num)}
                isFocused={focusedField === num}
                maxLength={maxLength}
                variant="examCard"
                onFocus={() => handleInputFocus(num)}
                onChange={(value) => handleInputChange(num, value)}
                inputRef={(ref) => {
                  if (fieldRefs?.current) {
                    fieldRefs.current[num] = ref;
                  }
                }}
              />
            </div>
          ))}
        </div>

        <div
          className="flex items-center justify-center pl-10"
          style={{ height: OMR_STYLES.READER_HEIGHT }}
        >
          <p className="text-gs2 text-[17px] font-semibold">선 아래부분은 절대 칠하지 말 것.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {/* 문항 영역 */}
      <div className="bg-omr-bg border-y-inbrain-lightblue border-r-inbrain-lightblue divide-inbrain-lightblue flex flex-col divide-y-[1.5px] border-y-[1.5px] border-r-[1.5px]">
        {questionNumbers.map((num) => (
          <OMRSubjectiveRow
            key={num}
            questionNumber={num}
            value={fieldValues[num] || ""}
            placeholder={getPlaceholder(num)}
            isFocused={focusedField === num}
            maxLength={maxLength}
            variant="default"
            onFocus={() => handleInputFocus(num)}
            onChange={(value) => handleInputChange(num, value)}
            inputRef={(ref) => {
              if (fieldRefs?.current) {
                fieldRefs.current[num] = ref;
              }
            }}
          />
        ))}
      </div>

      {/* 하단 텍스트 */}
      <div className="mt-[3px] text-center">
        <p className="text-gs2 text-[17px] font-semibold">주관식 입력 부분입니다.</p>
      </div>
    </div>
  );
};
