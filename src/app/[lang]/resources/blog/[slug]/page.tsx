import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { Locale, i18n, isArabicLocale } from '@/i18n/config';
import { constructAlternates, SITE_URL, buildBlogPostingSchema, buildBreadcrumbSchema } from '@/lib/seo';
import Reveal from '@/components/shared/Reveal';
import { ChevronRight } from '@/components/icons';
import { getArticleBySlug, getAllArticleSlugs, getArticles } from '@/lib/payload/resources';
import { RichText, extractHeadingsFromContent } from '@/components/resources/RichText';
import { BlogHeroArch } from '@/components/resources/BlogHeroArch';
import { BlogChapterNav } from '@/components/resources/BlogChapterNav';
import { BlogShareButtons } from '@/components/resources/BlogShareButtons';
import { BlogMediaActionCard } from '@/components/resources/BlogMediaActionCard';
import { EndOfPostDownloadCard } from '@/components/resources/EndOfPostDownloadCard';
import { BlogAuthorBioCard } from '@/components/resources/BlogAuthorBioCard';
import { BlogKeepReading } from '@/components/resources/BlogKeepReading';

export const revalidate = 60;
export const dynamicParams = true;

function safeDecode(val: string): string {
  try {
    return decodeURIComponent(val);
  } catch {
    return val;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const isAr = isArabicLocale(lang);

  const article = await getArticleBySlug(slug, lang);

  if (article) {
    const title = article.seo?.title || article.title;
    const description = article.seo?.description || article.excerpt;
    const ogTitle = article.seo?.ogTitle || title;
    const ogDescription = article.seo?.ogDescription || description;
    const imageUrl = article.seo?.ogImage || article.image || 'https://pontlook.com/images/brand/og-main.png';

    const cleanSlug = article.slug || slug;
    const defaultAlternates = constructAlternates(lang, `resources/blog/${cleanSlug}`);
    const canonical = article.seo?.canonicalUrl || (defaultAlternates?.canonical as string) || `${SITE_URL}/${lang}/resources/blog/${cleanSlug}`;

    return {
      title: {
        absolute: `${title} | PontLook`,
      },
      description,
      alternates: {
        canonical,
        languages: defaultAlternates?.languages,
      },
      robots: {
        index: !article.seo?.noIndex,
        follow: !article.seo?.noFollow,
      },
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: canonical,
        siteName: 'PontLook',
        locale: isAr ? 'ar_SA' : 'en_US',
        type: 'article',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: article.imageAlt || ogTitle,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: ogTitle,
        description: ogDescription,
        images: [imageUrl],
      },
    };
  }

  return {
    title: isAr ? 'المقال غير موجود | PontLook' : 'Article Not Found | PontLook',
  };
}

