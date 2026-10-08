'use client';

import React from 'react';
import Link from 'next/link';
import { m, HTMLMotionProps } from 'framer-motion';
import { spring } from '@/lib/motion';

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
    sm: 'min-h-[44px] px-3.5 xs:px-4 py-2 text-xs font-semibold gap-1.5 touch-manipulation',
    md: 'min-h-[44px] sm:min-h-[48px] px-4 xs:px-5 sm:px-6 py-2.5 sm:py-3.5 text-xs xs:text-sm font-semibold gap-2 touch-manipulation',
    lg: 'min-h-[48px] sm:min-h-[52px] px-5 xs:px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold gap-2.5 touch-manipulation',
  }[size];

  const variantClasses = {
    primary:
      'sheen bg-white/[0.05] hover:bg-white/[0.10] text-white border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-e1 rounded-xl',
    secondary:
      'bg-transparent hover:bg-white/[0.05] text-neutral-300 hover:text-white border border-[#26282D] hover:border-white/30 backdrop-blur-md rounded-xl',
    outline:
      'bg-transparent border border-[#26282D] text-neutral-300 hover:text-white hover:border-white/30 rounded-xl',
    dark:
      'sheen bg-white/[0.05] hover:bg-white/[0.10] text-white border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-e1 rounded-xl',
  }[variant];

  const baseClasses = `inline-flex items-center justify-center rounded-xl transition-all duration-300 transform-gpu cursor-pointer select-none active:scale-[0.98] ${sizeClasses} ${variantClasses} ${className}`;

  const motionVariants = {
    whileHover: { y: -2.5 },
    whileTap: { scale: 0.98 },
    transition: spring.snappy,
  };

  const content = (
    <>
      {leftIcon && <span className="shrink-0 transition-colors">{leftIcon}</span>}
      <span className="text-center leading-snug">{children}</span>
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
