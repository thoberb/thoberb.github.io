import { useScroll, useTransform } from 'motion/react';
import type { RefObject } from 'react';

/**
 * Shared scroll-driven opacity and y transform for section enter/leave.
 * Same keyframes as used across Hero, About, Experience, etc.
 */
export function useSectionScrollProgress(
  containerRef: RefObject<HTMLDivElement | null>,
  sectionRef: RefObject<HTMLElement | null>
) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
    container: containerRef,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -150]);

  return { scrollYProgress, opacity, y };
}
