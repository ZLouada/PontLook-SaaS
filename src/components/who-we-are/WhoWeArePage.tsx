'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import {
  Target,
  Zap,
  Handshake,
  ArrowRight,
  ArrowDown,
  Check,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  Building2,
  GraduationCap,
  TrendingUp,
  SlidersHorizontal,
} from 'lucide-react';
import type { Locale } from '@/i18n/config';

interface WhoWeArePageProps {
  lang?: Locale;
}

export default function WhoWeArePage({ lang = 'en' }: WhoWeArePageProps) {
  const isAr = lang === 'ar';
  const [comparisonMode, setComparisonMode] = useState<'pontlook' | 'traditional' | 'both'>('pontlook');

  const scrollToMission = () => {
    const el = document.getElementById('our-mission');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`w-full overflow-hidden ${isAr ? 'font-arabic' : 'font-sans'}`}>
      {/* =========================================================================
          SECTION 1: HERO — "Describe" (Dark Obsidian Canvas)
          ========================================================================= */}
      <section
        data-nav-dark="true"
        className="relative bg-[#080C14] text-white pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 lg:pb-32 overflow-hidden border-b border-white/[0.06]"
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
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 backdrop-blur-md shadow-inner mb-6 sm:mb-8 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2451BF]" />
            </span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-neutral-300">
              {isAr
                ? 'منظومة مطابقة التدريب المؤسسي المعتمد'
                : 'THE CORPORATE TRAINING MATCHMAKING PLATFORM'}
            </span>
          </m.div>

          {/* Main H1 Headline */}
          <m.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] max-w-4xl mx-auto mb-6"
          >
            {isAr
              ? 'جسركم المباشر نحو التدريب المؤسسي المعتمد والرؤى القابلة للتطبيق'
              : 'We Are Your Bridge to Enterprise Training and Actionable Insights'}
          </m.h1>

          {/* Sub-headline (Max 2 lines) */}
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
            className="text-base sm:text-lg lg:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed font-normal mb-10 sm:mb-12"
          >
            {isAr
              ? 'نشخص فجوات كفاءة الموظفين لدى مؤسسات الخليج، ثم نربطهم مباشرة بشركاء تدريب معتمدين جاهزين لتحقيق النتائج.'
              : 'We diagnose workforce capability gaps with GCC enterprises, then match them directly to pre-vetted training partners ready to deliver results.'}
          </m.p>

          {/* CTAs */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-14 sm:mb-20"
          >
            <Link
              href={`/${lang}/find-training`}
              className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm sm:text-base shadow-lg shadow-blue-600/25 transition-all duration-200 active:scale-[0.98] group"
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
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/10 hover:border-white/20 font-medium text-sm sm:text-base backdrop-blur-sm transition-all duration-200 active:scale-[0.98] group"
            >
              <span>{isAr ? 'استكشف آلية العمل' : 'Explore How It Works'}</span>
              <ArrowDown
                size={16}
                className="ms-2 text-neutral-400 group-hover:text-white group-hover:translate-y-0.5 transition-all duration-200"
              />
            </button>
          </m.div>

          {/* Key Signal Badges (Horizontal 3-column row) */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 text-start"
          >
            {/* Signal Badge 1 */}
            <div className="group relative bg-[#0F1420]/80 hover:bg-[#121927] border border-white/[0.08] hover:border-blue-500/40 p-4 sm:p-5 rounded-2xl backdrop-blur-sm transition-all duration-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                  <Target size={18} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm sm:text-base tracking-tight mb-1">
                    {isAr ? '🎯 طلب مؤسسي مشخص' : '🎯 Diagnosed Demand'}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {isAr
                      ? 'تحديات تدريبية محددة بدقة في السعودية والإمارات.'
                      : 'Pre-scoped workforce challenges across Saudi Arabia & UAE.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Signal Badge 2 */}
            <div className="group relative bg-[#0F1420]/80 hover:bg-[#121927] border border-white/[0.08] hover:border-blue-500/40 p-4 sm:p-5 rounded-2xl backdrop-blur-sm transition-all duration-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                  <Zap size={18} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm sm:text-base tracking-tight mb-1">
                    {isAr ? '⚡ توفيق مباشر ودقيق' : '⚡ Direct Matchmaking'}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {isAr
                      ? '2 إلى 3 خبراء معتمدين كحد أقصى لكل فرصة (بدون مزايدات).'
                      : '2 to 3 curated specialists per mandate (Zero bidding wars).'}
                  </p>
                </div>
              </div>
            </div>

            {/* Signal Badge 3 */}
            <div className="group relative bg-[#0F1420]/80 hover:bg-[#121927] border border-white/[0.08] hover:border-blue-500/40 p-4 sm:p-5 rounded-2xl backdrop-blur-sm transition-all duration-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Handshake size={18} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm sm:text-base tracking-tight mb-1">
                    {isAr ? '🤝 نتائج متوافقة' : '🤝 Aligned Outcomes'}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
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
          SECTION 2: MISSION & INTERACTIVE COMPARISON (White Canvas Transition)
          ========================================================================= */}
      <section
        id="our-mission"
        data-nav-light="true"
        className="relative bg-white text-[#0F172A] py-20 sm:py-28 lg:py-32 transition-colors duration-500"
      >
        <div className="container-site max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-4">
              <Sparkles size={12} className="text-blue-600" />
              <span>{isAr ? 'مهمتنا' : 'OUR MISSION'}</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight mb-4">
              {isAr
                ? 'استبدال تعقيدات الشراء بشراكات تدريبية دقيقة'
                : 'Replacing Procurement Friction with Precision Partnerships'}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {isAr
                ? 'إنهاء أسابيع من تخمين الموارد البشرية ووقف رسائل التواصل الباردة لمزودي التدريب.'
                : 'Eliminating weeks of HR guesswork and ending cold outreach for providers.'}
            </p>
          </div>

          {/* Interactive View Switcher (Segmented Control) */}
          <div className="flex flex-col items-center mb-10 sm:mb-12">
            <div className="p-1.5 bg-slate-100/90 border border-slate-200 rounded-2xl flex items-center gap-1 shadow-xs max-w-full overflow-x-auto">
              {/* PontLook Button */}
              <button
                type="button"
                onClick={() => setComparisonMode('pontlook')}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 shrink-0 ${
                  comparisonMode === 'pontlook'
                    ? 'bg-white text-emerald-800 shadow-sm border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <CheckCircle2
                  size={15}
                  className={comparisonMode === 'pontlook' ? 'text-emerald-600' : 'text-slate-400'}
                />
                <span>{isAr ? 'طريقة بونت لوك' : 'The PontLook Way'}</span>
              </button>

              {/* Traditional Button */}
              <button
                type="button"
                onClick={() => setComparisonMode('traditional')}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 shrink-0 ${
                  comparisonMode === 'traditional'
                    ? 'bg-white text-red-800 shadow-sm border border-red-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <XCircle
                  size={15}
                  className={comparisonMode === 'traditional' ? 'text-red-500' : 'text-slate-400'}
                />
                <span>{isAr ? 'الطريقة التقليدية' : 'The Traditional Way'}</span>
              </button>

              {/* Compare Side-by-Side (Desktop Option) */}
              <button
                type="button"
                onClick={() => setComparisonMode('both')}
                className={`hidden lg:flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 ${
                  comparisonMode === 'both'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <SlidersHorizontal size={14} className="text-slate-500" />
                <span>{isAr ? 'مقارنة جنباً إلى جنب' : 'Side-by-Side'}</span>
              </button>
            </div>
          </div>

          {/* Cards Content */}
          <div className="w-full">
            <div
              className={`grid gap-6 transition-all duration-300 ${
                comparisonMode === 'both'
                  ? 'grid-cols-1 lg:grid-cols-2'
                  : 'grid-cols-1 max-w-2xl mx-auto'
              }`}
            >
              {/* THE PONTLOOK WAY (Green / Emerald Accent) */}
              {(comparisonMode === 'pontlook' || comparisonMode === 'both') && (
                <m.div
                  key="pontlook-card"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-2 border-emerald-500/25 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-emerald-500/[0.04] relative overflow-hidden"
                >
                  {/* Subtle top glow bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500" />

                  {/* Header Badge */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-tight">
                      <Check size={13} className="text-emerald-600 stroke-[3]" />
                      <span>{isAr ? '✓ موثوق ومباشر · صفر تخمين' : '✓ Verified & Direct · Zero Guesswork'}</span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                      PontLook
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-6">
                    {isAr
                      ? 'التوفيق الموجه بالتشخيص'
                      : 'Curated Precision & Zero Friction'}
                  </h3>

                  <ul className="space-y-5 text-start">
                    {/* Point 1 */}
                    <li className="flex items-start gap-3.5">
                      <div className="mt-0.5 p-1 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                        <Check size={14} className="stroke-[3]" />
                      </div>
                      <div>
                        <strong className="block text-sm sm:text-base font-semibold text-slate-900">
                          {isAr ? 'تشخيص دقيق قبل التوفيق' : 'Diagnosed Before Matching'}
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                          {isAr
                            ? 'تحديد فجوات المهارات واحتياجات الفئات المستهدفة مع الموارد البشرية قبل أي خطوة.'
                            : 'Exact skill gaps and cohort constraints identified with HR before outreach.'}
                        </p>
                      </div>
                    </li>

                    {/* Point 2 */}
                    <li className="flex items-start gap-3.5">
                      <div className="mt-0.5 p-1 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                        <Check size={14} className="stroke-[3]" />
                      </div>
                      <div>
                        <strong className="block text-sm sm:text-base font-semibold text-slate-900">
                          {isAr ? 'نخبة من المتخصصين المعتمدين' : 'Curated Proven Specialists'}
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                          {isAr
                            ? 'تجاوز العروض التسويقية؛ قارن بين 2-3 مزودين مؤهلين خصيصاً للمهمة.'
                            : 'Skip sales pitches; evaluate 2–3 vetted providers tailored to the mandate.'}
                        </p>
                      </div>
                    </li>

                    {/* Point 3 */}
                    <li className="flex items-start gap-3.5">
                      <div className="mt-0.5 p-1 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                        <Check size={14} className="stroke-[3]" />
                      </div>
                      <div>
                        <strong className="block text-sm sm:text-base font-semibold text-slate-900">
                          {isAr ? 'تعاقدات جاهزة للتنفيذ' : 'Ready-to-Deliver Engagements'}
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                          {isAr
                            ? 'متطلبات واضحة بميزانيات معتمدة ليركز المدربون 100% على جودة التدريب.'
                            : 'Pre-scoped, budget-approved briefs so facilitators focus 100% on training.'}
                        </p>
                      </div>
                    </li>
                  </ul>
                </m.div>
              )}

              {/* THE TRADITIONAL WAY (Red / Problem Accent) */}
              {(comparisonMode === 'traditional' || comparisonMode === 'both') && (
                <m.div
                  key="traditional-card"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#FAFAFA] border-2 border-red-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg shadow-red-500/[0.02] relative overflow-hidden"
                >
                  {/* Subtle top red bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-rose-400 to-amber-500" />

                  {/* Header Badge */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-bold tracking-tight">
                      <AlertCircle size={13} className="text-red-600" />
                      <span>{isAr ? '⚠️ أسابيع ضائعة · احتكاك مرتفع' : '⚠️ Weeks Lost · High Friction'}</span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                      Traditional
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-6">
                    {isAr
                      ? 'البحث اليدوي والإعلانات الباردة'
                      : 'Guesswork & Cold Outreach Chaos'}
                  </h3>

                  <ul className="space-y-5 text-start">
                    {/* Point 1 */}
                    <li className="flex items-start gap-3.5">
                      <div className="mt-0.5 p-1 rounded-full bg-red-100 text-red-700 shrink-0">
                        <XCircle size={14} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <strong className="block text-sm sm:text-base font-semibold text-slate-900">
                          {isAr ? 'بحث لانهائي ورسائل باردة' : 'Endless Searching & Cold Spam'}
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                          {isAr
                            ? 'تيه الموارد البشرية في أدلة عشوائية، وتواصل المزودين عبر رسائل باردة غير مقروءة.'
                            : 'HR sifting through generic directories; providers blasting unread cold emails.'}
                        </p>
                      </div>
                    </li>

                    {/* Point 2 */}
                    <li className="flex items-start gap-3.5">
                      <div className="mt-0.5 p-1 rounded-full bg-red-100 text-red-700 shrink-0">
                        <XCircle size={14} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <strong className="block text-sm sm:text-base font-semibold text-slate-900">
                          {isAr ? 'احتياجات مبهمة ودورات غير ملائمة' : 'Vague Needs & Misaligned Courses'}
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                          {isAr
                            ? 'شراء برامج جاهزة دون تشخيص الفجوات المهارية الحقيقية للمؤسسة.'
                            : 'Off-the-shelf courses bought without diagnosing actual skill gaps.'}
                        </p>
                      </div>
                    </li>

                    {/* Point 3 */}
                    <li className="flex items-start gap-3.5">
                      <div className="mt-0.5 p-1 rounded-full bg-red-100 text-red-700 shrink-0">
                        <XCircle size={14} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <strong className="block text-sm sm:text-base font-semibold text-slate-900">
                          {isAr ? 'جلسات استكشاف غير مجدية' : 'Unpaid Discovery & Dead Ends'}
                        </strong>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                          {isAr
                            ? 'إهدار ساعات التدريب على اجتماعات أولية لفرص تفتقر للميزانية أو القرار.'
                            : 'Training firms burning hours on exploratory calls with leads lacking budget or authority.'}
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
          SECTION 3: "Show Your Adding Benefits" — BILATERAL VALUE MODEL
          ========================================================================= */}
      <section
        data-nav-light="true"
        className="relative bg-slate-50 text-[#0F172A] py-20 sm:py-28 border-y border-slate-200/80 transition-colors"
      >
        <div className="container-site max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 text-slate-800 text-xs font-semibold tracking-wider uppercase mb-4">
              <span>{isAr ? 'مواءمة النموذج والقيمة' : 'MARKETPLACE ALIGNMENT'}</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight mb-4">
              {isAr
                ? 'مجاني بالكامل للمؤسسات. متوافق مع نتائج المزودين.'
                : 'Complimentary for Companies. Aligned on Results with Providers.'}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {isAr
                ? 'لا ننجح إلا عند تأسيس شراكة تدريبية مؤسسية عالية الأثر.'
                : 'We only succeed when a high-impact corporate partnership is formed.'}
            </p>
          </div>

          {/* 3 Benefit Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: Enterprise Clients */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60">
                    {isAr ? 'الشركات والمؤسسات' : 'ENTERPRISE CLIENTS'}
                  </span>
                  <Building2 size={18} className="text-blue-600" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-3">
                  {isAr ? 'مجاني 100% للمؤسسات' : '100% Free for Enterprises'}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {isAr
                    ? 'تشخيص مجاني لفجوات المهارات، مراجعة العروض، وتوفيق مباشر مع الشركاء بدون أي رسوم للمنصة.'
                    : 'Free skill gap diagnosis, proposal review, and direct partner matching with zero platform fees.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="inline-flex items-center text-xs font-semibold text-blue-700 bg-blue-50/70 px-2.5 py-1 rounded-md">
                  {isAr ? 'بدون اشتراكات · بدون رسوم خفية' : 'No Subscriptions · No Hidden Fees'}
                </span>
              </div>
            </div>

            {/* Card 2: Training Providers */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    {isAr ? 'مزودو التدريب' : 'TRAINING PROVIDERS'}
                  </span>
                  <GraduationCap size={18} className="text-emerald-600" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-3">
                  {isAr ? 'قائم على النجاح فقط' : 'Success-Based Only'}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {isAr
                    ? 'لا رسوم تسجيل مسبقة، ولا رسوم إدراج أو مزايدات. الاستثمار فقط عند تأكيد التعاقد النهائي.'
                    : 'No upfront retainers, listing fees, or bidding tokens. Invest only when a verified contract is confirmed.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50/70 px-2.5 py-1 rounded-md">
                  {isAr ? 'بدون دفعات مسبقة · مرتبط بالأداء' : 'Zero Retainers · Performance Aligned'}
                </span>
              </div>
            </div>

            {/* Card 3: Aligned Outcomes */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60">
                    {isAr ? 'شراكات عالية الجودة' : 'HIGH-FIT OUTCOMES'}
                  </span>
                  <TrendingUp size={18} className="text-amber-600" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-3">
                  {isAr ? 'حوافز متوافقة 100%' : 'Aligned Incentives'}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {isAr
                    ? 'لا نتاجر ببيانات الاتصال ولا بأعداد العملاء المحتملين. تركيزنا حصري على الفرص الجادة والمؤهلة.'
                    : 'We never monetize contact lists or lead volume. We focus solely on qualified, high-probability matches.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="inline-flex items-center text-xs font-semibold text-amber-800 bg-amber-50/70 px-2.5 py-1 rounded-md">
                  {isAr ? 'ميزانيات مؤكدة · صناع قرار فعليون' : 'Verified Budgets · Real Decision-Makers'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: "End-to-End" — TRAINING TRANSFORMATION ROADMAP
          ========================================================================= */}
      <section
        data-nav-light="true"
        className="relative bg-white text-[#0F172A] py-20 sm:py-28 lg:py-32 overflow-hidden transition-colors"
      >
        <div className="container-site max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold tracking-wider uppercase mb-4">
              <span>{isAr ? 'المسار الشامل' : 'THE END-TO-END PROCESS'}</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight mb-4">
              {isAr
                ? 'من تحدي الكفاءات المؤسسي إلى الأثر المقاس'
                : 'From Workforce Challenge to Measured Impact'}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {isAr
                ? 'كيف تلغي بونت لوك فترات الانتظار، وتعقيدات الشراء، والتخمين.'
                : 'How PontLook eliminates delays, procurement friction, and guesswork.'}
            </p>
          </div>

          {/* Connected Milestones Container */}
          <div className="relative">
            {/* Horizontal Connecting Line (Desktop) */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-200 via-blue-500 to-emerald-400 z-0"
            />

            {/* Desktop 5-Node Sequence (Step 01 -> Step 02 -> Central Bridge -> Step 03 -> Step 04) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 relative z-10">
              {/* Step 01 */}
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

              {/* Step 02 */}
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

              {/* Central Bridge: PontLook Matchmaking Engine */}
              <div className="md:col-span-2 lg:col-span-1 bg-gradient-to-b from-blue-600 to-[#1E3A8A] text-white rounded-2xl p-5 text-center flex flex-col items-center shadow-xl shadow-blue-600/20 scale-[1.02] border border-blue-400/40 relative">
                <div className="absolute -top-3 px-2.5 py-0.5 rounded-full bg-[#FF5B00] text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
                  {isAr ? 'خلال 48 ساعة' : 'Within 48h'}
                </div>
                <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center mb-3 shadow-sm">
                  <Zap size={18} className="fill-blue-600 text-blue-600" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1.5 leading-snug">
                  {isAr ? 'محرك التوفيق الذكي' : 'PontLook Matchmaking'}
                </h4>
                <p className="text-xs text-blue-100 leading-relaxed">
                  {isAr
                    ? 'ترشيح 2 إلى 3 خبراء معتمدين تم التحقق من جاهزيتهم.'
                    : '2–3 pre-vetted specialists shortlisted for the mandate.'}
                </p>
              </div>

              {/* Step 03 */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 text-center flex flex-col items-center hover:bg-white hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/20 mb-3 border-2 border-white ring-2 ring-blue-100">
                  03
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1.5">
                  {isAr ? 'تنفيذ تدريبي مخصص' : 'Tailored Delivery'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? 'تقديم محتوى مصمم بدقة من قبل ميسرين ومدربين معتمدين في المنطقة.'
                    : 'Custom curriculum execution by accredited regional facilitators.'}
                </p>
              </div>

              {/* Step 04 */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 text-center flex flex-col items-center hover:bg-white hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-emerald-500/20 mb-3 border-2 border-white ring-2 ring-emerald-100">
                  04
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1.5">
                  {isAr ? 'إغلاق فجوة المهارات' : 'Closed Skill Gap'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAr
                    ? 'رفع كفاءة الفريق، تقييم ما بعد التدريب، وتأكيد العائد على الاستثمار.'
                    : 'Capability uplift, post-training evaluation, and confirmed organizational ROI.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: MINIMALIST FINAL CTA
          ========================================================================= */}
      <section
        data-nav-light="true"
        className="bg-white py-16 sm:py-24 border-t border-slate-200/80 transition-colors"
      >
        <div className="container-site max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-slate-900 to-[#0A101D] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
            {/* Ambient Background Accents */}
            <div
              aria-hidden="true"
              className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#FF5B00]/10 rounded-full blur-3xl pointer-events-none"
            />

            <div className="relative z-10 text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 text-neutral-300 text-xs font-semibold tracking-wider uppercase mb-4">
                {isAr ? 'ابدأ الآن' : 'GET STARTED TODAY'}
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                {isAr
                  ? 'جاهز لتطوير رأس المال البشري بدقة؟'
                  : 'Ready for High-Precision Corporate Training?'}
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                {isAr
                  ? 'سواء كنت منشأة تبحث عن مزود تدريب معتمد أو جهة تدريب تبحث عن فرص مؤكدة، بونت لوك توفر لك المسار المباشر.'
                  : 'Whether you are an enterprise solving skill gaps or an accredited provider ready to deliver, PontLook is your direct bridge.'}
              </p>
            </div>

            {/* Dual Conversion Paths */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
              {/* Path 1: Enterprise */}
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
                      ? 'حدد احتياجك وتلقى 2 إلى 3 عروض مخصصة من شركاء تدريب معتمدين.'
                      : 'Define your mandate and receive 2-3 vetted proposals tailored to your budget.'}
                  </p>
                </div>

                <Link
                  href={`/${lang}/find-training`}
                  className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm shadow-md transition-all duration-200 active:scale-[0.98] group"
                >
                  <span>{isAr ? 'احصل على ترشيح (مجاناً)' : 'Get Matched (Free)'}</span>
                  <ArrowRight
                    size={15}
                    className={`ms-2 transition-transform duration-200 group-hover:translate-x-1 ${
                      isAr ? 'rotate-180 group-hover:-translate-x-1' : ''
                    }`}
                  />
                </Link>
              </div>

              {/* Path 2: Training Provider */}
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
                      ? 'انضم للشبكة واستقبل طلبات تدريبية مشخصة وميزانيات مؤكدة بدون رسوم اشتراك.'
                      : 'Join our vetted network to receive qualified corporate mandates with confirmed budgets.'}
                  </p>
                </div>

                <Link
                  href={`/${lang}/for-providers`}
                  className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/10 font-medium text-xs sm:text-sm shadow-sm transition-all duration-200 active:scale-[0.98] group"
                >
                  <span>{isAr ? 'انضم لشبكة المزودين' : 'Join Provider Network'}</span>
                  <ArrowRight
                    size={15}
                    className={`ms-2 transition-transform duration-200 group-hover:translate-x-1 ${
                      isAr ? 'rotate-180 group-hover:-translate-x-1' : ''
                    }`}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
