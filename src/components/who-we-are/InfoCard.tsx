'use client';

import React from 'react';
import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface InfoCardProps {
  title: string;
  body: string;
  tagline?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
  isAr?: boolean;
}

export default function InfoCard({
  title,
  body,
  tagline,
  ctaText,
  onCtaClick,
  className = '',
  isAr = false,
}: InfoCardProps) {
  return (
    <div
      className={`rounded-2xl bg-white/[0.82] backdrop-blur-xl border border-[#2451BF]/10 shadow-[0_20px_60px_-20px_rgba(36,81,191,0.22)] p-6 sm:p-7 max-w-[340px] text-start transition-all duration-300 pointer-events-auto ${className}`}
    >
      {/* Small Accent Bar */}
      <div className="w-7 h-0.5 bg-[#3D7BFF] rounded-full mb-3.5" />

      {/* Heading */}
      <h3 className="text-lg sm:text-xl font-bold uppercase tracking-[0.08em] text-[#191D42] mb-2.5 font-heading">
        {title}
      </h3>

      {/* Body */}
      <p className="text-sm text-[#475569] leading-relaxed mb-3.5 font-sans">
        {body}
      </p>

      {/* Optional Tagline */}
      {tagline && (
        <p className="text-xs font-semibold text-[#2451BF] tracking-wide mb-3">
          {tagline}
        </p>
      )}

      {/* Optional Pill Link */}
      {ctaText && (
        <button
          type="button"
          onClick={onCtaClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2451BF]/10 hover:bg-[#2451BF]/15 border border-[#2451BF]/20 text-[#2451BF] text-xs font-semibold tracking-tight transition-colors group cursor-pointer"
        >
          <span>{ctaText}</span>
          <ArrowRight
            size={12}
            className={`transition-transform group-hover:translate-x-0.5 ${
              isAr ? 'rotate-180 group-hover:-translate-x-0.5' : ''
            }`}
          />
        </button>
      )}
    </div>
  );
}
