'use client';

import React, { useCallback, useRef, useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Radius of the highlight in px. */
  radius?: number;
  as?: 'div' | 'article' | 'li' | 'section';
};

/**
 * Wraps a card so a soft highlight follows the pointer across it. Coordinates
 * are written straight to CSS custom properties inside a rAF — no state, so the
 * subtree never re-renders while the pointer moves. The gradient itself lives in
 * the `.spotlight` rule in globals.css.
 *
 * On touch/coarse-pointer devices, the spotlight is disabled entirely to save
 * GPU paint work — there is no hover state to drive it.
 */
export default function Spotlight({ children, className = '', radius = 340, as = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<number>(0);
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    setIsCoarse(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (isCoarse) return;
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', `${clientX - rect.left}px`);
      el.style.setProperty('--spot-y', `${clientY - rect.top}px`);
    });
  }, [isCoarse]);

  const onPointerEnter = useCallback((e: React.PointerEvent) => {
    // Coarse pointers have no hover state; the highlight would stick on tap.
    if (e.pointerType === 'touch' || isCoarse) return;
    ref.current?.setAttribute('data-spot', 'on');
  }, [isCoarse]);

  const onPointerLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
    ref.current?.removeAttribute('data-spot');
  }, []);

  const Tag = as as React.ElementType;

  // On touch devices, render the wrapper without any pointer handlers
  if (isCoarse) {
    return (
      <Tag ref={ref} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={`spotlight ${className}`}
      style={{ '--spot-radius': `${radius}px` } as React.CSSProperties}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </Tag>
  );
}
