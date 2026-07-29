'use client';

import { m } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
};

export default function Reveal({ children, delay = 0, className, yOffset = 20 }: Props) {
  return (
    <m.div
      className={`transform-gpu will-change-transform ${className ?? ''}`}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.65, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
