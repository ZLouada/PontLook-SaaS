import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import { ArrowRight } from 'lucide-react';

import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import WhoWeAreSections from '@/components/who-we-are/WhoWeAreSections';
import WhoWeAreHero from '@/components/who-we-are/WhoWeAreHero';

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
      <WhoWeAreHero lang={lang} />

      {/* Narrative Flow:
          • Section 2: Mission & Split Card Comparison Engine
          • Section 3: Value Model & Bilateral Alignment
          • Section 4: The End to End Training Journey */}
      <WhoWeAreSections lang={lang} />

      {/* Bottom CTA / Guarantee Section */}
      <section data-nav-dark="true" className="bg-[#08090A] py-24 sm:py-32 relative overflow-hidden">
        <div className="container-site max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <div className="bg-[#0F1013] border border-[#26282D] p-10 md:p-16 rounded-3xl shadow-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500/[0.04] rounded-full blur-3xl pointer-events-none" />
              
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-300 bg-white/[0.04] border border-[#26282D] px-4 py-1.5 rounded-full inline-block mb-6">
                {isAr ? 'ضماننا' : 'OUR GUARANTEE'}
              </span>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white font-heading leading-tight mb-6">
                {isAr ? 'وعدنا لك' : 'Our Promise'}
              </h2>
              
              <p className="text-lg md:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
                {isAr ? (
                  <>
                    نسلمك صناع قرار موثوقين مع احتياج تدريبي مؤسسي مؤكد...{' '}
                    <span className="text-white font-semibold">بدون اشتراك شهري. وبدون أي مخاطرة.</span>
                  </>
                ) : (
                  <>
                    We deliver verified enterprise decision makers with a confirmed corporate training need...{' '}
                    <span className="text-white font-semibold">No retainer. No risk.</span>
                  </>
                )}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href={`/${lang}/for-providers`} 
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-medium text-white bg-white/[0.05] hover:bg-white/[0.10] border border-[#26282D] hover:border-white/30 backdrop-blur-md rounded-xl shadow-xs transition-all active:scale-[0.98]"
                >
                  {isAr ? 'ابدأ باستقبال الفرص المؤهلة' : 'Start Receiving Qualified Leads'}
                  <ArrowRight size={18} className="ms-2 rtl:-scale-x-100" />
                </Link>
                
                <Link 
                  href={`/${lang}/contact`} 
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-medium text-neutral-300 hover:text-white bg-transparent hover:bg-white/[0.05] rounded-xl border border-[#26282D] hover:border-white/30 shadow-xs transition-all active:scale-[0.98]"
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
