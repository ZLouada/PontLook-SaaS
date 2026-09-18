import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
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
          url: '/og-image.png',
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

export default async function ProviderApplyPage({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isAr = lang === 'ar';

  return (
    <div className="min-h-screen bg-[#08090A] pt-24 sm:pt-28 pb-16 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-white/[0.02] blur-3xl -z-10 rounded-full" />
      <div className="pointer-events-none absolute top-10 start-1/4 w-[350px] h-[350px] bg-white/[0.01] blur-3xl -z-10 rounded-full" />

      <ProviderApplicationWizard lang={lang} isAr={isAr} />
    </div>
  );
}
