import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ResourceImage } from '@/components/resources/ResourceImage';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import {
  getResourcesHero,
  getResourcesFeatured,
  getArticles,
  getEvents,
} from '@/lib/payload/resources';
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

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
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

  // Load published content from Payload CMS Local API
  const [hero, featured, dynamicArticles, eventsList] = await Promise.all([
    getResourcesHero(lang),
    getResourcesFeatured(lang),
    getArticles(lang),
    getEvents(lang),
  ]);

  const heroTitle = hero.title;
  const heroSubtitle = hero.subtitle;
  const spotlight = featured.spotlight;
  const editorPickEvent = featured.editorPickEvent;

  // Real upcoming events from the web for the featured panel
  const cardEventA = {
    badge: editorPickEvent?.badge || (isAr ? 'مؤتمر تطوير المواهب · الرياض' : 'L&D CONFERENCE · RIYADH'),
    date: editorPickEvent?.date || (isAr ? '٧ – ٨ ديسمبر ٢٠٢٦' : '7 – 8 Dec 2026'),
    title: editorPickEvent?.title || (isAr ? 'مؤتمر جمعية تطوير المواهب (ATD) السعودية ٢٠٢٦' : 'ATD Saudi Arabia Conference 2026'),
    desc: editorPickEvent?.desc || '',
    cta: editorPickEvent?.cta || (isAr ? 'الموقع الرسمي والتسجيل' : 'Official Event & Agenda'),
    link: editorPickEvent?.link || 'https://atdksa.com',
  };

  const secondEvent = eventsList && eventsList.length > 1 ? eventsList[1] : null;
  const cardEventB = {
    badge: secondEvent?.type || featured.editorPickEventB?.badge || (isAr ? 'قمة تنفيذية · الرياض' : 'EXECUTIVE SUMMIT · RIYADH'),
    date: secondEvent?.date || featured.editorPickEventB?.date || (isAr ? '١٦ – ١٧ نوفمبر ٢٠٢٦' : '16 – 17 Nov 2026'),
    title: secondEvent?.title || featured.editorPickEventB?.title || (isAr ? 'قمة تقنيات الموارد البشرية والتدريب في السعودية ٢٠٢٦' : 'HR Tech Saudi Summit 2026'),
    desc: secondEvent?.desc || featured.editorPickEventB?.desc || '',
    cta: featured.editorPickEventB?.cta || (isAr ? 'الموقع الرسمي والتسجيل' : 'Official Summit & RSVP'),
    link: secondEvent?.link || featured.editorPickEventB?.link || 'https://hrtechsaudi.com',
  };

  const categoryPills = [
    { label: isAr ? 'كافة الموارد' : 'All Resources', href: `/${lang}/resources`, active: true },
    { label: isAr ? 'المدونة' : 'Blog', href: `/${lang}/resources/blog` },
    { label: isAr ? 'الفعاليات' : 'Events', href: `/${lang}/resources/events` },
    { label: isAr ? 'التحميلات' : 'Downloads', href: `/${lang}/resources/downloads` },
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
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-heading font-extrabold text-white tracking-tight leading-[1.08] mb-5 sm:mb-6 max-w-3xl">
            {heroTitle}
          </h1>

          <p className="text-white/95 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl sm:max-w-3xl">
            {heroSubtitle}
          </p>
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
                <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/9] w-full shrink-0 min-h-[220px] sm:min-h-[280px] bg-neutral-100 overflow-hidden">
                  <ResourceImage
                    src={spotlight.image || '/executive_training_room.jpg'}
                    alt="GCC Corporate Training Benchmark"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 start-4 sm:top-6 sm:start-6 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md border border-white/30">
                      {spotlight.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#FF5C00] text-white">
                      {spotlight.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 mb-3">
                      <span>{spotlight.readTime}</span>
                      <span>•</span>
                      <span>{spotlight.date}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-neutral-950 group-hover:text-black transition-colors leading-tight mb-4">
                      {spotlight.title}
                    </h2>
                    <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                      {spotlight.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-between text-sm font-semibold text-neutral-950 group-hover:text-[#FF5C00] transition-colors">
                    <span>{spotlight.cta}</span>
                    <ArrowRight size={18} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Right 2-Card Stack (4 Cols) */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-3 block">
                {isAr ? 'أبرز الفعاليات القادمة' : "FEATURED UPCOMING EVENTS"}
              </span>
              <div className="flex flex-col gap-6 sm:gap-8 justify-between flex-1">
              {/* Card A: Real Event 1 from Web */}
              <Link
                href={cardEventA.link || `/${lang}/resources/events`}
                target={cardEventA.link?.startsWith('http') ? '_blank' : undefined}
                rel={cardEventA.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-all duration-300 shadow-sm hover:shadow-md flex-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-neutral-200 text-neutral-800 border border-neutral-300">
                      {cardEventA.badge}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      {cardEventA.date}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-neutral-950 group-hover:text-[#FF5C00] transition-colors leading-snug mb-2">
                    {cardEventA.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {cardEventA.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-semibold text-neutral-950 group-hover:text-[#FF5C00] transition-colors">
                  <span>{cardEventA.cta}</span>
                  {cardEventA.link?.startsWith('http') ? (
                    <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  ) : (
                    <ArrowRight size={15} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  )}
                </div>
              </Link>

              {/* Card B: Real Event 2 from Web */}
              <Link
                href={cardEventB.link || `/${lang}/resources/events`}
                target={cardEventB.link?.startsWith('http') ? '_blank' : undefined}
                rel={cardEventB.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-all duration-300 shadow-sm hover:shadow-md flex-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#FF5C00]/10 text-[#FF5C00] border border-[#FF5C00]/25 font-bold">
                      {cardEventB.badge}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      {cardEventB.date}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-neutral-950 group-hover:text-[#FF5C00] transition-colors leading-snug mb-2">
                    {cardEventB.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {cardEventB.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-semibold text-neutral-950 group-hover:text-[#FF5C00] transition-colors">
                  <span>{cardEventB.cta}</span>
                  {cardEventB.link?.startsWith('http') ? (
                    <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  ) : (
                    <ArrowRight size={15} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  )}
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
          {dynamicArticles && dynamicArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {dynamicArticles.slice(0, 3).map((article: any, idx: number) => {
                const title = article.title;
                const excerpt = article.excerpt || article.title;
                const date = article.date || 'Oct 2026';
                const category = article.category || (isAr ? 'تدريب مؤسسي' : 'L&D STRATEGIES');
                const href = article.slug ? `/${lang}/resources/blog/${article.slug}` : `/${lang}/resources/blog`;

                  return (
                    <Link
                      key={idx}
                      href={href}
                      className="group flex flex-col justify-between rounded-3xl bg-white border border-neutral-200 hover:border-neutral-300 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
                    >
                      <div className="h-2 w-full bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 group-hover:from-neutral-900 group-hover:to-neutral-700 transition-colors" />

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
          ) : (
            <div className="p-12 rounded-3xl border border-neutral-200 bg-neutral-50 text-center max-w-md mx-auto">
              <p className="text-sm text-neutral-600">
                {isAr ? 'لا توجد مقالات منشورة حالياً في المدونة.' : 'No blog articles published yet.'}
              </p>
            </div>
          )}
        </section>

        {/* ======================================================== */}
        {/* 5. EXECUTIVE EVENTS & WEBINARS SECTION                   */}
        {/* ======================================================== */}
        {eventsList && eventsList.length > 0 && (
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
              {eventsList
                .slice(0, 3)
                .map((evt) => {
                  const title = evt.title || (isAr ? 'فعالية' : 'Event');
                  const date = evt.date || '';
                  const type = evt.type || (isAr ? 'فعالية' : 'Event');
                  const desc = evt.desc || '';
                  return (
                    <div
                      key={evt.id}
                      className="p-6 sm:p-7 rounded-3xl bg-neutral-50 border border-neutral-200 flex flex-col justify-between space-y-6 shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-neutral-200 text-neutral-800 font-bold text-[10px] uppercase">
                            {type}
                          </span>
                          {date && <span className="text-[#FF5C00] font-bold">{date}</span>}
                        </div>
                        <h3 className="text-lg sm:text-xl font-heading font-bold text-neutral-950 leading-snug mb-2">
                          {title}
                        </h3>
                        {desc && (
                          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                            {desc}
                          </p>
                        )}
                      </div>
                      <Link
                        href={evt.link || `/${lang}/resources/events`}
                        target={evt.link?.startsWith('http') ? '_blank' : undefined}
                        rel={evt.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-950 text-neutral-900 hover:text-white font-semibold text-xs text-center transition-all shadow-xs inline-flex items-center justify-center gap-1.5"
                      >
                        <span>
                          {evt.link?.startsWith('http')
                            ? (isAr ? 'الموقع الرسمي والتسجيل' : 'Official Site & RSVP')
                            : (isAr ? 'تسجيل مقعد مجاني' : 'Register for Free')}
                        </span>
                        {evt.link?.startsWith('http') ? (
                          <ArrowUpRight size={13} />
                        ) : (
                          <ArrowRight size={13} className="rtl:-scale-x-100" />
                        )}
                      </Link>
                    </div>
                  );
                })}
            </div>
          </section>
        )}



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
