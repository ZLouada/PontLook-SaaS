'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { ArrowRight, Sparkles } from '@/components/icons';
import { m } from 'framer-motion';
import TextReveal from '@/components/shared/TextReveal';
import WordRotate from '@/components/shared/WordRotate';
import NeuralGridBackground from '@/components/shared/NeuralGridBackground';
import Magnetic from '@/components/shared/Magnetic';
import { fadeUp, dur, ease } from '@/lib/motion';

export default function Hero() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

  const capabilityWords = isAr
    ? [
        'القيادة التنفيذية الاستراتيجية',
        'التحول الرقمي والذكاء الاصطناعي',
        'المبيعات والتفاوض التجاري',
        'الحوكمة والمخاطر والالتزام',
        'الأمن السيبراني والبنية التقنية',
      ]
    : [
        'Executive Leadership & Strategy',
        'AI & Digital Transformation',
        'Strategic B2B Sales & Negotiation',
        'Governance, Risk & Compliance',
        'Cybersecurity & Tech Infrastructure',
      ];

  return (
    <section
      data-nav-dark="true"
      className="relative overflow-hidden bg-black text-white min-h-[calc(100vh-4rem)] sm:min-h-screen flex flex-col justify-center pt-24 pb-12 sm:pt-36 sm:pb-24"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/60" />

        {/* grain overlay */}
        <div className="absolute inset-0 grain pointer-events-none" />

        {/* ambient glow */}
        <div className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/[0.03] blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 end-1/4 w-[500px] h-[500px] bg-orange-500/[0.04] blur-[150px] rounded-full pointer-events-none" />

        {/* interactive neural constellation matrix */}
        <NeuralGridBackground className="z-0 opacity-60" gridSize={36} interactiveRadius={180} />
      </div>

      <div className="container-site relative z-10 mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 w-full max-w-5xl">
        <div className="flex flex-col items-start text-start">
          
          {/* Eyebrow badge with glowing Sparkles icon */}
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: ease.out }}
            className="mb-4 sm:mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16171B]/90 border border-white/15 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_0_20px_rgba(255,255,255,0.04)]"
          >
            <Sparkles size={14} className="text-amber-400 animate-pulse" />
            <span className="text-xs font-medium text-neutral-300">
              {isAr ? 'منصة التوفيق المؤسسي المعتمدة في الخليج' : 'Verified GCC Corporate Training Matchmaking'}
            </span>
          </m.div>

          {/* hero headline */}
          <TextReveal
            as="h1"
            text={dict.hero.headline}
            onScroll={false}
            className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.15] font-heading max-w-4xl"
          />

          {/* hero subtitle */}
          <p className="mt-4 sm:mt-5 text-sm xs:text-base sm:text-lg md:text-xl text-neutral-400 font-sans leading-relaxed max-w-3xl">
            {dict.hero.subtitle}
          </p>

          {/* Dynamic rotating words sub-headline */}
          <m.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: ease.out }}
            className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 text-xs sm:text-sm md:text-base text-neutral-400 font-sans"
          >
            <span>{isAr ? 'عروض تدريبية معتمدة في' : 'Enterprise capability solutions in'}</span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <WordRotate words={capabilityWords} />
            </span>
          </m.div>

          {/* Side CTAs (Linear layout) */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.35, duration: dur.slow, ease: ease.out }}
            className="mt-6 sm:mt-10 flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 sm:gap-4 w-full"
          >
            <Magnetic strength={0.22} activeDistance={40} className="w-full xs:w-auto">
              <Link
                href={`/${lang}/for-providers`}
                className="w-full xs:w-auto inline-flex items-center justify-center gap-2.5 py-3 sm:py-3.5 px-6 sm:px-7 rounded-full bg-gradient-to-r from-white/[0.08] to-white/[0.03] hover:from-white/[0.14] hover:to-white/[0.08] text-white font-medium text-sm sm:text-base border border-white/15 hover:border-white/35 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_8px_30px_rgba(255,255,255,0.1)] active:scale-[0.98] transition-all duration-200 group sheen"
              >
                <span>{isAr ? 'انضم إلى شبكتنا' : 'Join the network'}</span>
                <ArrowRight
                  size={16}
                  className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                />
              </Link>
            </Magnetic>

            <Magnetic strength={0.22} activeDistance={40} className="w-full xs:w-auto">
              <Link
                href={`/${lang}/who-we-are`}
                className="w-full xs:w-auto inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 px-6 sm:px-7 rounded-full bg-transparent hover:bg-white/[0.08] text-neutral-300 hover:text-white font-medium text-sm sm:text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] transition-all duration-200 group"
              >
                <span>{isAr ? 'من نحن' : 'Who we are'}</span>
                <ArrowRight
                  size={15}
                  className="rtl:-scale-x-100 text-neutral-400 group-hover:text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all"
                />
              </Link>
            </Magnetic>
          </m.div>

        </div>
      </div>

      {/* gradient transition into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </section>
  );
}
