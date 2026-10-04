'use client';

import React from 'react';
import {
  ShieldCheck,
  UserCheck,
  Award,
  CircleDollarSign,
  Compass,
  Handshake,
} from 'lucide-react';
import type { Locale } from '@/i18n/config';

interface PrinciplesGridProps {
  lang?: Locale;
}

export default function PrinciplesGrid({ lang = 'en' }: PrinciplesGridProps) {
  const isAr = lang === 'ar';

  const principles = [
    {
      icon: ShieldCheck,
      title: isAr ? 'موثق، وليس افتراضاً' : 'Verified, not assumed',
      desc: isAr
        ? 'نتحقق من الاحتياج التدريبي الفعلي مع قيادات الموارد البشرية قبل التقديم لأي مزود.'
        : 'We confirm actual training requirements directly with HR leadership before matching.',
    },
    {
      icon: UserCheck,
      title: isAr ? 'صناع القرار فقط' : 'Decision-makers only',
      desc: isAr
        ? 'نتعامل حصرياً مع مديري التدريب ورؤساء الموارد البشرية الذين يملكون سلطة التعاقد.'
        : 'We interface exclusively with HR directors and executives who hold commissioning authority.',
    },
    {
      icon: Award,
      title: isAr ? 'الأثر قبل الكمية' : 'Outcome over volume',
      desc: isAr
        ? 'نفضل ترشيح فرصتين مؤكدتين وناجحتين على إرسال مئات العملاء المحتملين غير المؤهلين.'
        : 'We prioritize 2-3 verified, high-fit opportunities over blasting hundreds of dead-end leads.',
    },
    {
      icon: CircleDollarSign,
      title: isAr ? 'تسعير شفاف (الدفع عند التأهيل)' : 'Transparent pricing (pay per lead)',
      desc: isAr
        ? 'لا رسوم تسجيل ولا اشتراكات مفروضة؛ الاستثمار مرتبط مباشرة بجودة الفرصة المعتمدة.'
        : 'No platform listing fees or hidden charges; invest only in confirmed, verified mandates.',
    },
    {
      icon: Compass,
      title: isAr ? 'خبرة خليجية متخصصة' : 'GCC-first expertise',
      desc: isAr
        ? 'فهم عميق لمتطلبات التوطين، وأولويات رؤية 2030، والتحول المؤسسي في المنطقة.'
        : 'Deep alignment with regional workforce mandates, Vision 2030 priorities, and local compliance.',
    },
    {
      icon: Handshake,
      title: isAr ? 'شراكة حقيقية، لا رسوم شهرية' : 'Partnership, not retainers',
      desc: isAr
        ? 'ننجح فقط عندما يبرم المزود شراكة تدريبية ناجحة ذات أثر ملموس مع المؤسسة.'
        : 'We succeed only when an impactful, lasting partnership is established between both parties.',
    },
  ];

  return (
    <section
      data-nav-light="true"
      className="relative bg-[#F8FAFC] text-[#0F172A] py-24 sm:py-32 border-b border-slate-200/80 overflow-hidden"
    >
      <div className="container-site max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2451BF] mb-2 block font-heading">
            {isAr ? 'قيمنا ومبادئنا' : 'OUR PRINCIPLES'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#191D42] mb-4 font-heading">
            {isAr ? 'المبادئ التي تقود عملنا' : 'Principles that guide our bridge'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {isAr
              ? 'معايير عمل واضحة وصارمة بنيت عليها منصة بونت لوك منذ يومها الأول.'
              : 'Clear and uncompromising standards that govern every single connection we curate.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-[#2451BF]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#2451BF]/10 text-[#2451BF] flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#191D42] mb-2 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
