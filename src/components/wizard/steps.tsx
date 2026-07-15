'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  budgetRanges, challengesList, countries, deliveryFormats, employeeRanges, industriesList,
  languages, orgStages, step1Schema, step2Schema, step3Schema, step4Schema, step5Schema,
  trainingTypes,
  type Step1, type Step2, type Step3, type Step4, type Step5, type WizardData,
} from './schemas';
import { SelectField, StepNav, TextArea, TextField } from './fields';

type StepProps<T> = {
  data: WizardData;
  onNext: (values: T) => void;
  onBack?: () => void;
};

export function CompanyStep({ data, onNext }: StepProps<Step1>) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step1>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      companyName: data.companyName ?? '',
      website: data.website ?? '',
      country: data.country,
      city: data.city ?? '',
      industry: data.industry,
      employees: data.employees,
    },
  });
  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Company name" placeholder="Your company" registration={register('companyName')} error={errors.companyName} />
        <TextField label="Website" placeholder="https://…" registration={register('website')} error={errors.website} />
        <SelectField label="Country" options={countries} registration={register('country')} error={errors.country} />
        <TextField label="City" placeholder="e.g., Riyadh" registration={register('city')} error={errors.city} />
        <SelectField label="Industry" options={industriesList} registration={register('industry')} error={errors.industry} />
        <SelectField label="Number of employees" options={employeeRanges} registration={register('employees')} error={errors.employees} />
      </div>
      <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true" tabIndex={-1}>
        <input type="text" {...register('_honeypot')} tabIndex={-1} autoComplete="off" />
      </div>
      <StepNav />
    </form>
  );
}

export function DecisionMakerStep({ data, onNext, onBack }: StepProps<Step2>) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step2>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      fullName: data.fullName ?? '',
      jobTitle: data.jobTitle ?? '',
      email: data.email ?? '',
      phone: data.phone ?? '',
    },
  });
  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" placeholder="Your name" registration={register('fullName')} error={errors.fullName} />
        <TextField label="Job title" placeholder="e.g., HR Director" registration={register('jobTitle')} error={errors.jobTitle} />
        <TextField label="Business email" type="email" placeholder="you@company.com" registration={register('email')} error={errors.email} />
        <TextField label="Phone" type="tel" placeholder="+966 …" registration={register('phone')} error={errors.phone} />
      </div>
      <StepNav onBack={onBack} />
    </form>
  );
}

export function ChallengesStep({ data, onNext, onBack }: StepProps<Step3>) {
  const { handleSubmit, setValue, watch, formState: { errors } } = useForm<Step3>({
    resolver: zodResolver(step3Schema),
    defaultValues: { challenges: data.challenges ?? [] },
  });
  const selected = watch('challenges');
  const toggle = (c: (typeof challengesList)[number]) => {
    const next = selected.includes(c) ? selected.filter((x) => x !== c) : [...selected, c];
    setValue('challenges', next, { shouldValidate: true });
  };
  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <fieldset>
        <legend className="field-label mb-3">Select every challenge that applies</legend>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {challengesList.map((c) => {
            const active = selected.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggle(c)}
                aria-pressed={active}
                className={`rounded-2xl border px-3 py-3 text-sm font-medium transition-all ${
                  active
                    ? 'border-primary bg-primary text-white shadow-glass'
                    : 'border-slate-200 bg-white text-body hover:border-primary-300 hover:bg-primary-50/50'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
        {errors.challenges && <p className="field-error" role="alert">{errors.challenges.message}</p>}
      </fieldset>
      <StepNav onBack={onBack} />
    </form>
  );
}

export function ScopeStep({ data, onNext, onBack }: StepProps<Step4>) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step4>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      trainingType: data.trainingType,
      deliveryFormat: data.deliveryFormat,
      language: data.language,
      employeesToTrain: data.employeesToTrain ?? '',
      startDate: data.startDate ?? '',
      budgetRange: data.budgetRange,
    },
  });
  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField label="Training type" options={trainingTypes} registration={register('trainingType')} error={errors.trainingType} />
        <SelectField label="Delivery format" options={deliveryFormats} registration={register('deliveryFormat')} error={errors.deliveryFormat} />
        <SelectField label="Preferred language" options={languages} registration={register('language')} error={errors.language} />
        <TextField label="Employees to train" type="number" placeholder="e.g., 40" registration={register('employeesToTrain')} error={errors.employeesToTrain} />
        <TextField label="Preferred start date" type="date" registration={register('startDate')} error={errors.startDate} />
        <SelectField label="Budget range (USD)" options={budgetRanges} registration={register('budgetRange')} error={errors.budgetRange} />
      </div>
      <StepNav onBack={onBack} />
    </form>
  );
}

export function MatchingStep({ data, onNext, onBack }: StepProps<Step5>) {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<Step5>({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      workedBefore: data.workedBefore,
      whatWasMissing: data.whatWasMissing ?? '',
      successDefinition: data.successDefinition ?? '',
      industryExperience: data.industryExperience,
      orgStage: data.orgStage,
      biggestChallenge: data.biggestChallenge ?? '',
      notes: data.notes ?? '',
    },
  });
  const workedBefore = watch('workedBefore');
  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <div className="space-y-6">
        <fieldset>
          <legend className="field-label">Have you worked with a training provider before?</legend>
          <div className="mt-1 flex gap-3">
            {(['yes', 'no'] as const).map((v) => (
              <label key={v} className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium has-[:checked]:border-primary has-[:checked]:bg-primary-50">
                <input type="radio" value={v} {...register('workedBefore')} className="accent-[#2451BF]" />
                {v === 'yes' ? 'Yes' : 'No'}
              </label>
            ))}
          </div>
          {errors.workedBefore && <p className="field-error" role="alert">{errors.workedBefore.message}</p>}
        </fieldset>

        {workedBefore === 'yes' && (
          <TextArea
            label="What was missing from that experience?"
            optional
            rows={3}
            placeholder="What would you want done differently this time?"
            registration={register('whatWasMissing')}
            error={errors.whatWasMissing}
          />
        )}

        <TextArea
          label="How will you define success for this training?"
          rows={3}
          placeholder="e.g., Middle managers retain top performers and run effective 1:1s within 6 months…"
          registration={register('successDefinition')}
          error={errors.successDefinition}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="industryExperience" className="field-label">Provider industry experience</label>
            <select id="industryExperience" className="field-input" {...register('industryExperience')}>
              <option value="">Select…</option>
              <option value="required">Must have experience in our industry</option>
              <option value="preferred">Preferred, not essential</option>
              <option value="flexible">Flexible — expertise matters most</option>
            </select>
            {errors.industryExperience && <p className="field-error" role="alert">{errors.industryExperience.message}</p>}
          </div>
          <SelectField label="Organization stage" options={orgStages} registration={register('orgStage')} error={errors.orgStage} />
        </div>

        <TextArea
          label="What’s the biggest challenge behind this request?"
          rows={4}
          placeholder="The more context you share, the better your matches will be…"
          registration={register('biggestChallenge')}
          error={errors.biggestChallenge}
        />

        <TextArea
          label="Anything else the provider should know?"
          optional
          rows={3}
          registration={register('notes')}
          error={errors.notes}
        />
      </div>
      <StepNav onBack={onBack} isSubmitting={isSubmitting} nextLabel="Submit assessment" />
    </form>
  );
}
