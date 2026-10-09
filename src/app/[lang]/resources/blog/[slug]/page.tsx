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

  if (!post) {
    return {
      title: isAr ? 'المقال غير موجود | PontLook' : 'Article Not Found | PontLook',
    };
  }

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

export async function generateStaticParams() {
  const { data: slugs } = await sanityFetch({
    query: POST_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  });

  if (!slugs || slugs.length === 0) {
    return [];
  }

  const paths: { lang: Locale; slug: string }[] = [];
  for (const locale of i18n.locales) {
    for (const item of slugs) {
      if (item.slug) {
        paths.push({ lang: locale, slug: item.slug });
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
    notFound();
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
    <article className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back button */}
      <Reveal>
        <Link
          href={`/${lang}/resources/blog`}
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors mb-8"
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
                  className="px-3 py-1 rounded-full bg-[#FF5C00]/10 border border-[#FF5C00]/20 text-[#FF5C00] font-medium"
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}
          {postDate && (
            <span className="flex items-center gap-1.5 text-neutral-400 font-mono text-[11px]">
              <Calendar size={13} />
              {postDate}
            </span>
          )}
        </div>
      </Reveal>

      {/* Title */}
      <Reveal delay={0.1}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight mb-6">
          {post.title}
        </h1>
      </Reveal>

      {/* Author info */}
      {post.author && (
        <Reveal delay={0.15}>
          <div className="flex items-center gap-3.5 pb-8 mb-8 border-b border-white/[0.08]">
            {post.author.image ? (
              <Image
                src={urlForImage(post.author.image).width(80).height(80).url()}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full object-cover border border-white/10"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-neutral-300">
                <User size={18} />
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-white">{post.author.name}</p>
              {post.author.bio && (
                <p className="text-xs text-neutral-400 line-clamp-1">{post.author.bio}</p>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {/* Main Feature Image */}
      {imageUrl && (
        <Reveal delay={0.2}>
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-10 border border-white/10 bg-neutral-900">
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
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-medium mb-8 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] italic">
            {post.excerpt}
          </p>
        </Reveal>
      )}

      {/* Body Portable Text Content */}
      {post.body && (
        <div className="prose prose-invert prose-neutral max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-white prose-p:text-neutral-300 prose-p:leading-relaxed prose-a:text-[#FF5C00] prose-a:no-underline hover:prose-a:underline prose-li:text-neutral-300">
          <PortableText value={post.body} />
        </div>
      )}

      {/* Share / CTA Footer */}
      <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href={`/${lang}/find-training`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF5C00] hover:bg-[#ff6d1a] text-black font-semibold text-xs transition-all shadow-lg shadow-[#FF5C00]/20"
        >
          <span>{isAr ? 'ابحث عن مزود تدريب معتمد' : 'Find a Verified Training Provider'}</span>
        </Link>
        <Link
          href={`/${lang}/resources/blog`}
          className="text-xs font-medium text-neutral-400 hover:text-white transition-colors"
        >
          {isAr ? '← تصفح المزيد من المقالات' : 'Browse more articles →'}
        </Link>
      </div>
    </article>
  );
}
