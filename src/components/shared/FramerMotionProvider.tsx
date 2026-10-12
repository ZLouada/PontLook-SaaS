'use client';

import { LazyMotion } from 'framer-motion';

const loadFeatures = () => import('framer-motion').then((res) => res.domAnimation);

export default function FramerMotionProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
