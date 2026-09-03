/**
 * Bilingual (EN / AR) Dictionary & RTL Configuration for PontLook Matching Funnel
 */

export type FunnelLocale = 'en' | 'ar';

export interface FunnelDictionary {
  dir: 'ltr' | 'rtl';
  scaffolding: {
    stepOf: string;
    estimatedTime: string;
    autoSaving: string;
    step1Short: string;
    step2Short: string;
    step3Short: string;
    step4Short: string;
  };
  step1: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    selectedBadge: (count: number) => string;
    otherSpecifyTitle: string;
    otherSpecifySubtitle: string;
    otherPlaceholder: string;
    otherSuggestionsLabel: string;
    noResultsTitle: (query: string) => string;
    noResultsSubtitle: string;
    addAsCustomBtn: (query: string) => string;
    ctaNext: string;
    trustNote: string;
  };
  step2: {
    modeTitle: string;
    modeSubtitle: string;
    cityTitle: string;
    citySubtitle: string;
    langTitle: string;
    langSubtitle: string;
    customizationTitle: string;
    customizationSubtitle: string;
    recommendedTag: string;
    ctaNext: string;
    ctaBack: string;
    trustNote: string;
  };
  step3: {
    cohortTitle: string;
    cohortSubtitle: string;
    timelineTitle: string;
    timelineSubtitle: string;
    budgetTitle: string;
    budgetSubtitle: string;
    kpiLabel: string;
    kpiOptional: string;
    kpiPlaceholder: string;
    ctaNext: string;
    ctaBack: string;
    trustNote: string;
  };
  step4: {
    title: string;
    subtitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    jobTitleLabel: string;
    jobTitlePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailHint: string;
    orgLabel: string;
    orgPlaceholder: string;
    countryLabel: string;
    phoneLabel: string;
    phoneHint: string;
    guaranteeTitle: string;
    guaranteeText: string;
    ctaSubmit: string;
    submitting: string;
    ctaBack: string;
  };
  step5: {
    matchingBadge: string;
    title: (name: string, org: string) => string;
    subtitle: string;
    m1Time: string;
    m1Title: string;
    m1Desc: string;
    m2Time: string;
    m2Title: string;
    m2Desc: string;
    m3Time: string;
    m3Title: string;
    m3Desc: string;
    reportBadge: string;
    reportType: string;
    reportTitle: string;
    reportDesc: string;
    downloadBtn: string;
    downloading: string;
    downloaded: string;
    recapTitle: string;
    homeLink: string;
    contactLink: string;
  };
}

