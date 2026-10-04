'use client';

import React from 'react';
import { User } from 'lucide-react';
import type { Locale } from '@/i18n/config';

interface TeamSectionProps {
  lang?: Locale;
}

// TODO: Replace with verified team member profiles and headshots
const TEAM = [
  {
    name: 'Executive Leadership',
    nameAr: 'القيادة التنفيذية',
    title: 'Managing Director & Founder',
    titleAr: 'المدير التنفيذي والمؤسس',
    bio: 'Guiding corporate matchmaking strategy and enterprise enterprise partnerships across Riyadh and Dubai.',
    bioAr: 'قيادة استراتيجية التوفيق المؤسسي وتوسيع الشراكات عبر الرياض ودبي.',
  },
  {
    name: 'Workforce Diagnostics Lead',
    nameAr: 'مسؤول تشخيص الكفاءات',
    title: 'Head of Enterprise Research',
    titleAr: 'رئيس أبحاث كفاءات المؤسسات',
    bio: 'Validating corporate training mandates and evaluating cohort capability deficits before outreach.',
    bioAr: 'التحقق من الاحتياجات التدريبية وتشخيص فجوات الأداء قبل التوفيق.',
  },
  {
    name: 'Provider Relations Lead',
    nameAr: 'مسؤول شبكة مزودي التدريب',
    title: 'Head of Accreditation & Matching',
    titleAr: 'رئيس الاعتماد وشبكة الشركاء',
    bio: 'Curating elite training firms and ensuring seamless delivery alignment with GCC clients.',
    bioAr: 'اعتماد بيوت الخبرة التدريبية وضمان مواءمة التنفيذ مع متطلبات المنشآت.',
  },
];

export default function TeamSection({ lang = 'en' }: TeamSectionProps) {
  const isAr = lang === 'ar';

  return (
    <section
      data-nav-light="true"
      className="relative bg-white text-[#0F172A] py-24 sm:py-32 border-b border-slate-100 overflow-hidden"
    >
      <div className="container-site max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2451BF] mb-2 block font-heading">
            {isAr ? 'فريق العمل' : 'OUR TEAM'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#191D42] mb-4 font-heading">
            {isAr ? 'فريق يقوده الالتزام بالنتائج' : 'Built by operators, guided by outcomes'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {isAr
              ? 'فريق متخصص يجمع بين الخبرة الاستشارية العميقة وفهم التحديات المؤسسية في الخليج.'
              : 'A dedicated team combining deep workforce diagnostics with regional GCC execution expertise.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-7 text-center shadow-xs hover:shadow-md transition-all duration-300"
            >
              {/* Photo placeholder with avatar icon */}
              <div className="w-20 h-20 mx-auto rounded-full bg-slate-200/80 text-slate-500 flex items-center justify-center mb-5 border-2 border-white shadow-xs">
                <User size={32} />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#191D42] mb-1 font-heading">
                {isAr ? member.nameAr : member.name}
              </h3>
              <p className="text-xs font-semibold text-[#2451BF] tracking-wide mb-3">
                {isAr ? member.titleAr : member.title}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {isAr ? member.bioAr : member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
