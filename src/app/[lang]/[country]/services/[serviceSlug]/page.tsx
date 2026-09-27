import type { Metadata } from 'next';
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
  ALL_SERVICE_SLUGS,
  getServiceVertical,
} from '@/data/geoData';
import { constructRegionalAlternates, SITE_URL } from '@/lib/seo/metadata';
import {
  buildOrganizationSchema,
  buildServiceSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from '@/lib/seo/schema';
import Reveal from '@/components/shared/Reveal';
import FAQAccordion from '@/components/faq/FAQAccordion';

export const dynamic = 'force-static';

interface ServiceDetailProps {
  params: Promise<{
    lang: string;
    country: string;
    serviceSlug: string;
  }> | {
    lang: string;
    country: string;
    serviceSlug: string;
  };
}

export async function generateStaticParams() {
  const params: Array<{ lang: string; country: string; serviceSlug: string }> = [];

  for (const countryCode of ALL_COUNTRY_CODES) {
    const country = getCountryData(countryCode);
    if (!country) continue;

    for (const lang of country.supportedLangs) {
      for (const serviceSlug of ALL_SERVICE_SLUGS) {
        params.push({
          lang,
          country: countryCode,
          serviceSlug,
        });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: ServiceDetailProps): Promise<Metadata> {
  const resolved = await params;
  const lang = (resolved?.lang === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const countryCode = resolved?.country as CountryCode;
  const serviceSlug = resolved?.serviceSlug;

  const country = getCountryData(countryCode);
  const service = getServiceVertical(serviceSlug);

  if (!country || !service) {
    return { title: 'Service Not Found | PontLook' };
  }

  const isAr = lang === 'ar';
  const serviceTitle = isAr ? service.titleAr : service.titleEn;
  const countryName = isAr ? country.nameAr : country.nameEn;
  const title = isAr
    ? `${serviceTitle} في ${countryName} | PontLook`
    : `${serviceTitle} in ${countryName} | PontLook`;
  const description = isAr ? service.shortDescAr : service.shortDescEn;

  return {
    title: { absolute: title },
    description,
    alternates: constructRegionalAlternates({
      countryCode,
      lang,
      subpath: `services/${service.slug}`,
    }),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/${countryCode}/services/${service.slug}`,
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

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const resolved = await params;
  const lang = (resolved?.lang === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const countryCode = resolved?.country as CountryCode;
  const serviceSlug = resolved?.serviceSlug;

  const country = getCountryData(countryCode);
  const service = getServiceVertical(serviceSlug);

  if (!country || !service) {
    notFound();
  }

  const isAr = lang === 'ar';
  const countryName = isAr ? country.nameAr : country.nameEn;
  const serviceTitle = isAr ? service.titleAr : service.titleEn;
  const canonicalUrl = `${SITE_URL}/${lang}/${countryCode}/services/${service.slug}`;

  const faqs = isAr
    ? [
        {
          q: `كيف يتم تصميم منهج ${serviceTitle} ليتوافق مع منشآت ${countryName}؟`,
          a: `يقوم المدربون المعتمدون بدراسة سياق أعمال الشركة وحجم الفريق والمتطلبات التنظيمية المحلية قبل بدء البرنامج لضمان ملاءمة المحتوى والتمارين بنسبة 100%.`,
        },
        {
          q: `ما هي صيغ تقديم البرنامج المتاحة في ${countryName}؟`,
          a: `يتوفر البرنامج حضورياً في مقرات الشركات بكافة المدن الرئيسية، أو عبر خلوات تنفيذية متخصصة، بالإضافة إلى خيارات هجينة تفاعلية.`,
        },
        {
          q: `ما هي الاعتمادات والشهادات التي يحصل عليها المتدربون؟`,
          a: `يحصل المشاركون على شهادات إتمام معتمدة دولياً ومحلياً مطابقة لمعايير ${service.accreditationAr}.`,
        },
      ]
    : [
        {
          q: `How is the ${serviceTitle} curriculum customized for enterprises in ${countryName}?`,
          a: `Matched accredited providers conduct an initial discovery session to benchmark your industry challenges, team seniority, and local compliance standards prior to delivery.`,
        },
        {
          q: `What delivery formats are supported across ${countryName}?`,
          a: `Facilitation is available on-premise at corporate headquarters, at premier executive retreat venues, or via live-virtual interactive masterclasses.`,
        },
        {
          q: `What credentials or certificates do participants receive?`,
          a: `Participants earn recognized completion certificates aligned with ${service.accreditationEn} benchmarks.`,
        },
      ];

  const orgSchema = buildOrganizationSchema();
  const serviceSchema = buildServiceSchema({ service, country, lang, canonicalUrl });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${lang}` },
    { name: countryName, url: `${SITE_URL}/${lang}/${countryCode}` },
    { name: isAr ? 'الخدمات' : 'Services', url: `${SITE_URL}/${lang}/${countryCode}/services` },
    { name: serviceTitle, url: canonicalUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([orgSchema, serviceSchema, breadcrumbSchema, faqSchema]),
        }}
      />

      <div className="bg-[#08090A] min-h-screen text-white pt-24 sm:pt-28 pb-20 overflow-hidden">
        {/* Breadcrumb */}
        <div className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 py-1">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <ChevronRight size={13} className="text-neutral-600 rtl:-scale-x-100" />
            <Link href={`/${lang}/${countryCode}`} className="hover:text-white transition-colors">
              {countryName}
            </Link>
            <ChevronRight size={13} className="text-neutral-600 rtl:-scale-x-100" />
            <Link href={`/${lang}/${countryCode}/services`} className="hover:text-white transition-colors">
              {isAr ? 'الخدمات' : 'Services'}
            </Link>
            <ChevronRight size={13} className="text-neutral-600 rtl:-scale-x-100" />
            <span className="text-white font-medium truncate">{serviceTitle}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
          <Reveal>
            <div className="max-w-4xl text-start">
              <div className="mb-5 inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#16171B] border border-[#26282D] text-xs font-mono text-neutral-300">
                <span>{countryName} • {isAr ? service.accreditationAr : service.accreditationEn}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight font-heading mb-6">
                {isAr
                  ? `برامج ${serviceTitle} للشركات في ${countryName}`
                  : `${serviceTitle} in ${countryName}`}
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-3xl font-normal font-sans mb-8">
                {isAr ? service.shortDescAr : service.shortDescEn}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/${lang}/find-training`}
                  className="inline-flex items-center justify-center gap-2.5 py-3.5 px-7 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white font-medium text-sm sm:text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-sm active:scale-[0.98] transition-all duration-200 group sheen"
                >
                  <span>{isAr ? 'طلب عروض تدريب مخصصة' : 'Request Tailored Bids'}</span>
                  <ArrowRight size={16} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/${lang}/${countryCode}/locations`}
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-transparent hover:bg-white/[0.08] text-neutral-300 hover:text-white font-medium text-sm sm:text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md transition-all duration-200 group"
                >
                  <span>{isAr ? 'استعراض المدن المتاحة' : 'View Delivery Locations'}</span>
                  <ArrowRight size={15} className="rtl:-scale-x-100 text-neutral-400 group-hover:text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Modules & Delivery Grid */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Core Curriculum Modules */}
            <div className="lg:col-span-7 rounded-2xl bg-[#0F1013] border border-[#26282D] p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-medium text-neutral-400 uppercase font-mono tracking-wider">
                  {isAr ? 'المحتوى والمهارات الأساسية' : 'Core Capabilities'}
                </span>
                <h3 className="text-xl font-semibold text-white font-heading mt-1">
                  {isAr ? 'المحاور الاستراتيجية للبرنامج' : 'Curriculum & Strategic Modules'}
                </h3>
              </div>

              <div className="space-y-3">
                {(isAr ? service.keyModulesAr : service.keyModulesEn).map((mod, i) => (
                  <div key={mod} className="p-4 rounded-xl bg-[#16171B] border border-[#26282D] flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/[0.08] text-white font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-neutral-200 font-medium leading-relaxed">{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Formats & Audience */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-[#0F1013] border border-[#26282D] p-6 sm:p-8 space-y-4 shadow-xl">
                <span className="text-xs font-medium text-neutral-400 uppercase font-mono tracking-wider">
                  {isAr ? 'صيغ التنفيذ' : 'Delivery Formats'}
                </span>
                <h4 className="text-lg font-semibold text-white font-heading">
                  {isAr ? 'طرق تقديم البرنامج' : 'Engagement Options'}
                </h4>
                <div className="space-y-2">
                  {(isAr ? service.deliveryFormatsAr : service.deliveryFormatsEn).map((format) => (
                    <div key={format} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                      <span>{format}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[#0F1013] border border-[#26282D] p-6 sm:p-8 space-y-3 shadow-xl">
                <span className="text-xs font-semibold text-neutral-400 uppercase font-mono tracking-wider">
                  {isAr ? 'الفئات المستهدفة' : 'Target Profiles'}
                </span>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                  {isAr ? service.audienceAr : service.audienceEn}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="container-site max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-start mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white font-heading">
              {isAr ? 'الأسئلة الشائعة حول هذا البرنامج' : 'Program FAQs'}
            </h2>
          </div>
          <FAQAccordion items={faqs} />
        </section>
      </div>
    </>
  );
}
