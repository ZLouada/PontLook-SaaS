'use client';

import React from 'react';
import {
  ShieldCheck,
  Lock,
  BadgeCheck,
} from 'lucide-react';

const ACCREDITATIONS = [
  { name: 'SHRM', desc: 'Recertification Aligned' },
  { name: 'PMI', desc: 'PMP / Authorized Partner' },
  { name: 'ICF', desc: 'Executive Coaching' },
  { name: 'ATD', desc: 'Talent Development' },
  { name: 'ILM', desc: 'Leadership & Mgmt' },
] as const;

export function TrustBadges() {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl border border-[#26282D] bg-[#16171B] px-4 py-2.5 text-center text-xs text-neutral-300 shadow-sm">
        <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
          <ShieldCheck size={15} />
          <span>Enterprise Confidentiality Guarantee</span>
        </div>
        <span className="hidden text-neutral-600 sm:inline">•</span>
        <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
          <Lock size={12} className="text-neutral-500" />
          <span>Aligned with KSA Personal Data Protection Law (PDPL) & GCC Corporate Data Standards</span>
        </div>
      </div>

      <div className="rounded-xl border border-[#26282D] bg-[#16171B] p-4">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
            <BadgeCheck size={16} className="text-white" />
            <span>Network Faculty Standards & Accreditations</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {ACCREDITATIONS.map((acc) => (
              <div
                key={acc.name}
                className="group flex items-center gap-1.5 rounded-lg border border-[#26282D] bg-[#0F1013] px-2.5 py-1 text-xs shadow-xs transition-colors hover:border-white/20"
                title={`${acc.name} · ${acc.desc}`}
              >
                <span className="font-semibold tracking-normal text-white">
                  {acc.name}
                </span>
                <span className="text-[10px] text-neutral-500">
                  {acc.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrustBadges;
