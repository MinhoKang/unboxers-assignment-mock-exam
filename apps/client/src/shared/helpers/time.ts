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
 * @returns M분 S초 형식. 초가 0이면 분만 반환하고, 분이 없으면 S초만 반환
 */
export const formatSecondsToMinutesAndSeconds = (seconds: number) => {
  const minutes = formatSecondsToMinutes(seconds);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}초`;
  }

  if (remainingSeconds === 0) {
    return `${minutes}분`;
  }

  return `${minutes}분 ${remainingSeconds}초`;
};
