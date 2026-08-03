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
      <h2 className="font-serif text-3xl font-normal sm:text-5xl lg:text-6xl text-slate-900 tracking-normal leading-[1.12]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
