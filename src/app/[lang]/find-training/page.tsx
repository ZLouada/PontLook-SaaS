import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import TextReveal from '@/components/shared/TextReveal';
import FindTrainingStepsCards from '@/components/find-training/FindTrainingStepsCards';
import BurjTower from '@/components/find-training/BurjTower';
import NeuralGridBackground from '@/components/shared/NeuralGridBackground';
import Magnetic from '@/components/shared/Magnetic';
import CardTilt3D from '@/components/shared/CardTilt3D';
import BorderGlow from '@/components/shared/BorderGlow';
import { ArrowRight, ChevronDown } from '@/components/icons';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'ابحث عن مزودي تدريب معتمدين لشركتك | PontLook'
    : 'Hire Vetted Corporate Training Providers | PontLook';
  const description = isAr
    ? 'اطرح متطلبات تدريب فريقك واستلم عروض أسعار تفصيلية من أفضل معاهد ومزودي التدريب المعتمدين بالخليج خلال 48 ساعة. خدمة مجانية 100% للشركات.'
    : 'Submit your corporate training RFP and receive 2 to 3 matched proposals from vetted training providers in 48 hours. 100% free for enterprise buyers.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: constructAlternates(lang, 'find-training'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/find-training`,
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
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function FindTrainingPage({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isAr = lang === 'ar';

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black min-h-0 sm:min-h-[100dvh] flex flex-col justify-start sm:justify-center items-center pt-[calc(env(safe-area-inset-top,0px)+5.5rem)] xs:pt-[calc(env(safe-area-inset-top,0px)+6rem)] sm:pt-28 pb-10 sm:pb-12 px-3.5 xs:px-4 sm:px-6">
        {/* Ambient Depth Glows */}
        <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 w-[900px] h-[520px] bg-white/[0.02] blur-3xl -z-10 rounded-full" />
        <div className="pointer-events-none absolute top-10 start-1/4 w-[400px] h-[400px] bg-white/[0.01] blur-3xl -z-10 rounded-full" />
        <NeuralGridBackground className="z-0 opacity-40" gridSize={36} interactiveRadius={160} />

        {/* Vertically Centered Content — copy on one side, tower on the other */}
        <div className="container-site relative z-10 mx-auto w-full max-w-6xl pt-0 sm:pt-2 pb-2 sm:pb-4 mt-0 sm:-mt-8 lg:-mt-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-7 flex flex-col items-start text-start">
              <TextReveal
                as="h1"
                onScroll={false}
                text={
                  isAr
                    ? 'احصل على 3 عروض تدريبية مخصصة لتطوير كوادر منشأتك'
                    : 'Get 3 Curated Training Proposals for Your Workforce'
                }
                className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-[1.12] sm:leading-[1.08] font-heading tracking-tight text-start"
              />

              <p className="mt-3.5 sm:mt-5 text-sm xs:text-base sm:text-xl text-neutral-400 leading-relaxed max-w-2xl font-normal text-start">
                {isAr
                  ? 'لا داعي للبحث اليدوي بين مئات الكتالوجات العامة. حدد متطلباتك التدريبية في 60 ثانية، وسنصلك بأفضل مزودي التدريب المعتمدين وفق متطلباتك الدقيقة وبدون أي التزام.'
                  : 'Stop sifting through generic vendor catalogs. Submit your training requirements in 60 seconds, and we will introduce you only to proven training providers matched to your exact domain and regional context.'}
              </p>

              <div className="mt-6 xs:mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 w-full sm:w-auto">
                <Magnetic strength={0.22} activeDistance={35} className="w-full sm:w-auto">
                  <Link
                    href={`/${lang}/find-training/request`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white font-semibold text-xs xs:text-sm sm:text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-xs active:scale-[0.98] min-h-[48px] touch-manipulation transition-all duration-200"
                  >
                    <span>{isAr ? 'ابدأ طلب التدريب الآن' : 'Request Training Proposals'}</span>
                    <ArrowRight size={18} className="rtl:-scale-x-100" />
                  </Link>
                </Magnetic>

                <Magnetic strength={0.22} activeDistance={35} className="w-full sm:w-auto">
                  <a
                    href="#how-it-works"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl bg-transparent hover:bg-white/[0.05] text-neutral-300 hover:text-white font-medium text-xs xs:text-sm sm:text-base border border-[#26282D] hover:border-white/20 shadow-xs active:scale-[0.98] min-h-[48px] touch-manipulation transition-all duration-200"
                  >
                    <span>{isAr ? 'كيف تعمل المنصة' : 'How Matchmaking Works'}</span>
                  </a>
                </Magnetic>
              </div>
            </Reveal>

            {/* Right Column: Burj Al Arab Architectural Line Art */}
            <div className="lg:col-span-5 w-full flex items-center justify-center pt-8 lg:pt-0">
              <BurjTower className="w-full max-w-[260px] 2xs:max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] lg:max-w-[440px] xl:max-w-[480px] h-[440px] xs:h-[480px] sm:h-[540px] lg:h-[600px]" />
            </div>
          </div>
        </div>

        {/* Bottom Bouncing Scroll Prompt (Desktop only) */}
        <div className="hidden sm:flex relative z-10 pb-3 sm:pb-4 flex-col items-center">
          <a
            href="#how-it-works"
            className="group flex flex-col items-center text-neutral-500 hover:text-white transition-colors text-xs font-medium"
            aria-label={isAr ? 'انتقل إلى الأسفل' : 'Scroll down'}
          >
            <span className="mb-1 tracking-wider uppercase text-[11px] font-semibold">
              {isAr ? 'اكتشف المزيد' : 'Discover More'}
            </span>
            <ChevronDown size={18} className="animate-bounce text-neutral-500 group-hover:text-white" />
          </a>
        </div>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-black pt-20 pb-16 sm:pt-28 sm:pb-24 border-t border-[#26282D] scroll-mt-28 lg:scroll-mt-36 w-full">
        <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          <div>
            <FindTrainingStepsCards lang={lang} />
          </div>

          {/* Bottom Enterprise Request CTA Card */}
          <div className="scroll-mt-24">
            <Reveal className="mx-auto max-w-4xl">
              <CardTilt3D maxTilt={4}>
                <div className="bg-[#0F1013] border border-[#26282D] p-8 sm:p-14 rounded-2xl text-center relative overflow-hidden shadow-sm">
                  <BorderGlow color="rgba(255, 255, 255, 0.2)" size={240} />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-white/[0.02] blur-3xl pointer-events-none" />

                  <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-300 bg-[#16171B] border border-[#26282D] px-4 py-1.5 rounded-full inline-block mb-5">
                      {isAr ? 'طلب تدريب مؤسسي' : 'ENTERPRISE MATCHMAKING'}
                    </span>

                    <TextReveal
                      as="h2"
                      text={isAr ? 'جاهز لتطوير كوادر منشأتك التدريبية؟' : 'Ready to Upskill Your Workforce?'}
                      className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white font-heading leading-tight mb-4 text-center"
                    />

                    <p className="text-base sm:text-lg text-neutral-400 font-normal leading-relaxed max-w-2xl mx-auto mb-8">
                      {isAr
                        ? 'اطرح متطلبات تدريب فريقك واستلم عروض أسعار تفصيلية من أفضل معاهد ومزودي التدريب المعتمدين بالخليج خلال 48 ساعة.'
                        : 'Submit your training requirements in 60 seconds. Our matching concierge will connect you with top tier accredited providers across the GCC.'}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <Magnetic strength={0.22} activeDistance={35} className="w-full sm:w-auto">
                        <Link
                          href={`/${lang}/find-training/request`}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white font-semibold text-xs xs:text-sm sm:text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-xs active:scale-[0.98] min-h-[48px] touch-manipulation transition-all duration-200"
                        >
                          <span>{isAr ? 'ابدأ طلب التدريب الآن' : 'Request Training Proposals'}</span>
                          <ArrowRight size={18} className="rtl:-scale-x-100" />
                        </Link>
                      </Magnetic>

                      <Magnetic strength={0.22} activeDistance={35} className="w-full sm:w-auto">
                        <a
                          href="#how-it-works"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl bg-transparent hover:bg-white/[0.05] text-neutral-300 hover:text-white font-medium text-xs xs:text-sm sm:text-base border border-[#26282D] hover:border-white/20 shadow-xs active:scale-[0.98] min-h-[48px] touch-manipulation transition-all duration-200"
                        >
                          <span>{isAr ? 'استكشف خطوات العمل' : 'Explore How It Works'}</span>
                        </a>
                      </Magnetic>
                    </div>
                  </div>
                </div>
              </CardTilt3D>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
