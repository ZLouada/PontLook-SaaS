import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';
import {
  BadgeCheck,
  BadgeDollarSign,
  ArrowRight,
  SlidersHorizontal,
  Scale,
  ChevronDown,
} from 'lucide-react';
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

const trustMetricsEn = [
  { value: '120+', label: 'Vetted Providers' },
  { value: '48 Hours', label: 'Proposal SLA' },
  { value: '$0 Cost', label: 'For Hiring Organizations' },
  { value: '100%', label: 'Confidentiality Guaranteed' },
];

const trustMetricsAr = [
  { value: '+120', label: 'مزود تدريب معتمد' },
  { value: '48 ساعة', label: 'سرعة استلام العروض' },
  { value: '0$ تكلفة', label: 'مجاناً للشركات والجهات' },
  { value: '100%', label: 'سرية تامة ومضمونة' },
];

const howItWorksStepsEn = [
  {
    step: '01',
    icon: SlidersHorizontal,
    title: 'Specify Training Needs',
    desc: 'Define your targeted skills, delivery mode, city, and cohort size in our 60 second interactive questionnaire.',
  },
  {
    step: '02',
    icon: BadgeCheck,
    title: 'Matching & Faculty Vetting',
    desc: 'Our matching desk screens 120+ accredited providers to select facilitators with verified enterprise outcomes.',
  },
  {
    step: '03',
    icon: Scale,
    title: 'Compare Itemized Proposals',
    desc: 'Receive 2 to 3 tailored proposals within 48 hours with custom syllabi, transparent pricing, and zero purchase obligation.',
  },
];

const howItWorksStepsAr = [
  {
    step: '01',
    icon: SlidersHorizontal,
    title: 'حدد المتطلبات والاحتياج',
    desc: 'حدد المهارات المستهدفة، وأسلوب التدريب، والمدينة، وحجم الفريق في نموذج تفاعلي يستغرق 60 ثانية فقط.',
  },
  {
    step: '02',
    icon: BadgeCheck,
    title: 'المطابقة والتحقق من المدربين',
    desc: 'يفحص فريقنا أكثر من 120 مزود تدريب معتمد لاختيار أفضل المدربين أصحاب السجلات والإنجازات الموثوقة.',
  },
  {
    step: '03',
    icon: Scale,
    title: 'استلم وقارن العروض',
    desc: 'استلم من 2 إلى 3 عروض مفصلة خلال 48 ساعة متضمنة خطط البرامج والتكاليف الشفافة، وبدون أي التزام بالشراء.',
  },
];

