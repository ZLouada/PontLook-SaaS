'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export interface HudPinData {
  id: string;
  labelEn: string;
  labelAr: string;
  x: number;
  y: number;
  visible: boolean;
  color: string;
}

interface WhoWeAreThreeBridgeProps {
  className?: string;
  isAr?: boolean;
  scrollProgress?: number; // 0 (Hero dark) -> 1 (Content light)
  onHudUpdate?: (pins: HudPinData[]) => void;
}

export default function WhoWeAreThreeBridge({
  className = '',
  isAr = false,
  scrollProgress = 0,
  onHudUpdate,
}: WhoWeAreThreeBridgeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);
  const onHudUpdateRef = useRef(onHudUpdate);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    onHudUpdateRef.current = onHudUpdate;
  }, [onHudUpdate]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 1200;
    let height = container.clientHeight || 700;
    let animId: number;
    let isVisible = true;
    let time = 0;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, width / height, 1, 4000);
    const dirSign = isAr ? -1 : 1;

    // Initial Camera orientation matching the cinematic video
    const baseCamPos = new THREE.Vector3(-270 * dirSign, 220, 780);
    const baseTarget = new THREE.Vector3(70 * dirSign, 15, -60);
    camera.position.copy(baseCamPos);
    camera.lookAt(baseTarget);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(300 * dirSign, 550, 400);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7dd3fc, 0.8);
    dirLight2.position.set(-400 * dirSign, 300, -200);
    scene.add(dirLight2);

    // Neon Ice-Blue Accent Point Lights
    const blueLight1 = new THREE.PointLight(0x00c2ff, 3.5, 450);
    scene.add(blueLight1);

    const blueLight2 = new THREE.PointLight(0x00c2ff, 2.5, 450);
    scene.add(blueLight2);

    // 3. Materials
    const darkTowerColor = new THREE.Color(0xf1f5f9);
    const lightTowerColor = new THREE.Color(0x242d3b);

    const darkGirderColor = new THREE.Color(0x1a202c);
    const lightGirderColor = new THREE.Color(0x334155);

    const darkCableColor = new THREE.Color(0xffffff);
    const lightCableColor = new THREE.Color(0x475569);

    const towerMat = new THREE.MeshStandardMaterial({
      color: darkTowerColor.clone(),
      roughness: 0.28,
      metalness: 0.35,
    });

    const pierMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.7,
      metalness: 0.15,
    });

    const deckAsphaltMat = new THREE.MeshStandardMaterial({
      color: 0x171923,
      roughness: 0.65,
      metalness: 0.2,
    });

    const girderMat = new THREE.MeshStandardMaterial({
      color: darkGirderColor.clone(),
      roughness: 0.45,
      metalness: 0.4,
    });

    const neonSpineMat = new THREE.MeshBasicMaterial({
      color: 0x00c2ff,
    });

    const cableLineMat = new THREE.LineBasicMaterial({
      color: darkCableColor.clone(),
      transparent: true,
      opacity: 0.85,
    });

    // 4. Bridge Geometry Parameters
    const spanStart = new THREE.Vector3(-560 * dirSign, 110, 420);
    const spanEnd = new THREE.Vector3(680 * dirSign, -190, -520);
    const spanVector = new THREE.Vector3().subVectors(spanEnd, spanStart);
    const spanLength = spanVector.length();

    // Normal vector perpendicular to span in XZ
    const normXZ = new THREE.Vector3(-spanVector.z, 0, spanVector.x).normalize().multiplyScalar(dirSign);

    const deckWidth = 50;
    const deckThickness = 7;
    const girderDepth = 16;

    const getDeckPoint = (t: number): THREE.Vector3 => {
      const p = new THREE.Vector3().lerpVectors(spanStart, spanEnd, t);
      // Subtle bridge camber arch
      p.y += Math.sin(t * Math.PI) * 25;
      return p;
    };

    // Construct Bridge Group
    const bridgeGroup = new THREE.Group();
    scene.add(bridgeGroup);

    // A. Roadway Deck & Side Girders
    const deckSegments = 40;
    const roadGeom = new THREE.BufferGeometry();
    const roadVertices: number[] = [];
    const roadIndices: number[] = [];

    const girderGeom = new THREE.BufferGeometry();
    const girderVertices: number[] = [];
    const girderIndices: number[] = [];

    for (let i = 0; i <= deckSegments; i++) {
      const t = i / deckSegments;
      const c = getDeckPoint(t);
      const halfW = deckWidth * 0.5;

      const pL = new THREE.Vector3().copy(c).addScaledVector(normXZ, -halfW);
      const pR = new THREE.Vector3().copy(c).addScaledVector(normXZ, halfW);
      const pLBot = new THREE.Vector3().copy(pL).setY(pL.y - girderDepth);
      const pRBot = new THREE.Vector3().copy(pR).setY(pR.y - girderDepth);

      roadVertices.push(pL.x, pL.y, pL.z, pR.x, pR.y, pR.z);
      girderVertices.push(pL.x, pL.y, pL.z, pLBot.x, pLBot.y, pLBot.z);

      if (i < deckSegments) {
        const base = i * 2;
        roadIndices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
        girderIndices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
      }
    }

    roadGeom.setAttribute('position', new THREE.Float32BufferAttribute(roadVertices, 3));
    roadGeom.setIndex(roadIndices);
    roadGeom.computeVertexNormals();
    const roadMesh = new THREE.Mesh(roadGeom, deckAsphaltMat);
    bridgeGroup.add(roadMesh);

    girderGeom.setAttribute('position', new THREE.Float32BufferAttribute(girderVertices, 3));
    girderGeom.setIndex(girderIndices);
    girderGeom.computeVertexNormals();
    const girderMesh = new THREE.Mesh(girderGeom, girderMat);
    bridgeGroup.add(girderMesh);

    // B. Central Glowing Neon Data Conduits
    const conduit1Points: THREE.Vector3[] = [];
    const conduit2Points: THREE.Vector3[] = [];
    for (let i = 0; i <= deckSegments; i++) {
      const t = i / deckSegments;
      const c = getDeckPoint(t);
      conduit1Points.push(new THREE.Vector3().copy(c).addScaledVector(normXZ, -6).setY(c.y + 1));
      conduit2Points.push(new THREE.Vector3().copy(c).addScaledVector(normXZ, 6).setY(c.y + 1));
    }
    const conduit1Geom = new THREE.BufferGeometry().setFromPoints(conduit1Points);
    const conduit2Geom = new THREE.BufferGeometry().setFromPoints(conduit2Points);
    const conduit1Line = new THREE.Line(conduit1Geom, neonSpineMat);
    const conduit2Line = new THREE.Line(conduit2Geom, neonSpineMat);
    bridgeGroup.add(conduit1Line);
    bridgeGroup.add(conduit2Line);

    // C. Twin A-Frame Sculptural Towers
    const towerConfigs = [
      { t: 0.28, height: 305, pierDepth: 95, legSpacingDeck: 1.25, legSpacingApex: 0.45, isNear: true },
      { t: 0.74, height: 275, pierDepth: 85, legSpacingDeck: 1.25, legSpacingApex: 0.45, isNear: false },
    ];

    const cableLinePositions: number[] = [];

    towerConfigs.forEach((cfg) => {
      const c = getDeckPoint(cfg.t);
      const halfW = deckWidth * 0.5;

      const pierTopY = c.y - cfg.pierDepth;
      const apexY = c.y + cfg.height;

      const leftBase = new THREE.Vector3().copy(c).addScaledVector(normXZ, -halfW * cfg.legSpacingDeck).setY(pierTopY);
      const rightBase = new THREE.Vector3().copy(c).addScaledVector(normXZ, halfW * cfg.legSpacingDeck).setY(pierTopY);

      const leftApex = new THREE.Vector3().copy(c).addScaledVector(normXZ, -halfW * cfg.legSpacingApex).setY(apexY);
      const rightApex = new THREE.Vector3().copy(c).addScaledVector(normXZ, halfW * cfg.legSpacingApex).setY(apexY);

      // Foundation Piers (Solid Concrete Cuboids)
      const pierGeom = new THREE.BoxGeometry(26, 24, 26);
      [leftBase, rightBase].forEach((pos) => {
        const pier = new THREE.Mesh(pierGeom, pierMat);
        pier.position.copy(pos).setY(pos.y - 12);
        bridgeGroup.add(pier);
      });

      // Helper to build a tapered beveled tower leg
      const createLeg = (start: THREE.Vector3, end: THREE.Vector3) => {
        const legVec = new THREE.Vector3().subVectors(end, start);
        const legLen = legVec.length();
        const legGeom = new THREE.BoxGeometry(11, legLen, 13);
        const legMesh = new THREE.Mesh(legGeom, towerMat);

        // Position at midpoint
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        legMesh.position.copy(mid);

        // Align box Y axis with leg vector
        const axis = new THREE.Vector3(0, 1, 0);
        legMesh.quaternion.setFromUnitVectors(axis, legVec.clone().normalize());
        bridgeGroup.add(legMesh);

        // Neon spine conduit down front face
        const spineGeom = new THREE.BoxGeometry(1.8, legLen, 1.2);
        const spineMesh = new THREE.Mesh(spineGeom, neonSpineMat);
        spineMesh.position.copy(mid).addScaledVector(normXZ, (dirSign > 0 ? 6.5 : -6.5));
        spineMesh.quaternion.copy(legMesh.quaternion);
        bridgeGroup.add(spineMesh);
      };

      createLeg(leftBase, leftApex);
      createLeg(rightBase, rightApex);

      // Top Crossbar connecting apexes
      const crossbarVec = new THREE.Vector3().subVectors(rightApex, leftApex);
      const crossbarGeom = new THREE.BoxGeometry(crossbarVec.length(), 12, 12);
      const crossbar = new THREE.Mesh(crossbarGeom, towerMat);
      crossbar.position.addVectors(leftApex, rightApex).multiplyScalar(0.5).setY(apexY - 10);
      crossbar.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), crossbarVec.clone().normalize());
      bridgeGroup.add(crossbar);

      // Diamond / X-brace center truss
      const midLeft = new THREE.Vector3().lerpVectors(leftBase, leftApex, 0.45);
      const midRight = new THREE.Vector3().lerpVectors(rightBase, rightApex, 0.45);
      const diamondCenter = new THREE.Vector3().addVectors(midLeft, midRight).multiplyScalar(0.5).setY(c.y + cfg.height * 0.42);

      const upperLeft = new THREE.Vector3().lerpVectors(leftBase, leftApex, 0.72);
      const upperRight = new THREE.Vector3().lerpVectors(rightBase, rightApex, 0.72);

      const createStrut = (p1: THREE.Vector3, p2: THREE.Vector3) => {
        const v = new THREE.Vector3().subVectors(p2, p1);
        const geom = new THREE.CylinderGeometry(2.2, 2.2, v.length(), 6);
        const mesh = new THREE.Mesh(geom, towerMat);
        mesh.position.addVectors(p1, p2).multiplyScalar(0.5);
        mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().normalize());
        bridgeGroup.add(mesh);
      };

      createStrut(midLeft, diamondCenter);
      createStrut(midRight, diamondCenter);
      createStrut(diamondCenter, upperLeft);
      createStrut(diamondCenter, upperRight);
      createStrut(upperLeft, upperRight);

      // Center glowing diamond jewel node
      const jewelGeom = new THREE.SphereGeometry(3.5, 12, 12);
      const jewel = new THREE.Mesh(jewelGeom, neonSpineMat);
      jewel.position.copy(diamondCenter);
      bridgeGroup.add(jewel);

      // Position accent point lights near towers
      if (cfg.isNear) {
        blueLight1.position.copy(diamondCenter);
      } else {
        blueLight2.position.copy(diamondCenter);
      }

      // Symmetrical Stay Cables (12 cables per side)
      const cableCount = 12;
      for (let k = 0; k < cableCount; k++) {
        const frac = (k + 1) / (cableCount + 1);
        const anchorL = new THREE.Vector3().lerpVectors(leftBase, leftApex, 0.54 + frac * 0.42);
        const anchorR = new THREE.Vector3().lerpVectors(rightBase, rightApex, 0.54 + frac * 0.42);

        const deckSpread = 0.022 + frac * 0.024;

        // Forward stays
        const tFwd = Math.min(1.0, cfg.t + deckSpread);
        const cFwd = getDeckPoint(tFwd);
        const deckFwdL = new THREE.Vector3().copy(cFwd).addScaledVector(normXZ, -halfW);
        const deckFwdR = new THREE.Vector3().copy(cFwd).addScaledVector(normXZ, halfW);

        cableLinePositions.push(anchorL.x, anchorL.y, anchorL.z, deckFwdL.x, deckFwdL.y, deckFwdL.z);
        cableLinePositions.push(anchorR.x, anchorR.y, anchorR.z, deckFwdR.x, deckFwdR.y, deckFwdR.z);

        // Backward stays
        const tBwd = Math.max(0.0, cfg.t - deckSpread);
        const cBwd = getDeckPoint(tBwd);
        const deckBwdL = new THREE.Vector3().copy(cBwd).addScaledVector(normXZ, -halfW);
        const deckBwdR = new THREE.Vector3().copy(cBwd).addScaledVector(normXZ, halfW);

        cableLinePositions.push(anchorL.x, anchorL.y, anchorL.z, deckBwdL.x, deckBwdL.y, deckBwdL.z);
        cableLinePositions.push(anchorR.x, anchorR.y, anchorR.z, deckBwdR.x, deckBwdR.y, deckBwdR.z);
      }
    });

    const cablesGeom = new THREE.BufferGeometry();
    cablesGeom.setAttribute('position', new THREE.Float32BufferAttribute(cableLinePositions, 3));
    const cablesSegments = new THREE.LineSegments(cablesGeom, cableLineMat);
    bridgeGroup.add(cablesSegments);

    // D. Flowing Data Particles along Highway
    const packetCount = 65;
    const packetSpeeds: number[] = [];
    const packetLanes: number[] = [];
    const packetT: number[] = [];
    const packetPositions = new Float32Array(packetCount * 3);

    for (let p = 0; p < packetCount; p++) {
      packetT.push(Math.random());
      packetSpeeds.push(0.0016 + Math.random() * 0.003);
      packetLanes.push(Math.random() > 0.5 ? 6 : -6);
      packetPositions[p * 3] = 0;
      packetPositions[p * 3 + 1] = 0;
      packetPositions[p * 3 + 2] = 0;
    }

    const packetsGeom = new THREE.BufferGeometry();
    packetsGeom.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
    const packetsMat = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 4,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const packetsPoints = new THREE.Points(packetsGeom, packetsMat);
    bridgeGroup.add(packetsPoints);

    // E. HUD Milestones (for 3D-to-2D screen projection)
    const hudAnchors = [
      { id: 'hud-1', t: 0.18, labelEn: 'GLOBAL POOL NETWORK', labelAr: 'شبكة الكفاءات العالمية' },
      { id: 'hud-2', t: 0.40, labelEn: 'TALENT MATCHING', labelAr: 'مطابقة الكفاءات والاحتياج' },
      { id: 'hud-3', t: 0.60, labelEn: 'TALENT POOL NETWORK', labelAr: 'مستودع المهارات المعتمد' },
      { id: 'hud-4', t: 0.80, labelEn: 'GLOBAL NETWORK', labelAr: 'المنظومة الدولية الموحدة' },
    ];

    // Resize handler
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 1200;
      height = container.clientHeight || 700;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    // Render Loop
    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.016;
      const scroll = Math.max(0, Math.min(1, scrollRef.current));

      // 1. Camera Glide along Bridge Deck (Matching the Video)
      const scrollCamPos = new THREE.Vector3(
        (-270 + scroll * 85) * dirSign,
        220 - scroll * 45,
        780 - scroll * 130
      );
      const scrollTarget = new THREE.Vector3(
        (70 + scroll * 45) * dirSign,
        15 - scroll * 20,
        -60 - scroll * 70
      );

      camera.position.lerp(scrollCamPos, 0.08);
      camera.lookAt(scrollTarget);

      // 2. Material Interpolation (Dark Hero -> Architectural Light)
      towerMat.color.lerpColors(darkTowerColor, lightTowerColor, scroll);
      girderMat.color.lerpColors(darkGirderColor, lightGirderColor, scroll);
      cableLineMat.color.lerpColors(darkCableColor, lightCableColor, scroll);

      // In light mode, increase metalness for polished architectural look
      towerMat.metalness = 0.35 + scroll * 0.45;
      towerMat.roughness = 0.28 + scroll * 0.12;

      // Adjust lights on scroll
      dirLight1.intensity = 1.8 + scroll * 0.6;
      ambientLight.intensity = 0.65 + scroll * 0.55;

      // 3. Animate Highway Packets
      const posAttr = packetsGeom.attributes.position;
      for (let p = 0; p < packetCount; p++) {
        packetT[p] += packetSpeeds[p];
        if (packetT[p] > 1) packetT[p] = 0;

        const c = getDeckPoint(packetT[p]);
        const pt = new THREE.Vector3().copy(c).addScaledVector(normXZ, packetLanes[p]).setY(c.y + 1.2);

        posAttr.setXYZ(p, pt.x, pt.y, pt.z);
      }
      posAttr.needsUpdate = true;

      // 4. Project 3D HUD Anchor Points to 2D Screen Coordinates
      if (onHudUpdateRef.current) {
        const updatedPins: HudPinData[] = [];
        hudAnchors.forEach((hud) => {
          const pt = getDeckPoint(hud.t).addScaledVector(normXZ, -deckWidth * 0.5);
          const screenPos = pt.clone().project(camera);

          // Convert normalized device coords (-1 to +1) to screen pixels
          const px = ((screenPos.x + 1) * width) / 2;
          const py = ((-screenPos.y + 1) * height) / 2;

          updatedPins.push({
            id: hud.id,
            labelEn: hud.labelEn,
            labelAr: hud.labelAr,
            x: px,
            y: py,
            visible: screenPos.z < 1.0 && px >= 0 && px <= width && py >= 0 && py <= height,
            color: scroll > 0.5 ? '#0284C7' : '#00C2FF',
          });
        });

        onHudUpdateRef.current(updatedPins);
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      io.disconnect();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
      roadGeom.dispose();
      girderGeom.dispose();
      conduit1Geom.dispose();
      conduit2Geom.dispose();
      cablesGeom.dispose();
      packetsGeom.dispose();
    };
  }, [isAr]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
