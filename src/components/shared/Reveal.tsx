'use client';

import { m, useReducedMotion } from 'framer-motion';
import { dur, ease, viewportOnce } from '@/lib/motion';

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
};

export default function Reveal({ children, delay = 0, className, yOffset = 20 }: Props) {
  const reduce = useReducedMotion();

  return (
    <m.div
      className={`transform-gpu will-change-transform ${className ?? ''}`}
      initial={{ opacity: 0, y: reduce ? 0 : yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={reduce ? { duration: 0.01 } : { duration: dur.slow, delay, ease: ease.out }}
    >
      {children}
    </m.div>
  );
}
