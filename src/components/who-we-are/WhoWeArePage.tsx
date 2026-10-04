'use client';

import React from 'react';
import type { Locale } from '@/i18n/config';
import BridgeScene from './BridgeScene';
import StorySection from './StorySection';
import BridgeSteps from './BridgeSteps';
import MethodSection from './MethodSection';
import PrinciplesGrid from './PrinciplesGrid';
import StatsStrip from './StatsStrip';
import GccSection from './GccSection';
import TeamSection from './TeamSection';
import CtaBand from './CtaBand';

interface WhoWeArePageProps {
  lang?: Locale;
}

export default function WhoWeArePage({ lang = 'en' }: WhoWeArePageProps) {
  const isAr = lang === 'ar';

  return (
    <div className={`w-full overflow-hidden ${isAr ? 'font-arabic' : 'font-sans'}`}>
      {/* 1. Cinematic Scroll-Driven Bridge Scene (Hero -> Push-in -> Theme Flip -> Mission/Vision/Impact) */}
      <BridgeScene lang={lang} />

      {/* 2. Our Story (Origin of "Pontlook") */}
      <StorySection lang={lang} />

      {/* 3. How the Bridge Works (3-step visual) */}
      <BridgeSteps lang={lang} />

      {/* 4. Our Method (Lead Grading Tiers A/B/C) */}
      <MethodSection lang={lang} />

      {/* 5. Principles / Core Values (6 cards) */}
      <PrinciplesGrid lang={lang} />

      {/* 6. By the Numbers (Stat counters) */}
      <StatsStrip lang={lang} />

      {/* 7. Built for the GCC (Regional focus & priorities) */}
      <GccSection lang={lang} />

      {/* 8. Team / Leadership */}
      <TeamSection lang={lang} />

      {/* 9. Closing Dual CTA Band */}
      <CtaBand lang={lang} />
    </div>
  );
}
