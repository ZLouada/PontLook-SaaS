import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates, providerIcons } from '@/lib/seo/metadata';
import { buildProviderNetworkSchema } from '@/lib/seo/schema';
import ProviderHero from '@/components/providers/ProviderHero';
import ProviderMetricsRibbon from '@/components/providers/ProviderMetricsRibbon';
import ProviderProtocolBreakdown from '@/components/providers/ProviderProtocolBreakdown';
import ProviderLeadMatrix from '@/components/providers/ProviderLeadMatrix';
import ProviderIntakeTerminal from '@/components/providers/ProviderIntakeTerminal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'فرص وعملاء تدريب معتمدين للشركات | PontLook'
    : 'Direct Enterprise Training Procurement & Leads | PontLook';
  const description = isAr
    ? 'احصل على فرص تعاقد وتدريب معتمدة مع كبرى الشركات في السعودية والإمارات. بدون اشتراكات شهرية أو رسوم احتجاز، ادفع فقط مقابل كل عميل مهتم ومؤهل.'
    : 'Direct enterprise corporate training procurement in Saudi Arabia and the UAE. Verified C-level buyers, zero monthly retainers, 100% pay per qualified lead.';

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
          url: '/images/brand/og-providers.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/brand/og-providers.png'],
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
    <div className="bg-[#07090E] min-h-screen text-slate-100 selection:bg-sky-500 selection:text-black">
      {/* Search Engine & Rich Snippets Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(providerSchema) }}
      />

      {/* 1. HERO VIEWPORT & INTERACTIVE KNOWLEDGE GRAPH */}
      <ProviderHero lang={lang} />

      {/* 2. INSTITUTIONAL PROOF POINTS / METRICS RIBBON */}
      <ProviderMetricsRibbon isAr={isAr} />

      {/* 3. 3-PHASE PROTOCOL BREAKDOWN ARCHITECTURE */}
      <ProviderProtocolBreakdown isAr={isAr} />

      {/* 4. TECHNICAL LEAD TAXONOMY MATRIX */}
      <ProviderLeadMatrix isAr={isAr} />

      {/* 5. PROVIDER INTAKE & ONBOARDING TERMINAL */}
      <ProviderIntakeTerminal isAr={isAr} />
    </div>
  );
}
