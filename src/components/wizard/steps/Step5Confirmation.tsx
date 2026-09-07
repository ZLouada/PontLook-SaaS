'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  MailCheck,
  ShieldCheck,
  Download,
  FileText,
  Building2,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import {
  TRAINING_DOMAINS,
  DELIVERY_MODES,
  COHORT_SIZES,
  TIMELINES,
  BUDGET_BANDS,
  type WizardData,
} from '../schemas';
import { resolveDomainLabel } from '../trainingDomains';

type Step5Props = {
  data: WizardData;
  onReset?: () => void;
};

export default function Step5Confirmation({ data }: Step5Props) {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const selectedDomainNames = React.useMemo(() => {
    if (data.selectedDomains) {
      if (Array.isArray(data.selectedDomains)) {
        return data.selectedDomains.map((item) => {
          if (item === 'other') return data.otherDomainText ? `Specialized: ${data.otherDomainText}` : 'Other Specialized';
          return resolveDomainLabel(item);
        }).filter(Boolean);
      }
      if (typeof data.selectedDomains === 'object') {
        const labels: string[] = [];
        data.selectedDomains.categories?.forEach((c) => labels.push(resolveDomainLabel(c)));
        data.selectedDomains.subDomains?.forEach((s) => labels.push(resolveDomainLabel(s)));
        if (labels.length > 0) return labels;
      }
    }
    return (data.domains || [])
      .map((dId) => {
        if (dId === 'other') return data.otherDomainText ? `Specialized: ${data.otherDomainText}` : 'Other Specialized';
        return resolveDomainLabel(dId) || TRAINING_DOMAINS.find((t) => t.id === dId)?.title || dId;
      })
      .filter(Boolean);
  }, [data.selectedDomains, data.domains, data.otherDomainText]);

  const deliveryModeName =
    DELIVERY_MODES.find((m) => m.id === data.deliveryMode)?.title ||
    data.deliveryMode ||
    'In-Person';

  const cohortName =
    COHORT_SIZES.find((c) => c.id === data.cohortSize)?.label ||
    data.cohortSize ||
    '6–20 Team Members';

  const timelineName =
    TIMELINES.find((t) => t.id === data.timeline)?.label ||
    data.timeline ||
    'Within 30 Days';

  const budgetName =
    BUDGET_BANDS.find((b) => b.id === data.budgetBand)?.label ||
    data.budgetBand ||
    '$10,000 – $25,000';

  const handleDownloadReport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      const reportContent = `PONTLOOK GCC CORPORATE TRAINING BENCHMARK REPORT (2026 EDITION)
================================================================================
Generated for: ${data.fullName || 'Executive Leader'} (${data.jobTitle || 'Executive'})
Organization: ${data.organizationName || 'GCC Enterprise'}
Email: ${data.workEmail || 'N/A'}
Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

MATCHED INTAKE SPECIFICATIONS:
- Target Domains: ${selectedDomainNames.join(', ') || 'Executive Leadership'}
- Delivery Format: ${deliveryModeName} ${data.city ? `(${data.city})` : ''}
- Target Cohort: ${cohortName}
- Horizon: ${timelineName}
- Budget Tier: ${budgetName}

EXECUTIVE SUMMARY & 2026 BENCHMARK HIGHLIGHTS:
1. GCC Corporate Training ROI:
   - Tailored cohort programs yield 3.4x higher knowledge retention over off-the-shelf catalog training.
   - 78% of Saudi & UAE enterprise buyers prioritize bilingual (Arabic & English) senior facilitators.

2. Price & Duration Benchmarks:
   - Executive Leadership Intensives (1-5 CXOs): Average market rate $18,000 – $35,000.
   - AI & Tech Transformations: Average market rate $25,000 – $65,000 across GCC regional hubs.
   - GRC & Board Governance: Highly localized accreditation requirements (SAMA/CMA/ADGM).

3. Next Milestone:
   - Your PontLook Matching Concierge is currently reviewing provider capacity and SLAs.
   - 2 to 3 itemized proposals will arrive at ${data.workEmail || 'your work email'} within 48 hours.

Thank you for choosing PontLook.com - The GCC Corporate Training Matchmaking Network.
`;
      const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `PontLook_2026_GCC_Training_Benchmark_Report_${(data.organizationName || 'Enterprise').replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1000);
  };

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="rounded-3xl border border-emerald-200 bg-gradient-to-b from-emerald-50/90 to-teal-50/40 p-6 text-center sm:p-8">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-300/80 bg-white px-4 py-1.5 shadow-sm">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Matching in Progress · 120+ Vetted GCC Providers
          </span>
        </div>

        <h2 className="font-heading mt-5 text-2xl font-semibold tracking-normal text-slate-800 sm:text-3xl">
          Enterprise Scope Received. Matching Begins Now.
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
          Thank you, <strong className="text-slate-800">{data.fullName || 'Leader'}</strong>. Your training specifications for <strong className="text-slate-800">{data.organizationName || 'your organization'}</strong> have been prioritized in our qualification queue.
        </p>

        <div className="mt-8 grid gap-4 text-start sm:grid-cols-3">
          <div className="relative rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock size={20} />
            </div>
            <div className="mt-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                Milestone 1 · Within 24 Hours
              </span>
              <h3 className="font-heading mt-0.5 text-sm font-semibold text-slate-800">
                Partner Availability Check
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Our GCC matching team audits trainer accreditations and schedule slots.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <MailCheck size={20} />
            </div>
            <div className="mt-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
                Milestone 2 · Within 48 Hours
              </span>
              <h3 className="font-heading mt-0.5 text-sm font-semibold text-slate-800">
                2–3 Itemized Proposals
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Receive customized syllabi, pricing breakdown, and lead instructor bios.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck size={20} />
            </div>
            <div className="mt-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                Milestone 3 · Zero Obligation
              </span>
              <h3 className="font-heading mt-0.5 text-sm font-semibold text-slate-800">
                Instructor Interview & Terms
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Interview lead facilitators before committing. 100% free service for companies.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-7">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <FileText size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-800">
                  Instant Executive Resource
                </span>
                <span className="text-xs text-slate-400">PDF Report</span>
              </div>
              <h3 className="font-heading mt-1 text-base font-semibold text-slate-800">
                PontLook 2026 GCC Corporate Training Benchmark Report
              </h3>
              <p className="mt-0.5 text-xs text-slate-600">
                Comprehensive data on enterprise training rates, instructor accreditations, and Saudization/Emiratization ROI.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownloadReport}
            disabled={downloading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-xs font-bold text-white shadow transition-all hover:bg-slate-800 active:scale-[0.99] sm:w-auto"
          >
            {downloading ? (
              <span>Preparing Report...</span>
            ) : downloadSuccess ? (
              <>
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Downloaded Successfully</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span>Download Report (PDF)</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/70 bg-slate-50/70 p-6 sm:p-7">
        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-slate-600">
          Submitted Request Scope
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200/70 bg-white p-3.5 shadow-sm">
            <span className="text-[11px] font-medium text-slate-400">Training Domains</span>
            <p className="mt-1 text-xs font-semibold text-slate-800">
              {selectedDomainNames.join(', ') || 'Leadership Development'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/70 bg-white p-3.5 shadow-sm">
            <span className="text-[11px] font-medium text-slate-400">Format & Location</span>
            <p className="mt-1 text-xs font-semibold text-slate-800">
              {deliveryModeName} {data.city ? `· ${data.city}` : ''}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/70 bg-white p-3.5 shadow-sm">
            <span className="text-[11px] font-medium text-slate-400">Cohort Scale & Horizon</span>
            <p className="mt-1 text-xs font-semibold text-slate-800">
              {cohortName} · {timelineName}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/70 bg-white p-3.5 shadow-sm">
            <span className="text-[11px] font-medium text-slate-400">Budget Tier</span>
            <p className="mt-1 text-xs font-semibold text-slate-800">
              {budgetName}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/70 bg-white p-3.5 shadow-sm">
            <span className="text-[11px] font-medium text-slate-400">Organization</span>
            <p className="mt-1 text-xs font-semibold text-slate-800">
              {data.organizationName || 'N/A'} · {data.country || 'GCC'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200/70 bg-white p-3.5 shadow-sm">
            <span className="text-[11px] font-medium text-slate-400">Verification Email</span>
            <p className="mt-1 text-xs font-semibold text-slate-800">
              {data.workEmail || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          <span>← Back to PontLook Home</span>
        </Link>

        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span>Need immediate assistance?</span>
          <Link
            href="/contact"
            className="font-semibold text-slate-800 underline hover:text-blue-600"
          >
            Contact Matching Desk
          </Link>
        </div>
      </div>
    </m.div>
  );
}
