'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons';
import BorderBeam from '@/components/shared/BorderBeam';
import CardTilt3D from '@/components/shared/CardTilt3D';
import Magnetic from '@/components/shared/Magnetic';
import Press from '@/components/shared/Press';
import { Locale } from '@/i18n';

interface FooterCtaCardProps {
  lang: Locale;
  cardTitle: string;
  cardSubtitle: string;
  btnCall: string;
}

export default function FooterCtaCard({
  lang,
  cardTitle,
  cardSubtitle,
  btnCall,
}: FooterCtaCardProps) {
  return (
    <CardTilt3D maxTilt={4} glareOpacity={0.12} className="max-w-2xl mx-auto -mt-10">
      <div className="relative z-10 w-full rounded-2xl sm:rounded-3xl border border-[#26282D] hover:border-white/30 bg-[#0F1013]/95 backdrop-blur-2xl p-4 xs:p-6 sm:p-8 md:p-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_20px_50px_-10px_rgba(0,0,0,0.8)] text-center flex flex-col items-center gap-4 xs:gap-5 sm:gap-6 transform-gpu transition-all duration-300 overflow-hidden">
        <BorderBeam size={260} duration={14} colorFrom="#FF5C00" colorTo="#4D7CFF" />
        {/* Subtle top inner sheen */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-2.5 sm:space-y-3 max-w-xl">
          <h3 className="text-xl xs:text-[1.375rem] sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight font-heading">
            {cardTitle}
          </h3>
          <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed font-sans">
            {cardSubtitle}
          </p>
        </div>

        <Magnetic strength={0.25} activeDistance={45} className="w-full sm:w-auto">
          <Press className="w-full sm:w-auto" strength={0.4} vibrate>
            <Link
              href={`/${lang}/contact`}
              className="relative z-10 inline-flex items-center justify-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 hover:border-white/30 font-medium px-5 xs:px-8 py-3.5 rounded-xl text-sm sm:text-base min-h-[48px] backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] hover:scale-[1.02] active:scale-[0.98] touch-manipulation transition-all group w-full sm:w-auto"
            >
              <span>{btnCall}</span>
              <ArrowRight size={17} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
          </Press>
        </Magnetic>
      </div>
    </CardTilt3D>
  );
}
