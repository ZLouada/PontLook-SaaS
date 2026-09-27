import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import {
  CountryCode,
  ALL_COUNTRY_CODES,
  getCountryData,
  SERVICE_VERTICALS,
} from '@/data/geoData';
import { constructRegionalAlternates, SITE_URL } from '@/lib/seo/metadata';
import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from '@/lib/seo/schema';
import Reveal from '@/components/shared/Reveal';
import FAQAccordion from '@/components/faq/FAQAccordion';

export const dynamic = 'force-static';

interface CountryPageProps {
  params: Promise<{
    lang: string;
    country: string;
  }> | {
    lang: string;
    country: string;
  };
}

export async function generateStaticParams() {
  const params: Array<{ lang: string; country: string }> = [];

  for (const countryCode of ALL_COUNTRY_CODES) {
    const country = getCountryData(countryCode);
    if (!country) continue;

    for (const lang of country.supportedLangs) {
      params.push({
        lang,
        country: countryCode,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const resolved = await params;
  const lang = (resolved?.lang === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const countryCode = resolved?.country as CountryCode;

  const country = getCountryData(countryCode);
  if (!country) {
    return { title: 'Country Not Found | PontLook' };
  }

  const isAr = lang === 'ar';
  const countryName = isAr ? country.nameAr : country.nameEn;
  const title = isAr
    ? `مزودو التدريب المؤسسي المعتمدون في ${countryName} | PontLook`
    : `Corporate Training Providers & Matchmaking in ${countryName} | PontLook`;
  const description = isAr
    ? `اربط منشأتك بأفضل أكاديميات ومزودي التدريب المؤسسي المعتمدين في ${countryName}. برامج قيادية وفنية متوافقة مع المبادرات والمعايير الوطنية.`
    : `Connect your organization with accredited corporate training academies across ${countryName}. Executive, commercial, and technical capability building aligned with national mandates.`;

  return {
    title: { absolute: title },
    description,
    alternates: constructRegionalAlternates({
      countryCode,
      lang,
    }),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/${countryCode}`,
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
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CountryHubPage({ params }: CountryPageProps) {
  const resolved = await params;
  const lang = (resolved?.lang === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const countryCode = resolved?.country as CountryCode;

  const country = getCountryData(countryCode);
  if (!country) {
    notFound();
  }

  const isAr = lang === 'ar';
  const countryName = isAr ? country.nameAr : country.nameEn;
  const services = Object.values(SERVICE_VERTICALS);

  const countryFaqs = isAr
    ? [
        {
          q: `كيف تضمن PontLook اعتماد وجودة مزودي التدريب في ${countryName}؟`,
          a: `نقوم بالتدقيق في التراخيص الرسمية، والاعتمادات الوطنية والدولية، وسوابق الأعمال المؤسسية الموثقة قبل ربط أي أكاديمية بالعملاء.`,
        },
        {
          q: `ما هي التكلفة المترتبة على الشركات والمؤسسات لاستخدام PontLook في ${countryName}؟`,
          a: `الخدمة مجانية تماماً بنسبة 100% للشركات والمشترين المؤسسيين بدون أي اشتراكات أو رسوم وساطة خفية.`,
        },
        {
          q: `ما هي سرعة الاستجابة لطلبات عروض التدريب؟`,
          a: `تتلقى المنشآت 3 عروض أسعار متكاملة من أكاديميات مؤهلة خلال 48 ساعة كحد أقصى.`,
        },
      ]
    : [
        {
          q: `How does PontLook verify provider credentials in ${countryName}?`,
          a: `Every matched provider undergoes strict vetting of national licenses, international accreditations, and verified corporate references prior to receiving inquiries.`,
        },
        {
          q: `What is the cost for enterprise buyers using PontLook in ${countryName}?`,
          a: `PontLook is 100% free for buyers. We do not charge subscriptions or intermediary fees. You pay only the agreed training contract directly to the academy.`,
        },
        {
          q: `What is the turnaround time to receive vetted proposals?`,
          a: `You receive 3 tailored, standardized proposals from accredited academies within 48 hours of submitting your requirements.`,
        },
      ];

  const orgSchema = buildOrganizationSchema();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${lang}` },
    { name: countryName, url: `${SITE_URL}/${lang}/${countryCode}` },
  ]);
  const faqSchema = buildFAQSchema(countryFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([orgSchema, breadcrumbSchema, faqSchema]),
        }}
      />

      <div className="bg-[#08090A] min-h-screen text-white pt-24 sm:pt-28 pb-20 overflow-hidden">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute top-20 start-0 w-[500px] h-[400px] bg-white/[0.02] blur-[150px] -z-10 rounded-full" />
        <div className="pointer-events-none absolute top-40 end-0 w-[550px] h-[450px] bg-white/[0.01] blur-[160px] -z-10 rounded-full" />

        {/* 1. BREADCRUMBS */}
        <div className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 py-1">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <ChevronRight size={13} className="text-neutral-600 rtl:-scale-x-100" />
            <span className="text-white font-medium">{countryName}</span>
          </nav>
        </div>

        {/* 2. HERO */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
          <Reveal>
            <div className="max-w-4xl text-start">
              <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16171B]/90 border border-[#26282D] hover:border-white/20 backdrop-blur-xl shadow-lg transition-all duration-300">
                <span className="text-xs font-medium text-neutral-300">
                  {countryName}
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/[0.08] text-white">
                  {country.currency}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.15] sm:leading-[1.1] font-heading tracking-tight text-start mb-6">
                {isAr
                  ? `أكاديميات ومزودو التدريب المؤسسي المعتمدون في ${countryName}`
                  : `Accredited Corporate Training Academies in ${countryName}`}
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-3xl font-normal font-sans text-start mb-8 sm:mb-10">
                {isAr
                  ? `اربط منشأتك وصناع القرار بأفضل مقدمي التدريب المتخصصين في ${countryName}. حلول تدريبية حضورية وهجينة لرفع كفاءة القيادات والكوادر الفنية بما يتوافق مع المعايير والمبادرات الوطنية.`
                  : `Connect corporate buyers and L&D leaders across ${countryName} with vetted, accredited corporate training institutions. On-site and hybrid executive capability building tailored to national regulatory standards.`}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/${lang}/find-training`}
                  className="inline-flex items-center justify-center gap-2.5 py-3.5 px-7 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white font-medium text-sm sm:text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-sm active:scale-[0.98] transition-all duration-200 group sheen"
                >
                  <span>{isAr ? `البحث عن مزود تدريب في ${countryName}` : `Find Providers in ${countryName}`}</span>
                  <ArrowRight size={16} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/${lang}/${countryCode}/locations`}
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-transparent hover:bg-white/[0.08] text-neutral-300 hover:text-white font-medium text-sm sm:text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md transition-all duration-200 group"
                >
                  <span>{isAr ? 'استعراض المدن والمناطق' : 'Browse Regional Hubs'}</span>
                  <ArrowRight size={15} className="rtl:-scale-x-100 text-neutral-400 group-hover:text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 3. NATIONAL INITIATIVE BANNER */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
          <div className="rounded-2xl bg-gradient-to-r from-[#0F1013] via-[#16171B] to-[#0F1013] border border-[#26282D] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono font-medium tracking-wider text-neutral-400">
                  {isAr ? 'المبادرات والمعايير الوطنية' : 'National Workforce Mandates'}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white font-heading">
                {isAr ? country.nationalInitiative.ar : country.nationalInitiative.en}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {isAr ? country.nationalInitiative.descriptionAr : country.nationalInitiative.descriptionEn}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              {country.regulatoryBodies.map((body) => (
                <span
                  key={body}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300"
                >
                  {body}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 4. REGIONAL HUBS (CITIES) */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white font-heading">
                {isAr ? `المراكز الإقليمية في ${countryName}` : `Regional City Hubs in ${countryName}`}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                {isAr ? 'اختر مدينتك للاطلاع على مزودي التدريب والأسعار والقطاعات المحلية:' : 'Select your city to view accredited providers, delivery formats, and local investment benchmarks:'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {country.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${lang}/${countryCode}/locations/${city.slug}`}
                className="group rounded-2xl bg-[#0F1013] border border-[#26282D] p-6 sm:p-7 hover:border-white/20 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-neutral-300 font-medium">
                      {isAr ? city.nameAr : city.nameEn}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-neutral-400">
                      {country.currency}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white font-heading group-hover:text-neutral-200 transition-colors mb-2">
                    {isAr ? city.heroTitleAr : city.heroTitleEn}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                    {isAr ? city.leadParagraphAr : city.leadParagraphEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#26282D] flex items-center justify-between text-xs font-semibold text-neutral-300 group-hover:text-white">
                  <span>{isAr ? 'عرض بيانات المدينة' : 'View City Hub'}</span>
                  <ArrowRight size={14} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. SERVICES IN THIS COUNTRY */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white font-heading">
                {isAr ? `تخصصات التدريب المؤسسي في ${countryName}` : `Corporate Training Verticals in ${countryName}`}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                {isAr ? 'برامج معتمدة موجهة للإدارة العليا وفرق العمل التخصصية:' : 'Accredited executive programs for corporate departments and leadership:'}
              </p>
            </div>
            <Link
              href={`/${lang}/${countryCode}/services`}
              className="text-xs font-medium text-neutral-400 hover:text-white hidden sm:inline-flex items-center gap-1.5 transition-colors group"
            >
              <span>{isAr ? 'دليل الخدمات بالكامل' : 'All Services'}</span>
              <ArrowRight size={13} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                href={`/${lang}/${countryCode}/services/${svc.slug}`}
                className="group rounded-2xl bg-[#0F1013] border border-[#26282D] p-6 hover:border-white/20 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-semibold text-white font-heading group-hover:text-neutral-200 transition-colors mb-2">
                    {isAr ? svc.titleAr : svc.titleEn}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4 line-clamp-3">
                    {isAr ? svc.shortDescAr : svc.shortDescEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#26282D] flex items-center justify-between text-xs text-neutral-400">
                  <span className="truncate pe-2 text-[11px] font-mono">{isAr ? svc.accreditationAr : svc.accreditationEn}</span>
                  <ArrowRight size={13} className="rtl:-scale-x-100 text-neutral-400 group-hover:text-white shrink-0 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 6. DUAL CONVERSION BRIDGE */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="rounded-3xl bg-[#0F1013] border border-[#26282D] p-8 sm:p-10 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-neutral-400 font-mono">
                  {isAr ? 'للشركات والمشترين' : 'Enterprise Matchmaking'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white font-heading mt-2 mb-3">
                  {isAr ? `احصل على 3 عروض تدريب معتمدة في ${countryName}` : `Acquire 3 Vetted Academy Bids in ${countryName}`}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-sans">
                  {isAr
                    ? `حدد مواصفات وميزانية التدريب واحصل على عروض متوافقة ومباشرة بدون هوامش ربح وساطة.`
                    : `Specify your corporate training objectives and receive competitive, standardized bids within 48 hours.`}
                </p>
              </div>

              <div>
                <Link
                  href={`/${lang}/find-training`}
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white font-medium text-sm border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-sm active:scale-[0.98] transition-all duration-200 group sheen"
                >
                  <span>{isAr ? 'ابدأ طلب التدريب الآن' : 'Start Free Training Intake'}</span>
                  <ArrowRight size={15} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-[#0F1013] border border-orange-500/30 p-8 sm:p-10 flex flex-col justify-between shadow-xl shadow-orange-500/5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Image
                    src="/images/brand/pontlook-logo-orange.png"
                    alt="PontLook for Providers"
                    width={120}
                    height={30}
                    className="h-6 w-auto object-contain"
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-400 font-mono border-s border-neutral-700 ps-2">
                    {isAr ? 'شبكة المزودين' : 'Provider Network'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white font-heading mt-2 mb-3">
                  {isAr ? `انضمام الأكاديميات في ${countryName}` : `Academy Partnerships in ${countryName}`}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-sans">
                  {isAr
                    ? `استقبل عملاء وطلبات تدريب حقيقية ومؤهلة من كبرى الشركات في ${countryName}. نموذج دفع مقابل النتائج فقط بدون رسوم شهرية.`
                    : `Receive pre-qualified corporate training demand across ${countryName}. Zero retainers, 100% pay-per-lead performance model.`}
                </p>
              </div>

              <div>
                <Link
                  href={`/${lang}/for-providers`}
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-[#FF5C00] hover:bg-[#FF6A1A] text-white font-semibold text-sm shadow-lg shadow-orange-500/25 active:scale-95 transition-all"
                >
                  <span>{isAr ? 'تقديم طلب الاعتماد' : 'Apply for Provider Partnership'}</span>
                  <ArrowRight size={15} className="rtl:-scale-x-100" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. COUNTRY FAQS */}
        <section className="container-site max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-start mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white font-heading">
              {isAr ? `الأسئلة الشائعة حول التدريب في ${countryName}` : `Frequently Asked Questions • ${countryName}`}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {isAr ? 'معلومات حول معايير التأهيل، والأسعار، وإجراءات التعاقد:' : 'Key information regarding procurement guidelines, pricing, and provider vetting:'}
            </p>
          </div>

          <FAQAccordion items={countryFaqs} />
        </section>
      </div>
    </>
  );
}
