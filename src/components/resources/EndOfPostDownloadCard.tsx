'use client';

import React from 'react';
import Link from 'next/link';
import { Download, FileText, CheckCircle2 } from '@/components/icons';
import type { AdaptedDownload } from '@/lib/payload/resources';

interface EndOfPostDownloadCardProps {
  download: AdaptedDownload;
  isAr?: boolean;
}

export function EndOfPostDownloadCard({ download, isAr = false }: EndOfPostDownloadCardProps) {
  if (!download) return null;

  const downloadLink = download.fileUrl
    ? `/api/download?url=${encodeURIComponent(download.fileUrl)}&filename=${encodeURIComponent(`${download.slug || 'pontlook-toolkit'}.${download.format.toLowerCase()}`)}`
    : '#';

  return (
    <div className="my-10 p-6 sm:p-8 rounded-[30px] bg-gradient-to-br from-neutral-50 to-white border border-neutral-200/90 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-neutral-200/70">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#FF5C00]/10 border border-[#FF5C00]/20 flex items-center justify-center text-[#FF5C00] shrink-0">
            <FileText size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 font-mono text-[10px] font-semibold uppercase tracking-wider border border-neutral-200">
                {download.category}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#FF5C00]/10 text-[#FF5C00] font-mono text-[10px] font-semibold">
                {download.contentType}
              </span>
              <span className="text-[11px] font-mono text-neutral-500">
                {download.format} • {download.fileSize}
              </span>
            </div>
            <h4 className="font-heading text-lg sm:text-xl font-bold text-neutral-950 tracking-tight">
              {download.title}
            </h4>
          </div>
        </div>

        <Link
          href={downloadLink}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#FF5C00] hover:bg-[#ff6d1a] text-black font-bold text-xs transition-all shadow-md shadow-[#FF5C00]/20 shrink-0 active:scale-95 cursor-pointer"
          {...(download.fileUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <Download size={14} />
          <span>{isAr ? 'تحميل الأداة المرفقة مجاناً' : 'Download Executive Toolkit'}</span>
        </Link>
      </div>

      {download.desc && (
        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
          {download.desc}
        </p>
      )}

      {download.features && download.features.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
          {download.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
              <CheckCircle2 size={14} className="text-[#FF5C00] shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
