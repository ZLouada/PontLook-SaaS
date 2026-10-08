import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import FindTrainingStepsCards from '@/components/find-training/FindTrainingStepsCards';
import BurjSkylineCanvas from '@/components/find-training/BurjSkylineCanvas';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'ابحث عن مزودي تدريب معتمدين لشركتك | PontLook'
    : 'Get 3 Curated Training Proposals | PontLook';
  const description = isAr
    ? 'اطرح متطلبات تدريب فريقك واستلم عروض أسعار تفصيلية من أفضل معاهد ومزودي التدريب المعتمدين بالخليج خلال 48 ساعة. خدمة مجانية 100% للشركات.'
    : 'Stop sifting through generic vendor catalogs. Submit your training requirements in 60 seconds and receive curated offers matched to your domain and region.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: constructAlternates(lang, 'find-training'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/find-training`,
      siteName: 'PontLook',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://pontlook.com/images/brand/og-main.png',
          secureUrl: 'https://pontlook.com/images/brand/og-main.png',
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function FindTrainingPage({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isAr = lang === 'ar';

  return (
    <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black font-sans">
      {/* ======================================================== */}
      {/* 1. HERO VIEWPORT: Two-Column Architecture + Burj Canvas */}
      {/* ======================================================== */}
      <section className="relative min-h-[100dvh] grid grid-cols-1 lg:grid-cols-12 items-stretch pt-[72px] sm:pt-[76px] border-b border-white/20">
        {/* Left Column: Mission Briefing */}
        <div className="lg:col-span-6 xl:col-span-5 px-5 sm:px-8 md:px-12 lg:px-14 py-12 sm:py-16 lg:py-24 flex flex-col justify-center text-start z-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              {isAr ? 'منظومة تدريب الشركات الخليجية' : 'GCC ENTERPRISE TRAINING INTAKE'}
            </span>
          </div>

          <h1 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl tracking-tight leading-[1.06] text-white">
            {isAr
              ? 'احصل على 3 عروض تدريبية مخصصة لتطوير كوادر منشأتك'
              : 'Get 3 curated training proposals for your workforce'}
          </h1>

          <p className="mt-6 sm:mt-8 text-neutral-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
            {isAr
              ? 'لا داعي للبحث اليدوي بين مئات الكتالوجات العامة. حدد متطلباتك التدريبية في 60 ثانية، وسنصلك بأفضل مزودي التدريب المعتمدين وفق متطلباتك الدقيقة وبدون أي التزام.'
              : 'Stop sifting through generic vendor catalogs. Submit your training requirements in 60 seconds and we introduce you only to proven providers matched to your domain and region.'}
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <Link
              href={`/${lang}/find-training/request`}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-semibold text-xs sm:text-sm tracking-wide rounded-none border border-white hover:bg-black hover:text-white transition-all duration-200"
            >
              <span>{isAr ? 'طلب عروض التدريب' : 'Request training proposals'}</span>
            </Link>

            <a
              href="#how"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent text-white font-medium text-xs sm:text-sm tracking-wide rounded-none border border-white/40 hover:border-white hover:bg-white/10 transition-all duration-200"
            >
              <span>{isAr ? 'كيف تعمل المنصة' : 'How matchmaking works'}</span>
            </a>
          </div>

          <div className="mt-10 sm:mt-12 pt-6 border-t border-white/10 flex items-center gap-6 text-xs font-mono text-neutral-400">
            <div>
              <span className="text-white font-bold block text-sm">60s</span>
              <span>{isAr ? 'وقت التقديم' : 'Intake time'}</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-white font-bold block text-sm">100%</span>
              <span>{isAr ? 'مجاني للشركات' : 'Free for buyers'}</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-white font-bold block text-sm">48h</span>
              <span>{isAr ? 'مهلة التسليم' : 'Delivery SLA'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Monochrome Burj Al Arab & Dubai Skyline Canvas */}
        <div className="lg:col-span-6 xl:col-span-7 relative border-t lg:border-t-0 ltr:lg:border-s rtl:lg:border-e border-white/20 min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex items-stretch">
          <BurjSkylineCanvas isAr={isAr} className="w-full h-full" />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. THREE STEPS: White Holographic 3D Kinetic Cubes Cards */}
      {/* ======================================================== */}
      <section id="how" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16 border-b border-white/20">
        <div className="max-w-7xl mx-auto">
          <FindTrainingStepsCards lang={lang} />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. METRICS BAND: High-Contrast Monospace Proof Points     */}
      {/* ======================================================== */}
      <section className="bg-black text-white border-b border-white/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3">
          {/* Proof 1 */}
          <div className="px-6 sm:px-10 py-12 sm:py-16 md:py-20 border-b md:border-b-0 ltr:md:border-r rtl:md:border-l border-white/20">
            <b className="font-heading font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none block text-white">
              48h
            </b>
            <span className="font-sans text-sm sm:text-base text-neutral-300 mt-4 block uppercase tracking-wider">
              {isAr ? 'مهلة تسليم العروض المعتمدة' : 'Proposal delivery window'}
            </span>
          </div>

          {/* Proof 2 */}
          <div className="px-6 sm:px-10 py-12 sm:py-16 md:py-20 border-b md:border-b-0 ltr:md:border-r rtl:md:border-l border-white/20">
            <b className="font-heading font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none block text-white">
              2–3
            </b>
            <span className="font-sans text-sm sm:text-base text-neutral-300 mt-4 block uppercase tracking-wider">
              {isAr ? 'عروض مخصصة ومدققة لكل طلب' : 'Curated, itemized offers'}
            </span>
          </div>

          {/* Proof 3 */}
          <div className="px-6 sm:px-10 py-12 sm:py-16 md:py-20">
            <b className="font-heading font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none block text-white">
              100%
            </b>
            <span className="font-sans text-sm sm:text-base text-neutral-300 mt-4 block uppercase tracking-wider">
              {isAr ? 'مجاني بالكامل للشركات والمؤسسات' : 'Free for enterprise buyers'}
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. CALL TO ACTION: Enterprise Up-skill Concierge         */}
      {/* ======================================================== */}
      <section className="py-24 sm:py-32 lg:py-36 px-4 sm:px-8 text-center bg-black">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 px-3 py-1 border border-white/20 inline-block mb-6">
            {isAr ? 'تأهيل الكفاءات المؤسسية' : 'ENTERPRISE SCOPE'}
          </span>

          <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white mb-6">
            {isAr ? 'جاهز لتطوير كوادر منشأتك؟' : 'Ready to upskill your workforce?'}
          </h2>

          <p className="font-sans text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {isAr
              ? 'اطرح متطلبات تدريب فريقك واستلم عروض أسعار تفصيلية من أفضل معاهد ومزودي التدريب المعتمدين بالخليج خلال 48 ساعة.'
              : 'Submit your training requirements in 60 seconds. Our matching concierge connects you with accredited providers across the GCC.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${lang}/find-training/request`}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold text-sm tracking-wide rounded-none border border-white hover:bg-black hover:text-white transition-all duration-200"
            >
              <span>{isAr ? 'طلب عروض التدريب' : 'Request training proposals'}</span>
            </Link>

            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-medium text-sm tracking-wide rounded-none border border-white/40 hover:border-white hover:bg-white/10 transition-all duration-200"
            >
              <span>{isAr ? 'حجز جلسة استشارية' : 'Book a consultation'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
