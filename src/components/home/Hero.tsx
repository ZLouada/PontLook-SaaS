'use client';

import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { Building2, ArrowRight, Target } from 'lucide-react';
import Button from '@/components/shared/Button';

export default function Hero() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';

  return (
    <section className="relative overflow-hidden bg-white min-h-[calc(100vh-4rem)] sm:min-h-screen flex flex-col justify-center items-center pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 opacity-40 transition-opacity duration-700"
          style={{
            backgroundImage: "url('/skyline-bg.webp')",
          }}
        />
        <div
          className="absolute inset-0 bg-white/70"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 45%, white 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 45%, white 100%)',
          }}
        />

        <div className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[900px] h-[520px] bg-gradient-to-r from-accent/15 via-accent-secondary/10 to-accent/15 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
        <div className="absolute top-12 start-1/4 w-[440px] h-[440px] bg-accent/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
        <div className="absolute bottom-12 end-1/4 w-[480px] h-[480px] bg-accent-secondary/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
      </div>

      <div className="container-site relative z-10 mx-auto flex flex-col items-center text-center px-4 sm:px-8 lg:px-12 my-auto">
        <div className="max-w-[960px] flex flex-col items-center">
          {/* Apple-grade Display Headline - immediately painted for instant LCP */}
          <h1
            className="font-heading text-[32px] sm:text-5xl lg:text-6xl xl:text-[68px] font-semibold tracking-[-0.03em] leading-[1.14] sm:leading-[1.08] text-slate-900"
          >
            {dict.hero.headline}
          </h1>

          {/* Optical Subtitle */}
          <p
            className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl px-1 sm:px-0"
          >
            {dict.hero.subtitle}
          </p>

          <div
            className="mt-8 sm:mt-10 flex flex-col w-full sm:w-auto sm:flex-row items-center gap-3.5 sm:gap-4"
          >
            <Button
              href={`/${lang}/for-providers`}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto py-4 sm:py-3.5 px-7 justify-center min-h-[50px] shadow-lg shadow-primary/25 active:scale-[0.98]"
              leftIcon={<Building2 size={18} className="text-white/90" />}
              rightIcon={<ArrowRight size={17} className="rtl:-scale-x-100" />}
            >
              {dict.hero.btn_provider}
            </Button>

            <Button
              href={`/${lang}/find-training`}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto py-4 sm:py-3.5 px-7 justify-center min-h-[50px] active:scale-[0.98]"
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
