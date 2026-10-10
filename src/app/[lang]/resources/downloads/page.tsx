import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import Reveal from '@/components/shared/Reveal';
import { getResourcesStore } from '@/lib/resources-store';
import { Download, ArrowRight, FileText, CheckCircle2 } from '@/components/icons';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

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
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const toolkits = [
    {
      id: 'toolkit-tna',
      title: isAr
        ? 'نموذج تحديد الاحتياجات التدريبية المؤسسية (TNA Matrix)'
        : 'Enterprise Training Needs Analysis (TNA) Diagnostic Matrix',
      format: 'XLSX + PDF',
      fileSize: '2.4 MB',
      desc: isAr
        ? 'أداة تشخيص شاملة لفرز الفجوات المهارية عبر الأقسام، وتحديد البرامج التدريبية الحرجة بناءً على أولويات العمل.'
        : 'Structured diagnostic matrix to identify department-level skill gaps, map competency deficits, and prioritize high-impact training.',
      features: isAr
        ? ['مصفوفة جدارة لـ 14 وظيفة رئيسية', 'حساب تلقائي لدرجة الأولوية', 'متوافق مع تقارير القيادة']
        : ['Competency benchmarks across 14 job roles', 'Automated criticality scoring', 'Executive-ready summary dashboard'],
    },
    {
      id: 'toolkit-rfp',
      title: isAr
        ? 'مصفوفة تقييم ومقارنة عروض مزودي التدريب (Provider Scorecard)'
        : 'Corporate Training Provider RFP Evaluation Scorecard',
      format: 'XLSX Template',
      fileSize: '1.8 MB',
      desc: isAr
        ? 'معايير علمية لفحص عروض التدريب، تقييم سيرة المدربين، ومقارنة التكاليف والمخرجات دون تحيز.'
        : 'Objective evaluation rubric to compare provider proposals, audit trainer credentials, and verify track records with SLA clauses.',
      features: isAr
        ? ['وزن نسبي لجودة المدرب والمحتوى', 'مقارنة التكاليف بالساعة والشخص', 'بنود حوكمة وضمان الأداء']
        : ['Weighted scoring for trainer pedagogy', 'Per-seat & hourly cost normalization', 'Performance guarantee contract clauses'],
    },
    {
      id: 'toolkit-budget',
      title: isAr
        ? 'حاسبة العائد الاستثماري لمبادرات التدريب والتوطين'
        : 'GCC Workforce Nationalization & Training ROI Calculator',
      format: 'Interactive Sheet',
      fileSize: '3.1 MB',
      desc: isAr
        ? 'نموذج مالي لحساب التكاليف الحقيقية، أثر تقليل دوران الموظفين، والعائد على الاستثمار التدريبي لبرامج التوطين.'
        : 'Financial model to project training payback, retention gains, and net ROI for Saudization and Emiratization talent cohorts.',
      features: isAr
        ? ['حساب تكلفة الاستبدال والدوران', 'معادلات معتمدة لحساب الـ ROI', 'قوالب عرض لمديري المالية']
        : ['Turnover reduction modeling', 'Standardized Phillips/Kirkpatrick ROI formulas', 'CFO-ready business case slide template'],
    },
  ];

  const store = getResourcesStore();
  const dynamicToolkits = Array.isArray(store.downloads)
    ? store.downloads.map((dl) => ({
        id: dl.id,
        title: (isAr ? dl.titleAr : dl.titleEn) || dl.titleEn || dl.titleAr,
        format: dl.format || 'PDF',
        fileSize: dl.fileSize || '1.0 MB',
        desc: (isAr ? dl.descAr : dl.descEn) || dl.descEn || dl.descAr,
        features: (isAr ? dl.featuresAr : dl.featuresEn) || [],
      }))
    : toolkits;

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-neutral-100/80 text-xs font-mono uppercase tracking-wider text-neutral-700 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5C00]" />
              <Link href={`/${lang}/resources`} className="hover:text-black transition-colors">
                {isAr ? 'الموارد' : 'Resources'}
              </Link>
              <span className="text-neutral-400">/</span>
              <span className="text-neutral-950 font-semibold">{isAr ? 'التحميلات' : 'Downloads'}</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-neutral-950 tracking-tight leading-tight mb-4">
              {isAr ? 'أدوات ونماذج عمل قابلة للتحميل والتطبيق' : 'Executive Toolkits & Downloadable Frameworks'}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              {isAr
                ? 'صممت خصيصاً لمساعدة فرق الموارد البشرية والتدريب على تشخيص الاحتياجات، ضبط الميزانيات، واختيار المزود الأنسب دون هدر.'
                : 'Field-tested templates built to help GCC corporate leaders assess workforce needs, structure procurement RFPs, and verify training impact.'}
            </p>
          </Reveal>
        </div>

        {/* Grid of Toolkits */}
        {dynamicToolkits.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {dynamicToolkits.map((tool, idx) => (
              <Reveal key={tool.id} delay={0.1 * (idx + 1)}>
                <div className="h-full flex flex-col justify-between p-8 rounded-3xl bg-white hover:bg-neutral-50/80 border border-neutral-200 hover:border-neutral-300 transition-all duration-300 shadow-sm hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-12 w-12 rounded-2xl bg-[#FF5C00]/10 border border-[#FF5C00]/20 flex items-center justify-center text-[#FF5C00]">
                        <FileText size={22} />
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                        <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-medium">{tool.format}</span>
                        <span>{tool.fileSize}</span>
                      </div>
                    </div>

                    <h2 className="text-lg sm:text-xl font-heading font-bold text-neutral-950 mb-3">
                      {tool.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                      {tool.desc}
                    </p>

                    <div className="space-y-2 mb-8 pt-4 border-t border-neutral-200">
                      {tool.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                          <CheckCircle2 size={14} className="text-[#FF5C00] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Link
                      href={`/${lang}/contact?interest=${encodeURIComponent(tool.id)}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-neutral-950 hover:bg-black text-white font-semibold text-xs transition-all active:scale-95 shadow-sm"
                    >
                      <Download size={14} />
                      <span>{isAr ? 'طلب التحميل مجاناً' : 'Download Toolkit Free'}</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 text-center">
            <p className="text-base text-neutral-600 font-medium">
              {isAr ? 'لا توجد أدلة أو قوالب متاحة للتحميل حالياً.' : 'No downloadable toolkits available at this moment. Please check back soon.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
