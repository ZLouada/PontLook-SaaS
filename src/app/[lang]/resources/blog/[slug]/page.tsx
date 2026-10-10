import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from 'next-sanity';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import Reveal from '@/components/shared/Reveal';
import { sanityFetch } from '@/sanity/lib/live';
import { POST_QUERY, POST_SLUGS_QUERY } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import { ArrowLeft, Calendar, User } from '@/components/icons';
import { getResourcesStore } from '@/lib/resources-store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const isAr = lang === 'ar';

  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
    stega: false, // Critical for SEO clean strings
  });

  if (post) {
    const title = post.title;
    const description = post.excerpt || (isAr ? 'مقال من مدونة منصة PontLook للتدريب المؤسسي' : 'Insight from PontLook Corporate Training Platform');
    const imageUrl = post.mainImage ? urlForImage(post.mainImage).width(1200).height(630).url() : 'https://pontlook.com/images/brand/og-main.png';

    return {
      title: {
        absolute: `${title} | PontLook`,
      },
      description,
      alternates: constructAlternates(lang, `resources/blog/${slug}`),
      openGraph: {
        title,
        description,
        url: `https://pontlook.com/${lang}/resources/blog/${slug}`,
        siteName: 'PontLook',
        locale: isAr ? 'ar_SA' : 'en_US',
        type: 'article',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.mainImage?.alt || title,
          },
        ],
      },
    };
  }

  // Check admin resources store
  const store = getResourcesStore();
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
  const localArticle = (store.articles || []).find(
    (a) => (a.slug || '').trim().toLowerCase() === normalizedSlug || a.id === slug
  );
  if (localArticle) {
    const title = isAr ? localArticle.titleAr || localArticle.titleEn : localArticle.titleEn;
    const description = isAr ? localArticle.excerptAr || localArticle.excerptEn : localArticle.excerptEn;
    const imageUrl = localArticle.image || 'https://pontlook.com/images/brand/og-main.png';

    return {
      title: {
        absolute: `${title} | PontLook`,
      },
      description,
      alternates: constructAlternates(lang, `resources/blog/${slug}`),
      openGraph: {
        title,
        description,
        url: `https://pontlook.com/${lang}/resources/blog/${slug}`,
        siteName: 'PontLook',
        locale: isAr ? 'ar_SA' : 'en_US',
        type: 'article',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
    };
  }

  return {
    title: isAr ? 'المقال غير موجود | PontLook' : 'Article Not Found | PontLook',
  };
}

