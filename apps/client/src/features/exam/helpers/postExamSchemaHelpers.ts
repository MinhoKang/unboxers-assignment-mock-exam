const SUBJECTIVE_NUMBER_PATTERN = /^-?(?:\d+\.?\d*|\.\d+)$/;

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
