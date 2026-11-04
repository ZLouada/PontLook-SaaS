'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, Download, FileText } from '@/components/icons';
import type { AdaptedDownload } from '@/lib/payload/resources';

export interface FeatureCardProps {
  category?: string;
  titleRegular?: string;
  titleItalic?: string;
  description?: string;
  innerEyebrow?: string;
  innerTitle?: string;
  innerDescription?: string;
  tags?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  download?: AdaptedDownload | null;
  isAr?: boolean;
}

export function PontlookFeatureCard({
  category = 'KNOWLEDGE & RESEARCH',
  titleRegular = 'Workforce insights that build',
  titleItalic = 'future-ready capabilities.',
  description = 'Data-backed GCC labor benchmarks, talent localization roadmaps, and diagnostic frameworks for corporate decision-makers.',
  innerEyebrow = 'FREE DIAGNOSTIC TOOLKIT',
  innerTitle = 'PontLook Skill Gap Audit Matrix',
  innerDescription = 'Download our step-by-step diagnostic framework to evaluate departmental skill shortages before procuring external trainers.',
  tags = ['Saudization', 'Leadership ROI', 'AI Upskilling', 'Emiratization', 'Retention'],
  ctaLabel = 'Explore the L&D Knowledge Hub & Guides',
  ctaHref = '/resources/downloads',
  download,
  isAr = false,
}: FeatureCardProps) {
  // If a Payload download resource was passed, intelligently adapt the content
  const activeCategory = download ? download.category.toUpperCase() : (isAr ? 'مركز المعرفة والأبحاث' : category);
  const activeTitleRegular = download
    ? (isAr ? 'أداة تنفيذية مجانية لفرق' : 'Executive Framework for')
    : titleRegular;
  const activeTitleItalic = download
    ? (download.category || (isAr ? 'الموارد البشرية' : 'Enterprise Leaders'))
    : titleItalic;
  const activeDescription = download
    ? (download.desc || (isAr ? 'أداة قابلة للتطبيق مباشرة مصممة خصيصاً للشركات في منطقة الخليج.' : 'Field-tested enterprise toolkit designed specifically for GCC organizations.'))
    : description;
  const activeInnerEyebrow = download
    ? `${download.contentType.toUpperCase()} • ${download.format}`
    : (isAr ? 'أداة تشخيصية مجانية' : innerEyebrow);
  const activeInnerTitle = download ? download.title : innerTitle;
  const activeInnerDescription = download
    ? (download.features && download.features.length > 0
        ? download.features.slice(0, 2).join(' • ')
        : (isAr ? 'حمل النسخة المعتمدة متوافقة مع معايير الخليج' : 'Instant digital download with enterprise templates.'))
    : innerDescription;
  const activeTags = download
    ? [download.category, download.contentType, download.format, download.fileSize].filter(Boolean)
    : tags;

  // Direct download link via Next.js attachment proxy if fileUrl is available
  const downloadLink = download?.fileUrl
    ? `/api/download?url=${encodeURIComponent(download.fileUrl)}&filename=${encodeURIComponent(`${download.slug || 'pontlook-toolkit'}.${download.format.toLowerCase()}`)}`
    : ctaHref;

  const activeCtaLabel = download
    ? (isAr ? `تحميل الأداة المجانية (${download.fileSize || 'PDF'})` : `Download Free ${download.contentType} (${download.fileSize || 'PDF'})`)
    : (isAr ? 'استكشف أدلة ونماذج العمل' : ctaLabel);

  return (
    <div className="relative flex flex-col justify-between w-full p-6 sm:p-7 rounded-[28px] bg-[#F5F3EF] border border-[#E8E5DF] shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Top Header Group */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-500 font-mono">
            {activeCategory}
          </span>
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-sm border border-neutral-200/80 text-neutral-800 shrink-0">
            {download ? (
              <FileText className="w-5 h-5 text-neutral-700 stroke-[1.75]" />
            ) : (
              <BookOpen className="w-5 h-5 text-neutral-700 stroke-[1.75]" />
            )}
          </div>
        </div>

        {/* Main Headline */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 leading-[1.25] mb-2.5">
          {activeTitleRegular}{' '}
          <span className="font-serif italic font-normal text-neutral-800">
            {activeTitleItalic}
          </span>
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
          {activeDescription}
        </p>

        {/* Nested Dark Anchor Box */}
        <div className="relative p-5 rounded-2xl bg-[#0B1325] text-white shadow-inner mb-6 overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-400">
              {activeInnerEyebrow}
            </span>
          </div>
          <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight mb-1.5">
            {activeInnerTitle}
          </h4>
          <p className="text-xs text-neutral-300 leading-relaxed font-light">
            {activeInnerDescription}
          </p>
        </div>

        {/* Tag Cloud */}
        {activeTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {activeTags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium bg-white text-neutral-700 border border-neutral-200/80 shadow-2xs hover:bg-neutral-50 transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-neutral-200/60">
        <Link
          href={downloadLink}
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-900 hover:text-[#FF5C00] transition-colors underline underline-offset-4 decoration-neutral-400 hover:decoration-[#FF5C00]"
          {...(download?.fileUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {download?.fileUrl ? <Download className="w-4 h-4 text-[#FF5C00]" /> : null}
          <span>{activeCtaLabel}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90 rtl:group-hover:-translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
