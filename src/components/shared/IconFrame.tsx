'use client';

import React from 'react';

export type IconFrameVariant =
  | 'default'
  | 'dark'
  | 'brand'
  | 'amber'
  | 'purple'
  | 'emerald'
  | 'cyan'
  | 'blue';

export type IconFrameSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface IconFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: IconFrameVariant;
  size?: IconFrameSize;
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

const SIZE_STYLES: Record<IconFrameSize, { container: string; glow: string }> = {
  xs: { container: 'h-7 w-7 rounded-lg', glow: '-inset-1 blur-sm' },
  sm: { container: 'h-8 w-8 rounded-lg', glow: '-inset-1 blur-md' },
  md: { container: 'h-10 w-10 rounded-xl', glow: '-inset-1.5 blur-md' },
  lg: { container: 'h-12 w-12 rounded-2xl', glow: '-inset-2 blur-lg' },
  xl: { container: 'h-14 w-14 rounded-2xl', glow: '-inset-2.5 blur-xl' },
};

const VARIANT_STYLES: Record<
  IconFrameVariant,
  { bg: string; border: string; text: string; glowBg: string }
> = {
  default: {
    bg: 'bg-gradient-to-b from-white/[0.08] to-white/[0.02]',
    border: 'border-white/10 group-hover:border-white/25',
    text: 'text-white',
    glowBg: 'bg-white/10',
  },
  dark: {
    bg: 'bg-neutral-100',
    border: 'border-neutral-200 group-hover:border-neutral-950',
    text: 'text-neutral-950',
    glowBg: 'bg-neutral-900/10',
  },
  brand: {
    bg: 'bg-gradient-to-b from-[#FF5C00]/15 to-transparent',
    border: 'border-[#FF5C00]/25 group-hover:border-[#FF5C00]/50',
    text: 'text-[#FF5C00]',
    glowBg: 'bg-[#FF5C00]/25',
  },
  amber: {
    bg: 'bg-gradient-to-b from-amber-500/15 to-transparent',
    border: 'border-amber-500/25 group-hover:border-amber-500/50',
    text: 'text-amber-400',
    glowBg: 'bg-amber-500/25',
  },
  purple: {
    bg: 'bg-gradient-to-b from-purple-500/15 to-transparent',
    border: 'border-purple-500/25 group-hover:border-purple-500/50',
    text: 'text-purple-400',
    glowBg: 'bg-purple-500/25',
  },
  emerald: {
    bg: 'bg-gradient-to-b from-emerald-500/15 to-transparent',
    border: 'border-emerald-500/25 group-hover:border-emerald-500/50',
    text: 'text-emerald-400',
    glowBg: 'bg-emerald-500/25',
  },
  cyan: {
    bg: 'bg-gradient-to-b from-cyan-500/15 to-transparent',
    border: 'border-cyan-500/25 group-hover:border-cyan-500/50',
    text: 'text-cyan-400',
    glowBg: 'bg-cyan-500/25',
  },
  blue: {
    bg: 'bg-gradient-to-b from-blue-500/15 to-transparent',
    border: 'border-blue-500/25 group-hover:border-blue-500/50',
    text: 'text-blue-400',
    glowBg: 'bg-blue-500/25',
  },
};

export default function IconFrame({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  glow = true,
  ...props
}: IconFrameProps) {
  const v = VARIANT_STYLES[variant];
  const s = SIZE_STYLES[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${s.container} ${className}`}
      {...props}
    >
      {/* Ambient radial backlight glow */}
      {glow && (
        <span
          className={`absolute ${s.glow} ${v.glowBg} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
          aria-hidden="true"
        />
      )}

      {/* Frosted pedestal */}
      <div
        className={`relative z-10 w-full h-full flex items-center justify-center border backdrop-blur-md shadow-sm transition-all duration-300 transform-gpu group-hover:scale-105 group-hover:-rotate-2 ${s.container} ${v.bg} ${v.border} ${v.text}`}
      >
        {children}
      </div>
    </div>
  );
}
