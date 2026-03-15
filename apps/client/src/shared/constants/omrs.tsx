import { Delete } from "../icons";
import type { TGradeValue, TKeypadItem } from "../types/omrsTypes";

export const KEYPAD_ITEMS: TKeypadItem[] = [
  { value: ".", label: "." },
  { value: "/", label: "/" },
  { value: "-", label: "-" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "0", label: "0", colSpan: 2 },
  {
    value: "backspace",
    ariaLabel: "한 글자 지우기",
    icon: <Delete />,
  },
  { value: "complete", label: "완료", colSpan: 3 },
];

export const GRADE_OPTIONS: TGradeValue[] = [1, 2, 3];
export const NUMBER_OPTIONS = Array.from({ length: 10 }, (_, i) => i);

export const STUDENT_INFO_ROWS = [
  { label: "시험", value: "TEN-UP 모의고사" },
  { label: "과목", value: "공통수학2" },
  { label: "성명", value: "권성민" },
  { label: "학교", value: "배방고등학교" },
  { label: "좌석", value: "21번" },
  { label: "감독", value: "신희철" },
];
