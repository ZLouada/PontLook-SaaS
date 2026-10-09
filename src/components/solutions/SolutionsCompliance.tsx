'use client';

import React from 'react';
import { ShieldCheck, BadgeCheck, Lock, Globe } from '@/components/icons';

interface SolutionsComplianceProps {
  lang: string;
  isAr: boolean;
}

export default function SolutionsCompliance({ lang, isAr }: SolutionsComplianceProps) {
  return (
    <section className="py-20 sm:py-28 lg:py-32 border-b border-white/10 bg-black relative">
      <div className="container-site max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-400 mb-3 sm:mb-4">
            {isAr ? 'الامتثال والحوكمة الإقليمية' : 'SOVEREIGN GCC GOVERNANCE'}
          </div>
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08]">
            {isAr
              ? 'مواءمة تامة مع مستهدفات التوطين والأنظمة الخليجية'
              : 'Built for GCC Regulatory Realities & National Visions'}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            {isAr
              ? 'صممت منظومة PontLook لتلائم الخصوصية التنظيمية في المملكة العربية السعودية ودولة الإمارات، بما يضمن احتساب البرامج التدريبية وتوافقها مع المعايير الحكومية الرسمية.'
              : 'PontLook operates with direct alignment to the national workforce development frameworks of Saudi Arabia and the UAE, ensuring compliant, accredited corporate training delivery.'}
          </p>
        </div>

        {/* 3 Compliance Pillars */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Saudi Arabia Pillar */}
          <div className="rounded-2xl border border-white/15 bg-[#0A0B0D] p-6 sm:p-8 space-y-4">
            <div className="h-10 w-10 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-heading text-xl font-bold text-white">
              {isAr ? 'المملكة العربية السعودية · رؤية 2030' : 'Saudi Arabia · Vision 2030'}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              {isAr
                ? 'مواءمة مع مستهدفات التوطين (نطاقات)، معايير المؤسسة العامة للتدريب التقني والمهني (TVTC)، وبرنامج تنمية القدرات البشرية لضمان أثر تدريبي حقيقي.'
                : 'Direct alignment with Saudization (Nitaqat) requirements, TVTC accreditation benchmarks, and the Human Capability Development Program (HCDP).'}
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-neutral-400">
              <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10">TVTC Aligned</span>
              <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10">Nitaqat Ready</span>
            </div>
          </div>

          {/* UAE Pillar */}
          <div className="rounded-2xl border border-white/15 bg-[#0A0B0D] p-6 sm:p-8 space-y-4">
            <div className="h-10 w-10 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center">
              <Globe size={20} />
            </div>
            <h3 className="font-heading text-xl font-bold text-white">
              {isAr ? 'الإمارات العربية المتحدة · برنامج نافس' : 'UAE · Nafis & KHDA Frameworks'}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              {isAr
                ? 'تسهيل برامج تدريب وتأهيل الكوادر الإماراتية متوافقة مع متطلبات وزارة الموارد البشرية والتوطين (MOHRE) وهيئة المعرفة والتنمية البشرية في دبي (KHDA).'
                : 'Fully integrated with Emiratization quotas, Nafis capability pathways, and certification standards recognized by KHDA Dubai and ADEK Abu Dhabi.'}
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-neutral-400">
              <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10">KHDA Standards</span>
              <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10">Nafis Integrated</span>
            </div>
          </div>

          {/* Enterprise Privacy Pillar */}
          <div className="rounded-2xl border border-white/15 bg-[#0A0B0D] p-6 sm:p-8 space-y-4">
            <div className="h-10 w-10 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center">
              <Lock size={20} />
            </div>
            <h3 className="font-heading text-xl font-bold text-white">
              {isAr ? 'السرية وحوكمة البيانات المؤسسية' : 'Enterprise Confidentiality & NDA'}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              {isAr
                ? 'حماية تامة لهوية المنشآت وتحديات المهارات. لا يتم الكشف عن تفاصيل طلبك التدريبي إلا للمزودين المعتمدين الذين تختار التواصل معهم بمحض إرادتك.'
                : 'Strict double-blind matching and enterprise-grade confidentiality. Your organization’s identity and data remain completely concealed until you accept an introduction.'}
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-neutral-400">
              <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10">Enterprise NDA</span>
              <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10">Zero Data Resale</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
