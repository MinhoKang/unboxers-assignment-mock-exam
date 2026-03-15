import { useLayoutEffect, useRef, useState } from "react";

/**
 * @description 완료 화면에서 OMR 카드의 실제 렌더 높이를 추적해, 후속 레이아웃이나 애니메이션 계산에 사용할 값을 제공합니다.
 * @returns OMR 카드 DOM ref와 현재 카드 높이
 */
export const useExamCompletionView = () => {
  const omrCardRef = useRef<HTMLDivElement | null>(null);
  const [omrCardHeight, setOmrCardHeight] = useState(0);

  /**
   * @description 마운트 직후와 카드 크기 변경 시점마다 OMR 카드 높이를 동기화합니다.
   * ResizeObserver를 사용해 창 크기 변화나 내부 콘텐츠 변화에도 최신 높이를 유지합니다.
   */
  useLayoutEffect(() => {
    const omrCardElement = omrCardRef.current;
    if (!omrCardElement) {
      return;
    }

    /**
     * @description 현재 OMR 카드 요소의 높이를 읽어 상태에 반영합니다.
     * @returns void
     */
    const updateCardHeight = () => {
      setOmrCardHeight(omrCardElement.offsetHeight);
    };

    updateCardHeight();

    const resizeObserver = new ResizeObserver(updateCardHeight);
    resizeObserver.observe(omrCardElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { omrCardRef, omrCardHeight };
};
