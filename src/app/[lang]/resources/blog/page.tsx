import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, i18n } from '@/i18n/config';
import { constructAlternates } from '@/lib/seo';
import Reveal from '@/components/shared/Reveal';
import { sanityFetch } from '@/sanity/lib/live';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import { ArrowRight, BookOpen, Calendar, User } from '@/components/icons';
import { getResourcesStore } from '@/lib/resources-store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'مدونة التدريب المؤسسي | منصة PontLook'
    : 'Corporate Training & L&D Blog | PontLook';
  const description = isAr
    ? 'مقالات متخصصة، تحليلات مهارية، وأطر استراتيجية لتطوير الكفاءات البشرية في المملكة العربية السعودية والإمارات.'
    : 'In-depth articles, regional workforce benchmarks, and corporate L&D strategy guides across Saudi Arabia and the UAE.';

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
  const isAr = lang === 'ar';

  // Fetch posts from Sanity with live content caching
  let sanityPosts: any[] = [];
  try {
    const { data } = await sanityFetch({
      query: POSTS_QUERY,
    });
    if (data && Array.isArray(data)) {
      sanityPosts = data;
    }
  } catch (err) {
    sanityPosts = [];
  }

  // Load articles authored via Admin CMS
  const store = getResourcesStore();
  const localArticles = (store.articles || []).map((art) => ({
    _id: art.id,
    title: isAr ? art.titleAr || art.titleEn : art.titleEn,
    slug: { current: art.slug },
    excerpt: isAr ? art.excerptAr || art.excerptEn : art.excerptEn,
    publishedAt: null,
    displayDate: isAr ? art.dateAr || art.dateEn : art.dateEn,
    categories: (isAr ? art.categoryAr || art.categoryEn : art.categoryEn)
      ? [{ _id: art.id, title: isAr ? art.categoryAr || art.categoryEn : art.categoryEn }]
      : [],
    customImage: art.image || null,
    author: { name: 'PontLook Research', image: null, bio: null },
  }));

  const seenSlugs = new Set(sanityPosts.map((p) => p.slug?.current).filter(Boolean));
  const posts = [
    ...sanityPosts,
    ...localArticles.filter((art) => !seenSlugs.has(art.slug.current)),
  ];

  return (
    <div
      data-nav-light="true"
      data-nav-theme="light"
      className="min-h-screen bg-white text-neutral-900 transition-colors duration-200"
    >
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-neutral-100/80 text-xs font-mono uppercase tracking-wider text-neutral-700 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5C00]" />
              <Link href={`/${lang}/resources`} className="hover:text-black transition-colors">
                {isAr ? 'الموارد' : 'Resources'}
              </Link>
              <span className="text-neutral-400">/</span>
              <span className="text-neutral-950 font-semibold">{isAr ? 'المدونة' : 'Blog'}</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-neutral-950 tracking-tight leading-tight mb-4">
              {isAr ? 'أحدث الرؤى والأدلة التدريبية' : 'Latest Workforce Insights & Guides'}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              {isAr
                ? 'أدلة إرشادية معمقة، دراسات حالة إقليمية، واستراتيجيات عملية لحل فجوات المهارات في منشآت الخليج.'
                : 'Actionable diagnostic frameworks, regional case studies, and practical guidance to bridge capability gaps in the GCC.'}
            </p>
          </Reveal>
        </div>

        {/* Posts Listing */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post, idx) => {
              const imageUrl = post.customImage
                ? post.customImage
                : post.mainImage
                ? urlForImage(post.mainImage).width(800).height(500).url()
                : null;
              const postDate = post.displayDate
                ? post.displayDate
                : post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                : null;

              return (
                <Reveal key={post._id} delay={0.08 * (idx + 1)}>
                  <article className="group h-full flex flex-col justify-between rounded-3xl bg-white hover:bg-neutral-50/80 border border-neutral-200 hover:border-neutral-300 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
                    {imageUrl && (
                      <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
                        <Image
                          src={imageUrl}
                          alt={post.mainImage?.alt || post.title || 'Blog Post'}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Meta badges */}
                        <div className="flex items-center gap-3 text-xs text-neutral-500 mb-3">
                          {post.categories && post.categories[0] && (
                            <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 font-medium text-[11px]">
                              {post.categories[0].title}
                            </span>
                          )}
                          {postDate && (
                            <span className="flex items-center gap-1 text-[11px] font-mono text-neutral-500">
                              <Calendar size={12} />
                              {postDate}
                            </span>
                          )}
                        </div>

                        <h2 className="text-lg sm:text-xl font-heading font-bold text-neutral-950 group-hover:text-[#FF5C00] transition-colors mb-2.5 line-clamp-2">
                          <Link href={`/${lang}/resources/blog/${post.slug?.current}`}>
                            {post.title}
                          </Link>
                        </h2>

                        {post.excerpt && (
                          <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between">
                        {post.author ? (
                          <div className="flex items-center gap-2">
                            {post.author.image ? (
                              <Image
                                src={urlForImage(post.author.image).width(48).height(48).url()}
                                alt={post.author.name || 'Author'}
                                width={24}
                                height={24}
                                className="rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-6 w-6 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 text-xs">
                                <User size={12} />
                              </div>
                            )}
                            <span className="text-xs text-neutral-700 font-medium">{post.author.name}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-neutral-500 font-mono">PontLook Research</span>
                        )}

                        <Link
                          href={`/${lang}/resources/blog/${post.slug?.current}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF5C00] hover:underline"
                        >
                          <span>{isAr ? 'اقرأ المزيد' : 'Read'}</span>
                          <ArrowRight size={13} className="rtl:-scale-x-100" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <Reveal>
            <div className="p-12 rounded-3xl border border-neutral-200 bg-neutral-50 text-center max-w-xl mx-auto shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-neutral-200 flex items-center justify-center mx-auto mb-4 text-[#FF5C00]">
                <BookOpen size={24} />
              </div>
              <h3 className="text-lg font-heading font-bold text-neutral-950 mb-2">
                {isAr ? 'جاري تجهيز المقالات الأولى' : 'Articles Coming Soon'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                {isAr
                  ? 'يمكنك إنشاء ونشر المقالات والأبحاث مباشرة من استوديو Sanity الخاص بك، وستظهر هنا فوراً عبر Live Content API.'
                  : 'Create and publish posts directly from your Sanity Studio. They will automatically stream here via the Live Content API.'}
              </p>
              <Link
                href={`/${lang}/resources`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-950 hover:bg-black text-xs font-medium text-white transition-all shadow-sm"
              >
                <span>{isAr ? 'العودة لمركز الموارد' : 'Back to Resources'}</span>
                <ArrowRight size={13} className="rtl:-scale-x-100" />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
