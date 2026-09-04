'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { ShieldCheck, Building2, TrendingUp, ArrowRight, Target } from 'lucide-react';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 18,
      mass: 0.9,
    },
  },
};

export default function Hero() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';

  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-20 lg:pt-36 lg:pb-36 min-h-[90vh] flex flex-col justify-center">
      {/* Full-Bleed Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/skyline-bg.jpg"
          alt="GCC Corporate Business Skyline in Riyadh and Dubai"
          fill
          className="object-cover scale-105 opacity-45"
          priority
        />
        {/* Advanced Gradient Mask */}
        <div
          className="absolute inset-0 bg-background"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 50%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 50%, black 100%)',
          }}
        />

        {/* Ambient Radial Glow Orbs */}
        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-accent/15 via-accent-secondary/10 to-accent/15 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
        <div className="absolute top-10 start-1/4 w-[380px] h-[380px] bg-accent/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
        <div className="absolute bottom-10 end-1/4 w-[420px] h-[420px] bg-accent-secondary/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
      </div>

      <div className="container-site relative z-10 mx-auto flex flex-col items-center text-center px-6 sm:px-8 lg:px-12">
        <m.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[960px] flex flex-col items-center transform-gpu will-change-transform"
        >
          {/* Main Headline */}
          <m.h1
            variants={itemVariants}
            className="font-serif text-3xl font-normal tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.1] drop-shadow-xs"
          >
            {dict.hero.headline}
          </m.h1>

          {/* Subtitle */}
          <m.p
            variants={itemVariants}
            className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-slate-600 max-w-[780px] tracking-wide leading-relaxed font-sans font-normal"
          >
            {dict.hero.subtitle}
          </m.p>

          {/* Action Buttons */}
          <m.div
            variants={itemVariants}
            className="mt-8 sm:mt-10 flex flex-col w-full sm:w-auto sm:flex-row items-center gap-4 sm:gap-5"
          >
            <Button
              href={`/${lang}/for-providers`}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              leftIcon={<Building2 size={18} className="text-white/90" />}
              rightIcon={<ArrowRight size={17} className="rtl:-scale-x-100" />}
            >
              {dict.hero.btn_provider}
            </Button>

            <Button
              href={`/${lang}/find-training`}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              leftIcon={<Target size={18} className="text-slate-700" />}
            >
              {dict.hero.btn_buyer}
            </Button>
          </m.div>

          {/* Quick Metrics Bar */}
          <m.div
            variants={itemVariants}
            className="mt-14 pt-8 border-t border-slate-200/70 w-full max-w-2xl grid grid-cols-3 gap-4 text-center"
          >
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900 flex items-center justify-center gap-1.5">
                <ShieldCheck size={18} className="text-accent shrink-0" />
                <span>100%</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">Verified Decision-Makers</p>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900 flex items-center justify-center gap-1.5">
                <TrendingUp size={18} className="text-emerald-500 shrink-0" />
                <span>Zero</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">Monthly Retainer Risk</p>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900 flex items-center justify-center gap-1.5">
                <Building2 size={18} className="text-accent-secondary shrink-0" />
                <span>6</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">GCC Markets Covered</p>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
