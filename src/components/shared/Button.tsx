'use client';

import React from 'react';
import Link from 'next/link';
import { m, HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

type CombinedButtonProps = BaseButtonProps &
  Omit<HTMLMotionProps<'button'>, keyof BaseButtonProps> &
  Omit<HTMLMotionProps<'a'>, keyof BaseButtonProps>;

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  leftIcon,
  rightIcon,
  children,
  className = '',
  ...motionProps
}: CombinedButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-semibold gap-1.5',
    md: 'px-6 py-3.5 text-sm font-semibold gap-2',
    lg: 'px-8 py-4 text-base font-semibold gap-2.5',
  }[size];

  const variantClasses = {
    primary:
      'bg-transparent hover:bg-slate-900/5 text-slate-900 border border-slate-300 hover:border-slate-500 shadow-xs',
    secondary:
      'bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-200/90 hover:border-slate-300 shadow-xs',
    outline:
      'bg-transparent border border-slate-200/80 text-slate-800 hover:bg-slate-50 hover:border-slate-300',
    dark:
      'bg-white/[0.06] hover:bg-white/[0.14] text-white border border-white/20 hover:border-white/40 backdrop-blur-md shadow-xs',
  }[variant];

  const baseClasses = `inline-flex items-center justify-center rounded-full transition-all duration-300 transform-gpu cursor-pointer select-none ${sizeClasses} ${variantClasses} ${className}`;

  const motionVariants = {
    whileHover: { y: -2.5 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  };

  const content = (
    <>
      {leftIcon && <span className="shrink-0 transition-colors">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0 transition-transform">{rightIcon}</span>}
    </>
  );

  if (href) {
    if (external) {
      return (
        <m.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          {...motionVariants}
          {...motionProps}
        >
          {content}
        </m.a>
      );
    }
    return (
      <Link href={href} passHref legacyBehavior>
        <m.a className={baseClasses} {...motionVariants} {...motionProps}>
          {content}
        </m.a>
      </Link>
    );
  }

  return (
    <m.button className={baseClasses} {...motionVariants} {...motionProps}>
      {content}
    </m.button>
  );
}
