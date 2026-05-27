/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#BFFF00] hover:bg-[#A8E600] text-black border-transparent shadow-[#BFFF00]/30',
  accent: 'bg-[color:var(--accent)] hover:bg-[color:var(--accent-strong)] text-slate-950 shadow-[0_15px_35px_-20px_rgba(34,197,94,0.7)] border-transparent',
  secondary: 'bg-white/10 hover:bg-white/20 text-white border-white/10',
  ghost: 'bg-transparent hover:bg-white/10 text-white border-white/10',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-2 px-3 text-xs',
  md: 'py-3 px-4 text-sm',
  lg: 'py-3.5 px-5 text-sm',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-black tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFFF00] disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
          <span>Cargando...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
