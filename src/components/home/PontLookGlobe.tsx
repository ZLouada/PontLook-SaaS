'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface HubLocation {
  name: string;
  lat: number;
  lon: number;
  isMain?: boolean;
}

const GCC_HUB: HubLocation = {
  name: 'PontLook GCC',
  lat: 24.7136,
  lon: 46.6753, // Riyadh, Saudi Arabia
  isMain: true,
};

const GLOBAL_HUBS: HubLocation[] = [
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
  { name: 'Zurich', lat: 47.3769, lon: 8.5417 },
  { name: 'Cairo', lat: 30.0444, lon: 31.2357 },
  { name: 'Mumbai', lat: 19.076, lon: 72.8777 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'New York', lat: 40.7128, lon: -74.006 },
];

// Simplified fast landmass checker for Earth continents
function isLand(lat: number, lon: number): boolean {
  // Arabia & GCC (High fidelity)
  if (lat >= 12 && lat <= 33 && lon >= 34 && lon <= 61) {
    if (lat < 27 && lon < 40 && lat > 14 && lon < 43) return false; // Red Sea
    return true;
  }
  // North Africa & Levant
  if (lat >= 12 && lat <= 37 && lon >= -17 && lon <= 55) {
    return true;
  }
  // Sub-Saharan Africa
  if (lat >= -35 && lat < 12 && lon >= 8 && lon <= 52) {
    if (lat < -10 && lon < 12) return false;
    return true;
  }
  if (lat >= 4 && lat <= 12 && lon >= -18 && lon <= 8) {
    return true; // West Africa
  }
  // Europe
  if (lat >= 36 && lat <= 71 && lon >= -10 && lon <= 45) {
    if (lat >= 36 && lat <= 42 && lon >= 0 && lon <= 20 && lat < 40) return false; // Med sea
    return true;
  }
  // Asia
  if (lat >= 8 && lat <= 75 && lon >= 45 && lon <= 145) {
    if (lat < 24 && lon > 56 && lon < 70) return false; // Arabian sea
    if (lat < 22 && lon > 80 && lon < 93) return false; // Bay of Bengal
    return true;
  }
  // North America
  if (lat >= 15 && lat <= 72 && lon >= -168 && lon <= -52) {
    if (lat < 25 && lon > -80) return false; // Caribbean
    if (lat > 55 && lon > -75 && lon < -60) return false; // Hudson Bay
    return true;
  }
  // South America
  if (lat >= -56 && lat <= 13 && lon >= -82 && lon <= -34) {
    if (lat < -20 && lon > -40) return false;
    if (lat < -40 && lon > -60) return false;
    return true;
  }
  // Australia & New Zealand
  if (lat >= -44 && lat <= -10 && lon >= 113 && lon <= 154) {
    return true;
  }
  // Japan / UK
  if (lat >= 30 && lat <= 46 && lon >= 129 && lon <= 146) return true; // Japan
  if (lat >= 50 && lat <= 60 && lon >= -11 && lon <= 2) return true; // UK
  return false;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  isGCC?: boolean;
  isOcean?: boolean;
}

