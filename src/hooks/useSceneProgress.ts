'use client';

import { useScroll, useSpring, useMotionValueEvent, MotionValue } from 'framer-motion';
import { RefObject, useState, useEffect } from 'react';

export interface TimelineRange {
  start: number;
  end: number;
}

export const SCENE_TIMELINE = {
  hero: { start: 0.0, end: 0.12 },
  pushIn: { start: 0.12, end: 0.4 },
  heroFadeOut: { start: 0.12, end: 0.32 },
  themeFlip: { start: 0.4, end: 0.55 },
  blueprintReveal: { start: 0.55, end: 0.7 },
  mission: { start: 0.7, end: 0.82 },
  vision: { start: 0.82, end: 0.92 },
  impact: { start: 0.92, end: 1.0 },
  stages: [
    { id: 'hero', name: 'Hero', range: [0, 0.35] as [number, number] },
    { id: 'blueprint', name: 'Story & Callouts', range: [0.35, 0.68] as [number, number] },
    { id: 'mission-vision', name: 'Mission & Vision', range: [0.68, 0.88] as [number, number] },
    { id: 'impact', name: 'Our Impact', range: [0.88, 1.0] as [number, number] },
  ],
} as const;

export function useSceneProgress(containerRef: RefObject<HTMLElement>) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.6,
  });

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (latest < 0.35) {
      setCurrentStage(0);
    } else if (latest < 0.68) {
      setCurrentStage(1);
    } else if (latest < 0.88) {
      setCurrentStage(2);
    } else {
      setCurrentStage(3);
    }
  });

  const scrollToStage = (stageIndex: number) => {
    if (!containerRef.current) return;
    const stage = SCENE_TIMELINE.stages[stageIndex];
    if (!stage) return;

    const targetProgress = stage.range[0] + 0.05;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalScrollableDistance = rect.height - window.innerHeight;
    const targetY = containerTop + totalScrollableDistance * targetProgress;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  return {
    rawProgress: scrollYProgress,
    smoothProgress,
    currentStage,
    scrollToStage,
    isReducedMotion,
  };
}
