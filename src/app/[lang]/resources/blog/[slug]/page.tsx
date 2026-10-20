import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ResourceImage } from '@/components/resources/ResourceImage';
import { Locale, i18n, isArabicLocale } from '@/i18n/config';
import { constructAlternates, SITE_URL, buildBlogPostingSchema, buildBreadcrumbSchema } from '@/lib/seo';
import Reveal from '@/components/shared/Reveal';
import { ArrowLeft, Calendar, User } from '@/components/icons';
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/payload/resources';
import { RichText } from '@/components/resources/RichText';

export const revalidate = 60;
export const dynamicParams = true;

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

    const defaultAlternates = constructAlternates(lang, `resources/blog/${slug}`);
    const canonical = article.seo?.canonicalUrl || (defaultAlternates?.canonical as string) || `${SITE_URL}/${lang}/resources/blog/${slug}`;

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

  const {
    title,
    category,
    date,
    excerpt,
    content,
    image: imageUrl,
    imageAlt,
    updatedAt,
    publishedAt,
  } = article;

  const canonicalUrl = article.seo?.canonicalUrl || `${SITE_URL}/${lang}/resources/blog/${slug}`;
  const absoluteImageUrl = imageUrl
    ? imageUrl.startsWith('http')
      ? imageUrl
      : `${SITE_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
    : null;

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', url: `${SITE_URL}/${lang}` },
    { name: isAr ? 'الموارد' : 'Resources', url: `${SITE_URL}/${lang}/resources` },
    { name: isAr ? 'المدونة' : 'Blog', url: `${SITE_URL}/${lang}/resources/blog` },
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
      <article className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Schema.org BlogPosting & BreadcrumbList JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />

        {/* Back button */}
        <Reveal>
          <Link
            href={`/${lang}/resources`}
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-tight text-neutral-600 hover:text-black transition-colors mb-8"
          >
            <ArrowLeft size={14} className="rtl:rotate-180" />
            <span>{isAr ? 'العودة لمركز الموارد' : 'Back to Resources'}</span>
          </Link>
        </Reveal>

        {/* Categories & Date */}
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
          </div>
        </Reveal>

        {/* Title */}
        <Reveal delay={0.1}>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 leading-[1.1] mb-6">
            {title}
          </h1>
        </Reveal>

        {/* Author info */}
        <Reveal delay={0.15}>
          <div className="flex items-center gap-3.5 pb-8 mb-8 border-b border-neutral-200">
            <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700">
              <User size={18} />
            </div>
            <div>
              <p className="font-heading text-sm font-semibold tracking-tight text-neutral-950">PontLook Research</p>
              <p className="font-sans text-xs text-neutral-600">Editorial & Intelligence Team</p>
            </div>
          </div>
        </Reveal>

        {/* Main Feature Image */}
        {imageUrl && (
          <Reveal delay={0.2}>
            <div className="relative aspect-video w-full min-h-[220px] sm:min-h-[320px] shrink-0 rounded-3xl overflow-hidden mb-10 border border-neutral-200 bg-neutral-100 shadow-sm">
              <ResourceImage
                src={imageUrl}
                alt={imageAlt || title}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
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

        {/* Body Content */}
        {content ? (
          <Reveal delay={0.3}>
            <RichText data={content} isAr={isAr} />
          </Reveal>
        ) : (
          <p className="text-neutral-600 text-sm leading-relaxed">
            {isAr
              ? 'محتوى المقال قيد التحديث والتوثيق من قبل فريق أبحاث PontLook.'
              : 'Article content is being documented by the PontLook research team.'}
          </p>
        )}

        {/* Share / CTA Footer */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={`/${lang}/find-training`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF5C00] hover:bg-[#ff6d1a] text-black font-semibold text-xs transition-all shadow-md shadow-[#FF5C00]/20"
          >
            <span>{isAr ? 'ابحث عن مزود تدريب معتمد' : 'Find a Verified Training Provider'}</span>
          </Link>
          <Link
            href={`/${lang}/resources`}
            className="text-xs font-medium text-neutral-600 hover:text-black transition-colors"
          >
            {isAr ? '← تصفح المزيد من الموارد' : 'Browse more resources →'}
          </Link>
        </div>
      </article>
    </div>
  );
}
