'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { ShieldCheck, Building2, TrendingUp, ArrowRight, Target, CheckCircle2 } from 'lucide-react';
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
    <section className="relative overflow-hidden bg-background pt-24 pb-14 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-36 min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/skyline-bg.jpg"
          alt="GCC Corporate Business Skyline in Riyadh and Dubai"
          fill
          className="object-cover scale-105 opacity-45"
          priority
        />
        <div
          className="absolute inset-0 bg-background"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 50%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 50%, black 100%)',
          }}
        />

        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-accent/15 via-accent-secondary/10 to-accent/15 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
        <div className="absolute top-10 start-1/4 w-[380px] h-[380px] bg-accent/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
        <div className="absolute bottom-10 end-1/4 w-[420px] h-[420px] bg-accent-secondary/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
      </div>

      <div className="container-site relative z-10 mx-auto flex flex-col items-center text-center px-4 sm:px-8 lg:px-12">
        <m.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[960px] flex flex-col items-center transform-gpu will-change-transform"
        >
          <m.h1
            variants={itemVariants}
            className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-semibold tracking-normal sm:tracking-tight text-slate-800 leading-[1.18] sm:leading-[1.1]"
          >
            {dict.hero.headline}
          </m.h1>

          <m.p
            variants={itemVariants}
            className="mt-4 sm:mt-8 text-base sm:text-lg md:text-xl text-slate-600 max-w-[780px] leading-relaxed font-sans font-normal px-2 sm:px-0"
          >
            {dict.hero.subtitle}
          </m.p>

          <m.div
            variants={itemVariants}
            className="mt-7 sm:mt-10 flex flex-col w-full sm:w-auto sm:flex-row items-center gap-3 sm:gap-5"
          >
            <Button
              href={`/${lang}/for-providers`}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto py-4 sm:py-3.5 justify-center"
              leftIcon={<Building2 size={18} className="text-white/90" />}
              rightIcon={<ArrowRight size={17} className="rtl:-scale-x-100" />}
            >
              {dict.hero.btn_provider}
            </Button>

            <Button
              href={`/${lang}/find-training`}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto py-4 sm:py-3.5 justify-center"
              leftIcon={<Target size={18} className="text-slate-700" />}
            >
              {dict.hero.btn_buyer}
            </Button>
          </m.div>

          <m.div
            variants={itemVariants}
            className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-slate-200/70 w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 text-center"
          >
            <div className="bg-slate-50/70 sm:bg-transparent rounded-2xl p-3 sm:p-0 border border-slate-200/60 sm:border-0">
              <div className="text-lg sm:text-2xl font-mono font-bold text-slate-800 flex items-center justify-center gap-1 sm:gap-1.5">
                <ShieldCheck size={16} className="text-accent shrink-0 sm:h-[18px] sm:w-[18px]" />
                <span>{dict.hero.badges?.verified_deciders?.value || '100%'}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 leading-snug">
                {dict.hero.badges?.verified_deciders?.label || 'Verified Decision-Makers'}
              </p>
            </div>
            <div className="bg-slate-50/70 sm:bg-transparent rounded-2xl p-3 sm:p-0 border border-slate-200/60 sm:border-0">
              <div className="text-lg sm:text-2xl font-mono font-bold text-slate-800 flex items-center justify-center gap-1 sm:gap-1.5">
                <TrendingUp size={16} className="text-emerald-500 shrink-0 sm:h-[18px] sm:w-[18px]" />
                <span>{dict.hero.badges?.zero_retainer?.value || 'Zero'}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 leading-snug">
                {dict.hero.badges?.zero_retainer?.label || 'Monthly Retainer Risk'}
              </p>
            </div>
            <div className="bg-slate-50/70 sm:bg-transparent rounded-2xl p-3 sm:p-0 border border-slate-200/60 sm:border-0">
              <div className="text-lg sm:text-2xl font-mono font-bold text-slate-800 flex items-center justify-center gap-1 sm:gap-1.5">
                <CheckCircle2 size={16} className="text-blue-500 shrink-0 sm:h-[18px] sm:w-[18px]" />
                <span>{dict.hero.badges?.match_rate?.value || '92%'}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 leading-snug">
                {dict.hero.badges?.match_rate?.label || 'Leads Reach Meetings'}
              </p>
            </div>
            <div className="bg-slate-50/70 sm:bg-transparent rounded-2xl p-3 sm:p-0 border border-slate-200/60 sm:border-0">
              <div className="text-lg sm:text-2xl font-mono font-bold text-slate-800 flex items-center justify-center gap-1 sm:gap-1.5">
                <Building2 size={16} className="text-accent-secondary shrink-0 sm:h-[18px] sm:w-[18px]" />
                <span>{dict.hero.badges?.markets_covered?.value || '6'}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 leading-snug">
                {dict.hero.badges?.markets_covered?.label || 'GCC Markets Covered'}
              </p>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
