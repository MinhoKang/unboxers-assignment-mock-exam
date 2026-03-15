export type TKeypadItem = {
  value: string;
  label?: string;
  colSpan?: 1 | 2 | 3;
  ariaLabel?: string;
  icon?: React.ReactNode;
};

export type TGradeValue = 1 | 2 | 3;

export type TStudentNumberValue = {
  tens: number | null;
  ones: number | null;
};

export type TDigitKey = keyof TStudentNumberValue;

export type TOmrVariant = "default" | "examCard";

export type TObjectiveAnswer = Record<number, number[]>;
export type TSubjectiveAnswer = Record<number, string>;

export type TFieldRefs = Record<number, HTMLInputElement | null>;
