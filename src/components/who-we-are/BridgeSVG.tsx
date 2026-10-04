'use client';

import React from 'react';
import { m } from 'framer-motion';

interface BridgeSVGProps {
  themeProgress?: number; // 0 = dark glowing, 1 = light steel
  className?: string;
}

export default function BridgeSVG({ themeProgress = 0, className = '' }: BridgeSVGProps) {
  // Clamp progress between 0 and 1
  const t = Math.max(0, Math.min(1, themeProgress));

  // Dynamic theme colors interpolated or toggled smoothly
  const isDark = t < 0.5;

  return (
    <div className={`relative w-full h-full select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1600 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover transition-colors duration-500"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Glowing Filter for Dark Scene */}
          <filter id="pylonGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="cableGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="deckLaneGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Linear Gradients for Pylons */}
          <linearGradient id="nearPylonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#FFFFFF' : '#8899A6'} />
            <stop offset="40%" stopColor={isDark ? '#E2E8F0' : '#617985'} />
            <stop offset="100%" stopColor={isDark ? '#94A3B8' : '#3A4650'} />
          </linearGradient>

          <linearGradient id="pylonHighlightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDark ? '#FFFFFF' : '#D1EFFA'} stopOpacity="0.9" />
            <stop offset="100%" stopColor={isDark ? '#38BDF8' : '#3D7BFF'} stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="deckGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDark ? '#1E293B' : '#475569'} />
            <stop offset="50%" stopColor={isDark ? '#0F172A' : '#334155'} />
            <stop offset="100%" stopColor={isDark ? '#020617' : '#1E293B'} />
          </linearGradient>

          <linearGradient id="electricBlueStrip" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#3D7BFF" />
            <stop offset="100%" stopColor="#2451BF" />
          </linearGradient>

          {/* Water gradient */}
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#0A0D14' : '#E2E8F0'} stopOpacity="0.6" />
            <stop offset="100%" stopColor={isDark ? '#05070A' : '#CBD5E1'} stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* ---------------- WATER PLANE & REFLECTIONS ---------------- */}
        <path d="M 0 580 L 1600 420 L 1600 900 L 0 900 Z" fill="url(#waterGrad)" />
        
        {/* Soft water shimmer lines */}
        <line x1="200" y1="780" x2="600" y2="780" stroke={isDark ? 'rgba(56,189,248,0.08)' : 'rgba(36,81,191,0.06)'} strokeWidth="2" />
        <line x1="380" y1="820" x2="780" y2="820" stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(36,81,191,0.05)'} strokeWidth="1.5" />
        <line x1="1000" y1="620" x2="1350" y2="620" stroke={isDark ? 'rgba(56,189,248,0.06)' : 'rgba(36,81,191,0.04)'} strokeWidth="1" />

        {/* ---------------- CONCRETE PIER BASES ---------------- */}
        {/* Far Pier Base */}
        <path
          d="M 1160 490 L 1230 470 L 1250 515 L 1180 535 Z"
          fill={isDark ? '#1E293B' : '#64748B'}
          stroke={isDark ? '#334155' : '#475569'}
          strokeWidth="1.5"
        />

        {/* Near Pier Base */}
        <path
          d="M 430 730 L 560 690 L 590 780 L 460 820 Z"
          fill={isDark ? '#1E293B' : '#64748B'}
          stroke={isDark ? '#334155' : '#475569'}
          strokeWidth="2"
        />

        {/* ---------------- FAR PYLON GROUP (Right-Center) ---------------- */}
        {/* Left leg of Far Pylon */}
        <path
          d="M 1180 230 L 1192 230 L 1205 480 L 1185 483 Z"
          fill="url(#nearPylonGrad)"
          stroke={isDark ? 'rgba(255,255,255,0.6)' : '#617985'}
          strokeWidth="1"
        />
        {/* Right leg of Far Pylon */}
        <path
          d="M 1192 230 L 1204 230 L 1228 475 L 1210 477 Z"
          fill="url(#nearPylonGrad)"
          stroke={isDark ? 'rgba(255,255,255,0.6)' : '#617985'}
          strokeWidth="1"
        />
        {/* Far Pylon X-Brace */}
        <line x1="1187" y1="280" x2="1218" y2="340" stroke={isDark ? '#FFFFFF' : '#8899A6'} strokeWidth="2" />
        <line x1="1218" y1="280" x2="1187" y2="340" stroke={isDark ? '#FFFFFF' : '#8899A6'} strokeWidth="2" />

        {/* ---------------- FAR PYLON CABLES ---------------- */}
        <g stroke={isDark ? 'rgba(255,255,255,0.5)' : '#7FB8FF'} strokeWidth="1" opacity={isDark ? 0.75 : 0.6}>
          {/* Back span cables */}
          <line x1="1192" y1="240" x2="1050" y2="445" />
          <line x1="1192" y1="255" x2="1080" y2="435" />
          <line x1="1192" y1="270" x2="1110" y2="425" />
          <line x1="1192" y1="285" x2="1140" y2="415" />
          <line x1="1192" y1="300" x2="1170" y2="405" />

          {/* Forward span cables */}
          <line x1="1195" y1="240" x2="1420" y2="320" />
          <line x1="1195" y1="255" x2="1380" y2="335" />
          <line x1="1195" y1="270" x2="1340" y2="350" />
          <line x1="1195" y1="285" x2="1300" y2="365" />
          <line x1="1195" y1="300" x2="1260" y2="380" />
        </g>

        {/* ---------------- BRIDGE DECK & MULTI-LANE HIGHWAY ---------------- */}
        {/* Underdeck Structural Truss / Fascia */}
        <path
          d="M -100 860 L 1650 280 L 1650 310 L -100 895 Z"
          fill={isDark ? '#0F172A' : '#334155'}
          stroke={isDark ? '#1E293B' : '#1E293B'}
          strokeWidth="1.5"
        />

        {/* Main Deck Surface */}
        <path
          d="M -100 840 L 1650 270 L 1650 295 L -100 870 Z"
          fill="url(#deckGradient)"
          stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}
          strokeWidth="1"
        />

        {/* Outer Deck Barrier Guardrail */}
        <line
          x1="-100"
          y1="835"
          x2="1650"
          y2="268"
          stroke={isDark ? 'rgba(255,255,255,0.4)' : '#94A3B8'}
          strokeWidth="2.5"
        />

        {/* Glowing Electric Blue Center Line (Signature Brand Metaphor) */}
        <line
          x1="-100"
          y1="850"
          x2="1650"
          y2="280"
          stroke="url(#electricBlueStrip)"
          strokeWidth={isDark ? 3.5 : 4}
          filter={isDark ? 'url(#deckLaneGlow)' : 'none'}
          strokeLinecap="round"
        />

        {/* Dashed White / Cyan Lane Divider Markings */}
        <line
          x1="-100"
          y1="845"
          x2="1650"
          y2="275"
          stroke={isDark ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.7)'}
          strokeWidth="1.5"
          strokeDasharray="16 20"
        />
        <line
          x1="-100"
          y1="858"
          x2="1650"
          y2="287"
          stroke={isDark ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.6)'}
          strokeWidth="1.5"
          strokeDasharray="16 20"
        />

        {/* ---------------- NEAR PYLON GROUP (Foreground / Left-Center) ---------------- */}
        {/* Left Pylon Leg: Thick, slightly kinked / inverted-V */}
        <path
          d="M 470 120 L 495 120 L 525 730 L 485 735 Z"
          fill="url(#nearPylonGrad)"
          stroke={isDark ? 'rgba(255,255,255,0.85)' : '#617985'}
          strokeWidth={isDark ? 1.5 : 1}
          filter={isDark ? 'url(#pylonGlow)' : 'none'}
        />

        {/* Left Pylon Front Face Accent / Highlight */}
        <path
          d="M 480 120 L 495 120 L 515 730 L 500 732 Z"
          fill="url(#pylonHighlightGrad)"
          opacity="0.8"
        />

        {/* Right Pylon Leg: Inverted-V pair */}
        <path
          d="M 495 120 L 520 120 L 575 715 L 535 720 Z"
          fill="url(#nearPylonGrad)"
          stroke={isDark ? 'rgba(255,255,255,0.85)' : '#617985'}
          strokeWidth={isDark ? 1.5 : 1}
          filter={isDark ? 'url(#pylonGlow)' : 'none'}
        />

        {/* Signature Pylon X-Bracing */}
        <g stroke={isDark ? '#FFFFFF' : '#8899A6'} strokeWidth="4" strokeLinecap="round">
          <line x1="485" y1="230" x2="540" y2="340" />
          <line x1="540" y1="230" x2="485" y2="340" />
          {/* Horizontal cross-bar */}
          <line x1="483" y1="285" x2="540" y2="285" strokeWidth="3" />
        </g>

        {/* Vertical Blue LED Stripe down front pylon */}
        <line
          x1="492"
          y1="130"
          x2="510"
          y2="725"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeOpacity={isDark ? 0.9 : 0.7}
          filter={isDark ? 'url(#pylonGlow)' : 'none'}
        />

        {/* Cyan status indicator marks on near pylon */}
        <circle cx="492" cy="380" r="3.5" fill="#38BDF8" filter={isDark ? 'url(#pylonGlow)' : 'none'} />
        <circle cx="498" cy="540" r="3.5" fill="#38BDF8" filter={isDark ? 'url(#pylonGlow)' : 'none'} />

        {/* ---------------- NEAR PYLON CABLES (Fan-Pattern) ---------------- */}
        <g stroke={isDark ? '#FFFFFF' : '#3D7BFF'} strokeWidth={isDark ? 1.25 : 1.1} filter={isDark ? 'url(#cableGlow)' : 'none'}>
          {/* Back span cables (radiating leftward toward foreground) */}
          <line x1="495" y1="140" x2="-80" y2="835" opacity={isDark ? 0.95 : 0.7} />
          <line x1="495" y1="160" x2="-20" y2="815" opacity={isDark ? 0.95 : 0.7} />
          <line x1="495" y1="180" x2="40" y2="795" opacity={isDark ? 0.95 : 0.7} />
          <line x1="495" y1="200" x2="100" y2="775" opacity={isDark ? 0.95 : 0.7} />
          <line x1="495" y1="220" x2="160" y2="755" opacity={isDark ? 0.95 : 0.7} />
          <line x1="495" y1="240" x2="220" y2="735" opacity={isDark ? 0.95 : 0.7} />
          <line x1="495" y1="260" x2="280" y2="715" opacity={isDark ? 0.95 : 0.7} />
          <line x1="495" y1="280" x2="340" y2="695" opacity={isDark ? 0.95 : 0.7} />
          <line x1="495" y1="300" x2="400" y2="675" opacity={isDark ? 0.95 : 0.7} />
          <line x1="495" y1="320" x2="450" y2="660" opacity={isDark ? 0.95 : 0.7} />

          {/* Forward span cables (radiating rightward toward center span) */}
          <line x1="500" y1="140" x2="1040" y2="470" opacity={isDark ? 0.95 : 0.7} />
          <line x1="500" y1="160" x2="980" y2="490" opacity={isDark ? 0.95 : 0.7} />
          <line x1="500" y1="180" x2="920" y2="510" opacity={isDark ? 0.95 : 0.7} />
          <line x1="500" y1="200" x2="860" y2="530" opacity={isDark ? 0.95 : 0.7} />
          <line x1="500" y1="220" x2="800" y2="550" opacity={isDark ? 0.95 : 0.7} />
          <line x1="500" y1="240" x2="740" y2="570" opacity={isDark ? 0.95 : 0.7} />
          <line x1="500" y1="260" x2="680" y2="590" opacity={isDark ? 0.95 : 0.7} />
          <line x1="500" y1="280" x2="620" y2="610" opacity={isDark ? 0.95 : 0.7} />
          <line x1="500" y1="300" x2="570" y2="630" opacity={isDark ? 0.95 : 0.7} />
        </g>

        {/* ---------------- RED AVIATION WARNING BEACONS ---------------- */}
        {/* Pulsing red beacon on Near Pylon Apex */}
        <circle cx="495" cy="116" r="3.5" fill="#FF4D4D" className={isDark ? 'animate-pulse' : 'opacity-40'} />
        <circle cx="495" cy="116" r="8" fill="#FF4D4D" opacity={isDark ? 0.35 : 0.1} />

        {/* Pulsing red beacon on Far Pylon Apex */}
        <circle cx="1195" cy="226" r="2.5" fill="#FF4D4D" className={isDark ? 'animate-pulse' : 'opacity-40'} />
        <circle cx="1195" cy="226" r="6" fill="#FF4D4D" opacity={isDark ? 0.35 : 0.1} />
      </svg>
    </div>
  );
}
