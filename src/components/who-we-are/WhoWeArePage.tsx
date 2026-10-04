'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import {
  Building2,
  GraduationCap,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  ArrowDown,
  Target,
  Zap,
  Handshake,
  Check,
  TrendingUp,
  ShieldCheck,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import type { Locale } from '@/i18n/config';

interface WhoWeArePageProps {
  lang?: Locale;
}

/* ==========================================================================
   THE INTERACTIVE ANIMATED SUSPENSION BRIDGE COMPONENT
   ========================================================================== */
function PontLookBridge({ lang = 'en' }: { lang: Locale }) {
  const isAr = lang === 'ar';

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 mb-10">
      {/* ----------------- DESKTOP SVG BRIDGE (md and above) ----------------- */}
      <div className="hidden md:block relative w-full pt-10 pb-6 px-4">
        {/* SVG Suspension Arch & Kinetic Particle Beams */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 240"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>

              <filter id="bridgeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Dotted Cable / Arch */}
            <path
              d="M 160 120 Q 500 20 840 120"
              stroke="url(#bridgeGradient)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="opacity-40"
            />

            {/* Subtle Vertical Suspension Struts */}
            <path d="M 280 85 L 280 145" stroke="url(#bridgeGradient)" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
            <path d="M 380 50 L 380 145" stroke="url(#bridgeGradient)" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <path d="M 620 50 L 620 145" stroke="url(#bridgeGradient)" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <path d="M 720 85 L 720 145" stroke="url(#bridgeGradient)" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />

            {/* Primary Moving Energy Beam */}
            <m.path
              d="M 160 120 Q 500 20 840 120"
              stroke="url(#bridgeGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#bridgeGlow)"
              initial={{ pathLength: 0.16, pathOffset: 0 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            />

            {/* Secondary High-Intensity White Core Spark */}
            <m.path
              d="M 160 120 Q 500 20 840 120"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0.05, pathOffset: 0 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: 0.05 }}
            />
          </svg>
        </div>

        {/* 3 Physical Bridge Pillars / Nodes */}
        <div className="relative z-10 grid grid-cols-12 gap-5 items-center">
          {/* Left Pillar: Enterprise Demand */}
          <div className="col-span-4 bg-slate-900/90 border border-blue-500/30 backdrop-blur-md p-5 rounded-2xl shadow-xl shadow-blue-500/5 text-start relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Building2 size={20} />
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-blue-400">
                  {isAr ? 'طلب نشط' : 'ACTIVE DEMAND'}
                </span>
              </div>
            </div>
            <h3 className="text-white font-bold text-base tracking-tight mb-1">
              {isAr ? 'طلب المؤسسات' : 'Enterprise Demand'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr
                ? 'فجوة الكفاءة المؤسسية · ميزانية مؤكدة (ريال/درهم)'
                : 'Workforce Capability Gap · Confirmed Budget (SAR/AED)'}
            </p>
          </div>

          {/* Center Apex Node: PontLook Diagnostic Core */}
          <m.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="col-span-4 bg-gradient-to-b from-slate-800 to-slate-900 border border-orange-500/40 p-4 sm:p-5 rounded-2xl shadow-xl shadow-orange-500/10 text-center relative z-20"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[11px] font-bold tracking-wider uppercase mb-2.5">
              <span>{isAr ? '✦ جسر التوفيق والربط' : '✦ THE MATCHMAKING BRIDGE'}</span>
            </div>
            <h3 className="text-white font-bold text-base sm:text-lg tracking-tight mb-1">
              {isAr ? 'محرك بونت لوك التشخيصي' : 'PontLook Diagnostic Engine'}
            </h3>
            <p className="text-xs font-medium text-orange-200/90 leading-relaxed">
              {isAr
                ? 'مطابقة خلال 48 ساعة · بدون مزايدات'
                : '48h Match SLA · Zero Bidding Wars'}
            </p>
          </m.div>

          {/* Right Pillar: Vetted Training Partners */}
          <div className="col-span-4 bg-slate-900/90 border border-emerald-500/30 backdrop-blur-md p-5 rounded-2xl shadow-xl shadow-emerald-500/5 text-start relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <GraduationCap size={20} />
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                <CheckCircle2 size={11} />
                <span>{isAr ? 'عقد قائم على النجاح' : 'Success-Based Contract'}</span>
              </div>
            </div>
            <h3 className="text-white font-bold text-base tracking-tight mb-1">
              {isAr ? 'شركاء التدريب المعتمدون' : 'Vetted Training Partners'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr
                ? 'متطلبات محددة مسبقاً · بدون تواصل بارد'
                : 'Pre-Scoped Briefs · Zero Cold Prospecting'}
            </p>
          </div>
        </div>
      </div>

      {/* ----------------- MOBILE STACKED BRIDGE (under md) ----------------- */}
      <div className="md:hidden relative flex flex-col gap-3 px-2">
        {/* Mobile Pillar 1: Enterprise Demand */}
        <div className="bg-slate-900/95 border border-blue-500/30 p-4 rounded-2xl text-start">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Building2 size={16} />
              </div>
              <h3 className="text-white font-bold text-sm">
                {isAr ? 'طلب المؤسسات' : 'Enterprise Demand'}
              </h3>
            </div>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {isAr
              ? 'فجوة الكفاءة المؤسسية · ميزانية مؤكدة (ريال/درهم)'
              : 'Workforce Capability Gap · Confirmed Budget (SAR/AED)'}
          </p>
        </div>

        {/* Mobile Connecting Indicator */}
        <div className="flex items-center justify-center">
          <div className="w-0.5 h-4 bg-gradient-to-b from-blue-500 to-orange-500" />
        </div>

        {/* Mobile Pillar 2: PontLook Diagnostic Engine */}
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-orange-500/40 p-4 rounded-2xl text-center">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase mb-1.5 border border-orange-500/30">
            {isAr ? '✦ جسر التوفيق والربط' : '✦ THE MATCHMAKING BRIDGE'}
          </span>
          <h3 className="text-white font-bold text-sm mb-0.5">
            {isAr ? 'محرك بونت لوك التشخيصي' : 'PontLook Diagnostic Engine'}
          </h3>
          <p className="text-xs text-orange-200/90 font-medium">
            {isAr
              ? 'مطابقة خلال 48 ساعة · بدون مزايدات'
              : '48h Match SLA · Zero Bidding Wars'}
          </p>
        </div>

        {/* Mobile Connecting Indicator */}
        <div className="flex items-center justify-center">
          <div className="w-0.5 h-4 bg-gradient-to-b from-orange-500 to-emerald-500" />
        </div>

        {/* Mobile Pillar 3: Vetted Training Partners */}
        <div className="bg-slate-900/95 border border-emerald-500/30 p-4 rounded-2xl text-start">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <GraduationCap size={16} />
              </div>
              <h3 className="text-white font-bold text-sm">
                {isAr ? 'شركاء التدريب المعتمدون' : 'Vetted Training Partners'}
              </h3>
            </div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-semibold border border-emerald-500/30">
              <CheckCircle2 size={10} />
              <span>{isAr ? 'قائم على النجاح' : 'Success-Based'}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            {isAr
              ? 'متطلبات محددة مسبقاً · بدون تواصل بارد'
              : 'Pre-Scoped Briefs · Zero Cold Prospecting'}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   WHO WE ARE PAGE COMPONENT
   ========================================================================== */
export default function WhoWeArePage({ lang = 'en' }: WhoWeArePageProps) {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'pontlook' | 'traditional' | 'both'>('pontlook');

  const scrollToMission = () => {
    const el = document.getElementById('our-mission');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`w-full overflow-hidden ${isAr ? 'font-arabic' : 'font-sans'}`}>
      {/* =========================================================================
          SECTION 1: HERO & THE ANIMATED BRIDGE (Dark Canvas: #080C14)
          ========================================================================= */}
      <section
        data-nav-dark="true"
        className="relative bg-[#080C14] text-white pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 overflow-hidden border-b border-white/[0.06]"
      >
        {/* Subtle Ambient Radial Glows */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-[#2451BF]/20 via-[#3B82F6]/10 to-transparent rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -top-24 right-1/4 w-[400px] h-[400px] bg-[#FF5B00]/[0.04] rounded-full blur-[100px] pointer-events-none"
        />

        {/* Ambient Grid overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"
        />

        <div className="container-site max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Eyebrow Pill */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.04] border border-blue-500/30 hover:border-blue-500/50 backdrop-blur-md shadow-inner mb-6 sm:mb-8 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]" />
            </span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-neutral-300">
              {isAr
                ? 'منظومة مطابقة التدريب المؤسسي المعتمد'
                : 'THE CORPORATE TRAINING MATCHMAKING PLATFORM'}
            </span>
          </m.div>

          {/* H1 Headline */}
          <m.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.12] max-w-4xl mx-auto mb-6"
          >
            {isAr
              ? 'جسركم المباشر نحو التدريب المؤسسي المعتمد والرؤى القابلة للتطبيق'
              : 'We Are Your Bridge to Enterprise Training and Actionable Insights'}
          </m.h1>

          {/* Sub-headline */}
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
            className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed font-normal mb-8 sm:mb-10"
          >
            {isAr
              ? 'نساعد مؤسسات الخليج في تشخيص فجوات المهارات عبر أبحاث عملية دقيقة، ثم نربطها مباشرة بشركاء تدريب معتمدين جاهزين لتحقيق النتائج.'
              : 'We help GCC organizations diagnose skill gaps through practical research, then connect them directly to pre-vetted training partners ready to deliver results.'}
          </m.p>

          {/* Action Buttons */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-6"
          >
            <Link
              href={`/${lang}/find-training`}
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-600/25 transition-all duration-200 active:scale-[0.98] group"
            >
              <span>{isAr ? 'ابحث عن شركاء تدريب' : 'Find Training Partners'}</span>
              <ArrowRight
                size={16}
                className={`ms-2 transition-transform duration-200 group-hover:translate-x-1 ${
                  isAr ? 'rotate-180 group-hover:-translate-x-1' : ''
                }`}
              />
            </Link>

            <button
              type="button"
              onClick={scrollToMission}
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 font-medium backdrop-blur-sm transition-all duration-200 active:scale-[0.98] group"
            >
              <span>{isAr ? 'استكشف آلية العمل' : 'Explore How It Works'}</span>
              <ArrowDown
                size={16}
                className="ms-2 text-slate-400 group-hover:text-white group-hover:translate-y-0.5 transition-all duration-200"
              />
            </button>
          </m.div>

          {/* Centerpiece Animated Bridge */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.26, ease: 'easeOut' }}
          >
            <PontLookBridge lang={lang} />
          </m.div>

          {/* Bottom 3 Proof Chips */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-start"
          >
            {/* Chip 1 */}
            <div className="bg-slate-900/80 hover:bg-slate-900 border border-white/[0.08] hover:border-blue-500/40 p-4 sm:p-5 rounded-2xl backdrop-blur-sm transition-all duration-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                  <Target size={18} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm sm:text-base tracking-tight mb-1">
                    {isAr ? '🎯 طلب مؤسسي مشخص' : '🎯 Diagnosed Demand'}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {isAr
                      ? 'تحديات تدريبية محددة بدقة في السعودية والإمارات.'
                      : 'Pre-scoped workforce challenges across Saudi Arabia and UAE.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Chip 2 */}
            <div className="bg-slate-900/80 hover:bg-slate-900 border border-white/[0.08] hover:border-orange-500/40 p-4 sm:p-5 rounded-2xl backdrop-blur-sm transition-all duration-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0">
                  <Zap size={18} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm sm:text-base tracking-tight mb-1">
                    {isAr ? '⚡ توفيق مباشر ودقيق' : '⚡ Direct Matchmaking'}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {isAr
                      ? '2 إلى 3 خبراء معتمدين كحد أقصى لكل فرصة (بدون مزايدات).'
                      : '2 to 3 curated specialists per mandate (Zero bidding wars).'}
                  </p>
                </div>
              </div>
            </div>

            {/* Chip 3 */}
            <div className="bg-slate-900/80 hover:bg-slate-900 border border-white/[0.08] hover:border-emerald-500/40 p-4 sm:p-5 rounded-2xl backdrop-blur-sm transition-all duration-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Handshake size={18} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm sm:text-base tracking-tight mb-1">
                    {isAr ? '🤝 نتائج متوافقة' : '🤝 Aligned Outcomes'}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {isAr
                      ? 'مجاني 100% للشركات؛ مبني على نجاح التعاقد لمزودي التدريب.'
                      : '100% free for enterprises; success-based for training providers.'}
                  </p>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: OUR MISSION & INTERACTIVE COMPARISON (White Canvas: #FFFFFF)
          ========================================================================= */}
      <section
        id="our-mission"
        data-nav-light="true"
        className="relative bg-white text-[#0F172A] py-20 sm:py-28 lg:py-32 transition-colors duration-500"
      >
        <div className="container-site max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header Block */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 font-semibold tracking-wider text-xs uppercase mb-4">
              <Sparkles size={12} className="text-blue-600" />
              <span>{isAr ? 'مهمتنا' : 'OUR MISSION'}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              {isAr
                ? 'استبدال تعقيدات الشراء بشراكات تدريبية دقيقة'
                : 'Replacing Procurement Friction with Precision Partnerships'}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {isAr
                ? 'مهمتنا هي القضاء على أسابيع من تخمين الموارد البشرية ووقف التواصل البارد لمزودي التدريب من خلال تشخيص مدعوم بالبحث وتوفيق معتمد.'
                : 'Our mission is to eliminate weeks of guesswork for enterprise HR and end cold prospecting for training providers through research-backed diagnoses and verified matching.'}
            </p>
          </div>

          {/* Interactive View Toggle (Segmented Control) */}
          <div className="flex flex-col items-center mb-10 sm:mb-12">
            <div className="p-1.5 bg-slate-100/90 border border-slate-200 rounded-2xl flex items-center gap-1 shadow-xs max-w-full overflow-x-auto">
              {/* PontLook Way Button */}
              <button
                type="button"
                onClick={() => setActiveTab('pontlook')}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 shrink-0 ${
                  activeTab === 'pontlook'
                    ? 'bg-white text-emerald-800 shadow-sm border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <CheckCircle2
                  size={15}
                  className={activeTab === 'pontlook' ? 'text-emerald-600' : 'text-slate-400'}
                />
                <span>{isAr ? 'طريقة بونت لوك' : 'The PontLook Way'}</span>
              </button>

              {/* Traditional Way Button */}
              <button
                type="button"
                onClick={() => setActiveTab('traditional')}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 shrink-0 ${
                  activeTab === 'traditional'
                    ? 'bg-white text-red-800 shadow-sm border border-red-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <XCircle
                  size={15}
                  className={activeTab === 'traditional' ? 'text-red-500' : 'text-slate-400'}
                />
                <span>{isAr ? 'الطريقة التقليدية' : 'The Traditional Way'}</span>
              </button>

              {/* Side-by-Side Button */}
              <button
                type="button"
                onClick={() => setActiveTab('both')}
                className={`hidden lg:flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 ${
                  activeTab === 'both'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <SlidersHorizontal size={14} className="text-slate-500" />
                <span>{isAr ? 'مقارنة جنباً إلى جنب' : 'Side-by-Side'}</span>
              </button>
            </div>
          </div>

          {/* Comparison Cards Content */}
          <div className="w-full">
            <div
              className={`grid gap-6 transition-all duration-300 ${
                activeTab === 'both'
                  ? 'grid-cols-1 lg:grid-cols-2'
                  : 'grid-cols-1 max-w-2xl mx-auto'
              }`}
            >
              {/* CARD 1: THE PONTLUX / PONTLOOK WAY (Green / Emerald Solution Theme) */}
              {(activeTab === 'pontlook' || activeTab === 'both') && (
                <m.div
                  key="pontlook-solution"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="border-2 border-emerald-500/30 bg-emerald-50/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
                    <span className="px-3 py-1 rounded-md bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                      {isAr ? 'طريقة بونت لوك' : 'THE PONTLUX WAY'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-tight border border-emerald-200">
                      <Check size={13} className="text-emerald-700 stroke-[3]" />
                      <span>{isAr ? '✓ موثوق ومباشر · صفر تخمين' : '✓ Verified & Direct · Zero Guesswork'}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-6">
                    {isAr ? 'دقة الاختيار وبدون احتكاك' : 'Curated Precision & Zero Friction'}
                  </h3>

                  <ul className="space-y-5 text-start">
                    {/* Item 1 */}
                    <li className="flex items-start gap-3.5">
                      <div className="mt-0.5 p-1 rounded-full bg-emerald-200/80 text-emerald-800 shrink-0">
                        <Check size={14} className="stroke-[3]" />
                      </div>
                      <div>
                        <strong className="block text-sm sm:text-base font-semibold text-slate-900">
                          {isAr ? 'تشخيص قبل التوفيق' : 'Diagnosed Before Matching'}
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                          {isAr
                            ? 'نحدد فجوات المهارات وتحديات القوى العاملة بدقة مع الموارد البشرية قبل أي تواصل.'
                            : "We identify the team's exact skill gaps and workforce challenges with HR before reaching out."}
                        </p>
                      </div>
                    </li>

                    {/* Item 2 */}
                    <li className="flex items-start gap-3.5">
                      <div className="mt-0.5 p-1 rounded-full bg-emerald-200/80 text-emerald-800 shrink-0">
                        <Check size={14} className="stroke-[3]" />
                      </div>
                      <div>
                        <strong className="block text-sm sm:text-base font-semibold text-slate-900">
                          {isAr ? 'نخبة متخصصة ومثبتة الكفاءة' : 'Curated, Proven Specialists'}
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                          {isAr
                            ? 'تتجاوز المؤسسات العروض التسويقية وتتصل مباشرة بـ 2 إلى 3 مزودين معتمدين خصيصاً لاحتياجهم.'
                            : 'Enterprises skip sales pitches and connect directly with 2–3 vetted providers tailored to their need.'}
                        </p>
                      </div>
                    </li>

                    {/* Item 3 */}
                    <li className="flex items-start gap-3.5">
                      <div className="mt-0.5 p-1 rounded-full bg-emerald-200/80 text-emerald-800 shrink-0">
                        <Check size={14} className="stroke-[3]" />
                      </div>
                      <div>
                        <strong className="block text-sm sm:text-base font-semibold text-slate-900">
                          {isAr ? 'تعاقدات جاهزة للتنفيذ الفوري' : 'Ready-to-Deliver Engagements'}
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                          {isAr
                            ? 'يتلقى المزودون متطلبات محددة مسبقاً بميزانيات معتمدة ليركزوا بنسبة 100% على تقديم التدريب.'
                            : 'Providers receive pre-scoped, budget-approved briefs so they can focus 100% on delivering training.'}
                        </p>
                      </div>
                    </li>
                  </ul>
                </m.div>
              )}

              {/* CARD 2: THE TRADITIONAL WAY (Red / Problem Theme) */}
              {(activeTab === 'traditional' || activeTab === 'both') && (
                <m.div
                  key="traditional-problem"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="border-2 border-red-500/30 bg-red-50/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm"
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
                    <span className="px-3 py-1 rounded-md bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                      {isAr ? 'البحث التقليدي عن التدريب' : 'TRADITIONAL TRAINING SEARCH'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold tracking-tight border border-red-200">
                      <AlertCircle size={13} className="text-red-700" />
                      <span>{isAr ? '⚠️ أسابيع ضائعة · احتكاك مرتفع' : '⚠️ Weeks Lost · High Friction'}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-6">
                    {isAr ? 'مسارات غير متوقعة ودورات غير ملائمة' : 'Unpredictable Pipelines & Misaligned Courses'}
                  </h3>

                  <ul className="space-y-5 text-start">
                    {/* Item 1 */}
                    <li className="flex items-start gap-3.5">
                      <div className="mt-0.5 p-1 rounded-full bg-red-200/80 text-red-800 shrink-0">
                        <XCircle size={14} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <strong className="block text-sm sm:text-base font-semibold text-slate-900">
                          {isAr ? 'بحث لا ينتهي ورسائل غير مرغوبة' : 'Endless Searching & Cold Spam'}
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                          {isAr
                            ? 'إرهاق الموارد البشرية بالبحث في أدلة عامة؛ وإرسال المزودين لمئات الرسائل الباردة التي يتم تجاهلها.'
                            : 'HR sifting through generic directories; providers sending hundreds of ignored cold emails.'}
                        </p>
                      </div>
                    </li>

                    {/* Item 2 */}
                    <li className="flex items-start gap-3.5">
                      <div className="mt-0.5 p-1 rounded-full bg-red-200/80 text-red-800 shrink-0">
                        <XCircle size={14} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <strong className="block text-sm sm:text-base font-semibold text-slate-900">
                          {isAr ? 'احتياجات غامضة ودورات غير مطابقة' : 'Vague Needs & Misaligned Courses'}
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                          {isAr
                            ? 'شراء برامج تدريبية جاهزة دون تشخيص مسبق لما إذا كانت تعالج فجوة المهارات الفعلية.'
                            : 'Buying off-the-shelf training without diagnosing whether it actually fixes the internal skill gap.'}
                        </p>
                      </div>
                    </li>

                    {/* Item 3 */}
                    <li className="flex items-start gap-3.5">
                      <div className="mt-0.5 p-1 rounded-full bg-red-200/80 text-red-800 shrink-0">
                        <XCircle size={14} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <strong className="block text-sm sm:text-base font-semibold text-slate-900">
                          {isAr ? 'جلسات استكشاف غير مدفوعة ومسارات مسدودة' : 'Unpaid Discovery & Dead Ends'}
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                          {isAr
                            ? 'إهدار شركات التدريب لساعات طويلة في مكالمات استكشافية مع جهات تفتقر للميزانية أو سلطة اتخاذ القرار.'
                            : 'Training firms burning hours on exploratory calls with companies that lack budget or authority.'}
                        </p>
                      </div>
                    </li>
                  </ul>
                </m.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SHOW YOUR ADDED BENEFITS — A TRANSPARENT MARKETPLACE
          ========================================================================= */}
      <section
        data-nav-light="true"
        className="relative bg-[#F8FAFC] text-[#0F172A] py-20 sm:py-28 border-y border-slate-200/80 transition-colors"
      >
        <div className="container-site max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header Block */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-semibold tracking-wider uppercase mb-4">
              <span>{isAr ? 'مواءمة السوق والقيمة' : 'MARKETPLACE ALIGNMENT'}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              {isAr
                ? 'مجاني للشركات، ومتوافق في النتائج مع المزودين'
                : 'Complimentary for Companies, Aligned on Results with Providers'}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {isAr
                ? 'تحظى منصتنا بدعم مباشر من شركائنا التدريبيين عبر اتفاقية قائمة على الأداء، تُطبق فقط عند تأكيد التعاقد الناجح وتنفيذه. تضمن هذه المنظومة بقاء مصالحنا متوافقة تماماً مع مصالحكم: نحن لا ننجح إلا عند بناء الشراكة المناسبة وعالية الأثر.'
                : 'Our platform is supported directly by our training partners through a performance-based arrangement, applied only when a successful engagement is confirmed and delivered. This structure ensures our interests remain completely aligned with yours: we only succeed when the right, high-impact partnership is formed.'}
            </p>
          </div>

          {/* 3 Benefit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: 100% Free for Enterprises */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60">
                    {isAr ? 'عملاء المؤسسات' : 'ENTERPRISE CLIENTS'}
                  </span>
                  <Building2 size={18} className="text-blue-600" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2.5">
                  {isAr ? 'مجاني 100% للمؤسسات' : '100% Free for Enterprises'}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {isAr
                    ? 'مجاني تماماً لتقييم فجوات المهارات، ومراجعة العروض، والتواصل المباشر مع المزودين المعتمدين.'
                    : 'Free to assess workforce skill gaps, review proposals, and connect directly with shortlisted providers.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="inline-flex items-center text-xs font-semibold text-blue-700 bg-blue-50/80 px-2.5 py-1 rounded-md">
                  {isAr ? 'بدون اشتراك · بدون رسوم خفية' : 'No Subscription · No Hidden Fees'}
                </span>
              </div>
            </div>

            {/* Card 2: Success-Based Only */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    {isAr ? 'مزودو التدريب' : 'TRAINING PROVIDERS'}
                  </span>
                  <GraduationCap size={18} className="text-emerald-600" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2.5">
                  {isAr ? 'قائم على النجاح فقط' : 'Success-Based Only'}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {isAr
                    ? 'لا رسوم مسبقة أو رسوم مزايدة — الاستثمار فقط عند تأكيد العقد وإغلاقه بنجاح.'
                    : 'No upfront retainers or bidding fees—invest only when a verified contract is confirmed and closed.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-md">
                  {isAr ? 'صفر دفعات مسبقة · متوافق مع الأداء' : 'Zero Retainers · Performance Aligned'}
                </span>
              </div>
            </div>

            {/* Card 3: Aligned Incentives */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-orange-500/40 transition-all duration-200 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 border border-orange-200/60">
                    {isAr ? 'الثقة والنزاهة' : 'TRUST & INTEGRITY'}
                  </span>
                  <TrendingUp size={18} className="text-orange-600" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2.5">
                  {isAr ? 'حوافز متوافقة' : 'Aligned Incentives'}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {isAr
                    ? 'لا نتاجر ببيانات الاتصال ولا بأعداد العملاء المحتملين؛ تركيزنا منصب فقط على النتائج الناجحة والمطابقة تماماً.'
                    : "We don't monetize contact lists or lead volume; we focus purely on high-fit, successful outcomes."}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="inline-flex items-center text-xs font-semibold text-orange-700 bg-orange-50/80 px-2.5 py-1 rounded-md">
                  {isAr ? 'ميزانيات مؤكدة · صناع قرار فعليون' : 'Verified Budgets · Real Decision-Makers'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: THE END-TO-END TRAINING JOURNEY (White Canvas: #FFFFFF)
          ========================================================================= */}
      <section
        data-nav-light="true"
        className="relative bg-white text-[#0F172A] py-20 sm:py-28 lg:py-32 overflow-hidden transition-colors"
      >
        <div className="container-site max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header Block */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold tracking-wider uppercase mb-4">
              <span>{isAr ? 'الآلية الشاملة' : 'THE PROCESS'}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              {isAr
                ? 'من تحدي الكفاءات المؤسسي إلى الأثر المقاس'
                : 'From Workforce Challenge to Measured Impact'}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-4">
              {isAr
                ? 'من خلال تشخيص تحديات القوى العاملة مسبقاً، نزيل التعقيدات والتأخير والتخمين من شراء التدريب المؤسسي.'
                : 'By diagnosing workforce challenges upfront, we remove the friction, delays, and guesswork from corporate training procurement.'}
            </p>

            <Link
              href={`/${lang}/find-training`}
              className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
            >
              <span>{isAr ? 'استكشف آلية التوفيق' : 'Explore the Matching Process'}</span>
              <ArrowRight
                size={14}
                className={`ms-1.5 transition-transform group-hover:translate-x-1 ${
                  isAr ? 'rotate-180 group-hover:-translate-x-1' : ''
                }`}
              />
            </Link>
          </div>

          {/* Connected 5-Stage Roadmap Container */}
          <div className="relative">
            {/* Glowing horizontal connector line across desktop */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-blue-200 via-blue-500 to-emerald-400 z-0"
            />

            {/* 5 Stages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10">
              {/* Stage 1 */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 text-center flex flex-col items-center hover:bg-white hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/20 mb-3 border-2 border-white ring-2 ring-blue-100">
                  01
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1.5">
                  {isAr ? 'فجوة المهارات المؤسسية' : 'Enterprise Skill Gap'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? 'تحدد الموارد البشرية الاحتياجات التشغيلية أو التقنية أو القيادية.'
                    : 'HR identifies operational, technical, or leadership deficiencies.'}
                </p>
              </div>

              {/* Stage 2 */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 text-center flex flex-col items-center hover:bg-white hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/20 mb-3 border-2 border-white ring-2 ring-blue-100">
                  02
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1.5">
                  {isAr ? 'تشخيص بونت لوك' : 'PontLook Diagnostic'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? 'استكشاف معمق: حجم الفئة، أسلوب التدريب (حضوري الرياض/دبي أو افتراضي)، والميزانية.'
                    : 'In-depth discovery: cohort sizing, delivery mode (onsite Riyadh/Dubai vs. virtual), budget.'}
                </p>
              </div>

              {/* Center Bridge (Elevated Card in Royal Blue #2451BF with White Text) */}
              <div className="md:col-span-2 lg:col-span-1 bg-[#2451BF] text-white rounded-2xl p-5 text-center flex flex-col items-center shadow-xl shadow-blue-600/25 scale-[1.03] border border-blue-400/50 relative">
                <div className="mb-2 px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-extrabold uppercase tracking-wider text-blue-100 border border-white/20">
                  {isAr ? 'المرحلة 03 · الجسر الأساسي' : 'STEP 03 · CORE BRIDGE'}
                </div>
                <div className="w-9 h-9 rounded-full bg-white text-blue-600 flex items-center justify-center mb-2 shadow-sm">
                  <Zap size={16} className="fill-blue-600 text-blue-600" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1.5 leading-snug">
                  {isAr ? 'توفيق بونت لوك الذكي' : 'PontLook Matchmaking'}
                </h4>
                <p className="text-xs text-blue-100/90 leading-relaxed">
                  {isAr
                    ? 'ربط مباشر بـ 2 إلى 3 مزودين معتمدين خصيصاً للمتطلبات والميزانية خلال 48 ساعة.'
                    : 'Curated connection to 2–3 verified providers tailored to skill gap & budget within 48h.'}
                </p>
              </div>

              {/* Stage 4 */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 text-center flex flex-col items-center hover:bg-white hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/20 mb-3 border-2 border-white ring-2 ring-blue-100">
                  04
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1.5">
                  {isAr ? 'تنفيذ تدريبي مخصص' : 'Tailored Delivery'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? 'تقديم مناهج تدريبية مخصصة من قبل ميسرين ومدربين معتمدين في المنطقة.'
                    : 'Custom curriculum execution by accredited regional facilitators.'}
                </p>
              </div>

              {/* Stage 5 */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 text-center flex flex-col items-center hover:bg-white hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-emerald-500/20 mb-3 border-2 border-white ring-2 ring-emerald-100">
                  05
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1.5">
                  {isAr ? 'إغلاق فجوة المهارات' : 'Closed Skill Gap'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? 'رفع كفاءة الفريق، تقييم ما بعد التدريب، وتأكيد العائد المؤسسي على الاستثمار.'
                    : 'Capability uplift, post-training evaluation, and confirmed organizational ROI.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FINAL DUAL-TRACK CONVERSION BLOCK (Dark Slate Container)
          ========================================================================= */}
      <section
        data-nav-light="true"
        className="bg-white py-12 sm:py-20 border-t border-slate-200/80 transition-colors"
      >
        <div className="container-site max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-b from-slate-900 to-[#0B0F19] text-white p-10 md:p-14 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Accents */}
            <div
              aria-hidden="true"
              className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#FF5B00]/10 rounded-full blur-3xl pointer-events-none"
            />

            <div className="relative z-10 text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 text-neutral-300 text-xs font-semibold tracking-wider uppercase mb-4">
                {isAr ? 'ابدأ مع بونت لوك' : 'GET STARTED WITH PONTLUX'}
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                {isAr
                  ? 'جاهز لتطوير رأس المال البشري بدقة؟'
                  : 'Ready for High-Precision Corporate Training?'}
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                {isAr
                  ? 'سواء كنت تبحث عن رفع كفاءة فريقك أو الشراكة كمزود تدريب معتمد، بونت لوك صُممت لتقديم أفضل النتائج.'
                  : 'Whether you are looking to upskill your workforce or partner as an accredited training provider, PontLook is built to deliver.'}
              </p>
            </div>

            {/* Dual Action Split Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-3xl mx-auto">
              {/* Box A (Enterprises) */}
              <div className="bg-white/[0.04] border border-white/10 hover:border-blue-500/40 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md transition-all duration-200">
                <div className="mb-6">
                  <div className="inline-flex p-2.5 rounded-xl bg-blue-500/10 text-blue-400 mb-4">
                    <Building2 size={20} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {isAr ? 'تبحث عن تدريب وتطوير فريقك؟' : 'Looking to Upskill Your Workforce?'}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {isAr
                      ? 'احصل على ترشيح مع 2 إلى 3 خبراء تدريب معتمدين خلال أقل من 48 ساعة. مجاني 100%.'
                      : 'Get matched with 2–3 pre-vetted training specialists in under 48 hours. 100% free.'}
                  </p>
                </div>

                <Link
                  href={`/${lang}/find-training`}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-xl block text-center text-xs sm:text-sm shadow-md transition-all duration-200 active:scale-[0.98] group"
                >
                  <span>{isAr ? 'احصل على ترشيح (مجاناً) ←' : 'Get Matched (Free) →'}</span>
                </Link>
              </div>

              {/* Box B (Providers) */}
              <div className="bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md transition-all duration-200">
                <div className="mb-6">
                  <div className="inline-flex p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 mb-4">
                    <GraduationCap size={20} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {isAr ? 'هل أنت مزود تدريب معتمد؟' : 'Are You an Accredited Training Provider?'}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {isAr
                      ? 'انضم إلى شبكتنا المعتمدة للوصول إلى طلبات تدريبية مؤسسية مؤكدة بميزانيات معتمدة.'
                      : 'Join our vetted network to access verified corporate mandates with confirmed budgets.'}
                  </p>
                </div>

                <Link
                  href={`/${lang}/for-providers`}
                  className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-medium py-3 px-6 rounded-xl block text-center text-xs sm:text-sm shadow-sm transition-all duration-200 active:scale-[0.98] group"
                >
                  <span>{isAr ? 'انضم لشبكة المزودين ←' : 'Join Provider Network →'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
