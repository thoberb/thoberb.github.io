import type { ReactNode, ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'ghost' | 'outline' | 'primary' | 'nav';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  ghost: 'bg-transparent hover:bg-black/5 text-slate-900',
  outline: 'border-2 border-gray-300 hover:border-gray-400 bg-transparent text-gray-700',
  primary: 'bg-gray-900 text-white hover:bg-gray-800 border-0',
  nav: 'bg-transparent text-inherit hover:opacity-100 opacity-70 tracking-wider',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5 rounded-lg',
  md: 'text-base px-5 py-2.5 rounded-xl',
  lg: 'text-lg px-6 py-3 rounded-xl',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function Button({
  children,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const combined = [
    'font-medium transition-all duration-200 inline-flex items-center justify-center',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={combined} {...props}>
      {children}
    </button>
  );
}
