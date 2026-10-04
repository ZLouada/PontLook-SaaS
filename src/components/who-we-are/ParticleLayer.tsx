'use client';

import React, { useEffect, useRef } from 'react';

interface ParticleLayerProps {
  themeProgress?: number; // 0 = dark, 1 = light
  intensity?: number; // multiplier based on push-in progress (1.0 to 2.0)
  className?: string;
}

interface Particle {
  t: number; // progress along deck line (0 to 1)
  speed: number;
  size: number;
  color: string;
  laneOffset: number; // lateral offset across deck width
}

interface Sparkle {
  x: number;
  y: number;
  phase: number;
  speed: number;
  maxRadius: number;
}

export default function ParticleLayer({
  themeProgress = 0,
  intensity = 1,
  className = '',
}: ParticleLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const animFrameRef = useRef<number | null>(null);

  const isDark = themeProgress < 0.5;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Responsive particle count
    const baseCount = width >= 1280 ? 150 : width >= 768 ? 80 : 40;
    const count = isDark ? Math.round(baseCount * intensity) : Math.round(baseCount * 0.25);

    const colorsDark = ['#FFFFFF', '#7FB8FF', '#3D7BFF', '#D1EFFA'];
    const colorsLight = ['#2451BF', '#3D7BFF', '#60A5FA'];

    // Initialize particles along deck trajectory
    // The deck runs from roughly (-50, height * 0.95) to (width * 1.05, height * 0.32)
    const startX = -width * 0.05;
    const startY = height * 0.94;
    const endX = width * 1.05;
    const endY = height * 0.32;

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        t: Math.random(),
        speed: (0.0015 + Math.random() * 0.0018) * (isDark ? 1 : 0.6),
        size: isDark ? 1 + Math.random() * 1.8 : 1.5 + Math.random() * 1.2,
        color: isDark
          ? colorsDark[Math.floor(Math.random() * colorsDark.length)]
          : colorsLight[Math.floor(Math.random() * colorsLight.length)],
        laneOffset: (Math.random() - 0.5) * (height * 0.04),
      });
    }

    // Sparkles at cable crossings (approx coordinates scaled to canvas)
    const sparkles: Sparkle[] = [];
    const sparkleAnchors = [
      { rx: 0.31, ry: 0.28 },
      { rx: 0.33, ry: 0.38 },
      { rx: 0.28, ry: 0.48 },
      { rx: 0.24, ry: 0.56 },
      { rx: 0.38, ry: 0.42 },
      { rx: 0.44, ry: 0.48 },
      { rx: 0.74, ry: 0.34 },
      { rx: 0.76, ry: 0.42 },
      { rx: 0.72, ry: 0.48 },
      { rx: 0.82, ry: 0.38 },
    ];

    if (isDark) {
      for (const anchor of sparkleAnchors) {
        sparkles.push({
          x: anchor.rx * width,
          y: anchor.ry * height,
          phase: Math.random() * Math.PI * 2,
          speed: 0.025 + Math.random() * 0.02,
          maxRadius: 3 + Math.random() * 3,
        });
      }
    }

    // Resize handler
    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // IntersectionObserver to pause loop when scrolled out of view
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    observer.observe(canvas);

    // Draw 4-point diamond star sparkle
    const drawStar = (cx: number, cy: number, radius: number, alpha: number) => {
      ctx.save();
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.shadowColor = '#7FB8FF';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(cx, cy - radius);
      ctx.quadraticCurveTo(cx, cy, cx + radius, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy + radius);
      ctx.quadraticCurveTo(cx, cy, cx - radius, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy - radius);
      ctx.fill();
      ctx.restore();
    };

    // Render loop
    const render = () => {
      if (isVisibleRef.current) {
        ctx.clearRect(0, 0, width, height);

        // 1. Draw streaming particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.t += p.speed;
          if (p.t > 1) {
            p.t = 0;
          }

          // Interpolate coordinate along deck
          const px = startX + (endX - startX) * p.t;
          const py = startY + (endY - startY) * p.t + p.laneOffset;

          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          if (isDark) {
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 6;
          }
          ctx.fill();
        }

        // 2. Draw sparkling glints (dark scene only)
        if (isDark) {
          for (let i = 0; i < sparkles.length; i++) {
            const sp = sparkles[i];
            sp.phase += sp.speed;
            const alpha = Math.max(0, Math.sin(sp.phase));
            if (alpha > 0.05) {
              drawStar(sp.x, sp.y, sp.maxRadius * alpha, alpha);
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [themeProgress, intensity, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${className}`}
    />
  );
}
