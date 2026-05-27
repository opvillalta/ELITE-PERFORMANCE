/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
}

export default function Input({
  label,
  icon,
  error,
  className = '',
  id,
  ...props
}: InputProps) {
  return (
    <label htmlFor={id} className={`block text-left ${className}`}>
      {label && <span className="text-sm font-semibold text-white/70 block mb-2">{label}</span>}
      <div className="relative flex items-center">
        {icon && <span className="absolute left-3 text-white/40">{icon}</span>}
        <input
          id={id}
          {...props}
          className={`w-full rounded-2xl bg-black/20 border border-white/10 py-3 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors ${icon ? 'pl-12' : 'pl-4'}`}
        />
      </div>
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
    </label>
  );
}
