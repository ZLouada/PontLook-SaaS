'use client';

import React, { useState } from 'react';

interface BlogShareButtonsProps {
  title?: string;
  isAr?: boolean;
}

export function BlogShareButtons({ title = '', isAr = false }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    try {
      if (typeof window !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }
    } catch (e) {
      console.warn('Clipboard copy error', e);
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(title);
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${text}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mt-5 w-full">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#ECE7E2] bg-white text-[#0B0B10] hover:border-[#FF5A1F] text-xs sm:text-[13px] font-medium transition-all hover:-translate-y-0.5 cursor-pointer shadow-2xs"
      >
        <svg
          className="w-3.5 h-3.5 text-[#7A7A85]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        <span>
          {copied
            ? (isAr ? 'تم النسخ ✓' : 'Copied ✓')
            : (isAr ? 'نسخ الرابط' : 'Copy link')}
        </span>
      </button>

      <button
        type="button"
        onClick={handleShareLinkedIn}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#ECE7E2] bg-white text-[#0B0B10] hover:border-[#0077b5] hover:text-[#0077b5] text-xs sm:text-[13px] font-medium transition-all hover:-translate-y-0.5 cursor-pointer shadow-2xs"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
        </svg>
        <span>{isAr ? 'مشاركة عبر LinkedIn' : 'Share on LinkedIn'}</span>
      </button>
    </div>
  );
}

export default BlogShareButtons;
