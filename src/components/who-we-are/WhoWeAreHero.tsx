'use client';

import React, { useRef, useState, useEffect } from 'react';
import { m, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Globe,
  Handshake,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Target,
  Building2,
} from '@/components/icons';
import Signal from '@/components/shared/Signal';
import TextReveal from '@/components/shared/TextReveal';
import Magnetic from '@/components/shared/Magnetic';
import WhoWeAreBridge3D, { HudPinData } from './WhoWeAreBridge3D';

interface WhoWeAreHeroProps {
  lang?: 'en' | 'ar';
}

export default function WhoWeAreHero({ lang = 'en' }: WhoWeAreHeroProps) {
  const isAr = lang === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Track scroll through the multi-phase bridge experience
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
  });

  // Smooth scroll helpers
  const scrollToTransformation = () => {
    if (containerRef.current) {
      const top = containerRef.current.offsetTop;
      const height = containerRef.current.offsetHeight;
      window.scrollTo({
        top: top + height * 0.42,
        behavior: 'smooth',
      });
    }
  };

  const scrollToMission = () => {
    if (containerRef.current) {
      const top = containerRef.current.offsetTop;
      const height = containerRef.current.offsetHeight;
      window.scrollTo({
        top: top + height * 0.82,
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

  // Phase opacity calculations
  // Phase 1 (Dark Hero): 0.0 -> 0.32
  const heroOpacity = Math.max(0, Math.min(1, 1 - scrollProgress * 3.3));

  // Phase 2 (Transformation): 0.30 -> 0.65
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

  // Phase 3 (Light Mission & Vision): 0.60 -> 1.0
  const lightContentOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.60) / 0.22));

  // Background interpolation: from dark #0A0B0D to pure #FFFFFF
  // Follows the rising horizon of the 3D bridge
  const bgDarkAlpha = Math.max(0, Math.min(1, 1 - scrollProgress * 1.5));
  const bgLightAlpha = Math.max(0, Math.min(1, scrollProgress * 1.6));

  return (
    <section
      ref={containerRef}
      id="bridge-journey"
      data-nav-theme={scrollProgress > 0.55 ? 'light' : 'dark'}
      className="relative w-full h-[250vh] sm:h-[280vh] lg:h-[300vh] bg-[#0A0B0D] select-none"
    >
      {/* STICKY VIEWPORT STAGE */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col justify-between">
        {/* Dynamic Dual-Tone Environmental Canvas Background */}
        <div
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, #0A0B0D ${Math.round((1 - scrollProgress) * 55)}%, #FFFFFF 100%)`,
          }}
          aria-hidden="true"
        />

        {/* Ambient Dark Atmospheric Glow (Top Hero) */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-sky-500/[0.05] rounded-full blur-[140px] pointer-events-none transition-opacity duration-500"
          style={{ opacity: heroOpacity }}
          aria-hidden="true"
        />

        {/* Tech Grid Watermark for Light Mode */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: lightContentOpacity * 0.45,
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.08) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        {/* 3D FUTURISTIC BRIDGE ENGINE */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <WhoWeAreBridge3D
            isAr={isAr}
            scrollProgress={scrollProgress}
            className="w-full h-full"
          />
        </div>

        {/* =========================================================================
            PHASE 1: THE DARK HERO OVERLAY (0.0 - 0.32)
            ========================================================================= */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8 px-4 sm:px-6 lg:px-12 transition-opacity duration-300"
          style={{
            opacity: heroOpacity,
            pointerEvents: scrollProgress < 0.25 ? 'auto' : 'none',
          }}
        >
          {/* Top Hero Headline Block */}
          <div className="container-site max-w-5xl mx-auto text-center flex flex-col items-center">
            {/* Status Signal Pill */}
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16171B]/90 border border-[#26282D] hover:border-white/30 backdrop-blur-xl shadow-2xl transition-all max-w-[92vw]">
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

            {/* Main Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[62px] font-semibold text-white leading-[1.12] font-heading tracking-tight max-w-4xl">
              {isAr ? (
                <>
                  من نحن: <span className="text-white">جسر الكفاءات</span> إلى كبرى الفرص المؤسسية
                </>
              ) : (
                <>
                  WHO WE ARE: <span className="text-white">Connecting Enterprise Demand</span> to Elite Training Providers
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="mt-3.5 sm:mt-5 text-xs xs:text-sm sm:text-base lg:text-lg text-neutral-400 max-w-2xl font-normal leading-relaxed">
              {isAr
                ? 'بونت لوك هي المنصة الرائدة في الخليج لربط مديري الموارد البشرية بأفضل مزودي التدريب المعتمدين مع ميزانيات مؤكدة وبدون اشتراك شهري.'
                : 'PontLook is the Gulf’s premier B2B matchmaking engine, connecting corporate HR departments with pre-vetted training providers with confirmed budgets.'}
            </p>
          </div>

          {/* Floating Holographic Glass HUD Badges (Desktop Only) */}
          {isDesktop && (
            <div className="absolute inset-0 pointer-events-none max-w-6xl mx-auto">
              {/* Top-Right Holographic Glass Card (Global Hub) */}
              <div
                className={`absolute top-28 ${
                  isAr ? 'left-6' : 'right-6'
                } p-3 rounded-2xl bg-[#12141A]/75 border border-sky-500/20 backdrop-blur-md shadow-2xl shadow-sky-950/30 flex items-center gap-3 transition-transform duration-700 hover:scale-105 pointer-events-auto`}
              >
                <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <Globe size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-sky-400">
                    {isAr ? 'الشبكة المعتمدة' : 'VERIFIED NETWORK'}
                  </div>
                  <div className="text-xs font-semibold text-white">
                    {isAr ? 'الرياض · دبي · العالمية' : 'Riyadh · Dubai · Global'}
                  </div>
                </div>
              </div>

              {/* Center-Right Holographic Glass Card (Deal Partnership) */}
              <div
                className={`absolute top-64 ${
                  isAr ? 'left-12' : 'right-12'
                } p-3 rounded-2xl bg-[#12141A]/75 border border-emerald-500/20 backdrop-blur-md shadow-2xl shadow-emerald-950/30 flex items-center gap-3 transition-transform duration-700 hover:scale-105 pointer-events-auto`}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <Handshake size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                    {isAr ? 'اتفاقية مستوى الخدمة' : 'GUARANTEED SLA'}
                  </div>
                  <div className="text-xs font-semibold text-white">
                    {isAr ? '2-3 عروض مؤهلة فقط' : '2-3 Vetted Specialists'}
                  </div>
                </div>
              </div>

              {/* Bottom-Left Holographic Terminal Badge */}
              <div
                className={`absolute bottom-28 ${
                  isAr ? 'right-8' : 'left-8'
                } p-3 rounded-2xl bg-[#12141A]/75 border border-white/10 backdrop-blur-md shadow-2xl flex items-center gap-3 pointer-events-auto`}
              >
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <Cpu size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    {isAr ? 'محرك المطابقة' : 'MATCH PROTOCOL'}
                  </div>
                  <div className="text-xs font-semibold text-white">
                    {isAr ? 'ربط مباشر وتوافق فوري' : 'Zero Friction Handshake'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Hero Scroll Prompt */}
          <div className="relative z-20 flex justify-center mb-1">
            <button
              onClick={scrollToTransformation}
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
          <div className="max-w-2xl text-center backdrop-blur-xl bg-black/40 lg:bg-transparent p-6 rounded-3xl border border-white/10 lg:border-none shadow-2xl lg:shadow-none">
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
                onClick={scrollToMission}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium text-white backdrop-blur-md transition-all active:scale-95"
              >
                <span>{isAr ? 'استكشف رسالتنا ورؤيتنا' : 'Explore Our Mission & Vision'}</span>
                <ArrowDown size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PHASE 3: THE LIGHT INFORMATIONAL SECTION (0.60 - 1.0)
            OUR MISSION · OUR VISION · OUR IMPACT
            ========================================================================= */}
        <div
          id="our-mission"
          className="absolute inset-0 z-20 flex flex-col justify-between pt-16 sm:pt-20 lg:pt-24 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-12 transition-opacity duration-300 text-neutral-900"
          style={{
            opacity: lightContentOpacity,
            pointerEvents: scrollProgress > 0.65 ? 'auto' : 'none',
          }}
        >
          {/* Top Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-800 text-[11px] sm:text-xs font-semibold uppercase tracking-wider font-sans mb-2 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
              <span>{isAr ? 'نموذج بونت لوك' : 'THE PONTLOOK PARADIGM'}</span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-neutral-950 font-heading tracking-tight leading-tight">
              {isAr ? 'بنية تحتية متطورة لربط تدريب الشركات' : 'Architecting the Future of Corporate Learning'}
            </h2>
          </div>

          {/* Flanking Cards: OUR MISSION (Left) & OUR VISION (Right) */}
          <div className="container-site max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 my-auto">
            {/* Left Card: OUR MISSION */}
            <div className="bg-white/90 backdrop-blur-md p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl border border-neutral-200/90 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] hover:border-neutral-400 transition-colors">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
                  <Target size={16} />
                </div>
                <h3 className="text-base sm:text-lg font-heading font-semibold text-neutral-950">
                  {isAr ? 'رسالتنا' : 'OUR MISSION'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans mb-3 sm:mb-4">
                {isAr
                  ? 'إنهاء التشتت والوقت الضائع في البحث عن التدريب المؤسسي عبر توجيه ميزانيات الشركات مباشرة إلى 2-3 خبراء معتمدين كحد أقصى.'
                  : 'Connecting corporate training demand with pre-vetted specialists with approved budgets, eliminating discovery friction and cold outreach.'}
              </p>
              <div className="space-y-1.5 text-[11px] sm:text-xs text-neutral-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span>{isAr ? 'ميزانيات مؤسسية معتمدة ومؤكدة' : 'Confirmed enterprise budgets & intent'}</span>
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

            {/* Right Card: OUR VISION */}
            <div className="bg-white/90 backdrop-blur-md p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl border border-neutral-200/90 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] hover:border-neutral-400 transition-colors">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
                  <Building2 size={16} />
                </div>
                <h3 className="text-base sm:text-lg font-heading font-semibold text-neutral-950">
                  {isAr ? 'رؤيتنا' : 'OUR VISION'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans mb-3 sm:mb-4">
                {isAr
                  ? 'بناء المنظومة الرقمية الأكثر موثوقية في المملكة والخليج لتطوير رأس المال البشري ودعم خطط التحول المؤسسي الكبرى.'
                  : 'To be the sovereign exchange infrastructure powering corporate workforce transformation and executive learning across Saudi Arabia and the GCC.'}
              </p>
              <div className="space-y-1.5 text-[11px] sm:text-xs text-neutral-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span>{isAr ? 'تغطية شاملة للأسواق السعودية والإماراتية' : 'Full GCC coverage (Saudi Arabia & UAE)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span>{isAr ? 'تدريب متخصص في الذكاء الاصطناعي والقيادة' : 'AI, Leadership, and Deep-Tech specialized paths'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span>{isAr ? 'مواءمة استراتيجية مع مستهدفات رؤية 2030' : 'Aligned with Vision 2030 national transformation'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card: OUR IMPACT METRICS & NEXT STEP CTA */}
          <div className="container-site max-w-4xl mx-auto w-full pt-1 pb-2">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-50/95 border border-neutral-300 p-3 sm:p-4 rounded-2xl shadow-xs">
              <div className="flex items-center gap-3 sm:gap-6 text-center sm:text-start">
                <div>
                  <div className="text-base sm:text-xl font-bold text-neutral-950">100%</div>
                  <div className="text-[10px] text-neutral-500 font-medium uppercase">
                    {isAr ? 'ميزانيات مؤكدة' : 'Verified Budgets'}
                  </div>
                </div>
                <div className="w-[1px] h-8 bg-neutral-300" />
                <div>
                  <div className="text-base sm:text-xl font-bold text-neutral-950">2 - 3</div>
                  <div className="text-[10px] text-neutral-500 font-medium uppercase">
                    {isAr ? 'خبراء كحد أقصى' : 'Specialists Max'}
                  </div>
                </div>
                <div className="w-[1px] h-8 bg-neutral-300" />
                <div>
                  <div className="text-base sm:text-xl font-bold text-neutral-950">0 SAR</div>
                  <div className="text-[10px] text-neutral-500 font-medium uppercase">
                    {isAr ? 'رسوم شهرية' : 'Monthly Retainer'}
                  </div>
                </div>
              </div>

              <Magnetic strength={0.2} activeDistance={30} className="w-full sm:w-auto">
                <button
                  onClick={scrollToComparison}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-xs shadow-md shadow-neutral-950/20 transition-all active:scale-95 cursor-pointer"
                >
                  <span>
                    {isAr
                      ? 'مقارنة طريقة بونت لوك بالطريقة التقليدية'
                      : 'Compare PontLook vs Traditional'}
                  </span>
                  <ArrowDown size={14} />
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
