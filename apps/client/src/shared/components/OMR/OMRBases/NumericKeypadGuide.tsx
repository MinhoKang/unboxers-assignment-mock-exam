const NUMERIC_KEYPAD_GUIDE_LINES = [
  "모든 주관식 답은 숫자와 소숫점, 슬래시(/), 마이너스(-) 기호로 이루어져 있습니다.",
  "",
  '마이너스 2분의 3을 입력할 때는 "-3/2"라고 입력하면 돼요. 소숫점은 유효숫자 개수를 맞춰서 입력합니다.',
  "",
  "단위가 포함된 주관식 답안은 숫자만 입력합니다.",
  "",
  "예시)",
  "제3사분면 → 3",
  "3,700만원 → 37000000",
  "95% → 95",
] as const;

export const NumericKeypadGuide = () => {
  return (
    <div className="flex flex-col gap-y-2">
      {NUMERIC_KEYPAD_GUIDE_LINES.map((line, index) =>
        line ? (
          <p key={`${index}-${line}`} className="text-grayscale-700-100 text-[12px] font-semibold">
            {line}
          </p>
        ) : (
          <div key={`spacer-${index}`} className="h-2" aria-hidden />
        ),
      )}
    </div>
  );
};
