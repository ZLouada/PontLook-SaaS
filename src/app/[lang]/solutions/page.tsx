import React from 'react';
import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/seo/schema';
import SolutionsHero from '@/components/solutions/SolutionsHero';
import SolutionsExtensions from '@/components/solutions/SolutionsExtensions';
import SolutionsBreakdown from '@/components/solutions/SolutionsBreakdown';
import SolutionsArchitecture from '@/components/solutions/SolutionsArchitecture';
import SolutionsCompliance from '@/components/solutions/SolutionsCompliance';
import SolutionsFaq from '@/components/solutions/SolutionsFaq';
import SolutionsCta from '@/components/solutions/SolutionsCta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'حلول ومنظومة مطابقة التدريب المؤسسي | PontLook'
    : 'Corporate Training Matchmaking Solutions & Architecture | PontLook';
  const description = isAr
    ? 'تعرف على الهيكلية المتكاملة لمنظومة PontLook لمطابقة التدريب المؤسسي في الخليج، والمسارات التخصصية للمنشآت ومزودي التدريب المعتمدين.'
    : 'Explore PontLook’s bilateral corporate training matchmaking architecture. Synchronizing enterprise workforce skill gaps with verified training providers across Saudi Arabia and the UAE.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: constructAlternates(lang, 'solutions'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/solutions`,
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
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://pontlook.com/images/brand/og-main.png'],
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isAr = lang === 'ar';

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', url: `https://pontlook.com/${lang}` },
    { name: isAr ? 'الحلول' : 'Solutions', url: `https://pontlook.com/${lang}/solutions` },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isAr ? 'منظومة مطابقة التدريب المؤسسي' : 'B2B Corporate Training Matchmaking Platform',
    provider: {
      '@type': 'Organization',
      name: 'PontLook',
      url: 'https://pontlook.com',
    },
    serviceType: 'Corporate Training Procurement & Matchmaking',
    areaServed: ['Saudi Arabia', 'United Arab Emirates', 'GCC'],
    description: isAr
      ? 'منصة مطابقة ثنائية تربط بين الاحتياجات المهارية للشركات ونخبة معاهد ومزودي التدريب المعتمدين.'
      : 'Bilateral matchmaking platform synchronizing enterprise skill demands with accredited training providers.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Matchmaking Extension Tracks',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isAr ? 'مسار الشركات والموارد البشرية' : 'Enterprise Sourcing Track',
            url: `https://pontlook.com/${lang}/find-training`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isAr ? 'مسار مزودي التدريب والأكاديميات' : 'Training Provider Track',
            url: `https://pontlook.com/${lang}/for-providers`,
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black font-sans overflow-x-hidden">
        {/* 1. Hero Viewport */}
        <SolutionsHero lang={lang} isAr={isAr} />

        {/* 2. The Core Request: Specialized Extensions (Enterprise & Provider Tracks) */}
        <SolutionsExtensions lang={lang} isAr={isAr} />

        {/* 3. The Market Breakdown & Objective Benchmark Matrix */}
        <SolutionsBreakdown lang={lang} isAr={isAr} />

        {/* 4. 4-Stage Matchmaking Engine Architecture */}
        <SolutionsArchitecture lang={lang} isAr={isAr} />

        {/* 5. Sovereign GCC Compliance & Privacy Framework */}
        <SolutionsCompliance lang={lang} isAr={isAr} />

        {/* 6. Frequently Asked Questions */}
        <SolutionsFaq lang={lang} isAr={isAr} />

        {/* 7. Dual-Track Closing CTA */}
        <SolutionsCta lang={lang} isAr={isAr} />
      </div>
    </>
  );
}
