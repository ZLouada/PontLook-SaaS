'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowDown, Building2, Briefcase, ShieldCheck, Sparkles, Layers } from '@/components/icons';
import { m } from 'framer-motion';
import Signal from '@/components/shared/Signal';
import Spotlight from '@/components/shared/Spotlight';
import BorderBeam from '@/components/shared/BorderBeam';
import CardTilt3D from '@/components/shared/CardTilt3D';

interface SolutionsHeroProps {
  lang: string;
  isAr: boolean;
}

export default function SolutionsHero({ lang, isAr }: SolutionsHeroProps) {
  return (
    <section className="relative pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-24 border-b border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="container-site max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Eyebrow Pill */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.05] backdrop-blur-md">
            <Signal />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-300">
              {isAr ? 'منظومة المطابقة الثنائية · الخليج العربي' : 'BILATERAL MATCHMAKING PLATFORM · GCC'}
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl">
          <h1 className="font-heading font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-white">
            {isAr ? (
              <>
                الهيكلية المتكاملة لمطابقة وتطوير{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                  الكفاءات المؤسسية
                </span>
              </>
            ) : (
              <>
                The End-to-End Solution for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                  Corporate Training
                </span>
              </>
            )}
          </h1>

          <p className="mt-6 sm:mt-8 text-neutral-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-normal">
            {isAr
              ? 'تجمع PontLook بين تشخيص احتياجات المنشآت المؤسسية والاعتماد المسبق لنخبة مزودي التدريب. محرك مطابقة موحد يُفرع مسارين تخصصيين: مسار الشركات للبحث عن تدريب، ومسار المزودين لنمو الأعمال.'
              : 'PontLook synchronizes corporate talent demands with accredited training providers. One centralized matchmaking engine powering two specialized extension tracks: an Enterprise Sourcing track and a Provider Acquisition track.'}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4">
          <a
            href="#extensions"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-semibold text-xs sm:text-sm tracking-wide rounded-none border border-white hover:bg-black hover:text-white transition-all duration-200 group"
          >
            <span>{isAr ? 'استكشف المسارات التخصصية' : 'Explore Extension Tracks'}</span>
            <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#architecture"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent text-white font-medium text-xs sm:text-sm tracking-wide rounded-none border border-white/40 hover:border-white hover:bg-white/10 transition-all duration-200"
          >
            <span>{isAr ? 'هندسة المطابقة وآلية العمل' : 'Matchmaking Architecture'}</span>
          </a>
        </div>

        {/* Real-Time Platform Metrics Bar */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">100%</span>
            <p className="text-xs font-mono text-neutral-400">
              {isAr ? 'ميزانيات مؤسسية معتمدة' : 'Verified Corporate Budgets'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">48h</span>
            <p className="text-xs font-mono text-neutral-400">
              {isAr ? 'مهلة مطابقة 3 عروض' : '3-Proposal Delivery SLA'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">SAR 0</span>
            <p className="text-xs font-mono text-neutral-400">
              {isAr ? 'رسوم اشتراك أو احتجاز' : 'Monthly Retainer Risk'}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">GCC</span>
            <p className="text-xs font-mono text-neutral-400">
              {isAr ? 'توطين كامل ومواءمة تنظيمية' : 'Regulatory & TVTC Aligned'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
