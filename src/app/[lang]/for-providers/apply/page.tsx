import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates, providerIcons } from '@/lib/seo/metadata';
import { buildProviderNetworkSchema } from '@/lib/seo/schema';
import ProviderApplicationWizard from '@/components/providers/ProviderApplicationWizard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'طلب الانضمام لشبكة مزودي التدريب | PontLook'
    : 'Apply to Join the Training Provider Network | PontLook';
  const description = isAr
    ? 'قدم طلب انضمام مؤسستك التدريبية لشبكة بونت لوك واستقبل فرصاً تدريبية مؤكدة من كبرى الشركات في السعودية والإمارات بدون اشتراكات دورية.'
    : 'Apply to join the PontLook provider network. Receive verified enterprise training demand from decision makers in Saudi Arabia and the UAE with zero retainers.';

  return {
    title: {
      absolute: title,
    },
    description,
    icons: providerIcons,
    alternates: constructAlternates(lang, 'for-providers/apply'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/for-providers/apply`,
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

export default async function ProviderApplyPage({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isAr = lang === 'ar';

  const providerSchema = buildProviderNetworkSchema({
    lang,
    canonicalUrl: `https://pontlook.com/${lang}/for-providers/apply`,
  });

  return (
    <div className="min-h-screen bg-black pt-24 sm:pt-28 pb-16 relative overflow-hidden">
      {/* Search Engine & Rich Snippets Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(providerSchema) }}
      />
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-white/[0.02] blur-3xl -z-10 rounded-full" />
      <div className="pointer-events-none absolute top-10 start-1/4 w-[350px] h-[350px] bg-white/[0.01] blur-3xl -z-10 rounded-full" />

      <ProviderApplicationWizard lang={lang} isAr={isAr} />
    </div>
  );
}
