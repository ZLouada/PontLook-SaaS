'use client';

import React from 'react';
import Image from 'next/image';

interface ProviderHeroShowcaseProps {
  isAr?: boolean;
}

export default function ProviderHeroShowcase({ isAr = false }: ProviderHeroShowcaseProps) {
  return (
    <div className="relative w-full [perspective:1200px] sm:[perspective:1600px] select-none">
      {/* Ambient Depth Glows behind card */}
      <div className="pointer-events-none absolute -top-10 start-1/4 w-3/4 h-3/4 bg-[#FF5C00]/[0.09] blur-[140px] rounded-full -z-10" />
      <div className="pointer-events-none absolute bottom-0 end-10 w-1/2 h-1/2 bg-blue-500/[0.03] blur-[120px] rounded-full -z-10" />

      {/* 3D Tilted Card Container matching exact reference design */}
      <div
        className={`relative w-full h-[280px] sm:h-[440px] md:h-[520px] lg:h-[600px] rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0C0D10] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95),0_0_70px_-15px_rgba(255,92,0,0.12)] overflow-hidden transition-transform duration-700 ease-out will-change-transform ${
          isAr ? 'provider-showcase-rtl' : 'provider-showcase-ltr'
        }`}
      >
        {/* Uploaded Office Image */}
        <Image
          src="/providers-hero.png"
          alt={isAr ? 'بيئة تدريب الشركات المعتمدة' : 'Corporate Training Providers Workspace'}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 95vw, 1200px"
          className="object-cover object-center"
        />

        {/* Seamless Bottom Gradient Fade into background (#08090A) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090A] via-[#08090A]/40 to-transparent" />

        {/* Subtle Glass Surface Sheen */}
        <div
          className={`pointer-events-none absolute inset-0 ${
            isAr
              ? 'bg-gradient-to-bl from-white/[0.07] via-transparent to-transparent'
              : 'bg-gradient-to-br from-white/[0.07] via-transparent to-transparent'
          }`}
        />

        {/* Inner Ring Highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-white/10" />
      </div>
    </div>
  );
}
