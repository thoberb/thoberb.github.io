import type { CSSProperties, ReactNode } from 'react';
import { cloneElement, isValidElement, Children, type ReactElement } from 'react';

export interface SectionRoundedCornersProps {
  /** Section content (the <section> element). Notch is drawn behind it. */
  children: ReactNode;
  /** Whether the rounded corners are visible (e.g. when section is not stuck) */
  visible: boolean;
  /** Previous section background: so the notch matches the section above */
  previousSectionBg: string;
  /** Optional inline style when the previous section uses a custom color (e.g. Hero #050505) */
  previousSectionBgStyle?: CSSProperties;
}

const PREV_BG_COLORS: Record<string, string> = {
  'bg-white': '#ffffff',
  'bg-gray-50': '#f9fafb',
};

function getPrevColor(
  previousSectionBg: string,
  previousSectionBgStyle?: CSSProperties
): string {
  const fromStyle = previousSectionBgStyle?.backgroundColor;
  if (typeof fromStyle === 'string') return fromStyle;
  return PREV_BG_COLORS[previousSectionBg] ?? 'transparent';
}

/**
 * Wraps the section so the notch is a SIBLING behind it. The section's border-radius
 * "cuts" the corner; we only paint a 48×48 square (previous section color) behind.
 * No triangle — the curve comes from the section's border-radius.
 */
function sectionWithZIndex(children: ReactNode): ReactNode {
  const child = Children.only(children);
  if (!isValidElement(child)) return children;
  return cloneElement(child as ReactElement<{ className?: string }>, {
    className: [(child.props as { className?: string }).className, 'relative z-10'].filter(Boolean).join(' '),
  });
}

export function SectionRoundedCorners({
  children,
  visible,
  previousSectionBg,
  previousSectionBgStyle,
}: SectionRoundedCornersProps) {
  const notchFill = getPrevColor(previousSectionBg, previousSectionBgStyle);
  const notchStyle: CSSProperties = { backgroundColor: notchFill, zIndex: 0 };

  return (
    <div className="relative w-full">
      {visible && (
        <>
          <div
            className="absolute top-0 left-0 w-12 h-12 pointer-events-none"
            style={notchStyle}
          />
          <div
            className="absolute top-0 right-0 w-12 h-12 pointer-events-none"
            style={notchStyle}
          />
        </>
      )}
      {sectionWithZIndex(children)}
    </div>
  );
}
