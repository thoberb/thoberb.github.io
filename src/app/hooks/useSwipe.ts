import { useRef, useCallback } from 'react';

const SWIPE_THRESHOLD = 50;

export function useSwipe(options: {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  enabled: boolean;
  threshold?: number;
}) {
  const { onSwipeLeft, onSwipeRight, enabled, threshold = SWIPE_THRESHOLD } = options;
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!enabled) return;
      const touch = e.touches[0];
      if (!touch) return;
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
    },
    [enabled]
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!enabled) return;
      const touch = e.changedTouches[0];
      if (!touch) return;
      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = touch.clientY - touchStartY.current;
      if (Math.abs(deltaX) < threshold) return;
      if (Math.abs(deltaX) <= Math.abs(deltaY)) return;
      if (deltaX > 0) onSwipeRight();
      else onSwipeLeft();
    },
    [enabled, threshold, onSwipeLeft, onSwipeRight]
  );

  return { onTouchStart, onTouchEnd };
}
