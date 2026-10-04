'use client';

import React from 'react';
import BurjAlArabGlobe from './BurjAlArabGlobe';

/**
 * 3D Dot-matrix model of Burj Al Arab in Dubai, styled after the PontLook 3D Earth Globe.
 * Replaces the former static Burj Khalifa silhouette with interactive glowing particle dots,
 * radar beacons, and dynamic perspective.
 */
export default function BurjTower({
  className = '',
  showBadge = true,
}: {
  className?: string;
  showBadge?: boolean;
}) {
  return <BurjAlArabGlobe className={className} showBadge={showBadge} />;
}

export { BurjAlArabGlobe };
