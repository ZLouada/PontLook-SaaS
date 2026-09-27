export type CountryCode = 'ae' | 'sa' | 'uk' | 'us' | 'au';

export interface LocalizedInitiative {
  en: string;
  ar: string;
  descriptionEn: string;
  descriptionAr: string;
}

export interface CityData {
  slug: string;
  countryCode: CountryCode;
  nameEn: string;
  nameAr: string;
  lat: number;
  lng: number;
  districts: string[];
  heroTitleEn: string;
  heroTitleAr: string;
  leadParagraphEn: string;
  leadParagraphAr: string;
  topIndustriesEn: string[];
  topIndustriesAr: string[];
  budgetTiers: string[];
  faqsEn: Array<{ q: string; a: string }>;
  faqsAr: Array<{ q: string; a: string }>;
}

export interface CountryData {
  code: CountryCode;
  isoCode: string;
  nameEn: string;
  nameAr: string;
  primaryLang: 'en' | 'ar';
  supportedLangs: Array<'en' | 'ar'>;
  publicPathPrefix: {
    en: string;
    ar?: string;
  };
  hreflangCode: {
    en: string;
    ar?: string;
  };
  currency: string;
  currencySymbol: string;
  currencyNameEn: string;
  currencyNameAr: string;
  exchangeRateToUSD: number;
  dialCode: string;
  capitalCity: string;
  nationalInitiative: LocalizedInitiative;
  regulatoryBodies: string[];
  cities: CityData[];
}

export interface ServiceVertical {
  slug: string;
  titleEn: string;
  titleAr: string;
  shortDescEn: string;
  shortDescAr: string;
  audienceEn: string;
  audienceAr: string;
  deliveryFormatsEn: string[];
  deliveryFormatsAr: string[];
  keyModulesEn: string[];
  keyModulesAr: string[];
  accreditationEn: string;
  accreditationAr: string;
}

// ============================================================================
// 1. SERVICES DIRECTORY (6 Core High-Ticket Enterprise Verticals)
// ============================================================================
export const SERVICE_VERTICALS: Record<string, ServiceVertical> = {
  'executive-leadership-training': {
    slug: 'executive-leadership-training',
    titleEn: 'Executive Leadership & Strategic Management',
    titleAr: 'القيادة التنفيذية والإدارة الاستراتيجية',
    shortDescEn: 'C-Suite alignment, boardroom governance, and senior managerial transformation programs.',
    shortDescAr: 'برامج مواءمة الإدارة العليا، وحوكمة مجالس الإدارة، والتحول القيادي التنفيذي.',
    audienceEn: 'C-Suite Executives, Managing Directors, Board Members, Division Heads',
    audienceAr: 'الرؤساء التنفيذيون، أعضاء مجالس الإدارة، نواب الرئيس، والمدراء العامون',
    deliveryFormatsEn: ['Onsite Executive Retreats', '1-on-1 Confidential Coaching', 'Hybrid Executive Masterclasses'],
    deliveryFormatsAr: ['خلوات تنفيذية حضورية', 'جلسات كوتشينغ فردية سرية', 'ورش عمل قيادية هجينة'],
    keyModulesEn: [
      'Strategic Vision Execution & OKR Cascading',
      'High-Stakes Crisis Decision Making',
      'Cross-Functional Boardroom Governance',
      'Enterprise Culture & Change Orchestration',
    ],
    keyModulesAr: [
      'تنفيذ الرؤية الاستراتيجية وتطبيق الأهداف والنتائج الرئيسية (OKRs)',
      'صناعة القرار في الأزمات والمواقف الحساسة',
      'حوكمة مجالس الإدارة والقيادة متعددة التخصصات',
      'قيادة التغيير وبناء الثقافة المؤسسية عالية الأداء',
    ],
    accreditationEn: 'CMI, ILM, TVTC, KHDA Accredited Facilitators',
    accreditationAr: 'ميسرون ومدربون معتمدون من CMI وILM وTVTC وهيئة المعرفة KHDA',
  },
  'b2b-sales-negotiation': {
    slug: 'b2b-sales-negotiation',
    titleEn: 'B2B Sales & Commercial Negotiation',
    titleAr: 'مبيعات الشركات B2B والتفاوض التجاري المعقد',
    shortDescEn: 'Enterprise deal structuring, value-based commercial negotiation, and high-velocity pipeline mastery.',
    shortDescAr: 'هيكلة الصفقات المؤسسية، والتفاوض التجاري المعتمد على القيمة، ورفع كفاءة دورة المبيعات.',
    audienceEn: 'Commercial Directors, Enterprise Key Account Leads, Procurement Heads, Sales Teams',
    audienceAr: 'المدراء التجاريون، مسؤولو كبار العملاء، قادة المشتريات، وفرق المبيعات المؤسسية',
    deliveryFormatsEn: ['Simulated Deal Negotiation Labs', 'Virtual Pipeline Bootcamps', 'Onsite Sales Accelerator'],
    deliveryFormatsAr: ['مختبرات محاكاة صفقات تفاوضية واقعية', 'معسكرات تسريع افتراضية', 'ورش تدريب مبيعات ميدانية'],
    keyModulesEn: [
      'Enterprise Key Account Planning & Stakeholder Mapping',
      'High-Stakes Commercial Negotiation Protocols',
      'Consultative Value Selling in Regulated Sectors',
      'Contract Value Optimization & Margin Defense',
    ],
    keyModulesAr: [
      'التخطيط للحسابات الكبرى ورسم خريطة أصحاب المصلحة',
      'بروتوكولات التفاوض التجاري عالي المخاطر',
      'البيع الاستشاري المبني على القيمة في القطاعات المنظمة',
      'تعظيم قيمة العقود وحماية هوامش الربح',
    ],
    accreditationEn: 'ISM & High-Performance Commercial Benchmark Standards',
    accreditationAr: 'معايير الأداء التجاري التنافسي المعتمدة من ISM',
  },
  'ai-digital-transformation': {
    slug: 'ai-digital-transformation',
    titleEn: 'AI, Data Literacy & Digital Transformation',
    titleAr: 'الذكاء الاصطناعي ومحو الأمية الرقمية والتحول التقني',
    shortDescEn: 'Enterprise AI adoption, executive prompt engineering, data-informed strategy, and automation.',
    shortDescAr: 'تبني الذكاء الاصطناعي المؤسسي، واستراتيجية البيانات، وهندسة الأوامر التنفيذية، والأتمتة.',
    audienceEn: 'Chief Technology Officers, Business Unit Leads, Data Teams, Digital Champions',
    audienceAr: 'مدراء تقنية المعلومات، رؤساء قطاعات الأعمال، فرق تحليل البيانات، ورواد التحول الرقمي',
    deliveryFormatsEn: ['Interactive Hands-on Code & AI Labs', 'Executive Briefings', 'Hybrid Learning Cohorts'],
    deliveryFormatsAr: ['مختبرات تطبيقية عملية على نماذج الذكاء الاصطناعي', 'جلسات توجيه تنفيذية', 'دفعات تدريب هجينة'],
    keyModulesEn: [
      'Generative AI Applications for Enterprise Productivity',
      'Data Literacy & Strategic Business Intelligence',
      'Ethical AI Governance, Privacy & Compliance',
      'Digital Operating Models & Modern Tech Workflows',
    ],
    keyModulesAr: [
      'تطبيقات الذكاء الاصطناعي التوليدي لتعزيز الإنتاجية المؤسسية',
      'محو الأمية بالبيانات والذكاء التحليلي الاستراتيجي',
      'حوكمة وأخلاقيات الذكاء الاصطناعي وحماية الخصوصية',
      'نماذج العمل الرقمية المتقدمة وسير العمل الذكي',
    ],
    accreditationEn: 'Global Tech & Cloud Vendor-Agnostic Accreditations',
    accreditationAr: 'اعتمادات دولية مستقلة في هندسة البيانات ونظم الذكاء الاصطناعي',
  },
  'governance-risk-compliance': {
    slug: 'governance-risk-compliance',
    titleEn: 'Governance, Risk & Compliance (GRC)',
    titleAr: 'الحوكمة وإدارة المخاطر والامتثال الرقابي (GRC)',
    shortDescEn: 'Boardroom regulatory compliance, enterprise risk frameworks, AML/CFT, and ESG integration.',
    shortDescAr: 'الامتثال للأنظمة والتشريعات، وأطر إدارة المخاطر المؤسسية، ومكافحة غسل الأموال، ومعايير ESG.',
    audienceEn: 'Chief Risk Officers, General Counsel, Compliance Directors, Internal Auditors',
    audienceAr: 'مدراء إدارة المخاطر، المستشارون القانونيون، مدراء الامتثال، والمراجعون الداخليون',
    deliveryFormatsEn: ['Confidential Board Workshops', 'Interactive Regulatory Audits', 'Hybrid GRC Masterclasses'],
    deliveryFormatsAr: ['ورش عمل تنفيذية سرية لمجالس الإدارة', 'محاكاة تدقيق رقابي تفاعلي', 'برامج GRC متقدمة هجينة'],
    keyModulesEn: [
      'Enterprise Risk Management (COSO / ISO 31000)',
      'Regulatory Reporting & Sanctions Compliance',
      'Anti-Money Laundering (AML) & Financial Crime Defense',
      'ESG Disclosure & Sustainable Governance Frameworks',
    ],
    keyModulesAr: [
      'إدارة المخاطر المؤسسية وفق أطر COSO وISO 31000',
      'التقارير الرقابية الإلزامية والامتثال للعقوبات',
      'مكافحة غسل الأموال (AML) ومكافحة الجرائم المالية',
      'إفصاحات الحوكمة البيئية والاجتماعية والمؤسسية (ESG)',
    ],
    accreditationEn: 'ACAMS, OCEG & Regional Central Bank Compliance Standards',
    accreditationAr: 'معايير امتثال معتمدة من ACAMS وOCEG والمتطلبات البنكية المركزية',
  },
  'project-management-agile': {
    slug: 'project-management-agile',
    titleEn: 'Enterprise Project Management & Agile Delivery',
    titleAr: 'إدارة المشاريع المؤسسية والتحول المرن (Agile)',
    shortDescEn: 'Strategic PMO delivery, Agile/Scrum transformation, capital project risk controls, and value engineering.',
    shortDescAr: 'حوكمة مكاتب إدارة المشاريع PMO، والتحول المرن Agile، والتحكم في مخاطر المشاريع الكبرى.',
    audienceEn: 'PMO Directors, Senior Project Managers, Agile Coaches, Engineering Program Leads',
    audienceAr: 'مدراء مكاتب إدارة المشاريع PMO، مدراء البرامج الهندسية، وقادة فرق التحول المرن',
    deliveryFormatsEn: ['PMI & Agile Cert Prep Bootcamps', 'Onsite PMO Simulation', 'Hybrid Delivery Labs'],
    deliveryFormatsAr: ['معسكرات تأهيل للاعتمادات المهنية PMI وAgile', 'محاكاة تطبيقية لمكاتب PMO', 'مختبرات إدارة هجينة'],
    keyModulesEn: [
      'Strategic PMO Setup & Portfolio Governance',
      'Scaled Agile Framework (SAFe) Implementation',
      'Megaproject Risk Mitigation & Budget Controls',
      'Earned Value Management & Delivery Dashboards',
    ],
    keyModulesAr: [
      'تأسيس مكاتب إدارة المشاريع الاستراتيجية وحوكمة المحافظ',
      'تطبيق أطر العمل المرنة على مستوى المؤسسة (SAFe / Scrum)',
      'إدارة مخاطر المشاريع الضخمة والتحكم الصارم بالميزانيات',
      'إدارة القيمة المكتسبة وبناء لوحات التحكم القيادية',
    ],
    accreditationEn: 'PMI (PMP/CAPM) & Scrum Alliance Aligned Providers',
    accreditationAr: 'مزودون معتمدون متوافقون مع معايير معهد إدارة المشاريع PMI وScrum Alliance',
  },
  'cybersecurity-awareness': {
    slug: 'cybersecurity-awareness',
    titleEn: 'Enterprise Cybersecurity & Threat Awareness',
    titleAr: 'الأمن السيبراني المؤسسي والتوعية بالتهديدات',
    shortDescEn: 'Workforce cyber hygiene, threat intelligence, data protection, and incident recovery protocols.',
    shortDescAr: 'التوعية السيبرانية للموظفين، والاستجابة للحوادث، وحماية البيانات، وأمن المعلومات المؤسسي.',
    audienceEn: 'CISO Teams, IT Directors, Departmental Data Handlers, Enterprise Workforce',
    audienceAr: 'فرق أمن المعلومات CISO، مسؤولو التقنية، وفرق العمل المعنية بالبيانات الحساسة',
    deliveryFormatsEn: ['Simulated Phishing & Attack Scenarios', 'Onsite Defense Labs', 'Continuous Microlearning'],
    deliveryFormatsAr: ['محاكاة هجمات تصيد واحتيال واقعية', 'مختبرات دفاع سيبراني ميدانية', 'تعليم مصغر مستمر'],
    keyModulesEn: [
      'Enterprise Threat Landscape & Social Engineering Defense',
      'Data Privacy, GDPR & National Data Protection Laws',
      'Incident Response Protocols & Business Continuity',
      'Zero-Trust Architecture & Secure Access Management',
    ],
    keyModulesAr: [
      'مشهد التهديدات السيبرانية والتصدي للهندسة الاجتماعية',
      'أنظمة حماية البيانات الشخصية والامتثال للتشريعات الوطنية',
      'بروتوكولات الاستجابة للحوادث واستمرارية الأعمال',
      'أطر العمل وفق نموذج انعدام الثقة (Zero-Trust Architecture)',
    ],
    accreditationEn: 'CompTIA, ISACA, NCA, DESC Compliant Curricula',
    accreditationAr: 'مناهج متوافقة مع متطلبات الهيئة الوطنية للأمن السيبراني ومركز دبي للأمن الإلكتروني',
  },
};

