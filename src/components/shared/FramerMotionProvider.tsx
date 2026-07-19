'use client';

import { LazyMotion, domAnimation } from 'framer-motion';

export default function FramerMotionProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
