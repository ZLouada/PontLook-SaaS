'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, Sparkles } from '@/components/icons';
import { PONTLOOK_CATEGORIES } from '@/constants/categories';

interface SidebarLeadFormProps {
  isAr?: boolean;
  defaultCategory?: string;
  sourceArticleTitle?: string;
}

export function SidebarLeadForm({
  isAr = false,
  defaultCategory = 'leadership',
  sourceArticleTitle,
}: SidebarLeadFormProps) {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [domain, setDomain] = useState(defaultCategory);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workEmail || !fullName) {
      setErrorMsg(isAr ? 'يرجى إدخال الاسم والبريد الإلكتروني.' : 'Please enter your name and work email.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          workEmail,
          organizationName: organizationName || undefined,
          country: 'Saudi Arabia',
          domains: [domain],
          role: 'buyer',
          additionalContext: sourceArticleTitle
            ? `Inquiry initiated from blog article: "${sourceArticleTitle}"`
            : 'Inquiry from Knowledge Hub Sidebar',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit form');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || (isAr ? 'حدث خطأ، يرجى المحاولة لاحقاً.' : 'Something went wrong. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-6 rounded-[28px] bg-[#0B1325] text-white border border-neutral-800 shadow-sm text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 size={24} />
        </div>
        <h4 className="font-heading text-lg font-bold text-white mb-2">
          {isAr ? 'تم استلام طلبك بنجاح!' : 'Consultation Request Sent!'}
        </h4>
        <p className="text-xs text-neutral-300 leading-relaxed font-light">
          {isAr
            ? 'سيتواصل معك مستشار التدريب المتخصص من PontLook خلال 48 ساعة بعروض تدريبية مفصلة ومطابقة لاحتياج منشأتكم.'
            : 'Our enterprise matching team will connect with you within 48 hours with pre-scoped trainer proposals.'}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-7 rounded-[28px] bg-white border border-neutral-200/90 shadow-sm hover:shadow-md transition-shadow">
      {/* Header Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#FF5C00] animate-pulse" />
        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF5C00]">
          {isAr ? 'استشارة تدريبية مجانية' : 'RAPID MATCHMAKING'}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-heading text-xl font-bold tracking-tight text-neutral-950 mb-1.5">
        {isAr ? 'احصل على عروض تدريبية خلال 48 ساعة' : 'Get Matched with Top GCC Trainers'}
      </h3>
      <p className="font-sans text-xs text-neutral-600 leading-relaxed mb-5">
        {isAr
          ? 'نطابق احتياجات منشأتكم مع نخبة بيوت الخبرة والمدربين المعتمدين في الخليج. مجاناً 100% للشركات.'
          : 'Pre-qualified proposals tailored to your corporate capability roadmap. 100% free for HR leaders.'}
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-[11px] font-semibold text-neutral-700 uppercase tracking-wider font-mono mb-1">
            {isAr ? 'الاسم الكامل *' : 'Full Name *'}
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={isAr ? 'مثال: سارة العتيبي' : 'e.g. Sarah Jenkins'}
            className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-neutral-50/50 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/20 focus:border-[#FF5C00] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-neutral-700 uppercase tracking-wider font-mono mb-1">
            {isAr ? 'بريد العمل المؤسسي *' : 'Work Email *'}
          </label>
          <input
            type="email"
            required
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
            placeholder={isAr ? 'name@company.com' : 'name@company.com'}
            className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-neutral-50/50 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/20 focus:border-[#FF5C00] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-neutral-700 uppercase tracking-wider font-mono mb-1">
            {isAr ? 'اسم المنشأة' : 'Organization Name'}
          </label>
          <input
            type="text"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            placeholder={isAr ? 'اسم الشركة أو الجهة' : 'Company or entity'}
            className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-neutral-50/50 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/20 focus:border-[#FF5C00] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-neutral-700 uppercase tracking-wider font-mono mb-1">
            {isAr ? 'مجال التدريب المطلوب' : 'Training Domain'}
          </label>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-neutral-50/50 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]/20 focus:border-[#FF5C00] transition-colors"
          >
            {PONTLOOK_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {isAr ? cat.labelAr : cat.labelEn}
              </option>
            ))}
          </select>
        </div>

        {errorMsg && (
          <p className="text-[11px] text-red-600 font-medium">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-neutral-950 hover:bg-black text-white font-semibold text-xs transition-all active:scale-95 shadow-sm disabled:opacity-70 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>{isAr ? 'جاري الإرسال...' : 'Submitting...'}</span>
            </>
          ) : (
            <>
              <Sparkles size={14} className="text-[#FF5C00]" />
              <span>{isAr ? 'طلب عروض تدريبية مجانية' : 'Request Trainer Proposals'}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
