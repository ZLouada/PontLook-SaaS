import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronRight } from 'lucide-react';
import {
  CountryCode,
  ALL_COUNTRY_CODES,
  getCountryData,
} from '@/data/geoData';
import { constructRegionalAlternates, SITE_URL } from '@/lib/seo/metadata';
import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
} from '@/lib/seo/schema';
import Reveal from '@/components/shared/Reveal';

export const dynamic = 'force-static';

interface LocationsIndexProps {
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

export async function generateMetadata({ params }: LocationsIndexProps): Promise<Metadata> {
  const resolved = await params;
  const lang = (resolved?.lang === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const countryCode = resolved?.country as CountryCode;

  const country = getCountryData(countryCode);
  if (!country) {
    return { title: 'Locations Not Found | PontLook' };
  }

  const isAr = lang === 'ar';
  const countryName = isAr ? country.nameAr : country.nameEn;
  const title = isAr
    ? `دليل المدن والمراكز الإقليمية للتدريب في ${countryName} | PontLook`
    : `Regional Corporate Training Directories in ${countryName} | PontLook`;
  const description = isAr
    ? `استعرض دليل المدن ومراكز الأعمال الرئيسية في ${countryName}. تعرف على مزودي التدريب، والقطاعات الاقتصادية، ونطاقات الأسعار المحلية.`
    : `Explore verified corporate training directories across major cities in ${countryName}. Vetted academies, local industry specializations, and investment benchmarks.`;

  return {
    title: { absolute: title },
    description,
    alternates: constructRegionalAlternates({
      countryCode,
      lang,
      subpath: 'locations',
    }),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/${countryCode}/locations`,
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

export default async function LocationsIndexPage({ params }: LocationsIndexProps) {
  const resolved = await params;
  const lang = (resolved?.lang === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const countryCode = resolved?.country as CountryCode;

  const country = getCountryData(countryCode);
  if (!country) {
    notFound();
  }

  const isAr = lang === 'ar';
  const countryName = isAr ? country.nameAr : country.nameEn;

  const orgSchema = buildOrganizationSchema();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${lang}` },
    { name: countryName, url: `${SITE_URL}/${lang}/${countryCode}` },
    { name: isAr ? 'المواقع الإقليمية' : 'Locations', url: `${SITE_URL}/${lang}/${countryCode}/locations` },
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
            <span className="text-white font-medium">{isAr ? 'المواقع الإقليمية' : 'Locations'}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
          <Reveal>
            <div className="max-w-3xl text-start">
              <div className="mb-5 inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#16171B] border border-[#26282D] text-xs font-mono text-neutral-300">
                <span>{countryName} • {isAr ? 'دليل المدن والمراكز الإقليمية' : 'Regional Hubs Directory'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight font-heading mb-4">
                {isAr
                  ? `دليل مدن ومراكز التدريب المؤسسي في ${countryName}`
                  : `Corporate Training Locations across ${countryName}`}
              </h1>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl font-sans">
                {isAr
                  ? `استعرض المراكز الإقليمية ومجمعات الأعمال لتحديد مزودي التدريب المؤهلين لتنفيذ الورش الحضورية والهجينة لمؤسستك.`
                  : `Explore dedicated city directories to connect with accredited providers offering on-site workshops, executive retreats, and corporate coaching.`}
              </p>
            </div>
          </Reveal>
        </section>

        {/* City Directory Cards */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {country.cities.map((city) => (
              <div
                key={city.slug}
                className="rounded-2xl bg-[#0F1013] border border-[#26282D] p-6 sm:p-7 flex flex-col justify-between shadow-lg hover:border-white/20 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-medium text-neutral-300">
                      {isAr ? city.nameAr : city.nameEn}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-white/[0.05] text-neutral-300">
                      {country.currency}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white font-heading mb-2 group-hover:text-neutral-200 transition-colors">
                    {isAr ? city.heroTitleAr : city.heroTitleEn}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-4 line-clamp-3">
                    {isAr ? city.leadParagraphAr : city.leadParagraphEn}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#26282D] mb-4">
                    <span className="text-[11px] font-semibold text-neutral-300 block">
                      {isAr ? 'أهم مناطق التدريب:' : 'Key Districts:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {city.districts.slice(0, 3).map((dist) => (
                        <span key={dist} className="text-[10px] px-2 py-0.5 rounded-md bg-[#16171B] text-neutral-400">
                          {dist}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/${lang}/${countryCode}/locations/${city.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white font-medium text-xs border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-sm active:scale-[0.98] transition-all duration-200 group/btn sheen"
                >
                  <span>{isAr ? `استعراض مزودي ${city.nameAr}` : `Explore ${city.nameEn} Hub`}</span>
                  <ArrowRight size={13} className="rtl:-scale-x-100 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
