'use client';

import React, { useRef, useEffect, useCallback, useMemo } from 'react';

/**
 * 3D Point representation: [x, y, z, type]
 * type:
 *   0: Standard structural dot (crisp white/silver with depth)
 *   1: Orange accent dot (PontLook brand orange #FF5C00)
 *   2: Beacon dot (Spire apex & Helipad core)
 *   3: Island base / sea ripple dot
 */
type Dot3D = [number, number, number, number];

interface StructuralCurve {
  points: [number, number, number][];
  isOrange?: boolean;
}

/**
 * Generates the authentic 3D point cloud for Burj Al Arab:
 * - Slender Spire & Central Mast Backbone
 * - Sweeping Dhow Sail Facade with horizontal floor plates
 * - Flanking Exoskeleton Curved Steel Tubular Arches & Diagrid Bracing
 * - Cantilevered Circular Helipad with landing rings
 * - Cantilevered Skyview Restaurant (Al Muntaha) Pod
 * - Elliptical Island Base & Tidal Arabian Sea Ripples
 */
function createBurjAlArabGeometry(): { dots: Dot3D[]; curves: StructuralCurve[] } {
  const dots: Dot3D[] = [];
  const curves: StructuralCurve[] = [];

  // 1. Spire & Mast Backbone (Rear/Center Spine)
  const mastPoints: [number, number, number][] = [];
  for (let y = -0.96; y <= 1.05; y += 0.038) {
    dots.push([0, y, 0, 0]);
    dots.push([0, y, -0.06, 0]);
    mastPoints.push([0, y, 0]);
  }
  // Slender Spire tapering to apex
  const spirePoints: [number, number, number][] = [];
  for (let y = 1.05; y <= 1.30; y += 0.025) {
    const isApex = y >= 1.28;
    dots.push([0, y, 0, isApex ? 2 : 1]);
    spirePoints.push([0, y, 0]);
  }
  curves.push({ points: mastPoints, isOrange: false });
  curves.push({ points: spirePoints, isOrange: true });

  // 2. The Billowing Dhow Sail Facade
  const numFloors = 36;
  for (let f = 0; f < numFloors; f++) {
    const t = f / (numFloors - 1); // 0 (bottom) to 1 (top)
    const y = -0.92 + t * 1.90; // spans from -0.92 to 0.98
    // Non-linear billow curve: maximum outward convex curve at ~50% height
    const billow = Math.sin(Math.pow(t, 0.76) * Math.PI) * 0.62;
    // Sail tapers gracefully toward the top
    const width = 0.44 * (1 - t * 0.74);
    const steps = 11;
    const floorPoints: [number, number, number][] = [];

    for (let s = 0; s < steps; s++) {
      const u = (s / (steps - 1)) * 2 - 1; // -1 to +1
      const x = u * width;
      // Convex curvature across the horizontal rib
      const z = billow * (1 - u * u * 0.32);
      const isEdge = s === 0 || s === steps - 1;
      const isAccent = (f % 5 === 0 && isEdge) || (f === Math.floor(numFloors * 0.6) && s % 2 === 0);

      dots.push([x, y, z, isAccent ? 1 : 0]);
      floorPoints.push([x, y, z]);
    }

    if (f % 4 === 0) {
      curves.push({ points: floorPoints, isOrange: f % 8 === 0 });
    }
  }

  // Vertical central seam of the sail
  const sailSpinePoints: [number, number, number][] = [];
  for (let i = 0; i < 28; i++) {
    const t = i / 27;
    const y = -0.90 + t * 1.86;
    const billow = Math.sin(Math.pow(t, 0.76) * Math.PI) * 0.62;
    sailSpinePoints.push([0, y, billow]);
    dots.push([0, y, billow, i % 6 === 0 ? 1 : 0]);
  }
  curves.push({ points: sailSpinePoints, isOrange: true });

  // 3. Flanking Exoskeleton Steel Arches (Left & Right)
  for (const side of [-1, 1]) {
    const archPoints: [number, number, number][] = [];
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = -0.96 + t * 2.02;
      const archX = side * (0.46 * (1 - t * 0.78) + Math.sin(t * Math.PI) * 0.18);
      const archZ = Math.sin(t * 0.88 * Math.PI) * 0.42 - 0.05;

      dots.push([archX, y, archZ, i % 7 === 0 ? 1 : 0]);
      archPoints.push([archX, y, archZ]);

      // Structural Diagrid Trusses (K-bracing to the spine)
      if (i % 4 === 0 && t > 0.08 && t < 0.88) {
        for (let k = 1; k <= 3; k++) {
          const kt = k / 4;
          dots.push([archX * (1 - kt), y, archZ * (1 - kt), 0]);
        }
      }
    }
    curves.push({ points: archPoints, isOrange: side === 1 });
  }

  // 4. Cantilevered Circular Helipad (Iconic Burj Al Arab feature ~210m elevation)
  const hy = 0.64;
  const hx = 0.28;
  const hz = 0.12;
  const hr = 0.13;
  // Center landing beacon
  dots.push([hx, hy, hz, 2]);

  const helipadRimPoints: [number, number, number][] = [];
  const numHelipadSteps = 16;
  for (let a = 0; a < numHelipadSteps; a++) {
    const rad = (a / numHelipadSteps) * Math.PI * 2;
    const px = hx + Math.cos(rad) * hr;
    const pz = hz + Math.sin(rad) * hr;
    dots.push([px, hy, pz, 1]);
    helipadRimPoints.push([px, hy, pz]);

    // Inner concentric guide ring
    dots.push([hx + Math.cos(rad) * (hr * 0.55), hy, hz + Math.sin(rad) * (hr * 0.55), 0]);
  }
  helipadRimPoints.push(helipadRimPoints[0]); // close loop
  curves.push({ points: helipadRimPoints, isOrange: true });

  // Helipad cantilever support beam back to mast
  const heliStrutPoints: [number, number, number][] = [];
  for (let k = 1; k <= 4; k++) {
    const kt = k / 4;
    const sx = hx * kt;
    const sy = hy - (1 - kt) * 0.11;
    const sz = hz * kt;
    dots.push([sx, sy, sz, 0]);
    heliStrutPoints.push([sx, sy, sz]);
  }
  curves.push({ points: heliStrutPoints, isOrange: false });

  // 5. Cantilevered Skyview Restaurant (Al Muntaha) Pod
  const ry = 0.67;
  const rx = -0.26;
  const rz = -0.06;
  const skyviewPoints: [number, number, number][] = [];
  for (let i = 0; i <= 8; i++) {
    const frac = i / 8;
    const sx = rx * frac;
    const sz = rz * frac;
    dots.push([sx, ry, sz, i === 8 ? 1 : 0]);
    dots.push([sx, ry + 0.025, sz, 0]);
    skyviewPoints.push([sx, ry, sz]);
  }
  curves.push({ points: skyviewPoints, isOrange: false });

  // 6. Artificial Island Base & Arabian Sea Ripples
  for (let r = 1; r <= 4; r++) {
    const baseR = 0.44 + r * 0.16;
    const numPts = 18 + r * 7;
    for (let j = 0; j < numPts; j++) {
      const angle = (j / numPts) * Math.PI * 2;
      const bx = Math.cos(angle) * (baseR * 0.68);
      const bz = Math.sin(angle) * baseR;
      dots.push([bx, -0.98 - r * 0.024, bz, 3]);
    }
  }

  // Curved approach causeway / bridge to mainland
  for (let b = 1; b <= 10; b++) {
    const frac = b / 10;
    const bx = -0.22 - frac * 0.52;
    const by = -0.99;
    const bz = -0.45 - frac * 0.65;
    dots.push([bx, by, bz, frac > 0.7 ? 1 : 3]);
  }

  return { dots, curves };
}

