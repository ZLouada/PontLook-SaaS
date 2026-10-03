'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { REAL_LAND_DOTS } from './globeData';

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

export default function PontLookGlobe({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gccScreenPos, setGccScreenPos] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });

  // Rotation angles: side 3D pitch + natural axial tilt + rotating yaw
  const rotationRef = useRef({
    phi: 0.16, // Side 3D pitch (~9 degrees elevated above equator)
    tilt: 0.38, // Earth's natural axial side tilt (~22 degrees)
    theta: -0.85, // Yaw centering Arabia/GCC toward viewer initially
    velTheta: 0.003, // Slow, continuous auto-rotation
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

    // Convert lat/lon to standard 3D unit coordinates: [x, y, z]
    // x = cos(lat) * sin(lon), y = sin(lat), z = cos(lat) * cos(lon)
    const toUnitCoord = (lat: number, lon: number): [number, number, number] => {
      const radLat = (lat * Math.PI) / 180;
      const radLon = (lon * Math.PI) / 180;
      return [
        Math.cos(radLat) * Math.sin(radLon),
        Math.sin(radLat),
        Math.cos(radLat) * Math.cos(radLon),
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
        const lx = x1 + (x2 - x1) * t;
        const ly = y1 + (y2 - y1) * t;
        const lz = z1 + (z2 - z1) * t;
        const mag = Math.sqrt(lx * lx + ly * ly + lz * lz) || 1;

        // Elevated curved arc in 3D
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
      radius = Math.min(width, height) * 0.41;
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
        if (Math.abs(rot.velTheta) < 0.003) {
          rot.velTheta = 0.003;
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
          y: cy - ry3 * scale * persp, // Canvas Y goes down
          z: rz3,
          front: rz3 > -0.1,
          persp,
        };
      };

      // 1. Subtle, clean dark globe sphere background (NO orange halo / hole)
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.25,
        cy - radius * 0.25,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, '#111317');
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

      // 2. Render Real Continent Dots from REAL_LAND_DOTS
      for (let i = 0; i < REAL_LAND_DOTS.length; i++) {
        const dot = REAL_LAND_DOTS[i];
        const p = project(dot[0], dot[1], dot[2], radius);

        if (!p.front) {
          // Translucent backside dots for 3D depth
          if (p.z > -0.65) {
            const backAlpha = 0.04 + Math.max(0, p.z + 0.65) * 0.05;
            ctx.fillStyle = `rgba(255, 255, 255, ${backAlpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 0.75 * p.persp, 0, Math.PI * 2);
            ctx.fill();
          }
          continue;
        }

        // Depth perspective (0 front edge to 1 closest to viewer)
        const depth = Math.max(0, Math.min(1, (p.z + 0.1) / 1.1));
        const isGCC = dot[3] === 1;

        if (isGCC) {
          // Highlighted PontLook GCC dots (Saudi Arabia / UAE)
          const size = (2.2 + depth * 0.9) * p.persp;
          const alpha = 0.75 + depth * 0.25;
          ctx.fillStyle = `rgba(255, 92, 0, ${alpha})`;
          ctx.shadowColor = 'rgba(255, 92, 0, 0.75)';
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // Real continent landmass dots
          const size = (1.15 + depth * 1.05) * p.persp;
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
          ctx.strokeStyle = 'rgba(255, 110, 20, 0.3)';
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
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const rot = rotationRef.current;
    if (!rot.isDragging) return;

    const dx = e.clientX - rot.lastMouseX;
    const dy = e.clientY - rot.lastMouseY;
    rot.lastMouseX = e.clientX;
    rot.lastMouseY = e.clientY;

    rot.theta += dx * 0.005;
    rot.phi = Math.max(-0.55, Math.min(0.55, rot.phi - dy * 0.004));

    // Save instant velocity for smooth inertia
    rot.velTheta = dx * 0.003;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    const rot = rotationRef.current;
    rot.isDragging = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square max-w-[460px] lg:max-w-[520px] mx-auto select-none touch-none cursor-grab active:cursor-grabbing ${className}`}
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
    </div>
  );
}
