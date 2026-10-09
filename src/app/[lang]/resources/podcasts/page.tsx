import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import Reveal from '@/components/shared/Reveal';
import { Headphones, ArrowRight, Calendar, Clock, Globe } from '@/components/icons';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'بودكاست التدريب المؤسسي | منصة PontLook'
    : 'Corporate Learning & Leadership Podcasts | PontLook';
  const description = isAr
    ? 'حوارات صوتية حصرية مع قادة الموارد البشرية ومسؤولي التطوير والتدريب في كبرى شركات السعودية والإمارات والخليج.'
    : 'Exclusive audio interviews with Chief People Officers, VP Talent, and corporate training executives across the GCC.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: constructAlternates(lang, 'resources/podcasts'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/resources/podcasts`,
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

export default async function PodcastsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const isAr = lang === 'ar';

  const episodes = [
    {
      id: 'ep-01',
      title: isAr
        ? 'قياس العائد على الاستثمار التدريبي في قطاع البنوك والتقنية'
        : 'Demystifying Training ROI: How Top GCC Banks Evaluate Provider Impact',
      guest: isAr ? 'فهد القحطاني — رئيس تطوير الكفاءات' : 'Fahad Al-Qahtani — Head of Talent & Learning',
      duration: '42 min',
      date: isAr ? 'أكتوبر 2026' : 'October 2026',
      desc: isAr
        ? 'كيف تنتقل من قياس رضا المتدربين إلى قياس الأثر المالي والتشغيلي المباشر للبرامج التدريبية.'
        : 'Moving beyond smile sheets to measurable business KPIs and executive board reporting.',
      tag: isAr ? 'استراتيجية وتأهيل' : 'Strategy & Metrics',
    },
    {
      id: 'ep-02',
      title: isAr
        ? 'التوطين وتحديات تدريب المهارات القيادية الشابة'
        : 'Saudization & Emiratization: Accelerating Young Leadership Pipelines',
      guest: isAr ? 'سارة المنصوري — مستشارة رأس المال البشري' : 'Sarah Al-Mansoor — Human Capital Advisory Director',
      duration: '38 min',
      date: isAr ? 'سبتمبر 2026' : 'September 2026',
      desc: isAr
        ? 'أفضل الممارسات لتأهيل القيادات الشابة ومواءمة البرامج مع متطلبات رؤية 2030.'
        : 'Designing immersive, cohort-based leadership programs that retain high-potential regional talent.',
      tag: isAr ? 'القيادة والتوطين' : 'Leadership & Nationalization',
    },
    {
      id: 'ep-03',
      title: isAr
        ? 'كيف تختار الشركات مزود التدريب المناسب دون عناء الوسطاء؟'
        : 'The Provider Selection Playbook: Avoiding Procurement Traps in B2B L&D',
      guest: isAr ? 'ماجد العتيبي — مدير المشتريات المؤسسية' : 'Majed Al-Otaibi — Senior Corporate Procurement Lead',
      duration: '45 min',
      date: isAr ? 'سبتمبر 2026' : 'September 2026',
      desc: isAr
        ? 'معايير فحص العروض، التدقيق في اعتمادات المدربين، وتجنب الهدر المالي في المناقصات التقليدية.'
        : 'Behind-the-scenes procurement criteria, verifying trainer track records, and structuring performance SLAs.',
      tag: isAr ? 'المشتريات والحوكمة' : 'Procurement & Governance',
    },
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-14">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono uppercase tracking-wider text-neutral-300 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5C00]" />
            <Link href={`/${lang}/resources`} className="hover:text-white transition-colors">
              {isAr ? 'الموارد' : 'Resources'}
            </Link>
            <span className="text-neutral-500">/</span>
            <span className="text-white">{isAr ? 'البودكاست' : 'Podcasts'}</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight mb-4">
            {isAr ? 'بودكاست حوارات التدريب المؤسسي' : 'The Corporate L&D Leadership Podcast'}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'حوارات صريحة وغير مكررة مع صُنّاع القرار في كبرى المنشآت والجهات التدريبية حول أحدث توجهات تطوير الكوادر.'
              : 'Direct conversations with enterprise talent deciders and vetted training directors navigating workforce transformation across the GCC.'}
          </p>
        </Reveal>
      </div>

      {/* Episodes list */}
      <div className="space-y-6">
        {episodes.map((ep, idx) => (
          <Reveal key={ep.id} delay={0.1 * (idx + 1)}>
            <div className="p-8 rounded-3xl bg-[#121316]/80 hover:bg-[#16171B] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
              <div className="flex items-start gap-4 flex-1">
                <div className="h-14 w-14 rounded-2xl bg-[#FF5C00]/10 border border-[#FF5C00]/20 text-[#FF5C00] flex items-center justify-center shrink-0">
                  <Headphones size={24} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-400 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] text-neutral-300 font-medium">
                      {ep.tag}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px] text-neutral-500">
                      <Clock size={11} />
                      {ep.duration}
                    </span>
                    <span className="text-neutral-500">•</span>
                    <span className="font-mono text-[11px] text-neutral-500">{ep.date}</span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-heading font-bold text-white mb-1.5">
                    {ep.title}
                  </h2>

                  <p className="text-xs text-[#FF5C00] font-medium mb-2">
                    {ep.guest}
                  </p>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl">
                    {ep.desc}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-auto shrink-0 flex items-center gap-3">
                <button
                  type="button"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-all shadow-md active:scale-95"
                >
                  <Headphones size={14} />
                  <span>{isAr ? 'استمع للحلقة' : 'Listen Episode'}</span>
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
