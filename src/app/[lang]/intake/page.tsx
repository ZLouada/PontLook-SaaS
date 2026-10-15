import React from 'react';
import type { Metadata } from 'next';
import { Locale, locales, getDictionary } from '@/i18n';
import { isArabicLocale, getCountryCode } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import LocalizedIntakeForm from '@/components/funnel/LocalizedIntakeForm';
import { ShieldCheck, Sparkles, Clock, CheckCircle2 } from '@/components/icons';

export async function generateStaticParams() {
  return (locales as readonly string[]).map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = isArabicLocale(lang);
  const country = getCountryCode(lang);

  const title =
    country === 'sa'
      ? isAr
        ? 'طلب التوفيق والتدريب المؤسسي المعتمد في السعودية (TVTC و هدف) | PontLook'
        : 'Saudi Arabia Corporate Training Matchmaking & TVTC/HRDF Intake | PontLook'
      : country === 'ae'
      ? isAr
        ? 'طلب التوفيق والتدريب المؤسسي المعتمد في الإمارات (KHDA و ACTVET) | PontLook'
        : 'UAE Corporate Training Matchmaking & KHDA/ACTVET Intake | PontLook'
      : isAr
      ? 'بوابة طلبات التدريب وتأهيل المزودين في الخليج | PontLook'
      : 'GCC Corporate Training Matchmaking & Provider Application | PontLook';

  const description =
    country === 'sa'
      ? isAr
        ? 'قدم متطلبات تدريب فريقك الهندسي في السعودية واحصل على 2-3 عروض أسعار من مزودين معتمدين من TVTC ومؤهلين لدعم هدف خلال 48 ساعة. خدمة مجانية 100% للشركات.'
        : 'Submit your Saudi engineering training cohort specifications and receive 2–3 tailored proposals from TVTC-accredited and HRDF-eligible providers in 48 hours. 100% free for buyers.'
      : country === 'ae'
      ? isAr
        ? 'قدم متطلبات تدريب الكوادر في الإمارات واحصل على 2-3 عروض أسعار من مزودين مرخصين من KHDA و ACTVET ومتوافقين مع نافس خلال 48 ساعة مجاناً.'
        : 'Submit your UAE corporate training requirements and receive 2–3 proposals from KHDA or ACTVET-licensed providers aligned with Nafis targets in 48 hours. 100% free for buyers.'
      : isAr
      ? 'اطرح متطلبات تدريب فريقك واستلم عروض أسعار تفصيلية من أفضل معاهد ومزودي التدريب المعتمدين بالخليج خلال 48 ساعة مجاناً.'
      : 'Connect with verified corporate training providers across Saudi Arabia and the UAE. Free matchmaking for buyers, zero retainers for accredited providers.';

  const ogLocale = isAr
    ? country === 'ae'
      ? 'ar_AE'
      : 'ar_SA'
    : country === 'ae'
    ? 'en_AE'
    : country === 'sa'
    ? 'en_SA'
    : 'en_US';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: constructAlternates(lang, 'intake'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/intake`,
      siteName: 'PontLook',
      locale: ogLocale,
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
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://pontlook.com/images/brand/og-main.png'],
    },
  };
}

export default async function IntakePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ role?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const role = resolvedSearch?.role === 'provider' ? 'provider' : 'buyer';
  const isAr = isArabicLocale(lang);
  const country = getCountryCode(lang);
  const tokens = {
    countryName: country === 'sa'
      ? (isAr ? 'المملكة العربية السعودية' : 'Saudi Arabia')
      : country === 'ae'
      ? (isAr ? 'الإمارات العربية المتحدة' : 'United Arab Emirates')
      : (isAr ? 'منطقة الخليج' : 'GCC Region'),
    countryCode: country ?? 'gcc',
    hubCities: country === 'sa'
      ? (isAr ? 'الرياض، جدة، الدمام' : 'Riyadh, Jeddah, Dammam')
      : country === 'ae'
      ? (isAr ? 'دبي، أبوظبي، الشارقة' : 'Dubai, Abu Dhabi, Sharjah')
      : (isAr ? 'الرياض، دبي، أبوظبي' : 'Riyadh, Dubai, Abu Dhabi'),
    mandatoryRegulators: country === 'sa'
      ? 'TVTC, HRDF (Hadaf) & SCE'
      : country === 'ae'
      ? 'KHDA (Dubai) & ACTVET / OSHAD (Abu Dhabi)'
      : 'TVTC, HRDF, KHDA, ACTVET',
    buyerCurrency: country === 'sa' ? 'SAR' : country === 'ae' ? 'AED' : 'USD',
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black font-sans pt-24 pb-28 px-4 sm:px-6 lg:px-8">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FF5C00]/5 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FF5C00]/30 bg-[#FF5C00]/10 text-[#FF5C00] text-xs font-mono font-medium tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {tokens?.countryName || 'GCC'} • {isAr ? 'بوابة التوفيق والاعتماد' : 'Verification & Matchmaking Desk'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {isAr
              ? tokens?.countryName
                ? `طلب التدريب المؤسسي المعتمد في ${tokens.countryName}`
                : 'طلب التدريب المؤسسي المعتمد للشركات'
              : tokens?.countryName
              ? `Verified Corporate Training Intake for ${tokens.countryName}`
              : 'Verified Corporate Training Intake & Matching'}
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'اطرح متطلبات مجموعتك التدريبية (10+ متدربين) واحصل على 2 إلى 3 عروض مفصلة من مزودين معتمدين ومرخصين خلال 48 ساعة بدون أي رسوم للمنشأة.'
              : 'Submit your enterprise cohort requirements (10+ learners) once. PontLook introduces you to 2–3 pre-vetted, accredited providers within 48 hours at zero cost.'}
          </p>
        </div>

        {/* Localized Intake Form Client Island */}
        <LocalizedIntakeForm
          lang={lang}
          initialRole={role}
          marketTokens={tokens}
        />

        {/* Verification Guarantee & Trust Points */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 max-w-4xl mx-auto border-t border-white/10 text-xs font-mono text-neutral-400">
          <div className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-neutral-900/30">
            <ShieldCheck className="w-5 h-5 text-[#FF5C00] shrink-0" />
            <div>
              <span className="text-white font-bold block">{isAr ? 'اعتمادات معلنة 100%' : '100% Accredited Only'}</span>
              <span>{isAr ? 'فحص التراخيص لدى الجهات التنظيمية' : 'Screened against TVTC, KHDA & ACTVET'}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-neutral-900/30">
            <Clock className="w-5 h-5 text-[#FF5C00] shrink-0" />
            <div>
              <span className="text-white font-bold block">{isAr ? 'تسليم العروض خلال 48 ساعة' : '48-Hour SLA Guarantee'}</span>
              <span>{isAr ? 'عروض أسعار مباشرة وقابلة للمقارنة' : '2–3 direct proposals delivered fast'}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-neutral-900/30">
            <CheckCircle2 className="w-5 h-5 text-[#FF5C00] shrink-0" />
            <div>
              <span className="text-white font-bold block">{isAr ? 'مجاني 100% للمنشآت' : '100% Free for Buyers'}</span>
              <span>{isAr ? 'بدون اشتراكات وبدون أي التزام تعاقدي' : 'Zero retainers or platform fees for HR'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
