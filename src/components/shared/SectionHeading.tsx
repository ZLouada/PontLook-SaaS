'use client';

import Reveal from './Reveal';
import Badge from './Badge';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}: Props) {
  const alignCls = align === 'center' ? 'mx-auto text-center' : 'text-left rtl:text-right';

  return (
    <Reveal className={`max-w-3xl ${alignCls} ${className}`}>
      {eyebrow && (
        <div className="mb-4 inline-block">
          <Badge variant="accent">{eyebrow}</Badge>
        </div>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-[-0.025em] leading-[1.12]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 font-normal leading-[1.65] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
