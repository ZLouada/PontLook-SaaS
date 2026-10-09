import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import Reveal from '@/components/shared/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';
import { BookOpen, Headphones, Download, Calendar, ArrowRight, ArrowUpRight } from '@/components/icons';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'الموارد والأبحاث | منصة PontLook للتدريب المؤسسي'
    : 'Resources & Insights | PontLook B2B Matchmaking';
  const description = isAr
    ? 'استكشف أحدث المقالات، وحلقات البودكاست، والتقارير القابلة للتحميل، والفعاليات التنفيذية المتخصصة في تدريب وتطوير الكفاءات في الخليج.'
    : 'Explore in-depth corporate training guides, executive podcasts, downloadable toolkits, and upcoming GCC workforce development events.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: constructAlternates(lang, 'resources'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/resources`,
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

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const sections = [
    {
      id: 'blog',
      title: isAr ? 'المدونة ومقالات الخبراء' : 'Blog & In-Depth Guides',
      desc: isAr
        ? 'تحليلات واقعية حول تحديات سوق العمل الخليجي، مؤشرات السعودة والإمرتة، وأطر قياس العائد التدريبي.'
        : 'Actionable workforce benchmarks, Saudization/Emiratization ROI frameworks, and corporate L&D strategy guides.',
      href: `/${lang}/resources/blog`,
      icon: BookOpen,
      badge: isAr ? 'محدث أسبوعياً' : 'Weekly Insights',
      cta: isAr ? 'تصفح المقالات' : 'Read Articles',
    },
    {
      id: 'podcasts',
      title: isAr ? 'بودكاست التدريب المؤسسي' : 'Executive Podcasts',
      desc: isAr
        ? 'حوارات معمقة مع قادة الموارد البشرية ومديري التدريب حول تطوير المهارات وبناء فرق عالية الأداء.'
        : 'Conversations with Chief Learning Officers and VP HR executives across Saudi Arabia and the UAE.',
      href: `/${lang}/resources/podcasts`,
      icon: Headphones,
      badge: isAr ? 'حلقات صوتية' : 'Audio Series',
      cta: isAr ? 'استمع للحلقات' : 'Listen Now',
    },
    {
      id: 'downloads',
      title: isAr ? 'النماذج والتقارير القابلة للتحميل' : 'Downloads & Toolkits',
      desc: isAr
        ? 'أدلة إرشادية جاهزة، مصفوفات تقييم الاحتياج التدريبي (TNA)، وقوالب حساب الميزانيات مجاناً.'
        : 'Ready-to-use Training Needs Analysis (TNA) spreadsheets, RFP evaluation matrices, and budgeting templates.',
      href: `/${lang}/resources/downloads`,
      icon: Download,
      badge: isAr ? 'قوالب مجانية' : 'Free Templates',
      cta: isAr ? 'استكشف التحميلات' : 'Get Toolkits',
    },
    {
      id: 'events',
      title: isAr ? 'الفعاليات وورش العمل' : 'Events & Roundtables',
      desc: isAr
        ? 'ندوات رقمية، موائد مستديرة تنفيذية، وورش عمل متخصصة تجمع صناع القرار بنخبة مدربي المنطقة.'
        : 'Closed-door executive roundtables, interactive webinars, and curated GCC corporate training matchmaking summits.',
      href: `/${lang}/resources/events`,
      icon: Calendar,
      badge: isAr ? 'مباشر وتفاعلي' : 'Live & Virtual',
      cta: isAr ? 'استعرض الفعاليات' : 'View Schedule',
    },
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono uppercase tracking-wider text-neutral-300 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5C00]" />
            {isAr ? 'مركز الموارد والمعرفة' : 'PontLook Resource Center'}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight mb-5">
            {isAr ? 'كل ما تحتاجه لبناء كفاءات مؤسسية رائدة' : 'Everything You Need to Scale Corporate Learning in the GCC'}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed">
            {isAr
              ? 'أدلة بحثية مجانية، حوارات بودكاست تنفيذية، نماذج عمل قابلة للتطبيق، وفعاليات حصرية للربط بين منشآت الخليج وخبرات التدريب.'
              : 'Free benchmarks, executive podcasts, proven diagnostic toolkits, and curated matchmaking events designed for enterprise leaders.'}
          </p>
        </Reveal>
      </div>

      {/* Grid of 4 Hub Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {sections.map((section, idx) => {
          const IconComponent = section.icon;
          return (
            <Reveal key={section.id} delay={0.1 * (idx + 1)}>
              <Link
                href={section.href}
                className="group relative flex flex-col justify-between p-8 rounded-3xl bg-[#121316]/80 hover:bg-[#16171B] border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-xl overflow-hidden min-h-[300px]"
              >
                {/* Glow on hover */}
                <div className="absolute -top-24 -end-24 w-48 h-48 bg-[#FF5C00]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF5C00]/20 transition-all duration-500" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white group-hover:bg-[#FF5C00] group-hover:border-[#FF5C00] group-hover:text-black transition-all duration-300">
                      <IconComponent size={22} />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02]">
                      {section.badge}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-white group-hover:text-white transition-colors mb-3">
                    {section.title}
                  </h2>

                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {section.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-neutral-300 group-hover:text-[#FF5C00] transition-colors">
                  <span>{section.cta}</span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100 transition-transform" />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
