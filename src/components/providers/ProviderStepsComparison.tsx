'use client';

import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Zap,
  ShieldCheck,
  User,
  FileText,
  Handshake,
  HelpCircle,
  XCircle,
} from '@/components/icons';
import Spotlight from '@/components/shared/Spotlight';
import TextReveal from '@/components/shared/TextReveal';
import CardTilt3D from '@/components/shared/CardTilt3D';
import BorderGlow from '@/components/shared/BorderGlow';
import { viewportOnce } from '@/lib/motion';

interface ProviderStepsComparisonProps {
  lang: string;
}

export default function ProviderStepsComparison({ lang }: ProviderStepsComparisonProps) {
  const isAr = lang === 'ar';
  const reduce = useReducedMotion();

  const pontLookSteps = [
    {
      step: '01',
      title: isAr ? 'الملف التعريفي والقدرات' : 'Profile & Specialties Setup',
      desc: isAr
        ? 'تسجيل تخصصات الميسرين، اعتمادات المدربين، والمدن التي تغطيها برامجكم المؤسسية.'
        : 'Specify certified trainers, verified subject disciplines, and delivery capabilities.',
      icon: User,
    },
    {
      step: '02',
      title: isAr ? 'مطابقة الاحتياج المؤسسي والتحقق' : 'Matching & Verification',
      desc: isAr
        ? 'خوارزمية ذكية تطابق احتياج كبرى الشركات المعتمد مع تخصصك وخبراتك السابقة.'
        : 'Engine matches verified enterprise briefs with validated budget directly to your profile.',
      icon: ShieldCheck,
    },
    {
      step: '03',
      title: isAr ? 'تقديم مباشر لصانع القرار' : 'Direct Warm Introduction',
      desc: isAr
        ? 'ربط مباشر بمدراء الموارد البشرية والتدريب مع كراسة متطلبات واضحة وجدول زمني محدد.'
        : 'Instant connect to CHROs and L&D directors with scoped needs and decision timelines.',
      icon: Handshake,
    },
    {
      step: '04',
      title: isAr ? 'تقديم العرض وإتمام التعاقد' : 'Proposal Delivery & Deal Closed',
      desc: isAr
        ? 'تقديم كراسة العرض المتخصصة، توقيع عقد التدريب، والاحتفاظ بـ 100% من أتعاب التدريب.'
        : 'Present itemized proposal, close the contract, and keep 100% of your training fees.',
      icon: FileText,
    },
  ];

  const traditionalSteps = [
    {
      step: '01',
      title: isAr ? 'تنقيب بارد ورسائل جماعية' : 'Cold Outreach & Mass Messaging',
      desc: isAr
        ? 'إرسال مئات الرسائل الباردة عبر لينكدإن بمعدل استجابة لا يتعدى 2%.'
        : 'Cold emailing hundreds of generic contacts with less than 2% open rates.',
    },
    {
      step: '02',
      title: isAr ? 'حواجز المساعدين والمماطلة' : 'Gatekeepers & Bureaucracy',
      desc: isAr
        ? 'التفاوض مع موظفين غير مخولين بدون صلاحيات اتخاذ قرار حقيقي أو ميزانية.'
        : 'Bouncing between assistants and gatekeepers who lack genuine budget authority.',
    },
    {
      step: '03',
      title: isAr ? 'اجتماعات استكشافية غير مجدية' : 'Endless Unbudgeted Calls',
      desc: isAr
        ? 'استنزاف أسابيع في اجتماعات مبدئية مع جهات لم تعتمد ميزانيتها التدريبية بعد.'
        : 'Wasting weeks on discovery calls with organizations with unconfirmed budgets.',
    },
    {
      step: '04',
      title: isAr ? 'تأخيرات المشتريات والتجاهل' : 'Procurement Delays & Ghosting',
      desc: isAr
        ? 'انتظار طويل وتجميد للمشاريع، مع احتمالية عالية للتجاهل المفاجئ بعد تقديم العروض.'
        : 'Protracted RFP cycles, internal re-prioritization, and frequent vendor ghosting.',
    },
  ];

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300 text-xs font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00]" />
          <span>{isAr ? 'مسار العمل والسرعة' : 'DELIVERY COMPARISON'}</span>
        </div>

        <TextReveal
          as="h2"
          text={
            isAr
              ? 'مع PontLook في أيام معدودة، وليس شهوراً من الانتظار'
              : 'With PontLook in Days, Not Months of Outreach'
          }
          className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-heading tracking-tight leading-tight"
        />

        <p className="text-xs xs:text-sm sm:text-base text-neutral-400 font-sans max-w-2xl mx-auto leading-relaxed">
          {isAr
            ? 'قارن بين رحلة الاستحواذ على العملاء المؤسسيين عبر PontLook مقارنة بالأساليب التقليدية المرهقة.'
            : 'Compare direct enterprise deal closure through PontLook versus the painful cycle of traditional sales outreach.'}
        </p>
      </div>

      {/* 2-Column Comparison Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* Left Column: With PontLook (5-8 Days) */}
        <div className="lg:col-span-7">
          <CardTilt3D maxTilt={3} className="h-full">
            <Spotlight
              radius={400}
              className="relative h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-orange-500/30 bg-gradient-to-b from-[#131419] to-[#0A0B0E] p-5 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(255,92,0,0.06),inset_0_1px_0_0_rgba(255,255,255,0.12)] flex flex-col justify-between"
            >
              <BorderGlow glowColor="rgba(255, 92, 0, 0.25)" size={280} opacity={0.6} />

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-[#FF5C00]/40 text-[#FF5C00] text-xs font-bold tracking-wide uppercase">
                      <Zap size={13} className="text-[#FF5C00]" />
                      <span>{isAr ? 'مع PontLook' : 'With PontLook'}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      {isAr ? '٥ - ٨ أيام فقط' : '5–8 Days'}
                    </span>
                  </div>

                  <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline">
                    {isAr ? 'طلب مؤكد ومباشر' : 'Direct Qualified Demand'}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading">
                  {isAr
                    ? 'خطوات مباشرة وسلسة للتعاقد المؤسسي'
                    : 'Streamlined Pipeline to Signed Deals'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mb-8 font-sans">
                  {isAr
                    ? 'بدون مكالمات باردة أو رسائل تسويقية؛ نربطك بصناع القرار الجاهزين للتعاقد فوراً.'
                    : 'Zero cold calling. We introduce you directly to active enterprise buyers with defined scope.'}
                </p>

                {/* Vertical Timeline Steps */}
                <div className="relative space-y-6 sm:space-y-7 before:absolute before:top-3 before:bottom-3 before:start-4 before:w-[2px] before:bg-gradient-to-b before:from-[#FF5C00] before:via-orange-500/40 before:to-emerald-500/60">
                  {pontLookSteps.map((st, idx) => {
                    const IconComponent = st.icon;
                    return (
                      <m.div
                        key={st.step}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, x: isAr ? 12 : -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={viewportOnce}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                        className="relative flex items-start gap-4 ps-2 sm:ps-3"
                      >
                        {/* Timeline Node */}
                        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#16171B] border border-[#FF5C00]/50 text-[#FF5C00] shadow-md shadow-orange-500/20">
                          <IconComponent size={15} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#FF5C00]">
                              {st.step}
                            </span>
                            <h4 className="text-sm sm:text-base font-semibold text-white">
                              {st.title}
                            </h4>
                          </div>
                          <p className="mt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                            {st.desc}
                          </p>
                        </div>
                      </m.div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Guarantee Micro-banner */}
              <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#FF5C00]" />
                  <span>{isAr ? 'ضمان استبدال الفرصة بنسبة 100%' : '100% Replacement Guarantee SLA'}</span>
                </div>
                <span className="font-mono text-[#FF5C00] font-semibold text-[11px] sm:text-xs">
                  {isAr ? 'صفر عمولة على أتعابك' : '0% Cut on Training Fees'}
                </span>
              </div>
            </Spotlight>
          </CardTilt3D>
        </div>

        {/* Right Column: The Traditional Way (45+ Days) */}
        <div className="lg:col-span-5">
          <div className="h-full rounded-2xl sm:rounded-3xl border border-[#202227] bg-[#0A0B0D] p-5 sm:p-8 flex flex-col justify-between opacity-85 hover:opacity-100 transition-opacity">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-400 text-xs font-medium uppercase">
                    <Clock size={13} className="text-neutral-500" />
                    <span>{isAr ? 'الطريقة التقليدية' : 'The Traditional Way'}</span>
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-400">
                  {isAr ? '٤٥ - ٩٠ يوماً' : '45–90 Days'}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-neutral-300 mb-2 font-heading">
                {isAr ? 'تنقيب يدوي وجهود تسويقية منهكة' : 'Slow, Uncertain Cold Outreach'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mb-7 font-sans">
                {isAr
                  ? 'مئات الساعات المهدرة في البحث والاتصالات الباردة مع جهات غير جادة.'
                  : 'Dozens of lost hours chasing unqualified leads with unpredictable conversion.'}
              </p>

              {/* Traditional Steps with subtle strikethrough/dim style */}
              <div className="space-y-5">
                {traditionalSteps.map((ts) => (
                  <div key={ts.step} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-neutral-500 text-xs font-mono">
                      {ts.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <XCircle size={13} className="text-red-400/80 shrink-0" />
                        <h4 className="text-xs sm:text-sm font-medium text-neutral-300">
                          {ts.title}
                        </h4>
                      </div>
                      <p className="mt-0.5 text-xs text-neutral-500 leading-normal font-sans">
                        {ts.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Friction summary */}
            <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-neutral-500">
              <HelpCircle size={14} className="text-amber-500 shrink-0" />
              <span>
                {isAr
                  ? 'معدل استنزاف مرتفع لفريق المبيعات وتكلفة استحواذ غير متوقعة.'
                  : 'High sales fatigue, long sales cycles, and unpredictable customer acquisition cost.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
