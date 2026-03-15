const SUBJECTIVE_NUMBER_PATTERN = /^-?(?:\d+\.?\d*|\.\d+)$/;

/**
 * 주관식 정답 비교를 위해 입력값을 숫자로 정규화합니다.
 * 정수/소수 문자열은 그대로 파싱하고, `a/b` 형태는 분수로 계산합니다.
 * 형식이 잘못됐거나 `NaN`, `Infinity`, 0으로 나누기처럼 계산할 수 없는 값은 `null`을 반환합니다.
 * @param value 서버 또는 폼에서 넘어온 주관식 원본 값
 * @returns 채점에 사용할 숫자 값, 해석할 수 없으면 null
 */
export const parseSubjectiveAnswer = (value: string | number) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  const fractionParts = trimmedValue.split("/");

  if (fractionParts.length === 1) {
    if (!SUBJECTIVE_NUMBER_PATTERN.test(trimmedValue)) {
      return null;
    }

    const parsedValue = Number(trimmedValue);
    return Number.isFinite(parsedValue) ? parsedValue : null;
  }

  if (fractionParts.length !== 2) {
    return null;
  }

  const [rawNumerator, rawDenominator] = fractionParts;

  if (
    !SUBJECTIVE_NUMBER_PATTERN.test(rawNumerator) ||
    !SUBJECTIVE_NUMBER_PATTERN.test(rawDenominator)
  ) {
    return null;
  }

  const numerator = Number(rawNumerator);
  const denominator = Number(rawDenominator);

  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
    return null;
  }

  return numerator / denominator;
};
