'use client';

import React from 'react';
import { ShieldCheck } from '@/components/icons';

interface LiveEnterpriseStreamProps {
  lang?: string;
}

export default function LiveEnterpriseStream({ lang = 'en' }: LiveEnterpriseStreamProps) {
  const isAr = lang === 'ar';

  const signalsEn = [
    { city: 'Riyadh', country: 'KSA', text: 'Tier-1 Financial Institution scoped 45-seat Executive Leadership Cohort • 3 Vetted Proposals in 32h', badge: 'Active' },
    { city: 'Dubai', country: 'UAE', text: 'Logistics Group matched for Enterprise AI & Automation • 100% Free for Buyer • Vetted Provider SLA: Met', badge: 'Matched' },
    { city: 'Abu Dhabi', country: 'UAE', text: 'Sovereign Energy Entity matched for GRC & Cyber Governance • Scope Confirmed', badge: 'Secured' },
    { city: 'Doha', country: 'Qatar', text: 'National Infrastructure Firm completed 75-seat B2B Sales Transformation RFP', badge: 'Delivered' },
    { city: 'Kuwait City', country: 'Kuwait', text: 'Banking Conglomerate received 3 Accredited Leadership Proposals in 48 Hours', badge: 'Vetted' },
  ];

  const signalsAr = [
    { city: 'الرياض', country: 'السعودية', text: 'مؤسسة مصرفية كبرى تطرح برنامج قيادة تنفيذية لـ 45 مقعداً • 3 عروض معتمدة خلال 32 ساعة', badge: 'نشط' },
    { city: 'دبي', country: 'الإمارات', text: 'مجموعة لوجستية تُطابق احتياج تدريب الذكاء الاصطناعي • مجاني للشركة 100% • تم التحقق', badge: 'تمت المطابقة' },
    { city: 'أبوظبي', country: 'الإمارات', text: 'جهة طاقة استراتيجية تعتمد مزود تدريب معتمد للحوكمة والمخاطر والالتزام', badge: 'مؤكد' },
    { city: 'الدوحة', country: 'قطر', text: 'شركة وطنية كبرى تطلق كراسة تدريب المبيعات والتفاوض لـ 75 متدرباً', badge: 'مكتمل' },
    { city: 'مدينة الكويت', country: 'الكويت', text: 'مجموعة مالية تستلم 3 عروض تدريبية معتمدة ومطابقة للاشتراطات خلال 48 ساعة', badge: 'معتمد' },
  ];

  const signals = isAr ? signalsAr : signalsEn;

  return (
    <div className="w-full overflow-hidden select-none border-y border-white/[0.06] bg-[#0A0B0E]/70 backdrop-blur-md py-2.5">
      <div className="relative flex items-center">
        {/* Continuous Running Marquee */}
        <div className="flex animate-marquee shrink-0 items-center gap-6 text-xs font-mono text-neutral-400 whitespace-nowrap pause-on-hover">
          {signals.concat(signals).map((item, index) => (
            <div
              key={`${item.city}-${index}`}
              className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-semibold text-neutral-200">
                {item.city} ({item.country})
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-300">{item.text}</span>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck size={10} />
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
