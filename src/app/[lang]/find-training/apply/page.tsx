import type { Metadata } from 'next';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import FindTrainingRequestPage from '../request/page';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'طلب عروض تدريبية مخصصة للشركات | PontLook'
    : 'Request Corporate Training Proposals | PontLook';
  const description = isAr
    ? 'اطرح متطلبات تدريب فريقك واستلم عروض أسعار تفصيلية من أفضل معاهد ومزودي التدريب المعتمدين بالخليج خلال 48 ساعة. خدمة مجانية 100% للشركات.'
    : 'Submit your corporate training RFP and receive 2 to 3 matched proposals from vetted training providers in 48 hours. 100% free for enterprise buyers.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: constructAlternates(lang, 'find-training/apply'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/find-training/apply`,
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

export default FindTrainingRequestPage;
