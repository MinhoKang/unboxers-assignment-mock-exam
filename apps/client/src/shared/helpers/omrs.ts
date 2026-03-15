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
 *
 * @param choiceCount 선택지 수
 * @returns 버블 트랙 스타일
 */
export const getObjectiveBubbleTrackStyle = (choiceCount: number) => ({
  gridTemplateColumns: `repeat(${choiceCount}, ${OMR_STYLES.BUBBLE_WIDTH}px)`,
  columnGap: `${OMR_STYLES.OBJECTIVE_BUBBLE_GAP}px`,
});

export const getExamCardBubbleTrackStyle = getObjectiveBubbleTrackStyle;
