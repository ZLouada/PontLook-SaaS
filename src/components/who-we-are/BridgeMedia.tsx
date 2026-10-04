'use client';

import React, { useState, useEffect, useRef } from 'react';
import BridgeSVG from './BridgeSVG';

interface BridgeMediaProps {
  progress: number; // 0 to 1
  themeProgress: number; // 0 (dark glow) to 1 (light steel)
  className?: string;
}

export default function BridgeMedia({ progress, themeProgress, className = '' }: BridgeMediaProps) {
  const [hasVideoError, setHasVideoError] = useState(true); // Default to SVG fallback until clean video is provided
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Check connection speed / save-data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const nav = navigator as unknown as { connection?: { saveData?: boolean } };
      if (nav.connection?.saveData) {
        setHasVideoError(true);
      }
    }
  }, []);

  // Update video currentTime when video is active and ready
  useEffect(() => {
    if (!canPlayVideo || hasVideoError || !videoRef.current) return;
    const duration = videoRef.current.duration;
    if (duration && Number.isFinite(duration)) {
      videoRef.current.currentTime = progress * duration;
    }
  }, [progress, canPlayVideo, hasVideoError]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Approach A: Video Element (if available and clean) */}
      {!hasVideoError && (
        <video
          ref={videoRef}
          src="/who-we-are/bridge_scrub.mp4"
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={() => setCanPlayVideo(true)}
          onError={() => setHasVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Approach B: Procedural SVG Fallback (High-performance, Crisp 60fps at any resolution) */}
      {(hasVideoError || !canPlayVideo) && (
        <BridgeSVG themeProgress={themeProgress} className="w-full h-full" />
      )}
    </div>
  );
}
