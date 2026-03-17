import { OMR_STYLES } from "../constants/omrStyles";

/**
 * 총 문항 수를 받아 컬럼 수를 반환합니다.
 * @param totalQuestions 총 문항 수
 * @returns 컬럼 수
 */
export const getColumnCount = (totalQuestions: number): number => {
  return Math.ceil(totalQuestions / 10);
};

/**
 * 컬럼 수를 받아 객관식 영역의 전체 너비를 반환합니다.
 * @param columnCount 컬럼 수
 * @returns 객관식 영역 전체 너비
 */
export const getObjectiveSectionWidth = (columnCount: number): number => {
  return OMR_STYLES.OBJECTIVE_COLUMN_WIDTH * columnCount;
};

/**
 * 컬럼 수를 받아 문항 번호를 반환합니다.
 * @param columnCount 컬럼 수
 * @param totalQuestions 총 문항 수
 * @returns 문항 번호
 */
export const getChoicesColumns = (columnCount: number, totalQuestions: number) =>
  Array.from({ length: columnCount }, (_, colIndex) => {
    const start = colIndex * 10 + 1;
    const end = Math.min(start + 9, totalQuestions);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

const OBJECTIVE_COLUMN_HIGHLIGHT_START_ROW_INDEX = OMR_STYLES.BODY_ROW_COUNT / 2;

/**
 * 객관식 컬럼 인덱스에 따라 상단/하단 5행 하이라이트 여부를 판정합니다.
 * 짝수 인덱스 컬럼(1, 3, 5번째 시각 컬럼)은 하단 5행, 홀수 인덱스 컬럼은 상단 5행을 칠합니다.
 * @param columnIndex 0-based 컬럼 인덱스
 * @param rowIndex 컬럼 내부 0-based 행 인덱스
 * @returns 하이라이트 여부
 */
export const isObjectiveColumnHighlightedRow = (columnIndex: number, rowIndex: number): boolean => {
  return columnIndex % 2 === 0
    ? rowIndex >= OBJECTIVE_COLUMN_HIGHLIGHT_START_ROW_INDEX
    : rowIndex < OBJECTIVE_COLUMN_HIGHLIGHT_START_ROW_INDEX;
};

/**
 * 마지막 컬럼이 10문항보다 짧을 때, 남는 filler 영역은 항상 기본 배경으로 유지합니다.
 * @param questionCount 해당 컬럼의 실제 문항 수
 * @returns filler 세그먼트 배열
 */
export const getObjectiveColumnFillerSegments = (questionCount: number) => {
  const fillerRowCount = OMR_STYLES.BODY_ROW_COUNT - questionCount;

  if (fillerRowCount <= 0) return [];

  return [{ rowCount: fillerRowCount, isHighlighted: false }];
};

/**
 * 선택지 수를 받아 리더 마크 키를 반환합니다.
 * @param choiceCount 선택지 수
 * @returns 리더 마크 키
 */
export const getReaderBarKeys = (choiceCount: number) =>
  Array.from({ length: choiceCount }, (_, i) => i);

/**
 * 문자가 유효한 문자인지 확인합니다.
 * @param char 문자
 * @returns 유효한 문자인지 여부
 */
export const isValidChar = (char: string): boolean => {
  return /^[0-9./-]$/.test(char);
};

/**
 * 객관식 버블 행이 선택지 수에 맞춰 일정한 간격의 그리드가 되도록 CSS 값을 계산합니다.
 * 각 열은 버블 지름을 그대로 사용하고, 열 사이 간격은 OMR 공통 spacing 상수를 따릅니다.
 * @param choiceCount 한 문항에 렌더링할 선택지 개수
 * @returns 버블 트랙 컨테이너에 바로 전달할 grid 스타일 객체
 */
export const getObjectiveBubbleTrackStyle = (choiceCount: number) => ({
  gridTemplateColumns: `repeat(${choiceCount}, ${OMR_STYLES.BUBBLE_WIDTH}px)`,
  columnGap: `${OMR_STYLES.OBJECTIVE_BUBBLE_GAP}px`,
});

export const getExamCardBubbleTrackStyle = getObjectiveBubbleTrackStyle;
