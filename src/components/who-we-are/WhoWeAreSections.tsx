'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import {
  XCircle,
  CheckCircle2,
  BadgeCheck,
  SlidersHorizontal,
  Handshake,
  GraduationCap,
  TrendingUp,
  Workflow,
  ArrowRight,
  ArrowLeft,
  X,
  Target,
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
} from '@/components/icons';
import { m, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Signal from '@/components/shared/Signal';
import TextReveal from '@/components/shared/TextReveal';
import CardTilt3D from '@/components/shared/CardTilt3D';
import Magnetic from '@/components/shared/Magnetic';
import BorderGlow from '@/components/shared/BorderGlow';
import { spring, ease, dur } from '@/lib/motion';

interface WhoWeAreProps {
  lang?: 'en' | 'ar';
}

/* ==========================================================================
   SECTION 1: THE INTERACTIVE COMPARISON TOGGLE (ECOMFLOW INSPIRATION)
   ========================================================================== */
export function ComparisonToggleSection({ lang = 'en' }: WhoWeAreProps) {
  const isAr = lang === 'ar';
  const [mode, setMode] = useState<'pontlook' | 'traditional'>('pontlook');
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Re-engineered Garage Shutter Roll-Down (top-to-bottom unroll, zero voids)
  // Kept deliberately brisk to eliminate the black void when scrolling
  const shutterPercent = useTransform(scrollYProgress, [0, 0.22], [100, 0]);
  const shutterClip = useTransform(shutterPercent, (p) => `inset(0% 0% ${p}% 0%)`);

  // Spring Pop-Up Content (settles quickly and cleanly)
  const contentOpacity = useTransform(scrollYProgress, [0.06, 0.22], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.06, 0.24], [0.96, 1]);
  const contentY = useTransform(scrollYProgress, [0.06, 0.24], [14, 0]);

  // Leading bottom rim line
  const lipY = useTransform(scrollYProgress, [0, 0.22], ['0%', '100%']);
  const lipOpacity = useTransform(scrollYProgress, [0.01, 0.05, 0.19, 0.23], [0, 1, 1, 0]);

  /* ----------------------------------------------------------------------
     One panel, two states. Every slot keeps its place and morphs where it
     stands, so toggling reads as the same system breaking and being repaired
     instead of two unrelated screenshots swapping out.
     ---------------------------------------------------------------------- */
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
    <section
      id="comparison-engine"
      ref={containerRef}
      data-nav-light="true"
      data-nav-theme="light"
      className="relative bg-[#FAFAFA] transition-colors duration-500 overflow-visible lg:h-[110vh] h-auto py-12 xs:py-16 sm:py-20 lg:py-0 border-t border-neutral-200 lg:border-t-0"
      aria-labelledby="comparison-title"
    >
      {/* Viewport Stage: Pinned during the garage door closure on desktop; natural layout on mobile */}
      <div className="relative lg:sticky top-0 w-full min-h-0 lg:min-h-[100dvh] h-auto lg:h-[100dvh] flex flex-col justify-center items-center z-20 overflow-visible lg:overflow-hidden bg-white lg:bg-transparent">
        
        {/* Background Underlayer: Crisp architectural aesthetic connecting seamlessly with WhoWeAreHero (Desktop only) */}
        <div
          className="hidden lg:block absolute inset-0 bg-[#FAFAFA] pointer-events-none"
          aria-hidden="true"
        >
          {/* Subtle light technical dot grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.8) 1px, transparent 0)',
              backgroundSize: '36px 36px',
            }}
          />
        </div>

        {/* ================================================================
            THE GARAGE SHUTTER CURTAIN (Rolling down over the dark hero on desktop)
            ================================================================ */}
        <m.div
          style={
            prefersReducedMotion || !isDesktop
              ? { clipPath: 'none' }
              : { clipPath: shutterClip }
          }
          className="w-full relative lg:absolute inset-0 h-auto lg:h-full bg-white text-neutral-900 shadow-2xl flex flex-col justify-center items-center overflow-visible lg:overflow-hidden z-10 pt-4 sm:pt-6 lg:pt-20 pb-3 sm:pb-4"
        >
          {/* Architectural horizontal garage door shutter slats */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.70]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  to bottom,
                  transparent 0px,
                  transparent 38px,
                  rgba(0, 0, 0, 0.025) 38px,
                  rgba(0, 0, 0, 0.05) 39px,
                  transparent 40px
                )
              `,
            }}
            aria-hidden="true"
          />

          {/* Attio-Style Subtle Grid dots */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />

          {/* ================================================================
              SPRING POP-UP CONTENT INSIDE THE SHUTTER
              ================================================================ */}
          <m.div
            style={
              prefersReducedMotion || !isDesktop
                ? { transform: 'none', opacity: 1 }
                : {
                    scale: contentScale,
                    opacity: contentOpacity,
                    y: contentY,
                  }
            }
            className="container-site relative z-20 mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 max-w-5xl w-full flex flex-col justify-center"
          >
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

              {/* Interactive Mode Toggle Pill (Ecomflow Inspired) */}
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

            {/* ============================================================
                THE MORPHING PANEL
                A single console that re-colours, re-labels and physically
                re-wires itself in place when the mode flips — the bridge
                snaps apart for the traditional route and welds back for
                PontLook, so the difference is felt rather than read.
                ============================================================ */}
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

                {/* Left Column: Copy & Actions (crossfades, container holds its ground) */}
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

                {/* Right Column: The architecture re-wires itself in place */}
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
                                /* Rail: welded and pulsing when connected, severed when not */
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

                    {/* 3 Summary Points — the same three slots flip verdict */}
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
          </m.div>
        </m.div>

        {/* Shutter Leading Bottom Rim Line (Desktop only) */}
        <m.div
          style={
            prefersReducedMotion || !isDesktop
              ? { display: 'none' }
              : { top: lipY, opacity: lipOpacity }
          }
          className="hidden lg:block absolute left-0 right-0 h-[2px] bg-neutral-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-30 pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 2: LINEAR ISOMETRIC VALUE MODEL (LESS CONTENT, HIGH IMPACT)
   ========================================================================== */
export function ValueModelBilateral({ lang = 'en' }: WhoWeAreProps) {
  const isAr = lang === 'ar';

  const specs = [
    {
      code: 'SPEC // 01',
      title: isAr ? 'مجاني 100% للمؤسسات' : '100% Free for Buyers',
      desc: isAr
        ? 'وصول كامل إلى محرك التشخيص وقائمة الشركاء بدون أي اشتراكات أو عمولات خفية.'
        : 'Zero platform fees, retainers, or markups. Free requirements diagnosis and curated shortlist.',
      badge: isAr ? 'صفر تكلفة للمشتري' : 'Zero Buyer Cost',
      accent: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    },
    {
      code: 'SPEC // 02',
      title: isAr ? 'وصول تنفيذي مباشر' : 'Direct Executive Access',
      desc: isAr
        ? 'ربط مباشر مع مسؤولي الموارد البشرية والتدريب أصحاب الميزانيات وصلاحيات التعاقد المعتمدة.'
        : 'Direct connection to CHROs and L&D heads with pre-allocated corporate budgets.',
      badge: isAr ? 'صناع قرار معتمدون' : 'Verified Decision Makers',
      accent: 'border-blue-200 bg-blue-50 text-blue-800',
    },
    {
      code: 'SPEC // 03',
      title: isAr ? 'نموذج مبني على النتائج' : 'Success-Based Model',
      desc: isAr
        ? 'يدفع مزودو التدريب فقط عند استلام فرصة مؤكدة، مع ضمان استبدال فوري خلال 5 أيام.'
        : 'Providers only invest on verified introductions. 100% 5-day replacement SLA guarantee.',
      badge: isAr ? 'استثمار مرتبط بالنتيجة' : 'Zero Retainer Risk',
      accent: 'border-amber-200 bg-amber-50 text-amber-800',
    },
    {
      code: 'SPEC // 04',
      title: isAr ? 'دقة الاختيار (2 إلى 3 كحد أقصى)' : 'Curated Precision (2 to 3 Max)',
      desc: isAr
        ? 'نطرح 2 إلى 3 مزودين فقط لكل متطلب، لمنع حرب الأسعار وضمان المنافسة على الجودة.'
        : 'Introductions capped at 2 to 3 per mandate. Providers compete on merit, not price wars.',
      badge: isAr ? 'الدقة فوق الكمية' : 'Merit Over Volume',
      accent: 'border-purple-200 bg-purple-50 text-purple-800',
    },
  ];

  return (
    <section
      id="value-model"
      data-nav-light="true"
      data-nav-theme="light"
      className="relative bg-white text-neutral-900 py-12 xs:py-16 sm:py-20 lg:py-24 border-t border-neutral-200 overflow-hidden"
      aria-labelledby="value-model-title"
    >
      <div className="container-site relative z-10 mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 xs:mb-12 sm:mb-16 space-y-2 xs:space-y-3">
          <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 text-[10px] xs:text-xs font-semibold uppercase tracking-wider font-sans">
            <ShieldCheck size={14} className="text-blue-600 shrink-0" />
            <span>{isAr ? 'هيكلية النموذج التجاري' : 'BILATERAL VALUE ARCHITECTURE'}</span>
          </div>

          <h2
            id="value-model-title"
            className="text-xl xs:text-2xl sm:text-4xl lg:text-[42px] font-semibold text-neutral-950 font-heading tracking-tight leading-[1.18]"
          >
            {isAr
              ? 'مواءمة ثنائية متكافئة. بدون أي رسوم اشتراك.'
              : 'Bilateral Alignment. Zero Platform Friction.'}
          </h2>

          <p className="text-xs xs:text-sm sm:text-base text-neutral-600 font-sans leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'نموذج صُمم لتكافؤ المصالح: مجاني للمؤسسات والشركات، ومبني على النتائج لمزودي التدريب.'
              : 'A bilateral model engineered for alignment: free for corporate buyers, success-based for accredited training providers.'}
          </p>
        </div>

        {/* 4 Technical Architecture Specs (White Pop-up Cards in 2-col mobile / 4-col desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-2.5 sm:gap-5 items-stretch">
          {specs.map((item, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, scale: 0.92, y: 28 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', damping: 22, stiffness: 300, delay: idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="rounded-xl sm:rounded-2xl border border-neutral-200/90 hover:border-neutral-400 bg-white p-2.5 xs:p-3.5 sm:p-6 flex flex-col justify-between shadow-[0_10px_30px_-5px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_-8px_rgba(0,0,0,0.12)] text-neutral-900 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-100/60 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-50/80 transition-colors" />
              
              <div className="space-y-1.5 xs:space-y-2 sm:space-y-3 font-sans relative z-10">
                <div className="flex items-center justify-between gap-1 flex-wrap">
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
                    {item.code}
                  </span>
                  <span className={`px-1.5 xs:px-2 sm:px-2.5 py-0.5 rounded-full text-[7.5px] xs:text-[8px] sm:text-[10px] font-semibold border ${item.accent}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-[11px] xs:text-xs sm:text-base font-heading font-semibold text-neutral-950 leading-snug group-hover:text-black transition-colors">
                  {item.title}
                </h3>

                <p className="text-[9px] xs:text-[10px] sm:text-xs text-neutral-600 font-sans leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 xs:pt-3 sm:pt-4 mt-2 xs:mt-3 sm:mt-4 border-t border-neutral-100 flex items-center justify-between text-[8px] xs:text-[9px] sm:text-[11px] text-neutral-500 font-mono relative z-10">
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="truncate">PROTOCOL</span>
                </span>
                <span className="text-neutral-900 font-bold tracking-wider">VERIFIED</span>
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}



