import type { Metadata } from 'next';
import { Locale, locales, getDictionary } from '@/i18n';
import { isArabicLocale, getCountryCode } from '@/i18n/config';
import { constructAlternates, providerIcons } from '@/lib/seo/metadata';
import { buildProviderNetworkSchema } from '@/lib/seo/schema';
import GccProviderHero from '@/components/providers/GccProviderHero';
import GccProviderStory from '@/components/providers/GccProviderStory';
import GccProviderReveal from '@/components/providers/GccProviderReveal';
import ProviderConnectionFlow from '@/components/providers/ProviderConnectionFlow';
import MarketOfferingSection from '@/components/shared/MarketOfferingSection';

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

  const title = dict.forProviders?.headline
    ? `${dict.forProviders.headline} | PontLook`
    : isAr
    ? 'لمزودي التدريب | فرص وعملاء تدريب معتمدين للشركات | PontLook'
    : 'For Providers | GCC Corporate Training Matchmaking | PontLook';

  const description = dict.forProviders?.subtitle
    ? dict.forProviders.subtitle
    : isAr
    ? 'احصل على فرص تعاقد وتدريب معتمدة مع كبرى الشركات في السعودية والإمارات. بدون اشتراكات شهرية أو رسوم احتجاز، ادفع فقط مقابل كل عميل مهتم ومؤهل.'
    : 'Stop chasing companies. Match with verified corporate decision makers seeking training in the GCC. Zero retainers, 100% pay per qualified lead.';

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
    icons: providerIcons,
    alternates: constructAlternates(lang, 'for-providers'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/for-providers`,
      siteName: 'PontLook',
      locale: ogLocale,
      type: 'website',
      images: [
        {
          url: 'https://pontlook.com/images/brand/og-providers.png',
          secureUrl: 'https://pontlook.com/images/brand/og-providers.png',
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
      images: ['https://pontlook.com/images/brand/og-providers.png'],
    },
  };
}

export async function generateStaticParams() {
  return (locales as readonly string[]).map((lang) => ({ lang }));
}

export default async function ForProvidersPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = isArabicLocale(lang);
  const dict = await getDictionary(lang);

  const providerSchema = buildProviderNetworkSchema({
    lang: isAr ? 'ar' : 'en',
    canonicalUrl: `https://pontlook.com/${lang}/for-providers`,
  });

  return (
    <div className="bg-[#05070D] min-h-screen text-[#E6ECF8] font-sans selection:bg-[#3D7BFF] selection:text-white touch-pan-y">
      {/* Search Engine & Rich Snippets Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(providerSchema) }}
      />

      {/* 1. HERO PINNED 3D CANVAS & LEAD REVEAL */}
      <GccProviderHero isAr={isAr} />

      {/* 2. PINNED ABCD STORY NARRATIVE & MORPHING BLUEPRINT PANEL */}
      <GccProviderStory isAr={isAr} />

      {/* 3. WHITE CONTRAST CHARACTER-BY-CHARACTER REVEAL & PIPELINE TOGGLE */}
      <GccProviderReveal isAr={isAr} />

      {/* 4. GEO-LOCALIZED 10-FIELD LEAD DOSSIER & UNIT ECONOMICS */}
      <MarketOfferingSection lang={lang} dictionary={dict} showProviderPricing={true} />

      {/* 5. JOIN PROVIDER NETWORK CONNECTION FLOW & DIRECT APPLICATION TRIGGER */}
      <ProviderConnectionFlow lang={lang} />
    </div>
  );
}
