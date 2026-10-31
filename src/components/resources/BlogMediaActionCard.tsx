'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import type { Locale } from '@/i18n/config';
import { isArabicLocale } from '@/i18n/config';
import type { AdaptedMediaAttachments, AdaptedMediaAttachment } from '@/lib/payload/resources';
import { formatFileBadge, formatAudioDuration } from '@/utils/formatBytes';

export interface BlogMediaActionCardProps {
  mediaAttachments?: AdaptedMediaAttachments | null;
  postTitle?: string;
  lang?: Locale | string;
}

type DownloadState = 'idle' | 'downloading' | 'completed';

const DICTIONARY = {
  en: {
    podcastHeader: 'Executive Audio Briefing',
    podcastSub: '4-minute audio summary & key insights',
    listenNow: 'Listen Now',
    downloadAudio: 'Download Podcast MP3',
    downloadAudioShort: 'Download MP3',
    downloadAttachment: 'Download Executive Toolkit',
    downloadGuide: 'Download Resource File',
    startingDownload: 'Starting Download...',
    downloaded: 'Downloaded ✓',
    saveOffline: 'Save for offline flights & commutes',
    speed: 'Speed',
    toolkitHeader: 'Executive Toolkit & Downloadable Framework',
    toolkitSub: 'Official PontLook Research Attachment • Ready for instant download',
    verifiedResource: 'Verified Resource',
    offlineCommute: 'Offline Briefing',
    audioTag: 'EXECUTIVE PODCAST',
    docTag: 'EXECUTIVE TOOLKIT',
  },
  ar: {
    podcastHeader: 'الملخص الصوتي التنفيذي',
    podcastSub: 'ملخص صوتي مركز في ٤ دقائق لأبرز الرؤى والاستنتاجات',
    listenNow: 'استمع الآن',
    downloadAudio: 'تحميل البودكاست MP3',
    downloadAudioShort: 'تحميل MP3',
    downloadAttachment: 'تحميل الدليل التنفيذي',
    downloadGuide: 'تحميل الملف المرفق',
    startingDownload: 'جاري التحميل...',
    downloaded: 'تم التحميل بنجاح ✓',
    saveOffline: 'حفظ للاستماع في رحلات العمل والتنقل',
    speed: 'السرعة',
    toolkitHeader: 'الأدوات والنماذج التنفيذية المرفقة',
    toolkitSub: 'مرفق بحثي معتمد من فريق أبحاث PontLook • جاهز للتحميل المباشر',
    verifiedResource: 'مرفق معتمد',
    offlineCommute: 'استماع دون اتصال',
    audioTag: 'بودكاست تنفيذي',
    docTag: 'أدوات ونماذج',
  },
};

/**
 * High-converting 3-State Sweet Download Button
 * idle -> downloading -> completed -> idle
 */
interface SweetDownloadButtonProps {
  media: AdaptedMediaAttachment;
  defaultLabel: string;
  isAr: boolean;
  dict: typeof DICTIONARY['en'];
  variant?: 'primary' | 'secondary' | 'compact';
  customClass?: string;
}

