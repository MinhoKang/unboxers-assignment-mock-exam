import { cn } from "@/shared/helpers/cn";
import { useOMRSubjectiveInput } from "@/shared/hooks/useOMRSubjectiveInput";

interface OMRSubjectiveInputProps {
  questionCount: number;
  values?: Record<number, string>;
  onChange?: (questionNumber: number, value: string) => void;
  onFieldFocus?: (questionNumber: number) => void;
  focusedField?: number | null;
  fieldRefs?: { current: Record<number, HTMLInputElement | null> };
  maxLength?: number;
  isTutorial?: boolean;
}

export const OMRSubjectiveInput = ({
  questionCount,
  values = {},
  onChange,
  onFieldFocus,
  focusedField,
  fieldRefs,
  maxLength = 10,
  isTutorial = false,
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

  return (
    <div className="flex flex-col">
      {/* 문항 영역 - 객관식과 동일한 스타일 */}
      <div className="bg-omr-bg border-y-inbrain-lightblue border-r-inbrain-lightblue divide-inbrain-lightblue flex flex-col divide-y-[1.5px] border-y-[1.5px] border-r-[1.5px]">
        {questionNumbers.map((num) => (
          <div key={num} className="flex items-center">
            <div className="bg-inbrain-lightblue/20 border-x-inbrain-lightblue flex w-7 shrink-0 items-center justify-center self-stretch border-x-[1.5px]">
              <span className="text-inbrain-blue shrink-0 text-right text-[17px] font-semibold">
                {num}
              </span>
            </div>
            <div className="flex-1">
              <input
                ref={(ref) => {
                  if (fieldRefs?.current) {
                    fieldRefs.current[num] = ref;
                  }
                }}
                type="text"
                value={fieldValues[num] || ""}
                placeholder={getPlaceholder(num)}
                className={cn(
                  "placeholder:text-grayscale-400-100 max-h-[47.67px] w-[322px] py-[13.83px] text-center text-[17px] font-semibold outline-none placeholder:text-[17px]",
                  focusedField === num
                    ? "bg-gs6 shadow-[inset_0_0_0_2.5px_var(--color-inbrain-lightblue)]"
                    : "bg-transparent",
                )}
                onFocus={() => handleInputFocus(num)}
                onChange={(e) => handleInputChange(num, e.target.value)}
                maxLength={maxLength}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 하단 텍스트 */}
      <div className="mt-[3px] text-center">
        <p className="text-gs2 text-[17px] font-semibold">주관식 입력 부분입니다.</p>
      </div>
    </div>
  );
};
