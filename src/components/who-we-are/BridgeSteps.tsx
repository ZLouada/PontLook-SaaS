'use client';

import React from 'react';
import { m } from 'framer-motion';
import { Search, ShieldCheck, Handshake, ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';

interface BridgeStepsProps {
  lang?: Locale;
}

export default function BridgeSteps({ lang = 'en' }: BridgeStepsProps) {
  const isAr = lang === 'ar';

  const steps = [
    {
      num: '01',
      icon: Search,
      title: isAr ? 'رصد الاحتياج' : 'Spot the need',
      desc: isAr
        ? 'تحديد المنظمات الخليجية التي تواجه تحديات حقيقية في كفاءة الموظفين (دوران العمل، فجوات القيادة، تبني الذكاء الاصطناعي، الامتثال، والتوطين).'
        : 'Market intelligence identifies GCC organisations facing real workforce challenges (turnover, leadership gaps, AI adoption, compliance, Saudization/Emiratization).',
    },
    {
      num: '02',
      icon: ShieldCheck,
      title: isAr ? 'التحقق والتوثيق' : 'Verify it',
      desc: isAr
        ? 'نؤكد التحدي المؤسسي ونتحقق من صلاحية صاحب القرار والميزانية المعتمدة والجدول الزمني.'
        : 'We confirm the business pain and validate the decision-maker, budget and timeline.',
    },
    {
      num: '03',
      icon: Handshake,
      title: isAr ? 'المطابقة والربط' : 'Match and connect',
      desc: isAr
        ? 'يتم ترشيح وربط المزود الأنسب للمهمة وتقديمه بفرصة تدريبية مؤهلة ومصنفة بدقة.'
        : 'The right provider is matched and introduced, with a graded, qualified opportunity.',
    },
  ];

  return (
    <section
      data-nav-light="true"
      className="relative bg-[#F4F7FF]/50 text-[#0F172A] py-24 sm:py-32 border-b border-slate-200/80 overflow-hidden"
    >
      <div className="container-site max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2451BF] mb-2 block font-heading">
            {isAr ? 'آلية العمل' : 'HOW THE BRIDGE WORKS'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#191D42] mb-4 font-heading">
            {isAr ? 'كيف يعمل الجسر' : 'How the Bridge Works'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {isAr
              ? 'الربط المباشر بين شركاء التدريب والمؤسسات الخليجية في 3 خطوات واضحة.'
              : 'Direct connection between training partners and GCC enterprises in 3 clear steps.'}
          </p>
        </div>

        {/* Visual Bridge Line (Desktop) */}
        <div className="relative mb-8">
          <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] -translate-y-1/2 h-1 bg-gradient-to-r from-[#2451BF]/20 via-[#3D7BFF] to-[#10B981]/30 z-0">
            {/* Moving glowing particle along the bridge line */}
            <m.div
              animate={{ left: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#2451BF] shadow-[0_0_12px_#3D7BFF] border-2 border-white -ml-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-[#2451BF]/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="w-10 h-10 rounded-xl bg-[#2451BF]/10 text-[#2451BF] flex items-center justify-center font-bold text-sm">
                        {step.num}
                      </span>
                      <Icon size={22} className="text-[#3D7BFF]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#191D42] mb-2.5 font-heading">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bank labels showing the two sides of the bridge */}
        <div className="hidden md:flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 mt-4">
          <span className="flex items-center gap-1.5 text-[#2451BF]">
            <span>{isAr ? 'مزودو التدريب' : 'Training Providers (West Bank)'}</span>
          </span>
          <span className="flex items-center gap-1.5 text-[#10B981]">
            <span>{isAr ? 'الشركات والمؤسسات' : 'GCC Enterprises (East Bank)'}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
