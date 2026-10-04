'use client';

import React, { useRef, useEffect } from 'react';

interface ProviderDnaHelixProps {
  className?: string;
  isAr?: boolean;
}

interface Node3D {
  x: number;
  y: number;
  z: number;
  strand: 1 | 2; // 1 = Orange, 2 = White
  isMain: boolean;
  pulseOffset: number;
  size: number;
}

interface Rung3D {
  node1Index: number;
  node2Index: number;
  midPoints: { x: number; y: number; z: number; pulseOffset: number }[];
}

interface Filament3D {
  i1: number;
  i2: number;
  strand: 1 | 2;
}

interface AmbientParticle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: 'orange' | 'white';
  baseAlpha: number;
  pulseSpeed: number;
}

/**
 * ProviderDnaHelix
 * A high-performance, cinematic 3D DNA Double Helix particle & lattice animation.
 * Features:
 * - Two intertwining spiral strands: Strand 1 in PontLook Orange, Strand 2 in Pure Luminous White
 * - Base pair rungs connecting matching nodes with intermediate glowing beads
 * - Volumetric fiber bundle with satellite micro-particles and crystalline filaments
 * - 3D depth-sorting, perspective projection, depth-of-field luminance, and ambient orange blooms
 * - Responsive particle scaling, IntersectionObserver auto-pause, and prefers-reduced-motion support
 */
