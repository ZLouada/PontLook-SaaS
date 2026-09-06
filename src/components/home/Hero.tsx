'use client';

import { m } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { Building2, ArrowRight, Target } from 'lucide-react';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

export default function Hero() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';

  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-10 sm:pt-24 sm:pb-14 lg:pt-24 lg:pb-16 min-h-[80vh] sm:min-h-[85vh] flex flex-col justify-center">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 opacity-30"
          style={{
            backgroundImage: "url('/skyline-bg.webp')",
          }}
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
        </div>
      </div>
    </section>
  );
}
