'use client';

import React, { useRef, useEffect } from 'react';

export interface NeuralGridBackgroundProps {
  className?: string;
  gridSize?: number;
  interactiveRadius?: number;
  baseDotColor?: string;
  activeColor?: string;
}

export default function NeuralGridBackground({
  className = '',
  gridSize = 32,
  interactiveRadius = 150,
  baseDotColor = 'rgba(255, 255, 255, 0.07)',
  activeColor = 'rgba(245, 158, 11, 0.65)', // Amber-500
}: NeuralGridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;

    // Cursor tracking with smoothed interpolated position
    let targetMouseX = -9999;
    let targetMouseY = -9999;
    let mouseX = -9999;
    let mouseY = -9999;
    let isHovering = false;

    const handleResize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for high-DPI performance
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      if (prefersReducedMotion) {
        drawStatic();
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = baseDotColor;
      for (let x = gridSize / 2; x < width; x += gridSize) {
        for (let y = gridSize / 2; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const render = () => {
      if (!isVisible) return;

      // Smooth cursor interpolation
      if (isHovering) {
        mouseX += (targetMouseX - mouseX) * 0.15;
        mouseY += (targetMouseY - mouseY) * 0.15;
      } else {
        mouseX += (-9999 - mouseX) * 0.15;
        mouseY += (-9999 - mouseY) * 0.15;
      }

      ctx.clearRect(0, 0, width, height);

      const radSq = interactiveRadius * interactiveRadius;
      const points: { x: number; y: number; factor: number }[] = [];

      for (let x = gridSize / 2; x < width; x += gridSize) {
        for (let y = gridSize / 2; y < height; y += gridSize) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const distSq = dx * dx + dy * dy;

          if (distSq < radSq) {
            const factor = 1 - Math.sqrt(distSq) / interactiveRadius;
            points.push({ x, y, factor });

            // Glowing illuminated node
            ctx.beginPath();
            ctx.arc(x, y, 1.2 + factor * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = activeColor;
            ctx.shadowBlur = 8 * factor;
            ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            // Standard faint node
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fillStyle = baseDotColor;
            ctx.fill();
          }
        }
      }

      // Draw bridge filaments between energized neighboring points
      if (points.length > 1) {
        const filamentThreshold = gridSize * 1.5;
        ctx.lineWidth = 0.8;

        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const p1 = points[i];
            const p2 = points[j];
            const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);

            if (d < filamentThreshold) {
              const alpha = Math.min(p1.factor, p2.factor) * 0.35;
              ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Intersection Observer to halt canvas loop when scrolled off-viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !prefersReducedMotion) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Mouse listener on parent container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    handleResize();

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      drawStatic();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [gridSize, interactiveRadius, baseDotColor, activeColor]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}