export const ALL_SERVICE_SLUGS = Object.keys(SERVICE_VERTICALS);

// ============================================================================
// 2. TARGET MARKETS & CITIES CONFIGURATION
// ============================================================================
export const COUNTRIES_DATA: Record<CountryCode, CountryData> = {
  // --------------------------------------------------------------------------
  // UAE (ae)
  // --------------------------------------------------------------------------
  ae: {
    code: 'ae',
    isoCode: 'ARE',
    nameEn: 'United Arab Emirates',
    nameAr: 'دولة الإمارات العربية المتحدة',
    primaryLang: 'en',
    supportedLangs: ['en', 'ar'],
    publicPathPrefix: {
      en: '/ae',
      ar: '/ar-ae',
    },
    hreflangCode: {
      en: 'en-ae',
      ar: 'ar-ae',
    },
    currency: 'AED',
    currencySymbol: 'AED',
    currencyNameEn: 'UAE Dirham',
    currencyNameAr: 'درهم إماراتي',
    exchangeRateToUSD: 3.67,
    dialCode: '+971',
    capitalCity: 'Abu Dhabi',
    nationalInitiative: {
      en: 'Emiratisation (Tawteen) & UAE Centennial 2071',
      ar: 'مبادرات التوطين (نافس) ومئوية الإمارات 2071',
      descriptionEn: 'Align your executive and technical upskilling with MOHRE Emiratisation benchmarks, Nafis talent retention programs, and Dubai Economic Agenda (D33).',
      descriptionAr: 'تأهيل القيادات والكوادر بما يتوافق مع مستهدفات وزارة الموارد البشرية والتوطين، ومبادرات نافس، وأجندة دبي الاقتصادية D33.',
    },
    regulatoryBodies: ['MOHRE', 'Nafis', 'KHDA', 'ADGM Academy', 'DIFC Academy'],
    cities: [
      {
        slug: 'dubai',
        countryCode: 'ae',
        nameEn: 'Dubai',
        nameAr: 'دبي',
        lat: 25.2048,
        lng: 55.2708,
        districts: ['DIFC', 'Downtown Dubai', 'Dubai Internet City', 'Business Bay', 'Dubai South'],
        heroTitleEn: 'Enterprise Corporate Training & Executive Coaching in Dubai, UAE',
        heroTitleAr: 'التدريب المؤسسي والتطوير التنفيذي للشركات في دبي، الإمارات',
        leadParagraphEn: 'Connect your leadership and technical teams in Dubai with vetted, accredited corporate training academies. Tailored for DIFC finance giants, Dubai Internet City tech hubs, and multinational GCC regional headquarters.',
        leadParagraphAr: 'اربط قادة فرقك وكفاءاتك في دبي بأفضل أكاديميات ومزودي التدريب المؤسسي المعتمدين. حلول مخصصة للشركات المالية في مركز دبي المالي العالمي، ومجمعات التكنولوجيا، والمقار الإقليمية.',
        topIndustriesEn: ['Banking & Financial Services', 'Technology & AI', 'Real Estate & Hospitality', 'Aviation & Global Logistics'],
        topIndustriesAr: ['الخدمات المصرفية والمالية', 'التقنية والذكاء الاصطناعي', 'العقارات والضيافة', 'الطيران والخدمات اللوجستية'],
        budgetTiers: ['15,000 - 35,000 AED', '35,000 - 75,000 AED', '75,000 - 150,000+ AED'],
        faqsEn: [
          {
            q: 'How does PontLook assist Dubai organizations with Emiratisation (Nafis) quotas?',
            a: 'PontLook matches your HR leadership directly with training providers accredited by KHDA and MOHRE that specialize in fast-track national talent acceleration, leadership readiness, and professional certifications recognized by Nafis.',
          },
          {
            q: 'Can training providers deliver on-site workshops in DIFC and Dubai Internet City?',
            a: 'Yes. All vetted partners offer on-site delivery at corporate premises across DIFC, Downtown, DIC, and Dubai South, as well as executive retreats at premier Dubai venues.',
          },
          {
            q: 'What is the pricing model for Dubai corporate buyers on PontLook?',
            a: 'PontLook is 100% free for corporate buyers. We charge zero broker retainers. You receive 3 curated, direct proposals from top academies without platform markups.',
          },
          {
            q: 'What certifications do Dubai training academies support?',
            a: 'Accredited partners support CMI, ILM, PMP, SHRM, ACAMS, and KHDA-endorsed certificates customized to GCC procurement guidelines.',
          },
        ],
        faqsAr: [
          {
            q: 'كيف تساعد PontLook الشركات في دبي على تحقيق مستهدفات التوطين (نافس)؟',
            a: 'نربط إدارات الموارد البشرية بمزودي تدريب معتمدين من هيئة المعرفة KHDA ووزارة الموارد البشرية، متخصصين في تسريع جاهزية الكوادر الوطنية للوظائف القيادية والفنية.',
          },
          {
            q: 'هل يتوفر التدريب حضورياً في مقرات الشركات بمركز دبي المالي العالمي ومدينة دبي للإنترنت؟',
            a: 'نعم، يقدم شركاؤنا برامج تدريب حضورية داخل مقرات الشركات في مركز دبي المالي، وسط دبي، مدينة الإنترنت، ودبي الجنوب، بالإضافة إلى خلوات تدريبية تنفيذية.',
          },
          {
            q: 'ما هي تكلفة استخدام PontLook للمنشآت والمؤسسات في دبي؟',
            a: 'المنصة مجانية تماماً بنسبة 100% للشركات والمشترين المؤسسيين. لا توجد أي رسوم وساطة أو اشتراكات، وستتلقى عروضاً مباشرة من 3 أكاديميات معتمدة.',
          },
          {
            q: 'ما هي الاعتمادات الدولية التي تقدمها الأكاديميات في دبي؟',
            a: 'توفر الأكاديميات شهادات معتمدة من CMI وILM وPMP وSHRM وACAMS، إلى جانب تصديقات هيئة المعرفة والتنمية البشرية بدبي.',
          },
        ],
      },
      {
        slug: 'abu-dhabi',
        countryCode: 'ae',
        nameEn: 'Abu Dhabi',
        nameAr: 'أبوظبي',
        lat: 24.4539,
        lng: 54.3773,
        districts: ['ADGM (Al Maryah Island)', 'Al Reem Island', 'Masdar City', 'Khalifa City', 'Ruwais'],
        heroTitleEn: 'Corporate Training Providers & Strategic Upskilling in Abu Dhabi, UAE',
        heroTitleAr: 'مزودو التدريب المؤسسي والتطوير الاستراتيجي في أبوظبي، الإمارات',
        leadParagraphEn: 'Empower sovereign wealth funds, energy conglomerates, and government entities in Abu Dhabi with top-tier corporate training academies accredited by ACTVET and international bodies.',
        leadParagraphAr: 'تمكين صناديق الثروة السيادية، وقطاعات الطاقة، والهيئات الحكومية في أبوظبي ببرامج تدريبية معتمدة من مركز أبوظبي للتعليم والتدريب التقني والمهني (ACTVET) والجهات الدولية.',
        topIndustriesEn: ['Oil, Gas & Energy', 'Sovereign Wealth & Investment', 'Government & Public Sector', 'Defense & Aerospace'],
        topIndustriesAr: ['النفط والغاز والطاقة', 'الاستثمار السيادي والمالية', 'القطاع الحكومي وشبه الحكومي', 'الصناعات الدفاعية والتقنية'],
        budgetTiers: ['20,000 - 50,000 AED', '50,000 - 100,000 AED', '100,000 - 250,000+ AED'],
        faqsEn: [
          {
            q: 'Do training partners have ACTVET and government security clearance in Abu Dhabi?',
            a: 'Yes. Our specialized Abu Dhabi provider network holds ACTVET accreditation and experience delivering confidential in-house training for federal and local government entities.',
          },
          {
            q: 'Are programs available for energy sector safety and project management in Ruwais and Musaffah?',
            a: 'Yes. Providers deliver HSE, ISO, capital project governance, and specialized industrial engineering programs tailored for energy operating companies.',
          },
          {
            q: 'How fast can our procurement department receive competitive bids?',
            a: 'Within 48 hours of submitting your training parameters, you receive direct, standardized bids from up to 3 vetted academies.',
          },
          {
            q: 'Can training be conducted on Al Maryah Island or Masdar City?',
            a: 'Yes, on-premise training is available across ADGM, Masdar City, and executive conference centers in Abu Dhabi.',
          },
        ],
        faqsAr: [
          {
            q: 'هل يمتلك الشركاء اعتمادات ACTVET والتصاريح اللازمة للجهات الحكومية بأبوظبي؟',
            a: 'نعم، يمتلك مزودونا في أبوظبي اعتمادات مركز أبوظبي للتعليم والتدريب التقني والمهني (ACTVET) وخبرات موثقة مع الجهات الحكومية والسيادية.',
          },
          {
            q: 'هل تتوفر برامج متخصصة لقطاع الطاقة وإدارة المشاريع في الرويس ومصفح؟',
            a: 'نعم، يقدم شركاؤنا برامج السلامة المهنية والصناعية HSE وإدارة المشاريع الرأسمالية المصممة لشركات النفط والغاز والصناعات التحويلية.',
          },
          {
            q: 'كم يستغرق استلام عروض التدريب لإدارات المشتريات بأبوظبي؟',
            a: 'خلال 48 ساعة فقط من تقديم الاحتياج التدريبي، ستصلك عروض متكاملة ومباشرة من 3 أكاديميات متخصصة ومؤهلة.',
          },
          {
            q: 'هل يمكن تنفيذ الدورات في جزيرة المارية أو مدينة مصدر؟',
            a: 'نعم، التدريب متاح داخل مقرات المنشآت في سوق أبوظبي العالمي (ADGM)، ومدينة مصدر، ومراكز التدريب المعتمدة.',
          },
        ],
      },
      {
        slug: 'sharjah',
        countryCode: 'ae',
        nameEn: 'Sharjah',
        nameAr: 'الشارقة',
        lat: 25.3463,
        lng: 55.4209,
        districts: ['Sharjah Research Technology and Innovation Park (SRTIP)', 'Al Majaz', 'SAIF Zone', 'Hamriyah'],
        heroTitleEn: 'Industrial & Executive Corporate Training in Sharjah, UAE',
        heroTitleAr: 'التدريب المؤسسي والصناعي والتنفيذي في الشارقة، الإمارات',
        leadParagraphEn: 'Customized workforce training programs for manufacturing pioneers, industrial free zones, and academic research institutions in Sharjah.',
        leadParagraphAr: 'برامج تدريبية متخصصة للمصانع والمنشآت الصناعية، ومناطق التجارة الحرة، ومراكز الابتكار والبحث العلمي في الشارقة.',
        topIndustriesEn: ['Industrial Manufacturing', 'Supply Chain & Logistics', 'Education & Research', 'SME Business Management'],
        topIndustriesAr: ['التصنيع الصناعي', 'سلاسل الإمداد والخدمات اللوجستية', 'التعليم والبحوث', 'إدارة وتطوير المنشآت'],
        budgetTiers: ['12,000 - 30,000 AED', '30,000 - 60,000 AED', '60,000 - 120,000+ AED'],
        faqsEn: [
          {
            q: 'Can training providers deliver operational upskilling inside Hamriyah Free Zone?',
            a: 'Yes, our trainers conduct on-site workshops across Hamriyah Free Zone, SAIF Zone, and Sharjah Industrial areas.',
          },
          {
            q: 'Are courses customized for SME managers in Sharjah?',
            a: 'Yes, academies offer practical commercial, financial, and digital transformation workshops designed for mid-market GCC enterprises.',
          },
          {
            q: 'Is bilingual English and Arabic instruction provided?',
            a: 'Every matched training partner provides fluent native Arabic and English subject-matter instructors.',
          },
          {
            q: 'How does PontLook verify provider credentials in Sharjah?',
            a: 'We review trade licensing, corporate client references, instructor certifications, and compliance standards before recommending any academy.',
          },
        ],
        faqsAr: [
          {
            q: 'هل يقدم المدربون برامج تأهيل فني داخل المنطقة الحرة بالحمرية؟',
            a: 'نعم، ينفذ مزودونا برامج تدريب ميدانية في المنطقة الحرة بالحمرية، ومطار الشارقة الدولي للحرية (سيف زون)، والمناطق الصناعية.',
          },
          {
            q: 'هل الدورات مصممة لتناسب الشركات المتوسطة والصغيرة بالشارقة؟',
            a: 'نعم، تتوفر برامج عملية في الإدارة المالية، وتطوير المبيعات، والتحول الرقمي مصممة خصيصاً للشركات المتنامية.',
          },
          {
            q: 'هل التدريب متاح باللغتين العربية والإنجليزية؟',
            a: 'جميع الأكاديميات المعتمدة توفر مدربين معتمدين وخبراء يقدمون المحتوى باللغتين العربية والإنجليزية بطلاقة.',
          },
          {
            q: 'كيف تضمن PontLook جودة الأكاديميات في الشارقة؟',
            a: 'نقوم بالتحقق من التراخيص، وسجلات التدريب السابقة للشركات الكبرى، واعتمادات المدربين قبل تقديم أي ترشيح.',
          },
        ],
      },
      {
        slug: 'fujairah',
        countryCode: 'ae',
        nameEn: 'Fujairah',
        nameAr: 'الفجيرة',
        lat: 25.1288,
        lng: 56.3265,
        districts: ['Fujairah Port & Bunkering Zone', 'Fujairah Free Zone', 'Al Faseel', 'Qidfa'],
        heroTitleEn: 'Maritime, Logistics & Safety Corporate Training in Fujairah, UAE',
        heroTitleAr: 'التدريب المؤسسي لقطاعات الملاحة واللوجستيات والسلامة في الفجيرة',
        leadParagraphEn: 'Specialized enterprise training in QHSE, bunkering operations, supply chain resilience, and executive management for Fujairah commercial enterprises.',
        leadParagraphAr: 'برامج تدريبية متقدمة في الصحة والسلامة والبيئة (QHSE)، والعمليات اللوجستية والمينائية، وتطوير القيادات لشركات الفجيرة.',
        topIndustriesEn: ['Maritime & Bunkering', 'Logistics & Warehousing', 'Heavy Industry & Mining', 'Commercial Hospitality'],
        topIndustriesAr: ['الملاحة وتزويد السفن بالوقود', 'الخدمات اللوجستية والتخزين', 'التعدين والصناعات الثقيلة', 'الضيافة والسياحة'],
        budgetTiers: ['15,000 - 30,000 AED', '30,000 - 60,000 AED', '60,000 - 120,000+ AED'],
        faqsEn: [
          {
            q: 'Are maritime safety and international port security courses available?',
            a: 'Yes, partners provide accredited IMO, ISPS, and NEBOSH certifications directly applicable to Fujairah port operations.',
          },
          {
            q: 'Can instructors travel to Fujairah for intensive multi-day cohorts?',
            a: 'Yes, vetted training academies deploy senior facilitators for multi-day on-site programs in Fujairah.',
          },
          {
            q: 'Does PontLook handle quotes for public sector entities in Fujairah?',
            a: 'Yes, our platform accommodates public procurement requests and formal tender benchmarks.',
          },
          {
            q: 'What is the minimum cohort size?',
            a: 'Programs scale from small executive cohorts of 4-8 leaders to company-wide deployments of 100+ professionals.',
          },
        ],
        faqsAr: [
          {
            q: 'هل تتوفر دورات السلامة البحرية وأمن الموانئ المعتمدة دولياً؟',
            a: 'نعم، يقدم شركاؤنا شهادات معتمدة وفق متطلبات IMO وISPS ومعايير السلامة المهنية NEBOSH المعتمدة لعمليات الموانئ.',
          },
          {
            q: 'هل يمكن للمدربين الحضور إلى الفجيرة لتنفيذ برامج مكثفة؟',
            a: 'نعم، ترسل الأكاديميات المعتمدة نخبة من الخبراء والاستشاريين لتقديم برامج مكثفة في مقرات الشركات بالفجيرة.',
          },
          {
            q: 'هل تدعم المنصة متطلبات مشتريات الجهات الحكومية بالفجيرة؟',
            a: 'نعم، تدعم المنصة استدراج العروض المؤسسية المتوافقة مع معايير المناقصات والعقود الحكومية.',
          },
          {
            q: 'ما هو الحد الأدنى لعدد المتدربين في الدفعة الواحدة؟',
            a: 'تتراوح البرامج من مجموعات قيادية صغيرة (4-8 أفراد) وحتى برامج تأهيل شاملة لأكثر من 100 موظف.',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Saudi Arabia (sa)
  // --------------------------------------------------------------------------
  sa: {
    code: 'sa',
    isoCode: 'SAU',
    nameEn: 'Saudi Arabia',
    nameAr: 'المملكة العربية السعودية',
    primaryLang: 'ar',
    supportedLangs: ['ar', 'en'],
    publicPathPrefix: {
      ar: '/sa',
      en: '/en-sa',
    },
    hreflangCode: {
      ar: 'ar-sa',
      en: 'en-sa',
    },
    currency: 'SAR',
    currencySymbol: 'SAR',
    currencyNameEn: 'Saudi Riyal',
    currencyNameAr: 'ريال سعودي',
    exchangeRateToUSD: 3.75,
    dialCode: '+966',
    capitalCity: 'Riyadh',
    nationalInitiative: {
      en: 'Vision 2030 & Nitaqat Saudization',
      ar: 'رؤية المملكة 2030 وبرنامج نطاقات للتوطين',
      descriptionEn: 'Fast-track enterprise workforce nationalization with TVTC-accredited training academies, meeting strict Saudization quotas and Human Capability Development Program goals.',
      descriptionAr: 'تسريع وتيرة التوطين المؤسسي وتأهيل الكفاءات الوطنية عبر أكاديميات معتمدة من المؤسسة العامة للتدريب التقني والمهني (TVTC) ومتوافقة مع برنامج تنمية القدرات البشرية.',
    },
    regulatoryBodies: ['TVTC', 'HRSD (Ministry of Human Resources)', 'HCDP', 'Monshaat', 'SDAIA'],
    cities: [
      {
        slug: 'riyadh',
        countryCode: 'sa',
        nameEn: 'Riyadh',
        nameAr: 'الرياض',
        lat: 24.7136,
        lng: 46.6753,
        districts: ['KAFD (King Abdullah Financial District)', 'Riyadh Business Gate', 'Olaya Commercial Hub', 'Digital City', 'Diplomatic Quarter'],
        heroTitleEn: 'Corporate Training Providers & Executive Upskilling in Riyadh, Saudi Arabia',
        heroTitleAr: 'مزودو التدريب المؤسسي والتطوير التنفيذي في الرياض، السعودية',
        leadParagraphEn: 'Connect your corporate leadership and talent teams in Riyadh with premier TVTC-accredited corporate training academies. Built for KAFD financial institutions, giga-project entities, and Vision 2030 national transformation leaders.',
        leadParagraphAr: 'اربط قياداتك المؤسسية وكفاءاتك في الرياض بأفضل الأكاديميات المعتمدة من المؤسسة العامة للتدريب التقني والمهني (TVTC). حلول رائدة لمؤسسات مركز الملك عبدالله المالي، والجهات الحكومية، والمشاريع الكبرى.',
        topIndustriesEn: ['Government & Giga-Projects', 'Banking & Fintech', 'AI & Digital Infrastructure', 'Healthcare & Pharmaceuticals'],
        topIndustriesAr: ['القطاع الحكومي والمشاريع الكبرى', 'الخدمات البنكية والتقنية المالية', 'الذكاء الاصطناعي والبنية الرقمية', 'الرعاية الصحية والأدوية'],
        budgetTiers: ['25,000 - 60,000 SAR', '60,000 - 150,000 SAR', '150,000 - 350,000+ SAR'],
        faqsEn: [
          {
            q: 'How does PontLook verify TVTC accreditation for Riyadh training providers?',
            a: 'Every provider matched for Saudi requests must submit active TVTC licenses, commercial registrations, and documented corporate case studies with verified local enterprises.',
          },
          {
            q: 'Are on-site executive leadership masterclasses offered at KAFD and Riyadh Business Gate?',
            a: 'Yes, our partners frequently deliver custom on-site workshops and confidential boardroom modules across KAFD, Digital City, and major corporate headquarters.',
          },
          {
            q: 'How do these programs support Nitaqat Saudization quotas?',
            a: 'Partners design targeted fast-track academies that qualify Saudi nationals for managerial, technical, and executive roles, fulfilling HRSD ministry compliance criteria.',
          },
          {
            q: 'What is the response turnaround for Riyadh corporate inquiries?',
            a: 'You receive 3 tailored proposals from accredited providers within 48 hours of completing the 60-second requirement form.',
          },
        ],
        faqsAr: [
          {
            q: 'كيف تتحقق PontLook من اعتماد المؤسسة العامة للتدريب التقني والمهني (TVTC) لمزودي الرياض؟',
            a: 'يشترط على كل معهد أو أكاديمية تقديم تراخيص TVTC سارية، وسجل تجاري معتمد، وسجلات خبرة موثقة مع كبرى الشركات السعودية.',
          },
          {
            q: 'هل تتوفر ورش عمل قيادية حضورية في مركز الملك عبدالله المالي (KAFD) وبوابة الأعمال؟',
            a: 'نعم، يقدم شركاؤنا برامج تدريب حضورية مصممة خصيصاً داخل مقرات الشركات في KAFD، والمدينة الرقمية، ومقار الوزارات والجهات الكبرى.',
          },
          {
            q: 'كيف تساهم هذه البرامج في دعم نسب التوطين ونطاقات؟',
            a: 'تساعد البرامج على تأهيل الكفاءات الوطنية لتولي المناصب الإدارية والتخصصية المعقدة، بما يحقق مستهدفات وزارة الموارد البشرية وبرنامج تنمية القدرات البشرية.',
          },
          {
            q: 'ما هي سرعة الاستجابة لطلبات التدريب في الرياض؟',
            a: 'تتلقى إدارات الموارد البشرية 3 عروض مفصلة من أكاديميات معتمدة خلال 48 ساعة فقط من تعبئة متطلبات التدريب.',
          },
        ],
      },
      {
        slug: 'jeddah',
        countryCode: 'sa',
        nameEn: 'Jeddah',
        nameAr: 'جدة',
        lat: 21.5433,
        lng: 39.1728,
        districts: ['Al Andalus Corporate Strip', 'Jeddah Waterfront', 'King Abdullah Port (KAEC)', 'Al Hamra'],
        heroTitleEn: 'Commercial & Executive Corporate Training in Jeddah, Saudi Arabia',
        heroTitleAr: 'التدريب المؤسسي والتجاري والتنفيذي في جدة، السعودية',
        leadParagraphEn: 'Empower retail conglomerates, logistics hubs, and family conglomerates in Jeddah with verified corporate trainers specializing in commercial negotiation, GRC, and digital transformation.',
        leadParagraphAr: 'تطوير كفاءات الشركات التجارية العائلية، والقطاعات اللوجستية، ومجموعات التجزئة في جدة عبر مزودي تدريب معتمدين في التفاوض التجاري، والحوكمة، والتحول الرقمي.',
        topIndustriesEn: ['Commercial Trade & Retail', 'Logistics & Maritime', 'Family Conglomerates & Real Estate', 'Tourism & Aviation'],
        topIndustriesAr: ['التجارة ومجموعات التجزئة', 'الخدمات اللوجستية والموانئ', 'الشركات العائلية والاستثمار', 'السياحة وخدمات الضيافة'],
        budgetTiers: ['20,000 - 50,000 SAR', '50,000 - 120,000 SAR', '120,000 - 250,000+ SAR'],
        faqsEn: [
          {
            q: 'Can training programs be delivered at King Abdullah Economic City (KAEC)?',
            a: 'Yes, our provider network regularly conducts on-site training sessions at KAEC and corporate offices along Andalus and Corniche corridors.',
          },
          {
            q: 'Are programs available for family business governance and succession planning?',
            a: 'Yes, we match Jeddah family business leaders with top executive coaches and governance consultants specialized in GCC family governance frameworks.',
          },
          {
            q: 'What training formats are most popular in Jeddah?',
            a: 'Intensive 2-day on-site workshops followed by 6 weeks of digital reinforcement are the benchmark format requested by Jeddah corporations.',
          },
          {
            q: 'Is bilingual Arabic and English training available?',
            a: 'Yes, all training materials and facilitators are fully bilingual.',
          },
        ],
        faqsAr: [
          {
            q: 'هل يمكن تقديم البرامج التدريبية في مدينة الملك عبدالله الاقتصادية (KAEC)؟',
            a: 'نعم، يقدم شركاؤنا برامج ميدانية مستمرة في مدينة الملك عبدالله الاقتصادية والمناطق التجارية بطريق الأندلس والكورنيش.',
          },
          {
            q: 'هل تتوفر برامج لحوكمة الشركات العائلية وإعداد قادة المستقبل؟',
            a: 'نعم، نربط الشركات العائلية بنخبة من مستشاري الحوكمة والكوتشينغ التنفيذي المتخصصين في انتقال القيادة واستدامة الأعمال العائلية.',
          },
          {
            q: 'ما هي صيغ التدريب الأكثر طلباً في جدة؟',
            a: 'ورش العمل الحضورية المكثفة (يومان) تليها متابعة رقمية وتطبيقات عملية لعدة أسابيع هي النموذج الأكثر طلباً لدى منشآت جدة.',
          },
          {
            q: 'هل تتوفر المواد التدريبية باللغتين العربية والإنجليزية؟',
            a: 'نعم، جميع المواد والحقائب التدريبية والنقاشات يقدمها خبراء متمرسون باللغتين العربية والإنجليزية.',
          },
        ],
      },
      {
        slug: 'dammam',
        countryCode: 'sa',
        nameEn: 'Dammam & Eastern Province',
        nameAr: 'الدمام والمنطقة الشرقية',
        lat: 26.4207,
        lng: 50.0888,
        districts: ['Khobar Corniche Commercial Center', 'Dammam 2nd Industrial City', 'Jubail Industrial City', 'Dhahran Techno Valley'],
        heroTitleEn: 'Industrial, Energy & Technical Corporate Training in Dammam, Saudi Arabia',
        heroTitleAr: 'التدريب المؤسسي والصناعي والتقني في الدمام والخبر، السعودية',
        leadParagraphEn: 'High-impact technical, safety (QHSE), and operational excellence training for energy majors, industrial manufacturers, and tech incubators across Dammam, Khobar, and Jubail.',
        leadParagraphAr: 'برامج تدريبية متخصصة في السلامة والصحة المهنية (QHSE)، والتميز التشغيلي، والقيادة الهندسية لكبرى شركات الطاقة والصناعة في الدمام والخبر والجبيل.',
        topIndustriesEn: ['Oil, Petrochemicals & Energy', 'Heavy Industrial Manufacturing', 'Industrial Logistics & Port Services', 'Engineering & EPC Contracting'],
        topIndustriesAr: ['النفط والبتروكيماويات والطاقة', 'الصناعات الثقيلة والتصنيع', 'الخدمات اللوجستية والموانئ', 'المقاولات الهندسية الكبرى (EPC)'],
        budgetTiers: ['25,000 - 60,000 SAR', '60,000 - 150,000 SAR', '150,000 - 300,000+ SAR'],
        faqsEn: [
          {
            q: 'Are safety programs compliant with Aramco IKTVA and OSHA standards?',
            a: 'Yes, matched providers offer accredited QHSE, Process Safety Management (PSM), and OSHA certifications meeting Aramco vendor qualifications.',
          },
          {
            q: 'Can academies deliver on-site training in Jubail Industrial City?',
            a: 'Yes, our trainers routinely conduct industrial plant and corporate facility training across Jubail, Ras Al Khair, and Dammam Industrial Cities.',
          },
          {
            q: 'Do providers offer Project Management Professional (PMP) courses for engineers?',
            a: 'Yes, intensive PMP and Agile engineering delivery courses are among the most frequently requested verticals in the Eastern Province.',
          },
          {
            q: 'How are training outcomes measured?',
            a: 'Our providers incorporate pre- and post-assessments with executive progress dashboards for HR and PMO leadership.',
          },
        ],
        faqsAr: [
          {
            q: 'هل برامج السلامة متوافقة مع متطلبات برنامج أرامكو لتعزيز القيمة المضافة (اكتفاء - IKTVA)؟',
            a: 'نعم، يقدم شركاؤنا برامج سلامة مهنية وبيئية وإدارة سلامة العمليات متوافقة تماماً مع معايير أرامكو واشتراطات اكتفاء.',
          },
          {
            q: 'هل يمكن تنفيذ الدورات في المجمعات الصناعية بالجبيل ورأس الخير؟',
            a: 'نعم، ينفذ المدربون البرامج داخل المنشآت الصناعية والمصانع في مدن الجبيل الصناعية ورأس الخير والدمام.',
          },
          {
            q: 'هل تتوفر دورات إدارة المشاريع الاحترافية (PMP) للمهندسين؟',
            a: 'نعم، تعتبر دورات PMP المعتمدة وإدارة المشاريع الرأسمالية من أكثر البرامج طلباً للمهندسين وقادة المشاريع بالمنطقة الشرقية.',
          },
          {
            q: 'كيف يتم قياس أثر التدريب للشركات؟',
            a: 'تعتمد الأكاديميات اختبارات قبلية وبعدية ولوحات مؤشرات أداء تفصيلية تسلم لإدارات الموارد البشرية بعد انتهاء التدريب.',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // United Kingdom (uk)
  // --------------------------------------------------------------------------
  uk: {
    code: 'uk',
    isoCode: 'GBR',
    nameEn: 'United Kingdom',
    nameAr: 'المملكة المتحدة',
    primaryLang: 'en',
    supportedLangs: ['en'],
    publicPathPrefix: {
      en: '/uk',
    },
    hreflangCode: {
      en: 'en-gb',
    },
    currency: 'GBP',
    currencySymbol: '£',
    currencyNameEn: 'British Pound',
    currencyNameAr: 'جنيه إسترليني',
    exchangeRateToUSD: 1.28,
    dialCode: '+44',
    capitalCity: 'London',
    nationalInitiative: {
      en: 'Apprenticeship Levy & CPD Standards Compliance',
      ar: 'ضريبة التلمذة المهنية ومعايير التطوير المهني المستمر (CPD)',
      descriptionEn: 'Maximize enterprise Apprenticeship Levy utilization and professional CPD accreditation aligned with CMI, ILM, and British corporate governance benchmarks.',
      descriptionAr: 'الاستفادة القصوى من ضريبة التلمذة المهنية واعتمادات التطوير المهني المستمر CMI وILM وحوكمة الشركات البريطانية.',
    },
    regulatoryBodies: ['CPD Standards Office', 'CMI', 'ILM', 'Ofqual', 'FCA (Financial Conduct Authority)'],
    cities: [
      {
        slug: 'london',
        countryCode: 'uk',
        nameEn: 'London',
        nameAr: 'لندن',
        lat: 51.5074,
        lng: -0.1278,
        districts: ['City of London (Square Mile)', 'Canary Wharf', 'Mayfair Financial District', 'King’s Cross Tech Corridor'],
        heroTitleEn: 'Executive Corporate Training & Leadership Development in London, UK',
        heroTitleAr: 'التطوير التنفيذي والتدريب المؤسسي للشركات في لندن، المملكة المتحدة',
        leadParagraphEn: 'Connect FTSE 100 leaders, Canary Wharf investment institutions, and tech enterprises with top-tier corporate training academies accredited by CMI, CPD Standards, and the ILM.',
        leadParagraphAr: 'ربط قيادات شركات مؤشر فوتسي 100 والمؤسسات المالية في كناري وارف بمزودي التدريب التنفيذي المعتمدين من CMI وILM وهيئات التطوير المستمر.',
        topIndustriesEn: ['Investment Banking & Wealth Management', 'Fintech & AI Ventures', 'Corporate Legal Services', 'Management Consulting'],
        topIndustriesAr: ['الخدمات المصرفية الاستثمارية', 'التقنية المالية والذكاء الاصطناعي', 'الخدمات القانونية الدولية', 'الاستشارات الإدارية'],
        budgetTiers: ['£5,000 - £15,000', '£15,000 - £40,000', '£40,000 - £100,000+'],
        faqsEn: [
          {
            q: 'Are trainers accredited by the CPD Standards Office and CMI in London?',
            a: 'Yes. All matched providers hold formal accreditations from CMI, ILM, or the CPD Standards Office to ensure points are valid for professional development records.',
          },
          {
            q: 'Can workshops be conducted in Canary Wharf or City of London offices?',
            a: 'Yes, trainers provide fully tailored on-site delivery across Canary Wharf, the Square Mile, and central London corporate boardrooms.',
          },
          {
            q: 'How does PontLook fit into UK enterprise procurement portals?',
            a: 'We provide streamlined documentation, direct academy introductions, and transparent RFP benchmarking that complies with UK corporate procurement rules.',
          },
          {
            q: 'Do providers offer FCA compliance and Anti-Money Laundering training?',
            a: 'Yes, specialized financial regulatory compliance is one of our flagship verticals for London institutions.',
          },
        ],
        faqsAr: [
          {
            q: 'هل المدربون معتمدون من هيئة CPD وCMI في لندن؟',
            a: 'نعم، جميع مزودينا معتمدون رسمياً لضمان احتساب ساعات التطوير المهني المستمر للمتدربين.',
          },
          {
            q: 'هل يمكن تنظيم ورش العمل داخل مقرات الشركات في كناري وارف أو حي المال؟',
            a: 'نعم، يقدم المدربون برامج حضورية في مقرات الشركات بالحي المالي وكناري وارف وكافة مناطق وسط لندن.',
          },
          {
            q: 'كيف تتوافق PontLook مع إجراءات الشراء المؤسسي في بريطانيا؟',
            a: 'نوفر وثائق معتمدة وعروض أسعار واضحة تلبي شروط الحوكمة والمشتريات المؤسسية البريطانية.',
          },
          {
            q: 'هل تتوفر برامج امتثال للأنظمة المالية وهيئة السلوك المالي (FCA)؟',
            a: 'نعم، برامج الامتثال المالي ومكافحة غسل الأموال متوفرة بكثافة للمؤسسات المصرفية والاستثمارية.',
          },
        ],
      },
      {
        slug: 'manchester',
        countryCode: 'uk',
        nameEn: 'Manchester',
        nameAr: 'مانشستر',
        lat: 53.4808,
        lng: -2.2426,
        districts: ['Spinningfields Commercial District', 'MediaCityUK', 'Manchester Science Park', 'Piccadilly'],
        heroTitleEn: 'Digital, Commercial & Corporate Training in Manchester, UK',
        heroTitleAr: 'التدريب المؤسسي والرقمي والتجاري في مانشستر، المملكة المتحدة',
        leadParagraphEn: 'Modern leadership, digital transformation, and commercial excellence workshops for northern powerhouse enterprises across Spinningfields and MediaCityUK.',
        leadParagraphAr: 'برامج تدريبية رائدة في التحول الرقمي والقيادة المؤسسية والمبيعات للشركات الكبرى في مانشستر وميديا سيتي.',
        topIndustriesEn: ['Digital Media & Creative Tech', 'E-commerce & Consumer Goods', 'Legal & Professional Services', 'Advanced Manufacturing'],
        topIndustriesAr: ['الإعلام الرقمي والتقنية', 'التجارة الإلكترونية والسلع الاستهلاكية', 'الخدمات المهنية والقانونية', 'التصنيع المتقدم'],
        budgetTiers: ['£4,000 - £12,000', '£12,000 - £30,000', '£30,000 - £80,000+'],
        faqsEn: [
          {
            q: 'Can training providers deliver on-site in MediaCityUK or Spinningfields?',
            a: 'Yes, providers frequently deliver hands-on programs on-site across Greater Manchester corporate hubs.',
          },
          {
            q: 'Do you offer Agile and Product Management bootcamps for Manchester tech firms?',
            a: 'Yes, Scrum Alliance and SAFe accredited practitioners deliver customized product and engineering workshops.',
          },
          {
            q: 'What is the average turnaround time to receive quotes?',
            a: 'You receive 3 competitive quotes from accredited academies within 48 hours.',
          },
          {
            q: 'Can programs be customized to hybrid work arrangements?',
            a: 'Yes, blended learning with interactive virtual masterclasses is readily available.',
          },
        ],
        faqsAr: [
          {
            q: 'هل يمكن تنفيذ التدريب في ميديا سيتي أو سبينينغفيلدز؟',
            a: 'نعم، يتواجد مدربونا في مقرات الشركات في مانشستر الكبرى وكافة مجمعات الأعمال.',
          },
          {
            q: 'هل تتوفر برامج التحول المرن Agile وإدارة المنتجات لشركات التقنية؟',
            a: 'نعم، تتوفر برامج معتمدة من Scrum Alliance وSAFe لفرق تطوير المنتجات والتقنية.',
          },
          {
            q: 'كم يستغرق استلام عروض الأسعار في مانشستر؟',
            a: 'تتلقى الشركات 3 عروض أسعار تنافسية خلال 48 ساعة من طلب الاحتياج.',
          },
          {
            q: 'هل تدعم البرامج صيغ العمل والتدريب الهجين؟',
            a: 'نعم، يقدم الشركاء حلول تدريب هجينة تجمع بين الحضور الفعلي والورش الافتراضية التفاعلية.',
          },
        ],
      },
      {
        slug: 'birmingham',
        countryCode: 'uk',
        nameEn: 'Birmingham & West Midlands',
        nameAr: 'برمنغهام وميدلاندز',
        lat: 52.4862,
        lng: -1.8904,
        districts: ['Colmore Business District', 'Brindleyplace', 'Birmingham Innovation Quarter', 'Solihull Tech Hub'],
        heroTitleEn: 'Industrial, Engineering & Leadership Training in Birmingham, UK',
        heroTitleAr: 'التدريب المؤسسي والهندسي والقيادي في برمنغهام، المملكة المتحدة',
        leadParagraphEn: 'High-impact engineering governance, supply chain resilience, and managerial capacity building for West Midlands manufacturing and professional services enterprises.',
        leadParagraphAr: 'برامج تدريبية متخصصة في الإدارة الهندسية وسلاسل الإمداد وبناء القدرات القيادية لشركات ومصانع برمنغهام.',
        topIndustriesEn: ['Automotive & Advanced Engineering', 'Professional & Financial Services', 'Construction & Infrastructure', 'Life Sciences'],
        topIndustriesAr: ['صناعة السيارات والهندسة المتقدمة', 'الخدمات المالية والمهنية', 'البناء والإنشاءات', 'العلوم الطبية والحيوية'],
        budgetTiers: ['£4,000 - £12,000', '£12,000 - £28,000', '£28,000 - £75,000+'],
        faqsEn: [
          {
            q: 'Are engineering project management courses aligned with APM standards?',
            a: 'Yes, providers offer Association for Project Management (APM) and PRINCE2 certified training.',
          },
          {
            q: 'Can training be hosted on-premise at automotive and manufacturing plants?',
            a: 'Yes, senior instructors conduct customized on-site workshops across the West Midlands manufacturing corridor.',
          },
          {
            q: 'How does PontLook vet training partners in Birmingham?',
            a: 'We evaluate accreditations, corporate track records, and participant evaluation metrics before any introduction.',
          },
          {
            q: 'Is PontLook free for corporate HR teams in Birmingham?',
            a: 'Yes, PontLook is 100% free for buyers with zero subscription or broker fees.',
          },
        ],
        faqsAr: [
          {
            q: 'هل دورات إدارة المشاريع الهندسية متوافقة مع معايير APM البريطانية؟',
            a: 'نعم، يقدم شركاؤنا شهادات معتمدة من جمعية إدارة المشاريع (APM) وPRINCE2.',
          },
          {
            q: 'هل يمكن عقد التدريب داخل مصانع السيارات والمنشآت الهندسية؟',
            a: 'نعم، ينفذ الخبراء ورش عمل تطبيقية داخل المنشآت الصناعية في منطقة ميدلاندز.',
          },
          {
            q: 'كيف تضمن المنصة جودة الشركاء في برمنغهام؟',
            a: 'ندقق في الاعتمادات الرسمية وسجلات التدريب وتقييمات المتدربين السابقة بدقة عالية.',
          },
          {
            q: 'هل المنصة مجانية لفرق الموارد البشرية في برمنغهام؟',
            a: 'نعم، الخدمة مجانية تماماً للمشترين المؤسسيين بدون أي اشتراكات أو رسوم وسيط.',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // United States (us)
  // --------------------------------------------------------------------------
  us: {
    code: 'us',
    isoCode: 'USA',
    nameEn: 'United States',
    nameAr: 'الولايات المتحدة الأمريكية',
    primaryLang: 'en',
    supportedLangs: ['en'],
    publicPathPrefix: {
      en: '/us',
    },
    hreflangCode: {
      en: 'en-us',
    },
    currency: 'USD',
    currencySymbol: '$',
    currencyNameEn: 'US Dollar',
    currencyNameAr: 'دولار أمريكي',
    exchangeRateToUSD: 1.0,
    dialCode: '+1',
    capitalCity: 'Washington, D.C.',
    nationalInitiative: {
      en: 'SHRM Recertification & Fortune 500 Executive Capability',
      ar: 'معايير SHRM وتطوير القدرات التنفيذية للشركات الكبرى',
      descriptionEn: 'Equip senior leadership and technical talent with enterprise training programs certified for SHRM professional development credits (PDCs) and IACET standards.',
      descriptionAr: 'تأهيل القيادات والكوادر الفنية ببرامج تدريبية معتمدة لساعات التطوير المهني من SHRM ومعايير IACET العالمية.',
    },
    regulatoryBodies: ['SHRM', 'ATD', 'IACET', 'PMI', 'FINRA Compliance'],
    cities: [
      {
        slug: 'new-york',
        countryCode: 'us',
        nameEn: 'New York City',
        nameAr: 'نيويورك',
        lat: 40.7128,
        lng: -74.006,
        districts: ['Manhattan Financial District (Wall St)', 'Midtown Corporate Row', 'Hudson Yards Tech Hub', 'Silicon Alley'],
        heroTitleEn: 'Executive Leadership & Corporate Training in New York City, USA',
        heroTitleAr: 'التعليم التنفيذي والتدريب المؤسسي في نيويورك، الولايات المتحدة',
        leadParagraphEn: 'High-stakes executive coaching, Wall Street commercial negotiation, and GRC masterclasses for New York financial institutions, global law firms, and media conglomerates.',
        leadParagraphAr: 'برامج الكوتشينغ التنفيذي، والتفاوض التجاري المالي، والحوكمة وإدارة المخاطر للبنوك والمؤسسات العالمية في نيويورك.',
        topIndustriesEn: ['Wall Street Financial Services', 'Corporate Legal & Advisory', 'Media, Entertainment & Publishing', 'Enterprise SaaS & AI'],
        topIndustriesAr: ['الخدمات المالية وول ستريت', 'الاستشارات والشركات القانونية', 'الإعلام والترفيه والنشر', 'شركات التقنية والبرمجيات'],
        budgetTiers: ['$10,000 - $25,000', '$25,000 - $60,000', '$60,000 - $150,000+'],
        faqsEn: [
          {
            q: 'Do New York corporate training courses qualify for SHRM PDCs and NASBA CPE credits?',
            a: 'Yes, matched providers offer accredited courses eligible for SHRM PDCs and NASBA Continuing Professional Education credits for CPAs.',
          },
          {
            q: 'Can instructors deliver on-site in Midtown Manhattan or Hudson Yards?',
            a: 'Yes, vetted partners provide executive-level on-site masterclasses in corporate offices across Manhattan.',
          },
          {
            q: 'How does PontLook vet enterprise academies in New York?',
            a: 'We evaluate instructor bios, Fortune 500 client case studies, accreditation status, and Net Promoter Scores before recommending any academy.',
          },
          {
            q: 'What is the lead time for an executive offsite cohort?',
            a: 'We can match your enterprise with accredited leadership facilitators within 48 hours for cohorts launching within 2-4 weeks.',
          },
        ],
        faqsAr: [
          {
            q: 'هل تؤهل الدورات للحصول على ساعات معتمدة من SHRM وNASBA في نيويورك؟',
            a: 'نعم، يقدم شركاؤنا برامج معتمدة لساعات التطوير المهني المستمر المعتمدة للمدراء والمحاسبين القانونيين.',
          },
          {
            q: 'هل يمكن حضور المدربين لمقرات الشركات في مانهاتن وهدسون ياردز؟',
            a: 'نعم، يقدم المدربون ورش عمل تنفيذية داخل مقرات الشركات في كافة مناطق مانهاتن.',
          },
          {
            q: 'كيف تتحقق المنصة من كفاءة الأكاديميات في نيويورك؟',
            a: 'نقوم بالتحقق من سير المدربين الذاتية، وخبراتهم مع كبرى الشركات المدرجة، وسجلات رضا العملاء بدقة.',
          },
          {
            q: 'كم يستغرق التنسيق لخلوة تدريبية تنفيذية؟',
            a: 'نقدم 3 ترشيحات مؤكدة خلال 48 ساعة لبرامج يمكن إطلاقها خلال أسبوعين إلى 4 أسابيع.',
          },
        ],
      },
      {
        slug: 'chicago',
        countryCode: 'us',
        nameEn: 'Chicago',
        nameAr: 'شيكاغو',
        lat: 41.8781,
        lng: -87.6298,
        districts: ['Chicago Loop Financial Core', 'Fulton Market Innovation District', 'River North Commercial', 'O’Hare Logistics Corridor'],
        heroTitleEn: 'Corporate Training & Operational Excellence in Chicago, USA',
        heroTitleAr: 'التدريب المؤسسي والتميز التشغيلي في شيكاغو، الولايات المتحدة',
        leadParagraphEn: 'Supply chain management, derivatives compliance, Lean Six Sigma, and executive leadership development for Fortune 500 enterprises in the Chicago Loop and Midwest manufacturing corridor.',
        leadParagraphAr: 'برامج إدارة سلاسل الإمداد، وتطبيقات ستة سيجما (Six Sigma)، والامتثال المالي، والقيادة المؤسسية لكبرى الشركات في شيكاغو والميدويست.',
        topIndustriesEn: ['Commodities & Derivatives Trading', 'Supply Chain & Manufacturing', 'Healthcare Systems & BioTech', 'Insurance & Professional Services'],
        topIndustriesAr: ['تداول السلع والمشتقات المالية', 'سلاسل الإمداد والتصنيع', 'أنظمة الرعاية الصحية', 'التأمين والخدمات المهنية'],
        budgetTiers: ['$8,000 - $20,000', '$20,000 - $50,000', '$50,000 - $125,000+'],
        faqsEn: [
          {
            q: 'Are Lean Six Sigma Green Belt and Black Belt courses offered for Chicago industrial firms?',
            a: 'Yes, accredited instructors provide hands-on Lean Six Sigma certification programs tailored to manufacturing and logistics workflows.',
          },
          {
            q: 'Can training be hosted in the Chicago Loop or Fulton Market?',
            a: 'Yes, facilitators deliver on-premise at corporate offices throughout the Loop and Fulton Market.',
          },
          {
            q: 'How does PontLook assist enterprise procurement teams in Chicago?',
            a: 'We eliminate broker markups and deliver 3 standardized vendor proposals with transparent, all-inclusive pricing within 48 hours.',
          },
          {
            q: 'Are virtual delivery options available for distributed Midwest teams?',
            a: 'Yes, interactive live-virtual workshops with digital breakout labs are standard offerings.',
          },
        ],
        faqsAr: [
          {
            q: 'هل تتوفر دورات ستة سيجما (الحزام الأخضر والأسود) لشركات شيكاغو الصناعية؟',
            a: 'نعم، يقدم خبراء معتمدون برامج تأهيل وتطبيق عملي لمنهجيات Lean Six Sigma لفرق العمليات وسلاسل الإمداد.',
          },
          {
            q: 'هل يمكن إقامة التدريب داخل مكاتب الشركات في حي اللوب التجاري؟',
            a: 'نعم، يتواجد المدربون في مقرات المنشآت بحي اللوب وفولتون ماركت ومحيط شيكاغو.',
          },
          {
            q: 'كيف تساعد PontLook فرق المشتريات المؤسسية في شيكاغو؟',
            a: 'نلغي هوامش الوساطة ونقدم 3 عروض أسعار تنافسية شاملة خلال 48 ساعة فقط.',
          },
          {
            q: 'هل تتوفر خيارات تدريب افتراضي للفرق الموزعة في ولايات الميدويست؟',
            a: 'نعم، تتوفر ورش عمل افتراضية تفاعلية مدعومة بمختبرات وتمارين رقمية مباشرة.',
          },
        ],
      },
      {
        slug: 'austin',
        countryCode: 'us',
        nameEn: 'Austin',
        nameAr: 'أوستن',
        lat: 30.2672,
        lng: -97.7431,
        districts: ['Silicon Hills Tech Corridor', 'Downtown Austin Corporate Core', 'The Domain Northside', 'East Austin Innovation Hub'],
        heroTitleEn: 'Tech Leadership, AI & Scaling Training in Austin, USA',
        heroTitleAr: 'قيادة التكنولوجيا والذكاء الاصطناعي وتطوير الشركات في أوستن، الولايات المتحدة',
        leadParagraphEn: 'Engineering leadership, Generative AI integration, and B2B enterprise sales velocity programs for high-growth tech scaleups and corporate campuses across Austin Silicon Hills.',
        leadParagraphAr: 'برامج قيادة الفرق التقنية، وتبني الذكاء الاصطناعي، وتسريع مبيعات الشركات الكبرى لمنظومة التكنولوجيا في سيليكون هيلز بأوستن.',
        topIndustriesEn: ['Enterprise Software & SaaS', 'Semiconductors & Hardware', 'CleanTech & Energy Transition', 'High-Growth Tech Scaleups'],
        topIndustriesAr: ['برمجيات الشركات SaaS', 'أشباه الموصلات والتقنية الصلبة', 'الطاقة النظيفة والتحول', 'الشركات التقنية سريعة النمو'],
        budgetTiers: ['$8,000 - $20,000', '$20,000 - $45,000', '$45,000 - $110,000+'],
        faqsEn: [
          {
            q: 'What training is most requested by Austin Silicon Hills tech companies?',
            a: 'Engineering management, executive AI upskilling, and consultative B2B enterprise sales negotiation are our highest-demand Austin verticals.',
          },
          {
            q: 'Can training providers run workshops at The Domain or Downtown Austin offices?',
            a: 'Yes, facilitators deliver customized on-site workshops across all major Austin corporate campuses.',
          },
          {
            q: 'Are courses suitable for rapid scaleups transitioning to enterprise maturity?',
            a: 'Yes, our partners specialize in transition frameworks: scaling PMOs, establishing GRC policies, and upgrading sales leadership.',
          },
          {
            q: 'How fast can a tech cohort get started?',
            a: 'Proposals are delivered within 48 hours, and cohorts can commence within 10-14 business days.',
          },
        ],
        faqsAr: [
          {
            q: 'ما هي أكثر البرامج التدريبية طلباً لشركات التقنية في أوستن؟',
            a: 'إدارة الفرق الهندسية، تطبيقات الذكاء الاصطناعي التوليدي للمدراء، والتفاوض التجاري لصفقات البرمجيات الكبرى.',
          },
          {
            q: 'هل يمكن تنفيذ ورش العمل في مكاتب ذا دومين أو وسط أوستن؟',
            a: 'نعم، يقدم المدربون البرامج داخل المقرات المؤسسية في ذا دومين ووسط أوستن ومجمعات التقنية.',
          },
          {
            q: 'هل البرامج مناسبة للشركات التقنية سريعة النمو؟',
            a: 'نعم، يمتلك شركاؤنا خبرة عميقة في مواءمة الإدارة وحوكمة العمليات خلال مراحل التوسع السريع.',
          },
          {
            q: 'كم يستغرق إطلاق البرنامج التدريبي في أوستن؟',
            a: 'تصل العروض خلال 48 ساعة، ويمكن بدء التدريب الميداني خلال 10 إلى 14 يوم عمل.',
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Australia (au)
  // --------------------------------------------------------------------------
  au: {
    code: 'au',
    isoCode: 'AUS',
    nameEn: 'Australia',
    nameAr: 'أستراليا',
    primaryLang: 'en',
    supportedLangs: ['en'],
    publicPathPrefix: {
      en: '/au',
    },
    hreflangCode: {
      en: 'en-au',
    },
    currency: 'AUD',
    currencySymbol: 'A$',
    currencyNameEn: 'Australian Dollar',
    currencyNameAr: 'دولار أسترالي',
    exchangeRateToUSD: 0.66,
    dialCode: '+61',
    capitalCity: 'Canberra',
    nationalInitiative: {
      en: 'Australian Qualifications Framework (AQF) & ASQA Standards',
      ar: 'إطار المؤهلات الأسترالي (AQF) ومعايير هيئة جودة المهارات ASQA',
      descriptionEn: 'Connect your corporate organization with ASQA-accredited Registered Training Organisations (RTOs) delivering nationally recognized qualifications under the AQF.',
      descriptionAr: 'ربط المنشآت الأسترالية بمؤسسات تدريب مسجلة معتمدة من هيئة جودة المهارات الأسترالية (ASQA) لتقديم مؤهلات مهنية معترف بها وطنياً.',
    },
    regulatoryBodies: ['ASQA', 'AQF', 'Safe Work Australia', 'AICD (Company Directors)'],
    cities: [
      {
        slug: 'sydney',
        countryCode: 'au',
        nameEn: 'Sydney',
        nameAr: 'سيدني',
        lat: -33.8688,
        lng: 151.2093,
        districts: ['Sydney CBD Commercial Hub', 'Barangaroo Financial District', 'North Sydney Corporate Strip', 'Macquarie Park Tech Corridor'],
        heroTitleEn: 'Enterprise Corporate Training & Leadership Development in Sydney, Australia',
        heroTitleAr: 'التدريب المؤسسي والتطوير القيادي في سيدني، أستراليا',
        leadParagraphEn: 'Equip ASX 100 corporations, Barangaroo financial institutions, and innovative tech enterprises in Sydney with premier corporate training academies and AICD-aligned facilitators.',
        leadParagraphAr: 'تأهيل قيادات شركات مؤشر ASX 100 والمؤسسات المالية في بارانغارو بمزودي تدريب معتمدين يواكبون معايير معهد مديري الشركات الأسترالي AICD.',
        topIndustriesEn: ['Banking & Financial Services', 'Corporate Legal & M&A Advisory', 'Technology & SaaS Platforms', 'Infrastructure & Construction'],
        topIndustriesAr: ['الخدمات المصرفية والمالية', 'الاستشارات والاندماج والاستحواذ', 'التقنية والبرمجيات', 'البنية التحتية والإنشاءات'],
        budgetTiers: ['A$8,000 - A$20,000', 'A$20,000 - A$50,000', 'A$50,000 - A$120,000+'],
        faqsEn: [
          {
            q: 'Are trainers accredited by ASQA as Registered Training Organisations (RTOs)?',
            a: 'Yes, for nationally recognized units of competency, we match you exclusively with verified RTO partners registered with ASQA.',
          },
          {
            q: 'Can corporate training be delivered in Barangaroo or Sydney CBD offices?',
            a: 'Yes, trainers provide fully tailored on-site delivery in corporate boardrooms across Barangaroo, the CBD, and North Sydney.',
          },
          {
            q: 'What is the cost for Australian enterprise buyers to use PontLook?',
            a: 'PontLook is 100% free for buyers. We operate on a verified performance model with zero subscription or broker fees.',
          },
          {
            q: 'Do Sydney providers offer executive coaching for senior leadership teams?',
            a: 'Yes, we match C-suite executives with ICF-credentialed master coaches specializing in corporate governance and strategic alignment.',
          },
        ],
        faqsAr: [
          {
            q: 'هل الأكاديميات معتمدة من هيئة جودة المهارات الأسترالية (ASQA) كمؤسسات RTO؟',
            a: 'نعم، للوحدات والشهادات المعترف بها وطنياً نربطك حصرياً بمؤسسات تدريب مسجلة ومعتمدة من ASQA.',
          },
          {
            q: 'هل يتوفر التدريب حضورياً في مكاتب الشركات في بارانغارو أو وسط سيدني؟',
            a: 'نعم، يقدم المدربون برامج حضورية في مقرات الشركات ببارانغارو ووسط سيدني وشمالها.',
          },
          {
            q: 'ما هي تكلفة استخدام المنصة للشركات في سيدني؟',
            a: 'المنصة مجانية تماماً بنسبة 100% للمشترين بدون أي رسوم وساطة أو اشتراكات شهرية.',
          },
          {
            q: 'هل يتوفر كوتشينغ تنفيذي معتمد للقيادات العليا في سيدني؟',
            a: 'نعم، نوفر مدربي كوتشينغ معتمدين من الاتحاد الدولي للكوتشينغ ICF متخصصين في حوكمة الإدارة والاستراتيجية.',
          },
        ],
      },
      {
        slug: 'melbourne',
        countryCode: 'au',
        nameEn: 'Melbourne',
        nameAr: 'ملبورن',
        lat: -37.8136,
        lng: 144.9631,
        districts: ['Melbourne CBD Collins St Precinct', 'Docklands Business Hub', 'Southbank Commercial', 'Cremorne Tech Precinct'],
        heroTitleEn: 'Leadership, Digital & Corporate Training in Melbourne, Australia',
        heroTitleAr: 'التدريب المؤسسي والرقمي والقيادي في ملبورن، أستراليا',
        leadParagraphEn: 'Modern executive education, digital transformation, and professional capability building for major Australian corporations and innovative scaleups across Collins Street and Cremorne.',
        leadParagraphAr: 'برامج التطوير التنفيذي والتحول الرقمي للشركات الكبرى والمؤسسات المبتكرة في شارع كولينز وكريمورن بملبورن.',
        topIndustriesEn: ['Superannuation & Asset Management', 'Biotech & Life Sciences', 'Retail & Consumer Brands', 'Creative & Digital Agencies'],
        topIndustriesAr: ['صناديق التقاعد وإدارة الأصول', 'التقنية الحيوية والعلوم الطبية', 'العلامات التجارية والتجزئة', 'الخدمات الرقمية والإبداعية'],
        budgetTiers: ['A$7,500 - A$18,000', 'A$18,000 - A$45,000', 'A$45,000 - A$110,000+'],
        faqsEn: [
          {
            q: 'Can training providers deliver on-site in Melbourne CBD and Docklands?',
            a: 'Yes, facilitators conduct on-premise workshops in corporate facilities across the Collins Street precinct, Docklands, and Southbank.',
          },
          {
            q: 'Are programs tailored for superannuation and financial service compliance?',
            a: 'Yes, matched partners deliver APRA- and ASIC-aware governance, conduct risk, and digital resilience training.',
          },
          {
            q: 'How quickly can our L&D team receive vetted proposals?',
            a: 'Within 48 hours of submitting your requirements, you receive 3 customized bids from top-tier academies.',
          },
          {
            q: 'Are interactive hybrid cohorts available for hybrid Melbourne teams?',
            a: 'Yes, blended formats combining on-site kickoffs with virtual masterclasses are very common.',
          },
        ],
        faqsAr: [
          {
            q: 'هل يمكن تنفيذ التدريب في مكاتب شارع كولينز ودوكلاندز بملبورن؟',
            a: 'نعم، يقدم المدربون ورش عمل حضورية في مقرات الشركات بكافة مجمعات الأعمال في ملبورن.',
          },
          {
            q: 'هل تتوفر برامج متخصصة لصناديق التقاعد والقطاع المالي؟',
            a: 'نعم، يقدم شركاؤنا برامج حوكمة وإدارة مخاطر متوافقة مع متطلبات هيئات الرقابة المالية الأسترالية (APRA وASIC).',
          },
          {
            q: 'كم يستغرق استلام العروض لفرق التعلم والتطوير (L&D) في ملبورن؟',
            a: 'خلال 48 ساعة فقط من تقديم الاحتياج، ستصلك 3 عروض مفصلة من أكاديميات مؤهلة.',
          },
          {
            q: 'هل تدعم البرامج صيغ التدريب الهجينة لفرق العمل بملبورن؟',
            a: 'نعم، تتوفر برامج تجمع بين اللقاءات الحضورية والجلسات الافتراضية التفاعلية.',
          },
        ],
      },
      {
        slug: 'brisbane',
        countryCode: 'au',
        nameEn: 'Brisbane & Queensland',
        nameAr: 'بريزبان وكوينزلاند',
        lat: -27.4698,
        lng: 153.0251,
        districts: ['Brisbane CBD Golden Triangle', 'Fortitude Valley Commercial Precinct', 'South Bank Innovation Hub', 'Milton Business Strip'],
        heroTitleEn: 'Resources, Infrastructure & Corporate Training in Brisbane, Australia',
        heroTitleAr: 'التدريب المؤسسي للموارد والبنية التحتية والقيادة في بريزبان، أستراليا',
        leadParagraphEn: 'Specialized workforce safety, capital project management, and executive leadership development for mining conglomerates, infrastructure leaders, and public sector organizations across Queensland.',
        leadParagraphAr: 'برامج السلامة المهنية، وإدارة المشاريع الرأسمالية الكبرى، والتطوير القيادي لقطاعات التعدين والبنية التحتية في كوينزلاند.',
        topIndustriesEn: ['Mining, Energy & Natural Resources', 'Construction & Megaproject Delivery', 'State Government & Public Utilities', 'Agribusiness & Trade'],
        topIndustriesAr: ['التعدين والطاقة والموارد الطبيعية', 'المقاولات والمشاريع الكبرى', 'القطاع الحكومي والخدمات العامة', 'الزراعة والتجارة الدولية'],
        budgetTiers: ['A$7,000 - A$18,000', 'A$18,000 - A$42,000', 'A$42,000 - A$100,000+'],
        faqsEn: [
          {
            q: 'Do providers offer Safe Work Australia certified safety programs for mining?',
            a: 'Yes, matched RTOs provide WHS, risk management, and statutory safety supervisor qualifications.',
          },
          {
            q: 'Can instructors travel to regional Queensland project sites?',
            a: 'Yes, providers deploy senior facilitators for on-site fly-in-fly-out (FIFO) project site delivery.',
          },
          {
            q: 'Are project governance courses available for 2032 Olympic infrastructure projects?',
            a: 'Yes, specialized mega-project risk and contract delivery courses are heavily engaged in Brisbane.',
          },
          {
            q: 'How does PontLook select training providers in Queensland?',
            a: 'We evaluate industry credentials, safety compliance ratings, and verified client testimonials.',
          },
        ],
        faqsAr: [
          {
            q: 'هل يقدم المزودون برامج سلامة معتمدة لقطاعات التعدين والموارد؟',
            a: 'نعم، يقدم شركاؤنا برامج سلامة مهنية WHS معتمدة ومطابقة لمتطلبات قطاع التعدين.',
          },
          {
            q: 'هل يمكن للمدربين الانتقال لمواقع المشاريع الميدانية في كوينزلاند؟',
            a: 'نعم، يوفر شركاؤنا مدربين ينتقلون مباشرة إلى مواقع العمل والمشاريع في كافة مناطق الولاية.',
          },
          {
            q: 'هل تتوفر دورات حوكمة وإدارة مشاريع لمشاريع أولمبياد 2032؟',
            a: 'نعم، تتوفر برامج متخصصة في إدارة المشاريع الضخمة ومخاطر العقود الرأسمالية.',
          },
          {
            q: 'كيف تختار PontLook مزودي التدريب في كوينزلاند؟',
            a: 'ندقق في معايير السلامة والتراخيص والتقييمات الموثقة للعملاء السابقين بدقة عالية.',
          },
        ],
      },
    ],
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
export const ALL_COUNTRY_CODES: CountryCode[] = ['ae', 'sa', 'uk', 'us', 'au'];

export function getCountryData(code: string): CountryData | undefined {
  return COUNTRIES_DATA[code.toLowerCase() as CountryCode];
}

export function getCityData(countryCode: string, citySlug: string): CityData | undefined {
  const country = getCountryData(countryCode);
  if (!country) return undefined;
  return country.cities.find((c) => c.slug.toLowerCase() === citySlug.toLowerCase());
}

export function getAllCities(): CityData[] {
  return ALL_COUNTRY_CODES.flatMap((code) => COUNTRIES_DATA[code].cities);
}

export function getServiceVertical(slug: string): ServiceVertical | undefined {
  return SERVICE_VERTICALS[slug.toLowerCase()];
}
