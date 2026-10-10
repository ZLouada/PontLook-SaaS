import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import Reveal from '@/components/shared/Reveal';
import { sanityFetch } from '@/sanity/lib/live';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import { getResourcesStore } from '@/lib/resources-store';
import {
  BookOpen,
  Headphones,
  Download,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  FileText,
  Clock,
  User,
  CheckCircle2,
  Folder,
  RefreshCw,
} from '@/components/icons';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'مركز الموارد والأبحاث | منصة PontLook للتدريب المؤسسي'
    : 'Resource Hub for HR & Corporate L&D Leaders | PontLook';
  const description = isAr
    ? 'استكشف أحدث المقالات، وحلقات البودكاست، والتقارير القابلة للتحميل، والفعاليات التنفيذية المتخصصة في تدريب وتطوير الكفاءات في الخليج.'
    : 'Explore GoodHabitz-inspired resource library: in-depth corporate training guides, executive podcasts, downloadable toolkits, and upcoming GCC workforce events.';

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

  // Fetch real posts from Sanity if available
  let sanityPosts: any[] = [];
  try {
    const { data } = await sanityFetch({ query: POSTS_QUERY });
    if (data && Array.isArray(data)) {
      sanityPosts = data;
    }
  } catch (err) {
    // Graceful fallback if studio is offline or empty
    sanityPosts = [];
  }

  // Load dynamic content from JSON store (managed via /admin CMS)
  const store = getResourcesStore();
  const heroTitle = (isAr ? store.hero.titleAr : store.hero.titleEn) || (isAr ? 'مركز موارد التدريب والتطوير في PontLook' : 'The PontLook L&D resource hub');
  const heroSubtitle = (isAr ? store.hero.subtitleAr : store.hero.subtitleEn) || (isAr ? 'رؤى واستراتيجيات وموارد لمساعدة المنشآت على بناء كوادر أقوى من خلال قرارات تدريبية أفضل.' : 'Insights, strategies, and resources to help organisations build stronger workforces through better training decisions.');
  const spotlight = store.spotlight;
  const editorPickEvent = store.editorPickEvent;
  const editorPickToolkit = store.editorPickToolkit;

  // Curated fallback articles for rich presentation
  const fallbackArticles = [
    {
      title: isAr
        ? 'بناء المهارات القيادية في عصر الذكاء الاصطناعي: ٥ كفاءات غير قابلة للتفاوض'
        : 'Human Skills in the Age of AI: 5 Non-Negotiable Leadership Capabilities',
      category: isAr ? 'استراتيجيات التدريب' : 'L&D STRATEGIES',
      readTime: isAr ? '٦ دقائق قراءة' : '6 min read',
      date: isAr ? '٢٥ سبتمبر ٢٠٢٦' : 'Sep 25, 2026',
      excerpt: isAr
        ? 'كيف توازن المنشآت الرائدة بين الأتمتة التقنية وتطوير التفكير النقدي، والتواصل التنفيذي، والذكاء العاطفي لفرق العمل.'
        : 'How leading enterprises balance technical automation with critical thinking, executive communication, and emotional resilience.',
      slug: 'human-skills-in-the-age-of-ai',
    },
    {
      title: isAr
        ? 'مواءمة التدريب مع مستهدفات التوطين (نطاقات ونافس): دليل الموارد البشرية'
        : 'Saudization & Emiratization ROI: Aligning L&D With National Quotas',
      category: isAr ? 'حوكمة وتوطين' : 'NATIONAL TALENT',
      readTime: isAr ? '٨ دقائق قراءة' : '8 min read',
      date: isAr ? '١٨ سبتمبر ٢٠٢٦' : 'Sep 18, 2026',
      excerpt: isAr
        ? 'تحويل متطلبات التوطين من مجرد أرقام امتثال إلى برامج تطوير وظيفي مستدامة تعزز الإنتاجية والولاء المؤسسي.'
        : 'Transforming compliance quotas into high-retention talent pipelines through accredited vocational and corporate academies.',
      slug: 'saudization-emiratization-roi-framework',
    },
    {
      title: isAr
        ? 'كيف تحسب العائد الفعلي على الاستثمار التدريبي (ROI) لفرق المبيعات والعمليات؟'
        : 'How to Calculate True Corporate Training ROI for Enterprise Teams',
      category: isAr ? 'قياس الأثر' : 'IMPACT & METRICS',
      readTime: isAr ? '٥ دقائق قراءة' : '5 min read',
      date: isAr ? '١٢ سبتمبر ٢٠٢٦' : 'Sep 12, 2026',
      excerpt: isAr
        ? 'صيغ عملية ومؤشرات أداء واضحة لعزل أثر البرامج التدريبية وقياس مساهمتها المباشرة في الإيرادات وتقليل الأخطاء.'
        : 'Actionable equations and KPI matrices to isolate training effects and quantify operational improvements for executive boards.',
      slug: 'calculate-true-corporate-training-roi',
    },
  ];

  const dynamicArticles = store.articles && store.articles.length > 0
    ? store.articles.map((art) => ({
        title: isAr ? art.titleAr : art.titleEn,
        category: isAr ? art.categoryAr : art.categoryEn,
        readTime: isAr ? art.readTimeAr : art.readTimeEn,
        date: isAr ? art.dateAr : art.dateEn,
        excerpt: isAr ? art.excerptAr : art.excerptEn,
        slug: art.slug,
      }))
    : fallbackArticles;

  const categoryPills = [
    { label: isAr ? 'كافة الموارد' : 'All Resources', href: `/${lang}/resources`, active: true },
    { label: isAr ? 'المدونة' : 'Blog', href: `/${lang}/resources/blog` },
    { label: isAr ? 'الفعاليات' : 'Events', href: `/${lang}/resources/events` },
    { label: isAr ? 'التحميلات' : 'Downloads', href: `/${lang}/resources/downloads` },
    { label: isAr ? 'دراسات الحالة' : 'Case Studies', href: '#case-studies' },
    { label: isAr ? 'البودكاست' : 'Podcasts', href: `/${lang}/resources/podcasts` },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 transition-colors duration-200">
      {/* ======================================================== */}
      {/* 1. ORANGE HERO WINDOW (GoodHabitz Inspired Style)         */}
      {/* ======================================================== */}
      <section className="relative w-full bg-[#FF5C00] text-white rounded-b-[2.5rem] sm:rounded-b-[3.5rem] lg:rounded-b-[48px] overflow-hidden pt-36 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 text-center shadow-lg">
        {/* Subtle ambient highlight for high-end polish */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/15 via-transparent to-black/10 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <Reveal>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-heading font-extrabold text-white tracking-tight leading-[1.08] mb-5 sm:mb-6 max-w-3xl">
              {heroTitle}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-white/95 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl sm:max-w-3xl">
              {heroSubtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ======================================================== */}
      {/* WHITE CONTENT BODY (Triggers light theme navbar on scroll)*/}
      {/* ======================================================== */}
      <div
        data-nav-light="true"
        data-nav-theme="light"
        className="relative pt-10 sm:pt-14 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {/* ======================================================== */}
        {/* 2. CATEGORY PILL FILTER NAVIGATION TABS                  */}
        {/* ======================================================== */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 sm:mb-14 border-b border-neutral-200 no-scrollbar">
          {categoryPills.map((pill, idx) => (
            <Link
              key={idx}
              href={pill.href}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                pill.active
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 hover:text-neutral-950 border border-neutral-200'
              }`}
            >
              {pill.label}
            </Link>
          ))}
        </div>

        {/* ======================================================== */}
        {/* 3. FEATURED SPOTLIGHT GRID (GoodHabitz Inspired Layout)   */}
        {/* ======================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Main Large Spotlight Card (8 Cols) */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-3 block">
                {isAr ? 'محتوى مميز' : 'FEATURED'}
              </span>
              <Link
                href={`/${lang}/resources/blog`}
                className="group relative flex flex-col justify-between h-full rounded-3xl bg-white border border-neutral-200 hover:border-neutral-400 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl"
              >
                <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/9] w-full bg-neutral-100 overflow-hidden">
                  <Image
                    src={spotlight.image || '/executive_training_room.jpg'}
                    alt="GCC Corporate Training Benchmark"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 start-4 sm:top-6 sm:start-6 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md border border-white/30">
                      {isAr ? spotlight.badgeAr : spotlight.badgeEn}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FF5C00] text-white">
                      {isAr ? spotlight.categoryAr : spotlight.categoryEn}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 mb-3">
                      <span>{isAr ? spotlight.readTimeAr : spotlight.readTimeEn}</span>
                      <span>•</span>
                      <span>{isAr ? spotlight.dateAr : spotlight.dateEn}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-neutral-950 group-hover:text-black transition-colors leading-tight mb-4">
                      {isAr ? spotlight.titleAr : spotlight.titleEn}
                    </h2>
                    <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                      {isAr ? spotlight.excerptAr : spotlight.excerptEn}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-between text-sm font-semibold text-neutral-950 group-hover:text-[#FF5C00] transition-colors">
                    <span>{isAr ? spotlight.ctaAr : spotlight.ctaEn}</span>
                    <ArrowRight size={18} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Right 2-Card Stack (4 Cols) */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-3 block">
                {isAr ? 'اختيار المحرر' : "EDITOR'S PICK"}
              </span>
              <div className="flex flex-col gap-6 sm:gap-8 justify-between flex-1">
              {/* Card A: Upcoming Event */}
              <Link
                href={`/${lang}/resources/events`}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-all duration-300 shadow-sm hover:shadow-md flex-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-neutral-200 text-neutral-800 border border-neutral-300">
                      {isAr ? editorPickEvent.badgeAr : editorPickEvent.badgeEn}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      {isAr ? editorPickEvent.dateAr : editorPickEvent.dateEn}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-neutral-950 group-hover:text-[#FF5C00] transition-colors leading-snug mb-2">
                    {isAr ? editorPickEvent.titleAr : editorPickEvent.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {isAr ? editorPickEvent.descAr : editorPickEvent.descEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-semibold text-neutral-950 group-hover:text-[#FF5C00] transition-colors">
                  <span>{isAr ? editorPickEvent.ctaAr : editorPickEvent.ctaEn}</span>
                  <ArrowRight size={15} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Card B: Downloadable Toolkit */}
              <Link
                href={`/${lang}/resources/downloads`}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-all duration-300 shadow-sm hover:shadow-md flex-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#FF5C00]/10 text-[#FF5C00] border border-[#FF5C00]/25 font-bold">
                      {isAr ? editorPickToolkit.badgeAr : editorPickToolkit.badgeEn}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      {isAr ? 'جاهز للتطبيق' : 'Instant Download'}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-neutral-950 group-hover:text-[#FF5C00] transition-colors leading-snug mb-2">
                    {isAr ? editorPickToolkit.titleAr : editorPickToolkit.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {isAr ? editorPickToolkit.descAr : editorPickToolkit.descEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-semibold text-neutral-950 group-hover:text-[#FF5C00] transition-colors">
                  <span>{isAr ? editorPickToolkit.ctaAr : editorPickToolkit.ctaEn}</span>
                  <Download size={15} />
                </div>
              </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. THE CORPORATE L&D BLOG SECTION                        */}
        {/* ======================================================== */}
        <section className="mb-20 sm:mb-28 pt-10 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
                {isAr ? 'المدونة ومقالات الخبراء' : 'THE CORPORATE L&D BLOG'}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-neutral-950">
                {isAr ? 'أحدث المقالات والرؤى الميدانية' : 'Latest Articles & Practical Guides'}
              </h2>
            </div>
            <Link
              href={`/${lang}/resources/blog`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-black transition-colors"
            >
              <span>{isAr ? 'تصفح كافة المقالات' : 'View all blog posts'}</span>
              <ArrowRight size={14} className="rtl:-scale-x-100" />
            </Link>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {(sanityPosts && sanityPosts.length > 0 ? sanityPosts.slice(0, 3) : dynamicArticles).map(
              (article: any, idx: number) => {
                const isSanity = Boolean(article._id);
                const title = article.title;
                const excerpt = article.excerpt || article.title;
                const date = isSanity && article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : article.date || 'Oct 2026';
                const category = isSanity && article.categories?.[0]
                  ? article.categories[0].title
                  : article.category || (isAr ? 'تدريب مؤسسي' : 'L&D STRATEGIES');
                const href = isSanity
                  ? `/${lang}/resources/blog/${article.slug?.current || article.slug}`
                  : (article.slug ? `/${lang}/resources/blog/${article.slug}` : `/${lang}/resources/blog`);
                const imageUrl = isSanity && article.mainImage
                  ? urlForImage(article.mainImage).width(700).height(420).url()
                  : (article.image || null);

                return (
                  <Link
                    key={idx}
                    href={href}
                    className="group flex flex-col justify-between rounded-3xl bg-white border border-neutral-200 hover:border-neutral-300 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
                  >
                    {imageUrl ? (
                      <div className="relative aspect-video w-full bg-neutral-100 overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-3 w-full bg-gradient-to-r from-neutral-200 via-[#FF5C00]/40 to-neutral-200" />
                    )}

                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-3">
                          <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 font-medium text-[10px] tracking-wide uppercase">
                            {category}
                          </span>
                          <span>{date}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-heading font-bold text-neutral-950 group-hover:text-[#FF5C00] transition-colors leading-snug mb-3">
                          {title}
                        </h3>
                        <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
                          {excerpt}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-semibold text-neutral-700 group-hover:text-[#FF5C00] transition-colors">
                        <span>{isAr ? 'قراءة المقال' : 'Read Article'}</span>
                        <ArrowRight size={14} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. EXECUTIVE EVENTS & WEBINARS SECTION                   */}
        {/* ======================================================== */}
        <section className="mb-20 sm:mb-28 pt-10 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
                {isAr ? 'الفعاليات وورش العمل' : 'EVENTS & ROUNDTABLES'}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-neutral-950">
                {isAr ? 'الفعاليات القادمة والجلسات التنفيذية' : 'Upcoming Summits & Masterclasses'}
              </h2>
            </div>
            <Link
              href={`/${lang}/resources/events`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-black transition-colors"
            >
              <span>{isAr ? 'جدول الفعاليات بالكامل' : 'View all events'}</span>
              <ArrowRight size={14} className="rtl:-scale-x-100" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Event 1 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between space-y-6 shadow-sm">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-200 text-neutral-800 font-bold text-[10px] uppercase">
                    {isAr ? 'افتراضي' : 'Virtual'}
                  </span>
                  <span className="text-[#FF5C00] font-bold">7 – 9 Oct 2026</span>
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-neutral-950 leading-snug mb-2">
                  {isAr ? 'قمة مهارات المستقبل الخليجية ٢٠٢٦' : 'GCC Human Skills Fest 2026'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {isAr
                    ? '٣ أيام متواصلة تجمع رؤساء الموارد البشرية ومسؤولي التطوير في الرياض ودبي لمناقشة الاتجاهات الحديثة.'
                    : '3-day executive summit addressing leadership resilience, emotional intelligence, and team capability.'}
                </p>
              </div>
              <Link
                href={`/${lang}/resources/events`}
                className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-950 text-neutral-900 hover:text-white font-semibold text-xs text-center transition-all shadow-xs"
              >
                {isAr ? 'تسجيل مقعد مجاني' : 'Register for Free'}
              </Link>
            </div>

            {/* Event 2 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between space-y-6 shadow-sm">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-200 text-neutral-800 font-bold text-[10px] uppercase">
                    {isAr ? 'الرياض · حضوري' : 'Riyadh · In-Person'}
                  </span>
                  <span className="text-[#FF5C00] font-bold">24 Oct 2026</span>
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-neutral-950 leading-snug mb-2">
                  {isAr ? 'ورشة معايير TVTC والامتثال المؤسسي' : 'TVTC Accreditation & Enterprise Compliance'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {isAr
                    ? 'جلسة مغلقة لقيادات التدريب حول توثيق البرامج التدريبية لدى المؤسسة العامة للتدريب التقني والمهني.'
                    : 'Closed-door masterclass for Saudi L&D leaders on structuring TVTC-compliant enterprise training cohorts.'}
                </p>
              </div>
              <Link
                href={`/${lang}/resources/events`}
                className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-950 text-neutral-900 hover:text-white font-semibold text-xs text-center transition-all shadow-xs"
              >
                {isAr ? 'طلب دعوة خاصة' : 'Request Invitation'}
              </Link>
            </div>

            {/* Event 3 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between space-y-6 shadow-sm">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-200 text-neutral-800 font-bold text-[10px] uppercase">
                    {isAr ? 'دبي · مائدة مستديرة' : 'Dubai · Roundtable'}
                  </span>
                  <span className="text-[#FF5C00] font-bold">12 Nov 2026</span>
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-neutral-950 leading-snug mb-2">
                  {isAr ? 'مائدة تسريع مهارات نافس للكوادر الوطنية' : 'Nafis Talent Acceleration Roundtable'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {isAr
                    ? 'حوار تنفيذي مع قيادات القطاع الخاص في الإمارات حول برامج التوجيه والإرشاد المهني للكوادر الإماراتية.'
                    : 'Executive dialogue on scaling high-retention corporate mentoring and technical upskilling in the UAE.'}
                </p>
              </div>
              <Link
                href={`/${lang}/resources/events`}
                className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-950 text-neutral-900 hover:text-white font-semibold text-xs text-center transition-all shadow-xs"
              >
                {isAr ? 'طلب دعوة خاصة' : 'Request Invitation'}
              </Link>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. CASE STUDIES SECTION (#case-studies)                  */}
        {/* ======================================================== */}
        <section id="case-studies" className="mb-20 sm:mb-28 pt-10 border-t border-neutral-200 scroll-mt-28 lg:scroll-mt-36">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase bg-neutral-100 text-neutral-800 border border-neutral-200 mb-3">
                <Sparkles size={12} className="text-[#FF5C00]" />
                <span>{isAr ? 'دراسات الحالة الإقليمية' : 'REGIONAL CASE STUDIES'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-neutral-950">
                {isAr ? 'كيف حققت كبرى المنشآت نتائج استثنائية مع PontLook' : 'Real Workforce Outcomes Across Saudi Arabia & UAE'}
              </h2>
            </div>
            <Link
              href={`/${lang}/find-training`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-black transition-colors shrink-0"
            >
              <span>{isAr ? 'ابدأ تشخيص احتياجك' : 'Start workforce assessment'}</span>
              <ArrowRight size={14} className="rtl:-scale-x-100" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case 1 */}
            <div className="p-7 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between space-y-6 group">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-white text-neutral-800 border border-neutral-200 shadow-2xs">
                    {isAr ? 'قطاع البنوك والمالية · الرياض' : 'Financial Services · Riyadh'}
                  </span>
                  <span className="text-xs font-mono text-[#FF5C00] font-bold px-2.5 py-1 rounded-full bg-[#FF5C00]/10 border border-[#FF5C00]/25">
                    {isAr ? '٨٥٠ موظف مدرب' : '850+ Participants'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-neutral-950 group-hover:text-black leading-snug mb-3">
                  {isAr
                    ? 'تدريب ٨٥٠ موظفاً بنكياً على التحول الرقمي بمعدل رضا ٩٦٪'
                    : 'Upskilling 850 Bank Officers on Digital Product Management with 96% Satisfaction'}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                  {isAr
                    ? 'قامت PontLook بتشخيص الاحتياج الدقيق وربط المصرف بثلاثة مراكز تدريب معتمدة خلال 48 ساعة فقط، مما وفّر ٤ أسابيع من البحث التقليدي وخفّض تكلفة المشتريات بنسبة ٢٨٪.'
                    : 'PontLook matched the bank with 3 TVTC-accredited fintech academies within 48 hours, saving 4 weeks of procurement delays and eliminating all agency broker markups.'}
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1.5 text-neutral-700">
                  <CheckCircle2 size={13} className="text-[#FF5C00]" />
                  {isAr ? 'النتيجة: ٩٢٪ وصول للاجتماعات' : 'Outcome: 92% Meeting Completion'}
                </span>
                <span className="text-neutral-900 font-semibold px-2.5 py-0.5 rounded-md bg-white border border-neutral-200 shadow-2xs">{isAr ? 'صفر رسوم وساطة' : '$0 Retainer Cost'}</span>
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-7 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between space-y-6 group">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-white text-neutral-800 border border-neutral-200 shadow-2xs">
                    {isAr ? 'اللوجستيات وسلاسل الإمداد · دبي' : 'Logistics Conglomerate · Dubai'}
                  </span>
                  <span className="text-xs font-mono text-[#FF5C00] font-bold px-2.5 py-1 rounded-full bg-[#FF5C00]/10 border border-[#FF5C00]/25">
                    {isAr ? '٣٢٠ مهندساً' : '320 Engineers'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-neutral-950 group-hover:text-black leading-snug mb-3">
                  {isAr
                    ? 'برنامج تدريب هندسي معتمد لبرنامج نافس في زمن قياسي'
                    : 'Rapid Delivery of a Nafis-Compliant Technical Engineering Cohort'}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                  {isAr
                    ? 'ربط مباشر مع معهد تدريب فني متخصص في دبي لتصميم منهج عملي مخصص لسلاسل الإمداد وتأهيل الكوادر الوطنية خلال مهلة تعاقدية تقل عن أسبوعين.'
                    : 'Direct bilateral matchmaking delivered a customized syllabus from a KHDA-certified institute, achieving 100% on-time deployment under a strict 14-day SLA.'}
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1.5 text-neutral-700">
                  <CheckCircle2 size={13} className="text-[#FF5C00]" />
                  {isAr ? 'النتيجة: اعتماد كامل للميزانية' : 'Outcome: Confirmed Budget Delivery'}
                </span>
                <span className="text-neutral-900 font-semibold px-2.5 py-0.5 rounded-md bg-white border border-neutral-200 shadow-2xs">{isAr ? 'فحص كامل للاعتمادات' : '100% Verified'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 7. NEWSLETTER SUBSCRIPTION BLOCK                         */}
        {/* ======================================================== */}
        <section className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm relative overflow-hidden text-neutral-900">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#FF5C00]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase bg-white text-neutral-800 border border-neutral-200 mb-4 shadow-2xs">
              <Sparkles size={13} className="text-[#FF5C00]" />
              <span>{isAr ? 'النشرة المعرفية الدورية' : 'MONTHLY L&D INTELLIGENCE'}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-950 mb-3">
              {isAr
                ? 'ابقَ في الصدارة في مجال تدريب وتطوير الكفاءات المؤسسية'
                : 'Stay Ahead in Corporate Learning & Workforce Development'}
            </h3>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal mb-8">
              {isAr
                ? 'انضم إلى أكثر من ٥,٠٠٠ قائد موارد بشرية يستلمون تقاريرنا الدورية، أحدث قوائم المراجعة، ونماذج التقييم مجاناً.'
                : 'Join 5,000+ GCC HR directors receiving our curated quarterly benchmarks, TVTC compliance guides, and free operational templates.'}
            </p>

            <form
              action="#"
              className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder={isAr ? 'أدخل بريدك الإلكتروني المؤسسي' : 'Enter your corporate email'}
                className="w-full px-5 py-3.5 rounded-full bg-white border border-neutral-300 text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 transition-colors shadow-2xs"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-neutral-950 text-white font-semibold text-xs sm:text-sm hover:bg-black transition-all shrink-0 cursor-pointer shadow-sm"
              >
                {isAr ? 'اشترك مجاناً' : 'Subscribe Free'}
              </button>
            </form>

            <p className="text-[11px] text-neutral-500 mt-4">
              {isAr
                ? 'نحترم خصوصيتك بالكامل. يمكنك إلغاء الاشتراك في أي وقت بنقرة واحدة.'
                : 'Zero spam. Unsubscribe at any time with one click.'}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
