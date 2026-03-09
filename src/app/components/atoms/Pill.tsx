import { type ReactNode } from 'react';

export type PillVariant = 'light' | 'dark' | 'muted' | 'outline';
export type PillSize = 'sm' | 'md';

const variantClasses: Record<PillVariant, string> = {
  light: 'bg-white text-black font-medium',
  dark: 'bg-gray-900 text-white',
  muted: 'bg-gray-50 text-gray-700 hover:bg-gray-100',
  outline: 'bg-transparent text-gray-700 border border-gray-200',
};

const sizeClasses: Record<PillSize, string> = {
  sm: 'text-xs px-2.5 py-1 md:px-3 md:py-1.5',
  md: 'text-base px-5 py-2 md:py-3',
};

export interface PillProps {
  children: ReactNode;
  variant?: PillVariant;
  size?: PillSize;
  className?: string;
  as?: 'span' | 'div';
}

export function Pill({
  children,
  variant = 'muted',
  size = 'sm',
  className = '',
  as: Component = 'span',
}: PillProps) {
  const base = 'rounded-full transition-colors duration-200 w-fit inline-block';
  const combined = [
    base,
    variantClasses[variant],
    sizeClasses[size],
    variant === 'muted' && size === 'md' ? 'cursor-default' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={combined}>{children}</Component>;
}
