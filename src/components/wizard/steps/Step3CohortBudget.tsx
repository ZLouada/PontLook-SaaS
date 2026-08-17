'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Users,
  Calendar,
  DollarSign,
  HelpCircle,
  Check,
  Zap,
} from 'lucide-react';
import {
  COHORT_SIZES,
  TIMELINES,
  BUDGET_BANDS,
  step3CohortBudgetSchema,
  type Step3Data,
  type WizardData,
} from '../schemas';
import { StepNavigation } from '../fields';

type Step3Props = {
  data: WizardData;
  onNext: (values: Step3Data, e?: React.BaseSyntheticEvent | React.MouseEvent | React.FormEvent) => void;
  onBack: (e?: React.MouseEvent) => void;
  isSubmitting?: boolean;
};

export default function Step3CohortBudget({ data, onNext, onBack, isSubmitting }: Step3Props) {
  // Mapping legacy values if any
  const initialCohort =
    data.cohortSize ||
    (data.employeesToTrain
      ? Number(data.employeesToTrain) <= 5
        ? '1_5_execs'
        : Number(data.employeesToTrain) <= 20
        ? '6_20_team'
        : Number(data.employeesToTrain) <= 50
        ? '21_50_dept'
        : '50_plus_enterprise'
      : '6_20_team');

  const initialTimeline = data.timeline || 'within_30_days';

  const initialBudget =
    data.budgetBand ||
    (data.budgetRange?.includes('Under $10,000')
      ? 'under_10k'
      : data.budgetRange?.includes('$10,000 – $25,000')
      ? '10k_25k'
      : data.budgetRange?.includes('$25,000 – $50,000')
      ? '25k_50k'
      : data.budgetRange?.includes('$50,000') || data.budgetRange?.includes('$100,000+')
      ? '50k_plus'
      : '10k_25k');

  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3CohortBudgetSchema),
    defaultValues: {
      cohortSize: initialCohort,
      timeline: initialTimeline,
      budgetBand: initialBudget,
      additionalContext: data.additionalContext || data.biggestChallenge || '',
    },
  });

  const selectedCohort = watch('cohortSize');
  const selectedTimeline = watch('timeline');
  const selectedBudget = watch('budgetBand');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit((values) => onNext(values, e))(e);
      }}
      noValidate
      className="space-y-8"
    >
      {/* 1. Cohort Size */}
      <section className="space-y-3">
        <div>
          <div className="flex items-center gap-2">
            <Users size={20} className="text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              Target Cohort Size
            </h2>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            How many participants or leaders will be trained in this intake cycle?
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {COHORT_SIZES.map((size) => {
            const isSelected = selectedCohort === size.id;
            return (
              <button
                key={size.id}
                type="button"
                onClick={() => setValue('cohortSize', size.id as any, { shouldValidate: true })}
                aria-pressed={isSelected}
                className={`relative flex flex-col justify-between rounded-2xl border p-4 text-start transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600 dark:border-blue-500 dark:bg-blue-950/40'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {size.label}
                    </span>
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white dark:border-slate-700'
                      }`}
                    >
                      {isSelected && <Check size={10} strokeWidth={3} />}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                    {size.sublabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        {errors.cohortSize && (
          <p className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
            {errors.cohortSize.message}
          </p>
        )}
      </section>

      {/* 2. Target Start Horizon */}
      <section className="space-y-3">
        <div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Target Start Horizon
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
            When do you expect instruction or onboarding to commence?
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINES.map((t) => {
            const isSelected = selectedTimeline === t.id;
            const isUrgent = t.id === 'immediate';

            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setValue('timeline', t.id as any, { shouldValidate: true })}
                className={`relative flex flex-col justify-between rounded-xl border p-4 text-start transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600 dark:border-blue-500 dark:bg-blue-950/40'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {t.label}
                    </span>
                    {isUrgent && (
                      <Zap size={14} className="text-amber-500" />
                    )}
                  </div>
                  <span className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {t.priority}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        {errors.timeline && (
          <p className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
            {errors.timeline.message}
          </p>
        )}
      </section>

      {/* 3. Budget Selector (Tiered Bands to Prevent Sticker Shock) */}
      <section className="space-y-3">
        <div>
          <div className="flex items-center gap-2">
            <DollarSign size={18} className="text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Estimated Budget Allocation (USD)
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
            Helps us shortlist providers within your approved procurement tier.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BUDGET_BANDS.map((band) => {
            const isSelected = selectedBudget === band.id;
            const isGuidance = band.id === 'pending_guidance';

            return (
              <button
                key={band.id}
                type="button"
                onClick={() => setValue('budgetBand', band.id as any, { shouldValidate: true })}
                className={`relative flex flex-col justify-between rounded-xl border p-4 text-start transition-all ${
                  isGuidance ? 'sm:col-span-2 lg:col-span-3' : ''
                } ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600 dark:border-blue-500 dark:bg-blue-950/40'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                      {isGuidance && <HelpCircle size={15} className="text-blue-600" />}
                      <span className="text-sm">{band.label}</span>
                    </div>
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white dark:border-slate-700'
                      }`}
                    >
                      {isSelected && <Check size={10} strokeWidth={3} />}
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {band.sublabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        {errors.budgetBand && (
          <p className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
            {errors.budgetBand.message}
          </p>
        )}
      </section>

      {/* Optional Context */}
      <section>
        <label
          htmlFor="additionalContext"
          className="mb-1.5 flex items-center justify-between text-sm font-semibold text-slate-800 dark:text-slate-200"
        >
          <span>Specific Outcomes or KPIs to Target</span>
          <span className="text-xs font-normal text-slate-400">Optional</span>
        </label>
        <textarea
          id="additionalContext"
          rows={3}
          placeholder="e.g., We need to reduce manager turnover by 20%, prepare directors for Vision 2030 initiatives, or align sales teams with enterprise bidding..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
          {...register('additionalContext')}
        />
      </section>

      {/* Navigation */}
      <StepNavigation
        onBack={onBack}
        nextLabel="Continue to Enterprise Verification"
        isSubmitting={isSubmitting}
        trustMessage="Zero obligation · Free for corporate buyers"
      />
    </form>
  );
}
