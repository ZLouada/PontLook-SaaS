import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import { Locale, locales } from '@/i18n';
import { isArabicLocale, getCountryCode } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';

import DeferredHowItWorks from '@/components/home/DeferredHowItWorks';
import HowItWorksStatic from '@/components/home/HowItWorksStatic';
import DeferredWhyDifferent from '@/components/home/DeferredWhyDifferent';
import WhyDifferentStatic from '@/components/home/WhyDifferentStatic';
import ProviderTeaser from '@/components/home/ProviderTeaser';
import MarketOfferingSection from '@/components/shared/MarketOfferingSection';
import { getDictionary } from '@/i18n';

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
  const dict = await getDictionary(lang);

  const title = dict.hero?.headline
    ? `${dict.hero.headline} | PontLook`
    : isAr
    ? 'PontLook | منصة التوفيق بين مزودي التدريب والشركات'
    : 'PontLook | Corporate Training Matchmaking Platform';

  const description = dict.hero?.subtitle
    ? dict.hero.subtitle
    : isAr
    ? 'اربط شركتك بأفضل مزودي التدريب المعتمدين في السعودية والإمارات. فرص تدريب حقيقية ومؤهلة بنموذج الدفع مقابل النتائج وبدون رسوم اشتراك شهرية.'
    : 'PontLook connects enterprise HR leaders with verified corporate training providers across Saudi Arabia & UAE. Pay per qualified lead, no retainers.';

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
    title,
    description,
    alternates: constructAlternates(lang, ''),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}`,
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
          alt: 'PontLook Corporate Training Matchmaking Platform',
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero />
      <MarketOfferingSection lang={lang} dictionary={dict} />
      <DeferredHowItWorks fallback={<HowItWorksStatic lang={lang} dict={dict} />} />
      <DeferredWhyDifferent fallback={<WhyDifferentStatic lang={lang} dict={dict} />} />
      <ProviderTeaser lang={lang} dict={dict} />
    </>
  );
}