export default async function FindTrainingPage({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isAr = lang === 'ar';

  const trustMetrics = isAr ? trustMetricsAr : trustMetricsEn;
  const steps = isAr ? howItWorksStepsAr : howItWorksStepsEn;

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#08090A] min-h-[100dvh] flex flex-col justify-between items-center pt-24 sm:pt-28 pb-6 sm:pb-8 px-4 sm:px-6">
        {/* Ambient Depth Glows */}
        <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 w-[900px] h-[520px] bg-white/[0.02] blur-3xl -z-10 rounded-full" />
        <div className="pointer-events-none absolute top-10 start-1/4 w-[400px] h-[400px] bg-white/[0.01] blur-3xl -z-10 rounded-full" />

        {/* Vertically Centered Content */}
        <div className="container-site relative z-10 mx-auto max-w-4xl text-center my-auto -translate-y-3 sm:-translate-y-6 py-2">
          <Reveal className="flex flex-col items-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.12] sm:leading-[1.08] font-heading tracking-tight">
              {isAr ? (
                <>
                  احصل على <span className="text-white font-bold">3 عروض تدريبية مخصصة</span> لتطوير كوادر منشأتك
                </>
              ) : (
                <>
                  Get <span className="text-white font-bold">3 Curated Training Proposals</span> for Your Workforce
                </>
              )}
            </h1>

            <p className="mt-4 sm:mt-5 text-base sm:text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto font-normal">
              {isAr
                ? 'لا داعي للبحث اليدوي بين مئات الكتالوجات العامة. حدد متطلباتك التدريبية في 60 ثانية، وسنصلك بأفضل مزودي التدريب المعتمدين وفق متطلباتك الدقيقة وبدون أي التزام.'
                : 'Stop sifting through generic vendor catalogs. Submit your training requirements in 60 seconds, and we will introduce you only to proven training providers matched to your exact domain and regional context.'}
            </p>

            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href={`/${lang}/find-training/request`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white font-semibold text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-xs active:scale-[0.98] transition-all duration-200"
              >
                <span>{isAr ? 'ابدأ طلب التدريب الآن' : 'Request Training Proposals'}</span>
                <ArrowRight size={18} className={isAr ? 'rotate-180' : ''} />
              </Link>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-8 rounded-xl bg-transparent hover:bg-white/[0.05] text-neutral-300 hover:text-white font-medium text-base border border-[#26282D] hover:border-white/20 shadow-xs active:scale-[0.98] transition-all duration-200"
              >
                <span>{isAr ? 'كيف تعمل المنصة' : 'How Matchmaking Works'}</span>
              </a>
            </div>

            <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4 w-full max-w-3xl">
              {trustMetrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-[#26282D] bg-[#0F1013] p-3.5 sm:p-4 text-center shadow-xs"
                >
                  <div className="text-xl font-bold text-white sm:text-2xl tabular-nums">{m.value}</div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-neutral-400">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm text-neutral-400">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16171B] border border-[#26282D] shadow-xs">
                <BadgeDollarSign size={15} className="text-white shrink-0" />
                <span className="font-medium text-neutral-300">
                  {isAr ? 'مجاني 100% للشركات والمؤسسات' : '100% Free for Companies'}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16171B] border border-[#26282D] shadow-xs">
                <span className="font-medium text-neutral-300">
                  {isAr ? 'بدون رسائل تسويقية عشوائية' : 'Zero Vendor Spam'}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16171B] border border-[#26282D] shadow-xs">
                <BadgeCheck size={15} className="text-white shrink-0" />
                <span className="font-medium text-neutral-300">
                  {isAr ? 'خصوصية تامة لصناع القرار' : 'Verified Decision Maker Privacy'}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom Bouncing Scroll Prompt */}
        <div className="relative z-10 pb-3 sm:pb-4 flex flex-col items-center">
          <a
            href="#how-it-works"
            className="group flex flex-col items-center text-neutral-500 hover:text-white transition-colors text-xs font-medium"
            aria-label={isAr ? 'انتقل إلى الأسفل' : 'Scroll down'}
          >
            <span className="mb-1 hidden sm:inline tracking-wider uppercase text-[11px] font-semibold">
              {isAr ? 'اكتشف المزيد' : 'Discover More'}
            </span>
            <ChevronDown size={18} className="animate-bounce text-neutral-500 group-hover:text-white" />
          </a>
        </div>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-[#08090A] py-16 sm:py-24 border-t border-[#26282D] scroll-mt-16">
        <div className="container-site max-w-6xl mx-auto px-4 sm:px-6 space-y-16 sm:space-y-24">
          <div>
            <SectionHeading
              eyebrow={isAr ? 'خطوات بسيطة وسريعة' : 'How It Works'}
              title={isAr ? '3 خطوات للحصول على أفضل عروض التدريب' : '3 Simple Steps to Proven Training Solutions'}
              subtitle={
                isAr
                  ? 'عملية توفيق دقيقة وسريعة توفر عليك أسابيع من البحث والتقييم اليدوي.'
                  : 'A streamlined matchmaking process that saves you weeks of vendor searching and evaluation.'
              }
            />

            <div className="mt-10 sm:mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((st, i) => (
                <Reveal key={st.step} delay={i * 0.1}>
                  <div className="group h-full flex flex-col p-7 sm:p-8 bg-[#0F1013] border border-[#26282D] rounded-2xl hover:border-white/20 transition-all duration-300 shadow-xl shadow-black/40">
                    <div className="flex items-center justify-between mb-5">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 text-white shadow-sm transition-transform duration-200 group-hover:scale-105 group-hover:border-white/20">
                        <st.icon size={22} strokeWidth={1.75} />
                      </span>
                      <span className="text-2xl font-mono font-bold text-neutral-500 tracking-wider">
                        {st.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white font-heading">
                      {st.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400 font-normal">
                      {st.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Bottom Enterprise Request CTA Card */}
          <div className="scroll-mt-24">
            <Reveal className="mx-auto max-w-4xl">
              <div className="bg-[#0F1013] border border-[#26282D] p-8 sm:p-14 rounded-2xl text-center relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-white/[0.02] blur-3xl pointer-events-none" />

                <span className="text-xs font-bold uppercase tracking-widest text-neutral-300 bg-[#16171B] border border-[#26282D] px-4 py-1.5 rounded-full inline-block mb-5">
                  {isAr ? 'طلب تدريب مؤسسي' : 'ENTERPRISE MATCHMAKING'}
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white font-heading leading-tight mb-4">
                  {isAr ? 'جاهز لتطوير كوادر منشأتك التدريبية؟' : 'Ready to Upskill Your Workforce?'}
                </h2>

                <p className="text-base sm:text-lg text-neutral-400 font-normal leading-relaxed max-w-2xl mx-auto mb-8">
                  {isAr
                    ? 'اطرح متطلبات تدريب فريقك واستلم عروض أسعار تفصيلية من أفضل معاهد ومزودي التدريب المعتمدين بالخليج خلال 48 ساعة.'
                    : 'Submit your training requirements in 60 seconds. Our matching concierge will connect you with top tier accredited providers across the GCC.'}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href={`/${lang}/find-training/request`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white font-semibold text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-xs active:scale-[0.98] transition-all duration-200"
                  >
                    <span>{isAr ? 'ابدأ طلب التدريب الآن' : 'Request Training Proposals'}</span>
                    <ArrowRight size={18} className={isAr ? 'rotate-180' : ''} />
                  </Link>

                  <a
                    href="#how-it-works"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-transparent hover:bg-white/[0.05] text-neutral-300 hover:text-white font-medium text-base border border-[#26282D] hover:border-white/20 shadow-xs transition-all duration-200"
                  >
                    <span>{isAr ? 'استكشف خطوات العمل' : 'Explore How It Works'}</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