export default function ProviderDnaHelix({ className = '', isAr = false }: ProviderDnaHelixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;

    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Geometry parameters
    let helixRadius = 125;
    let helixHeight = 1100;
    const turns = 2.6; // ~2.6 full 360° helical twists across the hero height
    const basePairsCount = 28; // Number of cross-strand rungs

    let nodes: Node3D[] = [];
    let rungs: Rung3D[] = [];
    let filaments: Filament3D[] = [];
    let ambientParticles: AmbientParticle3D[] = [];

    // Continuous 3D rotation state
    const rot = {
      yaw: 0,
      yawSpeed: 0.0038, // Smooth, calm vertical rotation
      tiltZ: isAr ? 0.16 : -0.16, // Natural diagonal lean towards the center
      pitchX: 0.08, // Subtle elevated perspective pitch
    };

    /**
     * Generate the 3D double helix lattice geometry
     */
    const initGeometry = (isMobile: boolean) => {
      nodes = [];
      rungs = [];
      filaments = [];
      ambientParticles = [];

      const mainSteps = isMobile ? 36 : 64;
      const stepY = helixHeight / (mainSteps - 1);
      const angleStep = (turns * 2 * Math.PI) / (mainSteps - 1);

      // Track strand backbone node indices for rung connections
      const strand1MainIndices: number[] = [];
      const strand2MainIndices: number[] = [];

      for (let i = 0; i < mainSteps; i++) {
        const y = -helixHeight / 2 + i * stepY;
        const angle = i * angleStep;

        // --- Strand 1: PontLook Orange ---
        const x1 = helixRadius * Math.cos(angle);
        const z1 = helixRadius * Math.sin(angle);
        const idx1 = nodes.length;
        nodes.push({
          x: x1,
          y,
          z: z1,
          strand: 1,
          isMain: true,
          pulseOffset: i * 0.2,
          size: isMobile ? 2.4 : 3.2,
        });
        strand1MainIndices.push(idx1);

        // Satellites for Strand 1 (volumetric cluster)
        const satCount1 = isMobile ? 1 : 3;
        for (let s = 0; s < satCount1; s++) {
          const spreadR = (Math.sin(i * 3 + s) * 0.5 + 0.5) * 16 - 8;
          const spreadAng = (s / satCount1) * Math.PI * 2;
          const sx = (helixRadius + spreadR) * Math.cos(angle + spreadAng * 0.15);
          const sz = (helixRadius + spreadR) * Math.sin(angle + spreadAng * 0.15);
          const sy = y + (Math.cos(s * 2 + i) * 12);
          const sIdx = nodes.length;
          nodes.push({
            x: sx,
            y: sy,
            z: sz,
            strand: 1,
            isMain: false,
            pulseOffset: i * 0.2 + s * 0.4,
            size: isMobile ? 1.2 : 1.7,
          });
          // Connect satellite to main node
          filaments.push({ i1: idx1, i2: sIdx, strand: 1 });
        }

        // --- Strand 2: Pure Luminous White (180° / PI opposite) ---
        const x2 = helixRadius * Math.cos(angle + Math.PI);
        const z2 = helixRadius * Math.sin(angle + Math.PI);
        const idx2 = nodes.length;
        nodes.push({
          x: x2,
          y,
          z: z2,
          strand: 2,
          isMain: true,
          pulseOffset: i * 0.2 + Math.PI,
          size: isMobile ? 2.4 : 3.2,
        });
        strand2MainIndices.push(idx2);

        // Satellites for Strand 2 (volumetric cluster)
        const satCount2 = isMobile ? 1 : 3;
        for (let s = 0; s < satCount2; s++) {
          const spreadR = (Math.cos(i * 3 + s) * 0.5 + 0.5) * 16 - 8;
          const spreadAng = (s / satCount2) * Math.PI * 2;
          const sx = (helixRadius + spreadR) * Math.cos(angle + Math.PI + spreadAng * 0.15);
          const sz = (helixRadius + spreadR) * Math.sin(angle + Math.PI + spreadAng * 0.15);
          const sy = y + (Math.sin(s * 2 + i) * 12);
          const sIdx = nodes.length;
          nodes.push({
            x: sx,
            y: sy,
            z: sz,
            strand: 2,
            isMain: false,
            pulseOffset: i * 0.2 + Math.PI + s * 0.4,
            size: isMobile ? 1.2 : 1.7,
          });
          // Connect satellite to main node
          filaments.push({ i1: idx2, i2: sIdx, strand: 2 });
        }

        // Intra-strand longitudinal filaments
        if (i > 0) {
          filaments.push({ i1: strand1MainIndices[i - 1], i2: idx1, strand: 1 });
          filaments.push({ i2: strand2MainIndices[i - 1], i1: idx2, strand: 2 });
        }
      }

      // --- Base Pair Rungs ---
      const rungInterval = Math.max(1, Math.floor(mainSteps / basePairsCount));
      for (let i = 0; i < mainSteps; i += rungInterval) {
        const n1Idx = strand1MainIndices[i];
        const n2Idx = strand2MainIndices[i];
        if (n1Idx === undefined || n2Idx === undefined) continue;

        const n1 = nodes[n1Idx];
        const n2 = nodes[n2Idx];

        // 2 intermediate bead nodes along each rung
        const midPoints = [0.33, 0.67].map((t) => ({
          x: n1.x + (n2.x - n1.x) * t,
          y: n1.y + (n2.y - n1.y) * t,
          z: n1.z + (n2.z - n1.z) * t,
          pulseOffset: i * 0.3 + t * Math.PI,
        }));

        rungs.push({
          node1Index: n1Idx,
          node2Index: n2Idx,
          midPoints,
        });
      }

      // --- Ambient Floating Stardust / Constellation Dust ---
      const dustCount = isMobile ? 35 : 75;
      for (let d = 0; d < dustCount; d++) {
        ambientParticles.push({
          x: (Math.random() - 0.5) * helixRadius * 3.5,
          y: (Math.random() - 0.5) * helixHeight * 1.1,
          z: (Math.random() - 0.5) * helixRadius * 3,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.25,
          vz: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.8 + 0.8,
          color: Math.random() > 0.45 ? 'orange' : 'white',
          baseAlpha: Math.random() * 0.4 + 0.15,
          pulseSpeed: Math.random() * 0.03 + 0.01,
        });
      }
    };

    /**
     * Handle responsive resizing and HiDPI canvas backing
     */
    const handleResize = () => {
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

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      // Adapt helix dimensions
      if (isMobile) {
        helixRadius = Math.min(width * 0.28, 85);
        helixHeight = Math.max(height * 1.25, 750);
      } else if (isTablet) {
        helixRadius = Math.min(width * 0.2, 110);
        helixHeight = Math.max(height * 1.35, 950);
      } else {
        helixRadius = Math.min(width * 0.15, 135);
        helixHeight = Math.max(height * 1.45, 1200);
      }

      initGeometry(isMobile);
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    // Pause RAF when scrolled out of view
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    let time = 0;

    /**
     * 3D Rotation and Perspective Projection
     */
    const project = (
      px: number,
      py: number,
      pz: number,
      centerX: number,
      centerY: number,
      cameraDistance: number = 850
    ) => {
      // 1. Yaw (Y-axis continuous rotation)
      const cosY = Math.cos(rot.yaw);
      const sinY = Math.sin(rot.yaw);
      const x1 = px * cosY + pz * sinY;
      const y1 = py;
      const z1 = -px * sinY + pz * cosY;

      // 2. Pitch (X-axis subtle camera elevation)
      const cosP = Math.cos(rot.pitchX);
      const sinP = Math.sin(rot.pitchX);
      const x2 = x1;
      const y2 = y1 * cosP - z1 * sinP;
      const z2 = y1 * sinP + z1 * cosP;

      // 3. Tilt (Z-axis natural diagonal lean)
      const cosT = Math.cos(rot.tiltZ);
      const sinT = Math.sin(rot.tiltZ);
      const x3 = x2 * cosT - y2 * sinT;
      const y3 = x2 * sinT + y2 * cosT;
      const z3 = z2;

      // Perspective divide
      const persp = cameraDistance / (cameraDistance - z3);

      return {
        x: centerX + x3 * persp,
        y: centerY - y3 * persp,
        z: z3,
        persp,
        front: z3 > -20,
      };
    };

    /**
     * Main Render Loop
     */
    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.025;
      if (!prefersReducedMotion) {
        rot.yaw += rot.yawSpeed;
      }

      ctx.clearRect(0, 0, width, height);

      // Center placement:
      // Desktop: positioned at ~72% of width (or 28% in RTL)
      // Mobile: positioned at ~55% of width with gentle backfade
      const isMobile = width < 768;
      const centerX = isMobile
        ? width * 0.52
        : isAr
        ? width * 0.28
        : width * 0.72;
      const centerY = height * 0.48;

      // 1. Ambient Background Warm Orange Bloom
      const bloomRadius = Math.max(width * 0.35, 280);
      const bloomGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        bloomRadius * 0.05,
        centerX,
        centerY,
        bloomRadius
      );
      bloomGrad.addColorStop(0, 'rgba(255, 92, 0, 0.09)');
      bloomGrad.addColorStop(0.5, 'rgba(255, 92, 0, 0.03)');
      bloomGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = bloomGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, bloomRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Project all nodes
      const projectedNodes = nodes.map((node) => {
        const p = project(node.x, node.y, node.z, centerX, centerY);
        // Calculate depth weight (0 = furthest back, 1 = closest front)
        const depthWeight = Math.max(0, Math.min(1, (p.z + helixRadius) / (helixRadius * 2)));
        // Traveling vertical pulse wave
        const wave = Math.sin(node.y * 0.008 - time * 2.2 + node.pulseOffset);
        const pulseBoost = wave > 0.65 ? (wave - 0.65) * 1.8 : 0;

        return {
          ...node,
          px: p.x,
          py: p.y,
          pz: p.z,
          persp: p.persp,
          front: p.front,
          depthWeight,
          pulseBoost,
        };
      });

      // 3. Render Connecting Base-Pair Rungs (Horizontal Cross-Bridges)
      for (let r = 0; r < rungs.length; r++) {
        const rung = rungs[r];
        const p1 = projectedNodes[rung.node1Index];
        const p2 = projectedNodes[rung.node2Index];
        if (!p1 || !p2) continue;

        const avgDepth = (p1.depthWeight + p2.depthWeight) / 2;
        const lineAlpha = (0.12 + avgDepth * 0.45) * (isMobile ? 0.65 : 1);

        // Cross-gradient stroke from Orange (Strand 1) to White (Strand 2)
        const lineGrad = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py);
        lineGrad.addColorStop(0, `rgba(255, 92, 0, ${lineAlpha})`);
        lineGrad.addColorStop(0.5, `rgba(255, 180, 110, ${lineAlpha * 0.85})`);
        lineGrad.addColorStop(1, `rgba(255, 255, 255, ${lineAlpha})`);

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = Math.max(0.6, (0.8 + avgDepth * 0.9) * ((p1.persp + p2.persp) / 2));
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();

        // Intermediate Glowing Rung Beads
        for (let m = 0; m < rung.midPoints.length; m++) {
          const mp = rung.midPoints[m];
          const midProj = project(mp.x, mp.y, mp.z, centerX, centerY);
          const midDepth = Math.max(0, Math.min(1, (midProj.z + helixRadius) / (helixRadius * 2)));
          const beadAlpha = (0.2 + midDepth * 0.65) * (isMobile ? 0.6 : 1);
          const beadSize = (1.1 + midDepth * 1.3) * midProj.persp;

          ctx.fillStyle = `rgba(255, 210, 170, ${beadAlpha})`;
          ctx.beginPath();
          ctx.arc(midProj.x, midProj.y, beadSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Render Intra-Strand Longitudinal Filaments (Lattice)
      for (let f = 0; f < filaments.length; f++) {
        const fil = filaments[f];
        const p1 = projectedNodes[fil.i1];
        const p2 = projectedNodes[fil.i2];
        if (!p1 || !p2) continue;

        const avgDepth = (p1.depthWeight + p2.depthWeight) / 2;
        const alpha = (0.1 + avgDepth * 0.5) * (isMobile ? 0.6 : 1);

        if (fil.strand === 1) {
          ctx.strokeStyle = `rgba(255, 110, 20, ${alpha})`;
        } else {
          ctx.strokeStyle = `rgba(240, 245, 255, ${alpha})`;
        }

        ctx.lineWidth = Math.max(0.5, (0.7 + avgDepth * 0.8) * ((p1.persp + p2.persp) / 2));
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      }

      // 5. Render Nodes sorted by depth (Back-to-Front Painter's Algorithm)
      const sortedNodes = [...projectedNodes].sort((a, b) => a.pz - b.pz);

      for (let i = 0; i < sortedNodes.length; i++) {
        const n = sortedNodes[i];
        const d = n.depthWeight;
        const effectiveSize = (n.size * (0.6 + d * 0.7) + n.pulseBoost * 1.5) * n.persp;
        const alpha = Math.min(1, (0.25 + d * 0.75 + n.pulseBoost * 0.3) * (isMobile ? 0.8 : 1));

        if (n.strand === 1) {
          // --- Orange Strand Node ---
          if (n.front && d > 0.45 && !isMobile) {
            ctx.shadowColor = 'rgba(255, 92, 0, 0.85)';
            ctx.shadowBlur = 10 + n.pulseBoost * 8;
          }

          ctx.fillStyle = `rgba(255, 92, 0, ${alpha})`;
          ctx.beginPath();
          ctx.arc(n.px, n.py, effectiveSize, 0, Math.PI * 2);
          ctx.fill();

          // Hot inner luminous core on front prominent nodes
          if (d > 0.55) {
            ctx.fillStyle = `rgba(255, 235, 200, ${alpha * 0.95})`;
            ctx.beginPath();
            ctx.arc(n.px, n.py, effectiveSize * 0.45, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.shadowBlur = 0;
        } else {
          // --- White Strand Node ---
          if (n.front && d > 0.45 && !isMobile) {
            ctx.shadowColor = 'rgba(255, 255, 255, 0.85)';
            ctx.shadowBlur = 10 + n.pulseBoost * 8;
          }

          ctx.fillStyle = `rgba(245, 248, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(n.px, n.py, effectiveSize, 0, Math.PI * 2);
          ctx.fill();

          // Hot pure white specular core
          if (d > 0.55) {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(n.px, n.py, effectiveSize * 0.5, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.shadowBlur = 0;
        }
      }

      // 6. Ambient Floating Constellation Dust Particles
      for (let a = 0; a < ambientParticles.length; a++) {
        const ap = ambientParticles[a];
        if (!prefersReducedMotion) {
          ap.x += ap.vx;
          ap.y += ap.vy;
          ap.z += ap.vz;

          // Wrap-around boundaries
          if (Math.abs(ap.x) > helixRadius * 3) ap.vx *= -1;
          if (Math.abs(ap.y) > helixHeight * 0.6) ap.vy *= -1;
          if (Math.abs(ap.z) > helixRadius * 2.5) ap.vz *= -1;
        }

        const proj = project(ap.x, ap.y, ap.z, centerX, centerY);
        const depth = Math.max(0, Math.min(1, (proj.z + helixRadius * 1.5) / (helixRadius * 3)));
        const pulse = Math.sin(time * ap.pulseSpeed * 60 + a) * 0.25 + 0.75;
        const alpha = ap.baseAlpha * (0.3 + depth * 0.7) * pulse * (isMobile ? 0.5 : 1);
        const size = ap.size * (0.7 + depth * 0.6) * proj.persp;

        if (ap.color === 'orange') {
          ctx.fillStyle = `rgba(255, 120, 30, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        }

        ctx.beginPath();
        ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    // Initial render call
    render();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
    };
  }, [isAr]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