export default function PontLookGlobe({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gccScreenPos, setGccScreenPos] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });
  const [isInteracting, setIsInteracting] = useState(false);

  // Rotation angles: subtle pitch (side view) + axial side roll + rotating yaw
  const rotationRef = useRef({
    phi: 0.16, // Side 3D pitch (~9 degrees elevated above equator)
    tilt: 0.38, // Earth's natural axial side tilt (~22 degrees)
    theta: 0.85, // Yaw centering Arabia/GCC toward viewer initially
    velTheta: 0.0035, // Slow, continuous auto-rotation
    velPhi: 0,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let radius = 175;
    let dpr = 1;
    let isVisible = true;

    // Convert lat/lon to 3D unit coordinates
    const toUnitCoord = (lat: number, lon: number): [number, number, number] => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((lon + 180) * Math.PI) / 180;
      return [
        -Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
      ];
    };

    // Generate uniform Fibonacci sphere distribution for seamless 3D surface
    const dots: Point3D[] = [];
    const totalSamples = 3200;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < totalSamples; i++) {
      const y = 1 - (i / (totalSamples - 1)) * 2; // -1 to +1
      const radAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const thetaAngle = goldenAngle * i;
      const x = Math.cos(thetaAngle) * radAtY;
      const z = Math.sin(thetaAngle) * radAtY;

      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = Math.atan2(x, z) * (180 / Math.PI);

      const land = isLand(lat, lon);
      const inGCC = lat >= 14 && lat <= 32 && lon >= 36 && lon <= 60;

      if (land || inGCC) {
        dots.push({ x, y, z, isGCC: inGCC, isOcean: false });
      } else if (i % 6 === 0) {
        // Faint ocean dots for subtle spherical volume definition
        dots.push({ x, y, z, isGCC: false, isOcean: true });
      }
    }

    const gccUnit = toUnitCoord(GCC_HUB.lat, GCC_HUB.lon);
    const hubUnits = GLOBAL_HUBS.map((h) => ({
      ...h,
      unit: toUnitCoord(h.lat, h.lon),
    }));

    // Precalculate Great Circle arc points connecting GCC to each hub
    const arcs = hubUnits.map((hub) => {
      const points: [number, number, number][] = [];
      const numSamples = 40;
      const [x1, y1, z1] = gccUnit;
      const [x2, y2, z2] = hub.unit;

      for (let i = 0; i <= numSamples; i++) {
        const t = i / numSamples;
        const lx = x1 + (x2 - x1) * t;
        const ly = y1 + (y2 - y1) * t;
        const lz = z1 + (z2 - z1) * t;
        const mag = Math.sqrt(lx * lx + ly * ly + lz * lz) || 1;

        // Elevated curved arc in 3D
        const altitude = 1.0 + Math.sin(t * Math.PI) * 0.24;
        points.push([(lx / mag) * altitude, (ly / mag) * altitude, (lz / mag) * altitude]);
      }
      return points;
    });

    const resize = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Adaptive globe radius based on container
      radius = Math.min(width, height) * 0.40;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    io.observe(container);

    let pulseTime = 0;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      pulseTime += 0.02;

      // Update rotation
      const rot = rotationRef.current;
      if (!rot.isDragging) {
        rot.theta += rot.velTheta;
        rot.velTheta *= 0.985;
        if (Math.abs(rot.velTheta) < 0.0035) {
          rot.velTheta = 0.0035;
        }
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Rotation trigonometry
      const cosTheta = Math.cos(rot.theta);
      const sinTheta = Math.sin(rot.theta);
      const cosPhi = Math.cos(rot.phi); // Side pitch
      const sinPhi = Math.sin(rot.phi);
      const cosTilt = Math.cos(rot.tilt); // Side axial tilt
      const sinTilt = Math.sin(rot.tilt);

      // Camera distance for authentic 3D perspective projection
      const cameraDistance = 3.2;

      const project = (
        ux: number,
        uy: number,
        uz: number,
        scale: number = radius
      ): { x: number; y: number; z: number; front: boolean; persp: number } => {
        // 1. Rotate around Y (Yaw / continuous rotation)
        const rx1 = ux * cosTheta + uz * sinTheta;
        const ry1 = uy;
        const rz1 = -ux * sinTheta + uz * cosTheta;

        // 2. Rotate around X (Pitch / side angle view)
        const rx2 = rx1;
        const ry2 = ry1 * cosPhi - rz1 * sinPhi;
        const rz2 = ry1 * sinPhi + rz1 * cosPhi;

        // 3. Rotate around Z (Axial side tilt)
        const rx3 = rx2 * cosTilt - ry2 * sinTilt;
        const ry3 = rx2 * sinTilt + ry2 * cosTilt;
        const rz3 = rz2;

        // Perspective divide
        const persp = cameraDistance / (cameraDistance - rz3);

        return {
          x: cx + rx3 * scale * persp,
          y: cy + ry3 * scale * persp,
          z: rz3,
          front: rz3 > -0.1,
          persp,
        };
      };

      // 1. Subtle, clean dark globe sphere background (NO orange hole / halo!)
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.25,
        cy - radius * 0.25,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, '#101216');
      sphereGrad.addColorStop(0.7, '#07080a');
      sphereGrad.addColorStop(1, '#020304');
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Delicate outer boundary ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Render 3D Surface Dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const p = project(dot.x, dot.y, dot.z, radius);

        if (!p.front) {
          // Subtle translucent backside dots for genuine 3D glass sphere depth
          if (!dot.isOcean && p.z > -0.7) {
            const backAlpha = 0.04 + Math.max(0, p.z + 0.7) * 0.04;
            ctx.fillStyle = `rgba(255, 255, 255, ${backAlpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 0.75 * p.persp, 0, Math.PI * 2);
            ctx.fill();
          }
          continue;
        }

        // Depth perspective (0 front edge to 1 closest to viewer)
        const depth = Math.max(0, Math.min(1, (p.z + 0.1) / 1.1));

        if (dot.isGCC) {
          // Highlighted PontLook GCC dots (Saudi Arabia / UAE)
          const size = (2.2 + depth * 0.8) * p.persp;
          const alpha = 0.75 + depth * 0.25;
          ctx.fillStyle = `rgba(255, 92, 0, ${alpha})`;
          ctx.shadowColor = 'rgba(255, 92, 0, 0.75)';
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (dot.isOcean) {
          // Faint oceanic depth grid dots
          const alpha = 0.08 + depth * 0.12;
          ctx.fillStyle = `rgba(180, 200, 230, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 0.85 * p.persp, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Crisp continent dots
          const size = (1.1 + depth * 1.1) * p.persp;
          const alpha = 0.28 + depth * 0.72;
          ctx.fillStyle = `rgba(240, 244, 250, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Render 3D Connecting Arcs
      for (let a = 0; a < arcs.length; a++) {
        const arc = arcs[a];
        ctx.beginPath();
        let firstDrawn = false;

        for (let j = 0; j < arc.length; j++) {
          const pt = arc[j];
          const p = project(pt[0], pt[1], pt[2], radius);
          if (p.z > -0.2) {
            if (!firstDrawn) {
              ctx.moveTo(p.x, p.y);
              firstDrawn = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          }
        }

        if (firstDrawn) {
          ctx.strokeStyle = 'rgba(255, 110, 20, 0.32)';
          ctx.lineWidth = 1.25;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Animated light packet traveling along the arc
          const pulseT = (pulseTime * 0.65 + a * 0.14) % 1;
          const sampleIdx = Math.floor(pulseT * (arc.length - 1));
          const nextIdx = Math.min(sampleIdx + 1, arc.length - 1);
          const subT = pulseT * (arc.length - 1) - sampleIdx;

          const pt1 = arc[sampleIdx];
          const pt2 = arc[nextIdx];
          const interX = pt1[0] + (pt2[0] - pt1[0]) * subT;
          const interY = pt1[1] + (pt2[1] - pt1[1]) * subT;
          const interZ = pt1[2] + (pt2[2] - pt1[2]) * subT;

          const pulseP = project(interX, interY, interZ, radius);
          if (pulseP.front) {
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = '#FF5C00';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(pulseP.x, pulseP.y, 2.5 * pulseP.persp, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // 4. Render Global Hub Nodes
      for (let h = 0; h < hubUnits.length; h++) {
        const hub = hubUnits[h];
        const p = project(hub.unit[0], hub.unit[1], hub.unit[2], radius);
        if (p.front) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.4 * p.persp, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5 * p.persp, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 5. Highlight Main GCC / PontLook Beacon
      const gccProj = project(gccUnit[0], gccUnit[1], gccUnit[2], radius);
      if (gccProj.front) {
        // Radar pulse ring 1
        const r1 = (8 + ((pulseTime * 22) % 24)) * gccProj.persp;
        const a1 = Math.max(0, 1 - r1 / (32 * gccProj.persp)) * 0.75;
        ctx.strokeStyle = `rgba(255, 92, 0, ${a1})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(gccProj.x, gccProj.y, r1, 0, Math.PI * 2);
        ctx.stroke();

        // Radar pulse ring 2
        const r2 = (8 + (((pulseTime * 22) + 12) % 24)) * gccProj.persp;
        const a2 = Math.max(0, 1 - r2 / (32 * gccProj.persp)) * 0.75;
        ctx.strokeStyle = `rgba(255, 140, 40, ${a2})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(gccProj.x, gccProj.y, r2, 0, Math.PI * 2);
        ctx.stroke();

        // Core bright beacon
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#FF5C00';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(gccProj.x, gccProj.y, 4.2 * gccProj.persp, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FF5C00';
        ctx.beginPath();
        ctx.arc(gccProj.x, gccProj.y, 2.4 * gccProj.persp, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Position floating DOM badge
        setGccScreenPos({
          x: gccProj.x,
          y: gccProj.y,
          visible: true,
        });
      } else {
        setGccScreenPos((prev) => (prev.visible ? { ...prev, visible: false } : prev));
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // Pointer drag controls (Mouse + Touch)
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const rot = rotationRef.current;
    rot.isDragging = true;
    rot.lastMouseX = e.clientX;
    rot.lastMouseY = e.clientY;
    rot.velTheta = 0;
    setIsInteracting(true);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const rot = rotationRef.current;
    if (!rot.isDragging) return;

    const dx = e.clientX - rot.lastMouseX;
    const dy = e.clientY - rot.lastMouseY;
    rot.lastMouseX = e.clientX;
    rot.lastMouseY = e.clientY;

    rot.theta += dx * 0.005;
    rot.phi = Math.max(-0.6, Math.min(0.6, rot.phi - dy * 0.004));

    // Save instant velocity for smooth inertia
    rot.velTheta = dx * 0.0035;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    const rot = rotationRef.current;
    rot.isDragging = false;
    setIsInteracting(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square max-w-[480px] lg:max-w-[540px] mx-auto select-none touch-none cursor-grab active:cursor-grabbing ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      aria-label="Interactive 3D Earth Globe highlighting PontLook GCC Hub"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Floating 3D Tracked Badge for PontLook · GCC */}
      {gccScreenPos.visible && (
        <div
          className="absolute z-20 pointer-events-none transition-transform duration-75 ease-out"
          style={{
            left: `${gccScreenPos.x}px`,
            top: `${gccScreenPos.y}px`,
            transform: 'translate(-50%, -135%)',
          }}
        >
          {/* Connector stem */}
          <div className="absolute left-1/2 -bottom-2 w-[1px] h-2 bg-gradient-to-b from-[#FF5C00] to-transparent -translate-x-1/2" />

          {/* Glass Badge */}
          <div className="px-3 py-1.5 rounded-full bg-black/85 border border-[#FF5C00]/70 backdrop-blur-md shadow-[0_4px_24px_rgba(255,92,0,0.4)] flex items-center gap-2 whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5C00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5C00]" />
            </span>
            <span className="text-xs font-semibold text-white tracking-wide">
              PontLook · GCC
            </span>
          </div>
        </div>
      )}

      {/* Tech Overlay: Bottom indicator badge */}
      <div className="absolute bottom-1 inset-x-2 flex items-center justify-between pointer-events-none text-[10px] font-mono text-neutral-400">
        <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5C00] animate-pulse" />
          <span>GCC HUB · RIYADH &amp; DUBAI</span>
        </div>
        <span className="hidden sm:inline-block text-neutral-400 bg-black/50 px-2 py-0.5 rounded-full border border-white/5">
          {isInteracting ? 'Rotating' : 'Drag to rotate'}
        </span>
      </div>
    </div>
  );
}
