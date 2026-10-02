'use client';

import React, { useRef, useState, useCallback } from 'react';
import { m, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useFinePointer, useCoarsePointer } from '@/lib/useDevice';

export interface CardTilt3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
  glareOpacity?: number;
  disabled?: boolean;
  onClick?: () => void;
}

/** Keep a stray touch at the very edge of the card from over-rotating it. */
const clamp = (n: number) => Math.max(-0.5, Math.min(0.5, n));

/**
 * Perspective tilt.
 *
 * A mouse tracks the pointer continuously; a finger can't, so touch gets the
 * other half of the same idea — the card leans towards wherever it was pressed
 * and settles back on release. Without it a phone saw a flat div, which is why
 * these decks read as pictures of cards rather than cards.
 */
export default function CardTilt3D({
  children,
  className = '',
  maxTilt = 8,
  perspective = 1000,
  scale = 1.015,
  glare = true,
  glareOpacity = 0.16,
  disabled = false,
  onClick,
}: CardTilt3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const isDesktopPointer = useFinePointer();
  const isTouch = useCoarsePointer();
  const reduce = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  // Scale is driven through a motion value like the tilt rather than by passing a
  // changing number to `useSpring` — a number source is only read once, so the
  // hover and press scales never actually moved.
  const rawScale = useMotionValue(1);

  const springConfig = { stiffness: 320, damping: 24, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const cardScale = useSpring(rawScale, springConfig);

  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !isDesktopPointer || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      rawX.set(normX);
      rawY.set(normY);
    },
    [disabled, isDesktopPointer, rawX, rawY]
  );

  const handleMouseEnter = useCallback(() => {
    if (disabled || !isDesktopPointer) return;
    setIsHovered(true);
    rawScale.set(scale);
  }, [disabled, isDesktopPointer, rawScale, scale]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rawX.set(0);
    rawY.set(0);
    rawScale.set(1);
  }, [rawX, rawY, rawScale]);

  const handleTouchStart = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === 'mouse' || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // Softer than the mouse range: the finger sits on top of the card, so a
      // full-strength lean just hides the content under the hand.
      rawX.set(clamp(((e.clientX - rect.left) / rect.width - 0.5) * 0.7));
      rawY.set(clamp(((e.clientY - rect.top) / rect.height - 0.5) * 0.7));
      rawScale.set(0.985);
      setIsPressed(true);
    },
    [rawX, rawY, rawScale]
  );

  const handleTouchEnd = useCallback(() => {
    setIsPressed(false);
    rawX.set(0);
    rawY.set(0);
    rawScale.set(1);
  }, [rawX, rawY, rawScale]);

  // Both pointer hooks read false until mount, so the first paint is the plain
  // card on every device — nothing tilts on the wrong one.
  if (disabled || reduce || (!isDesktopPointer && !isTouch)) {
    return (
      <div className={`relative ${className}`} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className={`relative transform-gpu ${className}`}
      onClick={onClick}
    >
      <m.div
        ref={cardRef}
        onMouseMove={isDesktopPointer ? handleMouseMove : undefined}
        onMouseEnter={isDesktopPointer ? handleMouseEnter : undefined}
        onMouseLeave={isDesktopPointer ? handleMouseLeave : undefined}
        // A swipe that starts on the card fires pointercancel once the browser
        // takes the gesture for scrolling, which releases the tilt for us.
        onPointerDown={isDesktopPointer ? undefined : handleTouchStart}
        onPointerUp={isDesktopPointer ? undefined : handleTouchEnd}
        onPointerCancel={isDesktopPointer ? undefined : handleTouchEnd}
        style={{
          rotateX,
          rotateY,
          scale: cardScale,
          transformStyle: 'preserve-3d',
          // On a phone, hinting a permanent layer on every card costs memory for
          // a transform that only runs during a press.
          willChange: isDesktopPointer || isPressed ? 'transform' : 'auto',
        }}
        className="relative w-full h-full transform-gpu"
      >
        {children}

        {/* Dynamic Holographic Specular Glare Layer — a specular highlight needs
            a light source that tracks a pointer, so it stays on the mouse. */}
        {glare && isDesktopPointer && (
          <m.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-20 transition-opacity duration-300"
            style={{
              opacity: isHovered ? glareOpacity : 0,
            }}
          >
            <m.div
              className="absolute -inset-full rounded-full"
              style={{
                left: glareX,
                top: glareY,
                transform: 'translate(-50%, -50%)',
                background:
                  'radial-gradient(circle 320px at center, rgba(255, 255, 255, 0.45), rgba(255, 140, 0, 0.12), transparent 75%)',
                mixBlendMode: 'overlay',
              }}
            />
          </m.div>
        )}
      </m.div>
    </div>
  );
}
