import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion tokens. Every animated surface pulls its timing from here so the
 * whole site decelerates on the same curve instead of each section inventing one.
 */

export const ease = {
  /** Default deceleration for entrances and hovers. */
  out: [0.22, 1, 0.36, 1],
  /** Symmetric curve for things that travel and settle (tabs, drawers). */
  inOut: [0.65, 0, 0.35, 1],
  /** Long, cinematic drift — hero imagery only. */
  drift: [0.4, 0, 0.2, 1],
} as const;

export const dur = {
  fast: 0.18,
  base: 0.32,
  slow: 0.55,
  slower: 0.8,
} as const;

export const spring = {
  /** Panels, modals, drawers. */
  soft: { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 },
  /** Small indicators that should feel immediate. */
  snappy: { type: 'spring', stiffness: 380, damping: 30 },
} satisfies Record<string, Transition>;

/** Shared viewport config so reveals trigger at a consistent scroll depth. */
export const viewportOnce = { once: true, margin: '-60px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: dur.slow, ease: ease.out } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: dur.slow, ease: ease.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: dur.base, ease: ease.out } },
};

/**
 * Parent for any grid or list. Children using `staggerItem` cascade instead of
 * all landing on the same frame.
 */
export const staggerContainer = (stagger = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: dur.slow, ease: ease.out } },
};

/** Word-by-word masked rise, used by TextReveal. */
export const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

export const wordItem: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: dur.slower, ease: ease.out } },
};

/**
 * Collapses any variant set to an instant opacity swap. Call sites pass the
 * result of `useReducedMotion()` so motion-sensitive visitors get the same
 * layout without the travel.
 */
export const reduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.01 } },
};
