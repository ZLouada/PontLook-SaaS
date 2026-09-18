'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;

        return (
          <Reveal key={i} delay={i * 0.03}>
            <div
              className={`border rounded-2xl transition-all duration-300 overflow-hidden group ${
                isOpen
                  ? 'bg-[#16171B] border-white/30 shadow-md'
                  : 'bg-[#0F1013] border-[#26282D] shadow-sm hover:border-white/20'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                id={`faq-header-${i}`}
                className="w-full text-start flex items-center justify-between gap-4 p-5 sm:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-2xl cursor-pointer"
              >
                <div className="flex gap-4 items-center min-w-0 pe-2">
                  <span
                    className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-colors duration-300 ${
                      isOpen
                        ? 'bg-white text-black shadow-sm'
                        : 'bg-[#16171B] border border-[#26282D] text-white group-hover:bg-white/[0.10]'
                    }`}
                  >
                    <HelpCircle size={20} strokeWidth={2} />
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-white leading-snug font-heading">
                    {faq.question}
                  </h3>
                </div>
                <span
                  className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 ${
                    isOpen ? 'bg-white/[0.10] text-white' : 'text-neutral-500 group-hover:text-neutral-300'
                  }`}
                >
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ease-in-out ${
                      isOpen ? 'rotate-180' : 'rotate-0'
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
                  <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-6 text-neutral-300 font-sans leading-relaxed text-base sm:text-lg sm:ps-[4.5rem]">
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
