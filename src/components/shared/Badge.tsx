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
    accent: 'bg-white/[0.04] text-neutral-200 border-[#26282D]',
    slate: 'bg-white/[0.04] text-neutral-300 border-[#26282D]',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${variantStyles} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
