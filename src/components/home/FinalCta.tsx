'use client';

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
      className="relative overflow-hidden bg-[#000000] text-neutral-400 border-t border-[#1A1A1A] pt-0 pb-16 sm:pb-20 lg:pb-24"
    >
      {/* Ambient glowing radial backlight */}
      <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[850px] h-[360px] bg-gradient-to-b from-blue-600/[0.08] to-transparent blur-[140px] pointer-events-none rounded-full transform-gpu" />

      {/* Top shadow gradient overlay blending into the horizon line */}
      <div className="absolute top-0 inset-x-0 h-6 sm:h-10 bg-gradient-to-b from-[#000000] via-[#000000]/60 to-transparent pointer-events-none z-10" />

      {/* Horizon Wordmark */}
      <div className="relative -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-5 overflow-hidden select-none pointer-events-none transform-gpu flex items-center justify-center">
        <div className="flex items-center justify-center px-4">
          <span className="text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-bold tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/30 to-white/0 leading-none font-sans">
            PontLook
          </span>
        </div>
      </div>

      <div className="container-site relative z-20 px-4 sm:px-8 lg:px-12 mx-auto">
        {/* Floating Consultation Card Centered in Front */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="relative z-10 -mt-10 max-w-2xl mx-auto rounded-2xl sm:rounded-3xl border border-white/10 hover:border-white/20 bg-[#0A0A0A]/95 backdrop-blur-2xl p-8 md:p-10 shadow-[0_24px_64px_rgba(0,0,0,0.9)] text-center flex flex-col items-center gap-6 transform-gpu transition-all duration-300"
        >
          {/* Subtle top inner sheen */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-3 max-w-xl">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight font-heading">
              {dict.final_cta?.card_title || 'Ready to discuss your training objectives?'}
            </h3>
            <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed font-sans">
              {dict.final_cta?.card_subtitle ||
                'Connect directly with our enterprise advisory team to explore verified provider matching or discuss partnership opportunities across the region.'}
            </p>
          </div>

          <Link
            href={`/${lang}/contact`}
            className="relative z-10 inline-flex items-center justify-center gap-2.5 bg-white hover:bg-neutral-200 text-black font-semibold px-8 py-3.5 rounded-full text-sm sm:text-base min-h-[48px] shadow-lg shadow-white/5 hover:scale-105 active:scale-95 transition-all group"
          >
            <span>{dict.final_cta?.btn_call || (lang === 'ar' ? 'احجز استشارة' : 'Book a consultation')}</span>
            <ArrowRight size={17} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </m.div>
      </div>
    </section>
  );
}
