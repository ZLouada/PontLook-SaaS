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
  // Arabia / GCC - high fidelity
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
  // Japan / UK / Scandinavia islands
  if (lat >= 30 && lat <= 46 && lon >= 129 && lon <= 146) return true; // Japan
  if (lat >= 50 && lat <= 60 && lon >= -11 && lon <= 2) return true; // UK
  return false;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  isGCC?: boolean;
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

  // Rotation angles (degrees/radians)
  const rotationRef = useRef({
    phi: 0.35, // Axial tilt ~20 deg
    theta: 1.1, // Initial yaw centering Arabia/Middle East towards viewer
    targetTheta: 1.1,
    targetPhi: 0.35,
    velTheta: 0.0035, // continuous slow rotation
    velPhi: 0,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    lastDragTime: 0,
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
    let radius = 170;
    let dpr = 1;
    let isVisible = true;

    // Generate globe surface points once
    const dots: Point3D[] = [];
    const step = 3.6; // resolution

    for (let lat = -80; lat <= 80; lat += step) {
      const phi = ((90 - lat) * Math.PI) / 180;
      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);

      // Higher density around equator and Arabia
      const lonStep = Math.max(step / sinPhi, step * 0.8);
      for (let lon = -180; lon <= 180; lon += lonStep) {
        const land = isLand(lat, lon);
        const inGCC = lat >= 16 && lat <= 32 && lon >= 38 && lon <= 58;

        // Keep land dots or occasional faint sphere grid dots
        if (land || inGCC || (Math.abs(lat % 20) < 1 && Math.abs(lon % 30) < 1)) {
          const theta = ((lon + 180) * Math.PI) / 180;
          const x = -sinPhi * Math.cos(theta);
          const y = cosPhi;
          const z = sinPhi * Math.sin(theta);

          dots.push({
            x,
            y,
            z,
            isGCC: inGCC,
          });
        }
      }
    }

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
        // Spherical linear interpolation + vertical arc altitude
        const lx = x1 + (x2 - x1) * t;
        const ly = y1 + (y2 - y1) * t;
        const lz = z1 + (z2 - z1) * t;
        const mag = Math.sqrt(lx * lx + ly * ly + lz * lz) || 1;

        // Parabolic arc height peaking at middle
        const altitude = 1.0 + Math.sin(t * Math.PI) * 0.22;
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

      // Adaptive globe radius
      radius = Math.min(width, height) * 0.42;
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

    // Main animation loop
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

      const cosTheta = Math.cos(rot.theta);
      const sinTheta = Math.sin(rot.theta);
      const cosPhi = Math.cos(rot.phi);
      const sinPhi = Math.sin(rot.phi);

      // 3D projection function
      const project = (
        ux: number,
        uy: number,
        uz: number,
        scale: number = radius
      ): { x: number; y: number; z: number; front: boolean } => {
        // Rotate around Y (theta)
        const rx1 = ux * cosTheta + uz * sinTheta;
        const ry1 = uy;
        const rz1 = -ux * sinTheta + uz * cosTheta;

        // Rotate around X (axial tilt phi)
        const rx2 = rx1;
        const ry2 = ry1 * cosPhi - rz1 * sinPhi;
        const rz2 = ry1 * sinPhi + rz1 * cosPhi;

        return {
          x: cx + rx2 * scale,
          y: cy + ry2 * scale,
          z: rz2,
          front: rz2 > -0.05,
        };
      };

      // 1. Atmosphere halo glow around the globe perimeter
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.75, cx, cy, radius * 1.35);
      glowGrad.addColorStop(0, 'rgba(255, 92, 0, 0.0)');
      glowGrad.addColorStop(0.7, 'rgba(255, 92, 0, 0.08)');
      glowGrad.addColorStop(0.88, 'rgba(255, 92, 0, 0.16)');
      glowGrad.addColorStop(0.98, 'rgba(255, 140, 40, 0.22)');
      glowGrad.addColorStop(1, 'rgba(255, 92, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Globe dark back-sphere with subtle rim highlight
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.35,
        radius * 0.2,
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

      // Outer rim ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Render Globe Surface Dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const p = project(dot.x, dot.y, dot.z, radius);

        if (!p.front) {
          // Translucent back hemisphere dots
          const backAlpha = 0.06 + Math.max(0, p.z + 1) * 0.05;
          ctx.fillStyle = `rgba(255, 255, 255, ${backAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 0.8, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }

        // Front hemisphere dots
        const depth = (p.z + 0.1) / 1.1; // 0 to 1
        const size = dot.isGCC ? 2.2 + depth * 1.0 : 1.0 + depth * 1.2;

        if (dot.isGCC) {
          // GCC Saudi / UAE dots glow PontLook Orange
          const alpha = 0.65 + depth * 0.35;
          ctx.fillStyle = `rgba(255, 92, 0, ${alpha})`;
          ctx.shadowColor = 'rgba(255, 92, 0, 0.6)';
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // General world landmass dots
          const alpha = 0.25 + depth * 0.65;
          ctx.fillStyle = `rgba(235, 240, 248, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Render 3D Arcs between GCC and Global Hubs
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
          ctx.strokeStyle = 'rgba(255, 120, 30, 0.28)';
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Moving photon pulse traveling along arc
          const pulseT = (pulseTime * 0.6 + a * 0.14) % 1;
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
            ctx.arc(pulseP.x, pulseP.y, 2.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // 5. Render Global Hub Nodes
      for (let h = 0; h < hubUnits.length; h++) {
        const hub = hubUnits[h];
        const p = project(hub.unit[0], hub.unit[1], hub.unit[2], radius);
        if (p.front) {
          // Node dot
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Subtle ring
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 6. Highlight Main GCC / PontLook Beacon
      const gccProj = project(gccUnit[0], gccUnit[1], gccUnit[2], radius);
      if (gccProj.front) {
        // Radar pulse ring 1
        const r1 = 8 + ((pulseTime * 22) % 24);
        const a1 = Math.max(0, 1 - r1 / 32) * 0.7;
        ctx.strokeStyle = `rgba(255, 92, 0, ${a1})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(gccProj.x, gccProj.y, r1, 0, Math.PI * 2);
        ctx.stroke();

        // Radar pulse ring 2
        const r2 = 8 + (((pulseTime * 22) + 12) % 24);
        const a2 = Math.max(0, 1 - r2 / 32) * 0.7;
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
        ctx.arc(gccProj.x, gccProj.y, 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FF5C00';
        ctx.beginPath();
        ctx.arc(gccProj.x, gccProj.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Store screen position for DOM badge
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
    rot.lastDragTime = performance.now();
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

    rot.theta += dx * 0.006;
    rot.phi = Math.max(-1.1, Math.min(1.1, rot.phi - dy * 0.006));

    // Save instant velocity for inertia
    rot.velTheta = dx * 0.004;
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
      className={`relative w-full aspect-square max-w-[500px] lg:max-w-[560px] mx-auto select-none touch-none cursor-grab active:cursor-grabbing ${className}`}
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
