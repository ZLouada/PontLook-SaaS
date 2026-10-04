'use client';

import React, { useRef, useEffect, useMemo } from 'react';

/**
 * 3D Point: [x, y, z, baseSize, baseAlpha]
 * Static, non-animated 3D particle dot-matrix visualization of Burj Al Arab in Dubai,
 * faithfully matching the architectural perspective in the reference photograph:
 * - Straight vertical mast/spine on the left rising to the apex needle spire
 * - Rear curved exoskeleton arch with structural diagonal trusses
 * - Dramatic billowing dhow sail facade curving outward to the right
 * - Cantilevered circular helipad platform protruding horizontally to the right
 * - Cantilevered Skyview observation wing to the left
 * - Elliptical island podium and calm Arabian Sea water ripple contours
 * - 100% monochrome crisp white / luminous silver dots (no orange dots, no animation)
 */
type Dot3D = [number, number, number, number, number];

interface Line3D {
  pts: [number, number, number][];
  alpha: number;
}

function createBurjAlArab3DModel(): { dots: Dot3D[]; lines: Line3D[] } {
  const dots: Dot3D[] = [];
  const lines: Line3D[] = [];

  // Mast on the left side: x = -0.22, spine at z = 0
  const mastX = -0.22;
  const mastZ = 0;

  // 1. Vertical Spine & Soaring Needle Spire
  for (let y = -0.95; y <= 1.05; y += 0.028) {
    dots.push([mastX, y, mastZ, 1.45, 0.95]);
    dots.push([mastX - 0.035, y, mastZ - 0.03, 1.05, 0.55]);
  }
  // Needle spire rising to 1.42
  for (let y = 1.05; y <= 1.42; y += 0.022) {
    const isApex = y >= 1.40;
    dots.push([mastX, y, mastZ, isApex ? 2.4 : 1.35, isApex ? 1.0 : 0.9]);
  }
  lines.push({
    pts: [
      [mastX, -0.95, mastZ],
      [mastX, 1.42, mastZ],
    ],
    alpha: 0.22,
  });

  // 2. Rear Exoskeleton Arch (sweeps back to the left behind mast)
  const rearArch: [number, number, number][] = [];
  for (let i = 0; i <= 34; i++) {
    const t = i / 34;
    const y = -0.95 + t * 2.02; // -0.95 to 1.07
    const x = mastX - Math.sin(t * Math.PI) * 0.16;
    const z = -0.08 * Math.sin(t * Math.PI);
    dots.push([x, y, z, 1.25, 0.7]);
    rearArch.push([x, y, z]);
  }
  lines.push({ pts: rearArch, alpha: 0.18 });

  // Rear truss diagonal braces connecting arch to mast
  for (let i = 3; i <= 30; i += 4) {
    const t = i / 34;
    const y = -0.95 + t * 2.02;
    const x = mastX - Math.sin(t * Math.PI) * 0.16;
    lines.push({
      pts: [
        [x, y, 0],
        [mastX, y + 0.07, 0],
      ],
      alpha: 0.09,
    });
    lines.push({
      pts: [
        [x, y, 0],
        [mastX, y - 0.07, 0],
      ],
      alpha: 0.09,
    });
  }

  // 3. Billowing Dhow Sail Facade (Bows out to the right)
  const numFloors = 40;
  const outerSailPts: [number, number, number][] = [];

  for (let f = 0; f < numFloors; f++) {
    const t = f / (numFloors - 1);
    const y = -0.92 + t * 1.96; // -0.92 to 1.04
    // Mathematical curvature of the sail
    const billow = Math.sin(Math.pow(t, 0.72) * Math.PI);
    const sailSpan = 0.14 * (1 - t) + 0.68 * billow;

    const floorPts: [number, number, number][] = [];
    const steps = 13;

    for (let s = 0; s <= steps; s++) {
      const u = s / steps;
      const x = mastX + u * sailSpan;
      // 3D convex curvature across the horizontal ribbon
      const z = Math.sin(u * Math.PI) * 0.24 * billow;
      const isEdge = s === steps;
      const alpha = isEdge ? 0.98 : 0.28 + 0.48 * Math.sin(u * Math.PI);
      const size = isEdge ? 1.55 : 1.15;

      dots.push([x, y, z, size, alpha]);
      floorPts.push([x, y, z]);
      if (isEdge) outerSailPts.push([x, y, z]);
    }

    if (f % 3 === 0) {
      lines.push({ pts: floorPts, alpha: 0.09 });
    }
  }
  lines.push({ pts: outerSailPts, alpha: 0.26 });

  // Diagonal structural trusses on the sail facade (triangular / diamond steel braces)
  for (let f = 2; f < numFloors - 5; f += 6) {
    const t1 = f / (numFloors - 1);
    const t2 = (f + 6) / (numFloors - 1);
    const y1 = -0.92 + t1 * 1.96;
    const y2 = -0.92 + t2 * 1.96;
    const billow1 = Math.sin(Math.pow(t1, 0.72) * Math.PI);
    const billow2 = Math.sin(Math.pow(t2, 0.72) * Math.PI);
    const x1 = mastX + (0.14 * (1 - t1) + 0.68 * billow1);
    const x2 = mastX + (0.14 * (1 - t2) + 0.68 * billow2);

    lines.push({
      pts: [
        [mastX, y1, 0],
        [x2, y2, 0.1],
      ],
      alpha: 0.08,
    });
    lines.push({
      pts: [
        [mastX, y2, 0],
        [x1, y1, 0.1],
      ],
      alpha: 0.08,
    });
  }

  // 4. Cantilevered Circular Helipad (protrudes horizontally to the right at y = 0.74)
  const hy = 0.74;
  const hx = 0.24;
  const hz = 0.10;
  const hr = 0.14;
  const heliPts: [number, number, number][] = [];

  for (let a = 0; a <= 22; a++) {
    const rad = (a / 22) * Math.PI * 2;
    const px = hx + Math.cos(rad) * hr;
    const pz = hz + Math.sin(rad) * hr;
    dots.push([px, hy, pz, 1.45, 0.95]);
    heliPts.push([px, hy, pz]);

    // Inner landing guide ring
    dots.push([
      hx + Math.cos(rad) * (hr * 0.52),
      hy,
      hz + Math.sin(rad) * (hr * 0.52),
      1.1,
      0.55,
    ]);
  }
  lines.push({ pts: heliPts, alpha: 0.28 });

  // Helipad center beacon dot
  dots.push([hx, hy, hz, 2.2, 1.0]);

  // Helipad structural cantilever support struts back to the mast
  lines.push({
    pts: [
      [mastX, hy - 0.09, mastZ],
      [hx, hy, hz],
    ],
    alpha: 0.18,
  });
  lines.push({
    pts: [
      [mastX, hy + 0.04, mastZ],
      [hx, hy, hz],
    ],
    alpha: 0.18,
  });

  // 5. Skyview Observation Wing (Al Muntaha) cantilevered horizontally to the left
  const ry = 0.76;
  const rx = mastX - 0.21;
  const rz = -0.04;
  for (let i = 0; i <= 7; i++) {
    const frac = i / 7;
    const px = mastX - frac * 0.21;
    dots.push([px, ry, rz * frac, 1.35, 0.85]);
    dots.push([px, ry + 0.022, rz * frac, 1.05, 0.5]);
  }
  lines.push({
    pts: [
      [mastX, ry, 0],
      [rx, ry, rz],
    ],
    alpha: 0.22,
  });

  // 6. Island Podium Base & Calm Sea Contour Ripples
  for (let r = 1; r <= 3; r++) {
    const radX = 0.46 + r * 0.15;
    const radZ = 0.56 + r * 0.15;
    const basePts: [number, number, number][] = [];
    for (let a = 0; a <= 26; a++) {
      const rad = (a / 26) * Math.PI * 2;
      const bx = mastX + 0.22 + Math.cos(rad) * radX;
      const bz = Math.sin(rad) * radZ;
      const by = -0.96 - r * 0.022;
      dots.push([bx, by, bz, 1.05, 0.38 / r]);
      basePts.push([bx, by, bz]);
    }
    lines.push({ pts: basePts, alpha: 0.09 / r });
  }

  // Island breakwater rocks & causeway dots
  for (let b = 1; b <= 12; b++) {
    const frac = b / 12;
    const bx = mastX - 0.12 - frac * 0.44;
    const by = -0.98;
    const bz = -0.32 - frac * 0.52;
    dots.push([bx, by, bz, 1.0, 0.45]);
  }

  return { dots, lines };
}

