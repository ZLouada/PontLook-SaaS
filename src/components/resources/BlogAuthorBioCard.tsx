'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Linkedin, ExternalLink } from '@/components/icons';

interface AuthorData {
  name: string;
  role?: string | null;
  image: string | null;
  bio: string | null;
  socialLinkedIn?: string | null;
  socialTwitter?: string | null;
}

interface BlogAuthorBioCardProps {
  author: AuthorData;
  isAr?: boolean;
}

export function BlogAuthorBioCard({ author, isAr = false }: BlogAuthorBioCardProps) {
  if (!author || !author.name) return null;

  return (
    <div className="my-10 p-6 sm:p-7 rounded-[28px] bg-neutral-50/90 border border-neutral-200/90 shadow-2xs transition-all duration-200 hover:shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 pb-4 mb-4 border-b border-neutral-200/60">
        {/* Author Avatar */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-neutral-200 border-2 border-white shadow-xs shrink-0 flex items-center justify-center text-neutral-600">
          {author.image ? (
            <Image
              src={author.image}
              alt={author.name}
              fill
              className="object-cover"
            />
          ) : (
            <User size={24} className="text-neutral-500" />
          )}
        </div>

        {/* Name and Role */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-400 block mb-0.5">
                {isAr ? 'عن كاتب المقال' : 'ABOUT THE AUTHOR'}
              </span>
              <h4 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-neutral-950">
                {isAr ? `بقلم: ${author.name}` : `By ${author.name}`}
              </h4>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {author.socialLinkedIn && (
                <a
                  href={author.socialLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-[#0077b5] hover:border-[#0077b5]/30 transition-colors shadow-2xs"
                  aria-label="Author LinkedIn Profile"
                >
                  <Linkedin size={14} />
                </a>
              )}
              {author.socialTwitter && (
                <a
                  href={author.socialTwitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-950 hover:border-neutral-400 transition-colors shadow-2xs font-bold text-xs"
                  aria-label="Author X (Twitter) Profile"
                >
                  𝕏
                </a>
              )}
            </div>
          </div>

          {author.role && (
            <p className="font-sans text-xs text-neutral-500 font-medium mt-0.5">
              {author.role}
            </p>
          )}
        </div>
      </div>

      {/* Author Bio */}
      {author.bio ? (
        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
          {author.bio}
        </p>
      ) : (
        <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed font-light italic">
          {isAr
            ? `${author.name} ضمن فريق التحرير والبحوث في PontLook، متخصص في استراتيجيات رأس المال البشري وتوطين الوظائف ونماذج التدريب المؤسسي في دول مجلس التعاون الخليجي.`
            : `${author.name} is part of the PontLook Research & Intelligence team, covering workforce modernization, nationalization policies, and corporate L&D strategy across the GCC.`}
        </p>
      )}
    </div>
  );
}
