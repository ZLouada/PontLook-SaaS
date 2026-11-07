'use client';

import React, { useState, useCallback, useMemo } from 'react';
import type { AdaptedDownload, AdaptedMediaAttachment } from '@/lib/payload/resources';
import { formatFileBadge } from '@/utils/formatBytes';
import { ResourceImage } from './ResourceImage';

export interface EndOfPostDownloadCardProps {
  download?: AdaptedDownload | null;
  attachment?: AdaptedMediaAttachment | null;
  buttonLabel?: string | null;
  postTitle?: string;
  isAr?: boolean;
  variant?: 'sidebar' | 'banner';
}

type DownloadState = 'idle' | 'downloading' | 'completed';

export function EndOfPostDownloadCard({
  download,
  attachment,
  buttonLabel,
  postTitle,
  isAr = false,
  variant = 'sidebar',
}: EndOfPostDownloadCardProps) {
  const [downloadState, setDownloadState] = useState<DownloadState>('idle');

  // Derive target file properties
  const fileUrl = download?.fileUrl || attachment?.url || '';
  const filename =
    attachment?.filename ||
    (download ? `${download.slug || 'pontlook-toolkit'}.${(download.format || 'pdf').toLowerCase()}` : 'pontlook-download');

  const fileBadge = useMemo(() => {
    if (attachment) {
      return formatFileBadge(attachment.filesize, attachment.filename, attachment.mimeType);
    }
    if (download) {
      const parts = [download.format, download.fileSize].filter(Boolean);
      return parts.join(' • ') || 'PDF';
    }
    return 'PDF';
  }, [attachment, download]);

  const title =
    download?.title ||
    buttonLabel ||
    (postTitle ? `${postTitle} - ${isAr ? 'الملف المرفق' : 'Executive Toolkit'}` : (isAr ? 'الأدوات والنماذج التنفيذية' : 'Executive Toolkit'));

  // Prevent duplicate title in description
  const rawDesc = (download?.desc || '').trim();
  const normalizedTitle = title.replace(/\s+/g, ' ').trim().toLowerCase();
  const normalizedDesc = rawDesc.replace(/\s+/g, ' ').trim().toLowerCase();

  const isDuplicateDesc =
    !rawDesc ||
    normalizedDesc === normalizedTitle ||
    normalizedTitle.includes(normalizedDesc);

  const displayDescription = isDuplicateDesc
    ? (isAr
      ? 'أطر عمل ونماذج استراتيجية معتمدة لفرق القيادة والتطوير.'
      : 'Executive frameworks & strategic benchmarks for decision-makers.')
    : rawDesc;

  const defaultActionLabel =
    buttonLabel?.trim() ||
    (isAr ? 'تحميل الملف PDF' : 'Download');

  const handleDownload = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!fileUrl || downloadState !== 'idle') return;

      setDownloadState('downloading');

      try {
        const downloadApiUrl = `/api/download?url=${encodeURIComponent(fileUrl)}&filename=${encodeURIComponent(filename)}`;
        const tempLink = document.createElement('a');
        tempLink.href = downloadApiUrl;
        tempLink.download = filename;
        tempLink.target = '_blank';
        tempLink.rel = 'noopener noreferrer';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
      } catch (err) {
        console.error('[EndOfPostDownloadCard] Download error:', err);
      }

      setTimeout(() => {
        setDownloadState('completed');
        setTimeout(() => {
          setDownloadState('idle');
        }, 2500);
      }, 900);
    },
    [fileUrl, filename, downloadState]
  );

  // If neither is present, render nothing
  if (!download && !attachment) {
    return null;
  }

  // Horizontal banner variant
  if (variant === 'banner') {
    return (
      <div
        dir={isAr ? 'rtl' : 'ltr'}
        className="relative overflow-hidden my-8 p-4 sm:p-5 rounded-2xl bg-white border-[1.5px] border-[#0B0B10] shadow-[4px_4px_0px_#FF5A1F] transition-transform duration-200"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#0B0B10] text-white flex items-center justify-center shrink-0 shadow-xs">
              <svg
                className="w-5 h-5 text-[#FF5A1F]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
              </svg>
            </div>
            <div className="min-w-0">
              <b className="block font-heading text-base sm:text-lg font-bold text-[#0B0B10] tracking-tight leading-snug">
                {title}
              </b>
              <span className="block font-sans text-xs sm:text-[13px] text-[#585865] mt-0.5 leading-relaxed">
                {displayDescription}
              </span>
            </div>
          </div>
          <div className="w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloadState === 'downloading' || !fileUrl}
              className={`w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-xs sm:text-sm transition-all duration-150 cursor-pointer ${
                downloadState === 'completed'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-[#FF5A1F] hover:bg-[#C93D07] text-white shadow-sm hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {downloadState === 'idle' && (
                <>
                  <span>{defaultActionLabel}</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-black/20 text-white/95">
                    {fileBadge}
                  </span>
                </>
              )}
              {downloadState === 'downloading' && (
                <span>{isAr ? 'جاري التحميل...' : 'Downloading...'}</span>
              )}
              {downloadState === 'completed' && (
                <span>{isAr ? 'تم التحميل بنجاح ✓' : 'Downloaded ✓'}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Sidebar variant: sleek, minimized vertical card
  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="relative overflow-hidden p-3.5 sm:p-4 rounded-2xl bg-white border-[1.5px] border-[#0B0B10] shadow-[4px_4px_0px_#FF5A1F] hover:shadow-[5px_5px_0px_#FF5A1F] transition-all duration-200"
    >
      {/* Header Eyebrow & Format Pill */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF1E6] text-[#C93D07] text-[10px] font-mono font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
          {download?.contentType || (isAr ? 'دليل' : 'Guide')}
        </span>
        <span className="text-[10px] font-mono font-semibold text-[#4F4F5B] bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
          {fileBadge}
        </span>
      </div>

      {/* Compact Preview Image Thumbnail */}
      {download?.image && (
        <div className="relative aspect-[16/9] max-h-36 w-full rounded-xl overflow-hidden mb-3 border border-[#ECE7E2] bg-neutral-100">
          <ResourceImage
            src={download.image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 320px"
            className="object-cover"
          />
        </div>
      )}

      {/* Title & Description without redundancy */}
      <div className="mb-3">
        <b className="block font-heading text-[13px] sm:text-sm font-bold text-[#0B0B10] tracking-tight leading-snug line-clamp-2">
          {title}
        </b>
        {displayDescription && (
          <p className="font-sans text-[11px] sm:text-xs text-[#4F4F5B] leading-relaxed line-clamp-2 mt-1">
            {displayDescription}
          </p>
        )}
      </div>

      {/* Orange Accent Download CTA Button */}
      <button
        type="button"
        onClick={handleDownload}
        disabled={downloadState === 'downloading' || !fileUrl}
        className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-heading font-semibold text-xs transition-all duration-150 cursor-pointer shadow-xs ${
          downloadState === 'completed'
            ? 'bg-emerald-600 text-white'
            : 'bg-[#FF5A1F] hover:bg-[#C93D07] text-white hover:-translate-y-0.5 active:translate-y-0'
        }`}
      >
        {downloadState === 'idle' && (
          <>
            <svg
              className="w-3.5 h-3.5 text-white shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
            </svg>
            <span>{defaultActionLabel}</span>
          </>
        )}

        {downloadState === 'downloading' && (
          <>
            <svg className="w-3.5 h-3.5 text-white animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{isAr ? 'جاري التحميل...' : 'Downloading...'}</span>
          </>
        )}

        {downloadState === 'completed' && (
          <>
            <svg className="w-3.5 h-3.5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{isAr ? 'تم التحميل بنجاح ✓' : 'Downloaded ✓'}</span>
          </>
        )}
      </button>

      {/* Trust Footer */}
      <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-sans text-[#585865] mt-2">
        <span className="text-[#10B981] font-bold">✓</span>
        <span>{isAr ? 'ملف رسمي معتمد · تحميل فوري' : 'Verified PontLook Framework · Instant Download'}</span>
      </div>
    </div>
  );
}

export default EndOfPostDownloadCard;


