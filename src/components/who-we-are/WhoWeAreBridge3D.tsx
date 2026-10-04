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
  lane: -1 | 1; // Left or right central highway lane
  speed: number;
  size: number;
  alpha: number;
  pulseOffset: number;
  scatterX?: number;
  scatterY?: number;
  scatterZ?: number;
  phase: number;
}

export default function WhoWeAreBridge3D({
  className = '',
  isAr = false,
  scrollProgress = 0,
  onHudUpdate,
}: WhoWeAreBridge3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse tracking for subtle organic 3D parallax
  const mouseRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  });

  // Store scroll progress in ref for smooth RAF interpolation
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

    // Responsive sizing
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

    // Visibility Observer to pause RAF when off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    // Mouse move listener
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

    // Initialize Bridge Data Particles
    const particlesCount = 75;
    const particles: BridgeParticle[] = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        t: Math.random(),
        lane: Math.random() > 0.5 ? 1 : -1,
        speed: 0.0018 + Math.random() * 0.0032,
        size: 1.6 + Math.random() * 2.2,
        alpha: 0.35 + Math.random() * 0.65,
        pulseOffset: Math.random() * Math.PI * 2,
        scatterX: (Math.random() - 0.5) * 60,
        scatterY: (Math.random() - 0.5) * 40,
        scatterZ: (Math.random() - 0.5) * 50,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Volumetric cascade particles (The Transformation burst in Phase 2)
    const cascadeCount = 65;
    const cascadeParticles: BridgeParticle[] = [];
    for (let i = 0; i < cascadeCount; i++) {
      cascadeParticles.push({
        t: 0.3 + Math.random() * 0.5,
        lane: Math.random() > 0.5 ? 1 : -1,
        speed: 0.001 + Math.random() * 0.002,
        size: 1.2 + Math.random() * 2.5,
        alpha: 0.3 + Math.random() * 0.6,
        pulseOffset: Math.random() * Math.PI * 2,
        scatterX: (Math.random() - 0.5) * 220,
        scatterY: -10 - Math.random() * 90,
        scatterZ: (Math.random() - 0.5) * 160,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // 3D Geometry definitions
    // Bridge spans diagonally: near-left to far-right (or flipped for RTL)
    const dirSign = isAr ? -1 : 1;

    // Span endpoints
    const spanStart: Point3D = {
      x: -560 * dirSign,
      y: 110,
      z: 360,
    };
    const spanEnd: Point3D = {
      x: 620 * dirSign,
      y: -170,
      z: -420,
    };

    // Span delta & tangent
    const spanDx = spanEnd.x - spanStart.x;
    const spanDy = spanEnd.y - spanStart.y;
    const spanDz = spanEnd.z - spanStart.z;

    // Normal vector perpendicular to span in XZ plane
    const spanDistXZ = Math.hypot(spanDx, spanDz) || 1;
    const normX = (-spanDz / spanDistXZ) * dirSign;
    const normZ = (spanDx / spanDistXZ) * dirSign;

    const deckWidth = 42;
    const girderDepth = 15;

    // Camber arch helper
    const getCamberY = (t: number) => Math.sin(t * Math.PI) * 24;

    // Point along deck center
    const getDeckCenter = (t: number): Point3D => ({
      x: spanStart.x + spanDx * t,
      y: spanStart.y + spanDy * t + getCamberY(t),
      z: spanStart.z + spanDz * t,
    });

    // Deck left & right edges
    const getDeckEdges = (t: number) => {
      const c = getDeckCenter(t);
      const halfW = deckWidth * 0.5;
      return {
        left: {
          x: c.x - normX * halfW,
          y: c.y,
          z: c.z - normZ * halfW,
        },
        right: {
          x: c.x + normX * halfW,
          y: c.y,
          z: c.z + normZ * halfW,
        },
        girderLeft: {
          x: c.x - normX * halfW,
          y: c.y - girderDepth,
          z: c.z - normZ * halfW,
        },
        girderRight: {
          x: c.x + normX * halfW,
          y: c.y - girderDepth,
          z: c.z + normZ * halfW,
        },
        conduit1: {
          x: c.x - normX * 6,
          y: c.y + 1,
          z: c.z - normZ * 6,
        },
        conduit2: {
          x: c.x + normX * 6,
          y: c.y + 1,
          z: c.z + normZ * 6,
        },
      };
    };

    // Tower definitions: Tower 1 (Near / Left) and Tower 2 (Far / Right)
    const towers = [
      {
        t: 0.28,
        height: 295,
        pierDepth: 85,
        apexWidthFactor: 0.38,
        legWidthFactor: 1.15,
        cablesCount: 10,
        isNear: true,
      },
      {
        t: 0.72,
        height: 265,
        pierDepth: 75,
        apexWidthFactor: 0.38,
        legWidthFactor: 1.15,
        cablesCount: 9,
        isNear: false,
      },
    ];

    // HUD milestones along deck
    const hudAnchors = [
      { id: 'hud-1', t: 0.18, labelEn: 'GLOBAL POOL NETWORK', labelAr: 'شبكة الكفاءات العالمية' },
      { id: 'hud-2', t: 0.40, labelEn: 'TALENT MATCHING', labelAr: 'مطابقة الكفاءات والاحتياج' },
      { id: 'hud-3', t: 0.58, labelEn: 'TALENT POOL MATCHING', labelAr: 'مستودع المهارات المعتمد' },
      { id: 'hud-4', t: 0.78, labelEn: 'GLOBAL NETWORK', labelAr: 'المنظومة الدولية الموحدة' },
    ];

    // Render loop
    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.016;

      // Mouse damping
      mouseRef.current.currentX +=
        (mouseRef.current.targetX - mouseRef.current.currentX) * 0.05;
      mouseRef.current.currentY +=
        (mouseRef.current.targetY - mouseRef.current.currentY) * 0.05;

      const currentScroll = Math.max(0, Math.min(1, scrollRef.current));

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Transition Horizon Line (The boundary between Dark Hero & White Content)
      // At scroll 0: horizon sits around 48% of screen height
      // As scroll increases: horizon glides up smoothly, revealing full white architectural canvas
      const horizonY = height * (0.48 - currentScroll * 0.65);

      // Camera center
      const cx = width * (isAr ? 0.52 : 0.48);
      const cy = height * 0.44 + currentScroll * (height * 0.06);

      // Responsive scale factor
      const baseScale = Math.min(width / 1100, height / 750);
      const responsiveScale = Math.max(0.68, Math.min(1.22, baseScale));

      // Dynamic camera rotation
      const basePitch = 0.28 + (prefersReducedMotion ? 0 : mouseRef.current.currentY * 0.06);
      const baseYaw =
        (-0.16 + (prefersReducedMotion ? 0 : mouseRef.current.currentX * 0.08)) * dirSign;

      // Camera translation driven by scroll
      const camOffsetY = currentScroll * 70;
      const camOffsetZ = currentScroll * 110;
      const camOffsetX = currentScroll * 50 * dirSign;

      const cosPitch = Math.cos(basePitch);
      const sinPitch = Math.sin(basePitch);
      const cosYaw = Math.cos(baseYaw);
      const sinYaw = Math.sin(baseYaw);

      const fov = 850;
      const camDist = 1100;

      // 3D Perspective Projection Function
      const project = (p: Point3D): ProjectedPoint => {
        // Shift relative to camera
        const x0 = p.x - camOffsetX;
        const y0 = p.y + camOffsetY;
        const z0 = p.z - camOffsetZ;

        // 1. Rotate Yaw (Y axis)
        const x1 = x0 * cosYaw + z0 * sinYaw;
        const y1 = y0;
        const z1 = -x0 * sinYaw + z0 * cosYaw;

        // 2. Rotate Pitch (X axis)
        const x2 = x1;
        const y2 = y1 * cosPitch - z1 * sinPitch;
        const z2 = y1 * sinPitch + z1 * cosPitch;

        // Perspective divide
        const dist = camDist - z2;
        if (dist <= 10) {
          return { x: cx, y: cy, z: z2, scale: 0, visible: false };
        }

        const scale = (fov / dist) * responsiveScale;
        const screenX = cx + x2 * scale;
        const screenY = cy - y2 * scale; // Invert Y for canvas

        return {
          x: screenX,
          y: screenY,
          z: z2,
          scale,
          visible: dist > 0,
        };
      };

      // Color interpolation helper
      // Blends between dark mode luminous palette and light mode architectural slate palette
      const getDynamicColor = (
        screenY: number,
        type: 'structural' | 'glow' | 'cable' | 'conduit' | 'particle' | 'shadow' | 'pier',
        baseAlpha = 1
      ): string => {
        // Distance from horizon: < horizonY is dark section, > horizonY is light section
        const blendRange = 120;
        const delta = screenY - horizonY;
        const tLight = Math.max(0, Math.min(1, (delta + blendRange * 0.5) / blendRange));

        if (type === 'structural') {
          // Dark hero: Glowing pure white / ice-white
          // Light section: Refined dark architectural slate (#1E293B / #334155)
          const r = Math.round(255 * (1 - tLight) + 30 * tLight);
          const g = Math.round(255 * (1 - tLight) + 41 * tLight);
          const b = Math.round(255 * (1 - tLight) + 59 * tLight);
          const alpha = (0.92 * (1 - tLight) + 0.85 * tLight) * baseAlpha;
          return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
        }

        if (type === 'pier') {
          // Pier concrete block
          const r = Math.round(200 * (1 - tLight) + 71 * tLight);
          const g = Math.round(210 * (1 - tLight) + 85 * tLight);
          const b = Math.round(225 * (1 - tLight) + 105 * tLight);
          const alpha = (0.75 * (1 - tLight) + 0.90 * tLight) * baseAlpha;
          return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
        }

        if (type === 'glow') {
          // Dark hero: Electric cyan / ice-blue (#38BDF8 / #00E5FF)
          // Light section: Corporate Cobalt / Azure (#0284C7 / #2563EB)
          const r = Math.round(56 * (1 - tLight) + 2 * tLight);
          const g = Math.round(189 * (1 - tLight) + 132 * tLight);
          const b = Math.round(248 * (1 - tLight) + 199 * tLight);
          const alpha = (0.85 * (1 - tLight) + 0.75 * tLight) * baseAlpha;
          return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
        }

        if (type === 'cable') {
          // Stay cables: white/cyan filaments in dark, slate wireframe in light
          const r = Math.round(240 * (1 - tLight) + 51 * tLight);
          const g = Math.round(248 * (1 - tLight) + 65 * tLight);
          const b = Math.round(255 * (1 - tLight) + 85 * tLight);
          const alpha = (0.55 * (1 - tLight) + 0.40 * tLight) * baseAlpha;
          return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
        }

        if (type === 'conduit') {
          // Central neon data lines
          const r = Math.round(56 * (1 - tLight) + 37 * tLight);
          const g = Math.round(189 * (1 - tLight) + 99 * tLight);
          const b = Math.round(248 * (1 - tLight) + 235 * tLight);
          const alpha = (0.85 * (1 - tLight) + 0.65 * tLight) * baseAlpha;
          return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
        }

        if (type === 'particle') {
          // Flowing data packets: glowing cyan in dark, crisp cobalt in light
          const r = Math.round(125 * (1 - tLight) + 29 * tLight);
          const g = Math.round(211 * (1 - tLight) + 78 * tLight);
          const b = Math.round(252 * (1 - tLight) + 216 * tLight);
          const alpha = (0.95 * (1 - tLight) + 0.85 * tLight) * baseAlpha;
          return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
        }

        // Soft shadow under piers in light mode
        return `rgba(0, 0, 0, ${(0.12 * tLight * baseAlpha).toFixed(3)})`;
      };

      // Helper to draw a 3D line with dynamic horizon gradient
      const drawLine3D = (
        p1: Point3D,
        p2: Point3D,
        type: 'structural' | 'glow' | 'cable' | 'conduit' | 'shadow' | 'pier',
        lineWidth = 1,
        baseAlpha = 1
      ) => {
        const proj1 = project(p1);
        const proj2 = project(p2);
        if (!proj1.visible && !proj2.visible) return;

        ctx.beginPath();
        ctx.moveTo(proj1.x, proj1.y);
        ctx.lineTo(proj2.x, proj2.y);

        // Check if line crosses horizon boundary
        const color1 = getDynamicColor(proj1.y, type, baseAlpha);
        const color2 = getDynamicColor(proj2.y, type, baseAlpha);

        if (color1 === color2) {
          ctx.strokeStyle = color1;
        } else {
          const grad = ctx.createLinearGradient(proj1.x, proj1.y, proj2.x, proj2.y);
          grad.addColorStop(0, color1);
          grad.addColorStop(1, color2);
          ctx.strokeStyle = grad;
        }

        ctx.lineWidth = Math.max(0.6, lineWidth * proj1.scale);
        ctx.stroke();
      };

      // -------------------------------------------------------------
      // 1. DRAW UNDER-DECK TRUSSES & GIRDERS (Back-to-front depth)
      // -------------------------------------------------------------
      const deckSteps = 36;
      for (let i = 0; i < deckSteps; i++) {
        const tA = i / deckSteps;
        const tB = (i + 1) / deckSteps;
        const eA = getDeckEdges(tA);
        const eB = getDeckEdges(tB);

        // Longitudinal edge lines
        drawLine3D(eA.left, eB.left, 'structural', 1.8, 0.95);
        drawLine3D(eA.right, eB.right, 'structural', 1.8, 0.95);
        drawLine3D(eA.girderLeft, eB.girderLeft, 'structural', 1.2, 0.6);
        drawLine3D(eA.girderRight, eB.girderRight, 'structural', 1.2, 0.6);

        // Under-deck vertical fascia ribs
        drawLine3D(eA.left, eA.girderLeft, 'structural', 1.0, 0.5);
        drawLine3D(eA.right, eA.girderRight, 'structural', 1.0, 0.5);

        // Transverse road girders
        if (i % 2 === 0) {
          drawLine3D(eA.left, eA.right, 'structural', 0.8, 0.4);
          drawLine3D(eA.girderLeft, eA.girderRight, 'structural', 0.8, 0.3);
          // Diagonal space-frame cross brace
          drawLine3D(eA.left, eA.girderRight, 'structural', 0.6, 0.25);
        }

        // Central Data Highway Lines
        drawLine3D(eA.conduit1, eB.conduit1, 'conduit', 1.4, 0.85);
        drawLine3D(eA.conduit2, eB.conduit2, 'conduit', 1.4, 0.85);
      }

      // -------------------------------------------------------------
      // 2. DRAW TWIN A-FRAME TOWERS & STAY-CABLE ARRAYS
      // -------------------------------------------------------------
      towers.forEach((tower) => {
        const tCenter = getDeckCenter(tower.t);
        const halfW = deckWidth * 0.5;

        // Pier bases below deck
        const pierY = tCenter.y - tower.pierDepth;
        const pierLeft: Point3D = {
          x: tCenter.x - normX * (halfW * tower.legWidthFactor),
          y: pierY,
          z: tCenter.z - normZ * (halfW * tower.legWidthFactor),
        };
        const pierRight: Point3D = {
          x: tCenter.x + normX * (halfW * tower.legWidthFactor),
          y: pierY,
          z: tCenter.z + normZ * (halfW * tower.legWidthFactor),
        };

        // Deck intersection points
        const deckLegLeft: Point3D = {
          x: tCenter.x - normX * (halfW * tower.legWidthFactor),
          y: tCenter.y,
          z: tCenter.z - normZ * (halfW * tower.legWidthFactor),
        };
        const deckLegRight: Point3D = {
          x: tCenter.x + normX * (halfW * tower.legWidthFactor),
          y: tCenter.y,
          z: tCenter.z + normZ * (halfW * tower.legWidthFactor),
        };

        // Tower Pinnacle / Apex
        const apexY = tCenter.y + tower.height;
        const apexLeft: Point3D = {
          x: tCenter.x - normX * (halfW * tower.apexWidthFactor),
          y: apexY,
          z: tCenter.z - normZ * (halfW * tower.apexWidthFactor),
        };
        const apexRight: Point3D = {
          x: tCenter.x + normX * (halfW * tower.apexWidthFactor),
          y: apexY,
          z: tCenter.z + normZ * (halfW * tower.apexWidthFactor),
        };

        // Draw Pier Foundation pedestals
        const pierH = 18;
        [pierLeft, pierRight].forEach((pier) => {
          const pBot: Point3D = { x: pier.x, y: pier.y - pierH, z: pier.z };
          drawLine3D(pier, pBot, 'pier', 4.5, 0.9);
          // Soft ground shadow under pier
          const projPier = project(pBot);
          if (projPier.visible) {
            ctx.beginPath();
            ctx.ellipse(projPier.x, projPier.y + 4, 18 * projPier.scale, 6 * projPier.scale, 0, 0, Math.PI * 2);
            ctx.fillStyle = getDynamicColor(projPier.y, 'shadow', 1);
            ctx.fill();
          }
        });

        // Draw Tower Legs (Base to Deck, and Deck to Apex)
        // Pier to deck
        drawLine3D(pierLeft, deckLegLeft, 'structural', 2.8, 0.9);
        drawLine3D(pierRight, deckLegRight, 'structural', 2.8, 0.9);

        // Deck to Apex
        drawLine3D(deckLegLeft, apexLeft, 'structural', 2.8, 0.95);
        drawLine3D(deckLegRight, apexRight, 'structural', 2.8, 0.95);

        // Neon spine conduit running up tower legs (glowing cyan / azure)
        drawLine3D(deckLegLeft, apexLeft, 'glow', 1.4, 0.85);
        drawLine3D(deckLegRight, apexRight, 'glow', 1.4, 0.85);

        // Top horizontal crossbar connecting apexes
        drawLine3D(apexLeft, apexRight, 'structural', 2.2, 0.9);

        // Diamond / X-brace cross-struts (Iconic futuristic truss from reference image)
        const midY = tCenter.y + tower.height * 0.46;
        const midLeft: Point3D = {
          x: (deckLegLeft.x + apexLeft.x) * 0.5,
          y: midY,
          z: (deckLegLeft.z + apexLeft.z) * 0.5,
        };
        const midRight: Point3D = {
          x: (deckLegRight.x + apexRight.x) * 0.5,
          y: midY,
          z: (deckLegRight.z + apexRight.z) * 0.5,
        };
        const diamondCenter: Point3D = {
          x: (midLeft.x + midRight.x) * 0.5,
          y: midY + 12,
          z: (midLeft.z + midRight.z) * 0.5,
        };

        // Diamond struts
        const upperBeamY = tCenter.y + tower.height * 0.76;
        const upperBeamLeft: Point3D = {
          x: deckLegLeft.x + (apexLeft.x - deckLegLeft.x) * 0.76,
          y: upperBeamY,
          z: deckLegLeft.z + (apexLeft.z - deckLegLeft.z) * 0.76,
        };
        const upperBeamRight: Point3D = {
          x: deckLegRight.x + (apexRight.x - deckLegRight.x) * 0.76,
          y: upperBeamY,
          z: deckLegRight.z + (apexRight.z - deckLegRight.z) * 0.76,
        };

        drawLine3D(upperBeamLeft, upperBeamRight, 'structural', 1.8, 0.85);
        drawLine3D(deckLegLeft, diamondCenter, 'structural', 1.6, 0.8);
        drawLine3D(deckLegRight, diamondCenter, 'structural', 1.6, 0.8);
        drawLine3D(diamondCenter, upperBeamLeft, 'structural', 1.6, 0.8);
        drawLine3D(diamondCenter, upperBeamRight, 'structural', 1.6, 0.8);

        // Diamond center jewel node
        const projCenter = project(diamondCenter);
        if (projCenter.visible) {
          ctx.beginPath();
          ctx.arc(projCenter.x, projCenter.y, 3 * projCenter.scale, 0, Math.PI * 2);
          ctx.fillStyle = getDynamicColor(projCenter.y, 'glow', 0.9);
          ctx.fill();
        }

        // STAY-CABLE FANS (Harp & Fan suspension array)
        const cableCount = tower.cablesCount;
        for (let c = 0; c < cableCount; c++) {
          const frac = (c + 1) / (cableCount + 1);
          // Anchor on tower leg (upper 42% of tower)
          const towerAnchorY = tCenter.y + tower.height * (0.58 + frac * 0.38);

          const anchorL: Point3D = {
            x: deckLegLeft.x + (apexLeft.x - deckLegLeft.x) * (0.58 + frac * 0.38),
            y: towerAnchorY,
            z: deckLegLeft.z + (apexLeft.z - deckLegLeft.z) * (0.58 + frac * 0.38),
          };
          const anchorR: Point3D = {
            x: deckLegRight.x + (apexRight.x - deckLegRight.x) * (0.58 + frac * 0.38),
            y: towerAnchorY,
            z: deckLegRight.z + (apexRight.z - deckLegRight.z) * (0.58 + frac * 0.38),
          };

          // Forward & Backward deck anchors
          const deckSpread = 0.024 + frac * 0.022;

          // Forward stay
          const tFwd = Math.min(1.0, tower.t + deckSpread);
          const eFwd = getDeckEdges(tFwd);
          drawLine3D(anchorL, eFwd.left, 'cable', 0.8, 0.55);
          drawLine3D(anchorR, eFwd.right, 'cable', 0.8, 0.55);

          // Backward stay
          const tBwd = Math.max(0.0, tower.t - deckSpread);
          const eBwd = getDeckEdges(tBwd);
          drawLine3D(anchorL, eBwd.left, 'cable', 0.8, 0.55);
          drawLine3D(anchorR, eBwd.right, 'cable', 0.8, 0.55);
        }
      });

      // -------------------------------------------------------------
      // 3. DRAW DATA HIGHWAY PARTICLES & TRANSFORMATION CASCADE
      // -------------------------------------------------------------
      particles.forEach((p) => {
        // Advance particle along deck
        p.t += p.speed;
        if (p.t > 1) p.t = 0;

        const centerPt = getDeckCenter(p.t);
        const laneOffset = normX * (p.lane * 6);
        const laneOffsetZ = normZ * (p.lane * 6);

        const pt3D: Point3D = {
          x: centerPt.x + laneOffset,
          y: centerPt.y + 1.8,
          z: centerPt.z + laneOffsetZ,
        };

        const proj = project(pt3D);
        if (proj.visible) {
          const pulse = Math.sin(time * 3 + p.pulseOffset) * 0.3 + 0.7;
          const pSize = Math.max(1, p.size * proj.scale * pulse);
          const pColor = getDynamicColor(proj.y, 'particle', p.alpha);

          // Glow halo
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, pSize * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = getDynamicColor(proj.y, 'glow', p.alpha * 0.35);
          ctx.fill();

          // Core point
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, pSize, 0, Math.PI * 2);
          ctx.fillStyle = pColor;
          ctx.fill();

          // Particle motion trail
          const prevT = Math.max(0, p.t - 0.015);
          const prevCenter = getDeckCenter(prevT);
          const prevPt3D: Point3D = {
            x: prevCenter.x + laneOffset,
            y: prevCenter.y + 1.8,
            z: prevCenter.z + laneOffsetZ,
          };
          const prevProj = project(prevPt3D);
          if (prevProj.visible) {
            ctx.beginPath();
            ctx.moveTo(proj.x, proj.y);
            ctx.lineTo(prevProj.x, prevProj.y);
            ctx.strokeStyle = getDynamicColor(proj.y, 'glow', p.alpha * 0.4);
            ctx.lineWidth = Math.max(0.6, 1.2 * proj.scale);
            ctx.stroke();
          }
        }
      });

      // 4. TRANSFORMATION CASCADE SWARM (Phase 2 burst into Light Content)
      if (currentScroll > 0.05) {
        const cascadeStrength = Math.min(1, currentScroll * 1.5);
        cascadeParticles.forEach((cp) => {
          // Subtle organic drift
          const driftPhase = time * 1.5 + cp.phase;
          const driftX = Math.sin(driftPhase) * 18;
          const driftY = Math.cos(driftPhase * 0.8) * 12;

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
            ctx.fillStyle = getDynamicColor(proj.y, 'glow', alpha * 0.4);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
            ctx.fillStyle = getDynamicColor(proj.y, 'particle', alpha);
            ctx.fill();
          }
        });
      }

      // -------------------------------------------------------------
      // 5. UPDATE PROJECTED 2D HUD PINS (GLOBAL POOL, TALENT MATCHING)
      // -------------------------------------------------------------
      const updatedPins: HudPinData[] = [];
      hudAnchors.forEach((hud) => {
        const deckCenter = getDeckCenter(hud.t);
        const deckProj = project(deckCenter);
        if (deckProj.visible) {
          const color = getDynamicColor(deckProj.y, 'glow', 1);
          updatedPins.push({
            id: hud.id,
            labelEn: hud.labelEn,
            labelAr: hud.labelAr,
            x: deckProj.x,
            y: deckProj.y,
            visible: true,
            color,
          });

          // Draw HUD connector node and leader line directly on canvas
          // Anchor dot
          ctx.beginPath();
          ctx.arc(deckProj.x, deckProj.y, 3 * deckProj.scale, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();

          // Outer pulse ring
          const ringPulse = Math.sin(time * 2 + hud.t * 5) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(deckProj.x, deckProj.y, (5 + ringPulse * 3) * deckProj.scale, 0, Math.PI * 2);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Angled leader pointer line
          const leaderEndX = deckProj.x + (isAr ? -45 : 45);
          const leaderEndY = deckProj.y + 28;
          ctx.beginPath();
          ctx.moveTo(deckProj.x, deckProj.y);
          ctx.lineTo(deckProj.x + (isAr ? -18 : 18), deckProj.y + 14);
          ctx.lineTo(leaderEndX, leaderEndY);
          ctx.strokeStyle = getDynamicColor(deckProj.y, 'structural', 0.5);
          ctx.lineWidth = 1;
          ctx.stroke();

          // HUD Label Text
          ctx.font = `600 10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
          ctx.fillStyle = getDynamicColor(leaderEndY, 'structural', 0.85);
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