const SweetDownloadButton: React.FC<SweetDownloadButtonProps> = ({
  media,
  defaultLabel,
  isAr,
  dict,
  variant = 'primary',
  customClass = '',
}) => {
  const [downloadState, setDownloadState] = useState<DownloadState>('idle');

  const fileBadge = useMemo(() => {
    return formatFileBadge(media.filesize, media.filename, media.mimeType);
  }, [media]);

  const handleDownload = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (downloadState !== 'idle') return;

      setDownloadState('downloading');

      // Trigger forced-attachment download via proxy route or anchor
      try {
        const downloadApiUrl = `/api/download?url=${encodeURIComponent(media.url)}&filename=${encodeURIComponent(media.filename || 'download')}`;
        const tempLink = document.createElement('a');
        tempLink.href = downloadApiUrl;
        tempLink.download = media.filename || 'download';
        tempLink.target = '_blank';
        tempLink.rel = 'noopener noreferrer';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
      } catch (err) {
        console.error('[BlogMediaActionCard] Download trigger error:', err);
      }

      // State transition: downloading -> completed after 900ms
      const timer1 = setTimeout(() => {
        setDownloadState('completed');

        // State transition: completed -> idle after 2500ms
        const timer2 = setTimeout(() => {
          setDownloadState('idle');
        }, 2500);

        return () => clearTimeout(timer2);
      }, 900);

      return () => clearTimeout(timer1);
    },
    [downloadState, media.url, media.filename]
  );

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleDownload}
        disabled={downloadState === 'downloading'}
        aria-label={defaultLabel}
        className={`group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 border ${
          downloadState === 'completed'
            ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
            : 'bg-white/5 hover:bg-white/10 active:bg-white/15 border-white/10 hover:border-[#FF5500]/40 text-neutral-200 hover:text-white'
        } ${customClass}`}
      >
        {downloadState === 'idle' && (
          <>
            <svg
              className="w-3.5 h-3.5 text-[#FF5500] group-hover:translate-y-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className={isAr ? 'font-arabic' : 'font-sans'}>{defaultLabel}</span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 border border-white/10">
              {fileBadge}
            </span>
          </>
        )}

        {downloadState === 'downloading' && (
          <>
            <svg className="w-3.5 h-3.5 text-[#FF5500] animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className={isAr ? 'font-arabic' : 'font-sans'}>{dict.startingDownload}</span>
          </>
        )}

        {downloadState === 'completed' && (
          <>
            <svg
              className="w-3.5 h-3.5 text-emerald-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className={isAr ? 'font-arabic' : 'font-sans'}>{dict.downloaded}</span>
          </>
        )}
      </button>
    );
  }

  // Full Executive Sweet Download Button
  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={downloadState === 'downloading'}
      aria-label={defaultLabel}
      className={`group relative inline-flex items-center justify-center gap-3 rounded-xl px-6 py-3.5 font-semibold text-sm transition-all duration-200 cursor-pointer overflow-hidden ${
        downloadState === 'completed'
          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_8px_24px_-6px_rgba(16,185,129,0.5)] border border-emerald-400/30'
          : 'bg-gradient-to-r from-[#FF5500] to-[#FF6B2B] text-white shadow-[0_8px_24px_-6px_rgba(255,85,0,0.45)] hover:shadow-[0_12px_30px_-4px_rgba(255,85,0,0.65)] hover:-translate-y-0.5 active:translate-y-0 border border-[#FFA066]/30'
      } ${customClass}`}
    >
      {/* Subtle ambient shimmer */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />

      {downloadState === 'idle' && (
        <>
          {/* Animated Downward Arrow Icon */}
          <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-black/20 border border-white/20 group-hover:translate-y-0.5 transition-transform duration-200">
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </span>

          <span className={`tracking-tight ${isAr ? 'font-arabic text-base' : 'font-sans'}`}>
            {defaultLabel}
          </span>

          {/* JetBrains Mono Metadata Badge */}
          <span className="shrink-0 font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md bg-black/25 text-white/90 border border-white/15 tabular-nums tracking-wide">
            {fileBadge}
          </span>
        </>
      )}

      {downloadState === 'downloading' && (
        <>
          <svg className="w-5 h-5 text-white animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className={`tracking-tight ${isAr ? 'font-arabic text-base' : 'font-sans'}`}>
            {dict.startingDownload}
          </span>
        </>
      )}

      {downloadState === 'completed' && (
        <>
          <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-white/20 border border-white/30">
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span className={`tracking-tight ${isAr ? 'font-arabic text-base' : 'font-sans'}`}>
            {dict.downloaded}
          </span>
        </>
      )}
    </button>
  );
};

