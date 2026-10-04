'use client';

import React, { useRef, useEffect } from 'react';

export interface HudPinData {
  id: string;
  labelEn: string;
  labelAr: string;
  x: number;
  y: number;
  visible: boolean;
  color: string;
}

interface WhoWeAreBridge3DProps {
  className?: string;
  isAr?: boolean;
  scrollProgress?: number; // 0 (Hero dark) -> 1 (Content light)
  onHudUpdate?: (pins: HudPinData[]) => void;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ProjectedPoint {
  x: number;
  y: number;
  z: number;
  scale: number;
  visible: boolean;
}

interface BridgeParticle {
  t: number; // 0 to 1 along bridge
  lane: -1 | 1;
  speed: number;
  size: number;
  alpha: number;
  pulseOffset: number;
  scatterX?: number;
  scatterY?: number;
  scatterZ?: number;
  phase: number;
}

interface CableFlare {
  towerIdx: number;
  cableIdx: number;
  progress: number;
  speed: number;
  size: number;
}

export default function WhoWeAreBridge3D({
  className = '',
  isAr = false,
  scrollProgress = 0,
  onHudUpdate,
}: WhoWeAreBridge3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse tracking for organic 3D parallax
  const mouseRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  });

  const scrollRef = useRef(scrollProgress);
  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

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
    let time = 0;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      width = Math.max(Math.floor(rect.width), 320);
      height = Math.max(Math.floor(rect.height), 400);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current.targetX = Math.max(-1, Math.min(1, normX));
      mouseRef.current.targetY = Math.max(-1, Math.min(1, normY));
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    // Highway Data Packets
    const particlesCount = 80;
    const particles: BridgeParticle[] = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        t: Math.random(),
        lane: Math.random() > 0.5 ? 1 : -1,
        speed: 0.0016 + Math.random() * 0.0035,
        size: 1.8 + Math.random() * 2.4,
        alpha: 0.45 + Math.random() * 0.55,
        pulseOffset: Math.random() * Math.PI * 2,
        scatterX: (Math.random() - 0.5) * 60,
        scatterY: (Math.random() - 0.5) * 35,
        scatterZ: (Math.random() - 0.5) * 50,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Volumetric Cascade Particles for Phase 2
    const cascadeCount = 70;
    const cascadeParticles: BridgeParticle[] = [];
    for (let i = 0; i < cascadeCount; i++) {
      cascadeParticles.push({
        t: 0.25 + Math.random() * 0.55,
        lane: Math.random() > 0.5 ? 1 : -1,
        speed: 0.0012 + Math.random() * 0.0024,
        size: 1.4 + Math.random() * 2.8,
        alpha: 0.35 + Math.random() * 0.65,
        pulseOffset: Math.random() * Math.PI * 2,
        scatterX: (Math.random() - 0.5) * 240,
        scatterY: -15 - Math.random() * 110,
        scatterZ: (Math.random() - 0.5) * 180,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Cable Glints & Flares (light pulses traveling along stay-cables)
    const cableFlares: CableFlare[] = [];
    for (let i = 0; i < 16; i++) {
      cableFlares.push({
        towerIdx: Math.random() > 0.5 ? 1 : 0,
        cableIdx: Math.floor(Math.random() * 12),
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.014,
        size: 2 + Math.random() * 2.5,
      });
    }

    // 3D Bridge Spatial Coordinates
    const dirSign = isAr ? -1 : 1;

    // Span Start (Near-left foreground) to Span End (Far-right background)
    const spanStart: Point3D = {
      x: -580 * dirSign,
      y: 115,
      z: 380,
    };
    const spanEnd: Point3D = {
      x: 680 * dirSign,
      y: -190,
      z: -480,
    };

    const spanDx = spanEnd.x - spanStart.x;
    const spanDy = spanEnd.y - spanStart.y;
    const spanDz = spanEnd.z - spanStart.z;

    const spanDistXZ = Math.hypot(spanDx, spanDz) || 1;
    const normX = (-spanDz / spanDistXZ) * dirSign;
    const normZ = (spanDx / spanDistXZ) * dirSign;

    const deckWidth = 46;
    const deckThickness = 6;
    const girderDepth = 16;

    const getCamberY = (t: number) => Math.sin(t * Math.PI) * 26;

    const getDeckCenter = (t: number): Point3D => ({
      x: spanStart.x + spanDx * t,
      y: spanStart.y + spanDy * t + getCamberY(t),
      z: spanStart.z + spanDz * t,
    });

    const getDeckFrame = (t: number) => {
      const c = getDeckCenter(t);
      const halfW = deckWidth * 0.5;

      return {
        center: c,
        // Road surface
        leftTop: {
          x: c.x - normX * halfW,
          y: c.y,
          z: c.z - normZ * halfW,
        },
        rightTop: {
          x: c.x + normX * halfW,
          y: c.y,
          z: c.z + normZ * halfW,
        },
        // Deck slab bottom
        leftSlabBot: {
          x: c.x - normX * halfW,
          y: c.y - deckThickness,
          z: c.z - normZ * halfW,
        },
        rightSlabBot: {
          x: c.x + normX * halfW,
          y: c.y - deckThickness,
          z: c.z + normZ * halfW,
        },
        // Lower Girder box
        leftGirderBot: {
          x: c.x - normX * (halfW * 0.92),
          y: c.y - girderDepth,
          z: c.z - normZ * (halfW * 0.92),
        },
        rightGirderBot: {
          x: c.x + normX * (halfW * 0.92),
          y: c.y - girderDepth,
          z: c.z + normZ * (halfW * 0.92),
        },
        // Guardrail top
        leftRailTop: {
          x: c.x - normX * (halfW - 2),
          y: c.y + 4.5,
          z: c.z - normZ * (halfW - 2),
        },
        rightRailTop: {
          x: c.x + normX * (halfW - 2),
          y: c.y + 4.5,
          z: c.z + normZ * (halfW - 2),
        },
        // Central data conduits
        conduit1: {
          x: c.x - normX * 5.5,
          y: c.y + 0.8,
          z: c.z - normZ * 5.5,
        },
        conduit2: {
          x: c.x + normX * 5.5,
          y: c.y + 0.8,
          z: c.z + normZ * 5.5,
        },
        // Lane center dashed stripe
        laneCenter: {
          x: c.x,
          y: c.y + 0.5,
          z: c.z,
        },
      };
    };

    // Twin Towers
    const towers = [
      {
        t: 0.28,
        height: 305,
        pierDepth: 95,
        legSpacingDeck: 1.25,
        legSpacingApex: 0.42,
        legWidth: 12,
        legDepth: 14,
        pierSize: 26,
        pierHeight: 22,
        cablesCount: 12,
        isNear: true,
      },
      {
        t: 0.74,
        height: 275,
        pierDepth: 85,
        legSpacingDeck: 1.25,
        legSpacingApex: 0.42,
        legWidth: 11,
        legDepth: 13,
        pierSize: 24,
        pierHeight: 20,
        cablesCount: 11,
        isNear: false,
      },
    ];

    // HUD milestones along deck
    const hudAnchors = [
      { id: 'hud-1', t: 0.17, labelEn: 'GLOBAL POOL NETWORK', labelAr: 'شبكة الكفاءات العالمية' },
      { id: 'hud-2', t: 0.39, labelEn: 'TALENT MATCHING', labelAr: 'مطابقة الكفاءات والاحتياج' },
      { id: 'hud-3', t: 0.58, labelEn: 'TALENT POOL MATCHING', labelAr: 'مستودع المهارات المعتمد' },
      { id: 'hud-4', t: 0.79, labelEn: 'GLOBAL NETWORK', labelAr: 'المنظومة الدولية الموحدة' },
    ];

    // Main 60fps render loop
    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.016;

      mouseRef.current.currentX +=
        (mouseRef.current.targetX - mouseRef.current.currentX) * 0.05;
      mouseRef.current.currentY +=
        (mouseRef.current.targetY - mouseRef.current.currentY) * 0.05;

      const currentScroll = Math.max(0, Math.min(1, scrollRef.current));

      ctx.clearRect(0, 0, width, height);

      // Dynamic Horizon Line
      const horizonY = height * (0.48 - currentScroll * 0.65);

      // Camera center with cinematic tracking
      const cx = width * (isAr ? 0.52 : 0.48);
      const cy = height * 0.45 + currentScroll * (height * 0.05);

      const baseScale = Math.min(width / 1100, height / 750);
      const responsiveScale = Math.max(0.68, Math.min(1.22, baseScale));

      // Camera orientation
      const basePitch = 0.27 + (prefersReducedMotion ? 0 : mouseRef.current.currentY * 0.05);
      const baseYaw =
        (-0.16 + (prefersReducedMotion ? 0 : mouseRef.current.currentX * 0.07)) * dirSign;

      const camOffsetY = currentScroll * 65;
      const camOffsetZ = currentScroll * 105;
      const camOffsetX = currentScroll * 45 * dirSign;

      const cosPitch = Math.cos(basePitch);
      const sinPitch = Math.sin(basePitch);
      const cosYaw = Math.cos(baseYaw);
      const sinYaw = Math.sin(baseYaw);

      const fov = 850;
      const camDist = 1100;

      const project = (p: Point3D): ProjectedPoint => {
        const x0 = p.x - camOffsetX;
        const y0 = p.y + camOffsetY;
        const z0 = p.z - camOffsetZ;

        const x1 = x0 * cosYaw + z0 * sinYaw;
        const y1 = y0;
        const z1 = -x0 * sinYaw + z0 * cosYaw;

        const x2 = x1;
        const y2 = y1 * cosPitch - z1 * sinPitch;
        const z2 = y1 * sinPitch + z1 * cosPitch;

        const dist = camDist - z2;
        if (dist <= 10) {
          return { x: cx, y: cy, z: z2, scale: 0, visible: false };
        }

        const scale = (fov / dist) * responsiveScale;
        const screenX = cx + x2 * scale;
        const screenY = cy - y2 * scale;

        return {
          x: screenX,
          y: screenY,
          z: z2,
          scale,
          visible: dist > 0,
        };
      };

      // Shading color generator
      const getMaterialColor = (
        screenY: number,
        element:
          | 'towerFront'
          | 'towerSide'
          | 'towerBevel'
          | 'spineGlow'
          | 'deckAsphalt'
          | 'deckGirder'
          | 'deckLine'
          | 'conduit'
          | 'cable'
          | 'cableGlint'
          | 'pierFront'
          | 'pierSide'
          | 'pierTop'
          | 'shadow'
          | 'mist',
        baseAlpha = 1
      ): string => {
        const blendRange = 140;
        const delta = screenY - horizonY;
        const tLight = Math.max(0, Math.min(1, (delta + blendRange * 0.5) / blendRange));

        // Dark hero colors vs Light content colors
        switch (element) {
          case 'towerFront': {
            // Luminous cool white in dark -> sleek architectural slate-800 in light
            const r = Math.round(242 * (1 - tLight) + 45 * tLight);
            const g = Math.round(248 * (1 - tLight) + 55 * tLight);
            const b = Math.round(255 * (1 - tLight) + 72 * tLight);
            return `rgba(${r}, ${g}, ${b}, ${(0.95 * (1 - tLight) + 0.90 * tLight) * baseAlpha})`;
          }
          case 'towerSide': {
            // Shadow facet of tower: deeper tone
            const r = Math.round(180 * (1 - tLight) + 30 * tLight);
            const g = Math.round(195 * (1 - tLight) + 38 * tLight);
            const b = Math.round(215 * (1 - tLight) + 50 * tLight);
            return `rgba(${r}, ${g}, ${b}, ${(0.92 * (1 - tLight) + 0.92 * tLight) * baseAlpha})`;
          }
          case 'towerBevel': {
            // Highlight chamfer on tower edges
            const r = Math.round(255 * (1 - tLight) + 100 * tLight);
            const g = Math.round(255 * (1 - tLight) + 116 * tLight);
            const b = Math.round(255 * (1 - tLight) + 139 * tLight);
            return `rgba(${r}, ${g}, ${b}, ${(0.80 * (1 - tLight) + 0.70 * tLight) * baseAlpha})`;
          }
          case 'spineGlow': {
            // Electric ice-blue conduit down center of leg
            const r = Math.round(56 * (1 - tLight) + 0 * tLight);
            const g = Math.round(189 * (1 - tLight) + 168 * tLight);
            const b = Math.round(248 * (1 - tLight) + 255 * tLight);
            return `rgba(${r}, ${g}, ${b}, ${(0.95 * (1 - tLight) + 0.90 * tLight) * baseAlpha})`;
          }
          case 'deckAsphalt': {
            // Roadway bed
            const r = Math.round(26 * (1 - tLight) + 51 * tLight);
            const g = Math.round(32 * (1 - tLight) + 65 * tLight);
            const b = Math.round(44 * (1 - tLight) + 85 * tLight);
            return `rgba(${r}, ${g}, ${b}, ${(0.95 * (1 - tLight) + 0.95 * tLight) * baseAlpha})`;
          }
          case 'deckGirder': {
            // Side fascia girder
            const r = Math.round(40 * (1 - tLight) + 30 * tLight);
            const g = Math.round(48 * (1 - tLight) + 41 * tLight);
            const b = Math.round(62 * (1 - tLight) + 59 * tLight);
            return `rgba(${r}, ${g}, ${b}, ${(0.90 * (1 - tLight) + 0.90 * tLight) * baseAlpha})`;
          }
          case 'deckLine': {
            // White road markings
            const r = Math.round(255 * (1 - tLight) + 226 * tLight);
            const g = Math.round(255 * (1 - tLight) + 232 * tLight);
            const b = Math.round(255 * (1 - tLight) + 240 * tLight);
            return `rgba(${r}, ${g}, ${b}, ${(0.65 * (1 - tLight) + 0.45 * tLight) * baseAlpha})`;
          }
          case 'conduit': {
            // Central neon data lines
            const r = Math.round(56 * (1 - tLight) + 2 * tLight);
            const g = Math.round(189 * (1 - tLight) + 132 * tLight);
            const b = Math.round(248 * (1 - tLight) + 199 * tLight);
            return `rgba(${r}, ${g}, ${b}, ${(0.90 * (1 - tLight) + 0.80 * tLight) * baseAlpha})`;
          }
          case 'cable': {
            // Luminous glowing filament -> crisp tensile steel wire
            const r = Math.round(245 * (1 - tLight) + 51 * tLight);
            const g = Math.round(250 * (1 - tLight) + 65 * tLight);
            const b = Math.round(255 * (1 - tLight) + 85 * tLight);
            return `rgba(${r}, ${g}, ${b}, ${(0.60 * (1 - tLight) + 0.45 * tLight) * baseAlpha})`;
          }
          case 'cableGlint': {
            return `rgba(255, 255, 255, ${(0.95 * (1 - tLight) + 0.85 * tLight) * baseAlpha})`;
          }
          case 'pierTop': {
            const r = Math.round(150 * (1 - tLight) + 100 * tLight);
            const g = Math.round(165 * (1 - tLight) + 116 * tLight);
            const b = Math.round(185 * (1 - tLight) + 139 * tLight);
            return `rgba(${r}, ${g}, ${b}, ${(0.85 * (1 - tLight) + 0.95 * tLight) * baseAlpha})`;
          }
          case 'pierFront': {
            const r = Math.round(100 * (1 - tLight) + 71 * tLight);
            const g = Math.round(112 * (1 - tLight) + 85 * tLight);
            const b = Math.round(130 * (1 - tLight) + 105 * tLight);
            return `rgba(${r}, ${g}, ${b}, ${(0.90 * (1 - tLight) + 0.95 * tLight) * baseAlpha})`;
          }
          case 'pierSide': {
            const r = Math.round(70 * (1 - tLight) + 51 * tLight);
            const g = Math.round(80 * (1 - tLight) + 65 * tLight);
            const b = Math.round(95 * (1 - tLight) + 85 * tLight);
            return `rgba(${r}, ${g}, ${b}, ${(0.90 * (1 - tLight) + 0.95 * tLight) * baseAlpha})`;
          }
          case 'shadow': {
            return `rgba(15, 23, 42, ${(0.14 * tLight * baseAlpha).toFixed(3)})`;
          }
          case 'mist': {
            return `rgba(14, 21, 37, ${(0.45 * (1 - tLight) * baseAlpha).toFixed(3)})`;
          }
        }
      };

      // Helper to draw a shaded 3D quadrilateral
      const drawQuad3D = (
        p1: Point3D,
        p2: Point3D,
        p3: Point3D,
        p4: Point3D,
        colorType: Parameters<typeof getMaterialColor>[1],
        strokeType?: Parameters<typeof getMaterialColor>[1],
        lineWidth = 1
      ) => {
        const pr1 = project(p1);
        const pr2 = project(p2);
        const pr3 = project(p3);
        const pr4 = project(p4);

        if (!pr1.visible && !pr2.visible && !pr3.visible && !pr4.visible) return;

        ctx.beginPath();
        ctx.moveTo(pr1.x, pr1.y);
        ctx.lineTo(pr2.x, pr2.y);
        ctx.lineTo(pr3.x, pr3.y);
        ctx.lineTo(pr4.x, pr4.y);
        ctx.closePath();

        const midY = (pr1.y + pr2.y + pr3.y + pr4.y) * 0.25;
        ctx.fillStyle = getMaterialColor(midY, colorType);
        ctx.fill();

        if (strokeType) {
          ctx.strokeStyle = getMaterialColor(midY, strokeType);
          ctx.lineWidth = Math.max(0.5, lineWidth * pr1.scale);
          ctx.stroke();
        }
      };

      // Helper to draw a 3D line
      const drawLine3D = (
        p1: Point3D,
        p2: Point3D,
        type: Parameters<typeof getMaterialColor>[1],
        lineWidth = 1,
        baseAlpha = 1
      ) => {
        const pr1 = project(p1);
        const pr2 = project(p2);
        if (!pr1.visible && !pr2.visible) return;

        ctx.beginPath();
        ctx.moveTo(pr1.x, pr1.y);
        ctx.lineTo(pr2.x, pr2.y);

        const col1 = getMaterialColor(pr1.y, type, baseAlpha);
        const col2 = getMaterialColor(pr2.y, type, baseAlpha);

        if (col1 === col2) {
          ctx.strokeStyle = col1;
        } else {
          const grad = ctx.createLinearGradient(pr1.x, pr1.y, pr2.x, pr2.y);
          grad.addColorStop(0, col1);
          grad.addColorStop(1, col2);
          ctx.strokeStyle = grad;
        }

        ctx.lineWidth = Math.max(0.6, lineWidth * pr1.scale);
        ctx.stroke();
      };

      // -------------------------------------------------------------
      // 1. ATMOSPHERIC FOG / MIST (Base of Bridge in Dark Mode)
      // -------------------------------------------------------------
      if (currentScroll < 0.6) {
        const mistAlpha = (1 - currentScroll / 0.6) * 0.45;
        const mistGrad = ctx.createLinearGradient(0, height * 0.65, 0, height);
        mistGrad.addColorStop(0, 'rgba(10, 14, 23, 0)');
        mistGrad.addColorStop(0.5, `rgba(14, 20, 32, ${mistAlpha * 0.6})`);
        mistGrad.addColorStop(1, `rgba(10, 11, 14, ${mistAlpha})`);
        ctx.fillStyle = mistGrad;
        ctx.fillRect(0, height * 0.55, width, height * 0.45);
      }

      // -------------------------------------------------------------
      // 2. DRAW SOLID ROADWAY DECK & GIRDER BOX
      // -------------------------------------------------------------
      const deckSteps = 40;
      for (let i = 0; i < deckSteps; i++) {
        const tA = i / deckSteps;
        const tB = (i + 1) / deckSteps;
        const fA = getDeckFrame(tA);
        const fB = getDeckFrame(tB);

        // A. Top Roadway Asphalt Slab
        drawQuad3D(fA.leftTop, fA.rightTop, fB.rightTop, fB.leftTop, 'deckAsphalt');

        // B. Side Girder Fascia (facing camera)
        drawQuad3D(
          fA.leftTop,
          fA.leftGirderBot,
          fB.leftGirderBot,
          fB.leftTop,
          'deckGirder',
          'towerBevel',
          0.8
        );

        // C. Roadway Markings: Dashed center lane
        if (i % 2 === 0) {
          drawLine3D(fA.laneCenter, fB.laneCenter, 'deckLine', 1.0, 0.75);
        }

        // D. Edge Stripes
        const leftEdgeA: Point3D = {
          x: fA.leftTop.x + normX * 3,
          y: fA.leftTop.y + 0.3,
          z: fA.leftTop.z + normZ * 3,
        };
        const leftEdgeB: Point3D = {
          x: fB.leftTop.x + normX * 3,
          y: fB.leftTop.y + 0.3,
          z: fB.leftTop.z + normZ * 3,
        };
        drawLine3D(leftEdgeA, leftEdgeB, 'deckLine', 0.8, 0.5);

        const rightEdgeA: Point3D = {
          x: fA.rightTop.x - normX * 3,
          y: fA.rightTop.y + 0.3,
          z: fA.rightTop.z - normZ * 3,
        };
        const rightEdgeB: Point3D = {
          x: fB.rightTop.x - normX * 3,
          y: fB.rightTop.y + 0.3,
          z: fB.rightTop.z - normZ * 3,
        };
        drawLine3D(rightEdgeA, rightEdgeB, 'deckLine', 0.8, 0.5);

        // E. Guardrail line with posts
        drawLine3D(fA.leftRailTop, fB.leftRailTop, 'towerBevel', 1.0, 0.8);
        if (i % 3 === 0) {
          drawLine3D(fA.leftTop, fA.leftRailTop, 'towerBevel', 0.8, 0.6);
        }

        // F. Central Glowing Data Highway Conduits
        drawLine3D(fA.conduit1, fB.conduit1, 'conduit', 1.6, 0.9);
        drawLine3D(fA.conduit2, fB.conduit2, 'conduit', 1.6, 0.9);
      }

      // -------------------------------------------------------------
      // 3. DRAW SOLID TOWERS & STAY-CABLE ARRAYS
      // -------------------------------------------------------------
      // Render far tower first, then near tower for painter's depth
      towers.slice().reverse().forEach((tower) => {
        const tCenter = getDeckCenter(tower.t);
        const halfW = deckWidth * 0.5;

        // Pier elevation
        const pierTopY = tCenter.y - tower.pierDepth;
        const pierBotY = pierTopY - tower.pierHeight;

        // Leg spacing vectors
        const leftDeckX = tCenter.x - normX * (halfW * tower.legSpacingDeck);
        const leftDeckZ = tCenter.z - normZ * (halfW * tower.legSpacingDeck);

        const rightDeckX = tCenter.x + normX * (halfW * tower.legSpacingDeck);
        const rightDeckZ = tCenter.z + normZ * (halfW * tower.legSpacingDeck);

        const leftApexX = tCenter.x - normX * (halfW * tower.legSpacingApex);
        const leftApexZ = tCenter.z - normZ * (halfW * tower.legSpacingApex);
        const apexY = tCenter.y + tower.height;

        const rightApexX = tCenter.x + normX * (halfW * tower.legSpacingApex);
        const rightApexZ = tCenter.z + normZ * (halfW * tower.legSpacingApex);

        // Concrete Piers (Solid 3D Cuboids)
        const pierHSize = tower.pierSize * 0.5;
        [
          { x: leftDeckX, z: leftDeckZ },
          { x: rightDeckX, z: rightDeckZ },
        ].forEach((pierCenter) => {
          const pt1: Point3D = { x: pierCenter.x - pierHSize, y: pierTopY, z: pierCenter.z - pierHSize };
          const pt2: Point3D = { x: pierCenter.x + pierHSize, y: pierTopY, z: pierCenter.z - pierHSize };
          const pt3: Point3D = { x: pierCenter.x + pierHSize, y: pierTopY, z: pierCenter.z + pierHSize };
          const pt4: Point3D = { x: pierCenter.x - pierHSize, y: pierTopY, z: pierCenter.z + pierHSize };

          const pb1: Point3D = { x: pt1.x, y: pierBotY, z: pt1.z };
          const pb2: Point3D = { x: pt2.x, y: pierBotY, z: pt2.z };
          const pb3: Point3D = { x: pt3.x, y: pierBotY, z: pt3.z };
          const pb4: Point3D = { x: pt4.x, y: pierBotY, z: pt4.z };

          // Top face
          drawQuad3D(pt1, pt2, pt3, pt4, 'pierTop', 'towerBevel', 0.8);
          // Front face
          drawQuad3D(pt4, pt3, pb3, pb4, 'pierFront', 'towerBevel', 0.8);
          // Side face
          drawQuad3D(pt1, pt4, pb4, pb1, 'pierSide', 'towerBevel', 0.8);

          // Soft ground/water contact shadow in light mode
          const projPier = project({ x: pierCenter.x, y: pierBotY, z: pierCenter.z });
          if (projPier.visible) {
            ctx.beginPath();
            ctx.ellipse(
              projPier.x,
              projPier.y + 6,
              28 * projPier.scale,
              9 * projPier.scale,
              0,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = getMaterialColor(projPier.y, 'shadow', 1);
            ctx.fill();
          }
        });

        // Tower Legs (Solid Sculptural Beveled Prisms)
        const lw = tower.legWidth * 0.5;
        const ld = tower.legDepth * 0.5;

        // Draw Left & Right Legs
        const legSpecs = [
          { baseCenter: { x: leftDeckX, y: pierTopY, z: leftDeckZ }, apexCenter: { x: leftApexX, y: apexY, z: leftApexZ } },
          { baseCenter: { x: rightDeckX, y: pierTopY, z: rightDeckZ }, apexCenter: { x: rightApexX, y: apexY, z: rightApexZ } },
        ];

        legSpecs.forEach((leg) => {
          // Front Face (facing camera)
          const f_b1: Point3D = { x: leg.baseCenter.x - normX * lw, y: leg.baseCenter.y, z: leg.baseCenter.z - normZ * lw };
          const f_b2: Point3D = { x: leg.baseCenter.x + normX * lw, y: leg.baseCenter.y, z: leg.baseCenter.z + normZ * lw };
          const f_t1: Point3D = { x: leg.apexCenter.x - normX * (lw * 0.7), y: leg.apexCenter.y, z: leg.apexCenter.z - normZ * (lw * 0.7) };
          const f_t2: Point3D = { x: leg.apexCenter.x + normX * (lw * 0.7), y: leg.apexCenter.y, z: leg.apexCenter.z + normZ * (lw * 0.7) };

          // Side Face (facing outward)
          const s_b1: Point3D = { x: f_b1.x - ld * dirSign, y: f_b1.y, z: f_b1.z + ld };
          const s_t1: Point3D = { x: f_t1.x - (ld * 0.7) * dirSign, y: f_t1.y, z: f_t1.z + ld * 0.7 };

          drawQuad3D(s_b1, f_b1, f_t1, s_t1, 'towerSide', 'towerBevel', 0.8);
          drawQuad3D(f_b1, f_b2, f_t2, f_t1, 'towerFront', 'towerBevel', 1.0);

          // Glowing Electric Ice-Blue Spine Conduit running up the center of the leg
          const spineBase: Point3D = {
            x: (f_b1.x + f_b2.x) * 0.5,
            y: f_b1.y,
            z: (f_b1.z + f_b2.z) * 0.5,
          };
          const spineApex: Point3D = {
            x: (f_t1.x + f_t2.x) * 0.5,
            y: f_t1.y,
            z: (f_t1.z + f_t2.z) * 0.5,
          };
          drawLine3D(spineBase, spineApex, 'spineGlow', 2.2, 0.95);
        });

        // Top Horizontal Crossbar connecting Apexes
        const crossbarLeft: Point3D = { x: leftApexX, y: apexY - 14, z: leftApexZ };
        const crossbarRight: Point3D = { x: rightApexX, y: apexY - 14, z: rightApexZ };
        drawLine3D(crossbarLeft, crossbarRight, 'towerFront', 4.5, 0.95);
        drawLine3D(crossbarLeft, crossbarRight, 'towerBevel', 1.5, 0.8);

        // Futuristic Diamond / X-Lattice Brace in tower center
        const diamondCenterY = tCenter.y + tower.height * 0.44;
        const diamondCenter: Point3D = {
          x: (leftDeckX + rightDeckX) * 0.5,
          y: diamondCenterY,
          z: (leftDeckZ + rightDeckZ) * 0.5,
        };

        const deckLeftAnchor: Point3D = { x: leftDeckX, y: tCenter.y + 6, z: leftDeckZ };
        const deckRightAnchor: Point3D = { x: rightDeckX, y: tCenter.y + 6, z: rightDeckZ };
        const upperLeftAnchor: Point3D = {
          x: leftDeckX + (leftApexX - leftDeckX) * 0.72,
          y: tCenter.y + tower.height * 0.72,
          z: leftDeckZ + (leftApexZ - leftDeckZ) * 0.72,
        };
        const upperRightAnchor: Point3D = {
          x: rightDeckX + (rightApexX - rightDeckX) * 0.72,
          y: tCenter.y + tower.height * 0.72,
          z: rightDeckZ + (rightApexZ - rightDeckZ) * 0.72,
        };

        // Diamond structural trusses
        drawLine3D(deckLeftAnchor, diamondCenter, 'towerFront', 2.4, 0.85);
        drawLine3D(deckRightAnchor, diamondCenter, 'towerFront', 2.4, 0.85);
        drawLine3D(diamondCenter, upperLeftAnchor, 'towerFront', 2.4, 0.85);
        drawLine3D(diamondCenter, upperRightAnchor, 'towerFront', 2.4, 0.85);
        drawLine3D(upperLeftAnchor, upperRightAnchor, 'towerFront', 2.2, 0.8);

        // Center Diamond Jewel Glow Node
        const prDiamond = project(diamondCenter);
        if (prDiamond.visible) {
          ctx.beginPath();
          ctx.arc(prDiamond.x, prDiamond.y, 4 * prDiamond.scale, 0, Math.PI * 2);
          ctx.fillStyle = getMaterialColor(prDiamond.y, 'spineGlow', 1);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(prDiamond.x, prDiamond.y, 8 * prDiamond.scale, 0, Math.PI * 2);
          ctx.fillStyle = getMaterialColor(prDiamond.y, 'spineGlow', 0.25);
          ctx.fill();
        }

        // STAY-CABLE ARRAYS (Harp/Fan Suspension Arrays)
        const cableCount = tower.cablesCount;
        for (let c = 0; c < cableCount; c++) {
          const frac = (c + 1) / (cableCount + 1);
          const towerY = tCenter.y + tower.height * (0.54 + frac * 0.42);

          const anchorL: Point3D = {
            x: leftDeckX + (leftApexX - leftDeckX) * (0.54 + frac * 0.42),
            y: towerY,
            z: leftDeckZ + (leftApexZ - leftDeckZ) * (0.54 + frac * 0.42),
          };
          const anchorR: Point3D = {
            x: rightDeckX + (rightApexX - rightDeckX) * (0.54 + frac * 0.42),
            y: towerY,
            z: rightDeckZ + (rightApexZ - rightDeckZ) * (0.54 + frac * 0.42),
          };

          const deckSpread = 0.022 + frac * 0.025;

          // Forward stay
          const tFwd = Math.min(1.0, tower.t + deckSpread);
          const fFwd = getDeckFrame(tFwd);
          drawLine3D(anchorL, fFwd.leftTop, 'cable', 1.0, 0.7);
          drawLine3D(anchorR, fFwd.rightTop, 'cable', 1.0, 0.7);

          // Backward stay
          const tBwd = Math.max(0.0, tower.t - deckSpread);
          const fBwd = getDeckFrame(tBwd);
          drawLine3D(anchorL, fBwd.leftTop, 'cable', 1.0, 0.7);
          drawLine3D(anchorR, fBwd.rightTop, 'cable', 1.0, 0.7);

          // Cable Anchor Nodes on Tower
          const prAnchorL = project(anchorL);
          if (prAnchorL.visible) {
            ctx.beginPath();
            ctx.arc(prAnchorL.x, prAnchorL.y, 1.8 * prAnchorL.scale, 0, Math.PI * 2);
            ctx.fillStyle = getMaterialColor(prAnchorL.y, 'cableGlint', 0.8);
            ctx.fill();
          }
        }
      });

      // -------------------------------------------------------------
      // 4. CABLE GLINTS & TRAVELLING LIGHT PULSES
      // -------------------------------------------------------------
      cableFlares.forEach((flare) => {
        flare.progress += flare.speed;
        if (flare.progress > 1) flare.progress = 0;

        const tower = towers[flare.towerIdx];
        if (!tower) return;
        const tCenter = getDeckCenter(tower.t);
        const frac = (flare.cableIdx + 1) / (tower.cablesCount + 1);
        const towerY = tCenter.y + tower.height * (0.54 + frac * 0.42);

        const leftDeckX = tCenter.x - normX * (deckWidth * 0.5 * tower.legSpacingDeck);
        const leftDeckZ = tCenter.z - normZ * (deckWidth * 0.5 * tower.legSpacingDeck);
        const leftApexX = tCenter.x - normX * (deckWidth * 0.5 * tower.legSpacingApex);
        const leftApexZ = tCenter.z - normZ * (deckWidth * 0.5 * tower.legSpacingApex);

        const anchorL: Point3D = {
          x: leftDeckX + (leftApexX - leftDeckX) * (0.54 + frac * 0.42),
          y: towerY,
          z: leftDeckZ + (leftApexZ - leftDeckZ) * (0.54 + frac * 0.42),
        };

        const tFwd = Math.min(1.0, tower.t + 0.022 + frac * 0.025);
        const fFwd = getDeckFrame(tFwd);

        // Interpolate along cable
        const flarePt: Point3D = {
          x: anchorL.x + (fFwd.leftTop.x - anchorL.x) * flare.progress,
          y: anchorL.y + (fFwd.leftTop.y - anchorL.y) * flare.progress,
          z: anchorL.z + (fFwd.leftTop.z - anchorL.z) * flare.progress,
        };

        const prFlare = project(flarePt);
        if (prFlare.visible) {
          ctx.beginPath();
          ctx.arc(prFlare.x, prFlare.y, flare.size * prFlare.scale, 0, Math.PI * 2);
          ctx.fillStyle = getMaterialColor(prFlare.y, 'spineGlow', 0.9);
          ctx.fill();
        }
      });

      // -------------------------------------------------------------
      // 5. DATA HIGHWAY FLOWING ENERGY PACKETS
      // -------------------------------------------------------------
      particles.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;

        const f = getDeckFrame(p.t);
        const pt = p.lane === 1 ? f.conduit1 : f.conduit2;

        const proj = project(pt);
        if (proj.visible) {
          const pulse = Math.sin(time * 3 + p.pulseOffset) * 0.3 + 0.7;
          const pSize = Math.max(1.2, p.size * proj.scale * pulse);

          // Glow Halo
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, pSize * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = getMaterialColor(proj.y, 'spineGlow', p.alpha * 0.3);
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, pSize, 0, Math.PI * 2);
          ctx.fillStyle = getMaterialColor(proj.y, 'cableGlint', p.alpha);
          ctx.fill();
        }
      });

      // 6. PHASE 2: VOLUMETRIC CASCADE SWARM
      if (currentScroll > 0.05) {
        const cascadeStrength = Math.min(1, currentScroll * 1.6);
        cascadeParticles.forEach((cp) => {
          const driftPhase = time * 1.6 + cp.phase;
          const driftX = Math.sin(driftPhase) * 22;
          const driftY = Math.cos(driftPhase * 0.8) * 16;

          const baseCenter = getDeckCenter(cp.t);
          const scatterPt: Point3D = {
            x: baseCenter.x + (cp.scatterX || 0) * cascadeStrength + driftX,
            y: baseCenter.y + (cp.scatterY || 0) * cascadeStrength + driftY,
            z: baseCenter.z + (cp.scatterZ || 0) * cascadeStrength,
          };

          const proj = project(scatterPt);
          if (proj.visible) {
            const alpha = cp.alpha * cascadeStrength;
            const size = Math.max(1, cp.size * proj.scale);

            ctx.beginPath();
            ctx.arc(proj.x, proj.y, size * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = getMaterialColor(proj.y, 'spineGlow', alpha * 0.35);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
            ctx.fillStyle = getMaterialColor(proj.y, 'cableGlint', alpha);
            ctx.fill();
          }
        });
      }

      // -------------------------------------------------------------
      // 7. PINNED 3D HUD CALLOUTS & LEADER LINES
      // -------------------------------------------------------------
      const updatedPins: HudPinData[] = [];
      hudAnchors.forEach((hud) => {
        const f = getDeckFrame(hud.t);
        const deckProj = project(f.leftTop);
        if (deckProj.visible) {
          const color = getMaterialColor(deckProj.y, 'spineGlow', 1);
          updatedPins.push({
            id: hud.id,
            labelEn: hud.labelEn,
            labelAr: hud.labelAr,
            x: deckProj.x,
            y: deckProj.y,
            visible: true,
            color,
          });

          // Draw pinpoint node on deck
          ctx.beginPath();
          ctx.arc(deckProj.x, deckProj.y, 3 * deckProj.scale, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();

          const pulseRing = Math.sin(time * 2 + hud.t * 6) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(deckProj.x, deckProj.y, (5 + pulseRing * 4) * deckProj.scale, 0, Math.PI * 2);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Technical Leader Line
          const leaderEndX = deckProj.x + (isAr ? -52 : 52);
          const leaderEndY = deckProj.y + 26;

          ctx.beginPath();
          ctx.moveTo(deckProj.x, deckProj.y);
          ctx.lineTo(deckProj.x + (isAr ? -20 : 20), deckProj.y + 13);
          ctx.lineTo(leaderEndX, leaderEndY);
          ctx.strokeStyle = getMaterialColor(deckProj.y, 'towerBevel', 0.6);
          ctx.lineWidth = 1;
          ctx.stroke();

          // High-precision HUD Label text
          ctx.font = `600 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
          ctx.fillStyle = getMaterialColor(leaderEndY, 'towerFront', 0.9);
          ctx.textAlign = isAr ? 'right' : 'left';
          ctx.fillText(
            isAr ? hud.labelAr : hud.labelEn,
            leaderEndX + (isAr ? -6 : 6),
            leaderEndY + 3
          );
        }
      });

      if (onHudUpdate && updatedPins.length > 0) {
        onHudUpdate(updatedPins);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isAr, onHudUpdate]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
