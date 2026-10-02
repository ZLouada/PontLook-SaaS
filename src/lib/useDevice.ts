'use client';

import { useEffect, useState } from 'react';

/**
 * Pointer-capability hooks.
 *
 * Both start `false` during SSR and the first client paint, then settle after
 * mount. That ordering matters: desktop-only effects (tilt, magnetic, spotlight)
 * must never mount on a phone, so `false` is the safe initial answer for
 * `useFinePointer`, and touch-only affordances must never render on a mouse,
 * so `false` is also the safe initial answer for `useCoarsePointer`.
 */

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** A real hovering pointer — mouse or trackpad. Gate desktop-only effects on this. */
export function useFinePointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}

/** A touch screen. Gate touch-only affordances (press feedback, haptics) on this. */
export function useCoarsePointer(): boolean {
  return useMediaQuery('(pointer: coarse)');
}

/**
 * Fires a very short vibration where the platform supports it. iOS Safari
 * ignores this, so it is a bonus on Android rather than something to rely on.
 */
export function haptic(ms = 8) {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try {
    navigator.vibrate(ms);
  } catch {
    // Some browsers expose the method but reject the call outside a user gesture.
  }
}
