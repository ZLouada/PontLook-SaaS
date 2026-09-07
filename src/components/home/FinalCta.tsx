'use client';

import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { usePathname } from 'next/navigation';

export default function FinalCta() {
  const dict = useDictionary();
  const pathname = usePathname() || '/en';
  const lang = pathname.startsWith('/ar') ? 'ar' : 'en';

  return (
    <section
      data-nav-dark="true"
      className="relative overflow-hidden bg-slate-950 text-white border-t border-white/10 pt-0 pb-16 sm:pb-20 lg:pb-24"
    >
      {/* Ambient glowing radial backlight */}
      <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#0052FF]/20 blur-[140px] pointer-events-none rounded-full transform-gpu" />

      {/* Top shadow gradient overlay blending into the horizon line */}
      <div className="absolute top-0 inset-x-0 h-6 sm:h-10 bg-gradient-to-b from-black/50 via-black/15 to-transparent pointer-events-none z-10" />

      {/* Horizon Logo + Wordmark Lockup (just a subtle portion peeking under the top border line) */}
      <div className="relative -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-5 overflow-hidden select-none pointer-events-none transform-gpu flex items-center justify-center">
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 px-4">
          {/* Logo Icon Mark */}
          <div className="relative w-16 h-16 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 flex-shrink-0">
            <Image
              src="/PontLook-Logo-White.png"
              alt="PontLook Logo Mark"
              fill
              className="object-contain drop-shadow-[0_0_35px_rgba(0,82,255,0.4)]"
              priority
            />
          </div>

          {/* Massive Gradient Wordmark */}
          <span className="text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white/95 via-white/60 to-white/10 leading-none">
            PontLook
          </span>
        </div>
      </div>

      <div className="container-site relative z-20 px-4 sm:px-8 lg:px-12 mx-auto">
        {/* Floating Odysser Consultation Card Centered in Front */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="relative z-20 -mt-2 sm:-mt-4 md:-mt-6 max-w-2xl mx-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0B132B]/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl text-center flex flex-col items-center gap-6 transform-gpu will-change-transform"
        >
          <div className="space-y-3 max-w-xl">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight">
              {dict.final_cta?.card_title || 'Ready to discuss your training objectives?'}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              {dict.final_cta?.card_subtitle ||
                'Connect directly with our enterprise advisory team to explore verified provider matching or discuss partnership opportunities across the GCC.'}
            </p>
          </div>

          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-100 text-slate-950 font-semibold px-8 py-3.5 rounded-full text-sm sm:text-base min-h-[48px] shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <span>{dict.final_cta?.btn_call || (lang === 'ar' ? 'احجز جلسة استشارية' : 'Book a consultation')}</span>
            <ArrowRight size={17} className="rtl:-scale-x-100" />
          </Link>
        </m.div>
      </div>
    </section>
  );
}