interface BurjAlArabGlobeProps {
  className?: string;
  showBadge?: boolean;
}

export default function BurjAlArabGlobe({
  className = '',
  showBadge = true,
}: BurjAlArabGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // 3D Rotation State: slight elevation pitch + side view centering the iconic sail profile
  const rotationRef = useRef({
    phi: 0.14, // Subtle upward pitch view (~8 degrees)
    theta: -0.65, // 3/4 angle showcasing the sail bow and helipad, just like the photograph
    velTheta: 0.0028, // Continuous graceful auto-rotation
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
  });

  const { dots, curves } = useMemo(() => createBurjAlArabGeometry(), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let scale = 180;
    let dpr = 1;
    let isVisible = true;

    const resize = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width) || 360;
      height = Math.floor(rect.height) || 540;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Adaptive vertical scale so tower comfortably occupies ~78% of viewport
      scale = Math.min(width * 0.62, height * 0.40);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.08 }
    );
    io.observe(container);

    let pulseTime = 0;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      pulseTime += 0.022;

      // Update rotation with gentle inertia
      const rot = rotationRef.current;
      if (!rot.isDragging) {
        rot.theta += rot.velTheta;
        rot.velTheta *= 0.985;
        if (Math.abs(rot.velTheta) < 0.0028) {
          rot.velTheta = 0.0028;
        }
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      // Tower vertical center slightly lower to accommodate soaring spire tip
      const cy = height * 0.52;

      const cosTheta = Math.cos(rot.theta);
      const sinTheta = Math.sin(rot.theta);
      const cosPhi = Math.cos(rot.phi);
      const sinPhi = Math.sin(rot.phi);

      const cameraDistance = 3.6;

      const project = (
        x: number,
        y: number,
        z: number
      ): { x: number; y: number; z: number; front: boolean; persp: number } => {
        // 1. Yaw rotation around vertical Y axis
        const rx1 = x * cosTheta + z * sinTheta;
        const ry1 = y;
        const rz1 = -x * sinTheta + z * cosTheta;

        // 2. Pitch rotation around X axis (elevated perspective)
        const rx2 = rx1;
        const ry2 = ry1 * cosPhi - rz1 * sinPhi;
        const rz2 = ry1 * sinPhi + rz1 * cosPhi;

        // Perspective divide
        const persp = cameraDistance / (cameraDistance - rz2);

        return {
          x: cx + rx2 * scale * persp,
          y: cy - ry2 * scale * persp, // Canvas Y axis points downward
          z: rz2,
          front: rz2 > -0.15,
          persp,
        };
      };

      // 1. Subtle, ethereal ambient glow behind the tower
      const haloGrad = ctx.createRadialGradient(
        cx,
        cy - scale * 0.25,
        scale * 0.1,
        cx,
        cy - scale * 0.15,
        scale * 1.1
      );
      haloGrad.addColorStop(0, 'rgba(255, 92, 0, 0.045)');
      haloGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0.025)');
      haloGrad.addColorStop(0.85, 'rgba(10, 12, 16, 0.01)');
      haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy - scale * 0.15, scale * 1.05, 0, Math.PI * 2);
      ctx.fill();

      // 2. Render connecting structural curves (subtle guide lines)
      for (let c = 0; c < curves.length; c++) {
        const curve = curves[c];
        ctx.beginPath();
        let started = false;

        for (let j = 0; j < curve.points.length; j++) {
          const pt = curve.points[j];
          const p = project(pt[0], pt[1], pt[2]);
          if (p.z > -0.55) {
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          }
        }

        if (started) {
          if (curve.isOrange) {
            ctx.strokeStyle = 'rgba(255, 92, 0, 0.24)';
            ctx.lineWidth = 1.1;
          } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 0.85;
          }
          ctx.stroke();

          // Animated energy packet traveling along key curves
          if (curve.isOrange && curve.points.length > 5) {
            const travelT = (pulseTime * 0.75 + c * 0.23) % 1;
            const sampleIdx = Math.floor(travelT * (curve.points.length - 1));
            const nextIdx = Math.min(sampleIdx + 1, curve.points.length - 1);
            const subT = travelT * (curve.points.length - 1) - sampleIdx;

            const pt1 = curve.points[sampleIdx];
            const pt2 = curve.points[nextIdx];
            const ix = pt1[0] + (pt2[0] - pt1[0]) * subT;
            const iy = pt1[1] + (pt2[1] - pt1[1]) * subT;
            const iz = pt1[2] + (pt2[2] - pt1[2]) * subT;

            const pp = project(ix, iy, iz);
            if (pp.front) {
              ctx.fillStyle = '#FFFFFF';
              ctx.shadowColor = '#FF5C00';
              ctx.shadowBlur = 8;
              ctx.beginPath();
              ctx.arc(pp.x, pp.y, 2.2 * pp.persp, 0, Math.PI * 2);
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }
      }

      // 3. Render 3D Dots with true depth culling and perspective scaling
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        let [dx, dy, dz, dtype] = dot;

        // Animate sea ripples dynamically at the base
        if (dtype === 3) {
          const wavePhase = pulseTime * 1.5 + Math.sqrt(dx * dx + dz * dz) * 8;
          dy += Math.sin(wavePhase) * 0.012;
        }

        const p = project(dx, dy, dz);

        if (!p.front) {
          // Subtle backside dots for authentic 3D spatial depth
          if (p.z > -0.65) {
            const backAlpha = 0.035 + Math.max(0, p.z + 0.65) * 0.06;
            ctx.fillStyle = `rgba(255, 255, 255, ${backAlpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 0.72 * p.persp, 0, Math.PI * 2);
            ctx.fill();
          }
          continue;
        }

        // Depth perspective (0 edge to 1 closest to camera)
        const depth = Math.max(0, Math.min(1, (p.z + 0.15) / 1.15));

        if (dtype === 2) {
          // Beacon dots (Apex spire & Helipad center)
          const size = (2.6 + depth * 1.2) * p.persp;
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#FF5C00';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#FF5C00';
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 0.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (dtype === 1) {
          // Orange accent dots
          const size = (1.9 + depth * 0.9) * p.persp;
          const alpha = 0.75 + depth * 0.25;
          ctx.fillStyle = `rgba(255, 92, 0, ${alpha})`;
          ctx.shadowColor = 'rgba(255, 92, 0, 0.6)';
          ctx.shadowBlur = 5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (dtype === 3) {
          // Arabian sea ripples / Island dots
          const size = (1.1 + depth * 0.6) * p.persp;
          const alpha = 0.20 + depth * 0.45;
          ctx.fillStyle = `rgba(180, 215, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Primary structural dots (Crisp White/Silver with depth)
          const size = (1.15 + depth * 0.95) * p.persp;
          const alpha = 0.26 + depth * 0.74;
          ctx.fillStyle = `rgba(240, 244, 250, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Radar Beacon Pulses at Spire Apex and Helipad
      const spireApex = project(0, 1.28, 0);
      if (spireApex.front) {
        // Radar ring 1
        const r1 = (6 + ((pulseTime * 20) % 24)) * spireApex.persp;
        const a1 = Math.max(0, 1 - r1 / (28 * spireApex.persp)) * 0.7;
        ctx.strokeStyle = `rgba(255, 92, 0, ${a1})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.arc(spireApex.x, spireApex.y, r1, 0, Math.PI * 2);
        ctx.stroke();

        // Radar ring 2
        const r2 = (6 + (((pulseTime * 20) + 12) % 24)) * spireApex.persp;
        const a2 = Math.max(0, 1 - r2 / (28 * spireApex.persp)) * 0.7;
        ctx.strokeStyle = `rgba(255, 140, 40, ${a2})`;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.arc(spireApex.x, spireApex.y, r2, 0, Math.PI * 2);
        ctx.stroke();
      }

      const helipadProj = project(0.28, 0.64, 0.12);
      if (helipadProj.front) {
        const hr = (5 + ((pulseTime * 18) % 18)) * helipadProj.persp;
        const ha = Math.max(0, 1 - hr / (22 * helipadProj.persp)) * 0.65;
        ctx.strokeStyle = `rgba(255, 92, 0, ${ha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(helipadProj.x, helipadProj.y, hr, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 5. Position floating 3D-tracked badge near the Helipad / Mast
      const badge = badgeRef.current;
      if (badge && showBadge) {
        if (helipadProj.front) {
          badge.style.left = `${helipadProj.x}px`;
          badge.style.top = `${helipadProj.y}px`;
          badge.style.display = 'block';
        } else {
          badge.style.display = 'none';
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
    };
  }, [dots, curves, showBadge]);

  // Pointer drag controls (Mouse & Touch)
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const rot = rotationRef.current;
    rot.isDragging = true;
    rot.lastMouseX = e.clientX;
    rot.lastMouseY = e.clientY;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const rot = rotationRef.current;
    if (!rot.isDragging) return;

    const dx = e.clientX - rot.lastMouseX;
    const dy = e.clientY - rot.lastMouseY;
    rot.lastMouseX = e.clientX;
    rot.lastMouseY = e.clientY;

    rot.theta += dx * 0.0075;
    rot.velTheta = dx * 0.0075;

    // Pitch clamped between -0.15 and 0.42 for elegant architectural viewing
    rot.phi = Math.max(-0.15, Math.min(0.42, rot.phi + dy * 0.005));
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if pointer was already released
    }
    rotationRef.current.isDragging = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none touch-none cursor-grab active:cursor-grabbing ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="img"
      aria-label="Interactive 3D particle visualization of Burj Al Arab in Dubai highlighting PontLook GCC enterprise training hub"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Floating 3D-tracked Dubai / PontLook GCC telemetry badge */}
      {showBadge && (
        <div
          ref={badgeRef}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-[135%] z-20 whitespace-nowrap transition-transform duration-75"
          style={{ display: 'none' }}
        >
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-neutral-950/85 px-3 py-1.5 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5C00] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF5C00]" />
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-white">
              Burj Al Arab
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">
              Dubai · GCC
            </span>
          </div>
        </div>
      )}

      {/* Ambient background blur halos */}
      <div className="pointer-events-none absolute left-1/2 top-[24%] h-[55%] w-[68%] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[85px] -z-10" />
      <div className="pointer-events-none absolute bottom-4 left-1/2 h-[20%] w-[90%] -translate-x-1/2 rounded-[50%] bg-[#FF5C00]/[0.025] blur-[70px] -z-10" />
    </div>
  );
}
