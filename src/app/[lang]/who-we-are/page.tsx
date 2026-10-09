import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import RaceBridgeCanvas from '@/components/who-we-are/RaceBridgeCanvas';
import BilateralCables from '@/components/who-we-are/BilateralCables';
import RoadmapTabs from '@/components/who-we-are/RoadmapTabs';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'من نحن | منصة PontLook للتوفيق والتدريب المؤسسي'
    : 'Who We Are | PontLook Corporate Training Matchmaking';
  const description = isAr
    ? 'تعرف على PontLook، المنصة المتخصصة في ربط مديري الموارد البشرية والشركات بأفضل مزودي التدريب المعتمدين في الخليج بدون رسوم اشتراك شهرية.'
    : 'Learn how PontLook bridges enterprise corporate buyers with vetted training providers across Saudi Arabia and the UAE with zero monthly retainers.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: constructAlternates(lang, 'who-we-are'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/who-we-are`,
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

export default async function WhoWeArePage({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isAr = lang === 'ar';

  return (
    <div
      data-nav-light="true"
      style={
        {
          '--k': '#000000',
          '--w': '#ffffff',
        } as React.CSSProperties
      }
      className="bg-white text-black min-h-screen selection:bg-black selection:text-white font-sans overflow-x-hidden"
    >
      {/* ======================================================== */}
      {/* 1. HERO VIEWPORT: Two Routes. One Destination.           */}
      {/* ======================================================== */}
      <section className="pt-28 sm:pt-36 lg:pt-40 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500 mb-3 sm:mb-4">
          {isAr ? 'مساران. وجهة واحدة.' : 'TWO ROUTES. ONE DESTINATION.'}
        </div>
        <h1 className="font-heading font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-black max-w-5xl">
          {isAr ? 'نفس نقطة البداية. مسار مختلف تماماً.' : 'Same starting point. A different way forward.'}
        </h1>
      </section>

      {/* Interactive Race Bridge Canvas Box (#cw) */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto mt-6 sm:mt-8">
        <div className="border-[1.5px] border-black bg-white overflow-hidden shadow-xs">
          <RaceBridgeCanvas isAr={isAr} />
        </div>
      </div>

      {/* Hero Footnote & Primary CTA Actions (.hn) */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto py-5 sm:py-6 pb-16 sm:pb-24 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <small className="text-xs sm:text-sm text-neutral-600 max-w-lg leading-relaxed font-normal">
          {isAr
            ? '* ٣–٥ أيام هو متوسط الفترة الزمنية من تكليف المنشأة حتى التقديم التنفيذي عبر PontLook. انقر على السباق لإعادة تشغيله.'
            : '* 3–5 days is the average timeframe from corporate mandate to executive introduction with PontLook. Click the race to replay it.'}
        </small>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <Link
            href={`/${lang}/find-training`}
            className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-black text-white text-xs sm:text-sm font-semibold tracking-wide border-[1.5px] border-black hover:bg-white hover:text-black transition-colors duration-200"
          >
            {isAr ? 'ابحث عن شريكك التدريبي' : 'Find your match'}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-black text-xs sm:text-sm font-semibold tracking-wide border-[1.5px] border-black hover:bg-black hover:text-white transition-colors duration-200"
          >
            {isAr ? 'احجز مكالمة استكشافية' : 'Book a discovery call'}
          </Link>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. BILATERAL VALUE ARCHITECTURE & SPECIFICATION CARDS   */}
      {/* ======================================================== */}
      <section className="border-t border-black py-16 sm:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
        <BilateralCables isAr={isAr} />
      </section>

      {/* ======================================================== */}
      {/* 3. 4-STAGE OPERATIONAL ROADMAP                            */}
      {/* ======================================================== */}
      <section className="border-t border-black py-16 sm:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
        <RoadmapTabs isAr={isAr} />
      </section>

      {/* ======================================================== */}
      {/* 4. OUR GUARANTEE (Inverted Monochrome Box)              */}
      {/* ======================================================== */}
      <section
        data-nav-dark="true"
        className="bg-black text-white py-20 sm:py-28 lg:py-36 border-t border-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-400 mb-3 sm:mb-4">
            {isAr ? 'ضماننا' : 'OUR GUARANTEE'}
          </div>
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white mb-4 sm:mb-6">
            {isAr ? 'وعدنا لك' : 'Our promise'}
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed mb-8 sm:mb-12">
            {isAr
              ? 'نسلمك صناع قرار موثوقين في الشركات مع احتياج تدريبي مؤسسي مؤكد.'
              : 'We deliver verified enterprise decision makers with a confirmed corporate training need.'}
          </p>

          <div className="font-heading font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white my-8 sm:my-14">
            {isAr ? (
              <>
                بدون اشتراك شهري.
                <br />
                بدون أي مخاطرة.
              </>
            ) : (
              <>
                No retainer.
                <br />
                No risk.
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
            <Link
              href={`/${lang}/for-providers`}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black text-xs sm:text-sm font-semibold tracking-wide border-[1.5px] border-white hover:bg-black hover:text-white transition-colors duration-200"
            >
              {isAr ? 'ابدأ باستقبال الفرص المؤهلة' : 'Start receiving qualified leads'}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent text-white text-xs sm:text-sm font-semibold tracking-wide border-[1.5px] border-white hover:bg-white hover:text-black transition-colors duration-200"
            >
              {isAr ? 'احجز مكالمة استكشافية' : 'Book a discovery call'}
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. ENTERPRISE CONSULTATION CTA                           */}
      {/* ======================================================== */}
      <section
        data-nav-light="true"
        className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 md:px-10 lg:px-16 max-w-4xl mx-auto text-center border-b border-black"
      >
        <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-black mb-4 sm:mb-6">
          {isAr ? 'جاهز لمناقشة أهداف التدريب المؤسسي؟' : 'Ready to discuss your training objectives?'}
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal">
          {isAr
            ? 'تواصل مباشرة مع فريقنا الاستشاري لاستكشاف المطابقة مع مزودين معتمدين أو مناقشة فرص الشراكة في المنطقة.'
            : 'Connect directly with our enterprise advisory team to explore verified provider matching or discuss partnership opportunities across the region.'}
        </p>
        <Link
          href={`/${lang}/contact`}
          className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 bg-black text-white text-xs sm:text-sm font-semibold tracking-wide border-[1.5px] border-black hover:bg-white hover:text-black transition-colors duration-200"
        >
          {isAr ? 'احجز استشارة مجانية' : 'Book a consultation'}
        </Link>
      </section>
    </div>
  );
}
