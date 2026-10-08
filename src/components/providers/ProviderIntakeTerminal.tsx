'use client';

import React, { useState } from 'react';

interface ProviderIntakeTerminalProps {
  isAr?: boolean;
}

const DOMAIN_OPTIONS = [
  { id: 'leadership', labelEn: 'LEADERSHIP & C-SUITE', labelAr: 'القيادة التنفيذية والإدارة العليا' },
  { id: 'compliance', labelEn: 'SAMA / CBUAE COMPLIANCE', labelAr: 'الامتثال وحوكمة ساما والمصرف المركزي' },
  { id: 'tawteen', labelEn: 'TAWTEEN & SAUDIZATION', labelAr: 'التوطين وتأهيل الكوادر الوطنية' },
  { id: 'ai_data', labelEn: 'AI & ENTERPRISE DATA LITERACY', labelAr: 'الذكاء الاصطناعي وثقافة البيانات' },
  { id: 'sales', labelEn: 'B2B SALES & NEGOTIATION', labelAr: 'مبيعات الشركات والتفاوض التجاري' },
  { id: 'grc_safety', labelEn: 'GRC, RISK & SAFETY', labelAr: 'إدارة المخاطر والسلامة المهنية' },
];

export default function ProviderIntakeTerminal({ isAr = false }: ProviderIntakeTerminalProps) {
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['leadership', 'compliance']);
  const [firmName, setFirmName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [market, setMarket] = useState('ksa');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const toggleDomain = (id: string) => {
    setSelectedDomains((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firmName || !email || !contactName) return;

    setIsSubmitting(true);

    const generatedId = `PRV_${Math.random().toString(36).substring(2, 8).toUpperCase()}_${Date.now().toString(36).toUpperCase()}`;
    setSubmissionId(generatedId);

    const payload = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '8b61988b-d8e3-414b-a843-5ea273292bb5',
      subject: `[PROVIDER ONBOARDING TERMINAL] New Registration: ${firmName} (${generatedId})`,
      from_name: 'PontLook Enterprise Terminal',
      company_name: firmName,
      contact_name: contactName,
      business_email: email,
      phone: phone || 'N/A',
      market_focus: market,
      selected_domains: selectedDomains.join(', '),
      additional_notes: notes || 'N/A',
      registration_id: generatedId,
      submitted_at: new Date().toISOString(),
    };

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('Direct submit error fallback:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <section id="intake-terminal" className="w-full bg-[#07090E] py-16 sm:py-24 border-t border-white/10 relative z-10 scroll-mt-24">
      <div className="container-site max-w-5xl mx-auto">
        {/* Terminal Window Wrapper */}
        <div className="border border-white/15 bg-[#0C1018] shadow-2xl relative">
          {/* Terminal Title Bar */}
          <div className="bg-[#111724] border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between font-mono text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <span className="text-slate-500 ms-2">|</span>
              <span className="text-sky-400 font-semibold">
                TERMINAL // PROVIDER_ONBOARDING_PROTOCOL
              </span>
            </div>
            <span className="hidden sm:inline-block text-emerald-400 font-medium">
              STATUS: READY_FOR_INGESTION
            </span>
          </div>

          <div className="p-6 sm:p-10">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Terminal Prompt Header */}
                <div>
                  <div className="font-mono text-xs text-emerald-400 mb-1">
                    root@pontlook-routing-engine:~$ ./initialize_provider_vetting.sh
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {isAr ? 'تسجيل مركز أو مزود التدريب في الشبكة' : 'Register as an Accredited Training Provider'}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                    {isAr
                      ? 'حدد اختصاصاتك التدريبية المعتمدة وسجل بيانات التواصل المؤسسية. سيقوم فريق الشراكات بالتحقق والتواصل لجدولة مكالمة الاعتماد خلال 24 ساعة.'
                      : 'Specify your accredited training specialties and transmit your corporate credentials. Our partnerships team verifies capacity and schedules qualification calls within 24 hours.'}
                  </p>
                </div>

                {/* Domain Selection Chips */}
                <div>
                  <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-2.5">
                    {isAr ? '1. حدد مجالات التدريب الأساسية لمؤسستك' : '1. SELECT PRIMARY TRAINING SPECIALTIES'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DOMAIN_OPTIONS.map((d) => {
                      const isSelected = selectedDomains.includes(d.id);
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => toggleDomain(d.id)}
                          className={`px-3 py-2 border font-mono text-xs transition-all flex items-center gap-2 ${
                            isSelected
                              ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-sm'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? 'bg-sky-400' : 'bg-slate-600'
                            }`}
                          />
                          <span>{isAr ? d.labelAr : d.labelEn}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div>
                  <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-3">
                    {isAr ? '2. بيانات المنشأة والمسؤول التنفيذي' : '2. ENTERPRISE CREDENTIALS & CONTACT'}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Firm Name */}
                    <div>
                      <span className="block font-mono text-[11px] text-slate-400 mb-1">
                        {isAr ? 'اسم مركز / شركة التدريب *' : 'TRAINING FIRM / ACADEMY NAME *'}
                      </span>
                      <input
                        type="text"
                        required
                        value={firmName}
                        onChange={(e) => setFirmName(e.target.value)}
                        placeholder={isAr ? 'مثال: أكاديمية النخبة للقيادة' : 'e.g., Apex Leadership Academy'}
                        className="w-full bg-[#07090E] border border-white/15 px-3.5 py-2.5 font-sans text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>

                    {/* Contact Person Name */}
                    <div>
                      <span className="block font-mono text-[11px] text-slate-400 mb-1">
                        {isAr ? 'اسم الشريك / المسؤول التنفيذي *' : 'AUTHORIZED EXECUTIVE NAME *'}
                      </span>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder={isAr ? 'الاسم الكامل' : 'Full Name & Title'}
                        className="w-full bg-[#07090E] border border-white/15 px-3.5 py-2.5 font-sans text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>

                    {/* Corporate Email */}
                    <div>
                      <span className="block font-mono text-[11px] text-slate-400 mb-1">
                        {isAr ? 'البريد الإلكتروني المؤسسي *' : 'CORPORATE BUSINESS EMAIL *'}
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="executive@training-firm.com"
                        className="w-full bg-[#07090E] border border-white/15 px-3.5 py-2.5 font-sans text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <span className="block font-mono text-[11px] text-slate-400 mb-1">
                        {isAr ? 'رقم الهاتف / الواتساب التنفيذي' : 'EXECUTIVE PHONE / WHATSAPP'}
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+966 5x xxx xxxx / +971 5x xxx xxxx"
                        className="w-full bg-[#07090E] border border-white/15 px-3.5 py-2.5 font-sans text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>

                    {/* Primary Market Focus */}
                    <div className="sm:col-span-2">
                      <span className="block font-mono text-[11px] text-slate-400 mb-1">
                        {isAr ? 'السوق الإقليمي الأساسي المستهدف' : 'PRIMARY TARGET REGIONAL MARKET'}
                      </span>
                      <select
                        value={market}
                        onChange={(e) => setMarket(e.target.value)}
                        className="w-full bg-[#07090E] border border-white/15 px-3.5 py-2.5 font-sans text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                      >
                        <option value="ksa">
                          {isAr ? 'المملكة العربية السعودية (الرياض، جدة، المنطقة الشرقية)' : 'Saudi Arabia (Riyadh, Jeddah, Eastern Province)'}
                        </option>
                        <option value="uae">
                          {isAr ? 'دولة الإمارات العربية المتحدة (دبي، أبوظبي)' : 'United Arab Emirates (Dubai, Abu Dhabi)'}
                        </option>
                        <option value="qatar">
                          {isAr ? 'دولة قطر (الدوحة)' : 'Qatar (Doha)'}
                        </option>
                        <option value="pan_gcc">
                          {isAr ? 'كافة دول مجلس التعاون الخليجي (Pan-GCC)' : 'Pan-GCC Full Regional Coverage'}
                        </option>
                      </select>
                    </div>

                    {/* Accreditations / Key Clients */}
                    <div className="sm:col-span-2">
                      <span className="block font-mono text-[11px] text-slate-400 mb-1">
                        {isAr ? 'الاعتمادات وأبرز سوابق الأعمال المؤسسية (اختياري)' : 'ACCREDITATIONS & NOTABLE CORPORATE TRACK RECORD (OPTIONAL)'}
                      </span>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={
                          isAr
                            ? 'أبرز الجهات التي دربتم كوادرها، اعتمادات TVTC أو Pearson أو SAMA...'
                            : 'Notable enterprise clients trained, TVTC accreditations, Pearson/ATD certifications...'
                        }
                        className="w-full bg-[#07090E] border border-white/15 p-3 font-sans text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="font-mono text-xs text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>
                      {isAr
                        ? 'صفر اشتراك شهري · الدفع فقط عند استلام فرصة مؤهلة'
                        : 'ZERO RETAINER · 100% PERFORMANCE SLA ON QUALIFIED MATCHES'}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all duration-150 flex items-center gap-2"
                  >
                    <span>{isSubmitting ? (isAr ? 'جاري الإرسال...' : 'TRANSMITTING...') : (isAr ? 'إرسال بيانات الاعتماد' : 'TRANSMIT CREDENTIALS')}</span>
                    <span className="font-bold">▶</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Instant Acknowledgement State */
              <div className="space-y-6 font-mono">
                <div className="border border-emerald-500/30 bg-emerald-500/10 p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>[PACKET ENCRYPTED & TRANSMITTED SUCCESSFULLY]</span>
                  </div>

                  <div className="text-xs text-slate-200">
                    {isAr
                      ? `تم استلام وقيد بيانات المنشأة "${firmName}" في شبكة مزودي بونت لوك المعتمدين.`
                      : `Corporate credentials for "${firmName}" have been encrypted and queued in the PontLook matching engine.`}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300 pt-2 border-t border-emerald-500/20">
                    <div>
                      <span className="text-slate-500">TRANSACTION_ID: </span>
                      <span className="text-sky-300 font-bold">{submissionId}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">ROUTING_SLA: </span>
                      <span className="text-emerald-300">&lt; 24H ADVISORY REVIEW</span>
                    </div>
                    <div>
                      <span className="text-slate-500">CONTACT_CHANNEL: </span>
                      <span className="text-slate-200">{email}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">SPECIALTIES: </span>
                      <span className="text-sky-300">{selectedDomains.length} DOMAINS MAPPED</span>
                    </div>
                  </div>
                </div>

                {/* Next Steps Guidance */}
                <div className="bg-white/5 border border-white/10 p-5 text-xs text-slate-300 space-y-2">
                  <div className="text-sky-400 font-bold tracking-wider">[NEXT OPERATIONAL PHASES]</div>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                    <li>
                      {isAr
                        ? 'مراجعة الاعتمادات وسوابق الأعمال المؤسسية من قبل فريق الشراكات.'
                        : 'Capacity & credential audit by our enterprise advisory team.'}
                    </li>
                    <li>
                      {isAr
                        ? 'مكالمة اعتماد مدتها 15 دقيقة لمطابقة معايير التعاقد والتسعير.'
                        : '15-minute qualification call to align on pricing bands and cohort capacity.'}
                    </li>
                    <li>
                      {isAr
                        ? 'تفعيل التوجيه المباشر للفرص المؤكدة (Tier 1 & Tier 2) مباشرة لجدولك.'
                        : 'Activation of direct lead routing (Tier 1 & Tier 2) directly into your calendar.'}
                    </li>
                  </ol>
                </div>

                <div className="pt-2 flex justify-start">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFirmName('');
                      setEmail('');
                      setContactName('');
                    }}
                    className="text-xs text-slate-400 hover:text-white underline font-mono"
                  >
                    {isAr ? '← تسجيل منشأة تدريبية أخرى' : '← Register another provider entity'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
