import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates, providerIcons } from '@/lib/seo/metadata';
import { buildProviderNetworkSchema } from '@/lib/seo/schema';
import GccProviderHero from '@/components/providers/GccProviderHero';
import GccProviderStory from '@/components/providers/GccProviderStory';
import GccProviderReveal from '@/components/providers/GccProviderReveal';
import ProviderConnectionFlow from '@/components/providers/ProviderConnectionFlow';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'لمزودي التدريب | فرص وعملاء تدريب معتمدين للشركات | PontLook'
    : 'For Providers | GCC Corporate Training Matchmaking | PontLook';
  const description = isAr
    ? 'احصل على فرص تعاقد وتدريب معتمدة مع كبرى الشركات في السعودية والإمارات. بدون اشتراكات شهرية أو رسوم احتجاز، ادفع فقط مقابل كل عميل مهتم ومؤهل.'
    : 'Stop chasing companies. Match with verified corporate decision makers seeking training in the GCC. Zero retainers, 100% pay per qualified lead.';

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
      locale: isAr ? 'ar_SA' : 'en_US',
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
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function ForProvidersPage({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isAr = lang === 'ar';

  const providerSchema = buildProviderNetworkSchema({
    lang: isAr ? 'ar' : 'en',
    canonicalUrl: `https://pontlook.com/${lang}/for-providers`,
  });

  return (
    <div className="bg-[#05070D] min-h-screen text-[#E6ECF8] font-sans selection:bg-[#3D7BFF] selection:text-white">
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

      {/* 4. JOIN PROVIDER NETWORK CONNECTION FLOW & DIRECT APPLICATION TRIGGER */}
      <ProviderConnectionFlow lang={lang} />
    </div>
  );
}
