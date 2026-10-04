import React from 'react';

/**
 * Architectural vector line-art representation of Burj Al Arab in Dubai,
 * faithfully matching the exact 3D perspective and geometry of the building:
 * - Sweeping dhow sail facade on the left
 * - Cantilevered circular helipad hovering on the upper-left
 * - Upper wishbone arch sweeping up to the apex needle spire
 * - Cantilevered Skyview restaurant pod extending to the right
 * - 3 giant exoskeleton diagrid truss bays with chevron bracing
 * - 48 continuous horizontal floor lines covering the entire shape
 * - Stepped island base platform with beveled facet lines
 */

export default function BurjTower({ className = '' }: { className?: string }) {
  // Generate 48 horizontal floor lines spanning across the entire building shape
  const floorLines = [];
  const startY = 195;
  const endY = 555;
  const numFloors = 48;
  const step = (endY - startY) / (numFloors - 1);

  for (let i = 0; i < numFloors; i++) {
    const y = startY + i * step;
    const t = i / (numFloors - 1);

    // Dynamic x coordinates based on the sail curve profile
    let leftX: number;
    let midX: number;
    if (y < 440) {
      const u = (y - 195) / (440 - 195);
      leftX = 284 - (284 - 214) * Math.pow(u, 0.85);
      midX = 306 - (306 - 252) * Math.pow(u, 0.85);
    } else {
      const u = (y - 440) / (555 - 440);
      leftX = 214 + (226 - 214) * Math.pow(u, 1.3);
      midX = 252 + (264 - 252) * Math.pow(u, 1.3);
    }
    const divX = 336 + (326 - 336) * t;

    floorLines.push({
      id: `fl-${i}`,
      leftX,
      midX,
      divX,
      y,
      curveY: y + 2.8,
    });
  }

  // Silhouette outline path for the building body
  const silhouettePath =
    'M 140,568 L 226,568 C 218,545 214,500 214,440 C 214,360 255,240 284,195 L 294,185 C 310,140 348,102 387,90 L 399,90 L 399,568 L 461,568 Z';

  return (
    <div
      className={`relative select-none flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {/* Ambient lighting halo giving architectural depth against the dark background */}
      <div className="pointer-events-none absolute left-1/2 top-[16%] h-[68%] w-[78%] -translate-x-1/2 rounded-full bg-white/[0.04] blur-[90px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[24%] w-[115%] -translate-x-1/2 rounded-[50%] bg-white/[0.025] blur-[70px]" />

      <svg
        viewBox="110 20 380 575"
        className="relative h-full w-full overflow-visible drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
        preserveAspectRatio="xMidYMax meet"
        role="presentation"
        focusable="false"
      >
        <defs>
          {/* Lateral architectural depth shading */}
          <linearGradient id="baa-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#08090C" />
            <stop offset="28%" stopColor="#161922" />
            <stop offset="62%" stopColor="#222834" />
            <stop offset="85%" stopColor="#151820" />
            <stop offset="100%" stopColor="#0A0B0E" />
          </linearGradient>

          {/* Vertical dissolve veil into the hero dark background */}
          <linearGradient id="baa-veil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="68%" stopColor="#000000" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.88" />
          </linearGradient>

          {/* Spire apex beam */}
          <linearGradient id="baa-spire" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Building mass solid fill */}
        <path d={silhouettePath} fill="url(#baa-body)" />

        {/* Base Island Platform Lines */}
        <g id="island-base">
          <polygon
            points="124,582 476,582 461,568 140,568"
            fill="#0D0F14"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeOpacity="0.65"
          />
          <line
            x1="140"
            y1="568"
            x2="270"
            y2="584"
            stroke="#FFFFFF"
            strokeWidth="1.1"
            strokeOpacity="0.45"
          />
          <line
            x1="270"
            y1="584"
            x2="330"
            y2="584"
            stroke="#FFFFFF"
            strokeWidth="1.3"
            strokeOpacity="0.65"
          />
          <line
            x1="330"
            y1="584"
            x2="461"
            y2="568"
            stroke="#FFFFFF"
            strokeWidth="1.1"
            strokeOpacity="0.45"
          />
          <line
            x1="270"
            y1="584"
            x2="124"
            y2="582"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <line
            x1="330"
            y1="584"
            x2="476"
            y2="582"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <polygon
            points="132,582 468,582 458,588 142,588"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />
        </g>

        {/* Base Lobby Canopy */}
        <g id="base-canopy">
          <rect
            x="226"
            y="555"
            width="173"
            height="13"
            fill="#12151C"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.55"
          />
          <line x1="250" y1="555" x2="250" y2="568" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.35" />
          <line x1="280" y1="555" x2="280" y2="568" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.35" />
          <line x1="310" y1="555" x2="310" y2="568" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.35" />
          <line x1="340" y1="555" x2="340" y2="568" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.35" />
          <line x1="370" y1="555" x2="370" y2="568" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.35" />
        </g>

        {/* Floor Lines Covering the Shape */}
        <g id="floor-lines">
          {floorLines.map((fl) => (
            <React.Fragment key={fl.id}>
              {/* Curved sail ribbon */}
              <path
                d={`M ${fl.leftX.toFixed(1)},${fl.y.toFixed(1)} Q ${((fl.leftX + fl.midX) * 0.5).toFixed(1)},${fl.curveY.toFixed(1)} ${fl.midX.toFixed(1)},${fl.y.toFixed(1)}`}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="0.85"
                strokeOpacity="0.25"
              />
              {/* Center ladder rung */}
              <line
                x1={fl.midX.toFixed(1)}
                y1={fl.y.toFixed(1)}
                x2={fl.divX.toFixed(1)}
                y2={fl.y.toFixed(1)}
                stroke="#FFFFFF"
                strokeWidth="0.95"
                strokeOpacity="0.38"
              />
              {/* Side wall floor line */}
              <line
                x1={fl.divX.toFixed(1)}
                y1={fl.y.toFixed(1)}
                x2="399"
                y2={fl.y.toFixed(1)}
                stroke="#FFFFFF"
                strokeWidth="0.85"
                strokeOpacity="0.24"
              />
            </React.Fragment>
          ))}
        </g>

        {/* 3 Massive Exoskeleton Diagrid Trusses (Right Wall) */}
        <g id="diagrid-trusses">
          {/* Bay 1 (Lower: y=435 to 555) */}
          <line x1="329" y1="435" x2="399" y2="555" stroke="#FFFFFF" strokeWidth="2.2" strokeOpacity="0.75" />
          <line x1="327" y1="555" x2="399" y2="435" stroke="#FFFFFF" strokeWidth="2.2" strokeOpacity="0.75" />
          <line x1="328" y1="495" x2="399" y2="495" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.55" />
          <line x1="364" y1="495" x2="399" y2="435" stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.45" />
          <line x1="364" y1="495" x2="399" y2="555" stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.45" />

          {/* Bay 2 (Middle: y=315 to 435) */}
          <line x1="332" y1="315" x2="399" y2="435" stroke="#FFFFFF" strokeWidth="2.2" strokeOpacity="0.75" />
          <line x1="329" y1="435" x2="399" y2="315" stroke="#FFFFFF" strokeWidth="2.2" strokeOpacity="0.75" />
          <line x1="331" y1="375" x2="399" y2="375" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.55" />
          <line x1="365" y1="375" x2="399" y2="315" stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.45" />
          <line x1="365" y1="375" x2="399" y2="435" stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.45" />

          {/* Bay 3 (Upper: y=195 to 315) */}
          <line x1="336" y1="195" x2="399" y2="315" stroke="#FFFFFF" strokeWidth="2.2" strokeOpacity="0.75" />
          <line x1="332" y1="315" x2="399" y2="195" stroke="#FFFFFF" strokeWidth="2.2" strokeOpacity="0.75" />
          <line x1="334" y1="255" x2="399" y2="255" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.55" />
          <line x1="367" y1="255" x2="399" y2="195" stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.45" />
          <line x1="367" y1="255" x2="399" y2="315" stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.45" />
        </g>

        {/* Structural Column & Boundary Lines */}
        <g id="structural-columns">
          {/* Right wall vertical spine */}
          <line x1="399" y1="90" x2="399" y2="568" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.9" />

          {/* Dividing column between front sail and side wall */}
          <line x1="336" y1="185" x2="326" y2="568" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.85" />

          {/* Inner sail column */}
          <path
            d="M 306,192 C 282,240 252,360 252,440 C 252,500 255,545 264,568"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeOpacity="0.8"
          />

          {/* Left outer curved sail boundary */}
          <path
            d="M 284,195 C 255,240 214,360 214,440 C 214,500 218,545 226,568"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeOpacity="0.95"
          />

          {/* Vertical sail seam lines */}
          <path
            d="M 291,194 C 265,240 228,360 228,440 C 228,500 231,545 239,568"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            strokeOpacity="0.22"
          />
          <path
            d="M 298,193 C 273,240 240,360 240,440 C 240,500 243,545 251,568"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            strokeOpacity="0.22"
          />
        </g>

        {/* Upper Wishbone Arch & Lattice */}
        <g id="wishbone-arch">
          <path
            d="M 294,185 C 310,140 348,102 387,90"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeOpacity="0.9"
          />
          <path
            d="M 306,185 C 322,148 356,112 387,90"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeOpacity="0.65"
          />
          <line x1="310" y1="170" x2="320" y2="178" stroke="#FFFFFF" strokeWidth="0.85" strokeOpacity="0.4" />
          <line x1="325" y1="152" x2="338" y2="160" stroke="#FFFFFF" strokeWidth="0.85" strokeOpacity="0.4" />
          <line x1="342" y1="135" x2="356" y2="142" stroke="#FFFFFF" strokeWidth="0.85" strokeOpacity="0.4" />
          <line x1="360" y1="118" x2="372" y2="124" stroke="#FFFFFF" strokeWidth="0.85" strokeOpacity="0.4" />
        </g>

        {/* Cantilevered Circular Helipad on top-left */}
        <g id="helipad">
          <ellipse
            cx="292"
            cy="182"
            rx="28"
            ry="7"
            fill="#181C24"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeOpacity="0.95"
          />
          <ellipse
            cx="292"
            cy="182"
            rx="16"
            ry="4"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          <line x1="292" y1="175" x2="292" y2="189" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.55" />
          <line x1="264" y1="182" x2="320" y2="182" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.55" />
          <line x1="276" y1="185" x2="284" y2="204" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.75" />
          <line x1="308" y1="185" x2="300" y2="204" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.75" />
        </g>

        {/* Skyview Restaurant Pod on right */}
        <g id="skyview-restaurant">
          <path
            d="M 399,206 L 432,210 C 442,215 442,221 434,225 L 399,228 Z"
            fill="#1B1F28"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeOpacity="0.85"
          />
          <line x1="400" y1="217" x2="436" y2="217" stroke="#FFFFFF" strokeWidth="0.95" strokeOpacity="0.6" />
          <line x1="420" y1="208" x2="420" y2="226" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.38" />
          <line x1="430" y1="210" x2="430" y2="224" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.38" />
        </g>

        {/* Spire & Apex */}
        <g id="spire">
          <polygon
            points="387,90 399,90 399,185 387,90"
            fill="#171A22"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeOpacity="0.75"
          />
          <line x1="393" y1="90" x2="393" y2="185" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.35" />
          <line x1="387" y1="26" x2="387" y2="90" stroke="url(#baa-spire)" strokeWidth="2.2" />
          <circle cx="387" cy="26" r="2.8" fill="#FFFFFF" />
          <circle cx="387" cy="26" r="7" fill="#FFFFFF" fillOpacity="0.15" />
        </g>

        {/* Bottom vertical veil gradient dissolving into background */}
        <path d={silhouettePath} fill="url(#baa-veil)" />
      </svg>
    </div>
  );
}
