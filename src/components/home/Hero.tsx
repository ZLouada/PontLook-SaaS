'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

export default function Hero() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

  return (
    <section
      data-nav-dark="true"
      className="relative overflow-hidden bg-[#08090A] text-white min-h-[calc(100vh-4rem)] sm:min-h-screen flex flex-col justify-center pt-28 pb-16 sm:pt-36 sm:pb-24"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-black/25 to-black/60" />

        {/* Ambient warm and cool glows echoing the bridge lights */}
        <div className="absolute top-1/2 end-1/4 w-[500px] h-[500px] bg-amber-500/[0.06] blur-[150px] rounded-full" />
        <div className="absolute bottom-10 start-1/4 w-[600px] h-[400px] bg-[#0052FF]/[0.08] blur-[160px] rounded-full" />
      </div>

      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-5xl">
        <div className="flex flex-col items-center text-center">
          
          <Reveal>
            {/* Linear-Style Centered Headline in White */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px] font-medium tracking-[-0.035em] leading-[1.08] text-white max-w-4xl mx-auto">
              {dict.hero.headline}
            </h1>
          </Reveal>

          {/* Centered Transparent CTA Buttons */}
          <Reveal delay={0.12}>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full">
              {/* Primary CTA Button: Join the network (No background until hover, links to /for-providers) */}
              <Link
                href={`/${lang}/for-providers`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-3.5 px-7 rounded-full bg-transparent hover:bg-white/[0.10] text-white font-medium text-sm sm:text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-sm active:scale-[0.98] transition-all duration-200 group"
              >
                <span>{isAr ? 'انضم إلى شبكتنا' : 'Join the network'}</span>
                <ArrowRight
                  size={16}
                  className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                />
              </Link>

              {/* Secondary CTA Button: Who we are (Links to /who-we-are) */}
              <Link
                href={`/${lang}/who-we-are`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-7 rounded-full bg-transparent hover:bg-white/[0.08] text-neutral-300 hover:text-white font-medium text-sm sm:text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md transition-all duration-200 group"
              >
                <span>{isAr ? 'من نحن' : 'Who we are'}</span>
                <ArrowRight
                  size={15}
                  className="rtl:-scale-x-100 text-neutral-400 group-hover:text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all"
                />
              </Link>
            </div>
          </Reveal>

        </div>
      </div>

      {/* Smooth gradient transition into the TrustBar section */}
      <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-b from-transparent to-[#08090A] pointer-events-none" />
    </section>
  );
}
