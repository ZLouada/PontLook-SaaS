import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ResourceImage } from '@/components/resources/ResourceImage';
import { Locale, i18n, isArabicLocale } from '@/i18n/config';
import { constructAlternates, SITE_URL, buildBlogPostingSchema, buildBreadcrumbSchema } from '@/lib/seo';
import Reveal from '@/components/shared/Reveal';
import { ArrowLeft, Calendar, User, Clock, ChevronRight } from '@/components/icons';
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/payload/resources';
import { RichText, extractHeadingsFromContent } from '@/components/resources/RichText';
import { BlogMediaActionCard } from '@/components/resources/BlogMediaActionCard';
import { BlogTableOfContents } from '@/components/resources/BlogTableOfContents';
import { EndOfPostDownloadCard } from '@/components/resources/EndOfPostDownloadCard';
import { BlogAuthorBioCard } from '@/components/resources/BlogAuthorBioCard';

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
  const paths: { lang: Locale; slug: string }[] = [];
  const slugs = await getAllArticleSlugs();

  for (const locale of i18n.locales) {
    for (const slug of slugs) {
      paths.push({ lang: locale, slug });
    }
  }

  return paths;
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
    ...(category ? [{ name: category, url: `${SITE_URL}/${lang}/resources?category=${encodeURIComponent(categorySlug)}` }] : []),
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

  return (
    <div
      data-nav-light="true"
      data-nav-theme="light"
      className="min-h-screen bg-white text-neutral-900 transition-colors duration-200"
    >
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Schema.org BlogPosting & BreadcrumbList JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />

        {/* Semantic SEO Breadcrumbs Navigation (As specified in Structure how to Work SEO Content) */}
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono mb-8 overflow-x-auto whitespace-nowrap pb-2"
          >
            <Link href={`/${lang}`} className="hover:text-black transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <ChevronRight size={12} className="text-neutral-400 rtl:rotate-180 shrink-0" />
            <Link href={`/${lang}/resources`} className="hover:text-black transition-colors">
              {isAr ? 'الموارد' : 'Resources'}
            </Link>
            <ChevronRight size={12} className="text-neutral-400 rtl:rotate-180 shrink-0" />
            <Link href={`/${lang}/resources/blog`} className="hover:text-black transition-colors">
              {isAr ? 'المدونة' : 'Blog'}
            </Link>
            {category && (
              <>
                <ChevronRight size={12} className="text-neutral-400 rtl:rotate-180 shrink-0" />
                <Link
                  href={`/${lang}/resources?category=${encodeURIComponent(categorySlug)}`}
                  className="hover:text-black transition-colors text-neutral-700 font-medium"
                >
                  {category}
                </Link>
              </>
            )}
          </nav>
        </Reveal>

        {/* Clean Responsive Layout:
            - Desktop (lg: >= 1024px): Left Sticky TOC (if headings exist) + Focused Reading Column
            - Mobile (< 1024px): 1 column with collapsible top TOC accordion
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Dedicated Sticky TOC on Desktop */}
          {headings.length > 0 && (
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
              <div className="sticky top-28 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
                <BlogTableOfContents
                  headings={headings}
                  isAr={isAr}
                  readTime={readTime}
                />
              </div>
            </aside>
          )}

          {/* Main Reading Column */}
          <article className={`min-w-0 ${headings.length > 0 ? 'lg:col-span-8 xl:col-span-9 max-w-4xl' : 'col-span-12 max-w-4xl mx-auto w-full'}`}>
            {/* Meta Tags: Category, Date, Read Time */}
            <Reveal delay={0.05}>
              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
                {category && (
                  <span className="px-3 py-1 rounded-full bg-[#FF5C00]/10 border border-[#FF5C00]/25 text-[#FF5C00] font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.06em]">
                    {category}
                  </span>
                )}
                {date && (
                  <span className="flex items-center gap-1.5 text-neutral-500 font-mono text-[11px] tabular-nums">
                    <Calendar size={13} />
                    {date}
                  </span>
                )}
                {readTime && (
                  <span className="flex items-center gap-1.5 text-neutral-500 font-mono text-[11px]">
                    <Clock size={13} />
                    {readTime}
                  </span>
                )}
              </div>
            </Reveal>

            {/* Article Title */}
            <Reveal delay={0.1}>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 leading-[1.12] mb-6">
                {title}
              </h1>
            </Reveal>

            {/* Author info (Dynamic from CMS) */}
            <Reveal delay={0.15}>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-neutral-200">
                <div className="flex items-center gap-3.5">
                  <div className="relative h-11 w-11 rounded-full overflow-hidden bg-neutral-200 flex items-center justify-center text-neutral-700 border border-neutral-300 shrink-0">
                    {article.author?.image ? (
                      <ResourceImage
                        src={article.author.image}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User size={18} />
                    )}
                  </div>
                  <div>
                    <p className="font-heading text-sm font-bold tracking-tight text-neutral-950">
                      {article.author?.name || 'PontLook Research'}
                    </p>
                    <p className="font-sans text-xs text-neutral-500">
                      {article.author?.role || (isAr ? 'فريق التحرير والبحوث' : 'Editorial & Intelligence Team')}
                    </p>
                  </div>
                </div>

                {(article.author?.socialLinkedIn || article.author?.socialTwitter) && (
                  <div className="flex items-center gap-2">
                    {article.author.socialLinkedIn && (
                      <a
                        href={article.author.socialLinkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-neutral-500 hover:text-[#0077b5] px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors font-mono"
                      >
                        LinkedIn ↗
                      </a>
                    )}
                    {article.author.socialTwitter && (
                      <a
                        href={article.author.socialTwitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-neutral-500 hover:text-black px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors font-mono"
                      >
                        𝕏 ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Reveal>

            {/* Main Feature Image */}
            {imageUrl && (
              <Reveal delay={0.2}>
                <div className="relative aspect-video w-full min-h-[220px] sm:min-h-[340px] shrink-0 rounded-3xl overflow-hidden mb-10 border border-neutral-200 bg-neutral-100 shadow-sm">
                  <ResourceImage
                    src={imageUrl}
                    alt={imageAlt || title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}

            {/* Mobile / Tablet Table of Contents */}
            {headings.length > 0 && (
              <div className="lg:hidden mb-8">
                <BlogTableOfContents
                  headings={headings}
                  isAr={isAr}
                  readTime={readTime}
                />
              </div>
            )}

            {/* Executive Audio Briefing (only rendered if podcast audio attached) */}
            {article.mediaAttachments?.podcastAudio && (
              <Reveal delay={0.22}>
                <div className="mb-10">
                  <BlogMediaActionCard
                    mediaAttachments={article.mediaAttachments}
                    postTitle={title}
                    lang={lang}
                  />
                </div>
              </Reveal>
            )}

            {/* Excerpt Lead */}
            {excerpt && (
              <Reveal delay={0.25}>
                <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-medium mb-8 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 italic">
                  {excerpt}
                </p>
              </Reveal>
            )}

            {/* Body Content with Linked Heading Anchors */}
            {content ? (
              <div className="mb-12">
                <RichText data={content} isAr={isAr} />
              </div>
            ) : (
              <p className="text-neutral-600 text-sm leading-relaxed mb-12">
                {isAr
                  ? 'محتوى المقال قيد التحديث والتوثيق من قبل فريق أبحاث PontLook.'
                  : 'Article content is being documented by the PontLook research team.'}
              </p>
            )}

            {/* End of Article Download Section (from endOfPostDownload or mediaAttachments.downloadableAttachment) */}
            {(endOfPostDownload || article.mediaAttachments?.downloadableAttachment) && (
              <Reveal delay={0.2}>
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
            <Reveal delay={0.22}>
              <BlogAuthorBioCard
                author={article.author}
                isAr={isAr}
              />
            </Reveal>

            {/* Bottom Footer Navigation */}
            <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href={`/${lang}/resources`}
                className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-neutral-600 hover:text-black transition-colors"
              >
                <ArrowLeft size={14} className="rtl:rotate-180" />
                <span>{isAr ? 'العودة لمركز الموارد والتقارير' : 'Back to Resources & Knowledge Hub'}</span>
              </Link>
              <Link
                href={`/${lang}/find-training`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-950 hover:bg-black text-white font-semibold text-xs transition-all shadow-sm"
              >
                <span>{isAr ? 'ابحث عن مزود تدريب معتمد' : 'Find a Verified Training Provider'}</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
