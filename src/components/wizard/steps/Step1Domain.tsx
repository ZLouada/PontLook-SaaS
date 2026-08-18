'use client';

import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Search,
  Check,
  Crown,
  TrendingUp,
  Cpu,
  ShieldAlert,
  Kanban,
  Sliders,
  Sparkles,
  X,
  Layers,
} from 'lucide-react';
import {
  TRAINING_DOMAINS,
  step1DomainSchema,
  type Step1Data,
  type WizardData,
  type TrainingDomainItem,
} from '../schemas';
import { StepNavigation } from '../fields';

const iconMap = {
  Crown,
  TrendingUp,
  Cpu,
  ShieldAlert,
  Kanban,
  Sliders,
};

const SUGGESTED_OTHER_TOPICS = [
  'Supply Chain & Procurement',
  'HR Analytics & Strategic Workforce Planning',
  'Cybersecurity & ISO 27001',
  'Customer Experience (CX) Transformation',
  'Design Thinking & Product Innovation',
  'Healthcare Quality & JCI Accreditation',
];

type Step1Props = {
  data: WizardData;
  onNext: (values: Step1Data, e?: React.BaseSyntheticEvent | React.MouseEvent | React.FormEvent) => void;
  isSubmitting?: boolean;
};

export default function Step1Domain({ data, onNext, isSubmitting }: Step1Props) {
  const [searchQuery, setSearchQuery] = useState('');

  // Map legacy data if exists
  const initialDomains = useMemo(() => {
    if (data.domains && data.domains.length > 0) return data.domains;
    if (data.trainingType) {
      if (data.trainingType.includes('Leadership')) return ['executive_leadership'];
      if (data.trainingType.includes('Sales')) return ['b2b_sales'];
      if (data.trainingType.includes('AI')) return ['ai_data_tech'];
      if (data.trainingType.includes('Compliance')) return ['grc_compliance'];
    }
    return [];
  }, [data.domains, data.trainingType]);

  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1DomainSchema),
    defaultValues: {
      domains: initialDomains,
      otherDomainText: data.otherDomainText || data.challenges?.[0] || '',
    },
  });

  const selectedDomains = watch('domains') || [];
  const isOtherSelected = selectedDomains.includes('other');

  const toggleDomain = (domainId: string) => {
    const next = selectedDomains.includes(domainId)
      ? selectedDomains.filter((id) => id !== domainId)
      : [...selectedDomains, domainId];
    setValue('domains', next, { shouldValidate: true });
  };

  const filteredDomains = useMemo(() => {
    if (!searchQuery.trim()) return TRAINING_DOMAINS;
    const q = searchQuery.toLowerCase().trim();
    return TRAINING_DOMAINS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit((values) => onNext(values, e))(e);
      }}
      noValidate
      className="space-y-6"
    >
      {/* Header section */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            What training domains do you need?
          </h2>
          {selectedDomains.length > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <Sparkles size={13} />
              {selectedDomains.length} {selectedDomains.length === 1 ? 'domain' : 'domains'} selected
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-slate-600">
          Select all target capabilities for your enterprise cohort. We’ll match specialized GCC providers with proven ROI.
        </p>
      </div>

      {/* Real-time search filter */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 text-slate-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search topics e.g. "PMP", "Vision 2030", "Generative AI", "Commercial Sales", "GRC"...'
          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 ps-11 pe-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Domains interactive multi-select grid */}
      <div className="space-y-3">
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDomains.map((domain: TrainingDomainItem) => {
            const isSelected = selectedDomains.includes(domain.id);
            const IconComponent = iconMap[domain.iconName] || Layers;

            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => toggleDomain(domain.id)}
                aria-pressed={isSelected}
                className={`group relative flex flex-col justify-between rounded-2xl border p-5 text-start transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                  isSelected
                    ? 'border-blue-600 bg-gradient-to-b from-blue-50/80 to-blue-50/30 shadow-md ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'
                      }`}
                    >
                      <IconComponent size={22} />
                    </div>

                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected ? (
                        <Check size={14} strokeWidth={3} />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-transparent" />
                      )}
                    </div>
                  </div>

                  <h3 className="mt-3.5 text-base font-bold text-slate-900">
                    {domain.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {domain.subtitle}
                  </p>
                </div>

                {/* Quick keyword preview */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {domain.keywords.slice(0, 3).map((kw) => (
                    <span
                      key={kw}
                      className={`rounded-md px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                        isSelected
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {filteredDomains.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-sm font-semibold text-slate-700">
              No standard catalog match for &quot;{searchQuery}&quot;
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Select &quot;Other Specialized Domain&quot; below to enter your custom topic or framework.
            </p>
            <button
              type="button"
              onClick={() => {
                if (!selectedDomains.includes('other')) {
                  setValue('domains', [...selectedDomains, 'other'], { shouldValidate: true });
                }
                setValue('otherDomainText', searchQuery, { shouldValidate: true });
                setSearchQuery('');
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-blue-700"
            >
              <Sliders size={14} />
              <span>Add &quot;{searchQuery}&quot; as Specialized Topic</span>
            </button>
          </div>
        )}

        {errors.domains && (
          <p className="text-xs font-medium text-red-600" role="alert">
            {errors.domains.message}
          </p>
        )}
      </div>

      {/* Inline custom topic input if 'other' is selected */}
      {isOtherSelected && (
        <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-blue-600" />
            <h4 className="text-sm font-bold text-slate-900">
              Specify Custom Training Topic or Industry Certification
            </h4>
          </div>
          <p className="mt-1 text-xs text-slate-600">
            Provide the exact framework, technical skill, or business objective you need covered:
          </p>

          <div className="mt-3">
            <input
              type="text"
              placeholder="e.g., ESG Reporting Frameworks, Supply Chain Optimization, Lean Six Sigma..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              {...register('otherDomainText')}
            />
            {errors.otherDomainText && (
              <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
                {errors.otherDomainText.message}
              </p>
            )}
          </div>

          {/* Quick chip suggestions */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-medium text-slate-500">Suggestions:</span>
            {SUGGESTED_OTHER_TOPICS.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setValue('otherDomainText', topic, { shouldValidate: true })}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:border-blue-400 hover:bg-blue-50"
              >
                + {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <StepNavigation
        nextLabel="Continue to Delivery & Region"
        isSubmitting={isSubmitting}
        trustMessage="Verified GCC providers · 100% Free for hiring enterprises"
      />
    </form>
  );
}
