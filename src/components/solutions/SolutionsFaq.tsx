'use client';

import React, { useState } from 'react';
import { ChevronDown } from '@/components/icons';

interface SolutionsFaqProps {
  lang: string;
  isAr: boolean;
}

export default function SolutionsFaq({ lang, isAr }: SolutionsFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qEn: 'How can the platform be 100% free for corporate buyers?',
      qAr: 'كيف تقدم المنصة خدمتها مجاناً بنسبة ١٠٠٪ للشركات؟',
      aEn:
        'PontLook charges zero platform access fees, retainers, or markup to organizations seeking training. Accredited training providers fund the matching ecosystem through a performance-based fee for receiving qualified executive introductions. This aligns incentives completely: we only succeed when the match creates genuine value.',
      aAr:
        'لا تتقاضى PontLook أي رسوم اشتراك أو عمولات مضافة من المنشآت الطالبة للتدريب. يدعم مزودو التدريب المنظومة من خلال دفع رسوم أداء عند استلام فرص عملاء مؤهلة ومباشرة، مما يضمن توافق المصالح وعدم وجود أي تكلفة على المشتري.',
    },
    {
      qEn: 'What is the relationship between this Solution page and the Extension tracks?',
      qAr: 'ما هي العلاقة بين هذه الصفحة العامة والمسارات التخصصية (الامتدادات)؟',
      aEn:
        'This page explains the core bilateral matchmaking architecture that powers PontLook. The two specialized extensions branch from this core: the Enterprise Track (/find-training) serves corporate HR leaders and buyers, while the Provider Track (/for-providers) serves accredited training institutes and academies.',
      aAr:
        'توضح هذه الصفحة الهيكلية الكلية لمنظومة المطابقة التي ترتكز عليها PontLook. يتفرع من هذه الهيكلية مساران تخصصيان: مسار الشركات (/find-training) المخصص لمديري الموارد البشرية، ومسار المزودين (/for-providers) المخصص للأكاديميات ومراكز التدريب.',
    },
    {
      qEn: 'How are training providers vetted and accredited?',
      qAr: 'كيف يتم التحقق من جودة واعتمادات مزودي التدريب؟',
      aEn:
        'We enforce strict entry standards: providers must hold regional certifications (e.g. TVTC in Saudi Arabia, KHDA in the UAE) or verified international credentials, demonstrate a proven track record delivering corporate cohorts, and maintain certified facilitators who understand GCC business nuances.',
      aAr:
        'نطبق معايير تدقيق صارمة: يجب أن يحمل المزود تراخيص معتمدة (مثل TVTC في السعودية أو KHDA في الإمارات)، وأن يمتلك سجلاً حافلاً في تدريب الشركات الكبرى، مع توفر مدربين معتمدين يفهمون ثقافة بيئة العمل الخليجية.',
    },
    {
      qEn: 'What is the turnaround time from request submission to proposal delivery?',
      qAr: 'ما هو الوقت المستغرق من تقديم الطلب حتى استلام العروض؟',
      aEn:
        'Our standard service level agreement is 48 business hours. After a brief 60-second diagnostic intake, our team reviews the brief and matches you with exactly 3 pre-vetted proposals tailored to your budget and objectives.',
      aAr:
        'اتفاقية مستوى الخدمة المعتمدة لدينا هي ٤٨ ساعة عمل. بمجرد إرسال الاحتياج خلال 60 ثانية، يقوم فريقنا بدراسة المتطلبات وموافاتها بـ 3 عروض دقيقة ومخصصة لميزانيتكم وأهدافكم.',
    },
    {
      qEn: 'What happens after an enterprise chooses a proposal?',
      qAr: 'ماذا يحدث بعد أن تختار المنشأة أحد العروض التدريبية؟',
      aEn:
        'Once you approve a proposal, you are introduced directly to the leadership of the training academy to align on syllabus customization, schedules, and contracting. PontLook steps aside from billing, taking 0% commission from the delivery.',
      aAr:
        'بمجرد موافقتك على العرض، يتم ربطك مباشرة بقيادة المركز التدريبي للاتفاق على تخصيص المحتوى والجدول الزمني وتوقيع العقد. تبتعد PontLook عن الفواتير ولا تقتطع أي عمولة على التنفيذ.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 lg:py-32 border-b border-white/10 bg-black relative">
      <div className="container-site max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-400 mb-3 sm:mb-4">
            {isAr ? 'الأسئلة الشائعة حول المنظومة' : 'FREQUENTLY ASKED QUESTIONS'}
          </div>
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white leading-tight">
            {isAr ? 'كل ما تحتاج معرفته عن الحل' : 'Everything You Need to Know'}
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-[#0A0B0D] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-start p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <span className="font-heading font-semibold text-base sm:text-lg text-white">
                    {isAr ? faq.qAr : faq.qEn}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal border-t border-white/5">
                    {isAr ? faq.aAr : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
