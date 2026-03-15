import { useMotionValue } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * @description 결과 화면 OMR 카드의 실제 렌더 폭을 측정하고, 현재 화면 크기에 맞는 가로 드래그 범위를 계산합니다.
 * 최초 렌더에서는 OMR 시작 지점이 보이도록 좌측 기준으로 정렬합니다.
 */
export const useResultOmrDrag = () => {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const omrCardRef = useRef<HTMLDivElement | null>(null);
  const xPosition = useMotionValue(0);
  const hasInitializedRef = useRef(false);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  // 카드 폭이 viewport보다 넓어서 가로 드래그를 허용해야 하는지 여부입니다.
  const [isDraggable, setIsDraggable] = useState(false);
  // 사용자가 현재 OMR 카드를 실제로 끌고 있는 중인지 나타냅니다.
  const [isDraggingOmr, setIsDraggingOmr] = useState(false);

  const handleDragStart = () => {
    setIsDraggingOmr(true);
  };

  const handleDragEnd = () => {
    setIsDraggingOmr(false);
  };

  useLayoutEffect(() => {
    const viewportElement = viewportRef.current;
    const omrCardElement = omrCardRef.current;

    if (!viewportElement || !omrCardElement) {
      return;
    }

    const syncDragBounds = () => {
      const viewportWidth = viewportElement.getBoundingClientRect().width;
      const cardWidth = omrCardElement.getBoundingClientRect().width;
      const left = Math.min(viewportWidth - cardWidth, 0);
      const right = 0;
      const canDrag = left < 0;

      setDragConstraints({ left, right });
      setIsDraggable(canDrag);

      if (!canDrag) {
        xPosition.set(0);
        hasInitializedRef.current = true;
        return;
      }

      if (!hasInitializedRef.current) {
        xPosition.set(0);
        hasInitializedRef.current = true;
        return;
      }

      xPosition.set(clamp(xPosition.get(), left, right));
    };

    syncDragBounds();

    const resizeObserver = new ResizeObserver(syncDragBounds);
    resizeObserver.observe(viewportElement);
    resizeObserver.observe(omrCardElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [xPosition]);

  return {
    dragConstraints,
    isDraggable,
    omrCardRef,
    viewportRef,
    xPosition,
    isDraggingOmr,
    handleDragStart,
    handleDragEnd,
  };
};
