import type { ReactNode } from 'react';

export type SectionLabelVariant = 'label' | 'section';

export interface SectionLabelProps {
  children: ReactNode;
  variant?: SectionLabelVariant;
  className?: string;
}

/** Reusable section label (e.g. "Key Features", "Tech Stack") or section title ("Last Projects") */
export function SectionLabel({
  children,
  variant = 'label',
  className = '',
}: SectionLabelProps) {
  const isSection = variant === 'section';
  return (
    <p
      className={
        isSection
          ? `text-section-title uppercase tracking-wider text-gray-400 ${className}`.trim()
          : `text-section-label uppercase tracking-widest text-gray-400 ${className}`.trim()
      }
    >
      {children}
    </p>
  );
}
