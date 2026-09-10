import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';

const HowItWorks = dynamic(() => import('@/components/home/HowItWorks'));
const WhyDifferent = dynamic(() => import('@/components/home/WhyDifferent'));
const ProviderTeaser = dynamic(() => import('@/components/home/ProviderTeaser'));

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  return {
    title: isAr
      ? 'PontLook | منصة التوفيق بين مزودي التدريب والشركات'
      : 'PontLook | Corporate Training Matchmaking Platform',
    description: isAr
      ? 'اربط شركتك بأفضل مزودي التدريب المعتمدين في السعودية والإمارات. فرص تدريب حقيقية ومؤهلة بنموذج الدفع مقابل النتائج وبدون رسوم اشتراك شهرية.'
      : 'PontLook connects enterprise HR leaders with verified corporate training providers across Saudi Arabia & UAE. Pay-per-qualified lead with zero retainers.',
    alternates: constructAlternates(lang, ''),
    openGraph: {
      title: isAr
        ? 'PontLook | منصة التوفيق بين مزودي التدريب والشركات'
        : 'PontLook | Corporate Training Matchmaking Platform',
      description: isAr
        ? 'اربط شركتك بأفضل مزودي التدريب المعتمدين في السعودية والإمارات. فرص تدريب حقيقية ومؤهلة بنموذج الدفع مقابل النتائج وبدون رسوم اشتراك شهرية.'
        : 'PontLook connects enterprise HR leaders with verified corporate training providers across Saudi Arabia & UAE. Pay-per-qualified lead with zero retainers.',
      url: `https://pontlook.com/${lang}`,
      siteName: 'PontLook',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'PontLook Corporate Training Matchmaking Platform',
        },
      ],
    },
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <WhyDifferent />
      <ProviderTeaser />
    </>
  );
}
