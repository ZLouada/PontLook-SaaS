import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronRight } from '@/components/icons';
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
} from '@/lib/seo/schema';
import Reveal from '@/components/shared/Reveal';

export const dynamic = 'force-static';

interface ServicesIndexProps {
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

export async function generateMetadata({ params }: ServicesIndexProps): Promise<Metadata> {
  const resolved = await params;
  const lang = (resolved?.lang === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const countryCode = resolved?.country as CountryCode;

  const country = getCountryData(countryCode);
  if (!country) {
    return { title: 'Services Not Found | PontLook' };
  }

  const isAr = lang === 'ar';
  const countryName = isAr ? country.nameAr : country.nameEn;
  const title = isAr
    ? `دليل خدمات التدريب المؤسسي المعتمدة في ${countryName} | PontLook`
    : `Corporate Training Services & Programs in ${countryName} | PontLook`;
  const description = isAr
    ? `استكشف مجالات وتخصصات التدريب المؤسسي في ${countryName}. برامج القيادة التنفيذية، والتفاوض التجاري، والذكاء الاصطناعي، والحوكمة، وإدارة المشاريع.`
    : `Explore enterprise corporate training service verticals across ${countryName}. Leadership development, commercial sales negotiation, AI upskilling, and GRC compliance.`;

  return {
    title: { absolute: title },
    description,
    alternates: constructRegionalAlternates({
      countryCode,
      lang,
      subpath: 'services',
    }),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/${countryCode}/services`,
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

export default async function ServicesIndexPage({ params }: ServicesIndexProps) {
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

  const orgSchema = buildOrganizationSchema();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${lang}` },
    { name: countryName, url: `${SITE_URL}/${lang}/${countryCode}` },
    { name: isAr ? 'دليل الخدمات' : 'Services', url: `${SITE_URL}/${lang}/${countryCode}/services` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([orgSchema, breadcrumbSchema]),
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
            <span className="text-white font-medium">{isAr ? 'دليل الخدمات' : 'Services'}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
          <Reveal>
            <div className="max-w-3xl text-start">
              <div className="mb-5 inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#16171B] border border-[#26282D] text-xs font-mono text-neutral-300">
                <span>{countryName} • {isAr ? 'مجالات التدريب المؤسسي' : 'Enterprise Service Catalog'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight font-heading mb-4">
                {isAr
                  ? `تخصصات التدريب المؤسسي المعتمدة في ${countryName}`
                  : `Accredited Training Services in ${countryName}`}
              </h1>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl font-sans">
                {isAr
                  ? `برامج تطوير معتمدة تلبي احتياجات الإدارة العليا، وفرق العمل التجارية، والقطاعات التقنية المتوافقة مع متطلبات ${countryName}.`
                  : `Structured capability building curricula designed for enterprise leadership, commercial sales, and technical teams in ${countryName}.`}
              </p>
            </div>
          </Reveal>
        </section>

        {/* Services Grid */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {services.map((svc) => (
              <div
                key={svc.slug}
                className="rounded-2xl bg-[#0F1013] border border-[#26282D] p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:border-white/20 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-neutral-400 font-medium">
                      {isAr ? svc.accreditationAr : svc.accreditationEn}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white font-heading mb-3 group-hover:text-neutral-200 transition-colors">
                    {isAr ? svc.titleAr : svc.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5">
                    {isAr ? svc.shortDescAr : svc.shortDescEn}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-semibold text-neutral-300 block">
                      {isAr ? 'الفئات المستهدفة:' : 'Target Audience:'}
                    </span>
                    <p className="text-xs text-neutral-400 font-mono">
                      {isAr ? svc.audienceAr : svc.audienceEn}
                    </p>
                  </div>

                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-semibold text-neutral-300 block">
                      {isAr ? 'أهم المحاور التدريبية:' : 'Core Modules:'}
                    </span>
                    <ul className="space-y-2">
                      {(isAr ? svc.keyModulesAr : svc.keyModulesEn).map((mod) => (
                        <li key={mod} className="text-xs text-neutral-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0 mt-1.5" />
                          <span>{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#26282D]">
                  <Link
                    href={`/${lang}/${countryCode}/services/${svc.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white font-medium text-xs sm:text-sm border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-sm active:scale-[0.98] transition-all duration-200 group/btn sheen"
                  >
                    <span>{isAr ? `استكشاف ${svc.titleAr}` : `View ${svc.titleEn}`}</span>
                    <ArrowRight size={14} className="rtl:-scale-x-100 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
