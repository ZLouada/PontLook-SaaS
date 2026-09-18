import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ShieldCheck,
  Building2,
  ArrowRight,
  FileText,
  ChevronRight,
  Zap,
  BadgeDollarSign,
  Quote,
} from 'lucide-react';
import { Locale } from '@/i18n';
import { SEO_LANDING_PAGES, ALL_SOLUTION_SLUGS } from '@/data/seoLandingPages';
import FAQAccordion from '@/components/faq/FAQAccordion';
import Button from '@/components/shared/Button';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import { constructAlternates } from '@/lib/seo';

export const dynamic = 'force-static';

interface PageProps {
  params: Promise<{ lang: Locale; slug: string }> | { lang: Locale; slug: string };
}

export function generateStaticParams() {
  const langs: Locale[] = ['en', 'ar'];
  const params: Array<{ lang: Locale; slug: string }> = [];

  for (const lang of langs) {
    for (const slug of ALL_SOLUTION_SLUGS) {
      params.push({ lang, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const slug = resolvedParams?.slug;
  const pageData = SEO_LANDING_PAGES[slug];

  if (!pageData) {
    return { title: 'Not Found | PontLook' };
  }

  const isAr = lang === 'ar';
  const content = isAr ? pageData.ar : pageData.en;
  const canonicalUrl = `https://pontlook.com/${lang}/solutions/${slug}`;

  return {
    title: content.title,
    description: content.metaDescription,
    alternates: constructAlternates(lang, `solutions/${slug}`),
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      url: canonicalUrl,
      siteName: 'PontLook',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'article',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: content.h1,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.metaDescription,
    },
  };
}

export default async function SolutionLandingPage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const slug = resolvedParams?.slug;
  const pageData = SEO_LANDING_PAGES[slug];

  if (!pageData) {
    notFound();
  }

  const isAr = lang === 'ar';
  const content = isAr ? pageData.ar : pageData.en;
  const badge = isAr ? pageData.badgeAr : pageData.badgeEn;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `https://pontlook.com/${lang}/solutions/${slug}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isAr ? 'الرئيسية' : 'Home',
            item: `https://pontlook.com/${lang}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isAr ? 'الحلول المؤسسية' : 'Solutions',
            item: `https://pontlook.com/${lang}/solutions/${slug}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: content.title,
            item: `https://pontlook.com/${lang}/solutions/${slug}`,
          },
        ],
      },
      {
        '@type': 'Service',
        '@id': `https://pontlook.com/${lang}/solutions/${slug}#service`,
        name: content.h1,
        serviceType: 'B2B Corporate Training Matchmaking',
        description: content.metaDescription,
        provider: {
          '@type': 'Organization',
          name: 'PontLook',
          url: 'https://pontlook.com',
          logo: 'https://pontlook.com/PontlookIcon.png',
        },
        areaServed: [
          { '@type': 'Country', name: 'Saudi Arabia' },
          { '@type': 'Country', name: 'United Arab Emirates' },
          { '@type': 'Country', name: 'Qatar' },
          { '@type': 'Country', name: 'Kuwait' },
          { '@type': 'Country', name: 'Bahrain' },
          { '@type': 'Country', name: 'Oman' },
        ],
        audience: {
          '@type': 'Audience',
          audienceType: isAr
            ? 'مدراء الموارد البشرية، رؤساء قطاعات التدريب، والمدراء التنفيذيون في كبرى الشركات'
            : 'Enterprise CHROs, HR Directors, and Regional L&D Leaders',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `https://pontlook.com/${lang}/solutions/${slug}#faq`,
        mainEntity: content.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      {/* Dynamic JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative overflow-hidden bg-[#08090A]">
        {/* =========================================================================
            1. BREADCRUMBS NAVIGATION
           ========================================================================= */}
        <div className="border-b border-[#26282D] bg-[#08090A] pt-24 sm:pt-28 pb-3">
          <div className="container-site px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">
                {isAr ? 'الرئيسية' : 'Home'}
              </Link>
              <ChevronRight size={13} className="text-neutral-600 rtl:rotate-180 shrink-0" />
              <span className="text-neutral-400 font-medium">
                {isAr ? 'الحلول' : 'Solutions'}
              </span>
              <ChevronRight size={13} className="text-neutral-600 rtl:rotate-180 shrink-0" />
              <span className="text-white font-medium truncate max-w-[220px] sm:max-w-none">
                {content.h1}
              </span>
            </nav>
          </div>
        </div>

        {/* =========================================================================
            2. HERO SECTION
           ========================================================================= */}
        <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-20 border-b border-[#26282D]">
          <div className="container-site px-4 sm:px-6 text-center max-w-4xl mx-auto">
            <Reveal>
              {/* Regional / Pillar Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#26282D] bg-white/[0.04] px-4 py-1.5 mb-6 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  {badge}
                </span>
              </div>

              {/* Dynamic H1 */}
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.12]">
                {content.h1}
              </h1>

              {/* Subtitle */}
              <p className="mt-5 text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-sans">
                {content.subtitle}
              </p>

              {/* Dual Action CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
                <Button
                  href={`/${lang}/find-training`}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto py-3.5 px-7 justify-center min-h-[48px]"
                  leftIcon={<Building2 size={16} />}
                  rightIcon={<ArrowRight size={15} className="rtl:-scale-x-100" />}
                >
                  {isAr ? 'احصل على عروض تدريبية مخصصة' : 'Find Matched Providers Now'}
                </Button>

                <Button
                  href={`/${lang}/for-providers`}
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto py-3.5 px-6 justify-center min-h-[48px]"
                  leftIcon={<ShieldCheck size={16} />}
                >
                  {isAr ? 'انضم كمركز تدريب معتمد' : "I'm a Training Provider"}
                </Button>
              </div>

              {/* Trust Checkmarks */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs font-medium text-neutral-400">
                <span className="inline-flex items-center gap-1.5">
                  <BadgeDollarSign size={15} className="text-neutral-400 shrink-0" />
                  <span>{isAr ? 'مجاني 100% للشركات والمؤسسات' : '100% Free for Corporate Buyers'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span>{isAr ? 'بدون رسائل تسويقية عشوائية' : 'Zero Cold Vendor Spam'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-neutral-400 shrink-0" />
                  <span>{isAr ? 'تأكيد هوية واختيار دقيق' : 'Verified Decision Maker Privacy'}</span>
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =========================================================================
            3. GEO ANSWER BOX (AI Search Engine & Entity Authority Synthesizer)
           ========================================================================= */}
        <section className="py-12 sm:py-16 bg-[#08090A] border-b border-[#26282D]">
          <div className="container-site px-4 sm:px-6 max-w-4xl mx-auto">
            <Reveal>
              <div className="relative rounded-2xl sm:rounded-3xl border border-[#26282D] bg-[#0F1013] p-6 sm:p-9 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#26282D]">
                  <div className="inline-flex items-center gap-2">
                    <FileText size={18} className="text-white" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                      {isAr ? 'ملخص تحليلي تنفيذي (GEO Synthesis)' : 'Executive Briefing & Market Synthesis'}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium bg-[#16171B] text-neutral-300 px-2.5 py-1 rounded-full border border-[#26282D]">
                    {isAr ? 'مستند حقائق موثق' : 'Verified Entity Fact'}
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal font-sans">
                    {content.geoAnswer.summary}
                  </p>

                  <div className="mt-4 rounded-2xl bg-[#16171B] p-4 sm:p-5 border border-[#26282D] flex items-start gap-3.5">
                    <Quote size={22} className="text-neutral-500 shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base font-normal text-white italic leading-relaxed">
                      {content.geoAnswer.quote}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =========================================================================
            4. KEY GCC MARKET DATA TABLE / METRICS GRID
           ========================================================================= */}
        <section className="py-14 sm:py-20 bg-[#08090A] border-b border-[#26282D]">
          <div className="container-site px-4 sm:px-6 max-w-5xl mx-auto">
            <SectionHeading
              eyebrow={isAr ? 'مؤشرات وبيانات السوق' : 'Market Intelligence & Benchmarks'}
              title={isAr ? 'بيانات وإحصاءات الأداء الإقليمي' : 'Key Regional Performance Benchmarks'}
              subtitle={
                isAr
                  ? 'مؤشرات دقيقة مستخلصة من متطلبات الامتثال والإنفاق المؤسسي لتطوير رأس المال البشري.'
                  : 'Empirical data points reflecting corporate procurement mandates, compliance standards, and workforce transformation trends.'
              }
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {content.marketStats.map((stat, i) => (
                <Reveal key={stat.metric} delay={i * 0.08}>
                  <div className="h-full flex flex-col justify-between rounded-2xl border border-[#26282D] bg-[#0F1013] p-5 sm:p-6 transition-all hover:border-white/20">
                    <div>
                      <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">
                        {stat.metric}
                      </div>
                      <div className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight tabular-nums">
                        {stat.value}
                      </div>
                    </div>
                    <p className="mt-4 text-xs text-neutral-400 leading-relaxed border-t border-[#26282D] pt-3">
                      {stat.context}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. TAILORED 3-STEP MATCHMAKING WORKFLOW
           ========================================================================= */}
        <section className="py-14 sm:py-20 bg-[#08090A] border-b border-[#26282D]">
          <div className="container-site px-4 sm:px-6 max-w-5xl mx-auto">
            <SectionHeading
              eyebrow={isAr ? 'آلية العمل والمطابقة' : 'How It Works'}
              title={isAr ? 'كيف تتم مطابقة متطلباتك التدريبية بدقة' : 'Our Rigorous Matchmaking Protocol'}
              subtitle={
                isAr
                  ? 'منهجية معيارية تلغي عشوائية الاختيار وتضمن وصولك لأفضل 3 مراكز تدريب مؤهلة.'
                  : 'A systematic 3 stage matching engine engineered to eliminate supplier vetting friction and guarantee delivery quality.'
              }
            />

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.workflow.map((item, i) => (
                <Reveal key={item.step} delay={i * 0.1}>
                  <div className="relative h-full flex flex-col rounded-2xl sm:rounded-3xl border border-[#26282D] bg-[#0F1013] p-6 sm:p-8 hover:border-white/20 transition-all">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#16171B] border border-[#26282D] text-white font-bold text-sm mb-5">
                      {item.step}
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed flex-1">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. DEDICATED FAQ SECTION WITH RICH ACCORDION
           ========================================================================= */}
        <section className="py-14 sm:py-20 bg-[#08090A] border-b border-[#26282D]">
          <div className="container-site px-4 sm:px-6 max-w-4xl mx-auto">
            <SectionHeading
              eyebrow={isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              title={isAr ? 'إجابات واضحة لاستفساراتكم' : 'Clear Answers for Procurement & HR Leaders'}
              subtitle={
                isAr
                  ? 'كل ما يهمك معرفته حول آلية الفرز، سرية البيانات، وشروط الاعتماد.'
                  : 'Everything you need to know about our vetting standards, zero fee buyer model, and onboarding speeds.'
              }
            />

            <div className="mt-10">
              <FAQAccordion
                faqs={content.faqs.map((f) => ({
                  question: f.q,
                  answer: f.a,
                }))}
              />
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. FINAL ACTION CALLOUT BANNER
           ========================================================================= */}
        <section className="py-14 sm:py-20 bg-[#08090A] text-white relative overflow-hidden border-t border-[#26282D]">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.08] blur-[120px] rounded-full" />
          </div>

          <div className="container-site relative z-10 px-4 sm:px-6 max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#26282D] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold text-neutral-300 mb-6 backdrop-blur-md">
                <Zap size={14} className="text-white" />
                <span>
                  {isAr ? 'ابدأ الآن • مطابقة مجانية خلال 60 ثانية' : 'Fast Track • 60 Second Matchmaking'}
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-white leading-tight">
                {isAr
                  ? 'جاهز لتأهيل كوادر منشأتك بأعلى المعايير؟'
                  : 'Ready to Equip Your Workforce with Proven Training Partners?'}
              </h2>

              <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto font-sans">
                {isAr
                  ? 'انضم إلى مئات الشركات والمؤسسات التي تستخدم بونت لوك للوصول المباشر إلى أفضل الأكاديميات ومراكز التدريب المعتمدة.'
                  : 'Join hundreds of corporate decision makers who utilize PontLook to bypass vendor noise and secure verified corporate training proposals.'}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Button
                  href={`/${lang}/find-training`}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto py-3.5 px-8 justify-center min-h-[48px]"
                  leftIcon={<Building2 size={16} />}
                  rightIcon={<ArrowRight size={15} className="rtl:-scale-x-100" />}
                >
                  {isAr ? 'ابدأ طلب التدريب الآن' : 'Start Training Request Wizard'}
                </Button>

                <Button
                  href={`/${lang}/for-providers`}
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto py-3.5 px-6 justify-center min-h-[48px]"
                >
                  {isAr ? 'تسجيل مزود تدريب جديد' : 'Register as a Training Academy'}
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
