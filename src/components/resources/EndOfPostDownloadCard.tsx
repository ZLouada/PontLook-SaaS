'use client';

import React, { useState, useCallback, useMemo } from 'react';
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

  const title =
    download?.title ||
    buttonLabel ||
    (postTitle ? `${postTitle} - ${isAr ? 'الملف المرفق' : 'Executive Toolkit'}` : (isAr ? 'الأدوات والنماذج التنفيذية' : 'Executive Toolkit'));

  const description =
    download?.desc ||
    (isAr
      ? `مرفق بحثي معتمد من فريق أبحاث PontLook. ${fileBadge}. جاهز للتحميل الفوري.`
      : `Official PontLook research framework. ${fileBadge}. Ready for instant download.`);

  const defaultActionLabel =
    buttonLabel?.trim() ||
    (isAr ? 'تحميل الملف PDF' : 'Download PDF');

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
      className="relative overflow-hidden my-12 p-6 sm:p-8 rounded-[24px] sm:rounded-[28px] bg-white border-2 border-[#0B0B10] shadow-[6px_6px_0px_#FF5A1F] sm:shadow-[8px_8px_0px_#FF5A1F] transition-transform duration-200"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Icon, Title & Description */}
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Black Square Icon Container with White Download Vector */}
          <div className="w-14 h-14 rounded-[18px] bg-[#0B0B10] text-white flex items-center justify-center shrink-0 shadow-sm">
            <svg
              className="w-6 h-6 text-[#FF5A1F]"
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
            <b className="block font-heading text-xl sm:text-2xl font-bold text-[#0B0B10] tracking-tight leading-snug">
              {title}
            </b>
            <span className="block font-sans text-xs sm:text-sm text-[#7A7A85] mt-1 leading-relaxed">
              {description}
            </span>
          </div>
        </div>

        {/* Right: Orange Accent Download Button */}
        <div className="w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloadState === 'downloading' || !fileUrl}
            className={`w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-heading font-semibold text-sm transition-all duration-150 cursor-pointer ${
              downloadState === 'completed'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-[#FF5A1F] hover:bg-[#C93D07] text-white shadow-md hover:-translate-y-0.5 active:translate-y-0'
            }`}
          >
            {downloadState === 'idle' && (
              <>
                <span>{defaultActionLabel}</span>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-black/20 text-white/95">
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
                <span>{isAr ? 'جاري التحميل...' : 'Starting Download...'}</span>
              </>
            )}

            {downloadState === 'completed' && (
              <>
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{isAr ? 'تم التحميل بنجاح ✓' : 'Downloaded ✓'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndOfPostDownloadCard;
