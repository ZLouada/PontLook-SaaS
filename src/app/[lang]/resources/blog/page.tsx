import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, i18n, isArabicLocale } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import Reveal from '@/components/shared/Reveal';
import { ArrowRight, BookOpen, Calendar, Clock, User } from '@/components/icons';
import { getArticles } from '@/lib/payload/resources';
import { BlogSkylineCta } from '@/components/resources/BlogSkylineCta';
import { BlogHeroArch } from '@/components/resources/BlogHeroArch';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = isArabicLocale(lang);

  const title = isAr
    ? 'مدونة التدريب المؤسسي ورؤى سوق العمل | PontLook'
    : 'Corporate Training & Workforce Intelligence Blog | PontLook';
  const description = isAr
    ? 'أبحاث استراتيجية، تحليلات مهارية، وأطر عمل تشخيصية لتطوير رأس المال البشري بدول مجلس التعاون الخليجي.'
    : 'Strategic research, talent benchmarks, and actionable diagnostic frameworks for corporate capability building in the GCC.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: constructAlternates(lang, 'resources/blog'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/resources/blog`,
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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const isAr = isArabicLocale(lang);

  // Load published articles from Payload Local API
  const articles = await getArticles(lang);

  const featuredPost = articles[0] || null;
  const regularPosts = articles.slice(1);

  return (
    <div
      data-nav-light="true"
      data-nav-theme="light"
      dir={isAr ? 'rtl' : 'ltr'}
      className="min-h-screen bg-white text-[#3B3B44] transition-colors duration-200"
    >
      <div className="pt-28 pb-16 px-4 sm:px-6 max-w-[1160px] mx-auto">
        {/* Breadcrumb Navigation */}
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-[13px] text-[#7A7A85] font-sans mb-6 overflow-x-auto whitespace-nowrap"
          >
            <Link href={`/${lang}`} className="hover:text-[#0B0B10] transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <span className="text-[#ECE7E2]">/</span>
            <Link href={`/${lang}/resources`} className="hover:text-[#0B0B10] transition-colors">
              {isAr ? 'الموارد' : 'Resources'}
            </Link>
            <span className="text-[#ECE7E2]">/</span>
            <span className="text-[#0B0B10] font-medium">{isAr ? 'المدونة' : 'Blog'}</span>
          </nav>
        </Reveal>

        {/* Page Hero Header */}
        <div className="max-w-3xl mb-14">
          <Reveal delay={0.05}>
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#FFF1E6] text-[#C93D07] text-xs sm:text-[13px] font-semibold tracking-wide mb-5">
              {isAr ? 'أبحاث ودراسات PontLook' : 'PontLook Research & Intelligence'}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-[3.8rem] text-[#0B0B10] tracking-tight leading-[1.06] mb-5">
              {isAr ? 'أحدث الرؤى والأدلة التدريبية' : 'Latest Workforce Insights & Guides'}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="font-sans text-base sm:text-lg md:text-xl text-[#3B3B44] leading-relaxed">
              <span className="bg-gradient-to-b from-transparent from-60% to-[#FFD2B0] to-60% [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                {isAr
                  ? 'أدلة إرشادية معمقة، دراسات حالة إقليمية،'
                  : 'Actionable diagnostic frameworks, regional case studies,'}
              </span>{' '}
              {isAr
                ? 'واستراتيجيات عملية لحل فجوات المهارات وتطوير رأس المال البشري في منشآت الخليج.'
                : 'and corporate L&D strategy guides to bridge capability gaps across Saudi Arabia and the GCC.'}
            </p>
          </Reveal>
        </div>

        {/* Featured Post Showcase (if available) */}
        {featuredPost && (
          <Reveal delay={0.2}>
            <div className="mb-16 p-6 sm:p-10 rounded-[32px] bg-gradient-to-br from-[#FFF8F1] via-[#FFF1E6] to-[#FFE3CD]/40 border-2 border-[#0B0B10] shadow-[6px_6px_0px_#FF5A1F] sm:shadow-[8px_8px_0px_#FF5A1F]">
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-white text-[#C93D07] font-mono text-[11px] font-semibold uppercase tracking-wider border border-[#ECE7E2]">
                      {isAr ? 'المقال الأبرز' : 'FEATURED INSIGHT'}
                    </span>
                    {featuredPost.category && (
                      <span className="px-3 py-1 rounded-full bg-[#0B0B10] text-white font-mono text-[11px] font-semibold uppercase tracking-wider">
                        {featuredPost.category}
                      </span>
                    )}
                  </div>

                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0B0B10] tracking-tight leading-[1.12] mb-4">
                    <Link
                      href={`/${lang}/resources/blog/${featuredPost.slug}`}
                      className="hover:text-[#C93D07] transition-colors"
                    >
                      {featuredPost.title}
                    </Link>
                  </h2>

                  {featuredPost.excerpt && (
                    <p className="font-sans text-sm sm:text-base text-[#3B3B44] leading-relaxed line-clamp-3 mb-6">
                      {featuredPost.excerpt}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#0B0B10]/10">
                    <div className="flex items-center gap-3 text-xs sm:text-[13px] text-[#7A7A85] font-sans">
                      <span className="font-semibold text-[#0B0B10]">
                        {featuredPost.author?.name || 'PontLook Research'}
                      </span>
                      {featuredPost.date && <span>·</span>}
                      {featuredPost.date && <span>{featuredPost.date}</span>}
                      {featuredPost.readTime && <span>·</span>}
                      {featuredPost.readTime && <span>{featuredPost.readTime}</span>}
                    </div>

                    <Link
                      href={`/${lang}/resources/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B0B10] hover:bg-black text-white text-xs sm:text-sm font-semibold transition-transform hover:-translate-y-0.5"
                    >
                      <span>{isAr ? 'اقرأ المقال بالكامل' : 'Read full article'}</span>
                      <ArrowRight size={14} className="rtl:-scale-x-100" />
                    </Link>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border-2 border-[#0B0B10] bg-white shadow-sm">
                  {featuredPost.image ? (
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-[#FFF8F1] via-[#FFE3CD] to-[#FFC397] flex items-center justify-center p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center text-xl font-bold font-heading shadow-md">
                        PL
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Regular Articles Grid */}
        {regularPosts.length > 0 && (
          <div className="mb-20">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#0B0B10] tracking-tight mb-8">
              {isAr ? 'جميع المقالات والأبحاث' : 'All Articles & Intelligence'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {regularPosts.map((post, idx) => (
                <Reveal key={post.id} delay={0.06 * (idx + 1)}>
                  <article className="group h-full flex flex-col justify-between p-6 sm:p-7 rounded-[24px] bg-white border border-[#ECE7E2] hover:border-[#0B0B10] shadow-2xs hover:shadow-[6px_6px_0px_#FF5A1F] transition-all duration-200">
                    <div>
                      {/* Category & Read Time */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FFF1E6] text-[#C93D07] font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                          {post.category || (isAr ? 'مقال' : 'Article')}
                        </span>
                        {post.readTime && (
                          <span className="text-[11px] font-mono text-[#7A7A85]">
                            {post.readTime}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h4 className="font-heading font-bold text-lg sm:text-xl text-[#0B0B10] group-hover:text-[#C93D07] tracking-tight leading-[1.28] transition-colors mb-3">
                        <Link href={`/${lang}/resources/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h4>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="font-sans text-xs sm:text-sm text-[#7A7A85] leading-relaxed line-clamp-3 mb-6">
                          {post.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-[#ECE7E2] flex items-center justify-between text-xs text-[#7A7A85]">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#0B0B10] text-white flex items-center justify-center text-[10px] font-heading font-bold">
                          {(post.author?.name || 'PL')[0]}
                        </div>
                        <span className="font-medium text-[#0B0B10]">
                          {post.author?.name || 'PontLook Research'}
                        </span>
                      </div>

                      <Link
                        href={`/${lang}/resources/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 font-semibold text-[#FF5A1F] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                      >
                        <span>{isAr ? 'اقرأ' : 'Read'}</span>
                        <ArrowRight size={12} className="rtl:-scale-x-100" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Empty state if 0 articles */}
        {articles.length === 0 && (
          <Reveal>
            <div className="p-12 sm:p-16 rounded-[32px] border-2 border-[#0B0B10] bg-[#FFF8F1] text-center max-w-xl mx-auto shadow-[6px_6px_0px_#FF5A1F]">
              <div className="w-14 h-14 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0B0B10] mb-2">
                {isAr ? 'جاري إعداد المقالات' : 'Articles Coming Soon'}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#3B3B44] leading-relaxed mb-6">
                {isAr
                  ? 'سيتم نشر التحليلات والأدلة التدريبية قريباً عبر استوديو إدارة المحتوى.'
                  : 'New corporate capability research and GCC benchmarks will be published shortly.'}
              </p>
              <Link
                href={`/${lang}/resources`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B0B10] hover:bg-black text-white text-xs font-semibold transition-transform hover:-translate-y-0.5"
              >
                <span>{isAr ? 'العودة للموارد' : 'Back to Resources'}</span>
                <ArrowRight size={13} className="rtl:-scale-x-100" />
              </Link>
            </div>
          </Reveal>
        )}

        {/* End of Page Skyline Consultation CTA Banner */}
        <BlogSkylineCta lang={lang} isAr={isAr} />
      </div>
    </div>
  );
}
