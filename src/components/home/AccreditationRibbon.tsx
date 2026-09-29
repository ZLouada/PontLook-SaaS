'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { BadgeCheck, ShieldCheck } from '@/components/icons';
import Marquee from '@/components/shared/Marquee';

interface AccreditationItem {
  id: string;
  nameEn: string;
  nameAr: string;
  badgeEn: string;
  badgeAr: string;
  code: string;
}

const ACCREDITATIONS: AccreditationItem[] = [
  {
    id: 'tvtc',
    nameEn: 'Technical & Vocational Training Corp',
    nameAr: 'المؤسسة العامة للتدريب التقني والمهني',
    badgeEn: 'Saudi Regulatory Body',
    badgeAr: 'المملكة العربية السعودية',
    code: 'TVTC',
  },
  {
    id: 'khda',
    nameEn: 'Knowledge & Human Development Authority',
    nameAr: 'هيئة المعرفة والتنمية البشرية',
    badgeEn: 'Dubai Government',
    badgeAr: 'حكومة دبي',
    code: 'KHDA',
  },
  {
    id: 'hrdf',
    nameEn: 'Human Resources Development Fund',
    nameAr: 'صندوق تنمية الموارد البشرية (هدف)',
    badgeEn: 'KSA Subsidy Aligned',
    badgeAr: 'دعم وتمكين الكفاءات',
    code: 'HRDF',
  },
  {
    id: 'actvet',
    nameEn: 'Abu Dhabi Vocational Education & Training',
    nameAr: 'مركز أبوظبي للتعليم والتدريب التقني والمهني',
    badgeEn: 'Abu Dhabi Regulatory',
    badgeAr: 'إمارة أبوظبي',
    code: 'ACTVET',
  },
  {
    id: 'shrm',
    nameEn: 'Society for Human Resource Management',
    nameAr: 'الجمعية الأمريكية لإدارة الموارد البشرية',
    badgeEn: 'Global HR Benchmark',
    badgeAr: 'اعتماد دولي للموارد البشرية',
    code: 'SHRM',
  },
  {
    id: 'pmi',
    nameEn: 'Project Management Institute',
    nameAr: 'معهد إدارة المشاريع العالمي',
    badgeEn: 'PMP & Agile Standards',
    badgeAr: 'المعايير الدولية للمشاريع',
    code: 'PMI',
  },
  {
    id: 'iso',
    nameEn: 'ISO 9001:2015 Quality Management',
    nameAr: 'معيار الجودة العالمي آيزو 9001',
    badgeEn: 'Quality Assurance',
    badgeAr: 'ضمان جودة الأداء',
    code: 'ISO 9001',
  },
  {
    id: 'atd',
    nameEn: 'Association for Talent Development',
    nameAr: 'الجمعية الأمريكية لتطوير المواهب',
    badgeEn: 'Executive L&D Benchmark',
    badgeAr: 'معيار تنمية المواهب التنفيذية',
    code: 'ATD',
  },
];

export default function AccreditationRibbon() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

  const badgeCards = ACCREDITATIONS.map((item) => (
    <div
      key={item.id}
      className="group flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all shadow-sm"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#16171B] border border-white/10 text-white font-mono text-[10px] font-bold shrink-0">
        {item.code.slice(0, 4)}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-white whitespace-nowrap">
            {isAr ? item.nameAr : item.nameEn}
          </span>
          <BadgeCheck size={12} className="text-emerald-400 shrink-0" />
        </div>
        <span className="text-[10px] text-neutral-400 block whitespace-nowrap font-mono">
          {isAr ? item.badgeAr : item.badgeEn}
        </span>
      </div>
    </div>
  ));

  return (
    <div className="w-full overflow-hidden py-3 border-y border-white/[0.06] bg-black/30">
      <div className="container-site max-w-6xl mx-auto px-4 sm:px-6 mb-2.5 flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
          <ShieldCheck size={13} className="text-neutral-400" />
          <span>{isAr ? 'الهيئات والمعايير المعتمدة لشبكتنا بالخليج:' : 'GCC & Global Regulatory Frameworks Aligned:'}</span>
        </span>
      </div>
      <Marquee items={badgeCards} duration={40} reverse={isAr} gap={16} />
    </div>
  );
}
