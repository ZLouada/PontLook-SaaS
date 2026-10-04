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
    ? 'من نحن | منصة PontLook للتوفيق والتدريب المؤسسي'
    : 'Who We Are | PontLook Corporate Training Matchmaking';
  const description = isAr
    ? 'تعرف على PontLook، المنصة المتخصصة في ربط مديري الموارد البشرية والشركات بأفضل مزودي التدريب المعتمدين في الخليج بدون رسوم اشتراك شهرية.'
    : 'Learn how PontLook bridges enterprise corporate buyers with vetted training providers across Saudi Arabia and the UAE with zero monthly retainers.';

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

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';

  return <WhoWeAreClient lang={lang} />;
}
