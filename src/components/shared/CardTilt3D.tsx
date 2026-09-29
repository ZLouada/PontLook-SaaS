'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';

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
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 320, damping: 24, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const cardScale = useSpring(isHovered && !disabled && !isTouchDevice ? scale : 1, springConfig);

  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || isTouchDevice || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      rawX.set(normX);
      rawY.set(normY);
    },
    [disabled, isTouchDevice, rawX, rawY]
  );

  const handleMouseEnter = useCallback(() => {
    if (disabled || isTouchDevice) return;
    setIsHovered(true);
  }, [disabled, isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  if (disabled || isTouchDevice) {
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
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale: cardScale,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full transform-gpu will-change-transform"
      >
        {children}

        {/* Dynamic Holographic Specular Glare Layer */}
        {glare && (
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