export const BlogMediaActionCard: React.FC<BlogMediaActionCardProps> = ({
  mediaAttachments,
  postTitle = '',
  lang = 'en',
}) => {
  const isAr = isArabicLocale(String(lang));
  const dict = isAr ? DICTIONARY.ar : DICTIONARY.en;

  const podcastAudio = mediaAttachments?.podcastAudio;
  const downloadableAttachment = mediaAttachments?.downloadableAttachment;

  // Audio Player State (Hooks must be called unconditionally at top of component)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);

  const playbackRates = [1, 1.25, 1.5, 2];

  // Cycle speed button
  const handleCycleSpeed = () => {
    const nextIdx = (playbackRates.indexOf(playbackRate) + 1) % playbackRates.length;
    const nextRate = playbackRates[nextIdx];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  // Zero-placeholder rule: If neither is populated, return null
  if (!podcastAudio && !downloadableAttachment) {
    return null;
  }

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn('[BlogMediaActionCard] Audio play error:', err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && !isScrubbing) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current || duration <= 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPos = isAr ? rect.right - e.clientX : e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickPos / rect.width));
    const targetTime = percent * duration;
    audioRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const audioTitle =
    mediaAttachments?.podcastTitle?.trim() ||
    postTitle?.trim() ||
    dict.podcastHeader;

  const fallbackDurationStr = mediaAttachments?.podcastDuration?.trim() || '04:15';
  const durationDisplay =
    duration > 0 ? formatAudioDuration(duration) : fallbackDurationStr;
  const currentTimeDisplay = formatAudioDuration(currentTime);

  const downloadLabel =
    mediaAttachments?.downloadButtonLabel?.trim() || dict.downloadAttachment;

  return (
    <section
      aria-label="Executive Media & Podcast Attachment"
      dir={isAr ? 'rtl' : 'ltr'}
      className="relative w-full rounded-2xl md:rounded-3xl bg-[#020617] border border-[#1E293B] text-white shadow-2xl overflow-hidden p-5 sm:p-7 md:p-8"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#FF5500]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#2451BF]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* PODCAST SECTION (if present) */}
        {podcastAudio && (
          <div className="flex flex-col gap-5">
            {/* Native zero-preload audio element */}
            <audio
              ref={audioRef}
              preload="none"
              src={podcastAudio.url}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Top Bar: Badges & Offline notice */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {/* Podcast Badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5500]/15 border border-[#FF5500]/40 text-[#FF5500] font-mono text-[11px] font-bold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
                  <span>{dict.audioTag}</span>
                </span>

                {/* Verified File Badge */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2451BF]/20 border border-[#2451BF]/40 text-[#93C5FD] font-mono text-[10px] font-semibold">
                  {formatFileBadge(podcastAudio.filesize, podcastAudio.filename, podcastAudio.mimeType)}
                </span>
              </div>

              {/* Offline flight/commute hint */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400 font-sans">
                <svg className="w-3.5 h-3.5 text-[#FF5500]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <span className={isAr ? 'font-arabic' : 'font-sans'}>{dict.saveOffline}</span>
              </div>
            </div>

            {/* Audio Title & Host */}
            <div>
              <h3 className={`text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-snug ${isAr ? 'font-arabic' : 'font-heading'}`}>
                {audioTitle}
              </h3>
              <p className={`text-xs sm:text-sm text-neutral-400 mt-1 ${isAr ? 'font-arabic' : 'font-sans'}`}>
                {dict.podcastSub}
              </p>
            </div>

            {/* Interactive Player Controls Surface */}
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0F172A]/90 border border-[#1E293B] flex flex-col gap-4 shadow-inner">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left: Play/Pause Button + Equalizer + Title */}
                <div className="flex items-center gap-4">
                  {/* High-touch Play / Pause Button in PontLook Signal Orange */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause Podcast' : 'Play Podcast'}
                    className="group shrink-0 relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#FF5500] to-[#FF6B2B] text-white shadow-[0_8px_20px_-4px_rgba(255,85,0,0.5)] hover:shadow-[0_12px_28px_-2px_rgba(255,85,0,0.7)] hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className={`w-5 h-5 sm:w-6 sm:h-6 fill-current ${isAr ? 'translate-x-0.5' : '-translate-x-0.5'}`} viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Equalizer Bars & Current State */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 h-4 mb-1">
                      {[0.4, 0.8, 0.5, 0.9, 0.6].map((scale, i) => (
                        <span
                          key={i}
                          className={`w-1 rounded-full bg-[#FF5500] transition-all duration-300 ${
                            isPlaying ? 'animate-pulse' : 'opacity-40'
                          }`}
                          style={{
                            height: isPlaying ? `${Math.max(4, scale * 16)}px` : '4px',
                            animationDelay: `${i * 120}ms`,
                          }}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-xs text-neutral-300 tabular-nums">
                      {currentTimeDisplay} <span className="text-neutral-500">/</span> {durationDisplay}
                    </span>
                  </div>
                </div>

                {/* Right: Playback Speed Toggle & Dedicated Download MP3 Button */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* Speed Toggle */}
                  <button
                    type="button"
                    onClick={handleCycleSpeed}
                    aria-label={`Playback speed ${playbackRate}x`}
                    className="font-mono text-xs font-semibold px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-neutral-200 transition-colors"
                  >
                    {playbackRate}x
                  </button>

                  {/* Compact Sweet Download MP3 Button */}
                  <SweetDownloadButton
                    media={podcastAudio}
                    defaultLabel={dict.downloadAudioShort}
                    isAr={isAr}
                    dict={dict}
                    variant="compact"
                  />
                </div>
              </div>

              {/* Scrubber Progress Bar */}
              <div
                ref={progressBarRef}
                onClick={handleSeek}
                role="slider"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                tabIndex={0}
                className="group relative w-full h-3 rounded-full bg-neutral-800/90 cursor-pointer overflow-hidden flex items-center"
              >
                {/* Progress track */}
                <div
                  className="h-full bg-gradient-to-r from-[#FF5500] to-[#FF7733] transition-all duration-100 relative rounded-full"
                  style={{ width: `${progressPercent}%` }}
                >
                  {/* Scrubber glow head */}
                  <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_10px_#FF5500] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEPARATOR (if both podcast and document exist) */}
        {podcastAudio && downloadableAttachment && (
          <div className="w-full border-t border-[#1E293B]" />
        )}

        {/* DOWNLOADABLE TOOLKIT / DOCUMENT SECTION (if present) */}
        {downloadableAttachment && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#090E1A] border border-[#1E293B]">
            {/* Left: Document Info */}
            <div className="flex items-start gap-4 max-w-xl">
              {/* Document Icon Frame */}
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#2451BF]/20 border border-[#2451BF]/40 text-[#60A5FA]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#2451BF]/25 text-[#93C5FD] border border-[#2451BF]/40 uppercase tracking-wider">
                    {dict.docTag}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/10">
                    {formatFileBadge(downloadableAttachment.filesize, downloadableAttachment.filename, downloadableAttachment.mimeType)}
                  </span>
                </div>
                <h4 className={`text-base sm:text-lg font-bold text-white tracking-tight ${isAr ? 'font-arabic' : 'font-heading'}`}>
                  {downloadLabel}
                </h4>
                <p className={`text-xs text-neutral-400 mt-1 leading-relaxed ${isAr ? 'font-arabic' : 'font-sans'}`}>
                  {dict.toolkitSub}
                </p>
              </div>
            </div>

            {/* Right: The Sweet Download Button */}
            <div className="w-full sm:w-auto shrink-0">
              <SweetDownloadButton
                media={downloadableAttachment}
                defaultLabel={downloadLabel}
                isAr={isAr}
                dict={dict}
                variant="primary"
                customClass="w-full sm:w-auto"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogMediaActionCard;
