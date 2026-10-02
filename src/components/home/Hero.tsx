'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { ArrowRight } from '@/components/icons';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import TextReveal from '@/components/shared/TextReveal';
import WordRotate from '@/components/shared/WordRotate';
import Magnetic from '@/components/shared/Magnetic';
import Press from '@/components/shared/Press';
import TrustBar from '@/components/home/TrustBar';
import { fadeUp, dur, ease } from '@/lib/motion';

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
        'القيادة التنفيذية الاستراتيجية',
        'التحول الرقمي والذكاء الاصطناعي',
        'المبيعات والتفاوض التجاري',
        'الحوكمة والمخاطر والالتزام',
        'الأمن السيبراني والبنية التقنية',
      ]
    : [
        'Executive Leadership & Strategy',
        'AI & Digital Transformation',
        'Strategic B2B Sales & Negotiation',
        'Governance, Risk & Compliance',
        'Cybersecurity & Tech Infrastructure',
      ];

  return (
    <section
      ref={sectionRef}
      data-nav-dark="true"
      className="relative overflow-hidden bg-black text-white min-h-[calc(100svh-4rem)] sm:min-h-[100svh] flex flex-col justify-between pt-28 pb-4 sm:pt-36 sm:pb-6 select-none"
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
      </m.div>

      {/* Main Hero Writing Section */}
      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl pt-4 sm:pt-8 flex-1 flex flex-col justify-center">
        <div className="flex flex-col items-start text-start max-w-6xl">
          
          {/* Hero headline - adjusted across all the screen (medium) */}
          <TextReveal
            as="h1"
            text={dict.hero.headline}
            onScroll={false}
            className="text-[1.875rem] xs:text-[2.125rem] sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px] font-medium sm:font-semibold text-white tracking-tight leading-[1.14] sm:leading-[1.16] font-heading w-full max-w-6xl xl:max-w-7xl"
          />

          {/* Hero subtitle statement - neutral grey */}
          <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-neutral-400 font-sans leading-relaxed max-w-3xl sm:max-w-4xl">
            {dict.hero.subtitle}
          </p>

          {/* Dynamic rotating words sub-headline - 100% monochrome */}
          <m.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: ease.out }}
            className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 text-sm md:text-base text-neutral-400 font-sans"
          >
            <span>{isAr ? 'عروض تدريبية معتمدة في' : 'Enterprise capability solutions in'}</span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-md text-neutral-200">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 animate-pulse" />
              <WordRotate words={capabilityWords} />
            </span>
          </m.div>

          {/* Side CTAs (Linear layout) - 100% monochrome black/white/grey */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.35, duration: dur.slow, ease: ease.out }}
            className="mt-7 sm:mt-10 flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 sm:gap-4 w-full"
          >
            <Magnetic strength={0.22} activeDistance={40} className="w-full xs:w-auto">
              <Press className="w-full xs:w-auto" strength={0.7} vibrate>
                <Link
                  href={`/${lang}/for-providers`}
                  className="w-full xs:w-auto inline-flex items-center justify-center gap-2.5 py-3.5 sm:py-3.5 px-6 sm:px-7 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-[0.9375rem] sm:text-base shadow-md transition-colors duration-200 group"
                >
                  <span>{isAr ? 'انضم إلى شبكتنا' : 'Join the network'}</span>
                  <ArrowRight
                    size={16}
                    className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                  />
                </Link>
              </Press>
            </Magnetic>

            <Magnetic strength={0.22} activeDistance={40} className="w-full xs:w-auto">
              <Press className="w-full xs:w-auto" strength={0.7} vibrate>
                <Link
                  href={`/${lang}/who-we-are`}
                  className="w-full xs:w-auto inline-flex items-center justify-center gap-2 py-3.5 sm:py-3.5 px-6 sm:px-7 rounded-full bg-transparent hover:bg-white/[0.08] text-neutral-300 hover:text-white font-semibold text-[0.9375rem] sm:text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] transition-colors duration-200 group"
                >
                  <span>{isAr ? 'من نحن' : 'Who we are'}</span>
                  <ArrowRight
                    size={15}
                    className="rtl:-scale-x-100 text-neutral-400 group-hover:text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all"
                  />
                </Link>
              </Press>
            </Magnetic>
          </m.div>

        </div>
      </div>

      {/* TrustBar Marquee Ribbon integrated at the bottom of the black first section */}
      <div className="relative z-10 w-full mt-auto pt-6">
        <TrustBar />
      </div>
    </section>
  );
}
