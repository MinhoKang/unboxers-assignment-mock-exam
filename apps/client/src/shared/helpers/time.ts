/**
 * 초 단위를 분 단으로 변환합니다.
 * @param seconds 초 단위
 * @returns 분 단위
 */
export const formatSecondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  return minutes;
};

/**
 * 초 단위를 분:초 형식으로 변환합니다.
 * @param seconds 초 단위
 * @returns M분 S초 형식. 분은 없으면 S초만 반환
 */
export const formatSecondsToMinutesAndSeconds = (seconds: number) => {
  const minutes = formatSecondsToMinutes(seconds);
  const remainingSeconds = seconds % 60;
  return `${minutes > 0 ? `${minutes}분 ` : ""}${remainingSeconds}초`;
};
