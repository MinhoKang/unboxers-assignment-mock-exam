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
