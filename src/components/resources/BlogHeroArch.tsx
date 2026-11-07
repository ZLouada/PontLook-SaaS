'use client';

import React, { useEffect, useState, useId } from 'react';
import ResourceImage from './ResourceImage';

interface BlogHeroArchProps {
  imageUrl?: string | null;
  imageAlt?: string;
  readTime?: string;
  authorName?: string;
  isAr?: boolean;
}

export function BlogHeroArch({
  imageUrl,
  imageAlt = 'PontLook Research',
  readTime = '12 min read',
  authorName = 'PontLook Research',
  isAr = false,
}: BlogHeroArchProps) {
  const [rotation, setRotation] = useState<number>(0);
  const rawId = useId();
  const pathId = `badge-circle-path-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  useEffect(() => {
    const handleScroll = () => {
      setRotation(window.scrollY * 0.12);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const badgeText = `${authorName} · ${readTime} · `;

  return (
    <div
      className="relative max-w-[420px] lg:max-w-[440px] w-full mx-auto lg:mr-0 rtl:lg:mr-auto rtl:lg:ml-0"
      role="img"
      aria-label={imageAlt}
    >
      {/* Echo border offset */}
      <div
        className={`absolute inset-0 border-2 border-[#0B0B10] rounded-t-[240px] rounded-b-[32px] pointer-events-none transition-transform duration-300 ${
          isAr ? '-translate-x-3 sm:-translate-x-4 translate-y-3 sm:translate-y-4' : 'translate-x-3 sm:translate-x-4 translate-y-3 sm:translate-y-4'
        }`}
        aria-hidden="true"
      />

      {/* Main Arch Frame */}
      <div className="relative aspect-[4/5] rounded-t-[240px] rounded-b-[32px] overflow-hidden border-2 border-[#0B0B10] bg-gradient-to-b from-[#FFF8F1] via-[#FFE3CD] to-[#FFC397] shadow-sm">
        {imageUrl ? (
          <div className="relative w-full h-full">
            <ResourceImage
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 440px"
              className="object-cover"
            />
            {/* Subtle brand tint gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B10]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        ) : (
          <>
            {/* Sun Vector Animation */}
            <div
              className="absolute left-1/2 bottom-[20%] w-[58%] aspect-square rounded-full bg-[#FF5A1F] shadow-[0_0_0_26px_rgba(255,90,31,0.14),0_0_0_60px_rgba(255,90,31,0.08)] -translate-x-1/2 animate-[rise_1.5s_cubic-bezier(0.2,0.8,0.2,1)_both]"
              aria-hidden="true"
            />

            {/* Gulf Skyline Vector Illustration */}
            <svg
              className="absolute left-0 bottom-0 w-full h-[46%] block"
              viewBox="0 0 440 200"
              preserveAspectRatio="xMidYMax slice"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g fill="#F4A877">
                <rect x="14" y="96" width="44" height="104" />
                <rect x="66" y="70" width="34" height="130" />
                <rect x="262" y="84" width="46" height="116" />
                <rect x="316" y="60" width="34" height="140" />
                <rect x="358" y="92" width="52" height="108" />
              </g>
              <g fill="#0B0B10">
                <rect x="0" y="146" width="72" height="54" />
                <rect x="82" y="118" width="40" height="82" />
                <rect x="132" y="104" width="46" height="96" />
                <rect x="141" y="62" width="28" height="48" />
                <rect x="149" y="22" width="12" height="46" />
                <rect x="153" y="0" width="4" height="30" />
                <rect x="190" y="128" width="52" height="72" />
                <rect x="250" y="150" width="62" height="50" />
                <rect x="322" y="116" width="46" height="84" />
                <rect x="378" y="142" width="62" height="58" />
              </g>
            </svg>
          </>
        )}
      </div>

      {/* Rotating Badge with Circular Text Path */}
      <div
        className={`absolute bottom-[50px] sm:bottom-[70px] w-24 h-24 sm:w-28 sm:h-28 md:w-[124px] md:h-[124px] rounded-full bg-white border-2 border-[#0B0B10] grid place-items-center z-10 shadow-lg ${
          isAr ? '-right-4 sm:-right-8' : '-left-4 sm:-left-8'
        }`}
        style={{
          transform: `rotate(${isAr ? -rotation : rotation}deg)`,
          transition: 'transform 0.05s linear',
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 124 124" className="w-full h-full" aria-hidden="true">
          <defs>
            <path id={pathId} d="M62 62m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
          </defs>
          <text
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="10.5"
            fontWeight="600"
            fill="#0B0B10"
            letterSpacing="0.05em"
          >
            <textPath href={`#${pathId}`} textLength="272" lengthAdjust="spacing">
              {badgeText}
            </textPath>
          </text>
          <g fill="#0B0B10">
            <circle cx="50" cy="50" r="3.2" />
            <circle cx="62" cy="50" r="3.2" fill="#FF5A1F" />
            <circle cx="74" cy="50" r="3.2" />
            <circle cx="50" cy="62" r="3.2" fill="#FF5A1F" />
            <circle cx="62" cy="62" r="3.2" />
            <circle cx="74" cy="62" r="3.2" fill="#FF5A1F" />
            <circle cx="50" cy="74" r="3.2" />
            <circle cx="62" cy="74" r="3.2" fill="#FF5A1F" />
            <circle cx="74" cy="74" r="3.2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default BlogHeroArch;
