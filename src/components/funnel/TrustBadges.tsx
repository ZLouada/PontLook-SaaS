'use client';

import React from 'react';
import {
  ShieldCheck,
  Lock,
  Award,
  CheckCircle2,
  Building,
  Globe2,
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
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 text-center text-xs text-slate-600 shadow-sm">
        <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
          <ShieldCheck size={15} />
          <span>Enterprise Confidentiality Guarantee</span>
        </div>
        <span className="hidden text-slate-300 sm:inline">•</span>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <Lock size={12} className="text-slate-400" />
          <span>Aligned with KSA Personal Data Protection Law (PDPL) & GCC Corporate Data Standards</span>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/60 bg-slate-50/70 p-4">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Award size={16} className="text-blue-600" />
            <span>Network Faculty Standards & Accreditations</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {ACCREDITATIONS.map((acc) => (
              <div
                key={acc.name}
                className="group flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs shadow-xs transition-colors hover:border-blue-400"
                title={`${acc.name} - ${acc.desc}`}
              >
                <span className="font-semibold tracking-normal text-slate-800">
                  {acc.name}
                </span>
                <span className="text-[10px] text-slate-400">
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
