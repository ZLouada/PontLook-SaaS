'use client';

import React, { useRef, useState, useCallback } from 'react';

export interface BorderGlowProps {
  className?: string;
  glowColor?: string;
  color?: string;
  size?: number;
  opacity?: number;
  borderRadius?: string;
}

export default function BorderGlow({
  className = '',
  glowColor = 'rgba(255, 92, 0, 0.45)', // PontLook brand orange
  color,
  size = 280,
  opacity = 0.8,
  borderRadius = 'inherit',
}: BorderGlowProps) {
  const activeColor = color || glowColor;
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        visible: true,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setPos((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${className}`}
      style={{ borderRadius }}
      aria-hidden="true"
    >
      <div
        className="absolute transition-opacity duration-300 pointer-events-none"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${pos.x - size / 2}px`,
          top: `${pos.y - size / 2}px`,
          opacity: pos.visible ? opacity : 0,
          background: `radial-gradient(circle, ${activeColor} 0%, transparent 70%)`,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}
