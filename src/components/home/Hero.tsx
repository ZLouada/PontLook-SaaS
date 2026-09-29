'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { ArrowRight } from '@/components/icons';
import { m } from 'framer-motion';
import TextReveal from '@/components/shared/TextReveal';
import { fadeUp, dur, ease } from '@/lib/motion';

export default function Hero() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

  return (
    <section
      data-nav-dark="true"
      className="relative overflow-hidden bg-[#08090A] text-white min-h-[calc(100vh-4rem)] sm:min-h-screen flex flex-col justify-center pt-24 pb-12 sm:pt-36 sm:pb-24"
    >
      {/* background image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <div className="absolute inset-0 ken-burns">
          <Image
            src="/hero-bridge.png"
            alt="PontLook Bridge Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* vignette & gradient overlays */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35 rtl:bg-gradient-to-l rtl:from-black/85 rtl:via-black/60 rtl:to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-black/25 to-black/60" />

        {/* grain overlay */}
        <div className="absolute inset-0 grain pointer-events-none" />

        {/* ambient glow */}
        <div className="absolute top-1/2 end-1/4 w-[500px] h-[500px] bg-amber-500/[0.04] blur-[150px] rounded-full" />
      </div>

      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-5xl">
        <div className="flex flex-col items-center text-center">
          
          {/* hero headline */}
          <TextReveal
            as="h1"
            text={dict.hero.headline}
            onScroll={false}
            className="display max-w-4xl mx-auto px-2"
          />

          {/* CTAs */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.35, duration: dur.slow, ease: ease.out }}
            className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto"
          >
            <Link
              href={`/${lang}/for-providers`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-3 sm:py-3.5 px-6 sm:px-7 rounded-full bg-white/[0.05] hover:bg-white/[0.10] text-white font-medium text-sm sm:text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-sm active:scale-[0.98] transition-all duration-200 group sheen"
            >
              <span>{isAr ? 'انضم إلى شبكتنا' : 'Join the network'}</span>
              <ArrowRight
                size={16}
                className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
              />
            </Link>

            <Link
              href={`/${lang}/who-we-are`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 px-6 sm:px-7 rounded-full bg-transparent hover:bg-white/[0.08] text-neutral-300 hover:text-white font-medium text-sm sm:text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md transition-all duration-200 group"
            >
              <span>{isAr ? 'من نحن' : 'Who we are'}</span>
              <ArrowRight
                size={15}
                className="rtl:-scale-x-100 text-neutral-400 group-hover:text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all"
              />
            </Link>
          </m.div>

        </div>
      </div>

      {/* gradient transition into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-b from-transparent to-[#08090A] pointer-events-none" />
    </section>
  );
}
