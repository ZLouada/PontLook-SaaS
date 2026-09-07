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
    accent: 'bg-accent/10 text-accent border-accent/20',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
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
