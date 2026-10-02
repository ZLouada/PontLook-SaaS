'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';

interface WordRotateProps {
  words: string[];
  duration?: number;
  className?: string;
  gradientClassName?: string;
}

export default function WordRotate({
  words,
  duration = 2800,
  className = '',
  gradientClassName = 'bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 bg-clip-text text-transparent',
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const [isCoarse, setIsCoarse] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setIsCoarse(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    if (words.length <= 1 || reduce) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration, reduce]);

  if (!words || words.length === 0) return null;

  if (reduce || words.length === 1) {
    return (
      <span className={`inline-block font-semibold ${gradientClassName} ${className}`}>
        {words[0]}
      </span>
    );
  }

  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden align-bottom ${className}`}
      style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={words[index]}
          initial={{ opacity: 0, y: '80%', ...(isCoarse ? {} : { filter: 'blur(4px)' }) }}
          animate={{ opacity: 1, y: '0%', ...(isCoarse ? {} : { filter: 'blur(0px)' }) }}
          exit={{ opacity: 0, y: '-80%', ...(isCoarse ? {} : { filter: 'blur(4px)' }) }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`inline-block font-semibold will-change-transform ${gradientClassName}`}
        >
          {words[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