export async function generateStaticParams() {
  const { data: slugs } = await sanityFetch({
    query: POST_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  });

  const paths: { lang: Locale; slug: string }[] = [];
  const addedSlugs = new Set<string>();

  if (slugs && slugs.length > 0) {
    for (const locale of i18n.locales) {
      for (const item of slugs) {
        if (item.slug) {
          paths.push({ lang: locale, slug: item.slug });
          addedSlugs.add(`${locale}:${item.slug}`);
        }
      }
    }
  }

  const store = getResourcesStore();
  for (const locale of i18n.locales) {
    for (const article of store.articles) {
      if (article.slug && !addedSlugs.has(`${locale}:${article.slug}`)) {
        paths.push({ lang: locale, slug: article.slug });
        addedSlugs.add(`${locale}:${article.slug}`);
      }
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
  const isAr = lang === 'ar';

  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  });

  if (!post) {
    const store = getResourcesStore();
    const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
    const localArticle = (store.articles || []).find(
      (a) => (a.slug || '').trim().toLowerCase() === normalizedSlug || a.id === slug
    );

    if (!localArticle) {
      notFound();
    }

    const title = isAr ? localArticle.titleAr || localArticle.titleEn : localArticle.titleEn;
    const category = isAr ? localArticle.categoryAr || localArticle.categoryEn : localArticle.categoryEn;
    const date = isAr ? localArticle.dateAr || localArticle.dateEn : localArticle.dateEn;
    const excerpt = isAr ? localArticle.excerptAr || localArticle.excerptEn : localArticle.excerptEn;
    const content = isAr ? localArticle.contentAr || localArticle.contentEn : localArticle.contentEn;
    const imageUrl = localArticle.image || null;

    return (
      <div
        data-nav-light="true"
        data-nav-theme="light"
        className="min-h-screen bg-white text-neutral-900 transition-colors duration-200"
      >
        <article className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Back button */}
          <Reveal>
            <Link
              href={`/${lang}/resources`}
              className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600 hover:text-black transition-colors mb-8"
            >
              <ArrowLeft size={14} className="rtl:rotate-180" />
              <span>{isAr ? 'العودة لمركز الموارد' : 'Back to Resources'}</span>
            </Link>
          </Reveal>

          {/* Categories & Date */}
          <Reveal delay={0.05}>
            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
              {category && (
                <span className="px-3 py-1 rounded-full bg-[#FF5C00]/10 border border-[#FF5C00]/25 text-[#FF5C00] font-medium">
                  {category}
                </span>
              )}
              {date && (
                <span className="flex items-center gap-1.5 text-neutral-500 font-mono text-[11px]">
                  <Calendar size={13} />
                  {date}
                </span>
              )}
            </div>
          </Reveal>

          {/* Title */}
          <Reveal delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-neutral-950 tracking-tight leading-tight mb-6">
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
                <p className="text-sm font-semibold text-neutral-950">PontLook Research</p>
                <p className="text-xs text-neutral-600">Editorial & Intelligence Team</p>
              </div>
            </div>
          </Reveal>

          {/* Main Feature Image */}
          {imageUrl && (
            <Reveal delay={0.2}>
              <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-10 border border-neutral-200 bg-neutral-100 shadow-sm">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  priority
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
            <div className="prose prose-neutral max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-neutral-950 prose-p:text-neutral-700 prose-p:leading-relaxed prose-a:text-[#FF5C00] prose-a:no-underline hover:prose-a:underline prose-li:text-neutral-700 prose-strong:text-neutral-950 text-base sm:text-lg leading-relaxed whitespace-pre-line text-neutral-800">
              {content}
            </div>
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

  const imageUrl = post.mainImage ? urlForImage(post.mainImage).width(1200).height(675).url() : null;
  const postDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div
      data-nav-light="true"
      data-nav-theme="light"
      className="min-h-screen bg-white text-neutral-900 transition-colors duration-200"
    >
      <article className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Back button */}
        <Reveal>
          <Link
            href={`/${lang}/resources/blog`}
            className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600 hover:text-black transition-colors mb-8"
          >
            <ArrowLeft size={14} className="rtl:rotate-180" />
            <span>{isAr ? 'العودة لجميع المقالات' : 'Back to All Articles'}</span>
          </Link>
        </Reveal>

        {/* Categories & Date */}
        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
            {post.categories && post.categories.length > 0 && (
              <div className="flex gap-2">
                {post.categories.map((cat) => (
                  <span
                    key={cat._id}
                    className="px-3 py-1 rounded-full bg-[#FF5C00]/10 border border-[#FF5C00]/25 text-[#FF5C00] font-medium"
                  >
                    {cat.title}
                  </span>
                ))}
              </div>
            )}
            {postDate && (
              <span className="flex items-center gap-1.5 text-neutral-500 font-mono text-[11px]">
                <Calendar size={13} />
                {postDate}
              </span>
            )}
          </div>
        </Reveal>

        {/* Title */}
        <Reveal delay={0.1}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-neutral-950 tracking-tight leading-tight mb-6">
            {post.title}
          </h1>
        </Reveal>

        {/* Author info */}
        {post.author && (
          <Reveal delay={0.15}>
            <div className="flex items-center gap-3.5 pb-8 mb-8 border-b border-neutral-200">
              {post.author.image ? (
                <Image
                  src={urlForImage(post.author.image).width(80).height(80).url()}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover border border-neutral-200"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700">
                  <User size={18} />
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-neutral-950">{post.author.name}</p>
                {post.author.bio && (
                  <p className="text-xs text-neutral-600 line-clamp-1">{post.author.bio}</p>
                )}
              </div>
            </div>
          </Reveal>
        )}

        {/* Main Feature Image */}
        {imageUrl && (
          <Reveal delay={0.2}>
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-10 border border-neutral-200 bg-neutral-100 shadow-sm">
              <Image
                src={imageUrl}
                alt={post.mainImage?.alt || post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </Reveal>
        )}

        {/* Excerpt Lead */}
        {post.excerpt && (
          <Reveal delay={0.25}>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-medium mb-8 p-6 rounded-2xl bg-neutral-50 border border-neutral-200 italic">
              {post.excerpt}
            </p>
          </Reveal>
        )}

        {/* Body Portable Text Content */}
        {post.body && (
          <div className="prose prose-neutral max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-neutral-950 prose-p:text-neutral-700 prose-p:leading-relaxed prose-a:text-[#FF5C00] prose-a:no-underline hover:prose-a:underline prose-li:text-neutral-700 prose-strong:text-neutral-950 prose-blockquote:border-neutral-300 prose-blockquote:text-neutral-600">
            <PortableText value={post.body} />
          </div>
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
            href={`/${lang}/resources/blog`}
            className="text-xs font-medium text-neutral-600 hover:text-black transition-colors"
          >
            {isAr ? '← تصفح المزيد من المقالات' : 'Browse more articles →'}
          </Link>
        </div>
      </article>
    </div>
  );
}
