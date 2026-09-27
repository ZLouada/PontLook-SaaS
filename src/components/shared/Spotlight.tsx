'use client';

import React, { useCallback, useRef } from 'react';

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
 */
export default function Spotlight({ children, className = '', radius = 340, as = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<number>(0);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', `${clientX - rect.left}px`);
      el.style.setProperty('--spot-y', `${clientY - rect.top}px`);
    });
  }, []);

  const onPointerEnter = useCallback((e: React.PointerEvent) => {
    // Coarse pointers have no hover state; the highlight would stick on tap.
    if (e.pointerType === 'touch') return;
    ref.current?.setAttribute('data-spot', 'on');
  }, []);

  const onPointerLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);
    ref.current?.removeAttribute('data-spot');
  }, []);

  const Tag = as as React.ElementType;

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
