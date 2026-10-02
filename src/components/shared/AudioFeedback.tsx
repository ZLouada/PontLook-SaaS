'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';

function VolumeIcon({ className = '', size = 14 }: { className?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function VolumeMuteIcon({ className = '', size = 14 }: { className?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="22" y1="9" x2="16" y2="15" />
      <line x1="16" y1="9" x2="22" y2="15" />
    </svg>
  );
}

export interface AudioFeedbackProps {
  lang?: string;
}

export default function AudioFeedback({ lang = 'en' }: AudioFeedbackProps) {
  const isAr = lang === 'ar';
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setMounted(true);
    // Retrieve user preference if previously saved
    const saved = localStorage.getItem('pontlook_sound_fx');
    if (saved === 'true') {
      setEnabled(true);
    }
  }, []);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Soft crystalline hover chime
  const playHover = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(740, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.018, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio context policy or unsupported
    }
  }, [enabled, getAudioContext]);

  // Warm tactile click sound
  const playClick = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Audio context policy or unsupported
    }
  }, [enabled, getAudioContext]);

  // Welcome sound when toggling on
  const playActivation = useCallback(() => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      [440, 660, 880].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.03, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.12);
      });
    } catch {
      // Audio context policy
    }
  }, [getAudioContext]);

  const toggleSound = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    localStorage.setItem('pontlook_sound_fx', String(nextState));
    if (nextState) {
      playActivation();
    }
  };

  // Attach global micro-interaction listeners when enabled
  useEffect(() => {
    if (!enabled) return;

    let lastHoverTime = 0;
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('button, a, [role="button"], [data-sound="hover"]');
      if (interactive) {
        const now = Date.now();
        if (now - lastHoverTime > 75) {
          lastHoverTime = now;
          playHover();
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('button, a, [role="button"]');
      if (interactive) {
        playClick();
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
    };
  }, [enabled, playHover, playClick]);

  if (!mounted) return null;

  return (
    <div className="hidden sm:block fixed bottom-5 end-5 z-40 select-none">
      <m.button
        type="button"
        onClick={toggleSound}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-xl text-xs font-medium transition-all duration-300 shadow-lg ${
          enabled
            ? 'bg-[#16171B]/90 border-orange-500/40 text-orange-400 shadow-orange-500/10'
            : 'bg-[#16171B]/80 border-[#26282D] text-neutral-400 hover:text-neutral-200 hover:border-white/20'
        }`}
        aria-label={
          isAr
            ? enabled
              ? 'كتم المؤثرات الصوتية'
              : 'تشغيل المؤثرات الصوتية التفاعلية'
            : enabled
            ? 'Mute UI sound effects'
            : 'Enable interactive UI sound effects'
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          {enabled ? (
            <m.div
              key="sound-on"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5"
            >
              <VolumeIcon size={13} className="text-orange-400" />
              {/* Dynamic waveform visualizer */}
              <span className="flex items-center gap-0.5 h-2.5">
                <span className="w-0.5 h-2 bg-orange-400 rounded-full animate-pulse" />
                <span className="w-0.5 h-3 bg-orange-400 rounded-full animate-pulse delay-75" />
                <span className="w-0.5 h-1.5 bg-orange-400 rounded-full animate-pulse delay-150" />
              </span>
              <span className="text-[11px] font-mono font-medium">
                {isAr ? 'الصوت: نشط' : 'Sound: ON'}
              </span>
            </m.div>
          ) : (
            <m.div
              key="sound-off"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5"
            >
              <VolumeMuteIcon size={13} className="text-neutral-500 group-hover:text-neutral-300" />
              <span className="text-[11px] font-mono text-neutral-500 group-hover:text-neutral-300">
                {isAr ? 'المؤثرات الصوتية' : 'Sound FX'}
              </span>
            </m.div>
          )}
        </AnimatePresence>
      </m.button>
    </div>
  );
}