interface BurjAlArabGlobeProps {
  className?: string;
  showBadge?: boolean;
}

export default function BurjAlArabGlobe({
  className = '',
}: BurjAlArabGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { dots, lines } = useMemo(() => createBurjAlArab3DModel(), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fixed 3D perspective angle matching the reference photograph
    const theta = -0.16; // Yaw: showcases the sweeping sail curving to the right
    const phi = 0.08; // Pitch: slight sea-level upward perspective
    const cameraDistance = 3.6;

    const draw = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.floor(rect.width) || 360;
      const height = Math.floor(rect.height) || 540;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.48;
      const cy = height * 0.52;
      const scale = Math.min(width * 0.64, height * 0.42);

      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);
      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);

      const project = (
        x: number,
        y: number,
        z: number
      ): { x: number; y: number; z: number; front: boolean; persp: number } => {
        // 1. Yaw rotation around Y
        const rx1 = x * cosTheta + z * sinTheta;
        const ry1 = y;
        const rz1 = -x * sinTheta + z * cosTheta;

        // 2. Pitch rotation around X
        const rx2 = rx1;
        const ry2 = ry1 * cosPhi - rz1 * sinPhi;
        const rz2 = ry1 * sinPhi + rz1 * cosPhi;

        // 3. Perspective projection
        const persp = cameraDistance / (cameraDistance - rz2);

        return {
          x: cx + rx2 * scale * persp,
          y: cy - ry2 * scale * persp, // Canvas Y points downward
          z: rz2,
          front: rz2 > -0.25,
          persp,
        };
      };

      // 1. Subtle, ethereal ambient background glow
      const haloGrad = ctx.createRadialGradient(
        cx,
        cy - scale * 0.25,
        scale * 0.1,
        cx,
        cy - scale * 0.15,
        scale * 1.05
      );
      haloGrad.addColorStop(0, 'rgba(255, 255, 255, 0.035)');
      haloGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.012)');
      haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy - scale * 0.15, scale * 1.05, 0, Math.PI * 2);
      ctx.fill();

      // 2. Render connecting architectural wireframe lines (soft translucent white)
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        ctx.beginPath();
        let started = false;

        for (let j = 0; j < line.pts.length; j++) {
          const pt = line.pts[j];
          const p = project(pt[0], pt[1], pt[2]);
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }

        if (started) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${line.alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      // 3. Render 3D Dots (pure monochrome white / silver with depth perspective)
      for (let i = 0; i < dots.length; i++) {
        const [dx, dy, dz, baseSize, baseAlpha] = dots[i];
        const p = project(dx, dy, dz);

        // Depth perspective (0 edge to 1 closest)
        const depth = Math.max(0, Math.min(1, (p.z + 0.2) / 1.2));
        const size = (baseSize + depth * 0.85) * p.persp;
        const alpha = Math.min(1, baseAlpha * (0.4 + depth * 0.6));

        // Prominent crown beacons (Spire apex & Helipad center)
        if (baseSize >= 2.0) {
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#FFFFFF';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    };

    draw();

    const ro = new ResizeObserver(() => {
      draw();
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
    };
  }, [dots, lines]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none pointer-events-none ${className}`}
      role="img"
      aria-label="3D particle dot-matrix visualization of Burj Al Arab in Dubai"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Ambient background blur halos */}
      <div className="pointer-events-none absolute left-1/2 top-[24%] h-[55%] w-[68%] -translate-x-1/2 rounded-full bg-white/[0.025] blur-[85px] -z-10" />
      <div className="pointer-events-none absolute bottom-4 left-1/2 h-[18%] w-[90%] -translate-x-1/2 rounded-[50%] bg-white/[0.015] blur-[65px] -z-10" />
    </div>
  );
}
