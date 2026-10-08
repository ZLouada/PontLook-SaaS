'use client';

import React from 'react';
import Link from 'next/link';
import ProviderKnowledgeGraph from '@/components/providers/ProviderKnowledgeGraph';
import ProviderMissionBeacon from '@/components/providers/ProviderMissionBeacon';

interface ProviderHeroProps {
  lang: string;
}

export default function ProviderHero({ lang }: ProviderHeroProps) {
  const isAr = lang === 'ar';

  return (
    <section className="relative overflow-hidden bg-[#07090E] pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-20 min-h-[640px] lg:min-h-[760px] flex flex-col justify-between border-b border-white/10">
      {/* 48px square blueprint grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"
        aria-hidden="true"
      />

      {/* Top Mission Status Beacon */}
      <div className="relative z-20 mb-6 sm:mb-8">
        <ProviderMissionBeacon isAr={isAr} />
      </div>

      {/* Main Grid: Content on Left, Interactive Knowledge Graph Canvas on Right */}
      <div className="container-site max-w-7xl mx-auto relative z-10 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Mission copy, micro-tags, and tactical actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-start">
            {/* System Classification Badge */}
            <div className="mb-4 inline-flex items-center gap-2 px-2.5 py-1 bg-white/5 border border-white/15 font-mono text-[11px] text-sky-400">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>
                {isAr
                  ? 'بوابة مزودي التدريب المؤسسي · الخليج'
                  : 'CLASSIFICATION: ENTERPRISE_PROCUREMENT // GCC'}
              </span>
            </div>

            {/* Crisp Palantir-Style Headline */}
            <h1 className="font-heading text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.08] text-start">
              {isAr ? (
                <>
                  شراء تدريب الشركات المباشر.{' '}
                  <span className="text-sky-400 font-normal">بدون تسويق بارد.</span>
                </>
              ) : (
                <>
                  Direct Enterprise Training Procurement.{' '}
                  <span className="text-sky-400 font-normal">Zero Cold Outreach.</span>
                </>
              )}
            </h1>

            {/* High-Signal Procurement Micro-Copy */}
            <p className="mt-4 sm:mt-5 font-sans text-sm xs:text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl text-start">
              {isAr
                ? 'قناة مباشرة مع صناع القرار ومسؤولي التدريب في كبرى المنشآت الخليجية ذات الميزانيات المعتمدة (150 - 850 ألف ريال). بدون قوائم باردة وبدون اشتراكات شهرية. نتحقق من مخصصات هدف وتوطين نيتاقات وتفويضات الإدارة التنفيذية قبل توجيه الفرص لجدولك.'
                : 'Direct line to verified GCC corporate buyers holding active training budgets (SAR 150K–850K+). No speculative lists, no agency retainers. We audit HRDF/Hadaf allocations, Nitaqat Saudization quotas, and C-level mandates before routing.'}
            </p>

            {/* Dual Tactical Actions */}
            <div className="mt-7 sm:mt-9 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 w-full sm:w-auto">
              <a
                href="#intake-terminal"
                className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-sky-500 hover:bg-sky-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors min-h-[46px]"
              >
                <span>[</span>
                <span>{isAr ? 'بدء تسجيل المزود' : 'INITIALIZE ONBOARDING'}</span>
                <span>]</span>
              </a>

              <a
                href="#protocol-breakdown"
                className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 font-mono text-xs uppercase tracking-wider transition-colors min-h-[46px]"
              >
                <span>{isAr ? 'فحص بروتوكول الربط' : 'INSPECT PROTOCOL'}</span>
                <span className="text-sky-400">▶</span>
              </a>
            </div>

            {/* Micro-specs Monospace Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 w-full grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[10px] text-slate-400">
              <div>
                <div className="text-slate-500">BUDGETS:</div>
                <div className="text-slate-200 font-semibold">SAR 150K–850K+</div>
              </div>
              <div>
                <div className="text-slate-500">BUYERS:</div>
                <div className="text-emerald-400 font-semibold">100% C-SUITE</div>
              </div>
              <div>
                <div className="text-slate-500">RETAINERS:</div>
                <div className="text-sky-300 font-semibold">0 SAR / $0</div>
              </div>
              <div>
                <div className="text-slate-500">DISPATCH SLA:</div>
                <div className="text-slate-200 font-semibold">&lt; 72 HOURS</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Entity Resolution & Knowledge Graph Canvas */}
          <div className="lg:col-span-6 w-full h-[400px] sm:h-[480px] lg:h-[540px] relative border border-white/10 bg-[#0C1018] shadow-2xl">
            {/* Canvas Header Bar */}
            <div className="absolute top-0 inset-x-0 z-20 bg-[#111724]/90 border-b border-white/10 px-3.5 py-1.5 flex items-center justify-between font-mono text-[10px] text-slate-400 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span className="text-sky-300 font-semibold">
                  LIVE ENTITY GRAPH // GCC ENTERPRISE ROUTING
                </span>
              </div>
              <span className="text-slate-500 hidden sm:inline-block">INTERACTIVE HUD</span>
            </div>

            {/* Interactive Knowledge Graph Canvas Component */}
            <div className="pt-7 w-full h-full">
              <ProviderKnowledgeGraph isAr={isAr} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
