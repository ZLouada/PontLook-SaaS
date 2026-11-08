import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, i18n, isArabicLocale } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import Reveal from '@/components/shared/Reveal';
import { getDownloads } from '@/lib/payload/resources';
import { DownloadsLibraryClient } from '@/components/resources/DownloadsLibraryClient';
import { Download, ArrowRight, FileText, CheckCircle2 } from '@/components/icons';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = isArabicLocale(lang);

  const title = isAr
    ? 'النماذج والتقارير القابلة للتحميل | منصة PontLook'
    : 'L&D Toolkits & Downloadable Templates | PontLook';
  const description = isAr
    ? 'حمل مجاناً نماذج تقييم الاحتياج التدريبي (TNA)، مصفوفات تقييم عروض المدربين، وقوالب حساب الميزانيات المعتمدة في الخليج.'
    : 'Download free enterprise Training Needs Analysis spreadsheets, RFP scorecards, and Saudization/Emiratization ROI calculator templates.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: constructAlternates(lang, 'resources/downloads'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/resources/downloads`,
      siteName: 'PontLook',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://pontlook.com/images/brand/og-main.png',
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

export default async function DownloadsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (rawLang as Locale) || 'en';
  const isAr = isArabicLocale(lang);

  const dynamicToolkits = await getDownloads(lang);

  return (
    <div
      data-nav-light="true"
      data-nav-theme="light"
      className="min-h-screen bg-white text-neutral-900 transition-colors duration-200"
    >
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-neutral-100/80 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.06em] text-neutral-700 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5C00]" />
              <Link href={`/${lang}/resources`} className="hover:text-black transition-colors">
                {isAr ? 'الموارد' : 'Resources'}
              </Link>
              <span className="text-neutral-400">/</span>
              <span className="text-neutral-950 font-semibold">{isAr ? 'التحميلات' : 'Downloads'}</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 leading-[1.1] mb-4">
              {isAr ? 'أدوات ونماذج عمل قابلة للتحميل والتطبيق' : 'Executive Toolkits & Downloadable Frameworks'}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="font-sans text-base sm:text-lg font-normal leading-relaxed text-neutral-600">
              {isAr
                ? 'صممت خصيصاً لمساعدة فرق الموارد البشرية والتدريب على تشخيص الاحتياجات، ضبط الميزانيات، واختيار المزود الأنسب دون هدر.'
                : 'Field-tested templates built to help GCC corporate leaders assess workforce needs, structure procurement RFPs, and verify training impact.'}
            </p>
          </Reveal>
        </div>

        {/* Interactive Resource Library (HubSpot Model with Filters & Search) */}
        <Reveal delay={0.25}>
          <DownloadsLibraryClient
            initialToolkits={dynamicToolkits}
            isAr={isAr}
            lang={lang}
          />
        </Reveal>
      </div>
    </div>
  );
}
