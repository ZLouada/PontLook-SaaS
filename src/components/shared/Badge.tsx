'use client';

import React from 'react';

type BadgeVariant = 'accent' | 'slate' | 'emerald' | 'amber' | 'rose';

interface BadgeProps {
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = 'accent',
  icon,
  children,
  className = '',
}: BadgeProps) {
  const variantStyles = {
    accent: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    slate: 'bg-white/10 text-slate-300 border-white/10',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    rose: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono font-medium uppercase tracking-wider ${variantStyles} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
