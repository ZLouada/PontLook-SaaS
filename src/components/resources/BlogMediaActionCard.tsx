'use client';

import React, { useState, useRef } from 'react';
import type { Locale } from '@/i18n/config';
import { isArabicLocale } from '@/i18n/config';
import type { AdaptedMediaAttachments } from '@/lib/payload/resources';
import { formatFileBadge, formatAudioDuration } from '@/utils/formatBytes';

export interface BlogMediaActionCardProps {
  mediaAttachments?: AdaptedMediaAttachments | null;
  postTitle?: string;
  lang?: Locale | string;
}

const DICTIONARY = {
  en: {
    podcastHeader: 'Executive Audio Briefing',
    podcastSub: '4-minute audio summary & key insights',
    listenNow: 'Listen Now',
    saveOffline: 'Save for offline flights & commutes',
    speed: 'Speed',
    audioTag: 'EXECUTIVE PODCAST',
  },
  ar: {
    podcastHeader: 'الملخص الصوتي التنفيذي',
    podcastSub: 'ملخص صوتي مركز في ٤ دقائق لأبرز الرؤى والاستنتاجات',
    listenNow: 'استمع الآن',
    saveOffline: 'حفظ للاستماع في رحلات العمل والتنقل',
    speed: 'السرعة',
    audioTag: 'بودكاست تنفيذي',
  },
};

export const BlogMediaActionCard: React.FC<BlogMediaActionCardProps> = ({
  mediaAttachments,
  postTitle = '',
  lang = 'en',
}) => {
  const isAr = isArabicLocale(String(lang));
  const dict = isAr ? DICTIONARY.ar : DICTIONARY.en;

  const podcastAudio = mediaAttachments?.podcastAudio;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);

  const playbackRates = [1, 1.25, 1.5, 2];

  const handleCycleSpeed = () => {
    const nextIdx = (playbackRates.indexOf(playbackRate) + 1) % playbackRates.length;
    const nextRate = playbackRates[nextIdx];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  // If no podcast audio is attached, do not render this audio component
  if (!podcastAudio) {
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

  const fileBadge = formatFileBadge(podcastAudio.filesize, podcastAudio.filename, podcastAudio.mimeType);

  return (
    <section
      aria-label="Executive Media & Podcast Attachment"
      dir={isAr ? 'rtl' : 'ltr'}
      className="relative w-full rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/90 text-neutral-900 shadow-sm overflow-hidden p-5 sm:p-7"
    >
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/25 text-[#FF5500] font-mono text-[11px] font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
              <span>{dict.audioTag}</span>
            </span>

            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-700 font-mono text-[10px] font-semibold">
              {fileBadge}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500 font-sans">
            <span className={isAr ? 'font-arabic' : 'font-sans'}>{dict.saveOffline}</span>
          </div>
        </div>

        {/* Audio Title & Host */}
        <div>
          <h3 className={`text-lg sm:text-xl font-bold text-neutral-950 tracking-tight leading-snug ${isAr ? 'font-arabic' : 'font-heading'}`}>
            {audioTitle}
          </h3>
          <p className={`text-xs text-neutral-500 mt-1 ${isAr ? 'font-arabic' : 'font-sans'}`}>
            {dict.podcastSub}
          </p>
        </div>

        {/* Interactive Player Controls Surface */}
        <div className="p-4 sm:p-5 rounded-xl bg-neutral-50 border border-neutral-200/80 flex flex-col gap-4 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Play/Pause Button */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause Podcast' : 'Play Podcast'}
                className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#FF5500] hover:bg-[#E04B00] text-white shadow-md shadow-[#FF5500]/25 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className={`w-5 h-5 fill-current ${isAr ? 'translate-x-0.5' : '-translate-x-0.5'}`} viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <div>
                <span className="font-heading font-bold text-sm text-neutral-900 block">
                  {isPlaying ? (isAr ? 'جاري التشغيل...' : 'Playing Executive Briefing') : dict.listenNow}
                </span>
                <span className="font-mono text-xs text-neutral-500 tabular-nums">
                  {currentTimeDisplay} / {durationDisplay}
                </span>
              </div>
            </div>

            {/* Playback speed selector */}
            <button
              type="button"
              onClick={handleCycleSpeed}
              aria-label="Playback speed"
              className="self-end sm:self-center font-mono text-xs px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:text-black hover:border-[#FF5500]/40 transition-colors cursor-pointer"
            >
              {playbackRate}x {dict.speed}
            </button>
          </div>

          {/* Progress track */}
          <div
            ref={progressBarRef}
            onClick={handleSeek}
            role="slider"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            className="group relative w-full h-2.5 rounded-full bg-neutral-200 cursor-pointer overflow-hidden flex items-center"
          >
            <div
              className="h-full bg-[#FF5500] transition-all duration-100 relative rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogMediaActionCard;
