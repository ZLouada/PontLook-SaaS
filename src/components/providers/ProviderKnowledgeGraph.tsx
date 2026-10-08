'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ProviderKnowledgeGraphProps {
  className?: string;
  isAr?: boolean;
}

interface GraphNode {
  id: string;
  code: string;
  labelEn: string;
  labelAr: string;
  type: 'buyer' | 'provider';
  tag: string;
  xPct: number;
  yPct: number;
  radius: number;
  color: string;
  status: 'ACTIVE' | 'MATCHED' | 'ROUTING';
  budget?: string;
}

interface GraphEdge {
  from: string;
  to: string;
  active: boolean;
  pulseOffset: number;
}

interface SignalPacket {
  edgeIdx: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

const NODES_DATA: GraphNode[] = [
  // Enterprise Buyer Nodes (Left & Top clusters)
  {
    id: 'b1',
    code: 'RYD_CORP_01',
    labelEn: 'Riyadh Holding · Conglomerate',
    labelAr: 'القابضة · الرياض',
    type: 'buyer',
    tag: 'HRDF / HADAF',
    budget: 'SAR 450K',
    xPct: 0.16,
    yPct: 0.22,
    radius: 7,
    color: '#38BDF8',
    status: 'MATCHED',
  },
  {
    id: 'b2',
    code: 'DXB_FIN_04',
    labelEn: 'Dubai Int\'l Banking Group',
    labelAr: 'المجموعة المصرفية · دبي',
    type: 'buyer',
    tag: 'SAMA / CBUAE',
    budget: 'SAR 680K',
    xPct: 0.22,
    yPct: 0.72,
    radius: 7,
    color: '#10B981',
    status: 'MATCHED',
  },
  {
    id: 'b3',
    code: 'JED_RETAIL_02',
    labelEn: 'Jeddah Commercial Group',
    labelAr: 'المجموعة التجارية · جدة',
    type: 'buyer',
    tag: 'NITAQAT HIGH-GREEN',
    budget: 'SAR 280K',
    xPct: 0.38,
    yPct: 0.18,
    radius: 6,
    color: '#38BDF8',
    status: 'ROUTING',
  },
  {
    id: 'b4',
    code: 'DOH_LOG_03',
    labelEn: 'Doha Infrastructure & Cargo',
    labelAr: 'اللوجستيات · الدوحة',
    type: 'buyer',
    tag: 'OPS LEADERSHIP',
    budget: 'SAR 340K',
    xPct: 0.14,
    yPct: 0.48,
    radius: 6,
    color: '#38BDF8',
    status: 'MATCHED',
  },
  {
    id: 'b5',
    code: 'ADH_GOV_05',
    labelEn: 'Abu Dhabi Semi-Gov Entity',
    labelAr: 'شبه حكومي · أبوظبي',
    type: 'buyer',
    tag: 'AI / DIGITAL',
    budget: 'SAR 750K',
    xPct: 0.44,
    yPct: 0.84,
    radius: 7,
    color: '#10B981',
    status: 'MATCHED',
  },
  {
    id: 'b6',
    code: 'KWI_ENG_02',
    labelEn: 'Kuwait Energy & Engineering',
    labelAr: 'الطاقة والهندسة · الكويت',
    type: 'buyer',
    tag: 'TECH SAFETY',
    budget: 'SAR 520K',
    xPct: 0.48,
    yPct: 0.38,
    radius: 6,
    color: '#38BDF8',
    status: 'ROUTING',
  },

  // Provider Nodes (Right cluster)
  {
    id: 'p1',
    code: 'PRV_EXEC_LEAD',
    labelEn: 'Executive Leadership Academy',
    labelAr: 'أكاديمية القيادة التنفيذية',
    type: 'provider',
    tag: 'C-SUITE DIRECT',
    xPct: 0.76,
    yPct: 0.24,
    radius: 9,
    color: '#38BDF8',
    status: 'ACTIVE',
  },
  {
    id: 'p2',
    code: 'PRV_SAMA_COMP',
    labelEn: 'SAMA & CBUAE Banking Compliance',
    labelAr: 'حوكمة وامتثال مصرفي',
    type: 'provider',
    tag: 'FINANCIAL GRC',
    xPct: 0.84,
    yPct: 0.64,
    radius: 9,
    color: '#10B981',
    status: 'ACTIVE',
  },
  {
    id: 'p3',
    code: 'PRV_TAWTEEN',
    labelEn: 'Tawteen & Saudization Accelerator',
    labelAr: 'مسار التوطين وبناء الكفاءات',
    type: 'provider',
    tag: 'WORKFORCE RETENTION',
    xPct: 0.68,
    yPct: 0.46,
    radius: 8,
    color: '#F59E0B',
    status: 'ACTIVE',
  },
  {
    id: 'p4',
    code: 'PRV_AI_TECH',
    labelEn: 'Enterprise AI & Data Upskilling',
    labelAr: 'تطوير مهارات الذكاء الاصطناعي',
    type: 'provider',
    tag: 'GENAI WORKFLOWS',
    xPct: 0.78,
    yPct: 0.82,
    radius: 8,
    color: '#38BDF8',
    status: 'ACTIVE',
  },
];

const EDGES_DATA: GraphEdge[] = [
  { from: 'b1', to: 'p1', active: true, pulseOffset: 0 },
  { from: 'b4', to: 'p1', active: true, pulseOffset: 0.2 },
  { from: 'b3', to: 'p3', active: true, pulseOffset: 0.4 },
  { from: 'b2', to: 'p2', active: true, pulseOffset: 0.6 },
  { from: 'b5', to: 'p4', active: true, pulseOffset: 0.8 },
  { from: 'b6', to: 'p1', active: true, pulseOffset: 0.3 },
  { from: 'b6', to: 'p4', active: true, pulseOffset: 0.7 },
  { from: 'b2', to: 'p3', active: true, pulseOffset: 0.5 },
];

export default function ProviderKnowledgeGraph({
  className = '',
  isAr = false,
}: ProviderKnowledgeGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hudTelemetry, setHudTelemetry] = useState({
    cursorX: 0,
    cursorY: 0,
    hoveredNode: null as string | null,
    activePackets: 18,
    throughput: 28.4,
  });

