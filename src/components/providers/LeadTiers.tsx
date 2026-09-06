'use client';

import React from 'react';
import Link from 'next/link';

const TIERS = [
  {
    step: 'Step 1',
    badge: 'Hot · 95% Match',
    title: 'High-intent enterprise demand with confirmed budget',
    description: 'Verified decision-maker, confirmed budget, starts within 30 days.',
    project: 'Riyadh Enterprise · Project #01',
    accuracy: '95%',
    barColor: 'bg-blue-600',
    barWidth: 'w-[95%]',
    checklist: [
      'Verified Decision-Maker (CHRO)',
      'Confirmed Budget (SAR 300k+)',
      'Immediate 30-Day Window'
    ]
  },
  {
    step: 'Step 2',
    badge: 'Warm · 80% Match',
    title: 'Confirmed workforce pain; budget & timeline forming',
    description: 'Confirmed pain and authority; budget or timeline still forming. We stay engaged to pass the lead when ready.',
    project: 'Dubai Enterprise · Project #02',
    accuracy: '80%',
    barColor: 'bg-amber-500',
    barWidth: 'w-[80%]',
    checklist: [
      'Executive Authority Validated',
      '500+ Enterprise Workforce',
      'Budget Staged for Q3'
    ]
  },
  {
    step: 'Step 3',
    badge: 'Qualified · 60% Match',
    title: 'Genuine need verified; earlier in the buying journey',
    description: 'Genuine need verified; earlier in the buying journey.',
    project: 'Doha Enterprise · Project #03',
    accuracy: '60%',
    barColor: 'bg-blue-500',
    barWidth: 'w-[60%]',
    checklist: [
      'Strategic Training Need Identified',
      'Banking & Financial Sector',
      'Early Positioning Window'
    ]
  },
  {
    step: 'Step 4',
    badge: 'Partnership Model',
    title: 'Explore the partnership: Predictable enterprise client pipeline',
    description: 'Every lead is verified before introduction. Zero monthly retainers, 5-lead proof-of-concept pilot, and a 5-day replacement guarantee.',
    project: 'GCC Provider Partnership',
    accuracy: '100% Guaranteed',
    barColor: 'bg-emerald-500',
    barWidth: 'w-full',
    checklist: [
      'Pay-Per-Qualified-Lead ($0 Retainer)',
      'Direct Access to C-Suite & HR Directors',
      'Full Lead Intelligence Report Included'
    ],
    isCtaCard: true
  }
];

export default function LeadTiers(_props?: { dict?: any; lang?: string; showSignals?: boolean }) {
  return (
    <section className="py-20 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white tracking-tight">
            A predictable pipeline of enterprise opportunities
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
            Every lead is scored on decision-maker verification, company size, budget, timeline, and depth of need, so you always know exactly what you&apos;re walking into.
          </p>
        </div>

        {/* Sticky Stacked Cards Container */}
        <div className="relative space-y-8 pb-16">
          {TIERS.map((tier, idx) => {
            const zIndex = (idx + 1) * 10;
            // Stagger the sticky top position slightly so cards stack cleanly
            const topOffset = 110 + idx * 12;

            return (
              <div
                key={tier.step}
                style={{
                  top: `${topOffset}px`,
                  zIndex: zIndex
                }}
                className="sticky rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] p-6 sm:p-10 transition-transform duration-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Details */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                        {tier.step}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {tier.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight leading-snug">
                      {tier.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {tier.description}
                    </p>

                    <div className="pt-2">
                      {tier.isCtaCard ? (
                        <Link
                          href="/en/for-providers#apply"
                          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white font-medium shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all"
                        >
                          Apply for partnership →
                        </Link>
                      ) : (
                        <Link
                          href="/en/for-providers#apply"
                          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 transition-all"
                        >
                          Explore the partnership →
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Right Preview Card */}
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 p-6 space-y-4">
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                        {tier.project}
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          <span>Match Accuracy</span>
                          <span>{tier.accuracy}</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div className={`h-full rounded-full ${tier.barColor} ${tier.barWidth}`} />
                        </div>
                      </div>

                      <ul className="space-y-2.5 pt-2 text-xs text-slate-700 dark:text-slate-300">
                        {tier.checklist.map((item, cIdx) => (
                          <li key={cIdx} className="flex items-center gap-2">
                            <span className="flex-shrink-0 text-emerald-600 dark:text-emerald-400">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
