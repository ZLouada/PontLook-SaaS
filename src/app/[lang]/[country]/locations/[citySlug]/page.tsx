import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  ChevronRight,
} from '@/components/icons';
import {
  CountryCode,
  ALL_COUNTRY_CODES,
  getCountryData,
  getCityData,
  SERVICE_VERTICALS,
} from '@/data/geoData';
import { constructRegionalAlternates, SITE_URL } from '@/lib/seo/metadata';
import {
  buildOrganizationSchema,
  buildCityOrganizationSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from '@/lib/seo/schema';
import Reveal from '@/components/shared/Reveal';
import FAQAccordion from '@/components/faq/FAQAccordion';
import CityBudgetCalculator from '@/components/geo/CityBudgetCalculator';

export const dynamic = 'force-static';

interface CityPageProps {
  params: Promise<{
    lang: string;
    country: string;
    citySlug: string;
  }> | {
    lang: string;
    country: string;
    citySlug: string;
  };
}

export async function generateStaticParams() {
  const params: Array<{ lang: string; country: string; citySlug: string }> = [];

  for (const countryCode of ALL_COUNTRY_CODES) {
    const country = getCountryData(countryCode);
    if (!country) continue;

    for (const lang of country.supportedLangs) {
      for (const city of country.cities) {
        params.push({
          lang,
          country: countryCode,
          citySlug: city.slug,
        });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const resolved = await params;
  const lang = (resolved?.lang === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const countryCode = resolved?.country as CountryCode;
  const citySlug = resolved?.citySlug;

  const country = getCountryData(countryCode);
  const city = getCityData(countryCode, citySlug);

  if (!country || !city) {
    return { title: 'Location Not Found | PontLook' };
  }

  const isAr = lang === 'ar';
  const title = isAr
    ? `${city.heroTitleAr} | PontLook`
    : `${city.heroTitleEn} | PontLook`;
  const description = isAr ? city.leadParagraphAr : city.leadParagraphEn;
  const canonicalPath = `locations/${city.slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: constructRegionalAlternates({
      countryCode,
      lang,
      subpath: canonicalPath,
      citySlug: city.slug,
    }),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/${countryCode}/${canonicalPath}`,
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

export default async function LocalizedCityPage({ params }: CityPageProps) {
  const resolved = await params;
  const lang = (resolved?.lang === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const countryCode = resolved?.country as CountryCode;
  const citySlug = resolved?.citySlug;

  const country = getCountryData(countryCode);
  const city = getCityData(countryCode, citySlug);

  if (!country || !city) {
    notFound();
  }

  const isAr = lang === 'ar';
  const cityName = isAr ? city.nameAr : city.nameEn;
  const countryName = isAr ? country.nameAr : country.nameEn;
  const faqs = isAr ? city.faqsAr : city.faqsEn;
  const topIndustries = isAr ? city.topIndustriesAr : city.topIndustriesEn;
  const canonicalUrl = `${SITE_URL}/${lang}/${countryCode}/locations/${city.slug}`;

  // Structured Data (JSON-LD)
  const orgSchema = buildOrganizationSchema();
  const cityOrgSchema = buildCityOrganizationSchema({ city, country, lang, canonicalUrl });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${lang}` },
    { name: countryName, url: `${SITE_URL}/${lang}/${countryCode}` },
    { name: isAr ? 'المواقع الإقليمية' : 'Locations', url: `${SITE_URL}/${lang}/${countryCode}/locations` },
    { name: cityName, url: canonicalUrl },
  ]);
  const faqSchema = buildFAQSchema(faqs);

  const topServices = Object.values(SERVICE_VERTICALS).slice(0, 4);

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([orgSchema, cityOrgSchema, breadcrumbSchema, faqSchema]),
        }}
      />

      <div className="bg-black min-h-screen text-white pt-24 sm:pt-28 pb-20 overflow-hidden">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute top-20 start-0 w-[500px] h-[400px] bg-white/[0.02] blur-[150px] -z-10 rounded-full" />
        <div className="pointer-events-none absolute top-40 end-0 w-[550px] h-[450px] bg-white/[0.01] blur-[160px] -z-10 rounded-full" />

        {/* 1. BREADCRUMBS */}
        <div className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 overflow-x-auto scrollbar-none py-1">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <ChevronRight size={13} className="text-neutral-600 rtl:-scale-x-100 shrink-0" />
            <Link href={`/${lang}/${countryCode}`} className="hover:text-white transition-colors">
              {countryName}
            </Link>
            <ChevronRight size={13} className="text-neutral-600 rtl:-scale-x-100 shrink-0" />
            <Link href={`/${lang}/${countryCode}/locations`} className="hover:text-white transition-colors">
              {isAr ? 'المواقع' : 'Locations'}
            </Link>
            <ChevronRight size={13} className="text-neutral-600 rtl:-scale-x-100 shrink-0" />
            <span className="text-white font-medium truncate">{cityName}</span>
          </nav>
        </div>

        {/* 2. HERO SECTION */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
          <Reveal>
            <div className="max-w-4xl text-start">
              {/* Regional Status Pill */}
              <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16171B]/90 border border-[#26282D] hover:border-white/20 backdrop-blur-xl shadow-lg transition-all duration-300">
                <span className="text-xs font-medium text-neutral-300">
                  {cityName}, {countryName}
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/[0.08] text-white">
                  {country.currency}
                </span>
              </div>

              {/* Dynamic H1 */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.15] sm:leading-[1.1] font-heading tracking-tight text-start mb-6">
                {isAr ? city.heroTitleAr : city.heroTitleEn}
              </h1>

              {/* Lead Paragraph */}
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-3xl font-normal font-sans text-start mb-8 sm:mb-10">
                {isAr ? city.leadParagraphAr : city.leadParagraphEn}
              </p>

              {/* Dual Action CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/${lang}/find-training`}
                  className="inline-flex items-center justify-center gap-2.5 py-3.5 px-7 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white font-medium text-sm sm:text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-sm active:scale-[0.98] transition-all duration-200 group sheen"
                >
                  <span>{isAr ? `البحث عن مدربين معتمدين في ${cityName}` : `Find Vetted Facilitators in ${cityName}`}</span>
                  <ArrowRight size={16} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/${lang}/for-providers`}
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-transparent hover:bg-white/[0.08] text-neutral-300 hover:text-white font-medium text-sm sm:text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md transition-all duration-200 group"
                >
                  <span>{isAr ? `انضمام مزود تدريب في ${cityName}` : `Apply as ${cityName} Training Provider`}</span>
                  <ArrowRight size={15} className="rtl:-scale-x-100 text-neutral-400 group-hover:text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 3. REGIONAL COMPLIANCE & WORKFORCE INITIATIVE BANNER */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
          <div className="rounded-2xl bg-gradient-to-r from-[#0F1013] via-[#16171B] to-[#0F1013] border border-[#26282D] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono font-medium tracking-wider text-neutral-400">
                  {isAr ? 'المبادرات والمعايير الوطنية المعتمدة' : 'National Workforce Standards & Mandates'}
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

        {/* 4. CITY DELIVERY DISTRICTS & TOP INDUSTRIES */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Districts / Delivery Zones */}
            <div className="rounded-2xl bg-[#0F1013] border border-[#26282D] p-6 sm:p-8 space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-white">
                <h3 className="text-lg sm:text-xl font-semibold font-heading">
                  {isAr ? `مناطق التدريب ومجمعات الأعمال في ${cityName}` : `Key Delivery Districts in ${cityName}`}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {isAr
                  ? `يقدم شركاؤنا ورش عمل حضورية في مقرات الشركات أو خلوات تدريبية راقية عبر أهم مناطق الأعمال:`
                  : `Our certified providers deliver on-site corporate workshops and executive retreats across premier business hubs:`}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {city.districts.map((district) => (
                  <span
                    key={district}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#16171B] border border-[#26282D] text-xs text-neutral-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                    <span>{district}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Top Industries */}
            <div className="rounded-2xl bg-[#0F1013] border border-[#26282D] p-6 sm:p-8 space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-white">
                <h3 className="text-lg sm:text-xl font-semibold font-heading">
                  {isAr ? `القطاعات الأكثر طلباً في ${cityName}` : `Primary Enterprise Sectors in ${cityName}`}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {isAr
                  ? `برامج مصممة خصيصاً لتحديات المشتريات والنمو في كبرى المنشآت المحلية والدولية:`
                  : `Curricula tailored to the operational demands and regulatory guidelines of top regional employers:`}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {topIndustries.map((ind) => (
                  <span
                    key={ind}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#16171B] border border-[#26282D] text-xs text-neutral-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                    <span>{ind}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. INTERACTIVE BUDGET & CURRENCY CALCULATOR */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
          <CityBudgetCalculator country={country} city={city} lang={lang} />
        </section>

        {/* 6. FEATURED SERVICES IN THIS LOCATION */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
          <div className="text-start mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white font-heading">
              {isAr ? `أبرز مجالات التدريب المعتمدة في ${cityName}` : `Featured Training Verticals in ${cityName}`}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {isAr
                ? `حلول مخصصة للإدارة العليا والفرق التخصصية مع مزودين معتمدين دولياً ومحلياً.`
                : `Accredited programs tailored for executive leadership and specialized technical cohorts.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {topServices.map((svc) => (
              <div
                key={svc.slug}
                className="rounded-2xl bg-[#0F1013] border border-[#26282D] p-6 hover:border-white/20 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white font-heading mb-2">
                    {isAr ? svc.titleAr : svc.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                    {isAr ? svc.shortDescAr : svc.shortDescEn}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(isAr ? svc.keyModulesAr : svc.keyModulesEn).slice(0, 2).map((mod) => (
                      <span key={mod} className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.05] text-neutral-300">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#26282D] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-400">
                    {isAr ? svc.accreditationAr : svc.accreditationEn}
                  </span>
                  <Link
                    href={`/${lang}/${countryCode}/services/${svc.slug}`}
                    className="text-xs font-medium text-neutral-400 hover:text-white inline-flex items-center gap-1.5 transition-colors group"
                  >
                    <span>{isAr ? 'عرض التفاصيل' : 'Explore Service'}</span>
                    <ArrowRight size={13} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. DUAL CONVERSION BRIDGE */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Track A: Enterprise Buyer Bridge */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0F1013] to-[#16171B] border border-[#26282D] p-8 sm:p-10 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-neutral-400 font-mono">
                  {isAr ? 'مسار الشركات والمشترين' : 'Track A • Enterprise Buyers'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white font-heading mt-2 mb-3">
                  {isAr ? `تطوير فرق العمل في ${cityName}` : `Upskill Your Team in ${cityName}`}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-sans">
                  {isAr
                    ? `قدم متطلباتك التدريبية في 60 ثانية، واحصل على 3 عروض مخصصة من أكاديميات معتمدة بدون أي رسوم وساطة أو التزامات.`
                    : `Specify your training requirements in 60 seconds. Receive 3 direct, curated bids from accredited academies with no broker markup.`}
                </p>
              </div>

              <div>
                <Link
                  href={`/${lang}/find-training`}
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white font-medium text-sm border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-sm active:scale-[0.98] transition-all duration-200 group sheen"
                >
                  <span>{isAr ? `طلب عروض تدريب في ${cityName}` : `Request Bids for ${cityName}`}</span>
                  <ArrowRight size={15} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Track B: Provider Partnership Bridge (With Orange Logo Badge) */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0F1013] to-[#1A120B] border border-orange-500/30 p-8 sm:p-10 flex flex-col justify-between shadow-xl shadow-orange-500/5">
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
                    {isAr ? 'مسار مزودي التدريب' : 'Track B • Training Providers'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white font-heading mt-2 mb-3">
                  {isAr ? `انضم كشريك تدريب في ${cityName}` : `Partner as a ${cityName} Provider`}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-sans">
                  {isAr
                    ? `استقبل طلبات تدريب مؤهلة من كبرى الشركات وصناع القرار في ${cityName}. بدون اشتراكات شهرية، الدفع فقط لكل عميل مهتم ومؤهل.`
                    : `Receive verified, pre-qualified corporate training inquiries from decision makers across ${cityName}. No retainers, 100% pay-per-lead.`}
                </p>
              </div>

              <div>
                <Link
                  href={`/${lang}/for-providers`}
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-[#FF5C00] hover:bg-[#FF6A1A] text-white font-semibold text-sm shadow-lg shadow-orange-500/25 active:scale-95 transition-all"
                >
                  <span>{isAr ? `تقديم طلب الاعتماد في ${cityName}` : `Apply for ${cityName} Partnership`}</span>
                  <ArrowRight size={15} className="rtl:-scale-x-100" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 8. LOCAL FAQ ACCORDION (Backed by FAQPage Schema) */}
        <section className="container-site max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-start mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white font-heading">
              {isAr ? `الأسئلة الشائعة حول التدريب في ${cityName}` : `Frequently Asked Questions • ${cityName}`}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {isAr
                ? `كل ما تحتاج لمعرفته حول المشتريات، والاعتمادات، وصيغ التنفيذ في السوق المحلي.`
                : `Key answers regarding enterprise procurement, accreditation, and delivery in this market.`}
            </p>
          </div>

          <FAQAccordion items={faqs} />
        </section>
      </div>
    </>
  );
}
