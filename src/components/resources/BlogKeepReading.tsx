import React from 'react';
import Link from 'next/link';
import type { AdaptedArticle } from '@/lib/payload/resources';

interface BlogKeepReadingProps {
  articles: AdaptedArticle[];
  currentSlug: string;
  lang: string;
  isAr?: boolean;
}

export function BlogKeepReading({
  articles = [],
  currentSlug,
  lang,
  isAr = false,
}: BlogKeepReadingProps) {
  // Filter out current article and take up to 4
  const related = (articles || [])
    .filter((a) => a && a.slug && a.slug !== currentSlug)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section
      aria-label={isAr ? 'مقالات موصى بها' : 'Keep reading'}
      dir={isAr ? 'rtl' : 'ltr'}
      className="max-w-[1000px] mx-auto px-4 sm:px-6 pt-16 pb-20"
    >
      <h3 className="font-heading font-bold text-2xl sm:text-3xl md:text-[2.2rem] text-[#0B0B10] tracking-tight mb-6">
        {isAr ? 'تابع القراءة' : 'Keep reading'}
      </h3>

      <div className="border-b border-[#ECE7E2]">
        {related.map((post) => {
          const categoryName = post.category || (isAr ? 'التطوير والقيادة' : 'HR & Leadership');
          const readTimeDisplay = post.readTime || '8 min read';

          return (
            <Link
              key={post.id}
              href={`/${lang}/resources/blog/${post.slug}`}
              className="group grid grid-cols-1 md:grid-cols-[160px_1fr_auto] gap-2 md:gap-6 items-baseline py-6 border-t border-[#ECE7E2] transition-all duration-200 hover:pl-3 rtl:hover:pr-3"
            >
              {/* Category */}
              <span className="text-[13px] font-semibold text-[#C93D07] font-mono uppercase tracking-wider">
                {categoryName}
              </span>

              {/* Title */}
              <h5 className="font-heading font-semibold text-lg sm:text-xl text-[#0B0B10] group-hover:text-[#C93D07] tracking-tight leading-snug transition-colors m-0">
                {post.title}
              </h5>

              {/* Read Time */}
              <span className="text-xs sm:text-[13px] text-[#585865] font-mono whitespace-nowrap">
                {readTimeDisplay}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BlogKeepReading;
