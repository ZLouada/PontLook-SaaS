'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { ArrowRight, CheckCircle2, Target, Sparkles } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

export default function Hero() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

  const trustCheckmarks = isAr
    ? [
        'مدربون معتمدون 100%',
        'عروض مخصصة خلال 48 ساعة',
        'بدون أي رسوم مسبقة للشركات',
      ]
    : [
        '100% verified instructors',
        '48 hour tailored proposals',
        'Zero upfront platform cost for enterprises',
      ];

  return (
    <section
      data-nav-dark="true"
      className="relative overflow-hidden bg-[#000000] text-white min-h-[calc(100vh-4rem)] sm:min-h-screen flex flex-col justify-center pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      {/* Cinematic Bridge Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <Image
          src="/hero-bridge.png"
          alt="PontLook Bridge Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform-gpu scale-105"
        />

        {/* Dark Cinematic Vignette & Readability Gradient Overlay */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35 rtl:bg-gradient-to-l rtl:from-black/85 rtl:via-black/60 rtl:to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/25 to-black/60" />

        {/* Ambient warm and cool glows echoing the bridge lights */}
        <div className="absolute top-1/2 end-1/4 w-[500px] h-[500px] bg-amber-500/[0.06] blur-[150px] rounded-full" />
        <div className="absolute bottom-10 start-1/4 w-[600px] h-[400px] bg-[#0052FF]/[0.08] blur-[160px] rounded-full" />
      </div>

      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (Writing): Linear-style Headline, Eyebrow & Subtitle in White */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start text-start">
            <Reveal>
              {/* Eyebrow Badge */}
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md shadow-sm">
                <Sparkles size={13} className="text-[#0052FF]" />
                <span>
                  {isAr
                    ? 'منصة الربط التدريبي المؤسسي الأولى بالخليج'
                    : 'GCC Corporate Training Matchmaking'}
                </span>
              </span>

              {/* Linear-Style Big Title in White */}
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[70px] font-medium tracking-[-0.035em] leading-[1.08] text-white">
                {dict.hero.headline}
              </h1>

              {/* Subtitle */}
              <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl font-sans">
                {dict.hero.subtitle}
              </p>

              {/* 3 Trust Points */}
              <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-y-3 gap-x-6 w-full">
                {trustCheckmarks.map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-neutral-300 leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column (Buttons directly without any cadre / card) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-start lg:items-end justify-center w-full">
            <Reveal delay={0.12}>
              <div className="w-full max-w-sm flex flex-col gap-3.5">
                {/* Primary CTA Button: Join the networks with electric orange hover effect */}
                <Link
                  href={`/${lang}/for-providers/apply`}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-7 rounded-full bg-[#0052FF] hover:bg-[#FF5C00] text-white font-semibold text-base shadow-lg shadow-blue-600/30 hover:shadow-orange-500/30 active:scale-[0.98] transition-all duration-300 group"
                >
                  <span>{isAr ? 'انضم إلى شبكتنا' : 'Join the networks'}</span>
                  <ArrowRight
                    size={17}
                    className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                  />
                </Link>

                {/* Secondary CTA Button: I'm looking for training */}
                <Link
                  href={`/${lang}/find-training/request`}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-7 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 backdrop-blur-md shadow-sm active:scale-[0.98] transition-all duration-200"
                >
                  <Target size={17} className="text-blue-400" />
                  <span>{dict.hero.btn_buyer}</span>
                </Link>
              </div>
            </Reveal>
          </div>

        </div>
      </div>

      {/* Smooth gradient transition into the TrustBar section */}
      <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-b from-transparent to-[#000000] pointer-events-none" />
    </section>
  );
}
