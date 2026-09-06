'use client';

import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { usePathname } from 'next/navigation';

export default function FinalCta() {
  const dict = useDictionary();
  const pathname = usePathname() || '/en';
  const lang = pathname.startsWith('/ar') ? 'ar' : 'en';

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-14 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-28 border-t border-slate-900">
      {/* Ambient glowing radial backlight */}
      <div className="absolute top-1/3 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-accent/20 blur-[140px] pointer-events-none rounded-full transform-gpu" />

      <div className="container-site relative z-10 px-4 sm:px-8 lg:px-12 mx-auto">
        {/* Giant Odysser-Style Watermark Brand Identity */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 lg:gap-8 select-none pointer-events-none mb-8 sm:mb-16 transform-gpu">
          <div className="relative h-12 w-12 xs:h-16 xs:w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 shrink-0 opacity-80 filter brightness-125">
            <Image
              src="/PontLook-Logo-White.png"
              alt="PontLook Brand"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight bg-gradient-to-b from-white/90 via-white/50 to-white/10 bg-clip-text text-transparent">
            PontLook
          </span>
        </div>

        {/* Floating Odysser Consultation Glass Card */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className="max-w-3xl mx-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-900/85 backdrop-blur-2xl p-5 sm:p-10 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-8 relative z-20 transform-gpu will-change-transform"
        >
          <div className="space-y-2 text-start max-w-lg">
            <h3 className="text-lg sm:text-2xl font-semibold text-white tracking-tight">
              {dict.final_cta?.card_title || 'Ready to discuss your training objectives?'}
            </h3>
            <p className="text-xs sm:text-base text-slate-400 font-normal leading-relaxed">
              {dict.final_cta?.card_subtitle || 'Connect directly with our enterprise advisory team to explore verified provider matching or discuss partnership opportunities across the GCC.'}
            </p>
          </div>

          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-100 text-slate-950 font-semibold px-6 sm:px-8 py-3.5 rounded-full text-sm sm:text-base min-h-[48px] shadow-xl hover:scale-105 active:scale-95 transition-all shrink-0 w-full sm:w-auto"
          >
            <span>{dict.final_cta?.btn_call || (lang === 'ar' ? 'احجز جلسة استشارية' : 'Book a consultation')}</span>
            <ArrowRight size={16} className="rtl:-scale-x-100" />
          </Link>
        </m.div>
      </div>
    </section>
  );
}
