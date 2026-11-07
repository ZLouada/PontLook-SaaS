'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Download, FileText, CheckCircle2 } from '@/components/icons';
import type { AdaptedDownload, AdaptedMediaAttachment } from '@/lib/payload/resources';
import { formatFileBadge } from '@/utils/formatBytes';

export interface EndOfPostDownloadCardProps {
  download?: AdaptedDownload | null;
  attachment?: AdaptedMediaAttachment | null;
  buttonLabel?: string | null;
  postTitle?: string;
  isAr?: boolean;
}

type DownloadState = 'idle' | 'downloading' | 'completed';

export function EndOfPostDownloadCard({
  download,
  attachment,
  buttonLabel,
  postTitle,
  isAr = false,
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

  const tag =
    download?.contentType ||
    download?.category ||
    (isAr ? 'أدوات ونماذج تنفيذية' : 'EXECUTIVE TOOLKIT');

  const title =
    download?.title ||
    buttonLabel ||
    (postTitle ? `${postTitle} - ${isAr ? 'الملف المرفق' : 'Executive Toolkit'}` : (isAr ? 'تحميل الأداة التنفيذية المرفقة' : 'Download Executive Toolkit'));

  const description =
    download?.desc ||
    (isAr
      ? 'مرفق بحثي معتمد من فريق أبحاث PontLook • متاح للتحميل الفوري كمرجع عملي.'
      : 'Official PontLook Research Attachment • Ready for instant download as an actionable framework.');

  const features = download?.features || [];

  const defaultActionLabel =
    buttonLabel?.trim() ||
    (isAr ? 'تحميل الأداة المرفقة' : 'Download Executive Toolkit');

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

      const timer1 = setTimeout(() => {
        setDownloadState('completed');
        const timer2 = setTimeout(() => {
          setDownloadState('idle');
        }, 2500);
        return () => clearTimeout(timer2);
      }, 900);

      return () => clearTimeout(timer1);
    },
    [fileUrl, filename, downloadState]
  );

  // If neither is present, render nothing
  if (!download && !attachment) {
    return null;
  }

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="my-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/90 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
        {/* Left: Icon, Badges, Title & Subtitle */}
        <div className="flex items-start gap-4 sm:gap-5 max-w-2xl">
          {/* Orange Accent Document Icon */}
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/25 flex items-center justify-center text-[#FF5500] shrink-0">
            <FileText size={26} className="text-[#FF5500]" />
          </div>

          <div className="min-w-0">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF5500]/10 text-[#FF5500] font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase border border-[#FF5500]/20">
                {tag}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-mono text-[10px] sm:text-[11px] font-semibold border border-neutral-200/80">
                {fileBadge}
              </span>
            </div>

            {/* Title (Black Font) */}
            <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-neutral-950 tracking-tight leading-snug">
              {title}
            </h3>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed mt-1.5">
              {description}
            </p>
          </div>
        </div>

        {/* Right: Orange Accent Download Button */}
        <div className="w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloadState === 'downloading' || !fileUrl}
            aria-label={defaultActionLabel}
            className={`group relative w-full md:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer overflow-hidden ${
              downloadState === 'completed'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25 border border-emerald-500'
                : 'bg-[#FF5500] hover:bg-[#E04B00] active:scale-[0.98] text-white shadow-md shadow-[#FF5500]/25 hover:shadow-lg hover:shadow-[#FF5500]/35 border border-[#FF5500]'
            }`}
          >
            {downloadState === 'idle' && (
              <>
                <Download size={16} className="text-white group-hover:translate-y-0.5 transition-transform" />
                <span className={isAr ? 'font-arabic' : 'font-sans'}>{defaultActionLabel}</span>
                <span className="font-mono text-[10px] sm:text-[11px] px-2 py-0.5 rounded bg-black/20 text-white/95 border border-white/20 tabular-nums">
                  {fileBadge}
                </span>
              </>
            )}

            {downloadState === 'downloading' && (
              <>
                <svg className="w-4 h-4 text-white animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className={isAr ? 'font-arabic' : 'font-sans'}>
                  {isAr ? 'جاري التحميل...' : 'Starting Download...'}
                </span>
              </>
            )}

            {downloadState === 'completed' && (
              <>
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className={isAr ? 'font-arabic' : 'font-sans'}>
                  {isAr ? 'تم التحميل بنجاح ✓' : 'Downloaded ✓'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Optional Features / Key Highlights */}
      {features.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800">
              <CheckCircle2 size={16} className="text-[#FF5500] shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EndOfPostDownloadCard;
