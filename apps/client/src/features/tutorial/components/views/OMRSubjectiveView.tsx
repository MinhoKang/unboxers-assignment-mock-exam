import { NumericKeypad } from "@/shared/components/OMR/OMRBases/NumericKeypad";
import { OMRContainer } from "@/shared/components/OMR/OMRBases/OMRContainer";
import { OMRSubjectiveInput } from "@/shared/components/OMR/OMRBases/OMRSubjectiveInput";
import { useSubjectiveAction } from "@/shared/hooks/useSubjectiveAction";

export const OMRSubjectiveView = () => {
  const {
    answers,
    focusedField,
    fieldRefs,
    handleChange,
    handleFieldFocus,
    handleKeypadInput,
    handleComplete,
  } = useSubjectiveAction();

  return (
    <div className="flex gap-8 self-start">
      <OMRContainer>
        <OMRSubjectiveInput
          questionCount={12}
          values={answers}
          onChange={handleChange}
          onFieldFocus={handleFieldFocus}
          focusedField={focusedField}
          fieldRefs={fieldRefs}
          maxLength={15}
        />
      </OMRContainer>

      {/* 키패드 - OMRContainer 밖으로 */}
      <div className="mt-auto shrink-0">
        <NumericKeypad
          onInput={handleKeypadInput}
          onComplete={handleComplete}
          focusedField={focusedField}
          currentValue={focusedField ? answers[focusedField] || "" : ""}
        />
      </div>
    </div>
  );
};
