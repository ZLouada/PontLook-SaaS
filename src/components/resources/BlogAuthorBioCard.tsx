'use client';

import React from 'react';
import Image from 'next/image';

interface AuthorData {
  name: string;
  role?: string | null;
  image: string | null;
  bio: string | null;
  socialLinkedIn?: string | null;
  socialTwitter?: string | null;
}

interface BlogAuthorBioCardProps {
  author?: AuthorData | null;
  isAr?: boolean;
}

export function BlogAuthorBioCard({ author, isAr = false }: BlogAuthorBioCardProps) {
  const authorName = author?.name || 'PontLook Research';
  const authorRole = author?.role || (isAr ? 'فريق التحرير والبحوث' : 'Editorial & Intelligence Team');
  const authorBio =
    author?.bio ||
    (isAr
      ? 'جزء من فريق أبحاث واستخبارات سوق العمل في PontLook، متخصص في استراتيجيات التدريب المؤسسي، سياسات التوطين، وتطوير رأس المال البشري بدول الخليج.'
      : 'Part of the PontLook Research & Intelligence team, covering workforce modernisation, nationalisation policies, and corporate L&D strategy across the GCC.');

  const initials = authorName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'PL';

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="flex items-start sm:items-center gap-4 sm:gap-5 mt-12 pt-8 border-t border-[#ECE7E2]"
    >
      {/* 54px Circular Avatar in Brand Orange or custom photo */}
      <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-[#FF5A1F] text-white flex items-center justify-center font-heading font-bold text-base sm:text-lg shrink-0 shadow-xs">
        {author?.image ? (
          <Image
            src={author.image}
            alt={authorName}
            fill
            className="object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {/* Name, Role & Bio */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <b className="font-heading font-semibold text-base sm:text-lg text-[#0B0B10] tracking-tight">
            {authorName}
          </b>
          {author?.socialLinkedIn && (
            <a
              href={author.socialLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#7A7A85] hover:text-[#0077b5] font-medium"
            >
              LinkedIn ↗
            </a>
          )}
        </div>
        <p className="font-sans text-[14px] sm:text-[14.5px] text-[#3B3B44] leading-relaxed mt-1">
          {authorBio}
        </p>
      </div>
    </div>
  );
}

export default BlogAuthorBioCard;
