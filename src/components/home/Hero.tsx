'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { ShieldCheck, Building2, TrendingUp, ArrowRight, Target, CheckCircle2 } from 'lucide-react';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function Hero() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';

  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-10 sm:pt-24 sm:pb-14 lg:pt-24 lg:pb-16 min-h-[80vh] sm:min-h-[85vh] flex flex-col justify-center">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/skyline-bg.webp"
          alt="GCC Corporate Business Skyline in Riyadh and Dubai"
          fill
          sizes="100vw"
          className="object-cover scale-105 opacity-30"
          priority
        />
        <div
          className="absolute inset-0 bg-white"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 50%, white 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 50%, white 100%)',
          }}
        />

        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-accent/10 via-accent-secondary/5 to-accent/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
        <div className="absolute top-10 start-1/4 w-[380px] h-[380px] bg-accent/5 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
        <div className="absolute bottom-10 end-1/4 w-[420px] h-[420px] bg-accent-secondary/5 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
      </div>

      <div className="container-site relative z-10 mx-auto flex flex-col items-center text-center px-4 sm:px-8 lg:px-12">
        <div className="max-w-[960px] flex flex-col items-center">
          {/* Floating live GCC demand badge with vertical harmonic sine motion */}
          <m.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
            className="mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/90 px-3.5 sm:px-4 py-1.5 shadow-xs backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
              {lang === 'ar' ? 'طلبات تدريب مؤسسية نشطة في الخليج' : 'Live GCC Enterprise Training Demand'}
            </span>
          </m.div>

          {/* Apple-grade Display Headline - immediately painted for instant LCP */}
          <h1
            className="font-heading text-[30px] sm:text-5xl lg:text-6xl xl:text-[68px] font-semibold tracking-[-0.03em] leading-[1.12] sm:leading-[1.08] text-slate-900"
          >
            {dict.hero.headline}
          </h1>

          {/* Optical Subtitle */}
          <p
            className="mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl px-1 sm:px-0"
          >
            {dict.hero.subtitle}
          </p>

          <div
            className="mt-6 sm:mt-8 flex flex-col w-full sm:w-auto sm:flex-row items-center gap-3 sm:gap-4"
          >
            <Button
              href={`/${lang}/for-providers`}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto py-4 sm:py-3.5 justify-center min-h-[48px] active:scale-[0.98]"
              leftIcon={<Building2 size={18} className="text-white/90" />}
              rightIcon={<ArrowRight size={17} className="rtl:-scale-x-100" />}
            >
              {dict.hero.btn_provider}
            </Button>

            <Button
              href={`/${lang}/find-training`}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto py-4 sm:py-3.5 justify-center min-h-[48px] active:scale-[0.98]"
              leftIcon={<Target size={18} className="text-slate-700" />}
            >
              {dict.hero.btn_buyer}
            </Button>
          </div>

          {/* Value proposition badges */}
          <div
            className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-slate-200/70 w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center"
          >
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-apple">
              <div className="text-base sm:text-2xl font-mono font-bold text-slate-900 flex items-center justify-center gap-1 sm:gap-1.5">
                <ShieldCheck size={15} className="text-accent shrink-0 sm:h-[18px] sm:w-[18px]" />
                <span>{dict.hero.badges?.verified_deciders?.value || '100%'}</span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-1 leading-snug">
                {dict.hero.badges?.verified_deciders?.label || 'Verified Decision-Makers'}
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-apple">
              <div className="text-lg sm:text-2xl font-mono font-bold text-slate-900 flex items-center justify-center gap-1 sm:gap-1.5">
                <TrendingUp size={16} className="text-emerald-500 shrink-0 sm:h-[18px] sm:w-[18px]" />
                <span>{dict.hero.badges?.zero_retainer?.value || 'Zero'}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 leading-snug">
                {dict.hero.badges?.zero_retainer?.label || 'Monthly Retainer Risk'}
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-apple">
              <div className="text-lg sm:text-2xl font-mono font-bold text-slate-900 flex items-center justify-center gap-1 sm:gap-1.5">
                <CheckCircle2 size={16} className="text-blue-500 shrink-0 sm:h-[18px] sm:w-[18px]" />
                <span>{dict.hero.badges?.match_rate?.value || '92%'}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 leading-snug">
                {dict.hero.badges?.match_rate?.label || 'Leads Reach Meetings'}
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-apple">
              <div className="text-lg sm:text-2xl font-mono font-bold text-slate-900 flex items-center justify-center gap-1 sm:gap-1.5">
                <Building2 size={16} className="text-accent-secondary shrink-0 sm:h-[18px] sm:w-[18px]" />
                <span>{dict.hero.badges?.markets_covered?.value || '6'}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1 leading-snug">
                {dict.hero.badges?.markets_covered?.label || 'GCC Markets Covered'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
