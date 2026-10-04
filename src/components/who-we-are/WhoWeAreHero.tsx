'use client';

import React, { useRef, useState, useEffect } from 'react';
import { m, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  Globe,
  Handshake,
  Cpu,
  CheckCircle2,
  Sparkles,
  Target,
  Building2,
  TrendingUp,
} from '@/components/icons';
import Signal from '@/components/shared/Signal';
import Magnetic from '@/components/shared/Magnetic';
import WhoWeAreThreeBridge, { HudPinData } from './WhoWeAreThreeBridge';

interface WhoWeAreHeroProps {
  lang?: 'en' | 'ar';
}

export default function WhoWeAreHero({ lang = 'en' }: WhoWeAreHeroProps) {
  const isAr = lang === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hudPins, setHudPins] = useState<HudPinData[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);
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

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
  });

  const scrollToPhase = (targetFraction: number) => {
    if (containerRef.current) {
      const top = containerRef.current.offsetTop;
      const height = containerRef.current.offsetHeight;
      window.scrollTo({
        top: top + height * targetFraction,
        behavior: 'smooth',
      });
    }
  };

  const scrollToComparison = () => {
    const el = document.getElementById('comparison-engine') || document.getElementById('our-mission');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Phase Opacities
  const heroOpacity = Math.max(0, Math.min(1, 1 - scrollProgress * 3.2));

  let transformOpacity = 0;
  if (scrollProgress >= 0.28 && scrollProgress <= 0.65) {
    if (scrollProgress < 0.42) {
      transformOpacity = (scrollProgress - 0.28) / 0.14;
    } else if (scrollProgress > 0.54) {
      transformOpacity = 1 - (scrollProgress - 0.54) / 0.11;
    } else {
      transformOpacity = 1;
    }
  }

  const lightContentOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.58) / 0.24));

  const activePhase =
    scrollProgress < 0.32 ? 0 : scrollProgress < 0.64 ? 1 : 2;

  return (
    <section
      ref={containerRef}
      id="bridge-journey"
      data-nav-theme={scrollProgress > 0.55 ? 'light' : 'dark'}
      className="relative w-full h-[250vh] sm:h-[280vh] lg:h-[300vh] bg-[#07080A] select-none"
    >
      {/* STICKY VIEWPORT STAGE */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col justify-between">
        {/* Dynamic Dual-Tone Environmental Canvas Background */}
        <div
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, #07080A ${Math.round(
              (1 - scrollProgress) * 55
            )}%, #F8FAFC 100%)`,
          }}
          aria-hidden="true"
        />

        {/* Ambient Dark Atmospheric Glow (Top Hero) */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-sky-500/[0.04] rounded-full blur-[150px] pointer-events-none transition-opacity duration-500"
          style={{ opacity: heroOpacity }}
          aria-hidden="true"
        />

        {/* Minimal Technical Dot Grid for Light Mode */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: lightContentOpacity * 0.35,
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.08) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        {/* TRUE 3D THREE.JS FUTURISTIC SUSPENSION BRIDGE */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <WhoWeAreThreeBridge
            isAr={isAr}
            scrollProgress={scrollProgress}
            onHudUpdate={setHudPins}
            className="w-full h-full"
          />
        </div>

        {/* PINNED 3D HUD LEADER LINES & CALLOUTS (ATTACHED DIRECTLY TO THE 3D BRIDGE) */}
        {lightContentOpacity > 0.05 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
            {hudPins.map((pin) => {
              if (!pin.visible) return null;
              const isLeftAnchor = pin.id === 'hud-1' || pin.id === 'hud-2';
              const xOffset = isAr ? (isLeftAnchor ? 65 : -65) : (isLeftAnchor ? -65 : 65);
              const targetX = pin.x + xOffset;
              const targetY = pin.y + (isLeftAnchor ? 22 : -22);

              return (
                <g key={pin.id} opacity={lightContentOpacity} className="transition-opacity duration-300">
                  {/* Anchor Point on Bridge Deck */}
                  <circle cx={pin.x} cy={pin.y} r={3.5} fill="#00C2FF" />
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r={6.5}
                    fill="none"
                    stroke="#00C2FF"
                    strokeWidth={1}
                    opacity={0.7}
                  />

                  {/* Diagonal Leader Line */}
                  <polyline
                    points={`${pin.x},${pin.y} ${pin.x + xOffset * 0.35},${targetY} ${targetX},${targetY}`}
                    fill="none"
                    stroke="#64748B"
                    strokeWidth={1.2}
                    strokeDasharray="3 2"
                  />

                  {/* Pin Dot at Label End */}
                  <circle cx={targetX} cy={targetY} r={2} fill="#0F172A" />

                  {/* Clean Technical Label */}
                  <text
                    x={targetX + (isAr ? (isLeftAnchor ? 8 : -8) : (isLeftAnchor ? -8 : 8))}
                    y={targetY + 3.5}
                    fill="#0F172A"
                    fontSize={10}
                    fontFamily="monospace"
                    fontWeight={700}
                    textAnchor={isAr ? (isLeftAnchor ? 'start' : 'end') : (isLeftAnchor ? 'end' : 'start')}
                    letterSpacing="0.08em"
                  >
                    {isAr ? pin.labelAr : pin.labelEn}
                  </text>
                </g>
              );
            })}
          </svg>
        )}

        {/* =========================================================================
            PHASE 1: THE DARK HERO (0.00 - 0.32)
            ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8 px-4 sm:px-6 lg:px-12 transition-opacity duration-300"
          style={{
            opacity: heroOpacity,
            pointerEvents: scrollProgress < 0.25 ? 'auto' : 'none',
          }}
        >
          {/* Top Hero Headline Block (Left-Aligned Clean Layout matching Video) */}
          <div className="container-site max-w-6xl mx-auto w-full flex flex-col items-start text-start">
            {/* Status Pill */}
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121318]/90 border border-[#26282D] hover:border-white/30 backdrop-blur-xl shadow-2xl transition-all max-w-[92vw]">
              <Signal />
              <span className="text-[11px] sm:text-xs font-medium text-neutral-300 truncate">
                <span
                  className="text-shimmer"
                  data-text={
                    isAr
                      ? 'منظومة التوفيق والربط المؤسسي · شفافية تامة 100%'
                      : 'Curated Matchmaking Architecture · 100% Transparent'
                  }
                >
                  {isAr
                    ? 'منظومة التوفيق والربط المؤسسي · شفافية تامة 100%'
                    : 'Curated Matchmaking Architecture · 100% Transparent'}
                </span>
              </span>
            </div>

            {/* Main Headline matching Video */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[58px] font-semibold text-white leading-[1.12] font-heading tracking-tight max-w-2xl">
              {isAr ? (
                <>
                  من نحن: <span className="text-white">جسر الكفاءات</span> إلى كبرى الفرص المؤسسية
                </>
              ) : (
                <>
                  Who We Are: <span className="text-white">Connecting Enterprise Demand</span> to Elite Training Providers
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="mt-3.5 sm:mt-5 text-xs xs:text-sm sm:text-base lg:text-lg text-neutral-400 max-w-xl font-normal leading-relaxed">
              {isAr
                ? 'بونت لوك هي المنصة الرائدة في الخليج لربط مديري الموارد البشرية بأفضل مزودي التدريب المعتمدين مع ميزانيات مؤكدة وبدون اشتراك شهري.'
                : 'PontLook is the Gulf’s premier B2B matchmaking engine, connecting corporate HR departments with pre-vetted training providers with confirmed budgets.'}
            </p>
          </div>

          {/* Bottom Hero Scroll Prompt */}
          <div className="relative z-20 flex justify-center mb-1">
            <button
              onClick={() => scrollToPhase(0.44)}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#111215]/85 hover:bg-[#16171B] border border-[#26282D] hover:border-neutral-500 text-xs text-neutral-300 hover:text-white shadow-xl backdrop-blur-xl transition-all active:scale-95 group cursor-pointer"
            >
              <Signal />
              <span className="font-medium">
                {isAr ? 'انتقل إلى رحلة التحول' : 'Scroll to Discover'}
              </span>
              <ArrowDown
                size={14}
                className="text-neutral-400 group-hover:text-white group-hover:translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* =========================================================================
            PHASE 2: THE TRANSFORMATION BEGINS (0.28 - 0.65)
            ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 transition-opacity duration-300"
          style={{
            opacity: transformOpacity,
            pointerEvents: scrollProgress >= 0.32 && scrollProgress <= 0.62 ? 'auto' : 'none',
          }}
        >
          <div className="max-w-2xl text-center backdrop-blur-xl bg-black/45 lg:bg-transparent p-6 rounded-3xl border border-white/10 lg:border-none shadow-2xl lg:shadow-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <Sparkles size={13} className="text-sky-400 animate-pulse" />
              <span>{isAr ? 'بداية التحول' : 'THE TRANSFORMATION BEGINS'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-white font-heading leading-tight tracking-tight">
              {isAr ? 'تدفق الكفاءة والفرص المؤكدة' : 'A Continuous Stream of Validated Opportunity'}
            </h2>

            <p className="mt-4 text-xs sm:text-sm lg:text-base text-neutral-300 leading-relaxed max-w-xl mx-auto font-sans">
              {isAr
                ? 'تعمل منصة بونت لوك كجسر ذكي يربط الاحتياجات التدريبية الحقيقية لدى المنشآت بمزودي الحلول الأكثر جدارة وكفاءة، محولة التعقيد والغموض إلى تدفق مباشر وشفاف.'
                : 'Our platform creates a continuous flow of validated competence and confirmed purchasing budgets, replacing cold outreach and RFP chaos with algorithmic precision.'}
            </p>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => scrollToPhase(0.85)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              >
                <span>{isAr ? 'استكشف رسالتنا ورؤيتنا' : 'Explore Our Mission & Vision'}</span>
                <ArrowDown size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PHASE 3: THE LIGHT INFORMATIONAL SECTION (0.60 - 1.0)
            OUR MISSION · OUR VISION · OUR IMPACT (MATCHING VIDEO FRAME 00:08)
            ========================================================================= */}
        <div
          id="our-mission"
          className="absolute inset-0 z-20 flex flex-col justify-between pt-16 sm:pt-20 lg:pt-22 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-12 transition-opacity duration-300 text-neutral-900 pointer-events-none"
          style={{
            opacity: lightContentOpacity,
            pointerEvents: scrollProgress > 0.65 ? 'auto' : 'none',
          }}
        >
          {/* Top Row: OUR MISSION (Left) & OUR VISION (Right) Flanking the Bridge */}
          <div className="container-site max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-2">
            {/* Left Top Block: OUR MISSION */}
            <div className="md:col-span-4 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                  <Target size={13} />
                </div>
                <h3 className="text-sm sm:text-base font-heading font-bold text-neutral-950 uppercase tracking-wide">
                  {isAr ? 'رسالتنا' : 'OUR MISSION'}
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-sans">
                {isAr
                  ? 'إنهاء التشتت والوقت الضائع في البحث عن التدريب المؤسسي عبر توجيه ميزانيات الشركات مباشرة إلى 2-3 خبراء معتمدين كحد أقصى.'
                  : 'Curated corporate training matchmaking that eliminates discovery friction and connects validated enterprises directly with pre-vetted specialists.'}
              </p>
            </div>

            <div className="md:col-span-4" />

            {/* Right Top Block: OUR VISION */}
            <div className="md:col-span-4 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                  <Building2 size={13} />
                </div>
                <h3 className="text-sm sm:text-base font-heading font-bold text-neutral-950 uppercase tracking-wide">
                  {isAr ? 'رؤيتنا' : 'OUR VISION'}
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-600 leading-relaxed font-sans">
                {isAr
                  ? 'بناء المنظومة الرقمية الأكثر موثوقية في المملكة والخليج لتطوير رأس المال البشري ودعم خطط التحول المؤسسي الكبرى.'
                  : 'We build the sovereign digital infrastructure powering corporate workforce transformation and executive learning across Saudi Arabia and the GCC.'}
              </p>
            </div>
          </div>

          {/* Bottom Row: OUR IMPACT (Center-Right) & Detailed Pillars (Left) */}
          <div className="container-site max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-end pb-2">
            {/* Lower Left Block: MISSION PILLARS */}
            <div className="md:col-span-5 bg-white/85 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider mb-2 font-mono">
                {isAr ? 'ركائز المنظومة المباشرة' : 'MATCHMAKING ARCHITECTURE'}
              </h4>
              <div className="space-y-1.5 text-[11px] text-neutral-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span>{isAr ? 'ميزانيات مؤسسية معتمدة ومؤكدة' : 'Confirmed enterprise budgets & verified intent'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span>{isAr ? 'ربط مباشر بصناع القرار في الموارد البشرية' : 'Direct introductions to verified CHROs'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span>{isAr ? 'بدون اشتراك شهري ولا مخاطرة مالية' : 'Zero monthly retainers, 100% SLA-backed'}</span>
                </div>
              </div>
            </div>

            {/* Lower Right Block: OUR IMPACT */}
            <div className="md:col-span-7 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                <div>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-neutral-950 uppercase tracking-tight">
                    {isAr ? 'أثرنا المؤسسي' : 'OUR IMPACT'}
                  </h3>
                  <div className="text-[10px] text-neutral-500 font-mono uppercase">
                    {isAr ? 'نتائج مؤكدة وملموسة' : 'MEASURABLE CERTAINTY'}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-center">
                  <div>
                    <div className="text-sm font-bold text-neutral-950">100%</div>
                    <div className="text-[9px] text-neutral-500 uppercase">{isAr ? 'ميزانية مؤكدة' : 'Verified'}</div>
                  </div>
                  <div className="w-[1px] h-6 bg-neutral-200" />
                  <div>
                    <div className="text-sm font-bold text-neutral-950">2 - 3</div>
                    <div className="text-[9px] text-neutral-500 uppercase">{isAr ? 'خبراء كحد أقصى' : 'Specialists'}</div>
                  </div>
                  <div className="w-[1px] h-6 bg-neutral-200" />
                  <div>
                    <div className="text-sm font-bold text-neutral-950">0 SAR</div>
                    <div className="text-[9px] text-neutral-500 uppercase">{isAr ? 'رسوم شهرية' : 'Retainer'}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-neutral-600 leading-relaxed font-sans">
                <p>
                  {isAr
                    ? 'نمنح المنشآت دقة اختيار غير مسبوقة، متجاوزين المناقصات العشوائية وفوضى المراسلات عبر فحص دقيق لاحتياج المهارات.'
                    : 'Enterprises receive precision matchmaking with 2-3 vetted firms capable of delivering exact outcomes within approved timelines.'}
                </p>
                <p>
                  {isAr
                    ? 'يحصل مزودو التدريب على فرص مؤهلة وجاهزة للإغلاق مع صناع القرار الفعليين، محققين نمواً سريعاً دون تكاليف تسويق باهظة.'
                    : 'Training providers gain high-intent qualified enterprise opportunities with verified budgets, eliminating cold outreach overhead.'}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex justify-end">
                <button
                  onClick={scrollToComparison}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <span>
                    {isAr
                      ? 'مقارنة طريقة بونت لوك بالطريقة التقليدية'
                      : 'Compare PontLook vs Traditional'}
                  </span>
                  <ArrowDown size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM CENTER PHASE INDICATOR PILLS (MATCHING VIDEO 00:00 - 00:04)
            ========================================================================= */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md shadow-lg pointer-events-auto">
          {[
            { id: 0, labelEn: '01 · Who We Are', labelAr: '٠١ · من نحن', target: 0.0 },
            { id: 1, labelEn: '02 · Transformation', labelAr: '٠٢ · التحول', target: 0.44 },
            { id: 2, labelEn: '03 · Mission & Impact', labelAr: '٠٣ · رسالتنا وأثرنا', target: 0.85 },
          ].map((phase, idx) => {
            const isActive = activePhase === idx;
            return (
              <button
                key={phase.id}
                onClick={() => scrollToPhase(phase.target)}
                aria-label={isAr ? phase.labelAr : phase.labelEn}
                className={`transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'w-10 sm:w-12 h-1.5 sm:h-2 bg-white shadow-xs'
                    : 'w-4 sm:w-6 h-1.5 sm:h-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
