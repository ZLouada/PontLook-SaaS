'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { usePathname } from 'next/navigation';

export default function Hero() {
  const dict = useDictionary();
  const pathname = usePathname() || '/en';
  const lang = pathname.startsWith('/ar') ? 'ar' : 'en';

  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-24 lg:pt-48 lg:pb-40 min-h-[90vh] flex flex-col justify-center">
      {/* Full-Bleed Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/skyline-bg.jpg"
          alt="GCC Skyline"
          fill
          className="object-cover"
          priority
        />
        {/* Soft gradient mask to fade the bottom into the page background */}
        <div 
          className="absolute inset-0 bg-background" 
          style={{ 
            maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 40%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 40%, black 100%)'
          }} 
        />
        {/* Duotone primary overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary mix-blend-multiply opacity-20" />
        {/* Secondary lightening overlay */}
        <div className="absolute inset-0 bg-primary-50 mix-blend-overlay opacity-40" />
        {/* Gradient edge fades for left/right */}
        <div className="absolute inset-y-0 start-0 w-1/4 bg-gradient-to-r from-background to-transparent opacity-80" />
        <div className="absolute inset-y-0 end-0 w-1/4 bg-gradient-to-l from-background to-transparent opacity-80" />
      </div>

      <div className="container-site relative z-10 mx-auto flex flex-col items-center text-center">
        <LazyMotion features={domAnimation}>
        {/* Text Content */}
        <div className="max-w-[850px] flex flex-col items-center">
          <m.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl lg:text-[76px] lg:leading-[1.05] drop-shadow-sm"
          >
            {dict.hero.headline}
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 text-lg text-slate-700 sm:text-xl max-w-[650px] leading-relaxed drop-shadow-sm font-medium"
          >
            {dict.hero.subtitle}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link href={`/${lang}/for-providers`} className="btn-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              {dict.hero.btn_provider}
            </Link>
            <Link href={`/${lang}/find-training`} className="btn-secondary border-transparent bg-white/60 backdrop-blur-md hover:bg-white hover:border-border text-slate-900 shadow-sm hover:shadow-md hover:-translate-y-0.5">
              {dict.hero.btn_buyer}
            </Link>
          </m.div>
        </div>
        </LazyMotion>
      </div>
    </section>
  );
}
