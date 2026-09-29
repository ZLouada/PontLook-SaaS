'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown } from '@/components/icons';
import Reveal from '@/components/shared/Reveal';
import IconFrame from '@/components/shared/IconFrame';

export interface FAQItem {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
}

interface FAQAccordionProps {
  faqs?: FAQItem[];
  items?: FAQItem[];
}

export default function FAQAccordion({ faqs, items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const rawList = faqs || items || [];
  const normalizedFaqs = rawList.map((f) => ({
    question: f.question || f.q || '',
    answer: f.answer || f.a || '',
  }));

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-3.5">
      {normalizedFaqs.map((faq, i) => {
        const isOpen = openIndex === i;

        return (
          <Reveal key={i} delay={i * 0.03}>
            <div
              className={`relative border rounded-2xl transition-all duration-300 overflow-hidden group ${
                isOpen
                  ? 'bg-[#131418] border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_12px_32px_-8px_rgba(0,0,0,0.7)]'
                  : 'bg-[#0F1013] border-[#26282D] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] hover:border-white/20 hover:bg-[#121317]'
              }`}
            >
              {/* Luminous left accent line on expanded state */}
              {isOpen && (
                <div className="absolute start-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-[#FF5C00] via-amber-400 to-[#0052FF] shadow-[0_0_10px_rgba(255,92,0,0.6)]" />
              )}

              <button
                type="button"
                onClick={() => toggleFaq(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                id={`faq-header-${i}`}
                className="w-full text-start flex items-center justify-between gap-4 p-5 sm:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-2xl cursor-pointer"
              >
                <div className="flex gap-3.5 sm:gap-4 items-center min-w-0 pe-2">
                  <IconFrame
                    variant={isOpen ? 'brand' : 'default'}
                    size="sm"
                    className="shrink-0 transition-transform duration-300 group-hover:scale-105"
                  >
                    <HelpCircle size={17} strokeWidth={2} />
                  </IconFrame>
                  <h3 className={`text-base sm:text-lg font-semibold leading-snug font-heading transition-colors duration-200 ${isOpen ? 'text-white' : 'text-neutral-200 group-hover:text-white'}`}>
                    {faq.question}
                  </h3>
                </div>
                <span
                  className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? 'bg-white/[0.12] border-white/20 text-white'
                      : 'bg-white/[0.03] border-white/5 text-neutral-500 group-hover:border-white/15 group-hover:text-neutral-300'
                  }`}
                >
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ease-in-out ${
                      isOpen ? 'rotate-180 text-white' : 'rotate-0'
                    }`}
                  />
                </span>
              </button>

              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-header-${i}`}
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-6 text-neutral-300 font-sans leading-relaxed text-sm sm:text-base sm:ps-[4.25rem] border-t border-white/[0.04]">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
