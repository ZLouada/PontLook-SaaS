import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronRight } from 'lucide-react';
import {
  CountryCode,
  ALL_COUNTRY_CODES,
  getCountryData,
} from '@/data/geoData';
import { constructRegionalAlternates, SITE_URL, providerIcons } from '@/lib/seo/metadata';
import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
} from '@/lib/seo/schema';
import Reveal from '@/components/shared/Reveal';

export const dynamic = 'force-static';

interface ProvidersPageProps {
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

export async function generateMetadata({ params }: ProvidersPageProps): Promise<Metadata> {
  const resolved = await params;
  const lang = (resolved?.lang === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const countryCode = resolved?.country as CountryCode;

  const country = getCountryData(countryCode);
  if (!country) {
    return { title: 'Providers Not Found | PontLook' };
  }

  const isAr = lang === 'ar';
  const countryName = isAr ? country.nameAr : country.nameEn;
  const title = isAr
    ? `دليل وشبكة مزودي التدريب المعتمدين في ${countryName} | PontLook`
    : `Verified Corporate Training Provider Network in ${countryName} | PontLook`;
  const description = isAr
    ? `شبكة أكاديميات ومزودي التدريب المعتمدين للشركات في ${countryName}. تعرف على معايير التأهيل، أو قدم للانضمام كشريك تدريب معتمد.`
    : `Directory and network of accredited corporate training academies in ${countryName}. Discover vetting benchmarks or apply for provider partnership.`;

  return {
    title: { absolute: title },
    description,
    icons: providerIcons,
    alternates: constructRegionalAlternates({
      countryCode,
      lang,
      subpath: 'providers',
    }),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/${countryCode}/providers`,
      siteName: 'PontLook',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/brand/og-providers.png',
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
      images: ['/images/brand/og-providers.png'],
    },
  };
}

export default async function CountryProvidersPage({ params }: ProvidersPageProps) {
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
    { name: isAr ? 'شبكة المزودين' : 'Providers', url: `${SITE_URL}/${lang}/${countryCode}/providers` },
  ]);

  const vettingStandards = isAr
    ? [
        {
          title: 'الاعتمادات والتراخيص الرسمية',
          desc: `التحقق الصارم من التراخيص النظامية والاعتماد من الجهات الرقابية (${country.regulatoryBodies.join('، ')}).`,
        },
        {
          title: 'سوابق أعمال موثقة للشركات الكبرى',
          desc: `تقديم دراسات حالة وسجلات تدريب سابقة أثبتت كفاءتها مع منشآت كبرى ومؤسسات معتبرة.`,
        },
        {
          title: 'مدربون وخبراء معتمدون دولياً',
          desc: `سير ذاتية متخصصة لمدربين يحملون شهادات معتمدة وخبرات ميدانية لا تقل عن 8 سنوات.`,
        },
        {
          title: 'تقييم مستمر ومؤشرات رضا العملاء',
          desc: `متابعة دورية لمؤشرات الأداء (NPS) وتقييمات إدارات الموارد البشرية بعد كل دفعة تدريبية.`,
        },
      ]
    : [
        {
          title: 'Accreditation & Regulatory Compliance',
          desc: `Strict validation of trade licenses and endorsements from national regulators (${country.regulatoryBodies.join(', ')}).`,
        },
        {
          title: 'Verified Enterprise Track Record',
          desc: `Demonstrated case studies and references from corporate and government clients in this market.`,
        },
        {
          title: 'Certified Expert Instructors',
          desc: `Facilitators must possess verified international credentials and a minimum of 8 years sector experience.`,
        },
        {
          title: 'Continuous Quality & NPS Benchmarks',
          desc: `Post-cohort audit reports and corporate satisfaction ratings to maintain active network status.`,
        },
      ];

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
            <span className="text-white font-medium">{isAr ? 'شبكة المزودين' : 'Providers'}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
          <Reveal>
            <div className="max-w-4xl text-start">
              <div className="mb-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#16171B] border border-orange-500/30 text-xs font-mono text-neutral-300">
                <Image
                  src="/images/brand/pontlook-logo-orange.png"
                  alt="PontLook for Providers"
                  width={112}
                  height={28}
                  className="h-5 w-auto object-contain"
                />
                <span className="text-orange-400 border-s border-neutral-700 ps-2 uppercase tracking-wider font-semibold">
                  {countryName} • {isAr ? 'شبكة المزودين المعتمدة' : 'Accredited Provider Network'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight font-heading mb-6">
                {isAr
                  ? `شبكة مزودي التدريب المعتمدين في ${countryName}`
                  : `Corporate Training Provider Network in ${countryName}`}
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-3xl font-normal font-sans mb-8">
                {isAr
                  ? `نجمع كبرى أكاديميات التدريب ومعاهد التطوير القيادي المعتمدة في ${countryName}. نربط المزودين بفرص تعاقد حقيقية مع صناع القرار في كبرى المنشآت والشركات.`
                  : `Connecting verified training academies and executive leadership institutes in ${countryName} directly with high-intent enterprise buyers and procurement leaders.`}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/${lang}/for-providers/apply`}
                  className="inline-flex items-center justify-center gap-2.5 py-3.5 px-7 rounded-xl bg-[#FF5C00] hover:bg-[#FF6A1A] text-white font-medium text-sm sm:text-base shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all duration-200 group"
                >
                  <span>{isAr ? 'تقديم طلب الانضمام للشبكة' : 'Apply for Provider Partnership'}</span>
                  <ArrowRight size={16} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/${lang}/find-training`}
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-transparent hover:bg-white/[0.08] text-neutral-300 hover:text-white font-medium text-sm sm:text-base border border-[#26282D] hover:border-white/30 backdrop-blur-md transition-all duration-200 group"
                >
                  <span>{isAr ? 'أنا مشتري أبحث عن تدريب' : 'I Am a Buyer Seeking Training'}</span>
                  <ArrowRight size={15} className="rtl:-scale-x-100 text-neutral-400 group-hover:text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Vetting Criteria */}
        <section className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
          <div className="text-start mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white font-heading">
              {isAr ? `معايير تأهيل الأكاديميات في ${countryName}` : `Provider Accreditation Standards in ${countryName}`}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {isAr ? 'معايير اختيار صارمة تضمن أعلى مستويات الجودة والحوكمة:' : 'Rigorous vetting criteria ensuring enterprise-grade governance and delivery:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vettingStandards.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-2xl bg-[#0F1013] border border-[#26282D] p-6 sm:p-8 space-y-3 shadow-lg hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center text-xs font-bold font-mono shrink-0">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-white font-heading">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed ps-11">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
