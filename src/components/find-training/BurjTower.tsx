import React from 'react';

/**
 * Stepped supertall tower silhouette (Burj Khalifa inspired) used as the
 * find-training hero companion visual. Deliberately a static SVG so the hero
 * stays a server component and ships no extra JS: depth comes from gradients,
 * a floor-line pattern and ambient glow rather than animation.
 */

/** Setback tiers, bottom to top: [y of the tier top, half-width of the tier]. */
const TIERS: ReadonlyArray<readonly [number, number]> = [
  [720, 78],
  [600, 66],
  [520, 56],
  [440, 47],
  [368, 39],
  [302, 32],
  [244, 26],
  [192, 21],
  [146, 16],
  [108, 12],
  [76, 8],
  [50, 2.2],
];

const CENTER = 130;
const SPIRE_TIP = 0;

/** Walks the setbacks up the left flank, over the spire, then back down the right. */
function buildSilhouette(): string {
  const up = TIERS.map(([y, hw], i) => {
    const x = CENTER - hw;
    return i === 0 ? `M${x},${y}` : `H${x} V${y}`;
  }).join(' ');

  const down = [...TIERS]
    .reverse()
    .map(([y, hw], i) => {
      const x = CENTER + hw;
      return i === 0 ? `L${x},6 V${y}` : `H${x} V${y}`;
    })
    .join(' ');

  // The top tier ends at y=6 so the spire can taper to a point on the centre line.
  return `${up} V6 L${CENTER},${SPIRE_TIP} ${down} Z`;
}

const SILHOUETTE = buildSilhouette();

export default function BurjTower({ className = '' }: { className?: string }) {
  return (
    <div className={`relative select-none ${className}`} aria-hidden="true">
      {/* Ambient halo so the tower reads as lit from behind rather than pasted on */}
      <div className="pointer-events-none absolute left-1/2 top-[18%] h-[62%] w-[70%] -translate-x-1/2 rounded-full bg-white/[0.045] blur-[90px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[22%] w-[115%] -translate-x-1/2 rounded-[50%] bg-white/[0.03] blur-[70px]" />

      <svg
        viewBox="0 0 260 740"
        className="relative h-full w-full overflow-visible"
        preserveAspectRatio="xMidYMax meet"
        role="presentation"
        focusable="false"
      >
        <defs>
          {/* Lateral shading: dark flanks, lit core */}
          <linearGradient id="bt-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#07080A" />
            <stop offset="22%" stopColor="#16181D" />
            <stop offset="48%" stopColor="#32363E" />
            <stop offset="66%" stopColor="#23262C" />
            <stop offset="100%" stopColor="#07080A" />
          </linearGradient>

          {/* Vertical fade so the base dissolves into the hero background */}
          <linearGradient id="bt-veil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="72%" stopColor="#000" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.92" />
          </linearGradient>

          {/* Spire highlight */}
          <linearGradient id="bt-edge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.04" />
          </linearGradient>

          {/* Floor lines read as storeys at any scale */}
          <pattern id="bt-floors" width="8" height="7" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0.5" x2="8" y2="0.5" stroke="#FFFFFF" strokeOpacity="0.075" strokeWidth="1" />
          </pattern>

          <clipPath id="bt-clip">
            <path d={SILHOUETTE} />
          </clipPath>
        </defs>

        {/* Tower mass */}
        <path d={SILHOUETTE} fill="url(#bt-body)" />

        {/* Storey texture + structural fins, both clipped to the silhouette */}
        <g clipPath="url(#bt-clip)">
          <rect x="0" y="0" width="260" height="740" fill="url(#bt-floors)" />
          <line x1="130" y1="0" x2="130" y2="740" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="1.25" />
          <line x1="104" y1="0" x2="104" y2="740" stroke="#FFFFFF" strokeOpacity="0.07" strokeWidth="1" />
          <line x1="156" y1="0" x2="156" y2="740" stroke="#FFFFFF" strokeOpacity="0.07" strokeWidth="1" />
          <rect x="0" y="0" width="260" height="740" fill="url(#bt-veil)" />
        </g>

        {/* Crisp outline keeps the setbacks legible against black */}
        <path d={SILHOUETTE} fill="none" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="1" />

        {/* Spire */}
        <line x1="130" y1="0" x2="130" y2="96" stroke="url(#bt-edge)" strokeWidth="1.5" />
        <circle cx="130" cy="2" r="2.5" fill="#FFFFFF" fillOpacity="0.9" />
        <circle cx="130" cy="2" r="7" fill="#FFFFFF" fillOpacity="0.12" />
      </svg>
    </div>
  );
}
