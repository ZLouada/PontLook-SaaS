import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import WhoWeAreClient from '@/components/who-we-are/WhoWeArePage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'من نحن | منصة بونت لوك للتوفيق والتدريب المؤسسي في الخليج'
    : 'Who We Are | Pontlook, the GCC Corporate Training Matchmaking Platform';
  const description = isAr
    ? 'تربط بونت لوك الشركات الخليجية التي تواجه تحديات حقيقية في كفاءة الموظفين بنخبة مزودي التدريب المعتمدين. بدون اشتراكات، دفع لكل فرصة مؤهلة فقط.'
    : 'Pontlook connects verified GCC companies facing real workforce challenges with pre-vetted corporate training providers. Zero retainers, pay per qualified lead.';

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
          url: '/hero-bridge.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: lang === 'ar' ? 'من نحن | بونت لوك' : 'Who We Are | Pontlook',
    description:
      lang === 'ar'
        ? 'بونت لوك هي منصة التوفيق الرائدة للتدريب المؤسسي في دول مجلس التعاون الخليجي.'
        : 'Pontlook is the leading corporate training matchmaking platform in the GCC.',
    url: `https://pontlook.com/${lang}/who-we-are`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Pontlook',
      legalName: 'Firstnestcare, LLC',
      url: 'https://pontlook.com',
      logo: 'https://pontlook.com/PontLook-Logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '31 Continental Dr',
        addressLocality: 'Newark',
        addressRegion: 'DE',
        postalCode: '19713',
        addressCountry: 'US',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WhoWeAreClient lang={lang} />
    </>
  );
}