/* ==========================================================================
   SECTION 4: THE END TO END TRAINING JOURNEY (UNIFIED TIMELINE)
   ========================================================================== */
export function TrainingJourneyFlow({ lang = 'en' }: WhoWeAreProps) {
  const isAr = lang === 'ar';
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      category: isAr ? '01 / التشخيص' : '01 / DIAGNOSTIC',
      navTitle: isAr ? 'رصد وتشخيص الفجوة' : 'Enterprise Need',
      cardTitle: isAr ? 'تشخيص الفجوة' : 'Enterprise Need',
      cardBrief: isAr ? 'حصر الفجوات وتوثيق الميزانية' : 'Diagnose exact skill gaps & budget',
      title: isAr ? 'تشخيص فجوة المهارات وتوثيق الميزانية' : 'Enterprise Skill Gap & Diagnostic',
      desc: isAr
        ? 'تحدد إدارة الموارد البشرية عجزاً تشغيلياً أو قيادياً حرجاً. استيعاب دقيق: حجم المجموعات، طريقة التنفيذ، المتطلبات بالرياض ودبي، والميزانية.'
        : 'HR identifies a critical operational or leadership deficiency. Deep intake: cohort sizing, delivery mode, Riyadh/Dubai onsite requirements, approved budget.',
      tag: isAr ? 'تم التحقق من النطاق والميزانية' : 'Scope & Budget Verified',
      icon: SlidersHorizontal,
      points: [
        isAr ? 'حصر الفجوات التشغيلية والقيادية بالتعاون مع مسؤولي الموارد البشرية' : 'Deficiency Tagged: Operational and leadership gap analysis',
        isAr ? 'تحديد دقيق لأعداد الموظفين المستهدفين والمدن (الرياض، دبي، أو افتراضياً)' : 'Cohort Sizing: Onsite Riyadh, Dubai, or live-virtual delivery',
        isAr ? 'مواءمة الميزانية المعتمدة قبل طرح المتطلبات على المزودين' : 'Budget Confirmed: Pre-allocated budget and learning objectives',
      ],
    },
    {
      num: '02',
      category: isAr ? '02 / التوفيق' : '02 / MATCHMAKING',
      navTitle: isAr ? 'توفيق الخبراء' : 'Specialist Match',
      cardTitle: isAr ? 'توفيق الخبراء' : 'Specialist Match',
      cardBrief: isAr ? '2 إلى 3 عروض مفحوصة ومؤكدة' : '2 to 3 pre-vetted provider proposals',
      title: isAr ? 'توفيق دقيق ومختار (2 إلى 3 خبراء)' : 'Curated Specialist Matchmaking',
      desc: isAr
        ? 'فرز تحليلي وبشري يسلمك 2 إلى 3 خبراء معتمدين مع عروض متوافقة تماماً مع الميزانية. تتجاوز المؤسسة مكالمات المبيعات العشوائية وتقيّم الأنسب فوراً.'
        : 'Analyst-led curation delivering 2 to 3 vetted specialists with budget-aligned proposals. HR skips sales pitches and evaluates proven providers.',
      tag: isAr ? 'محرك بونت لوك المركزي' : 'PontLook Core Engine',
      icon: BadgeCheck,
      points: [
        isAr ? 'استلام 2 إلى 3 عروض مفصلة من نخبة مزودي التدريب المفحوصين' : '2 to 3 Curated Providers: Only elite approved providers evaluated',
        isAr ? 'تسعير شفاف وبنود واضحة متطابقة 100% مع الميزانية' : 'Budget Aligned Proposals: Clear pricing matched to approved budget',
        isAr ? 'درجة ثقة وملاءمة 98% مبنية على سجل تدريب مؤسسي موثق' : '98% Fit Confidence: Verified instructor credentials & past ratings',
      ],
    },
    {
      num: '03',
      category: isAr ? '03 / التنفيذ' : '03 / ROLLOUT',
      navTitle: isAr ? 'تنفيذ مخصص' : 'Tailored Rollout',
      cardTitle: isAr ? 'تنفيذ مخصص' : 'Tailored Rollout',
      cardBrief: isAr ? 'مواءمة المناهج وانطلاق التدريب' : 'Curriculum alignment & kickoff',
      title: isAr ? 'تنفيذ تدريبي مخصص وتأهيل المجموعات' : 'Tailored Delivery Execution',
      desc: isAr
        ? 'توقيع التعاقد، مواءمة المناهج التدريبية، وبدء المدربين والخبراء. يركز مزودو التدريب بنسبة 100% على تقديم أعلى جودة وتفاعل.'
        : 'Contract execution, tailored curriculum, and facilitator onboarding. Providers focus 100% of their energy on high-impact workshop delivery.',
      tag: isAr ? 'جاهزية الانطلاق' : 'Kickoff Ready',
      icon: GraduationCap,
      points: [
        isAr ? 'مواءمة المحتوى التدريبي مع حالات عملية واقعية من بيئة المنشأة' : 'Tailored Curriculum: Content customized to strategic skill gaps',
        isAr ? 'اجتماع تنسيق مباشر مع كبار المدربين والميسرين قبل انطلاق البرنامج' : 'Facilitator Onboarding: Direct alignment with master trainers',
        isAr ? 'جاهزية كاملة للمتدربين مع تأهيل رقمي وجداول حضور دقيقة' : 'Cohort Readiness: Seamless kickoff and digital onboarding',
      ],
    },
    {
      num: '04',
      category: isAr ? '04 / الأثر' : '04 / IMPACT',
      navTitle: isAr ? 'عائد موثق' : 'Measurable ROI',
      cardTitle: isAr ? 'عائد موثق' : 'Measurable ROI',
      cardBrief: isAr ? 'سد فجوة الكفاءة وقياس الأثر' : 'Capability uplift & executive ROI',
      title: isAr ? 'إغلاق فجوة المهارات وعائد استثماري ملموس' : 'Closed Skill Gap & Measurable ROI',
      desc: isAr
        ? 'ارتقاء ملموس بالكفاءات، تقييم موظفين دقيق، وعائد استثماري مستدام لإدارة الشركة. تم سد فجوة الكفاءة بنجاح.'
        : 'Measurable capability uplift, employee post evaluation, and sustained ROI delivered to executive leadership.',
      tag: isAr ? 'عائد استثماري موثق' : 'Verified ROI Capture',
      icon: TrendingUp,
      points: [
        isAr ? 'قياس كمي ودقيق لارتقاء كفاءات المتدربين مقارنة بالتقييم القبلي' : 'Measurable Uplift: Documented workforce competency boost',
        isAr ? 'تقارير أثر تفصيلية واستبانات رضا موثقة تُقدم للإدارة التنفيذية' : 'Post Evaluation: Data-driven assessments & feedback analytics',
        isAr ? 'عائد استثماري ملموس ومستدام يعزز إنتاجية المنشأة ويقلل الهدر' : 'Defensible ROI: Tangible business return delivered to C-suite',
      ],
    },
  ];

  const currentStep = steps[activeStep] || steps[0];

  return (
    <section
      id="training-journey"
      data-nav-light="true"
      data-nav-theme="light"
      className="relative bg-white text-neutral-900 py-12 xs:py-16 sm:py-24 border-t border-neutral-200 overflow-hidden"
      aria-labelledby="journey-title"
    >
      <div className="container-site relative z-10 mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 xs:mb-10 sm:mb-12 space-y-2 xs:space-y-3">
          <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 text-[10px] xs:text-xs font-semibold uppercase tracking-wider font-sans">
            <Workflow size={14} className="text-neutral-900 shrink-0" />
            <span>{isAr ? 'المراحل التشغيلية الأربع' : '4-STAGE OPERATIONAL ROADMAP'}</span>
          </div>

          <h2
            id="journey-title"
            className="text-xl xs:text-2xl sm:text-4xl font-semibold text-neutral-950 font-heading tracking-tight leading-tight"
          >
            {isAr
              ? 'رحلة التدريب من التشخيص حتى قياس الأثر'
              : 'The End to End Training Journey'}
          </h2>

          <p className="text-xs xs:text-sm sm:text-base text-neutral-600 font-sans leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'جسر شفاف وسلس يربط الاحتياج التدريبي المشخص بالحلول العملية ذات العائد الاستثماري القابل للقياس.'
              : 'A seamless, transparent bridge from diagnosed skill deficit to measurable business impact.'}
          </p>
        </div>

        {/* 4 Ecomflow-Inspired Stage Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-4 sm:mb-6 w-full">
          {steps.map((st, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`group relative text-start p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[105px] sm:min-h-[120px] ${
                  isActive
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-md shadow-neutral-900/15'
                    : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50/80 shadow-xs'
                }`}
              >
                <div>
                  <span className={`text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider block ${
                    isActive ? 'text-white/70' : 'text-neutral-400'
                  }`}>
                    {st.category}
                  </span>
                  <h4 className={`text-xs sm:text-sm font-heading font-bold mt-1 leading-snug ${
                    isActive ? 'text-white' : 'text-neutral-950'
                  }`}>
                    {st.cardTitle}
                  </h4>
                  <p className={`text-[10px] sm:text-[11px] font-sans mt-0.5 leading-tight line-clamp-2 ${
                    isActive ? 'text-white/80' : 'text-neutral-500'
                  }`}>
                    {st.cardBrief}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 mt-auto">
                  <ArrowRight
                    size={13}
                    className={`rtl:-scale-x-100 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 ${
                      isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-950'
                    }`}
                  />
                </div>

                {/* Connecting Arrow Notch pointing down to the active content below */}
                {isActive && (
                  <div
                    className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-t-neutral-900 z-20 hidden md:block"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail Panel (Ecomflow Connected Container) */}
        <AnimatePresence mode="wait">
          <m.div
            key={currentStep.num}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: ease.out }}
            className="rounded-2xl sm:rounded-3xl border border-neutral-200/90 bg-white p-4 sm:p-7 lg:p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06),0_10px_25px_-5px_rgba(0,0,0,0.03)] text-neutral-900 space-y-4 sm:space-y-6 relative overflow-hidden"
          >
            {/* Top Modal Window Header */}
            <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-neutral-100 text-xs font-mono text-neutral-500">
              <span className="text-[10px] sm:text-xs font-mono text-neutral-900 font-bold uppercase tracking-wider truncate">
                STAGE {currentStep.num} • {isAr ? 'المرحلة التشغيلية' : 'OPERATIONAL PROTOCOL'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                {currentStep.tag}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-start">
              <div className="lg:col-span-4 space-y-1 sm:space-y-1.5 text-start">
                <h3 className="text-base sm:text-xl font-heading font-semibold text-neutral-950 leading-snug">
                  {currentStep.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
                  {currentStep.desc}
                </p>
              </div>

              {/* 3 Deliverables */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-start">
                {currentStep.points.map((pt, pIdx) => (
                  <div key={pIdx} className="p-2.5 sm:p-3.5 rounded-xl bg-neutral-50/80 border border-neutral-200/80 hover:border-neutral-300 transition-colors space-y-1">
                    <div className="flex items-center gap-1.5 text-neutral-900 font-bold text-[11px] sm:text-xs">
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                      <span className="truncate">{isAr ? `معيار ${pIdx + 1}` : `Deliverable ${pIdx + 1}`}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-neutral-600 leading-relaxed font-sans">{pt}</p>
                  </div>
                ))}
              </div>
            </div>
          </m.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

/* ==========================================================================
   MASTER COMPOSITE EXPORT
   ========================================================================== */
export default function WhoWeAreSections({ lang = 'en' }: WhoWeAreProps) {
  return (
    <div data-nav-light="true" data-nav-theme="light">
      <ComparisonToggleSection lang={lang} />
      <ValueModelBilateral lang={lang} />
      <TrainingJourneyFlow lang={lang} />
    </div>
  );
}

