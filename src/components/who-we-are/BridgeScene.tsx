'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { m, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useSceneProgress, SCENE_TIMELINE } from '@/hooks/useSceneProgress';
import BridgeMedia from './BridgeMedia';
import ParticleLayer from './ParticleLayer';
import Callout, { CalloutData } from './Callout';
import InfoCard from './InfoCard';
import StageProgress from './StageProgress';
import type { Locale } from '@/i18n/config';

interface BridgeSceneProps {
  lang?: Locale;
}

const CALLOUTS: CalloutData[] = [
  {
    id: 'c1',
    label: 'SMART MATCHING',
    labelAr: 'التوفيق الذكي',
    x: 38,
    y: 32,
    lineEndX: 0,
    lineEndY: 0,
    minBreakpoint: 'mobile',
  },
  {
    id: 'c2',
    label: 'GCC PROVIDER NETWORK',
    labelAr: 'شبكة مزودي الخليج',
    x: 74,
    y: 28,
    lineEndX: 0,
    lineEndY: 0,
    minBreakpoint: 'mobile',
  },
  {
    id: 'c3',
    label: 'VERIFIED OPPORTUNITY POOL',
    labelAr: 'فرص تدريبية مؤكدة',
    x: 52,
    y: 62,
    lineEndX: 0,
    lineEndY: 0,
    minBreakpoint: 'mobile',
  },
  {
    id: 'c4',
    label: 'DECISION-MAKER VALIDATION',
    labelAr: 'التحقق من صناع القرار',
    x: 25,
    y: 48,
    lineEndX: 0,
    lineEndY: 0,
    minBreakpoint: 'tablet',
  },
  {
    id: 'c5',
    label: 'BUSINESS PAIN VERIFICATION',
    labelAr: 'تشخيص الفجوات المهارية',
    x: 68,
    y: 50,
    lineEndX: 0,
    lineEndY: 0,
    minBreakpoint: 'desktop',
  },
  {
    id: 'c6',
    label: 'LEAD GRADING A/B/C',
    labelAr: 'تصنيف جودة الفرص A/B/C',
    x: 18,
    y: 72,
    lineEndX: 0,
    lineEndY: 0,
    minBreakpoint: 'desktop',
  },
];