  const mousePosRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const hoveredNodeRef = useRef<GraphNode | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const packetsRef = useRef<SignalPacket[]>([]);

  // Initialize animated packets
  useEffect(() => {
    const packets: SignalPacket[] = [];
    for (let i = 0; i < 22; i++) {
      packets.push({
        edgeIdx: i % EDGES_DATA.length,
        progress: (i / 22),
        speed: 0.003 + Math.random() * 0.004,
        color: i % 3 === 0 ? '#10B981' : i % 5 === 0 ? '#38BDF8' : '#7FB8FF',
        size: 2.2 + Math.random() * 1.5,
      });
    }
    packetsRef.current = packets;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePosRef.current = { x, y };

    // Check hit testing with nodes
    let hit: GraphNode | null = null;
    const w = rect.width;
    const h = rect.height;

    for (const node of NODES_DATA) {
      const nx = node.xPct * w;
      const ny = node.yPct * h;
      const dist = Math.hypot(nx - x, ny - y);
      if (dist < node.radius + 18) {
        hit = node;
        break;
      }
    }

    hoveredNodeRef.current = hit;
    setHudTelemetry((prev) => ({
      ...prev,
      cursorX: Math.round(x),
      cursorY: Math.round(y),
      hoveredNode: hit ? hit.code : null,
    }));
  }, []);

