import React from 'react';

/**
 * Architectural vector line-art representation of the PontLook Bridge,
 * inspired by the exact architectural line-art aesthetic of BurjTower:
 * - Deep architectural gradient masses (#08090C to #222834)
 * - Twin soaring suspension pylons with wishbone lattice profiles
 * - Multi-bay diagrid exoskeleton truss bracing
 * - Sweeping catenary suspension cables with vertical suspender rungs
 * - Radiating stay cable fan arrays across the full width
 * - Continuous multi-tiered road deck with underdeck Warren truss girders
 * - Stepped architectural pier foundations with beveled facet lines
 * - Spire apex needle beacons with radiant halos
 * - Seamless bottom vertical veil dissolving into the black canvas
 */

export default function ArchitecturalBridge({ className = '' }: { className?: string }) {
  // Generate vertical suspender cables hanging from the catenary curve
  const suspenders: { id: string; x: number; topY: number; bottomY: number }[] = [];
  const deckY = 570;

  // Parabolic catenary curve math:
  // Left side span: x from 40 to 480
  for (let x = 70; x < 480; x += 32) {
    const t = (x - 70) / (480 - 70); // 0 at left anchor, 1 at tower
    const topY = 530 - (530 - 150) * Math.pow(t, 1.8);
    suspenders.push({
      id: `sus-l-${x}`,
      x,
      topY,
      bottomY: deckY,
    });
  }

  // Center main span: x from 480 to 1120 (parabola dipping to y = 430 at center 800)
  for (let x = 512; x < 1090; x += 32) {
    const u = (x - 800) / 320; // -1 at left tower, 0 at center, 1 at right tower
    const topY = 430 + (150 - 430) * (1 - Math.pow(u, 2));
    suspenders.push({
      id: `sus-c-${x}`,
      x,
      topY,
      bottomY: deckY,
    });
  }

  // Right side span: x from 1120 to 1530
  for (let x = 1152; x <= 1530; x += 32) {
    const t = (x - 1120) / (1530 - 1120); // 0 at tower, 1 at right anchor
    const topY = 150 + (530 - 150) * Math.pow(t, 1.8);
    suspenders.push({
      id: `sus-r-${x}`,
      x,
      topY,
      bottomY: deckY,
    });
  }

  // Deck truss web diagonal lines
  const deckTrusses: { id: string; x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let x = 20; x < 1580; x += 25) {
    deckTrusses.push(
      { id: `dt-1-${x}`, x1: x, y1: deckY, x2: x + 12.5, y2: deckY + 22 },
      { id: `dt-2-${x}`, x1: x + 12.5, y1: deckY + 22, x2: x + 25, y2: deckY }
    );
  }

  // Stay cables fan from left tower (x = 480, apex = 150)
  const leftTowerStays: { id: string; x1: number; y1: number; x2: number; y2: number }[] = [];
  const numStays = 16;
  for (let i = 0; i < numStays; i++) {
    const stayOriginY = 180 + i * 16;
    // Left outer stays
    const leftAnchorX = 450 - (i + 1) * 24;
    if (leftAnchorX >= 50) {
      leftTowerStays.push({
        id: `stay-lo-${i}`,
        x1: 474,
        y1: stayOriginY,
        x2: leftAnchorX,
        y2: deckY,
      });
    }
    // Left inner stays (towards center)
    const rightAnchorX = 510 + (i + 1) * 20;
    if (rightAnchorX <= 780) {
      leftTowerStays.push({
        id: `stay-li-${i}`,
        x1: 486,
        y1: stayOriginY,
        x2: rightAnchorX,
        y2: deckY,
      });
    }
  }

  // Stay cables fan from right tower (x = 1120, apex = 150)
  const rightTowerStays: { id: string; x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < numStays; i++) {
    const stayOriginY = 180 + i * 16;
    // Right inner stays (towards center)
    const leftAnchorX = 1090 - (i + 1) * 20;
    if (leftAnchorX >= 820) {
      rightTowerStays.push({
        id: `stay-ri-${i}`,
        x1: 1114,
        y1: stayOriginY,
        x2: leftAnchorX,
        y2: deckY,
      });
    }
    // Right outer stays
    const rightAnchorX = 1150 + (i + 1) * 24;
    if (rightAnchorX <= 1550) {
      rightTowerStays.push({
        id: `stay-ro-${i}`,
        x1: 1126,
        y1: stayOriginY,
        x2: rightAnchorX,
        y2: deckY,
      });
    }
  }

  return (
    <div
      className={`relative select-none w-full h-full flex items-center justify-center overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Ambient lighting halos for architectural depth */}
      <div className="absolute left-[30%] top-[25%] h-[55%] w-[45%] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[120px]" />
      <div className="absolute left-[70%] top-[25%] h-[55%] w-[45%] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[120px]" />
      <div className="absolute bottom-[5%] left-1/2 h-[30%] w-[90%] -translate-x-1/2 rounded-[50%] bg-blue-500/[0.025] blur-[100px]" />

      <svg
        viewBox="0 0 1600 820"
        className="w-full h-full object-cover object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
        focusable="false"
      >
        <defs>
          {/* Lateral architectural depth shading (matching BurjTower) */}
          <linearGradient id="pylon-body-left" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#08090C" />
            <stop offset="25%" stopColor="#161922" />
            <stop offset="55%" stopColor="#222834" />
            <stop offset="85%" stopColor="#151820" />
            <stop offset="100%" stopColor="#0A0B0E" />
          </linearGradient>

          <linearGradient id="pylon-body-right" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0A0B0E" />
            <stop offset="20%" stopColor="#151820" />
            <stop offset="50%" stopColor="#222834" />
            <stop offset="78%" stopColor="#161922" />
            <stop offset="100%" stopColor="#08090C" />
          </linearGradient>

          {/* Road deck lateral gradient */}
          <linearGradient id="deck-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#08090C" />
            <stop offset="15%" stopColor="#181C26" />
            <stop offset="50%" stopColor="#222834" />
            <stop offset="85%" stopColor="#181C26" />
            <stop offset="100%" stopColor="#08090C" />
          </linearGradient>

          {/* Spire apex beam */}
          <linearGradient id="bridge-spire" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
          </linearGradient>

          {/* Bottom vertical dissolve veil */}
          <linearGradient id="bridge-veil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="60%" stopColor="#000000" stopOpacity="0.25" />
            <stop offset="88%" stopColor="#000000" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#000000" stopOpacity="1" />
          </linearGradient>

          {/* Cable stroke gradient */}
          <linearGradient id="cable-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* ================================================================
            LAYER 1: CABLE STAY ARRAYS (Fine harp/fan lines)
            ================================================================ */}
        <g id="stay-cables-left">
          {leftTowerStays.map((stay) => (
            <line
              key={stay.id}
              x1={stay.x1}
              y1={stay.y1}
              x2={stay.x2}
              y2={stay.y2}
              stroke="url(#cable-glow)"
              strokeWidth="0.85"
            />
          ))}
        </g>

        <g id="stay-cables-right">
          {rightTowerStays.map((stay) => (
            <line
              key={stay.id}
              x1={stay.x1}
              y1={stay.y1}
              x2={stay.x2}
              y2={stay.y2}
              stroke="url(#cable-glow)"
              strokeWidth="0.85"
            />
          ))}
        </g>

        {/* ================================================================
            LAYER 2: MAIN CATENARY SUSPENSION CABLES & SUSPENDERS
            ================================================================ */}
        {/* Vertical suspender drop wires */}
        <g id="vertical-suspenders">
          {suspenders.map((s) => (
            <line
              key={s.id}
              x1={s.x}
              y1={s.topY}
              x2={s.x}
              y2={s.bottomY}
              stroke="#FFFFFF"
              strokeWidth="0.75"
              strokeOpacity="0.22"
            />
          ))}
        </g>

        {/* Main catenary cables (Twin sweeping parabolic arcs) */}
        <g id="catenary-cables">
          {/* Left Side Span Cable */}
          <path
            d="M 40,540 Q 280,480 480,150"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeOpacity="0.85"
          />
          <path
            d="M 40,544 Q 280,484 480,154"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeOpacity="0.45"
          />

          {/* Center Main Span Cable */}
          <path
            d="M 480,150 Q 800,470 1120,150"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeOpacity="0.95"
          />
          <path
            d="M 480,154 Q 800,474 1120,154"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeOpacity="0.5"
          />

          {/* Right Side Span Cable */}
          <path
            d="M 1120,150 Q 1320,480 1560,540"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeOpacity="0.85"
          />
          <path
            d="M 1120,154 Q 1320,484 1560,544"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeOpacity="0.45"
          />
        </g>

        {/* ================================================================
            LAYER 3: LEFT TOWER (PYLON) ARCHITECTURE
            ================================================================ */}
        <g id="left-pylon">
          {/* Tower Silhouette Solid Mass */}
          <polygon
            points="440,650 464,150 496,150 520,650"
            fill="url(#pylon-body-left)"
          />

          {/* Left Leg Inner Hollow Arch */}
          <polygon
            points="464,650 474,230 486,230 496,650"
            fill="#090B0E"
          />

          {/* Outer Boundary Edges */}
          <line x1="440" y1="650" x2="464" y2="150" stroke="#FFFFFF" strokeWidth="2.2" strokeOpacity="0.95" />
          <line x1="520" y1="650" x2="496" y2="150" stroke="#FFFFFF" strokeWidth="2.2" strokeOpacity="0.95" />

          {/* Inner Leg Boundary Edges */}
          <line x1="464" y1="650" x2="474" y2="230" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.7" />
          <line x1="496" y1="650" x2="486" y2="230" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.7" />

          {/* Upper Crown Wishbone Arch */}
          <path
            d="M 464,150 Q 480,136 496,150"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeOpacity="0.9"
          />
          <line x1="464" y1="150" x2="496" y2="150" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.8" />
          <line x1="467" y1="180" x2="493" y2="180" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.65" />
          <line x1="471" y1="210" x2="489" y2="210" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.65" />

          {/* Diagrid Exoskeleton Trusses between Legs (4 bays matching BurjTower) */}
          {/* Bay 1: y = 230 to 330 */}
          <line x1="474" y1="230" x2="488" y2="330" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.65" />
          <line x1="486" y1="230" x2="472" y2="330" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.65" />
          <line x1="472" y1="330" x2="488" y2="330" stroke="#FFFFFF" strokeWidth="1.6" strokeOpacity="0.75" />

          {/* Bay 2: y = 330 to 430 */}
          <line x1="472" y1="330" x2="490" y2="430" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.65" />
          <line x1="488" y1="330" x2="470" y2="430" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.65" />
          <line x1="470" y1="430" x2="490" y2="430" stroke="#FFFFFF" strokeWidth="1.6" strokeOpacity="0.75" />

          {/* Bay 3: y = 430 to 530 */}
          <line x1="470" y1="430" x2="492" y2="530" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.65" />
          <line x1="490" y1="430" x2="468" y2="530" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.65" />
          <line x1="468" y1="530" x2="492" y2="530" stroke="#FFFFFF" strokeWidth="1.6" strokeOpacity="0.75" />

          {/* Bay 4: y = 530 to 630 */}
          <line x1="468" y1="530" x2="494" y2="630" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.65" />
          <line x1="492" y1="530" x2="466" y2="630" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.65" />

          {/* Horizontal Floor / Strut Rungs on outer legs */}
          {[190, 250, 310, 370, 430, 490, 550, 610].map((ry) => (
            <React.Fragment key={`left-rung-${ry}`}>
              <line x1="458" y1={ry} x2="473" y2={ry} stroke="#FFFFFF" strokeWidth="0.9" strokeOpacity="0.4" />
              <line x1="487" y1={ry} x2="502" y2={ry} stroke="#FFFFFF" strokeWidth="0.9" strokeOpacity="0.4" />
            </React.Fragment>
          ))}

          {/* Apex Spire & Radiant Beacon */}
          <line x1="480" y1="50" x2="480" y2="150" stroke="url(#bridge-spire)" strokeWidth="2.2" />
          <circle cx="480" cy="50" r="3" fill="#FFFFFF" />
          <circle cx="480" cy="50" r="8" fill="#FFFFFF" fillOpacity="0.18" />
          <circle cx="480" cy="50" r="16" fill="#FFFFFF" fillOpacity="0.06" />

          {/* Stepped Island Base Platform (Burj-inspired facet lines) */}
          <polygon
            points="410,670 550,670 535,650 425,650"
            fill="#0D0F14"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeOpacity="0.65"
          />
          <line x1="425" y1="650" x2="480" y2="670" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="535" y1="650" x2="480" y2="670" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
          <polygon
            points="395,688 565,688 550,670 410,670"
            fill="#08090C"
            stroke="#FFFFFF"
            strokeWidth="1.1"
            strokeOpacity="0.45"
          />
        </g>

        {/* ================================================================
            LAYER 4: RIGHT TOWER (PYLON) ARCHITECTURE (Symmetric Twin)
            ================================================================ */}
        <g id="right-pylon">
          {/* Tower Silhouette Solid Mass */}
          <polygon
            points="1080,650 1104,150 1136,150 1160,650"
            fill="url(#pylon-body-right)"
          />

          {/* Right Leg Inner Hollow Arch */}
          <polygon
            points="1104,650 1114,230 1126,230 1136,650"
            fill="#090B0E"
          />

          {/* Outer Boundary Edges */}
          <line x1="1080" y1="650" x2="1104" y2="150" stroke="#FFFFFF" strokeWidth="2.2" strokeOpacity="0.95" />
          <line x1="1160" y1="650" x2="1136" y2="150" stroke="#FFFFFF" strokeWidth="2.2" strokeOpacity="0.95" />

          {/* Inner Leg Boundary Edges */}
          <line x1="1104" y1="650" x2="1114" y2="230" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.7" />
          <line x1="1136" y1="650" x2="1126" y2="230" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.7" />

          {/* Upper Crown Wishbone Arch */}
          <path
            d="M 1104,150 Q 1120,136 1136,150"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeOpacity="0.9"
          />
          <line x1="1104" y1="150" x2="1136" y2="150" stroke="#FFFFFF" strokeWidth="1.8" strokeOpacity="0.8" />
          <line x1="1107" y1="180" x2="1133" y2="180" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.65" />
          <line x1="1111" y1="210" x2="1129" y2="210" stroke="#FFFFFF" strokeWidth="1.4" strokeOpacity="0.65" />

          {/* Diagrid Exoskeleton Trusses between Legs */}
          {/* Bay 1: y = 230 to 330 */}
          <line x1="1114" y1="230" x2="1128" y2="330" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.65" />
          <line x1="1126" y1="230" x2="1112" y2="330" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.65" />
          <line x1="1112" y1="330" x2="1128" y2="330" stroke="#FFFFFF" strokeWidth="1.6" strokeOpacity="0.75" />

          {/* Bay 2: y = 330 to 430 */}
          <line x1="1112" y1="330" x2="1130" y2="430" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.65" />
          <line x1="1128" y1="330" x2="1110" y2="430" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.65" />
          <line x1="1110" y1="430" x2="1130" y2="430" stroke="#FFFFFF" strokeWidth="1.6" strokeOpacity="0.75" />

          {/* Bay 3: y = 430 to 530 */}
          <line x1="1110" y1="430" x2="1132" y2="530" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.65" />
          <line x1="1130" y1="430" x2="1108" y2="530" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.65" />
          <line x1="1108" y1="530" x2="1132" y2="530" stroke="#FFFFFF" strokeWidth="1.6" strokeOpacity="0.75" />

          {/* Bay 4: y = 530 to 630 */}
          <line x1="1108" y1="530" x2="1134" y2="630" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.65" />
          <line x1="1132" y1="530" x2="1106" y2="630" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.65" />

          {/* Horizontal Floor / Strut Rungs on outer legs */}
          {[190, 250, 310, 370, 430, 490, 550, 610].map((ry) => (
            <React.Fragment key={`right-rung-${ry}`}>
              <line x1="1098" y1={ry} x2="1113" y2={ry} stroke="#FFFFFF" strokeWidth="0.9" strokeOpacity="0.4" />
              <line x1="1127" y1={ry} x2="1142" y2={ry} stroke="#FFFFFF" strokeWidth="0.9" strokeOpacity="0.4" />
            </React.Fragment>
          ))}

          {/* Apex Spire & Radiant Beacon */}
          <line x1="1120" y1="50" x2="1120" y2="150" stroke="url(#bridge-spire)" strokeWidth="2.2" />
          <circle cx="1120" cy="50" r="3" fill="#FFFFFF" />
          <circle cx="1120" cy="50" r="8" fill="#FFFFFF" fillOpacity="0.18" />
          <circle cx="1120" cy="50" r="16" fill="#FFFFFF" fillOpacity="0.06" />

          {/* Stepped Island Base Platform */}
          <polygon
            points="1050,670 1190,670 1175,650 1065,650"
            fill="#0D0F14"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeOpacity="0.65"
          />
          <line x1="1065" y1="650" x2="1120" y2="670" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="1175" y1="650" x2="1120" y2="670" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
          <polygon
            points="1035,688 1205,688 1190,670 1050,670"
            fill="#08090C"
            stroke="#FFFFFF"
            strokeWidth="1.1"
            strokeOpacity="0.45"
          />
        </g>

        {/* ================================================================
            LAYER 5: CONTINUOUS MULTI-TIER ROAD DECK
            ================================================================ */}
        <g id="bridge-deck">
          {/* Deck solid background slab */}
          <rect
            x="0"
            y={deckY - 4}
            width="1600"
            height="32"
            fill="url(#deck-gradient)"
          />

          {/* Top Handrail Barrier */}
          <line
            x1="0"
            y1={deckY - 10}
            x2="1600"
            y2={deckY - 10}
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeOpacity="0.75"
          />

          {/* Primary Road Deck Beam (Dominant crisp line) */}
          <line
            x1="0"
            y1={deckY}
            x2="1600"
            y2={deckY}
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeOpacity="0.95"
          />

          {/* Roadway Median Divider Stripe */}
          <line
            x1="0"
            y1={deckY + 6}
            x2="1600"
            y2={deckY + 6}
            stroke="#FFFFFF"
            strokeWidth="0.9"
            strokeOpacity="0.3"
            strokeDasharray="16 12"
          />

          {/* Deck Lower Soffit Line */}
          <line
            x1="0"
            y1={deckY + 22}
            x2="1600"
            y2={deckY + 22}
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeOpacity="0.85"
          />

          {/* Warren Truss Diagonal Webbing between Deck & Soffit */}
          <g id="deck-trusses">
            {deckTrusses.map((dt) => (
              <line
                key={dt.id}
                x1={dt.x1}
                y1={dt.y1}
                x2={dt.x2}
                y2={dt.y2}
                stroke="#FFFFFF"
                strokeWidth="0.95"
                strokeOpacity="0.35"
              />
            ))}
          </g>

          {/* Navigation warning light beacons across bridge span */}
          {[160, 320, 640, 800, 960, 1280, 1440].map((lx) => (
            <React.Fragment key={`beacon-${lx}`}>
              <circle cx={lx} cy={deckY - 10} r="2.2" fill="#FFFFFF" stroke="#000000" strokeWidth="0.5" />
              <circle cx={lx} cy={deckY - 10} r="5" fill="#FFFFFF" fillOpacity="0.2" />
            </React.Fragment>
          ))}
        </g>

        {/* ================================================================
            LAYER 6: WATER HORIZON & CALM AMBIENT REFLECTION RIPPLES
            ================================================================ */}
        <g id="water-horizon">
          <line x1="0" y1="710" x2="1600" y2="710" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.22" />
          <line x1="60" y1="724" x2="1540" y2="724" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.16" strokeDasharray="30 20" />
          <line x1="120" y1="738" x2="1480" y2="738" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.12" strokeDasharray="50 35" />
          <line x1="200" y1="752" x2="1400" y2="752" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.08" strokeDasharray="80 50" />

          {/* Tower reflections in water */}
          <line x1="430" y1="720" x2="530" y2="720" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.25" />
          <line x1="445" y1="730" x2="515" y2="730" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.18" />
          <line x1="460" y1="742" x2="500" y2="742" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.12" />

          <line x1="1070" y1="720" x2="1170" y2="720" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.25" />
          <line x1="1085" y1="730" x2="1155" y2="730" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.18" />
          <line x1="1100" y1="742" x2="1140" y2="742" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.12" />
        </g>

        {/* Bottom vertical veil gradient dissolving into hero black canvas */}
        <rect x="0" y="620" width="1600" height="200" fill="url(#bridge-veil)" />
      </svg>
    </div>
  );
}
