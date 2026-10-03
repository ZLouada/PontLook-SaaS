'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { ArrowRight } from '@/components/icons';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import TextReveal from '@/components/shared/TextReveal';
import WordRotate from '@/components/shared/WordRotate';
import Magnetic from '@/components/shared/Magnetic';
import Press from '@/components/shared/Press';
import { fadeUp, dur, ease } from '@/lib/motion';

const PontLookGlobe = dynamic(() => import('@/components/home/PontLookGlobe'), {
  ssr: false,
});

export default function Hero() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  /* Scroll parallax on the decorative underlayer. A phone has no pointer to
     drive the hero's depth, so the scroll itself drives it: the dot field and
     the ambient glow drift at different rates as the hero leaves. Both targets
     are aria-hidden decoration and only `transform`/`opacity` move. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const dotsY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const underlayerOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  const capabilityWords = isAr
    ? [
        'القيادة وإدارة فرق العمل',
        'الذكاء الاصطناعي وتطوير المهارات التقنية',
        'مبيعات الشركات والتفاوض التجاري',
        'الحوكمة والامتثال المؤسسي',
        'المالية وإدارة المشاريع',
      ]
    : [
        'Leadership & Team Management',
        'AI & Practical Tech Upskilling',
        'B2B Sales & Negotiation',
        'Compliance & Corporate Governance',
        'Finance & Project Management',
      ];

  return (
    <section
      ref={sectionRef}
      data-nav-dark="true"
      className="relative overflow-hidden bg-black text-white min-h-[calc(100svh-4rem)] sm:min-h-[100svh] flex flex-col justify-center pt-16 pb-12 sm:pt-24 sm:pb-16 select-none"
    >
      {/* Background Underlayer: Deep Black with Subtle Monochrome Tech Dots */}
      <m.div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
        style={reduce ? undefined : { opacity: underlayerOpacity }}
      >
        <m.div
          className="absolute -inset-y-16 inset-x-0 opacity-[0.06] will-change-transform"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
            backgroundSize: '36px 36px',
            ...(reduce ? {} : { y: dotsY }),
          }}
        />
        {/* Subtle monochrome ambient light (pure black & white glow, no colors) */}
        {/* The -50% centring lives in the motion transform, not a Tailwind class:
            framer-motion replaces `transform` wholesale, so a class would be lost. */}
        <m.div
          className="absolute top-1/4 start-1/2 w-[700px] h-[400px] bg-white/[0.02] blur-[160px] rounded-full pointer-events-none will-change-transform"
          style={reduce ? { x: '-50%' } : { x: '-50%', y: glowY, scale: glowScale }}
        />

        {/* 'The Link' Visual Metaphor: Subtle architectural lines connecting two distinct points */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.14] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="link-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="link-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M -100 240 C 300 280, 600 120, 1100 280 S 1600 460, 2100 320"
            fill="none"
            stroke="url(#link-grad-1)"
            strokeWidth="1.25"
            strokeDasharray="6 8"
          />
          <path
            d="M 50 180 C 450 150, 750 360, 1300 220 S 1800 120, 2200 260"
            fill="none"
            stroke="url(#link-grad-2)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </svg>
      </m.div>

      {/* Main Hero Writing Section */}
      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl pt-0 sm:pt-2 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Headline, Subtitle, Capability words, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            
            {/* Hero headline */}
            <h1 className="text-[1.875rem] xs:text-[2.125rem] sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-medium sm:font-semibold text-white tracking-tight leading-[1.14] sm:leading-[1.16] font-heading w-full">
              {dict.hero.headline}
            </h1>

            {/* Hero subtitle statement */}
            <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-neutral-400 font-sans leading-relaxed max-w-2xl">
              {dict.hero.subtitle}
            </p>

            {/* Dynamic rotating words subheadline */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 text-sm md:text-base text-neutral-400 font-sans">
              <span>{isAr ? 'حلول وتطوير كفاءات في' : 'Enterprise capability solutions in'}</span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-md text-neutral-200">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 animate-pulse" />
                <WordRotate words={capabilityWords} />
              </span>
            </div>

            {/* Side CTAs (Dual Action: HR Buyer vs Training Provider) */}
            <div className="mt-7 sm:mt-10 flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 sm:gap-4 w-full">
              {/* Primary Action for HR & Enterprise Buyers */}
              <Magnetic strength={0.22} activeDistance={40} className="w-full xs:w-auto">
                <Press className="w-full xs:w-auto" strength={0.7} vibrate>
                  <Link
                    href={`/${lang}/find-training`}
                    className="w-full xs:w-auto inline-flex items-center justify-center gap-2.5 py-3.5 sm:py-3.5 px-6 sm:px-7 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-[0.9375rem] sm:text-base shadow-md transition-colors duration-200 group"
                  >
                    <span>{dict.hero?.btn_buyer || (isAr ? 'ابحث عن شريك تدريب' : 'Find a Training Partner')}</span>
                    <ArrowRight
                      size={16}
                      className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                    />
                  </Link>
                </Press>
              </Magnetic>

              {/* Secondary Action for Training Companies / Providers */}
              <Magnetic strength={0.22} activeDistance={40} className="w-full xs:w-auto">
                <Press className="w-full xs:w-auto" strength={0.7} vibrate>
                  <Link
                    href={`/${lang}/for-providers`}
                    className="w-full xs:w-auto inline-flex items-center justify-center gap-2 py-3.5 sm:py-3.5 px-6 sm:px-7 rounded-full bg-transparent hover:bg-white/[0.08] text-neutral-300 hover:text-white font-semibold text-[0.9375rem] sm:text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] transition-colors duration-200 group"
                  >
                    <span>{dict.hero?.btn_provider || (isAr ? 'انضم كشريك تدريبي' : 'Join as a Training Provider')}</span>
                    <ArrowRight
                      size={15}
                      className="rtl:-scale-x-100 text-neutral-400 group-hover:text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all"
                    />
                  </Link>
                </Press>
              </Magnetic>
            </div>

          </div>

          {/* Right Column: Animated PontLook GCC 3D Earth Globe */}
          <div className="lg:col-span-5 w-full flex items-center justify-center pt-4 lg:pt-0">
            <PontLookGlobe className="w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] lg:max-w-[500px]" />
          </div>

        </div>
      </div>
    </section>
  );
}