export const FUNNEL_DICTIONARIES: Record<FunnelLocale, FunnelDictionary> = {
  en: {
    dir: 'ltr',
    scaffolding: {
      stepOf: 'Step {current} of {total}',
      estimatedTime: '(~60 seconds)',
      autoSaving: 'Auto-saving',
      step1Short: 'Scope',
      step2Short: 'Delivery',
      step3Short: 'Cohort & Budget',
      step4Short: 'Verification',
    },
    step1: {
      title: 'What training domains do you need?',
      subtitle: 'Select all target capabilities for your enterprise cohort. We’ll match specialized GCC providers with proven ROI.',
      searchPlaceholder: 'Search topics, capabilities, or certifications e.g. "PMP", "Vision 2030", "Generative AI", "NEBOSH", "ISO", "Leadership"...',
      selectedBadge: (count) => `${count} ${count === 1 ? 'domain' : 'domains'} selected`,
      otherSpecifyTitle: 'Specify Custom Training Topic or Industry Certification',
      otherSpecifySubtitle: 'Provide the exact framework, technical skill, or business objective you need covered:',
      otherPlaceholder: 'e.g., ESG Reporting Frameworks, Supply Chain Optimization, Lean Six Sigma...',
      otherSuggestionsLabel: 'Suggestions:',
      noResultsTitle: (query) => `No standard catalog match for "${query}"`,
      noResultsSubtitle: 'Select "Other Specialized Domain" below to enter your custom topic or framework.',
      addAsCustomBtn: (query) => `Add "${query}" as Specialized Topic`,
      ctaNext: 'Continue to Delivery & Region',
      trustNote: 'Verified GCC providers · 100% Free for hiring enterprises',
    },
    step2: {
      modeTitle: 'How should the training be delivered?',
      modeSubtitle: 'Choose the instructional format that best fits your workforce location and logistics.',
      cityTitle: 'Primary GCC Location for In-Person Sessions',
      citySubtitle: 'Select your host city so we only match providers with accredited trainers and logistics in your hub.',
      langTitle: 'Instruction Language',
      langSubtitle: 'Ensure instructors can facilitate natively and provide localized course materials.',
      customizationTitle: 'Program Customization Level',
      customizationSubtitle: 'Do you require tailored curriculum adapted to your internal organizational case studies?',
      recommendedTag: '★ Recommended for GCC Enterprises',
      ctaNext: 'Continue to Cohort & Budget',
      ctaBack: 'Back',
      trustNote: 'Zero spam guarantee · 3 curated matches maximum',
    },
    step3: {
      cohortTitle: 'Target Cohort Size',
      cohortSubtitle: 'How many participants or leaders will be trained in this intake cycle?',
      timelineTitle: 'Target Start Horizon',
      timelineSubtitle: 'When do you expect instruction or onboarding to commence?',
      budgetTitle: 'Estimated Budget Allocation (USD)',
      budgetSubtitle: 'Helps us shortlist providers within your approved procurement tier.',
      kpiLabel: 'Specific Outcomes or KPIs to Target',
      kpiOptional: 'Optional',
      kpiPlaceholder: 'e.g., We need to reduce manager turnover by 20%, prepare directors for Vision 2030 initiatives, or align sales teams with enterprise bidding...',
      ctaNext: 'Continue to Enterprise Verification',
      ctaBack: 'Back',
      trustNote: 'Zero obligation · Free for corporate buyers',
    },
    step4: {
      title: 'Enterprise Verification & Contact Details',
      subtitle: 'We only release curated proposals to verified corporate decision-makers.',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'e.g. Sarah Al-Rashid',
      jobTitleLabel: 'Official Job Title',
      jobTitlePlaceholder: 'e.g. VP of Human Capital / L&D Director',
      emailLabel: 'Corporate Work Email',
      emailPlaceholder: 'name@company.com',
      emailHint: 'Must be your official corporate domain (e.g., @aramco.com, @fab.ae)',
      orgLabel: 'Organization / Company Name',
      orgPlaceholder: 'e.g. Saudi Aramco, FAB Bank, STC',
      countryLabel: 'Primary Country of Operation',
      phoneLabel: 'Direct Phone / WhatsApp',
      phoneHint: 'For proposal dispatch notifications & verification',
      guaranteeTitle: 'Enterprise Confidentiality Guarantee',
      guaranteeText: '🔒 Your request is private and shared with a maximum of 3 matched providers who fit your exact domain and procurement specifications. Zero vendor spam or unsolicited cold calls.',
      ctaSubmit: 'Get 3 Curated Provider Proposals',
      submitting: 'Verifying & Submitting...',
      ctaBack: 'Back',
    },
    step5: {
      matchingBadge: 'Matching in Progress · 120+ Vetted GCC Providers',
      title: (name, org) => `Enterprise Scope Received. Matching Begins Now.`,
      subtitle: `Your training specifications have been prioritized in our qualification queue.`,
      m1Time: 'Milestone 1 · Within 24 Hours',
      m1Title: 'Partner Availability Check',
      m1Desc: 'Our GCC matching team audits trainer accreditations and schedule slots.',
      m2Time: 'Milestone 2 · Within 48 Hours',
      m2Title: '2–3 Itemized Proposals',
      m2Desc: 'Receive customized syllabi, pricing breakdown, and lead instructor bios.',
      m3Time: 'Milestone 3 · Zero Obligation',
      m3Title: 'Instructor Interview & Terms',
      m3Desc: 'Interview lead facilitators before committing. 100% free service for companies.',
      reportBadge: 'Instant Executive Resource',
      reportType: 'PDF Report',
      reportTitle: 'PontLook 2026 GCC Corporate Training Benchmark Report',
      reportDesc: 'Comprehensive data on enterprise training rates, instructor accreditations, and Saudization/Emiratization ROI.',
      downloadBtn: 'Download Report (PDF)',
      downloading: 'Preparing Report...',
      downloaded: 'Downloaded Successfully',
      recapTitle: 'Submitted Request Scope',
      homeLink: '← Back to PontLook Home',
      contactLink: 'Contact Matching Desk',
    },
  },
  ar: {
    dir: 'rtl',
    scaffolding: {
      stepOf: 'الخطوة {current} من {total}',
      estimatedTime: '(~60 ثانية)',
      autoSaving: 'حفظ تلقائي',
      step1Short: 'المجال',
      step2Short: 'التنفيذ',
      step3Short: 'المجموعة والميزانية',
      step4Short: 'التحقق',
    },
    step1: {
      title: 'ما هي مجالات التدريب المطلوبة؟',
      subtitle: 'حدد مجالات تطوير الكفاءات المطلوبة لمنشأتك. سنقوم بمطابقتك مع أفضل مقدمي التدريب المعتمدين في الخليج.',
      searchPlaceholder: 'ابحث عن المواضيع أو الكفاءات أو الشهادات مثل "PMP" أو "رؤية 2030" أو "الذكاء الاصطناعي" أو "NEBOSH" أو "ISO" أو "القيادة"...',
      selectedBadge: (count) => `تم اختيار ${count} ${count === 1 ? 'مجال' : 'مجالات'}`,
      otherSpecifyTitle: 'حدد موضوع التدريب أو الشهادة المهنية التخصصية',
      otherSpecifySubtitle: 'أدخل المهارة أو الإطار المهني المطلوب تغطيته بدقة:',
      otherPlaceholder: 'مثال: معايير الاستدامة ESG، إدارة سلاسل الإمداد، لين ستة سيجما...',
      otherSuggestionsLabel: 'مقترحات شائعة:',
      noResultsTitle: (query) => `لم نجد نتائج مطابقة لـ "${query}" في الفهرس القياسي`,
      noResultsSubtitle: 'اختر "مجال تخصصي آخر" بالأسفل لإدخال موضوعك المخصص.',
      addAsCustomBtn: (query) => `إضافة "${query}" كموضوع تخصصي`,
      ctaNext: 'المتابعة إلى أسلوب التنفيذ والموقع',
      trustNote: 'مزودو تدريب معتمدون في الخليج · خدمة مجانية 100٪ للشركات والمؤسسات',
    },
    step2: {
      modeTitle: 'كيف تفضل تقديم البرنامج التدريبي؟',
      modeSubtitle: 'اختر النموذج التدريبي الأنسب لفرق العمل ومواقعهم الجغرافية.',
      cityTitle: 'المدينة الخليجية الأساسية للتدريب الحضوري',
      citySubtitle: 'حدد المدينة لضمان مطابقتك مع مزودين يمتلكون مدربين معتمدين وتجهيزات لوجستية فيها.',
      langTitle: 'لغة تقديم التدريب',
      langSubtitle: 'ضمان قدرة المدربين على تقديم الشرح والمواد التدريبية باللغة المناسبة.',
      customizationTitle: 'مستوى تخصيص المحتوى التدريبي',
      customizationSubtitle: 'هل تحتاج إلى محتوى مصمم خصيصاً لدراسات الحالة ومؤشرات الأداء الداخلية لمنشأتك؟',
      recommendedTag: '★ موصى به للشركات والمؤسسات الخليجية',
      ctaNext: 'المتابعة إلى حجم المجموعة والميزانية',
      ctaBack: 'السابق',
      trustNote: 'ضمان عدم الإزعاج · 3 عروض نوعية كحد أقصى',
    },
    step3: {
      cohortTitle: 'حجم المجموعة التدريبية المستهدفة',
      cohortSubtitle: 'كم عدد المتدربين أو القيادات المتوقع مشاركتهم في هذا البرنامج؟',
      timelineTitle: 'الأفق الزمني لبدء التدريب',
      timelineSubtitle: 'متى تتوقع انطلاق البرنامج التدريبي أو ورش العمل؟',
      budgetTitle: 'الميزانية التقديرية المخصصة (بالدولار الأمريكي)',
      budgetSubtitle: 'تساعدنا في حصر المزودين المتوافقين مع سقف المشتريات المعتمد لديك.',
      kpiLabel: 'المخرجات ومؤشرات الأداء (KPIs) المستهدفة',
      kpiOptional: 'اختياري',
      kpiPlaceholder: 'مثال: رفع كفاءة الإدارة الوسطى، تأهيل القيادات لمبادرات التحول الرقمي، تعزيز المبيعات المؤسسية...',
      ctaNext: 'المتابعة إلى التحقق المؤسسي',
      ctaBack: 'السابق',
      trustNote: 'بدون أي التزام مالي · مجاني تماماً للشركات الطالبة للتدريب',
    },
    step4: {
      title: 'التحقق المؤسسي وبيانات التواصل',
      subtitle: 'نرسل العروض المعتمدة فقط لأصحاب القرار ومديري الموارد البشرية والتدريب.',
      fullNameLabel: 'الاسم الكامل',
      fullNamePlaceholder: 'مثال: سارة الراشد',
      jobTitleLabel: 'المسمى الوظيفي الرسمي',
      jobTitlePlaceholder: 'مثال: نائب رئيس الموارد البشرية / مدير التعلم والتطوير',
      emailLabel: 'البريد الإلكتروني المهني (للعمل)',
      emailPlaceholder: 'name@company.com',
      emailHint: 'يجب استخدام نطاق الشركة الرسمي (مثل @aramco.com أو @fab.ae)',
      orgLabel: 'اسم المنشأة / الشركة',
      orgPlaceholder: 'مثال: أرامكو السعودية، بنك أبوظبي الأول، STC',
      countryLabel: 'دولة المقر الرئيسية',
      phoneLabel: 'رقم الهاتف المباشر / واتساب',
      phoneHint: 'لإرسال إشعارات العروض وتأكيد الأهلية',
      guaranteeTitle: 'ضمان السرية التامة للمنشآت',
      guaranteeText: '🔒 طلبك خاص وسري ولن تتم مشاركته إلا مع 3 مزودي تدريب مؤهلين يطابقون شروطك بدقة. نضمن عدم وجود أي إزعاج أو تسويق عشوائي.',
      ctaSubmit: 'الحصول على 3 عروض تدريبية معتمدة',
      submitting: 'جارٍ التحقق والإرسال...',
      ctaBack: 'السابق',
    },
    step5: {
      matchingBadge: 'جارٍ المطابقة · أكثر من 120 مزود تدريب معتمد في الخليج',
      title: (name, org) => `تم استلام نطاق التدريب بنجاح. بدأت عملية المطابقة.`,
      subtitle: `تم إدراج متطلبات التدريب الخاصة بك ضمن قائمة المطابقة ذات الأولوية.`,
      m1Time: 'المحطة الأولى · خلال 24 ساعة',
      m1Title: 'التحقق من جاهزية الشركاء',
      m1Desc: 'فريق مطابقة PontLook يتحقق من اعتمادات المدربين والتواريخ المتاحة.',
      m2Time: 'المحطة الثانية · خلال 48 ساعة',
      m2Title: 'استلام 2 إلى 3 عروض مفصلة',
      m2Desc: 'تصلك مناهج تدريبية مخصصة مع تفاصيل التكلفة وسير المدربين الذاتية.',
      m3Time: 'المحطة الثالثة · دون أي التزام',
      m3Title: 'مقابلة المدربين واعتماد الشروط',
      m3Desc: 'يمكنك مقابلة كبار المدربين قبل اتخاذ أي قرار. الخدمة مجانية 100٪ للشركات.',
      reportBadge: 'مورد تنفيذي فوري',
      reportType: 'تقرير PDF',
      reportTitle: 'تقرير مؤشرات وتكاليف التدريب المؤسسي في الخليج 2026',
      reportDesc: 'بيانات شاملة عن أسعار التدريب للشركات، معايير المدربين، وعوائد التوطين والسعودة.',
      downloadBtn: 'تحميل التقرير التنفيذي (PDF)',
      downloading: 'جارٍ تجهيز التقرير...',
      downloaded: 'تم التحميل بنجاح',
      recapTitle: 'ملخص نطاق التدريب المرسل',
      homeLink: '← العودة للرئيسية',
      contactLink: 'التواصل مع مكتب المطابقة',
    },
  },
};

export function getFunnelDictionary(lang: string = 'en'): FunnelDictionary {
  const normalized = (lang === 'ar' ? 'ar' : 'en') as FunnelLocale;
  return FUNNEL_DICTIONARIES[normalized];
}
