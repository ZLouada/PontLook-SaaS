'use client';

import React from 'react';
import { m } from 'framer-motion';
import { AlertCircle, TrendingDown, Cpu, ShieldCheck } from 'lucide-react';

interface DiagnosticBoxCardProps {
  isAr?: boolean;
}

/**
 * Card 1: 3D Diagnostic Box with HUD Scanner and 4 Company Problem Callouts
 * Inspired by HIMILAYA.md reference images (3D box + scanner laser + problem popups)
 */
export default function DiagnosticBoxCard({ isAr = false }: DiagnosticBoxCardProps) {
  const problems = [
    {
      id: 'p1',
      icon: AlertCircle,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50/95 border-amber-200/90 text-amber-950',
      title: isAr ? 'فجوة القيادة التنفيذية' : 'Executive Leadership Gap',
      desc: isAr ? 'بطء اتخاذ القرارات C-Suite' : 'Slow C-Suite Decision Velocity',
      position: 'top-1 start-1 sm:top-2 sm:start-2',
    },
    {
      id: 'p2',
      icon: TrendingDown,
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50/95 border-rose-200/90 text-rose-950',
      title: isAr ? 'بطء مسار المبيعات B2B' : 'B2B Sales Velocity Lag',
      desc: isAr ? '-32% إغلاق الصفقات' : '-32% Deal Conversion Pace',
      position: 'top-1 end-1 sm:top-2 end-2 sm:end-2',
    },
    {
      id: 'p3',
      icon: Cpu,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50/95 border-blue-200/90 text-blue-950',
      title: isAr ? 'تأخر التحول الرقمي و AI' : 'Digital & AI Upskilling Gap',
      desc: isAr ? 'نقص المهارات التطبيقية' : 'Applied Tech Capability Lag',
      position: 'bottom-8 start-1 sm:bottom-10 sm:start-2',
    },
    {
      id: 'p4',
      icon: ShieldCheck,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50/95 border-emerald-200/90 text-emerald-950',
      title: isAr ? 'شهادات اعتماد خليجية' : 'Accredited GCC Certs',
      desc: isAr ? 'مستهدفات التوطين 2030' : 'Vision 2030 Standards Missing',
      position: 'bottom-8 end-1 sm:bottom-10 end-2 sm:end-2',
    },
  ];

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-neutral-50/90 via-white to-neutral-50/80 border border-neutral-200/80 p-3 sm:p-5 overflow-hidden font-sans shadow-inner">
      {/* Subtle Blueprint Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Top HUD Diagnostics Header */}
      <div className="relative z-10 flex items-center justify-between pb-2 mb-2 border-b border-neutral-200/70 text-xs">
        <div className="flex items-center gap-1.5 text-neutral-700">
          <span className="font-mono text-[10px] text-neutral-400 font-bold">[ 01_DIAGNOSE ]</span>
          <span className="font-semibold text-[11px] sm:text-xs">
            {isAr ? 'فحص الاحتياج المهاري للمنظمة' : 'Enterprise Skill Diagnostics'}
          </span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-semibold">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span>{isAr ? 'مسح نشط' : 'Scanning Active'}</span>
        </div>
      </div>

      {/* Center 3D Box & Scanner Stage */}
      <div className="relative z-10 h-52 sm:h-60 w-full flex items-center justify-center my-1">
        {/* HUD Corner Target Brackets */}
        <div className="absolute top-2 start-2 w-4 h-4 border-t-2 border-s-2 border-emerald-500/70 rounded-tl pointer-events-none" />
        <div className="absolute top-2 end-2 w-4 h-4 border-t-2 border-e-2 border-emerald-500/70 rounded-tr pointer-events-none" />
        <div className="absolute bottom-2 start-2 w-4 h-4 border-b-2 border-s-2 border-emerald-500/70 rounded-bl pointer-events-none" />
        <div className="absolute bottom-2 end-2 w-4 h-4 border-b-2 border-e-2 border-emerald-500/70 rounded-br pointer-events-none" />

        {/* 3D Isometric Enterprise Box */}
        <div className="relative flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_15px_30px_rgba(20,40,30,0.18)]"
          >
            {/* Box Bottom Shadow */}
            <ellipse cx="100" cy="175" rx="70" ry="18" fill="rgba(0,0,0,0.08)" />

            {/* Isometric Left Face */}
            <polygon
              points="30,85 100,122 100,172 30,135"
              fill="#203E2D"
              stroke="#2B543D"
              strokeWidth="1.5"
            />
            {/* Cut-out handle on left face */}
            <rect
              x="52"
              y="108"
              width="26"
              height="8"
              rx="4"
              transform="skewY(27)"
              fill="#0F1F17"
            />

            {/* Isometric Right Face */}
            <polygon
              points="100,122 170,85 170,135 100,172"
              fill="#2F5B42"
              stroke="#3D7555"
              strokeWidth="1.5"
            />
            {/* Enterprise Crest embossing on right face */}
            <circle
              cx="135"
              cy="128"
              r="14"
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.2"
              strokeDasharray="2 3"
            />
            <path
              d="M 130,128 L 135,123 L 140,128 L 135,133 Z"
              fill="rgba(255,255,255,0.25)"
            />

            {/* Isometric Top Lid */}
            <polygon
              points="100,45 170,82 100,119 30,82"
              fill="#3A6E50"
              stroke="#4D8C67"
              strokeWidth="1.5"
            />
            {/* Lid Lip Highlight */}
            <polygon
              points="100,45 168,81 100,117 32,81"
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.5"
            />
          </svg>

          {/* Animated Glowing Laser Scanner Line */}
          <m.div
            animate={{
              y: [-60, 50, -60],
              opacity: [0.65, 1, 0.65],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_16px_rgba(52,211,153,0.9)] z-20"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 rounded-full bg-white blur-[1px]" />
          </m.div>
        </div>

        {/* 4 Pop-up Problem Callout Comment Badges */}
        {problems.map((prob, idx) => {
          const IconComp = prob.icon;
          return (
            <m.div
              key={prob.id}
              initial={{ opacity: 0, scale: 0.88, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.1, duration: 0.4 }}
              className={`absolute ${prob.position} z-30 max-w-[130px] xs:max-w-[150px] sm:max-w-[170px] p-1.5 sm:p-2 rounded-xl border ${prob.bgColor} shadow-sm backdrop-blur-md transition-transform hover:scale-105`}
            >
              <div className="flex items-start gap-1.5">
                <IconComp size={13} className={`${prob.iconColor} shrink-0 mt-0.5`} />
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-[11px] font-bold leading-tight truncate">
                    {prob.title}
                  </div>
                  <div className="text-[8.5px] sm:text-[9.5px] opacity-75 leading-tight truncate">
                    {prob.desc}
                  </div>
                </div>
              </div>
            </m.div>
          );
        })}
      </div>

      {/* Bottom Diagnosis Verification Pill */}
      <div className="relative z-10 pt-2 border-t border-neutral-200/70 flex items-center justify-center text-center">
        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>{isAr ? 'تم تشخيص احتياجات المنشأة وحصر الفجوات بدقة' : 'Workforce Skill Gaps Successfully Profiled'}</span>
        </span>
      </div>
    </div>
  );
}