export async function generateStaticParams() {
  // Return empty array to allow reliable on-demand ISR rendering (dynamicParams = true, revalidate = 60).
  // This completely eliminates remote CI/Hostinger build failures caused by external DB pool exhaustion or timeouts.
  return [];
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const isAr = isArabicLocale(lang);

  const article = await getArticleBySlug(slug, lang);

  if (!article) {
    notFound();
  }

  // Canonical redirect if requested slug differs from article's canonical slug (e.g. encoded spaces, uppercase, apostrophes)
  if (article.slug && slug !== article.slug && safeDecode(slug) !== article.slug) {
    redirect(`/${lang}/resources/blog/${article.slug}`);
  }

  const {
    title,
    category,
    categorySlug,
    date,
    readTime,
    excerpt,
    content,
    image: imageUrl,
    imageAlt,
    updatedAt,
    publishedAt,
    endOfPostDownload,
  } = article;

  const headings = extractHeadingsFromContent(content);

  let allArticles: any[] = [];
  try {
    allArticles = await getArticles(lang);
  } catch (err) {
    console.error('[BlogPostDetailPage] Failed to fetch related articles:', err);
  }

  const canonicalUrl = article.seo?.canonicalUrl || `${SITE_URL}/${lang}/resources/blog/${article.slug || slug}`;
  const absoluteImageUrl = imageUrl
    ? imageUrl.startsWith('http')
      ? imageUrl
      : `${SITE_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
    : null;

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${lang}` },
    { name: isAr ? 'الموارد' : 'Resources', url: `${SITE_URL}/${lang}/resources` },
    { name: isAr ? 'المدونة' : 'Blog', url: `${SITE_URL}/${lang}/resources/blog` },
    ...(category ? [{ name: category, url: `${SITE_URL}/${lang}/resources?category=${encodeURIComponent(categorySlug || '')}` }] : []),
    { name: title, url: canonicalUrl },
  ];

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      buildBreadcrumbSchema(breadcrumbs),
      buildBlogPostingSchema({
        url: canonicalUrl,
        headline: article.seo?.title || title,
        description: article.seo?.description || excerpt || undefined,
        image: absoluteImageUrl,
        datePublished: publishedAt || undefined,
        dateModified: updatedAt || publishedAt || undefined,
        authorName: article.author?.name || 'PontLook Research',
        lang,
      }),
    ],
  };

  const jsonLdString = JSON.stringify(jsonLdGraph).replace(/</g, '\\u003c');

  const authorInitials = ((article.author?.name || 'PontLook Research')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()) || 'PL';

  return (
    <div
      data-nav-light="true"
      data-nav-theme="light"
      dir={isAr ? 'rtl' : 'ltr'}
      className="min-h-screen bg-white text-[#3B3B44] transition-colors duration-200"
    >
      {/* Schema.org BlogPosting & BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      <div className="pt-28 pb-12 px-4 sm:px-6 max-w-[1160px] mx-auto">
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
            <Link href={`/${lang}/resources/blog`} className="hover:text-[#0B0B10] transition-colors">
              {isAr ? 'المدونة' : 'Blog'}
            </Link>
            {category && (
              <>
                <span className="text-[#ECE7E2]">/</span>
                <span className="text-[#0B0B10] font-medium">{category}</span>
              </>
            )}
          </nav>
        </Reveal>

        {/* Hero Section: 2 Columns Matching Reference Template */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-10 lg:gap-14 items-center pb-12 sm:pb-16">
          {/* Left Hero Details */}
          <div>
            <Reveal delay={0.05}>
              {category && (
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#FFF1E6] text-[#C93D07] text-xs sm:text-[13px] font-semibold tracking-wide mb-5">
                  {category}
                </span>
              )}
            </Reveal>

            {/* Display Title in Bold Poppins */}
            <Reveal delay={0.1}>
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] text-[#0B0B10] tracking-tight leading-[1.04] mb-6">
                {title}
              </h1>
            </Reveal>

            {/* Dek (Excerpt lead with signature highlight) */}
            {excerpt && (
              <Reveal delay={0.15}>
                <p className="font-sans text-base sm:text-lg md:text-xl text-[#3B3B44] leading-relaxed mb-7 max-w-xl">
                  <span className="bg-gradient-to-b from-transparent from-60% to-[#FFD2B0] to-60% [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                    {excerpt.slice(0, 50)}
                  </span>
                  {excerpt.slice(50)}
                </p>
              </Reveal>
            )}

            {/* Author, Date & Reading Facts */}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#0B0B10] text-white flex items-center justify-center font-heading font-semibold text-sm shrink-0">
                    {authorInitials}
                  </div>
                  <div>
                    <b className="block font-heading text-sm sm:text-[15px] text-[#0B0B10] leading-snug">
                      {article.author?.name || 'PontLook Research'}
                    </b>
                    <small className="block text-xs sm:text-[13px] text-[#7A7A85]">
                      {article.author?.role || (isAr ? 'فريق التحرير والبحوث' : 'Editorial & Intelligence Team')}
                    </small>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#7A7A85] font-sans border-l rtl:border-r rtl:border-l-0 border-[#ECE7E2] pl-4 rtl:pr-4">
                  {date && <span>{date}</span>}
                  {date && readTime && <span>·</span>}
                  {readTime && <span>{readTime}</span>}
                </div>
              </div>
            </Reveal>

            {/* Share Buttons: Copy Link & LinkedIn */}
            <Reveal delay={0.25}>
              <BlogShareButtons title={title} isAr={isAr} />
            </Reveal>
          </div>

          {/* Right Hero Arch Graphic */}
          <Reveal delay={0.2}>
            <BlogHeroArch
              imageUrl={imageUrl}
              imageAlt={imageAlt || title}
              readTime={readTime || '10 min read'}
              authorName={article.author?.name || 'PontLook Research'}
              isAr={isAr}
            />
          </Reveal>
        </div>
      </div>

      {/* Sticky Chapters Navigation Bar (matching .chap from reference HTML) */}
      {headings.length > 0 && (
        <BlogChapterNav headings={headings} isAr={isAr} />
      )}

      {/* Article Content Column */}
      <main className="max-w-[760px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-12" id="article-content">
        {/* Executive Audio Briefing (if podcast audio attached) */}
        {article.mediaAttachments?.podcastAudio && (
          <Reveal delay={0.1}>
            <div className="mb-12">
              <BlogMediaActionCard
                mediaAttachments={article.mediaAttachments}
                postTitle={title}
                lang={lang}
              />
            </div>
          </Reveal>
        )}

        {/* RichText Article Body */}
        {content ? (
          <article className="prose-editorial">
            <RichText data={content} isAr={isAr} />
          </article>
        ) : (
          <p className="font-sans text-[#3B3B44] text-base leading-relaxed">
            {isAr
              ? 'محتوى المقال قيد التحديث والتوثيق من قبل فريق أبحاث PontLook.'
              : 'Article content is being documented by the PontLook research team.'}
          </p>
        )}

        {/* End of Article Download Card (from endOfPostDownload or mediaAttachments.downloadableAttachment) */}
        {(endOfPostDownload || article.mediaAttachments?.downloadableAttachment) && (
          <Reveal delay={0.15}>
            <EndOfPostDownloadCard
              download={endOfPostDownload}
              attachment={article.mediaAttachments?.downloadableAttachment}
              buttonLabel={article.mediaAttachments?.downloadButtonLabel}
              postTitle={title}
              isAr={isAr}
            />
          </Reveal>
        )}

        {/* Author Bio Box */}
        <Reveal delay={0.2}>
          <BlogAuthorBioCard
            author={article.author}
            isAr={isAr}
          />
        </Reveal>

        {/* End Nav (.endnav) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[#ECE7E2] text-sm">
          <Link
            href={`/${lang}/resources`}
            className="text-[#7A7A85] hover:text-[#0B0B10] font-medium transition-colors inline-flex items-center gap-1.5"
          >
            <span>‹</span>
            <span>{isAr ? 'العودة لمركز المعرفة والموارد' : 'Back to Resources & Knowledge Hub'}</span>
          </Link>

          <Link
            href={`/${lang}/find-training`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B0B10] hover:bg-black text-white text-xs sm:text-[13px] font-semibold transition-transform duration-150 hover:-translate-y-0.5 shadow-sm"
          >
            <span>{isAr ? 'ابحث عن مزود تدريب معتمد' : 'Find a verified training provider'}</span>
          </Link>
        </div>
      </main>

      {/* Keep Reading / Related Articles Section */}
      <BlogKeepReading
        articles={allArticles}
        currentSlug={article.slug || slug}
        lang={lang}
        isAr={isAr}
      />
    </div>
  );
}