  const handlePointerLeave = useCallback(() => {
    mousePosRef.current = { x: -1000, y: -1000 };
    hoveredNodeRef.current = null;
    setHudTelemetry((prev) => ({
      ...prev,
      hoveredNode: null,
    }));
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Trigger radar ripple
    ripplesRef.current.push({
      x,
      y,
      radius: 4,
      maxRadius: 180,
      alpha: 0.9,
    });

    // Spawn a burst of packets
    for (let i = 0; i < EDGES_DATA.length; i++) {
      packetsRef.current.push({
        edgeIdx: i,
        progress: 0,
        speed: 0.008 + Math.random() * 0.006,
        color: '#38BDF8',
        size: 3,
      });
    }

    // Keep packet list bounded
    if (packetsRef.current.length > 50) {
      packetsRef.current = packetsRef.current.slice(packetsRef.current.length - 35);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(() => updateDimensions());
    resizeObserver.observe(canvas);

    // Pause animation when scrolled offscreen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = (now: number) => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      const dt = (now - lastTime) / 1000;
      lastTime = now;
      frameCount++;

      if (now - lastFpsUpdate > 1000) {
        setHudTelemetry((prev) => ({
          ...prev,
          throughput: +(24 + Math.random() * 8).toFixed(1),
        }));
        lastFpsUpdate = now;
        frameCount = 0;
      }

      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      // 1. Clear background with subtle persistence
      ctx.clearRect(0, 0, W, H);

      // 2. Blueprint 48px Coordinate Grid Lines
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      const gridSize = 48;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Tactical crosshair marks at major intersections
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      for (let x = gridSize * 2; x < W; x += gridSize * 4) {
        for (let y = gridSize * 2; y < H; y += gridSize * 4) {
          ctx.fillRect(x - 3, y, 7, 1);
          ctx.fillRect(x, y - 3, 1, 7);
        }
      }
      ctx.restore();

      // Node coordinates lookup map
      const nodePosMap = new Map<string, { x: number; y: number }>();
      for (const node of NODES_DATA) {
        nodePosMap.set(node.id, {
          x: node.xPct * W,
          y: node.yPct * H,
        });
      }

      const hoveredNode = hoveredNodeRef.current;

      // 3. Render Directed Lineage Lines (Edges)
      ctx.save();
      for (let i = 0; i < EDGES_DATA.length; i++) {
        const edge = EDGES_DATA[i];
        const p1 = nodePosMap.get(edge.from);
        const p2 = nodePosMap.get(edge.to);
        if (!p1 || !p2) continue;

        const isEdgeConnected =
          hoveredNode && (hoveredNode.id === edge.from || hoveredNode.id === edge.to);

        ctx.beginPath();
        ctx.setLineDash([4, 6]);
        ctx.lineWidth = isEdgeConnected ? 2 : 1.25;

        if (isEdgeConnected) {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        } else {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
        }

        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Direction indicator tick
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        ctx.fillStyle = isEdgeConnected ? '#38BDF8' : 'rgba(56, 189, 248, 0.35)';
        ctx.beginPath();
        ctx.arc(midX, midY, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 4. Update and Render Signal Packets
      if (!reduceMotion) {
        ctx.save();
        for (const pkt of packetsRef.current) {
          pkt.progress += pkt.speed;
          if (pkt.progress > 1) {
            pkt.progress = 0;
            pkt.speed = 0.003 + Math.random() * 0.004;
          }

          const edge = EDGES_DATA[pkt.edgeIdx];
          const p1 = nodePosMap.get(edge.from);
          const p2 = nodePosMap.get(edge.to);
          if (!p1 || !p2) continue;

          const px = p1.x + (p2.x - p1.x) * pkt.progress;
          const py = p1.y + (p2.y - p1.y) * pkt.progress;

          // Glowing Packet Bead
          ctx.shadowColor = pkt.color;
          ctx.shadowBlur = 8;
          ctx.fillStyle = pkt.color;
          ctx.beginPath();
          ctx.arc(px, py, pkt.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        ctx.restore();
      }

      // 5. Update and Render Ripples (Radar pings)
      ctx.save();
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rip = ripplesRef.current[i];
        rip.radius += 3.5;
        rip.alpha *= 0.94;

        ctx.strokeStyle = `rgba(56, 189, 248, ${rip.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (rip.alpha < 0.02 || rip.radius > rip.maxRadius) {
          ripplesRef.current.splice(i, 1);
        }
      }
      ctx.restore();

      // 6. Render Nodes & High-Density Telemetry Labels
      for (const node of NODES_DATA) {
        const pos = nodePosMap.get(node.id);
        if (!pos) continue;

        const isNodeHovered = hoveredNode?.id === node.id;
        const isConnectedToHover =
          hoveredNode &&
          EDGES_DATA.some(
            (e) =>
              (e.from === hoveredNode.id && e.to === node.id) ||
              (e.to === hoveredNode.id && e.from === node.id)
          );

        const highlight = isNodeHovered || isConnectedToHover;

        // Outer Target Ring
        ctx.save();
        ctx.lineWidth = highlight ? 2 : 1;
        ctx.strokeStyle = highlight ? node.color : 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, node.radius + (highlight ? 5 : 3), 0, Math.PI * 2);
        ctx.stroke();

        // Inner Solid Core
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = highlight ? 12 : 5;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Status Pulse for active node
        if (node.status === 'MATCHED') {
          const pulse = (Math.sin(now * 0.003 + node.radius) + 1) * 0.5;
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.2 + pulse * 0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, node.radius + 8 + pulse * 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Monospace Entity Code & Tag
        ctx.font = '600 10.5px JetBrains Mono, monospace';
        ctx.textAlign = node.type === 'buyer' ? 'right' : 'left';
        ctx.textBaseline = 'middle';

        const labelOffset = node.type === 'buyer' ? -node.radius - 10 : node.radius + 10;
        const textX = pos.x + labelOffset;

        // Entity ID Badge
        ctx.fillStyle = highlight ? '#FFFFFF' : '#CBD5E1';
        ctx.fillText(node.code, textX, pos.y - 6);

        // Technical Sub-Tag / Mandate
        ctx.font = '500 8.5px JetBrains Mono, monospace';
        ctx.fillStyle = node.type === 'buyer' ? '#38BDF8' : '#10B981';
        const subText = node.budget ? `${node.tag} · ${node.budget}` : node.tag;
        ctx.fillText(subText, textX, pos.y + 7);

        ctx.restore();
      }

      // 7. Cursor Crosshair Overlay when mouse inside
      if (mousePosRef.current.x > 0 && mousePosRef.current.y > 0) {
        ctx.save();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.lineWidth = 0.75;
        ctx.setLineDash([2, 4]);

        const mx = mousePosRef.current.x;
        const my = mousePosRef.current.y;

        ctx.beginPath();
        ctx.moveTo(mx, 0);
        ctx.lineTo(mx, H);
        ctx.moveTo(0, my);
        ctx.lineTo(W, my);
        ctx.stroke();

        ctx.restore();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      dir="ltr"
    >
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        className="w-full h-full block cursor-crosshair"
        aria-label="Interactive GCC Enterprise Knowledge Graph and routing telemetry"
      />

      {/* High-Density Palantir Telemetry HUD (Bottom Edge) */}
      <div className="absolute bottom-3 end-3 sm:bottom-4 sm:end-4 z-20 pointer-events-none">
        <div className="bg-[#0A1020]/90 border border-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-none font-mono text-[10px] sm:text-[11px] text-slate-300 shadow-2xl flex flex-col gap-1 max-w-[280px] sm:max-w-none">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-1.5">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold tracking-wider">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM.ROUTING_ACTIVE
            </span>
            <span className="text-slate-400 text-[9px]">DPR_2.0 // 60FPS</span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[9.5px] text-slate-300 pt-0.5">
            <div>
              <span className="text-slate-500">ENTITIES: </span>
              <span className="text-sky-300 font-medium">10 REGISTERED</span>
            </div>
            <div>
              <span className="text-slate-500">LINEAGES: </span>
              <span className="text-sky-300 font-medium">8 MONITORED</span>
            </div>
            <div>
              <span className="text-slate-500">THROUGHPUT: </span>
              <span className="text-emerald-400 font-medium">{hudTelemetry.throughput} PKT/S</span>
            </div>
            <div>
              <span className="text-slate-500">BANT AUDIT: </span>
              <span className="text-emerald-400 font-medium">100% C-LEVEL</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-1 flex items-center justify-between text-[9px] text-slate-400">
            <span>
              POS:{' '}
              <span className="text-slate-200">
                [{hudTelemetry.cursorX}, {hudTelemetry.cursorY}]
              </span>
            </span>
            {hudTelemetry.hoveredNode ? (
              <span className="text-sky-400 font-semibold">
                LOCK: {hudTelemetry.hoveredNode}
              </span>
            ) : (
              <span className="text-slate-500">CLICK TO DISPATCH RADAR</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
