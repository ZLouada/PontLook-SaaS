'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  XCircle,
  CheckCircle2,
  BadgeCheck,
  Handshake,
  ArrowRight,
  Sparkles,
  Building2,
  Users,
} from '@/components/icons';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import Signal from '@/components/shared/Signal';
import Magnetic from '@/components/shared/Magnetic';
import { spring, ease } from '@/lib/motion';

interface ComparisonToggleContentProps {
  lang?: 'en' | 'ar';
}

export default function ComparisonToggleContent({ lang = 'en' }: ComparisonToggleContentProps) {
  const isAr = lang === 'ar';
  const [mode, setMode] = useState<'pontlook' | 'traditional'>('pontlook');
  const prefersReducedMotion = useReducedMotion();

  const morph = { duration: 0.5, ease: ease.out };

  const views = {
    pontlook: {
      status: isAr ? 'منظومة بونت لوك المباشرة • نشطة' : 'PONTLOOK DIRECT PROTOCOL • ACTIVE',
      meta: 'GCC MATCH ENGINE',
      eyebrow: isAr ? 'من التشتت إلى الترابط' : 'FROM SCATTERED TO CONNECTED',
      heading: isAr
        ? 'منظومة متكاملة تعمل بتناغم تام.'
        : 'Everything working beautifully together.',
      body: isAr
        ? 'نشخص فجوة المهارات الدقيقة ونربط المنشأة بـ 2 إلى 3 خبراء معتمدين كحد أقصى مع ميزانيات مؤكدة. وداعاً للرسائل الباردة والمناقصات العشوائية.'
        : 'We diagnose the team’s exact skill gap and connect with 2 to 3 pre-vetted specialists with confirmed corporate budgets. No cold outreach, no bloated directories.',
      connected: true,
      chrome: {
        panelBorder: 'rgba(229,229,229,0.9)',
        panelBg: '#FFFFFF',
        pillBg: '#ECFDF5',
        pillBorder: '#A7F3D0',
        pillInk: '#065F46',
        dot: '#10B981',
        stageBorder: 'rgba(229,229,229,0.8)',
        stageBg: 'rgba(250,250,250,0.7)',
        rail: '#737373',
      },
      nodes: [
        {
          icon: Building2,
          label: isAr ? 'طلب مؤكد' : 'Enterprise Need',
          sub: isAr ? 'ميزانية معتمدة' : 'Verified Budget',
          border: '#A7F3D0',
          bg: '#FFFFFF',
          ink: '#059669',
          subInk: '#047857',
        },
        {
          icon: Signal,
          label: isAr ? 'محرك بونت لوك' : 'PontLook Engine',
          sub: isAr ? 'تشخيص ومطابقة' : 'Fit & SLA',
          border: '#0A0A0A',
          bg: '#FFFFFF',
          ink: '#0A0A0A',
          subInk: '#404040',
        },
        {
          icon: BadgeCheck,
          label: isAr ? '2-3 خبراء معتمدون' : '2-3 Providers',
          sub: isAr ? 'جاهزية التنفيذ' : 'Ready to Deliver',
          border: '#BFDBFE',
          bg: '#FFFFFF',
          ink: '#2563EB',
          subInk: '#1D4ED8',
        },
      ],
      points: [
        {
          icon: CheckCircle2,
          ink: '#059669',
          title: isAr ? 'طلب مؤسسي موثق' : 'Verified Demand',
          sub: isAr ? 'ميزانية معتمدة ومؤكدة' : 'Confirmed budget & intent',
        },
        {
          icon: CheckCircle2,
          ink: '#059669',
          title: isAr ? 'تقديم مباشر وفوري' : 'Direct Introduction',
          sub: isAr ? 'اجتماع مع صناع القرار' : 'CHRO calendar access',
        },
        {
          icon: CheckCircle2,
          ink: '#059669',
          title: isAr ? 'صفر احتكاك مالي' : 'Zero Risk SLA',
          sub: isAr ? 'دفع مقابل النتائج فقط' : '5-day replacement SLA',
        },
      ],
    },
    traditional: {
      status: isAr ? 'النموذج التقليدي • احتكاك عالي' : 'TRADITIONAL PROCUREMENT • HIGH FRICTION',
      meta: 'STATUS: HIGH WASTE',
      eyebrow: isAr ? 'تشتت وإرهاق إداري' : 'FRAGMENTED & OPAQUE',
      heading: isAr
        ? 'تشتت، غموض، وإرهاق إداري.'
        : 'Fragmented, opaque, and overwhelmed.',
      body: isAr
        ? 'تغرق فرق الموارد البشرية في كتالوجات غير مجدية، بينما يرسل مزودو التدريب مئات الرسائل الباردة بدون ردود أو بميزانيات وهمية.'
        : 'Weeks lost sifting through generic course catalogs, bombarded by cold sales emails, or hosting exploratory discovery calls with leads who lack approved budget.',
      connected: false,
      chrome: {
        panelBorder: 'rgba(254,202,202,0.8)',
        panelBg: 'rgba(254,242,242,0.3)',
        pillBg: '#FEE2E2',
        pillBorder: '#FECACA',
        pillInk: '#991B1B',
        dot: '#EF4444',
        stageBorder: 'rgba(254,202,202,0.7)',
        stageBg: '#FFFFFF',
        rail: '#FCA5A5',
      },
      nodes: [
        {
          icon: Users,
          label: isAr ? 'موارد بشرية مرهقة' : 'Overwhelmed HR',
          sub: isAr ? '100+ عرض مكرر' : 'Generic PDFs',
          border: '#FECACA',
          bg: 'rgba(254,242,242,0.5)',
          ink: '#EF4444',
          subInk: '#DC2626',
        },
        {
          icon: XCircle,
          label: isAr ? 'انفصال تام' : 'Broken Bridge',
          sub: isAr ? 'أسابيع ضائعة' : '4-8 Weeks Lost',
          border: '#FCA5A5',
          bg: 'rgba(254,242,242,0.7)',
          ink: '#EF4444',
          subInk: '#737373',
        },
        {
          icon: Handshake,
          label: isAr ? 'مزود تدريب محبط' : 'Struggling Firm',
          sub: isAr ? 'رسائل باردة مهدرة' : 'Cold Spam Outreach',
          border: '#FECACA',
          bg: 'rgba(254,242,242,0.5)',
          ink: '#EF4444',
          subInk: '#DC2626',
        },
      ],
      points: [
        {
          icon: XCircle,
          ink: '#EF4444',
          title: isAr ? 'تأخير في الاختيار' : 'Weeks Lost',
          sub: isAr ? 'شهور من المفاوضات' : 'Lengthy vendor searches',
        },
        {
          icon: XCircle,
          ink: '#EF4444',
          title: isAr ? 'فرص غير موثوقة' : 'Dead End Leads',
          sub: isAr ? 'غياب الميزانية والقرار' : 'No confirmed purchasing budget',
        },
        {
          icon: XCircle,
          ink: '#EF4444',
          title: isAr ? 'تدريب معلب وجاهز' : 'Off-the-Shelf Fits',
          sub: isAr ? 'عدم سد فجوة الكفاءة' : 'Fails to deliver actual ROI',
        },
      ],
    },
  } as const;

  const view = views[mode];

  const onToggleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    setMode((m) => (m === 'pontlook' ? 'traditional' : 'pontlook'));
  };

  return (
    <div className="container-site relative z-20 mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 max-w-5xl w-full flex flex-col justify-center">
      {/* Toggle Switch Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-2 sm:mb-2.5 space-y-1">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 text-[10px] sm:text-xs font-semibold uppercase tracking-wider font-sans">
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
          <span>{isAr ? 'المقارنة المباشرة' : 'THE COMPARISON ENGINE'}</span>
        </div>

        <h2
          id="comparison-title"
          className="text-base sm:text-xl lg:text-2xl font-semibold text-neutral-900 font-heading tracking-tight leading-tight"
        >
          {isAr
            ? 'كيف تعيد PontLook تعريف تدريب الشركات؟'
            : 'How PontLook Redefines Corporate Training'}
        </h2>

        <p className="hidden sm:block text-[11px] sm:text-xs text-neutral-600 font-sans leading-relaxed max-w-lg">
          {isAr
            ? 'اختر الطريقة للاطلاع على الفارق بين البحث التقليدي المرهق ومنظومة بونت لوك المؤكدة والمترابطة.'
            : 'Toggle between the two approaches to see the shift from traditional procurement friction to verified direct matching.'}
        </p>

        {/* Interactive Mode Toggle Pill */}
        <div
          role="tablist"
          aria-label={isAr ? 'المقارنة المباشرة' : 'THE COMPARISON ENGINE'}
          onKeyDown={onToggleKeyDown}
          className="pt-0.5 flex items-center p-0.5 rounded-full bg-neutral-100 border border-neutral-300 shadow-inner max-w-full"
        >
          <button
            type="button"
            role="tab"
            id="comparison-tab-pontlook"
            aria-selected={mode === 'pontlook'}
            aria-controls="comparison-panel"
            tabIndex={mode === 'pontlook' ? 0 : -1}
            onClick={() => setMode('pontlook')}
            className={`relative px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer ${
              mode === 'pontlook'
                ? 'text-white shadow-md'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {mode === 'pontlook' && (
              <m.div
                layoutId="comparison-active-pill"
                className="absolute inset-0 rounded-full bg-neutral-900 shadow-md shadow-neutral-900/25"
                transition={spring.soft}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Sparkles size={13} className={mode === 'pontlook' ? 'text-white' : 'text-neutral-500'} />
              <span>{isAr ? 'طريقة بونت لوك' : 'The PontLook Way'}</span>
            </span>
          </button>

          <button
            type="button"
            role="tab"
            id="comparison-tab-traditional"
            aria-selected={mode === 'traditional'}
            aria-controls="comparison-panel"
            tabIndex={mode === 'traditional' ? 0 : -1}
            onClick={() => setMode('traditional')}
            className={`relative px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer ${
              mode === 'traditional'
                ? 'text-white shadow-md'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {mode === 'traditional' && (
              <m.div
                layoutId="comparison-active-pill"
                className="absolute inset-0 rounded-full bg-red-600 shadow-md shadow-red-500/25"
                transition={spring.soft}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <XCircle size={13} className={mode === 'traditional' ? 'text-white' : 'text-neutral-500'} />
              <span>{isAr ? 'الطريقة التقليدية' : 'The Traditional Way'}</span>
            </span>
          </button>
        </div>
      </div>

      {/* Morphing Panel */}
      <m.div
        id="comparison-panel"
        role="tabpanel"
        aria-labelledby={`comparison-tab-${mode}`}
        animate={{ borderColor: view.chrome.panelBorder, backgroundColor: view.chrome.panelBg }}
        transition={morph}
        className="rounded-2xl sm:rounded-3xl border p-3 sm:p-4 lg:p-5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08),0_10px_25px_-5px_rgba(0,0,0,0.04)] relative overflow-hidden text-neutral-900"
      >
        {/* Window Header Bar */}
        <m.div
          animate={{ borderColor: view.chrome.pillBorder }}
          transition={morph}
          className="flex items-center justify-between pb-2 mb-2.5 sm:mb-3 border-b text-[11px] font-mono text-neutral-500"
        >
          <m.div
            animate={{
              backgroundColor: view.chrome.pillBg,
              borderColor: view.chrome.pillBorder,
              color: view.chrome.pillInk,
            }}
            transition={morph}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-semibold"
          >
            <m.span
              animate={{ backgroundColor: view.chrome.dot }}
              transition={morph}
              className={`w-1.5 h-1.5 rounded-full ${view.connected ? 'animate-pulse' : 'animate-ping'}`}
            />
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={`status-${mode}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {view.status}
              </m.span>
            </AnimatePresence>
          </m.div>

          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={`meta-${mode}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`text-[10px] hidden sm:inline font-mono ${view.connected ? 'text-neutral-400' : 'text-red-600/80'}`}
            >
              {view.meta}
            </m.span>
          </AnimatePresence>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-5 lg:min-h-[186px] flex flex-col items-start text-start">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={`copy-${mode}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.26, ease: ease.out }}
                className="flex flex-col items-start text-start space-y-2"
              >
                <m.div
                  animate={{
                    backgroundColor: view.chrome.pillBg,
                    borderColor: view.chrome.pillBorder,
                    color: view.chrome.pillInk,
                  }}
                  transition={morph}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] sm:text-[10px] font-bold uppercase tracking-wider"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${view.connected ? 'animate-pulse' : ''}`}
                    style={{ backgroundColor: view.chrome.dot }}
                  />
                  <span>{view.eyebrow}</span>
                </m.div>

                <h3 className="text-base sm:text-lg lg:text-xl font-heading font-semibold text-neutral-950 leading-tight">
                  {view.heading}
                </h3>

                <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                  {view.body}
                </p>

                <div className="pt-0.5 w-full sm:w-auto">
                  {view.connected ? (
                    <Magnetic strength={0.2} activeDistance={30} className="w-full sm:w-auto">
                      <Link
                        href={`/${lang}/find-training`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-xs shadow-md shadow-neutral-950/20 transition-all active:scale-95"
                      >
                        <span>{isAr ? 'ابدأ المطابقة الآن' : 'Find your match'}</span>
                        <ArrowRight size={13} className="rtl:-scale-x-100" />
                      </Link>
                    </Magnetic>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setMode('pontlook')}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-xs shadow-md shadow-neutral-950/20 transition-all active:scale-95 cursor-pointer"
                    >
                      <span>{isAr ? 'شاهد حل بونت لوك لهذا ←' : 'See how PontLook fixes this →'}</span>
                    </button>
                  )}
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Dynamic System Architecture */}
          <div className="lg:col-span-7">
            <m.div
              animate={{ borderColor: view.chrome.stageBorder, backgroundColor: view.chrome.stageBg }}
              transition={morph}
              className="rounded-xl sm:rounded-2xl border p-2 sm:p-3 shadow-xs space-y-2 font-sans"
            >
              {/* Three persistent node slots, wired by two live rails */}
              <div className="py-1.5 sm:py-2 px-0.5 sm:px-1">
                <div className="grid grid-cols-[1fr_14px_1fr_14px_1fr] sm:grid-cols-[1fr_28px_1fr_28px_1fr] items-center text-center">
                  {view.nodes.map((node, idx) => {
                    const Icon = node.icon;
                    const isHub = idx === 1;
                    return (
                      <React.Fragment key={`slot-${idx}`}>
                        {idx > 0 && (
                          <div className="relative h-[2px] w-full overflow-hidden" aria-hidden="true">
                            <m.div
                              animate={{ backgroundColor: view.chrome.rail }}
                              transition={morph}
                              className="absolute inset-0 rounded-full"
                            />
                            <m.div
                              animate={{ width: view.connected ? '0%' : '62%' }}
                              transition={morph}
                              className="absolute inset-y-0 left-1/2 -translate-x-1/2 bg-white"
                            />
                            {view.connected && !prefersReducedMotion && (
                              <m.div
                                className="absolute inset-y-0 w-1/2 rounded-full bg-neutral-900"
                                animate={{ x: ['-110%', '220%'] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                              />
                            )}
                          </div>
                        )}

                        <m.div
                          animate={{ borderColor: node.border, backgroundColor: node.bg }}
                          transition={morph}
                          className={`relative z-10 flex min-h-[58px] sm:min-h-[70px] flex-col items-center justify-center space-y-0.5 ${
                            isHub
                              ? 'p-2 sm:p-3 rounded-xl border-2 shadow-sm'
                              : 'p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border shadow-xs'
                          }`}
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            <m.div
                              key={`node-${mode}-${idx}`}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.22, delay: idx * 0.06, ease: ease.out }}
                              className="flex flex-col items-center space-y-0.5"
                            >
                              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: node.ink }} />
                              <span className="text-[10px] sm:text-xs font-bold text-neutral-900 leading-tight">
                                {node.label}
                              </span>
                              <span
                                className="text-[8px] sm:text-[9.5px] font-medium leading-tight"
                                style={{ color: node.subInk }}
                              >
                                {node.sub}
                              </span>
                            </m.div>
                          </AnimatePresence>
                        </m.div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* 3 Summary Points */}
              <m.div
                animate={{ borderColor: view.chrome.stageBorder }}
                transition={morph}
                className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1.5 sm:pt-2 border-t text-xs"
              >
                {view.points.map((point, idx) => {
                  const PointIcon = point.icon;
                  return (
                    <div key={`point-${idx}`} className="flex flex-col sm:flex-row items-start gap-1 sm:gap-1.5 min-h-[34px]">
                      <AnimatePresence mode="wait" initial={false}>
                        <m.div
                          key={`point-${mode}-${idx}`}
                          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                          transition={{ duration: 0.22, delay: idx * 0.05 }}
                          className="shrink-0 mt-0.5"
                        >
                          <PointIcon size={11} style={{ color: point.ink }} />
                        </m.div>
                      </AnimatePresence>

                      <AnimatePresence mode="wait" initial={false}>
                        <m.div
                          key={`point-text-${mode}-${idx}`}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.22, delay: idx * 0.05, ease: ease.out }}
                        >
                          <span className="font-bold text-neutral-900 block text-[9px] sm:text-[11px] leading-tight">
                            {point.title}
                          </span>
                          <span className="text-[7.5px] sm:text-[9px] text-neutral-500 block leading-tight">
                            {point.sub}
                          </span>
                        </m.div>
                      </AnimatePresence>
                    </div>
                  );
                })}
              </m.div>
            </m.div>
          </div>
        </div>
      </m.div>
    </div>
  );
}
