/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'glass' | 'heavy' | 'surface';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children?: ReactNode;
  className?: string;
}

const variantClasses: Record<CardVariant, string> = {
  glass: 'glass',
  heavy: 'glass-heavy',
  surface: 'bg-[color:var(--surface)] border border-[color:var(--border)]',
};

export default function Card({ variant = 'glass', className = '', children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`rounded-3xl overflow-hidden transition-all duration-200 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
