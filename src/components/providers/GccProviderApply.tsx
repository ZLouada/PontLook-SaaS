'use client';

import React, { useState } from 'react';

interface GccProviderApplyProps {
  isAr?: boolean;
}

const SPECIALTIES_EN = ['Leadership', 'AI', 'Compliance', 'Sales', 'Soft skills', 'Other'];
const SPECIALTIES_AR = ['القيادة التنفيذية', 'الذكاء الاصطناعي', 'الامتثال والحوكمة', 'مبيعات الشركات', 'المهارات الشخصية', 'مجالات أخرى'];

export default function GccProviderApply({ isAr = false }: GccProviderApplyProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(['Leadership']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const specialties = isAr ? SPECIALTIES_AR : SPECIALTIES_EN;

  const toggleSpecialty = (item: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company || !email) return;

    setIsSubmitting(true);

    const payload = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '8b61988b-d8e3-414b-a843-5ea273292bb5',
      subject: `New Provider Application: ${company} (${name})`,
      from_name: 'PontLook Provider Application',
      full_name: name,
      company_name: company,
      business_email: email,
      specialties: selectedSpecialties.join(', '),
      submitted_at: new Date().toISOString(),
    };

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('Submit fallback:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <section
      id="ap"
      className="bg-[#0A1020] text-center py-[18vh] px-[2.2vw] pb-[12vh] relative z-10 select-none border-t border-[#7FB8FF]/15"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading font-light text-[clamp(2.2rem,5.6vw,5rem)] leading-[1.05] max-w-4xl mx-auto mb-3.5 text-[#E6ECF8]">
          {isAr ? 'انضم إلى شبكة مزودي التدريب' : 'Join the provider network'}
        </h2>

        <p className="text-[#9FB1D1] text-base sm:text-lg mb-11 font-sans">
          {isAr
            ? 'أخبرنا بمجالات اختصاصك التدريبي. ونحن سنصلك بالشركات التي تبحث عنك الآن.'
            : 'Tell us what you teach. We will tell you who needs it.'}
        </p>

        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-[560px] mx-auto flex flex-col gap-3 text-start font-sans"
          >
            <input
              required
              name="n"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isAr ? 'اسمك الكريم' : 'Your name'}
              autoComplete="name"
              className="bg-white/[0.05] border border-[#7FB8FF]/35 text-white p-4 font-sans text-sm focus:outline-none focus:border-[#7FB8FF] transition-colors placeholder:text-[#9FB1D1]"
            />

            <input
              required
              name="c"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={isAr ? 'اسم مركز / شركة التدريب' : 'Training company'}
              autoComplete="organization"
              className="bg-white/[0.05] border border-[#7FB8FF]/35 text-white p-4 font-sans text-sm focus:outline-none focus:border-[#7FB8FF] transition-colors placeholder:text-[#9FB1D1]"
            />

            <input
              required
              type="email"
              name="e"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isAr ? 'البريد الإلكتروني المؤسسي' : 'Business email'}
              autoComplete="email"
              className="bg-white/[0.05] border border-[#7FB8FF]/35 text-white p-4 font-sans text-sm focus:outline-none focus:border-[#7FB8FF] transition-colors placeholder:text-[#9FB1D1]"
            />

            {/* Specialty Checkbox Pills */}
            <div className="flex gap-2 flex-wrap py-2">
              {specialties.map((spec) => {
                const isSelected = selectedSpecialties.includes(spec);
                return (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => toggleSpecialty(spec)}
                    className={`border px-3.5 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#3D7BFF] border-[#3D7BFF] text-white shadow-sm'
                        : 'border-[#7FB8FF]/35 text-slate-300 hover:border-[#7FB8FF]/60 bg-transparent'
                    }`}
                  >
                    {spec}
                  </button>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#2451BF] hover:bg-[#3D7BFF] border border-[#2451BF] text-white p-4 text-sm font-sans font-medium transition-colors cursor-pointer mt-2 disabled:opacity-50"
            >
              {isSubmitting
                ? (isAr ? 'جاري الإرسال...' : 'Sending application...')
                : (isAr ? 'إرسال طلب الانضمام' : 'Send application')}
            </button>
          </form>
        ) : (
          /* Submission Confirmation Box */
          <div
            id="ok"
            className="max-w-[560px] mx-auto border border-[#7FB8FF] bg-[#05070D]/80 p-7 sm:p-9 text-start font-sans shadow-2xl"
          >
            <h3 className="text-2xl sm:text-3xl text-white mb-2 font-heading font-light">
              {isAr ? 'تم استلام طلبك بنجاح' : 'Application received'}
            </h3>
            <p className="text-[#9FB1D1] text-sm sm:text-base m-0 leading-relaxed font-sans">
              {isAr
                ? `شكراً لك، سنقوم بمراجعة بيانات مركز "${company}" والتواصل معك عبر بريدك المؤسسي (${email}).`
                : `We will review your firm's credentials and reply directly to your business email (${email}).`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