export default function BridgeScene({ lang = 'en' }: BridgeSceneProps) {
  const isAr = lang === 'ar';
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    smoothProgress,
    currentStage,
    scrollToStage,
    isReducedMotion,
  } = useSceneProgress(containerRef);

  // 1. Camera / Bridge Zoom & Pan transformations
  // Push-in between 0.12 and 0.40, scale 1.0 -> 1.15, translate -4% x, +3% y
  const bridgeScale = useTransform(smoothProgress, [0, 0.12, 0.4, 0.55, 1], [1, 1, 1.15, 1.05, 1.05]);
  const bridgeX = useTransform(smoothProgress, [0, 0.12, 0.4, 0.7, 1], ['0%', '0%', '-4%', '0%', '0%']);
  const bridgeY = useTransform(smoothProgress, [0, 0.12, 0.4, 0.7, 1], ['0%', '0%', '3%', '0%', '0%']);

  // 2. Background Cross-fade: Dark (#0B0F14 / #212227) -> Mid Grey (#C8C9CB) -> Light (#F3F5F4)
  const bgDarkOpacity = useTransform(smoothProgress, [0.38, 0.52], [1, 0]);
  const bgLightOpacity = useTransform(smoothProgress, [0.42, 0.55], [0, 1]);

  // 3. Theme Progress for Bridge and Elements (0 = dark glow, 1 = light steel)
  const themeProgress = useTransform(smoothProgress, [0.4, 0.55], [0, 1]);

  // 4. Hero Content Fade Out (visible up to 0.12, fades out to 0 by 0.32)
  const heroOpacity = useTransform(smoothProgress, [0, 0.12, 0.3], [1, 1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.12, 0.3], [0, 0, -24]);
  const heroPointerEvents = useTransform(smoothProgress, (p) => (p > 0.3 ? 'none' : 'auto'));

  // 5. Scroll cue fade out early (p < 0.18)
  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.14, 0.2], [1, 1, 0]);

  // 6. Blueprint & Callouts Reveal (0.55 -> 0.70)
  const calloutsVisible = useTransform(smoothProgress, (p) => p >= 0.55);

  // 7. Info Cards Appearance:
  // Mission (0.68 -> 0.82)
  const missionOpacity = useTransform(smoothProgress, [0.65, 0.72], [0, 1]);
  const missionY = useTransform(smoothProgress, [0.65, 0.72], [24, 0]);

  // Vision (0.80 -> 0.90)
  const visionOpacity = useTransform(smoothProgress, [0.78, 0.85], [0, 1]);
  const visionY = useTransform(smoothProgress, [0.78, 0.85], [24, 0]);

  // Impact (0.88 -> 1.0)
  const impactOpacity = useTransform(smoothProgress, [0.88, 0.94], [0, 1]);
  const impactY = useTransform(smoothProgress, [0.88, 0.94], [24, 0]);

  // Dynamic nav theme sensor attribute
  const isNavLight = useTransform(smoothProgress, (p) => p >= 0.48);

  const scrollToStory = () => {
    const el = document.getElementById('our-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMethod = () => {
    const el = document.getElementById('our-method');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If reduced motion is requested, render static accessible layout
  if (isReducedMotion) {
    return (
      <section className="relative w-full bg-[#F3F5F4] text-[#0F172A] py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2451BF] mb-2 block">
              {isAr ? 'من نحن' : 'WHO WE ARE'}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#191D42] mb-4">
              {isAr ? 'من نحن' : 'Who We Are'}
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {isAr
                ? 'بونت لوك هي الجسر الرابط بين مزودي التدريب والشركات الخليجية التي لديها احتياجات تدريبية مؤكدة.'
                : 'Pontlook is the bridge between corporate training providers and GCC companies that already need training.'}
            </p>
          </div>

          <div className="w-full h-[450px] relative rounded-3xl overflow-hidden shadow-xl mb-16">
            <BridgeMedia progress={1} themeProgress={1} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              title={isAr ? 'مهمتنا' : 'OUR MISSION'}
              body={
                isAr
                  ? 'إزالة التخمين من التدريب المؤسسي في الخليج عبر توثيق الاحتياجات الحقيقية وربطها بالمزودين المناسبين.'
                  : 'To remove the guesswork from corporate training in the GCC. We verify real business needs and connect them with the right training providers, so every conversation starts with a company that is ready to act.'
              }
              isAr={isAr}
            />
            <InfoCard
              title={isAr ? 'رؤيتنا' : 'OUR VISION'}
              body={
                isAr
                  ? 'منطقة خليجية تجد فيها كل مؤسسة شريك التطوير المناسب بسرعة، ويفوز فيها مزودو التدريب بعقود قائمة على الثقة.'
                  : 'A GCC where every organisation finds the right development partner quickly, and every great training provider wins enterprise work through trust and relevance instead of cold outreach and referrals.'
              }
              isAr={isAr}
            />
            <InfoCard
              title={isAr ? 'أثرنا' : 'OUR IMPACT'}
              body={
                isAr
                  ? 'يحصل المزودون على فرص تدريبية مصنفة ويدفعون فقط لكل فرصة مؤهلة دون اشتراكات شهرية، وتحصل الشركات على شركاء معتمدين.'
                  : 'Providers get qualified, graded opportunities and pay only per qualified lead, with no retainers. Companies get matched, vetted partners for their real challenges, from leadership and AI adoption to compliance and Saudization.'
              }
              tagline={isAr ? 'طلب مؤكد. شركاء ملائمون.' : 'Verified demand. Right-fit partners.'}
              ctaText={isAr ? 'استكشف منهجيتنا ←' : 'Explore our approach →'}
              onCtaClick={scrollToMethod}
              isAr={isAr}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[450vh] transition-colors"
      data-nav-dark="true"
    >
      {/* Dynamic Nav Theme Beacon for the Global Navbar */}
      <m.div
        data-nav-light={isNavLight.get() ? 'true' : undefined}
        className="sr-only"
        aria-hidden="true"
      />

      {/* Sticky 100svh Canvas Stage */}
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex flex-col justify-between">
        {/* Background Layers */}
        {/* 1. Dark Night Background Layer (#0B0F14 / #212227) */}
        <m.div
          style={{ opacity: bgDarkOpacity }}
          className="absolute inset-0 bg-[#0B0F14] bg-[radial-gradient(circle_at_50%_40%,#212227_0%,#0B0F14_100%)] pointer-events-none z-0"
        />

        {/* 2. Light Blueprint Background Layer (#F3F5F4) */}
        <m.div
          style={{ opacity: bgLightOpacity }}
          className="absolute inset-0 bg-[#F3F5F4] bg-[radial-gradient(circle_at_50%_35%,#FFFFFF_0%,#EFF3F2_100%)] pointer-events-none z-0"
        />

        {/* 3. The Animated Bridge Element (Scales & Pans on Scroll) */}
        <m.div
          style={{
            scale: bridgeScale,
            x: bridgeX,
            y: bridgeY,
          }}
          className="absolute inset-0 w-full h-full transform-gpu z-10"
        >
          <BridgeMedia
            progress={smoothProgress.get()}
            themeProgress={themeProgress.get()}
            className="w-full h-full"
          />

          {/* Kinetic Particle Streams & Glints */}
          <ParticleLayer
            themeProgress={themeProgress.get()}
            intensity={1.2}
          />

          {/* Annotated Callouts over the Bridge */}
          {CALLOUTS.map((callout, index) => (
            <Callout
              key={callout.id}
              callout={callout}
              visible={calloutsVisible.get()}
              delay={index * 0.1}
              isAr={isAr}
            />
          ))}
        </m.div>

        {/* 4. Hero Content Layer (Dark Scene: State 1) */}
        <m.div
          style={{
            opacity: heroOpacity,
            y: heroY,
            pointerEvents: heroPointerEvents as unknown as React.CSSProperties['pointerEvents'],
          }}
          className="relative z-20 w-full pt-28 sm:pt-36 lg:pt-40 px-4 sm:px-6 max-w-5xl mx-auto text-start"
        >
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md mb-4 sm:mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3D7BFF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2451BF]" />
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-300">
                {isAr ? 'من نحن' : 'WHO WE ARE'}
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-5 font-heading">
              {isAr ? 'من نحن' : 'Who We Are'}
            </h1>

            {/* Sub-copy (max 4 lines, about 36 words) */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8 font-sans">
              {isAr
                ? 'بونت لوك هي الجسر الرابط بين مزودي التدريب والشركات الخليجية التي لديها احتياجات وتحديات حقيقية. نحدد فجوة الكفاءة، ونتحقق من صاحب القرار، ونربط الشركاء المناسبين.'
                : 'Pontlook is the bridge between corporate training providers and GCC companies that already need training. We find the real workforce challenge, verify the decision-maker, and connect the right partners.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-6">
              <Link
                href={`/${lang}/find-training`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#2451BF] hover:bg-[#1D4ED8] text-white font-medium text-sm shadow-lg shadow-[#2451BF]/25 transition-all duration-200 active:scale-[0.98]"
              >
                <span>{isAr ? 'ابحث عن تدريب' : 'Find Training'}</span>
                <ArrowRight
                  size={15}
                  className={`ms-2 ${isAr ? 'rotate-180' : ''}`}
                />
              </Link>

              <Link
                href={`/${lang}/for-providers`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 font-medium text-sm backdrop-blur-sm transition-all duration-200 active:scale-[0.98]"
              >
                <span>{isAr ? 'أنا مزود تدريب' : "I'm a Training Provider"}</span>
              </Link>
            </div>
          </div>
        </m.div>

        {/* 5. Scroll Cue (Bottom left/center, fades out early) */}
        <m.div
          style={{ opacity: scrollCueOpacity }}
          className="relative z-20 px-4 sm:px-6 max-w-5xl mx-auto w-full pb-8 pointer-events-none flex items-center gap-2 text-xs font-medium text-slate-400"
        >
          <ChevronDown size={14} className="animate-bounce text-[#3D7BFF]" />
          <span>{isAr ? 'مرر لعبور الجسر' : 'Scroll to cross the bridge'}</span>
        </m.div>

        {/* 6. Content Blocks Reveal (Light Blueprint Scene: State 3) */}
        {/* Desktop Layout (md and above) */}
        <div className="hidden md:block absolute inset-0 z-30 pointer-events-none">
          {/* OUR MISSION (Left, mid-height) */}
          <m.div
            style={{
              opacity: missionOpacity,
              y: missionY,
            }}
            className={`absolute top-[28%] ${isAr ? 'right-[6%]' : 'left-[6%]'}`}
          >
            <InfoCard
              title={isAr ? 'مهمتنا' : 'OUR MISSION'}
              body={
                isAr
                  ? 'إزالة التخمين من التدريب المؤسسي في الخليج. نتحقق من احتياجات العمل الحقيقية ونربطها بالمزودين المناسبين، لتبدأ كل محادثة مع شركة جاهزة للعمل.'
                  : 'To remove the guesswork from corporate training in the GCC. We verify real business needs and connect them with the right training providers, so every conversation starts with a company that is ready to act.'
              }
              isAr={isAr}
            />
          </m.div>

          {/* OUR VISION (Right, mid-height) */}
          <m.div
            style={{
              opacity: visionOpacity,
              y: visionY,
            }}
            className={`absolute top-[28%] ${isAr ? 'left-[6%]' : 'right-[6%]'}`}
          >
            <InfoCard
              title={isAr ? 'رؤيتنا' : 'OUR VISION'}
              body={
                isAr
                  ? 'منطقة خليجية تجد فيها كل مؤسسة شريك التطوير المناسب بسرعة، ويفوز فيها مزودو التدريب بعقود قائمة على الثقة والصلة بدلاً من التواصل البارد.'
                  : 'A GCC where every organisation finds the right development partner quickly, and every great training provider wins enterprise work through trust and relevance instead of cold outreach and referrals.'
              }
              isAr={isAr}
            />
          </m.div>

          {/* OUR IMPACT (Bottom-center) */}
          <m.div
            style={{
              opacity: impactOpacity,
              y: impactY,
            }}
            className="absolute bottom-[10%] left-1/2 -translate-x-1/2"
          >
            <InfoCard
              title={isAr ? 'أثرنا' : 'OUR IMPACT'}
              body={
                isAr
                  ? 'يحصل المزودون على فرص مصنفة ويدفعون فقط لكل فرصة مؤهلة، بدون اشتراكات. وتحصل الشركات على شركاء معتمدين لتحدياتهم الحقيقية.'
                  : 'Providers get qualified, graded opportunities and pay only per qualified lead, with no retainers. Companies get matched, vetted partners for their real challenges, from leadership and AI adoption to compliance and Saudization.'
              }
              tagline={isAr ? 'طلب مؤكد. شركاء ملائمون.' : 'Verified demand. Right-fit partners.'}
              ctaText={isAr ? 'استكشف منهجيتنا ←' : 'Explore our approach →'}
              onCtaClick={scrollToMethod}
              className="max-w-[420px]"
              isAr={isAr}
            />
          </m.div>
        </div>

        {/* Mobile Swapping Bottom Sheet Cards (Under md) */}
        <div className="md:hidden absolute bottom-14 left-4 right-4 z-30 pointer-events-none">
          {currentStage === 2 && (
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <InfoCard
                title={isAr ? 'مهمتنا ورؤيتنا' : 'MISSION & VISION'}
                body={
                  isAr
                    ? 'إزالة التخمين من التدريب المؤسسي في الخليج، وبناء منظومة موثوقة تلغي التواصل البارد.'
                    : 'To remove the guesswork from corporate training in the GCC. We verify real business needs and connect them with the right partners.'
                }
                isAr={isAr}
                className="max-w-none w-full"
              />
            </m.div>
          )}

          {currentStage === 3 && (
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <InfoCard
                title={isAr ? 'أثرنا' : 'OUR IMPACT'}
                body={
                  isAr
                    ? 'فرص مؤهلة بدون اشتراكات للمزودين، وتوفيق مباشر لأكبر المؤسسات في السعودية والإمارات.'
                    : 'Providers pay only per qualified lead with zero retainers. Companies get matched with pre-vetted specialists.'
                }
                tagline={isAr ? 'طلب مؤكد. شركاء ملائمون.' : 'Verified demand. Right-fit partners.'}
                ctaText={isAr ? 'استكشف منهجيتنا ←' : 'Explore our approach →'}
                onCtaClick={scrollToMethod}
                isAr={isAr}
                className="max-w-none w-full"
              />
            </m.div>
          )}
        </div>

        {/* 7. Bottom-Center 4-Segment Progress Indicator (From Reference Video) */}
        <div className="relative z-40 w-full pb-4 sm:pb-6 flex items-center justify-center">
          <StageProgress
            currentStage={currentStage}
            themeProgress={themeProgress.get()}
            onSelectStage={scrollToStage}
            isAr={isAr}
          />
        </div>
      </div>
    </section>
  );
}
