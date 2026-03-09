import { type ReactNode } from 'react';

const contentCardBase =
  'relative bg-white rounded-2xl p-6 md:p-8 border border-gray-200 transition-all duration-300';

const contentCardHoverGlow =
  'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none';
const contentCardBorderGlow =
  'absolute inset-0 rounded-2xl border border-gray-900/0 group-hover:border-gray-900/10 transition-all duration-300';

const linkCardBase =
  'group relative flex items-center justify-center gap-4 px-8 py-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-white/10';

export interface ContentCardProps {
  children: ReactNode;
  className?: string;
  /** Enable hover lift + gradient/border glow (Skills, Education style) */
  hover?: boolean;
  /** Use flex flex-col h-full (e.g. Education) */
  flexCol?: boolean;
}

export function ContentCard({
  children,
  className = '',
  hover = true,
  flexCol = false,
}: ContentCardProps) {
  const layout = flexCol ? 'h-full flex flex-col' : 'h-full';

  return (
    <div className={`${contentCardBase} ${layout} ${className}`}>
      {hover && (
        <>
          <div
            className={contentCardHoverGlow}
            style={{
              background:
                'linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 100%)',
            }}
          />
          <div className={contentCardBorderGlow} />
        </>
      )}
      {children}
    </div>
  );
}

export interface LinkCardProps {
  children: ReactNode;
  href: string;
  className?: string;
  download?: string;
  rel?: string;
  target?: string;
}

export function LinkCard({
  children,
  href,
  className = '',
  download,
  rel,
  target,
}: LinkCardProps) {
  return (
    <a
      href={href}
      className={`${linkCardBase} ${className}`}
      download={download}
      rel={rel ?? 'noopener noreferrer'}
      target={target ?? '_blank'}
    >
      {children}
    </a>
  );
}
