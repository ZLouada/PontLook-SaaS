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
      'bg-white/[0.05] hover:bg-white/[0.10] text-white border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-xs rounded-xl',
    secondary:
      'bg-transparent hover:bg-white/[0.05] text-neutral-300 hover:text-white border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-xs rounded-xl',
    outline:
      'bg-transparent border border-[#26282D] text-neutral-300 hover:text-white hover:border-white/30 rounded-xl',
    dark:
      'bg-white/[0.05] hover:bg-white/[0.10] text-white border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-xs rounded-xl',
  }[variant];

  const baseClasses = `inline-flex items-center justify-center rounded-xl transition-all duration-300 transform-gpu cursor-pointer select-none ${sizeClasses} ${variantClasses} ${className}`;

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
