import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import { ArrowRight } from 'lucide-react';

import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import WhoWeAreSections from '@/components/who-we-are/WhoWeAreSections';

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

export default async function WhoWeArePage({ params }: { params: Promise<{ lang: Locale }> | { lang: Locale } }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isAr = lang === 'ar';

  return (
    <>
      {/* Hero Section */}
      <section className="bg-hero-gradient min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center items-center pt-28 sm:pt-36 pb-16 sm:pb-24 relative overflow-hidden">
        {/* Ambient Depth Glows */}
        <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-blue-500/10 via-primary/5 to-blue-500/10 blur-3xl -z-10 rounded-full" />
        <div className="pointer-events-none absolute top-10 start-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-3xl -z-10 rounded-full" />

        <div className="container-site max-w-4xl relative z-10 text-center mx-auto px-6 my-auto -translate-y-2 sm:-translate-y-4">
          <Reveal className="flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-5 shadow-xs">
              {isAr ? 'من نحن' : 'Who We Are'}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-semibold text-slate-900 leading-[1.15] sm:leading-[1.1] font-heading tracking-tight">
              {isAr ? (
                <>
                  من نحن: منصة التوفيق والربط الرائدة <br className="hidden sm:inline" />
                  لتدريب الشركات في <span className="text-primary font-bold">المنطقة</span>
                </>
              ) : (
                <>
                  Who We Are: The Corporate Training <br className="hidden sm:inline" />
                  <span className="text-primary font-bold">Matchmaking Platform</span>
                </>
              )}
            </h1>
            <p className="mt-5 text-base sm:text-xl leading-relaxed text-slate-600 max-w-2xl sm:max-w-3xl mx-auto font-normal">
              {isAr
                ? 'نربط شركات ومزودي التدريب بصناع القرار في كبرى المؤسسات الذين لديهم احتياجات وتحديات حقيقية يسعون لحلها.'
                : 'We connect corporate training companies with enterprise decision makers who already have a real workforce challenge to solve.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Narrative Flow:
          • Section 2: Mission & Split Card Comparison Engine
          • Section 3: Value Model & Bilateral Alignment
          • Section 4: The End to End Training Journey */}
      <WhoWeAreSections lang={lang} />

      {/* Bottom CTA / Guarantee Section */}
      <section className="bg-gradient-to-b from-white to-blue-50/40 py-24 sm:py-32 border-t border-slate-200/80 relative overflow-hidden">
        <div className="container-site max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <div className="bg-white border border-blue-200/80 p-10 md:p-16 rounded-3xl shadow-xl shadow-blue-900/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full inline-block mb-6">
                {isAr ? 'ضماننا' : 'OUR GUARANTEE'}
              </span>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 font-heading leading-tight mb-6">
                {isAr ? 'وعدنا لك' : 'Our Promise'}
              </h2>
              
              <p className="text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
                {isAr ? (
                  <>
                    نسلمك صناع قرار موثوقين مع احتياج تدريبي مؤسسي مؤكد...{' '}
                    <span className="text-primary font-semibold">بدون اشتراك شهري. وبدون أي مخاطرة.</span>
                  </>
                ) : (
                  <>
                    We deliver verified enterprise decision makers with a confirmed corporate training need...{' '}
                    <span className="text-primary font-semibold">No retainer. No risk.</span>
                  </>
                )}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href={`/${lang}/for-providers`} 
                  className="btn-primary inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-full shadow-xs transition-all"
                >
                  {isAr ? 'ابدأ باستقبال الفرص المؤهلة' : 'Start Receiving Qualified Leads'}
                  <ArrowRight size={18} className="ms-2 rtl:-scale-x-100" />
                </Link>
                
                <Link 
                  href={`/${lang}/contact`} 
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-700 hover:text-slate-900 bg-transparent hover:bg-slate-100 rounded-full border border-slate-200 shadow-xs transition-all"
                >
                  {isAr ? 'احجز جلسة استكشافية' : 'Book a Discovery Call'}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
