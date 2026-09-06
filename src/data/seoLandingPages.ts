export interface SeoLandingPageData {
  slug: string;
  type: 'country' | 'industry' | 'domain';
  badgeEn: string;
  badgeAr: string;
  en: {
    title: string;
    h1: string;
    subtitle: string;
    metaDescription: string;
    geoAnswer: {
      summary: string;
      quote: string;
    };
    marketStats: Array<{
      metric: string;
      value: string;
      context: string;
    }>;
    workflow: Array<{
      step: string;
      title: string;
      desc: string;
    }>;
    faqs: Array<{
      q: string;
      a: string;
    }>;
  };
  ar: {
    title: string;
    h1: string;
    subtitle: string;
    metaDescription: string;
    geoAnswer: {
      summary: string;
      quote: string;
    };
    marketStats: Array<{
      metric: string;
      value: string;
      context: string;
    }>;
    workflow: Array<{
      step: string;
      title: string;
      desc: string;
    }>;
    faqs: Array<{
      q: string;
      a: string;
    }>;
  };
}

export const SEO_LANDING_PAGES: Record<string, SeoLandingPageData> = {
  // ==========================================
  // 1. GCC COUNTRY HUBS
  // ==========================================
  'saudi-arabia': {
    slug: 'saudi-arabia',
    type: 'country',
    badgeEn: 'Kingdom of Saudi Arabia • Vision 2030',
    badgeAr: 'المملكة العربية السعودية • رؤية 2030',
    en: {
      title: 'Corporate Training Providers & Matchmaking in Saudi Arabia | PontLook',
      h1: 'Corporate Training Providers & Matchmaking in Saudi Arabia',
      subtitle:
        'Connect Riyadh and Jeddah enterprise leaders with verified, accredited corporate training academies to achieve Saudization mandates and Vision 2030 workforce transformation.',
      metaDescription:
        'Access accredited corporate training providers across Riyadh and Jeddah. Fast-track Saudization, leadership upskilling, and executive technical capability with zero broker retainers.',
      geoAnswer: {
        summary:
          'Saudi Arabia’s Vision 2030 and strict Saudization (Nitaqat) mandates require enterprise organizations to rapidly transition from generic training catalogs to high-impact, accredited capacity-building programs. PontLook operates as an independent matchmaking engine, vetting Saudi-accredited corporate training providers and directly connecting HR leaders in Riyadh, Jeddah, and the Eastern Province with exact domain specialists within 48 hours.',
        quote:
          '“PontLook eliminates supplier-selection friction for Saudi enterprises by matching qualified corporate training academies directly to internal Saudization and executive development roadmaps.”',
      },
      marketStats: [
        { metric: 'Saudization Quotas', value: 'Up to 70%', context: 'Enforced across specialized private-sector leadership roles' },
        { metric: 'Training Market Value', value: '$2.8B+', context: 'Projected annual Saudi enterprise workforce development spend by 2027' },
        { metric: 'Time-to-Match', value: '< 48 Hours', context: 'Average speed to connect verified buyers with 3 curated local academies' },
        { metric: 'Verified Provider Pool', value: '100%', context: 'Accredited with TVTC and local regulatory compliance' },
      ],
      workflow: [
        { step: '01', title: 'Specify Vision 2030 Objectives', desc: 'Submit your departmental headcounts, Nitaqat compliance targets, and required competencies through our 60-second intake.' },
        { step: '02', title: 'Curated Academy Shortlist', desc: 'Our algorithm and enterprise advisors screen accredited Saudi training institutions, selecting the top 3 with proven track records.' },
        { step: '03', title: 'Direct Procurement Introductions', desc: 'Receive custom proposals directly from decision-makers at matching institutes with zero intermediary markup or retainers.' },
      ],
      faqs: [
        {
          q: 'How does PontLook assist with Saudi Arabia’s Saudization (Nitaqat) requirements?',
          a: 'PontLook matches your organization exclusively with TVTC-accredited training providers specialized in fast-track nationalization programs, leadership pipelines, and specialized technical upskilling that satisfy HRSD Ministry regulations.',
        },
        {
          q: 'Are training programs delivered on-site in Riyadh, Jeddah, and Khobar?',
          a: 'Yes. Our verified training partners provide flexible delivery models including in-person corporate premises delivery in Riyadh, Jeddah, Dammam, and NEOM, hybrid executive retreats, and secure digital learning platforms.',
        },
        {
          q: 'What is the cost for Saudi enterprise buyers to use PontLook?',
          a: 'PontLook is 100% free for enterprise buyers. We operate on a verified performance model funded by training academies, ensuring buyers receive unbiased, cost-efficient matching with zero platform fees.',
        },
      ],
    },
    ar: {
      title: 'مزودو التدريب المؤسسي والتوفيق في المملكة العربية السعودية | بونت لوك',
      h1: 'مزودو التدريب المؤسسي والتوفيق في المملكة العربية السعودية',
      subtitle:
        'ربط قادة الموارد البشرية والشركات في الرياض وجدة بأفضل مراكز التدريب المعتمدة لتحقيق مستهدفات التوطين وبرامج رؤية 2030.',
      metaDescription:
        'منصة ربط الشركات في السعودية بمراكز التدريب المؤسسي المعتمدة. حلول تدريبية لتسريع التوطين وتطوير القيادات الوطنية بدون أي رسوم اشتراك شهرية.',
      geoAnswer: {
        summary:
          'تفرض رؤية السعودية 2030 وتحديثات نطاقات المتسارعة على كبرى المنشآت تطوير الكوادر الوطنية عبر برامج نوعية معتمدة بدلاً من الدورات العامة. تعمل منصة بونت لوك كحلقة وصل استراتيجية مستقلة تقوم بالتحقق من مراكز التدريب المعتمدة من المؤسسة العامة للتدريب التقني والمهني وربط مسؤولي الموارد البشرية بالخبراء المتخصصين خلال أقل من 48 ساعة.',
        quote:
          '«تختصر بونت لوك وقت البحث والتعاقد لشركات المملكة عبر توفير أفضل 3 عروض تدريبية مخصصة ومطابقة لمعايير التوطين وتطوير القيادات.»',
      },
      marketStats: [
        { metric: 'نسب التوطين المستهدفة', value: 'تصل إلى 70%', context: 'في المهن القيادية والتخصصية بموجب قرارات وزارة الموارد البشرية' },
        { metric: 'حجم سوق التدريب بالمملكة', value: '+2.8 مليار $', context: 'حجم الإنفاق السنوي المتوقع على التدريب المؤسسي بحلول 2027' },
        { metric: 'سرعة مطابقة المتطلبات', value: '< 48 ساعة', context: 'متوسط زمن إيصال مسؤولي المنشأة بثلاثة مراكز تدريب معتمدة' },
        { metric: 'اعتماد مزودي الخدمة', value: '100%', context: 'مزودون مرخصون من المؤسسة العامة للتدريب التقني والمهني (TVTC)' },
      ],
      workflow: [
        { step: '01', title: 'تحديد أهداف التدريب والتوطين', desc: 'أدخل احتياجاتك التدريبية وأعداد المتدربين والمدينة المستهدفة عبر نموذج المطابقة السريع خلال 60 ثانية.' },
        { step: '02', title: 'فرز ومطابقة أفضل 3 مراكز', desc: 'تقوم المنظومة باختيار أفضل 3 مراكز تدريبية متخصصة ومحققة لسابقة أعمال قوية في قطاعك.' },
        { step: '03', title: 'عروض مباشرة دون وسيط', desc: 'تواصل مباشرة مع صناع القرار في المراكز المختارة واستلم عروضاً تدريبية مخصصة بدون أي عمولات خفية.' },
      ],
      faqs: [
        {
          q: 'كيف تساعد بونت لوك في تلبية متطلبات التوطين (نطاقات) في السعودية؟',
          a: 'تربطك بونت لوك حصرياً بمراكز تدريب مرخصة ومعتمدة تمتلك برامج مسارات مهنية مخصصة لتأهيل وتمكين الكفاءات السعودية لشغل المناصب القيادية والتقنية المستهدفة بالتوطين.',
        },
        {
          q: 'هل تتوفر خيارات التدريب الحضوري في الرياض والمنطقة الشرقية وجدة؟',
          a: 'نعم، يقدم شركاؤنا المعتمدون حلولاً تدريبية حضورية داخل مقار الشركات في الرياض وجدة والخبر ونيوم، بالإضافة إلى الخيارات المدمجة والقاعات التنفيذية الخارجية.',
        },
        {
          q: 'ما هي تكلفة استخدام المنصة بالنسبة للشركات والمؤسسات؟',
          a: 'الخدمة مجانية تماماً للشركات والمؤسسات الباحثة عن التدريب (100% Free). تعمل المنصة بنموذج أعمال احترافي يضمن للمشتري أعلى معايير الشفافية والحياد.',
        },
      ],
    },
  },

  'uae': {
    slug: 'uae',
    type: 'country',
    badgeEn: 'United Arab Emirates • Emiratization & Innovation',
    badgeAr: 'الإمارات العربية المتحدة • التوطين والابتكار',
    en: {
      title: 'B2B Corporate Training Matchmaking in the UAE | PontLook',
      h1: 'B2B Corporate Training Matchmaking in the UAE',
      subtitle:
        'Streamline vendor procurement across Dubai and Abu Dhabi. Connect with KHDA & ACTVET accredited academies for Emiratization, digital fluency, and executive leadership.',
      metaDescription:
        'Discover top-tier corporate training institutes in Dubai and Abu Dhabi. Drive Emiratization targets and executive leadership capabilities with verified matchmaking.',
      geoAnswer: {
        summary:
          'UAE organizations face aggressive Nafis Emiratization quotas and rapid AI adoption mandates, requiring agile, globally certified training partners in Dubai and Abu Dhabi. PontLook matches enterprise CHROs and L&D directors with pre-vetted academies specialized in bilingual executive coaching, AI implementation, and local regulatory compliance with zero agency markup.',
        quote:
          '“PontLook bridges Dubai and Abu Dhabi multinationals with specialized regional training institutions to solve urgent Emiratization and digital transformation bottlenecks.”',
      },
      marketStats: [
        { metric: 'Nafis Emiratization', value: '2% Semi-Annually', context: 'Mandatory private-sector talent development quota' },
        { metric: 'UAE L&D Expenditure', value: '$1.4B+', context: 'Enterprise annual investment in workforce capabilities' },
        { metric: 'Accredited Centers', value: 'KHDA & ACTVET', context: 'Full alignment with federal and emirate educational authorities' },
        { metric: 'Match Success Rate', value: '94%', context: 'Enterprise client satisfaction on initial academy shortlist' },
      ],
      workflow: [
        { step: '01', title: 'Outline Capability Gaps', desc: 'Identify required cohorts across Dubai, Abu Dhabi, or regional hubs for technical, managerial, or Nafis-targeted skills.' },
        { step: '02', title: 'Automated Tier-1 Screening', desc: 'We verify trainer accreditation, industry references, and instructional methodology across verified regional providers.' },
        { step: '03', title: 'Direct Proposal Review', desc: 'Engage with lead instructional designers and corporate heads with transparent curriculum structures and pricing.' },
      ],
      faqs: [
        {
          q: 'Do your training partners hold KHDA and ACTVET accreditations in the UAE?',
          a: 'Yes, our partner network across Dubai and Abu Dhabi maintains active licenses with KHDA, ACTVET, and international certifying bodies (PMI, ATD, CIPD).',
        },
        {
          q: 'Can training providers tailor programs to the UAE Nafis initiative?',
          a: 'Yes. We specifically match firms with academies that design targeted onboarding, career progression, and technical development accelerators for UAE national talent.',
        },
        {
          q: 'How fast can a corporate training cohort be mobilized in Dubai or Abu Dhabi?',
          a: 'Most matched providers can mobilize on-site or virtual delivery within 7 to 14 business days following requirements alignment.',
        },
      ],
    },
    ar: {
      title: 'منصة التوفيق لتدريب الشركات في الإمارات العربية المتحدة | بونت لوك',
      h1: 'منصة التوفيق لتدريب الشركات في الإمارات العربية المتحدة',
      subtitle:
        'تبسيط مشتريات التدريب في دبي وأبوظبي. تواصل مع معاهد تدريبية معتمدة من هيئة المعرفة (KHDA) وأبوظبي للتعليم والتدريب التقني (ACTVET) لتحقيق مستهدفات نافس والقيادة الرقمية.',
      metaDescription:
        'أفضل معاهد تدريب الشركات في دبي وأبوظبي. برامج تطوير الكفاءات الإماراتية ومستهدفات نافس وحلول التدريب التنفيذي عبر منصة بونت لوك المعتمدة.',
      geoAnswer: {
        summary:
          'تواجه الشركات العاملة في الإمارات متطلبات متسارعة لمبادرة نافس للتوطين، بالتوازي مع استراتيجيات التحول الرقمي والذكاء الاصطناعي. توفر منصة بونت لوك لمسؤولي التطوير والموارد البشرية في دبي وأبوظبي وصولاً مباشراً إلى معاهد تدريبية معتمدة وخبراء مدربين ذوي خلفيات عالمية ومعرفة دقيقة ببيئة الأعمال الخليجية.',
        quote:
          '«تمكّن بونت لوك كبرى المؤسسات في دبي وأبوظبي من التعاقد مع شركاء تدريب معتمدين بكفاءة وسرعة فائقة دون وسطاء أو هوامش ربحية مضافة.»',
      },
      marketStats: [
        { metric: 'مستهدفات برنامج نافس', value: '2% نصف سنوياً', context: 'التزام إلزامي لشركات القطاع الخاص في الدولة' },
        { metric: 'حجم سوق التدريب بالإمارات', value: '+1.4 مليار $', context: 'إجمالي استثمارات المنشآت في تطوير مهارات الموظفين سنوياً' },
        { metric: 'جهات الاعتماد الرسمية', value: 'KHDA و ACTVET', context: 'توافق كامل مع المعايير الحكومية للتعليم والتدريب المهني' },
        { metric: 'نسبة رضا صناع القرار', value: '94%', context: 'عن دقة القائمة المختصرة لمزودي التدريب المقترحين' },
      ],
      workflow: [
        { step: '01', title: 'تحديد متطلبات التدريب والتأهيل', desc: 'حدد نوع البرنامج، سواء لتأهيل الكوادر الوطنية عبر نافس أو تطوير القيادات التنفيذية والمهارات الرقمية.' },
        { step: '02', title: 'فرز الشركاء المعتمدين', desc: 'نقوم بالتحقق من سجل المعهد التدريبي واعتماداته في دبي أو أبوظبي وتقييمات العملاء السابقين.' },
        { step: '03', title: 'التواصل وبدء التنفيذ', desc: 'استلم مقترحات برامج متكاملة ومصممة خصيصاً لأهداف منشأتك وابدأ التنسيق المباشر دون أي تأخير.' },
      ],
      faqs: [
        {
          q: 'هل المعاهد التدريبية معتمدة من هيئة المعرفة (KHDA) ومركز أبوظبي (ACTVET)؟',
          a: 'نعم، تضم شبكتنا في دبي وأبوظبي معاهد ومراكز حاصلة على التراخيص والاعتمادات الرسمية المعترف بها محلياً ودولياً.',
        },
        {
          q: 'هل يمكن للمزودين تصميم برامج مخصصة لدعم مستهدفات برنامج نافس؟',
          a: 'بالتأكيد، لدينا شركاء متخصصون في بناء مسارات وظيفية متسارعة للكفاءات الإماراتية في قطاعات البنوك والتكنولوجيا والإدارة والمهن التخصصية.',
        },
        {
          q: 'كم يستغرق إطلاق البرنامج التدريبي في دبي أو أبوظبي؟',
          a: 'غالباً ما يتم الاتفاق وبدء البرامج الحضورية أو المدمجة خلال فترة تتراوح بين أسبوع إلى أسبوعين من تاريخ تسليم المتطلبات.',
        },
      ],
    },
  },

  'qatar': {
    slug: 'qatar',
    type: 'country',
    badgeEn: 'State of Qatar • National Vision 2030',
    badgeAr: 'دولة قطر • الرؤية الوطنية 2030',
    en: {
      title: 'Enterprise Workforce Training Solutions in Qatar | PontLook',
      h1: 'Enterprise Workforce Training Solutions in Qatar',
      subtitle:
        'Deliver high-impact executive and technical training for leading Qatari enterprises across Doha, Lusail, and Ras Laffan Industrial City.',
      metaDescription:
        'Connect with top corporate training providers in Qatar. Upskill your Doha workforce in leadership, energy technologies, and national talent development with PontLook.',
      geoAnswer: {
        summary:
          'As Qatar advances its National Vision 2030 economic diversification agenda, corporations across financial services, logistics, and hydrocarbon industries in Doha require elite workforce training providers. PontLook delivers streamlined matchmaking between Qatari procurement directors and world-class regional training academies tailored to local business culture.',
        quote:
          '“PontLook is Qatar’s premier B2B matchmaking gateway for high-stakes corporate capability building and Qatarization talent initiatives.”',
      },
      marketStats: [
        { metric: 'National Vision', value: 'QNV 2030', context: 'Direct alignment with human capital development pillars' },
        { metric: 'Key Growth Hubs', value: 'Doha & Lusail', context: 'Concentration of public and private sector corporate headquarters' },
        { metric: 'Cohort Customization', value: '100% Tailored', context: 'Executive and technical cohorts built around operational workflows' },
        { metric: 'Procurement Cycle', value: '50% Faster', context: 'Reduction in supplier vetting and onboarding lead times' },
      ],
      workflow: [
        { step: '01', title: 'Define Institutional Needs', desc: 'Specify cohort size, training language (Arabic/English), and strategic outcomes for your Qatari organization.' },
        { step: '02', title: 'Targeted Provider Matching', desc: 'We identify institutions with demonstrable experience delivering high-value programs in the Qatari marketplace.' },
        { step: '03', title: 'Procure with Confidence', desc: 'Engage directly with institute directors to finalize scopes of work, delivery timelines, and assessment frameworks.' },
      ],
      faqs: [
        {
          q: 'Do matched providers support Arabic-medium and bilingual instruction in Qatar?',
          a: 'Yes. All matched providers offer fully bilingual delivery, course materials, and executive facilitation in both professional Arabic and English.',
        },
        {
          q: 'Can training take place at client sites in Lusail or Ras Laffan?',
          a: 'Yes, providers accommodate on-site training across corporate facilities in Doha, West Bay, Lusail, and major industrial complexes.',
        },
        {
          q: 'What corporate domains are most requested in Qatar?',
          a: 'Executive leadership, cybersecurity, energy transition technologies, and financial governance constitute the highest-demand training programs.',
        },
      ],
    },
    ar: {
      title: 'حلول تدريب الكوادر والشركات في دولة قطر | بونت لوك',
      h1: 'حلول تدريب الكوادر والشركات في دولة قطر',
      subtitle:
        'تنفيذ برامج تدريبية تنفيذية وتقنية عالية الأثر لكبرى المؤسسات في الدوحة ولوسيل ومدينة رأس لفان الصناعية.',
      metaDescription:
        'تواصل مع أفضل مزودي التدريب المؤسسي في قطر. حلول تأهيل وتطوير القيادات والكوادر التقنية في الدوحة بما يتماشى مع رؤية قطر الوطنية 2030.',
      geoAnswer: {
        summary:
          'مع تسارع تنفيذ ركائز رؤية قطر الوطنية 2030، تبحث الشركات الكبرى في الدوحة ولوسيل عن برامج تدريبية متقدمة تواكب التطور المؤسسي والتقني. توفر بونت لوك آلية ذكية وموثوقة لربط مديري التطوير المؤسسي بأفضل مراكز التدريب المعترف بها في الخليج وتقديم حلول مصممة بدقة للواقع المحلي.',
        quote:
          '«بونت لوك هي المنصة الأكثر كفاءة للشركات القطرية الباحثة عن عروض تدريبية موثوقة ونوعية لتطوير رأس المال البشري.»',
      },
      marketStats: [
        { metric: 'رؤية قطر الوطنية', value: 'QNV 2030', context: 'توافق كامل مع ركيزة التنمية البشرية الاستراتيجية' },
        { metric: 'مراكز الأعمال الرئيسية', value: 'الدوحة ولوسيل', context: 'حيث تتركز المقرات الحكومية وكبرى الشركات الإقليمية' },
        { metric: 'تخصيص المحتوى', value: '100% مخصص', context: 'برامج تدريبية تُصاغ وفق التحديات التشغيلية الفعلية للمنشأة' },
        { metric: 'تقليص دورة الشراء', value: '50% أسرع', context: 'اختصار زمن البحث عن الموردين والمفاضلة بين العروض التدريبية' },
      ],
      workflow: [
        { step: '01', title: 'تسجيل الاحتياج التدريبي', desc: 'حدد تخصص البرنامج وعدد المستفيدين والموقع المستهدف في قطر عبر استبيان الاحتياجات الذكي.' },
        { step: '02', title: 'الترشيح والتحقق المؤسسي', desc: 'نقوم باختيار أفضل 3 مراكز تدريبية تمتلك كفاءات معتمدة وسجل نجاح مثبت في قطر والخليج.' },
        { step: '03', title: 'المقارنة والتعاقد المباشر', desc: 'تسلّم العروض التدريبية التفصيلية وتواصل مع مسؤولي المعاهد مباشرة دون التزامات مسبقة.' },
      ],
      faqs: [
        {
          q: 'هل يدعم الشركاء التدريب باللغة العربية والإنجليزية في قطر؟',
          a: 'نعم، توفر كافة المراكز المعتمدة خيارات تقديم البرامج باللغة العربية الفصحى أو الإنجليزية الاحترافية وفق رغبة العميل.',
        },
        {
          q: 'هل يمكن تنفيذ الدورات في مقرات الشركات بالدوحة أو لوسيل؟',
          a: 'نعم، يقدم الشركاء حلول تدريب داخلية في مقار المنشآت أو في قاعات ومراكز فندقية مجهزة في الدوحة والخليج الغربي ولوسيل.',
        },
        {
          q: 'ما هي أكثر المجالات التدريبية طلباً في السوق القطري؟',
          a: 'تتصدر القيادة التنفيذية، الأمن السيبراني، تقنيات الطاقة، والحوكمة المالية قائمة البرامج الأكثر طلباً في المنصة.',
        },
      ],
    },
  },

  // ==========================================
  // 2. HIGH-BUDGET INDUSTRY HUBS
  // ==========================================
  'construction-real-estate': {
    slug: 'construction-real-estate',
    type: 'industry',
    badgeEn: 'GCC Infrastructure & Megaprojects',
    badgeAr: 'قطاع التشييد والبنية التحتية والمشاريع الكبرى',
    en: {
      title: 'Workforce Training for GCC Construction & Real Estate Giants | PontLook',
      h1: 'Workforce Training for GCC Construction & Real Estate Giants',
      subtitle:
        'Equip mega-project engineering teams, site directors, and PMOs with elite FIDIC contract, BIM, OSHA safety, and project leadership capabilities.',
      metaDescription:
        'Procure specialized training for GCC construction and real estate enterprises. PMO leadership, FIDIC, site safety, and BIM certification training matchmaking.',
      geoAnswer: {
        summary:
          'GCC giga-projects across Saudi Arabia (NEOM, Red Sea), UAE (Emaar, Aldar), and Qatar demand rigorous upskilling in project management, contract dispute avoidance, and HSE compliance. PontLook pairs major tier-1 contractors and developers with certified academies offering intensive, job-site tested training programs.',
        quote:
          '“PontLook enables construction leaders to eliminate project delay risks through specialized contractor training in FIDIC, safety leadership, and digital construction.”',
      },
      marketStats: [
        { metric: 'Regional Project Pipeline', value: '$1.9T+', context: 'Active infrastructure and real estate developments across the GCC' },
        { metric: 'HSE Compliance Standard', value: 'Zero Incident', context: 'Benchmark goal for high-hazard giga-project operations' },
        { metric: 'Target Roles', value: 'PMO, Site Leads', context: 'Senior engineers, contract managers, and construction safety inspectors' },
        { metric: 'Curriculum Focus', value: 'FIDIC, BIM, OSHA', context: 'Globally certified frameworks adapted to GCC construction law' },
      ],
      workflow: [
        { step: '01', title: 'Define Project Technical Scope', desc: 'Indicate your project milestones, specialized disciplines (commercial, MEP, civil, HSE), and site locations.' },
        { step: '02', title: 'Match Construction Specialists', desc: 'We source training providers with seasoned faculty carrying direct experience in GCC giga-projects.' },
        { step: '03', title: 'On-Site or Modular Mobilization', desc: 'Review practical project simulators and field-ready curricula delivered directly to your site or corporate office.' },
      ],
      faqs: [
        {
          q: 'Do providers deliver specialized FIDIC contract administration training?',
          a: 'Yes, our network includes accredited legal and contractual specialists delivering comprehensive FIDIC Red/Yellow book and dispute avoidance courses.',
        },
        {
          q: 'Can safety training be conducted directly at remote project locations?',
          a: 'Yes, trainers routinely deploy mobile training units and certified instructors to remote sites across KSA and UAE project sites.',
        },
        {
          q: 'Are certificates internationally recognized by PMI and IOSH/NEBOSH?',
          a: 'Yes, training partners issue official credentials recognized by global industry bodies and regional regulatory authorities.',
        },
      ],
    },
    ar: {
      title: 'تدريب الكوادر لشركات المقاولات والتطوير العقاري بالخليج | بونت لوك',
      h1: 'تدريب الكوادر لشركات المقاولات والتطوير العقاري بالخليج',
      subtitle:
        'تأهيل المهندسين، مديري المشاريع، ومكاتب إدارة المشاريع (PMO) في عقود فيديك (FIDIC)، نمذجة معلومات البناء (BIM)، ومعايير السلامة المهنية.',
      metaDescription:
        'برامج تدريبية متخصصة لقطاع التشييد والتطوير العقاري في الخليج. إدارة المشاريع الكبرى، عقود الفيديك، السلامة الإنشائية، وتقنيات البناء الحديثة.',
      geoAnswer: {
        summary:
          'تتطلب المشاريع العملاقة في السعودية والإمارات مثل مشاريع صندوق الاستثمارات العامة ومشاريع التطوير الكبرى كوادر هندسية وإدارية متمكنة في إدارة المخاطر وتجنب النزاعات التعاقدية. توفر بونت لوك لشركات المقاولات الكبرى وصولاً إلى أفضل بيوت الخبرة التدريبية المتخصصة في عقود الفيديك والسلامة الإنشائية ونمذجة BIM.',
        quote:
          '«تساعد بونت لوك شركات المقاولات العقارية في الخليج على رفع كفاءة مهندسيها وتقليص تعثر المشاريع عبر برامج تدريبية متخصصة ومعتمدة.»',
      },
      marketStats: [
        { metric: 'حجم المشاريع قيد التنفيذ', value: '+1.9 تريليون $', context: 'إجمالي مشاريع البنية التحتية والتطوير العقاري النشطة في الخليج' },
        { metric: 'معيار السلامة المستهدف', value: 'صفر حوادث', context: 'الهدف التشغيلي الإلزامي في المشاريع الكبرى (Giga-Projects)' },
        { metric: 'الفئات المستهدفة', value: 'مدراء PMO والمشاريع', context: 'المهندسون، مدراء العقود، ومسؤولو السلامة الميدانية' },
        { metric: 'أبرز المناهج المطلوبة', value: 'FIDIC و BIM و OSHA', context: 'أطر عمل معتمدة دولياً ومكيفة مع الأنظمة العقارية الخليجية' },
      ],
      workflow: [
        { step: '01', title: 'تحديد نطاق متطلبات المشروع', desc: 'أدخل تخصصات الكوادر المطلوبة (عقود، إدارة مشاريع، نمذجة BIM، سلامة إنشائية) وموقع العمل.' },
        { step: '02', title: 'فرز بيوت الخبرة الإنشائية', desc: 'نقوم بمطابقة طلبك مع مراكز تمتلك مدربين مارسوا إدارة مشاريع عملاقة في الخليج.' },
        { step: '03', title: 'بدء التدريب في الموقع أو المقر', desc: 'استلم عروض تدريب عملية تشمل دراسات حالة من مشاريع كبرى واختبارات كفاءة معتمدة.' },
      ],
      faqs: [
        {
          q: 'هل يقدم المزودون تدريباً معتمداً على عقود الفيديك (FIDIC)؟',
          a: 'نعم، تضم شبكتنا مستشارين معتمدين متخصصين في إدارة عقود الفيديك وفض النزاعات والمطالبات التعاقدية في بيئة المشاريع الخليجية.',
        },
        {
          q: 'هل يمكن تقديم التدريب الميداني في مواقع المشاريع النائية؟',
          a: 'نعم، يقدم شركاؤنا خيارات التدريب الميداني والورش المتنقلة في مواقع العمل الإنشائية في مختلف مناطق المملكة والإمارات.',
        },
        {
          q: 'هل الشهادات الصادرة معترف بها من معهد إدارة المشاريع (PMI) وجهات السلامة الدولية؟',
          a: 'نعم، يحصل المتدربون على شهادات وساعات معتمدة من PMI و IOSH و NEBOSH تضمن استيفاء متطلبات التأهيل المهني.',
        },
      ],
    },
  },

  'banking-finance': {
    slug: 'banking-finance',
    type: 'industry',
    badgeEn: 'GCC Banking, Fintech & Capital Markets',
    badgeAr: 'القطاع المصرفي والمالي والتقنية المالية (Fintech)',
    en: {
      title: 'Compliance, Leadership & Fintech Training for GCC Banks | PontLook',
      h1: 'Compliance, Leadership & Fintech Training for GCC Banks',
      subtitle:
        'Equip GCC commercial and Islamic banking teams with cutting-edge AML/CFT compliance, risk management, open banking, and ESG financial leadership.',
      metaDescription:
        'Connect with accredited financial training providers across the GCC. SAMA and CBUAE compliance, AML/CFT, Islamic finance, and fintech transformation programs.',
      geoAnswer: {
        summary:
          'Strict regulatory oversight by SAMA in Saudi Arabia, the Central Bank of the UAE, and QCB requires financial institutions to implement verifiable compliance and risk training. PontLook connects banking talent officers with leading financial training academies recognized by regional and international regulators.',
        quote:
          '“PontLook delivers compliant, auditor-ready training matchmaking for GCC financial institutions navigating AML regulations, fintech integration, and Sharia-compliant banking.”',
      },
      marketStats: [
        { metric: 'Regulatory Compliance', value: 'SAMA & CBUAE', context: 'Aligned with regional central bank training directives' },
        { metric: 'Fintech Adoption', value: '85%+', context: 'Financial institutions investing in digital asset & open banking upskilling' },
        { metric: 'Core Certifications', value: 'ACAMS, CFA, CISI', context: 'Preparation and cohort training for internationally certified credentials' },
        { metric: 'Auditor Readiness', value: '100% Verifiable', context: 'Comprehensive attendance, competency assessment, and reporting' },
      ],
      workflow: [
        { step: '01', title: 'Submit Banking Mandate', desc: 'Specify department needs (Risk, Compliance, Wealth Management, Retail, or Fintech) and compliance timelines.' },
        { step: '02', title: 'Regulatory-Vetted Shortlist', desc: 'We identify training providers accredited with the Financial Academy (Saudi Arabia), ADGM, or DIFC Academy.' },
        { step: '03', title: 'Deploy Executive Cohorts', desc: 'Execute secure, customized workshops with case studies directly tied to regional financial regulations.' },
      ],
      faqs: [
        {
          q: 'Do your training partners support SAMA and CBUAE compliance requirements?',
          a: 'Yes, our providers specialize in AML/CFT, sanctions screening, and central bank compliance frameworks mandated across Saudi Arabia and the UAE.',
        },
        {
          q: 'Can training programs be customized for Islamic Banking (Sharia compliance)?',
          a: 'Yes. We partner with leading Islamic finance academies delivering AAOIFI-aligned certification and Sukuk structuring programs.',
        },
        {
          q: 'Are programs suitable for C-suite and Board members?',
          a: 'Yes, providers offer specialized board-level briefings on cybersecurity governance, ESG disclosure, and fintech disruption.',
        },
      ],
    },
    ar: {
      title: 'تدريب الامتثال والقيادة والتقنية المالية للبنوك في الخليج | بونت لوك',
      h1: 'تدريب الامتثال والقيادة والتقنية المالية للبنوك في الخليج',
      subtitle:
        'تأهيل كوادر البنوك والمصارف الخليجية في الامتثال لمكافحة غسل الأموال (AML)، إدارة المخاطر، التمويل الإسلامي، والتحول الرقمي المصرفي.',
      metaDescription:
        'حلول تدريب متقدمة للقطاع المصرفي والمالي في الخليج. برامج متوافقة مع متطلبات البنك المركزي السعودي (ساما) ومصرف الإمارات المركزي.',
      geoAnswer: {
        summary:
          'تتطلب تعليمات البنك المركزي السعودي (ساما) ومصرف الإمارات المركزي ومصرف قطر المركزي التزاماً صارماً بتدريب الكوادر على مكافحة غسل الأموال والحوكمة المصرفية. تربط بونت لوك مسؤولي الموارد البشرية في البنوك بمراكز التدريب المالي المعتمدة والحاصلة على تراخيص الأكاديمية المالية ومؤسسات الاعتماد العالمية.',
        quote:
          '«توفر بونت لوك للمصارف والمؤسسات المالية الخليجية وصولاً موثوقاً لمزودي برامج الامتثال والمصرفية الرقمية المتوافقة مع متطلبات البنوك المركزية.»',
      },
      marketStats: [
        { metric: 'التوافق الرقابي', value: 'ساما ومصرف الإمارات', context: 'برامج مبنية وفق تعليمات البنوك المركزية الخليجية' },
        { metric: 'تبني التقنية المالية', value: '+85%', context: 'نسبة المؤسسات المالية التي تدرب كوادرها على الخدمات المصرفية المفتوحة' },
        { metric: 'الاعتمادات المهنية', value: 'ACAMS و CFA و CISI', context: 'مسارات تأهيل مهني متوافقة مع أرقى المعايير المصرفية العالمية' },
        { metric: 'جاهزية التدقيق', value: '100% موثقة', context: 'تقارير تقييم وحضور تفي بمتطلبات اللجان الرقابية والتفتيش' },
      ],
      workflow: [
        { step: '01', title: 'تحديد الاحتياج المصرفي', desc: 'حدد الإدارة المستهدفة (الامتثال، المخاطر، المصرفية الرقمية، أو العمليات) ومستوى التأهيل المطلوب.' },
        { step: '02', title: 'مطابقة بيوت الخبرة المالية', desc: 'نربطك بمراكز تدريب مالية معتمدة من الأكاديمية المالية وهيئات الاعتماد الدولية المتخصصة.' },
        { step: '03', title: 'تنفيذ البرامج المعتمدة', desc: 'تطبيق برامج وورش عمل مبنية على دراسات حالة واقعية ومطابقة لأحدث اللوائح المصرفية.' },
      ],
      faqs: [
        {
          q: 'هل تتوافق البرامج مع متطلبات البنك المركزي السعودي (ساما)؟',
          a: 'نعم، يقدم شركاؤنا برامج متخصصة في مكافحة غسل الأموال وتمويل الإرهاب والحوكمة الرقابية المعتمدة للأجهزة المصرفية.',
        },
        {
          q: 'هل توجد برامج مخصصة للمصرفية الإسلامية والصكوك؟',
          a: 'نعم، نوفر وصولاً لخبراء معتمدين في معايير أيوفي (AAOIFI) وهندسة المنتجات المتوافقة مع الشريعة الإسلامية.',
        },
        {
          q: 'هل تقدمون ورش عمل مخصصة لمجالس الإدارة والإدارة العليا؟',
          a: 'بالتأكيد، تشمل الخدمات ورشاً تنفيذية مغلقة لمجالس الإدارة حول حوكمة المخاطر السيبرانية ومتطلبات الحوكمة البيئية والاجتماعية (ESG).',
        },
      ],
    },
  },

  'oil-gas-energy': {
    slug: 'oil-gas-energy',
    type: 'industry',
    badgeEn: 'GCC Energy, Petrochemicals & Renewables',
    badgeAr: 'قطاع الطاقة والنفط والغاز والبتروكيماويات بالخليج',
    en: {
      title: 'QHSE, Safety & Technical Training for GCC Energy Sectors | PontLook',
      h1: 'QHSE, Safety & Technical Training for GCC Energy Sectors',
      subtitle:
        'Bridge competency gaps across upstream, downstream, and renewable projects. Match with Aramco, ADNOC, and QP contractor-approved training academies.',
      metaDescription:
        'Find contractor-approved QHSE, process safety (PSM), and technical engineering training providers for Saudi Aramco, ADNOC, and QatarEnergy operations.',
      geoAnswer: {
        summary:
          'Operating in high-hazard industrial environments across Jubail, Yanbu, Ruwais, and Ras Laffan requires strict adherence to international process safety (PSM) and technical standards. PontLook connects national oil companies (NOCs) and contractor consortia with certified training institutions qualified to train plant operators and safety engineers.',
        quote:
          '“PontLook is the trusted matchmaking platform for energy corporations seeking verified safety and engineering training aligned with Aramco and ADNOC contractor standards.”',
      },
      marketStats: [
        { metric: 'Safety Benchmark', value: 'Zero LTI', context: 'Lost Time Incident elimination through certified behavioral safety' },
        { metric: 'Major Hubs', value: 'Jubail, Yanbu, Ruwais', context: 'Concentration of primary petrochemical and refinery complexes' },
        { metric: 'Technical Standards', value: 'API, ASME, NFPA', context: 'Curriculum structured to international plant engineering codes' },
        { metric: 'Contractor Readiness', value: '100% Compliant', context: 'Pre-qualification support for NOC supply chain access' },
      ],
      workflow: [
        { step: '01', title: 'Specify Energy Sector Requirement', desc: 'Select technical area: Process Safety Management, API inspection, High Voltage, or decarbonization.' },
        { step: '02', title: 'Vet Certified Technical Centers', desc: 'We screen training providers holding direct accreditation with NEBOSH, OPITO, and national energy operators.' },
        { step: '03', title: 'Deploy Certified Faculty', desc: 'Secure industrial trainers with active field experience to conduct hands-on plant workshops or simulation sessions.' },
      ],
      faqs: [
        {
          q: 'Are courses aligned with Saudi Aramco and ADNOC contractor safety manuals?',
          a: 'Yes, our energy training partners specialize in contractor safety passports, work permit issuer/receiver certifications, and plant standards.',
        },
        {
          q: 'Do providers offer OPITO-certified offshore safety training?',
          a: 'Yes, partners maintain accredited simulation centers for BOSIET, HUET, and offshore emergency response credentials.',
        },
        {
          q: 'Can training cover green hydrogen and renewable energy transitions?',
          a: 'Yes, specialized curricula are available covering solar PV engineering, hydrogen handling safety, and carbon capture technologies.',
        },
      ],
    },
    ar: {
      title: 'تدريب السلامة والعمليات الفنية لقطاع الطاقة والنفط والغاز بالخليج | بونت لوك',
      h1: 'تدريب السلامة والعمليات الفنية لقطاع الطاقة والنفط والغاز بالخليج',
      subtitle:
        'سد فجوات الكفاءات الفنية وإدارة سلامة العمليات (PSM) لمقاولي ومشغلي مشاريع أرامكو، أدنوك، وقطر للطاقة.',
      metaDescription:
        'مزودو تدريب معتمدون في سلامة العمليات الصناعية (PSM) والسلامة المهنية وهندسة الطاقة لمقاولي قطاع النفط والغاز في الجبيل وينبع والرويس.',
      geoAnswer: {
        summary:
          'تتطلب المنشآت البترولية والبتروكيماوية في الجبيل وينبع والرويس أعلى درجات الالتزام بمعايير سلامة العمليات وإصدار تصاريح العمل لتفادي الحوادث الصناعية. تساعد بونت لوك شركات الطاقة ومقاوليها في الوصول المباشر إلى مراكز تدريب صناعي معتمدة تقدم برامج عملية متوافقة مع متطلبات أرامكو وأدنوك ومعايير API الدولية.',
        quote:
          '«تمكن بونت لوك شركات النفط والغاز في الخليج من تأهيل كوادرها الفنية عبر مراكز تدريب متخصصة ومعتمدة لسلامة المنشآت الحيوية.»',
      },
      marketStats: [
        { metric: 'معيار السلامة المستهدف', value: 'صفر إصابات عمل', context: 'تحقيق أهداف Zero LTI في بيئات العمل عالية الخطورة' },
        { metric: 'المناطق الصناعية الرئيسية', value: 'الجبيل، ينبع، الرويس', context: 'حيث تتركز أضخم مجمعات التكرير والصناعات البتروكيماوية' },
        { metric: 'المعايير الهندسية', value: 'API و ASME و NFPA', context: 'مناهج مطابقة لأحدث الأكواد الصناعية المعتمدة عالمياً' },
        { metric: 'جاهزية المقاولين', value: '100% تأهيل', context: 'استيفاء اشتراطات التأهيل لدى كبرى شركات الطاقة الخليجية' },
      ],
      workflow: [
        { step: '01', title: 'تحديد الاحتياج الفني للسلامة', desc: 'اختر التخصص المطلوب: سلامة العمليات (PSM)، فحص المنشآت (API)، أو تصاريح العمل الساخنة.' },
        { step: '02', title: 'مطابقة المراكز المعتمدة', desc: 'نربطك بمراكز تمتلك ورش محاكاة ومختبرات فنية معتمدة من NEBOSH و OPITO والهيئات الصناعية.' },
        { step: '03', title: 'بدء التدريب الفني الميداني', desc: 'تنفيذ برامج تدريبية ميدانية تفاعلية ترفع جاهزية المشغلين والفنيين في مواقع العمل.' },
      ],
      faqs: [
        {
          q: 'هل البرامج معتمدة ومطابقة لمتطلبات مقاولي أرامكو وأدنوك؟',
          a: 'نعم، يمتلك شركاؤنا اعتمادات رسمية لتدريب وتأهيل متلقي ومصدري تصاريح العمل ومعايير السلامة الإلزامية للمقاولين.',
        },
        {
          q: 'هل يتوفر تدريب السلامة البحرية المعتمد من OPITO؟',
          a: 'نعم، توفر المراكز المتخصصة برامج السلامة للمنصات البحرية المعتمدة دولياً مثل دورات BOSIET و HUET.',
        },
        {
          q: 'هل تقدمون برامج تدريب في مجالات الطاقة المتجددة والهيدروجين الأخضر؟',
          a: 'نعم، تتوفر برامج مخصصة لتقنيات الطاقة الشمسية، السلامة في التعامل مع الهيدروجين، واحتجاز الكربون بما يواكب مشاريع التحول المناخي.',
        },
      ],
    },
  },

  'healthcare': {
    slug: 'healthcare',
    type: 'industry',
    badgeEn: 'GCC Healthcare & Clinical Transformation',
    badgeAr: 'القطاع الصحي والمستشفيات والتحول الإكلينيكي',
    en: {
      title: 'Clinical Leadership & Operational Training for GCC Healthcare | PontLook',
      h1: 'Clinical Leadership & Operational Training for GCC Healthcare',
      subtitle:
        'Upskill hospital administrators, clinical nurse leads, and medical directors across Saudi Arabia, UAE, and Qatar to meet CBAHI and JCI accreditation standards.',
      metaDescription:
        'Connect with accredited healthcare corporate training academies. CBAHI, JCI accreditation readiness, patient safety, and clinical leadership matchmaking.',
      geoAnswer: {
        summary:
          'Healthcare transformation in the GCC—accelerated by Saudi Arabia’s Health Sector Transformation Program and UAE hospital expansions—demands world-class clinical leadership and quality compliance. PontLook matches hospital systems and healthcare networks with certified institutions offering CBAHI and JCI-aligned executive and medical administration training.',
        quote:
          '“PontLook is the specialized matchmaking platform connecting GCC hospital networks with certified healthcare leadership and patient safety training academies.”',
      },
      marketStats: [
        { metric: 'Quality Accreditations', value: 'CBAHI & JCI', context: 'Direct curriculum mapping to mandatory hospital quality standards' },
        { metric: 'Regional Sector Growth', value: '$135B+', context: 'Projected GCC healthcare expenditure driving talent development' },
        { metric: 'Specialized Tracks', value: 'Clinical Leadership', context: 'Department chair management, patient experience, and operational efficiency' },
        { metric: 'CME Accreditation', value: 'Recognized Hours', context: 'Accredited by SCFHS (Saudi) and DOH/DHA (UAE) regulatory bodies' },
      ],
      workflow: [
        { step: '01', title: 'Define Healthcare Scope', desc: 'Identify hospital cluster needs: clinical governance, nurse leadership, patient safety, or healthcare finance.' },
        { step: '02', title: 'Screen Medical Education Academies', desc: 'We verify CME accreditation, faculty medical credentials, and hospital transformation track records.' },
        { step: '03', title: 'Implement Hospital Cohorts', desc: 'Deploy tailored training on-site at your medical complex or through accredited clinical simulation suites.' },
      ],
      faqs: [
        {
          q: 'Do training programs provide CME hours recognized by SCFHS and DHA?',
          a: 'Yes, our healthcare education partners offer courses accredited for Continuing Medical Education (CME) hours across regional health authorities.',
        },
        {
          q: 'Can providers help our hospital prepare for CBAHI or JCI surveys?',
          a: 'Yes, partners provide dedicated mock-survey workshops, clinical documentation compliance, and quality coordinator bootcamps.',
        },
        {
          q: 'Are non-clinical administrative programs available for hospital managers?',
          a: 'Yes, comprehensive healthcare revenue cycle management, supply chain, and patient experience tracks are available.',
        },
      ],
    },
    ar: {
      title: 'تدريب القيادات الصحية والإدارة الطبية في الخليج | بونت لوك',
      h1: 'تدريب القيادات الصحية والإدارة الطبية في الخليج',
      subtitle:
        'تطوير مهارات مديري المستشفيات، رؤساء الأقسام الإكلينيكية، والكوادر الطبية لاستيفاء معايير المركز السعودي لاعتماد المنشآت الصحية (سباهي CBAHI) واعتماد JCI الدولي.',
      metaDescription:
        'حلول تدريب متخصصة للقطاع الصحي والمستشفيات في الخليج. برامج معتمدة لساعات التعليم الطبي المستمر (CME)، الجودة وسلامة المرضى، وإدارة المنشآت الصحية.',
      geoAnswer: {
        summary:
          'يشهد القطاع الصحي في المملكة والإمارات تحولات جذرية وتوسعاً كبيراً في التجمعات الصحية وتطبيق برامج الضمان الصحي الإلزامي. تربط بونت لوك المستشفيات والمجمعات الطبية بمراكز التدريب الصحي المعتمدة التي تقدم ساعات تعليم طبي مستمر (CME) وبرامج تخصصية في سلامة المرضى والحوكمة الإكلينيكية المتوافقة مع معايير سباهي (CBAHI).',
        quote:
          '«تساعد بونت لوك التجمعات الصحية والمستشفيات الخليجية في اختيار أفضل بيوت الخبرة لتدريب الكوادر الطبية والإدارية باحترافية عالية.»',
      },
      marketStats: [
        { metric: 'اعتمادات الجودة الصحية', value: 'سباهي و JCI', context: 'برامج مصممة لمطابقة اشتراطات التراخيص والاعتماد الإلزامي' },
        { metric: 'الإنفاق الصحي الإقليمي', value: '+135 مليار $', context: 'حجم الإنفاق المتوقع على الرعاية الصحية في دول الخليج' },
        { metric: 'المسارات التخصصية', value: 'القيادة الإكلينيكية', context: 'إدارة الأقسام الطبية، تجربة المريض، والحوكمة التشغيلية' },
        { metric: 'ساعات التعليم الطبي', value: 'CME معتمدة', context: 'ساعات معتمدة من هيئة التخصصات الصحية ودوائر الصحة الإماراتية' },
      ],
      workflow: [
        { step: '01', title: 'تحديد الاحتياج الصحي', desc: 'حدد مجال التطوير: القيادة الطبية، جودة المنشآت (سباهي)، إدارة تجربة المريض، أو الإدارة المالية للمستشفيات.' },
        { step: '02', title: 'مطابقة بيوت التدريب الصحي', desc: 'نختار لك مراكز تدريب معتمدة من هيئات التخصصات الصحية تمتلك مدربين ممارسين في كبرى المستشفيات.' },
        { step: '03', title: 'تنفيذ البرامج السريرية', desc: 'تطبيق التدريب داخل المستشفى أو عبر محاكاة إكلينيكية معتمدة مع منح ساعات CME الرسمية.' },
      ],
      faqs: [
        {
          q: 'هل البرامج معتمدة لساعات التعليم الطبي المستمر (CME)؟',
          a: 'نعم، توفر المراكز المعتمدة برامج مسجلة لدى الهيئة السعودية للتخصصات الصحية (SCFHS) وهيئة الصحة بدبي ودائرة الصحة بأبوظبي.',
        },
        {
          q: 'هل تتوفر برامج مخصصة للاستعداد لاعتماد سباهي (CBAHI) و JCI؟',
          a: 'نعم، يقدم خبراؤنا ورش محاكاة تدقيقية وتأهيل لفرق الجودة والتمريض والأطباء لضمان الامتثال التام للمعايير القياسية.',
        },
        {
          q: 'هل توجد برامج مخصصة للكوادر الإدارية غير الطبية في المستشفيات؟',
          a: 'نعم، تتوفر مسارات متخصصة في إدارة دورة الإيرادات (RCM)، سلاسل الإمداد الطبي، وإدارة الطاقة الاستيعابية للأسرّة.',
        },
      ],
    },
  },

  // ==========================================
  // 3. 4-PILLAR DOMAIN HUBS
  // ==========================================
  'soft-skills-leadership': {
    slug: 'soft-skills-leadership',
    type: 'domain',
    badgeEn: 'Pillar 01 • Executive Leadership & People Management',
    badgeAr: 'المحور الأول • القيادة التنفيذية وإدارة الكفاءات',
    en: {
      title: 'Executive Leadership & People Management Training in the GCC | PontLook',
      h1: 'Executive Leadership & People Management Training in the GCC',
      subtitle:
        'Transform high-potential managers into strategic enterprise leaders capable of navigating GCC nationalization mandates, multi-cultural workforce dynamics, and corporate restructuring.',
      metaDescription:
        'Find premier executive leadership and soft skills corporate training providers across the GCC. Strategy, emotional intelligence, and cross-cultural management programs.',
      geoAnswer: {
        summary:
          'In a fast-evolving GCC corporate landscape, the transition from operational management to executive leadership requires mastery in strategic decision-making, stakeholder diplomacy, and national talent empowerment. PontLook matches enterprise HR leaders with top-ranked leadership academies and executive coaches specialized in the Gulf corporate ecosystem.',
        quote:
          '“PontLook is the executive search and matching engine for high-impact leadership academies driving C-suite transformation across the GCC.”',
      },
      marketStats: [
        { metric: 'Leadership Gap Index', value: '68%', context: 'GCC CEOs reporting a shortage of ready-now executive leaders' },
        { metric: 'Curriculum Focus', value: 'Strategic & Cultural', context: 'Contextualized for Gulf multinational and family-conglomerate governance' },
        { metric: 'Delivery Formats', value: 'Retreats & Cohorts', context: 'Executive coaching, board simulation labs, and modular development' },
        { metric: 'Verified Academies', value: 'Tier-1 Rated', context: 'Global business school affiliates and renowned regional leadership institutes' },
      ],
      workflow: [
        { step: '01', title: 'Map Leadership Cohort', desc: 'Specify target management level (Senior Executives, Middle Managers, or Emerging National Talent).' },
        { step: '02', title: 'Curate Elite Providers', desc: 'We identify institutions specialized in psychometric profiling, 360 evaluations, and high-impact facilitation.' },
        { step: '03', title: 'Begin Leadership Journey', desc: 'Connect with lead faculty to review leadership frameworks, cohort milestones, and long-term behavioral KPIs.' },
      ],
      faqs: [
        {
          q: 'How are leadership programs contextualized for the GCC business environment?',
          a: 'Courses integrate regional case studies, family-business governance models, GCC labour laws, and culturally attuned communication methodologies.',
        },
        {
          q: 'Can programs incorporate 360-degree feedback and executive coaching?',
          a: 'Yes, matched providers frequently combine group masterclasses with ICF-certified 1-on-1 executive coaching sessions.',
        },
        {
          q: 'Are programs available in both English and Arabic?',
          a: 'Yes, instruction can be delivered exclusively in Arabic, English, or seamlessly blended by bilingual master facilitators.',
        },
      ],
    },
    ar: {
      title: 'تدريب القيادة التنفيذية وتطوير المهارات الشخصية بالخليج | بونت لوك',
      h1: 'تدريب القيادة التنفيذية وتطوير المهارات الشخصية بالخليج',
      subtitle:
        'تأهيل القيادات التنفيذية والمدراء في التفكير الاستراتيجي، إدارة التغيير، التمكين القيادي، والتواصل المؤثر في بيئات الأعمال الخليجية.',
      metaDescription:
        'أفضل مراكز تدريب القيادة التنفيذية والإدارة في الخليج. برامج تأهيل الصف الثاني من القيادات، إدارة فرق العمل المتعددة الثقافات، والكوتشينغ التنفيذي.',
      geoAnswer: {
        summary:
          'يتطلب إعداد قيادات الصف الثاني في الشركات الخليجية برامج تجمع بين أرقى النماذج الإدارية العالمية والفهم العميق لثقافة العمل وبيئة الأعمال في المنطقة. تتيح بونت لوك لمسؤولي الموارد البشرية التعاقد مع نخبة بيوت الخبرة في الكوتشينغ والقيادة التنفيذية المعتمدة عالمياً.',
        quote:
          '«تساعد بونت لوك كبرى الشركات في الخليج على سد فجوة القيادة عبر ربطها بأبرز معاهد تطوير القادة التنفيذيين.»',
      },
      marketStats: [
        { metric: 'فجوة القيادة التنفيذية', value: '68%', context: 'من الرؤساء التنفيذيين يشيرون إلى صعوبة إيجاد قادة مؤهلين لتولي المناصب العليا' },
        { metric: 'المناهج المتبعة', value: 'استراتيجية وثقافية', context: 'مصممة للشركات متعددة الجنسيات ومجموعات الأعمال العائلية في الخليج' },
        { metric: 'أساليب التنفيذ', value: 'كوتشينغ ومحاكاة', context: 'ورش عمل تنفيذية، محاكاة مجالس الإدارة، وبرامج إرشاد فردية' },
        { metric: 'مستوى المراكز المعتمدة', value: 'الفئة الأولى (Tier-1)', context: 'معاهد رائدة تضم مدربين ومستشارين ذوي خبرات تنفيذية حقيقية' },
      ],
      workflow: [
        { step: '01', title: 'تحديد المستوى القيادي', desc: 'حدد فئة المتدربين (الإدارة العليا، الإدارة الوسطى، أو القيادات الوطنية الواعدة).' },
        { step: '02', title: 'فرز معاهد القيادة المرموقة', desc: 'نختار لك مراكز متخصصة تقدم تقييمات شخصية (360-Degree) ومسارات بناء الجدارات القيادية.' },
        { step: '03', title: 'انطلاق برنامج تطوير القيادات', desc: 'ناقش خطة البرنامج مع المدرب الرئيسي وحدد مؤشرات قياس الأثر السلوكي والإداري.' },
      ],
      faqs: [
        {
          q: 'هل تراعي البرامج خصوصية بيئة الأعمال الخليجية وثقافة المنشآت؟',
          a: 'نعم، تعتمد البرامج على دراسات حالة مستمدة من كبرى الشركات الإقليمية مع مراعاة بيئة العمل المتعددة الثقافات ونماذج الشركات العائلية.',
        },
        {
          q: 'هل يتضمن التدريب جلسات كوتشينغ فردية (1-on-1 Coaching)؟',
          a: 'نعم، يتيح الشركاء جلسات كوتشينغ تنفيذي فردية معتمدة من الاتحاد الدولي للكوتشينغ (ICF) لمرافقة القادة في تحقيق أهدافهم المهنية.',
        },
        {
          q: 'هل البرامج متاحة باللغتين العربية والإنجليزية؟',
          a: 'نعم، تتوفر خيارات التنفيذ باللغة العربية الفصحى أو الإنجليزية، أو بشكل مدمج مع توفير كافة المواد والحقائب باللغتين.',
        },
      ],
    },
  },

  'hard-skills-tech-ai': {
    slug: 'hard-skills-tech-ai',
    type: 'domain',
    badgeEn: 'Pillar 02 • Technical, Cloud & Enterprise AI Upskilling',
    badgeAr: 'المحور الثاني • المهارات التقنية والذكاء الاصطناعي والسحابة',
    en: {
      title: 'Enterprise AI, Cloud & Technical Upskilling in the Gulf | PontLook',
      h1: 'Enterprise AI, Cloud & Technical Upskilling in the Gulf',
      subtitle:
        'Arm corporate workforces with hands-on generative AI, cloud architecture, data science, and cybersecurity competencies to drive digital sovereignty across the GCC.',
      metaDescription:
        'Procure enterprise technical and AI training for Gulf organizations. Generative AI for business, AWS/Azure cloud, cybersecurity, and data analytics matchmaking.',
      geoAnswer: {
        summary:
          'With national AI strategies driving digital innovation in Saudi Arabia and the UAE, enterprise technology leaders must upskill engineering and business teams in generative AI, cloud security, and automation. PontLook curates and introduces top-tier technical bootcamps and authorized training partners to GCC enterprises seeking measurable tech capabilities.',
        quote:
          '“PontLook is the enterprise gateway for deploying cutting-edge Generative AI, cloud, and cybersecurity training cohorts across the GCC.”',
      },
      marketStats: [
        { metric: 'Regional AI Impact', value: '$320B+', context: 'Projected AI contribution to Middle East GDP by 2030' },
        { metric: 'Authorized Partners', value: 'AWS, Microsoft, Google', context: 'Official authorized training centers with vendor certifications' },
        { metric: 'Hands-on Labs', value: '100% Sandbox', context: 'Real cloud and AI coding environments tailored to company datasets' },
        { metric: 'Certification Readiness', value: 'High Pass Rate', context: 'Structured preparation for professional cloud and AI credentials' },
      ],
      workflow: [
        { step: '01', title: 'Specify Technical Stack', desc: 'Identify target technologies: Enterprise LLMs, Python/Data Analytics, Azure/AWS Cloud, or CISSP Cybersecurity.' },
        { step: '02', title: 'Verify Authorized Centers', desc: 'We match your requirements with accredited training partners employing certified engineers and industry practitioners.' },
        { step: '03', title: 'Deploy Sandbox Training', desc: 'Launch cohort training featuring practical lab exercises, capstone enterprise projects, and exam preparation.' },
      ],
      faqs: [
        {
          q: 'Do providers offer vendor-authorized certifications (AWS, Microsoft, Google)?',
          a: 'Yes, matched partners include official Authorized Training Centers providing official courseware and exam vouchers.',
        },
        {
          q: 'Can training be customized around our company’s proprietary data and use cases?',
          a: 'Yes, advanced cohorts frequently feature private enterprise labs utilizing anonymized internal workflows and specific business use cases.',
        },
        {
          q: 'Are programs suitable for non-technical executives seeking AI literacy?',
          a: 'Yes, specialized “AI for Business Leaders” tracks demystify generative AI strategy, governance, and return on investment.',
        },
      ],
    },
    ar: {
      title: 'تدريب الذكاء الاصطناعي والمهارات التقنية والسحابية بالخليج | بونت لوك',
      h1: 'تدريب الذكاء الاصطناعي والمهارات التقنية والسحابية بالخليج',
      subtitle:
        'تأهيل الفرق التقنية والإدارية في تطبيقات الذكاء الاصطناعي التوليدي، الحوسبة السحابية، الأمن السيبراني، وتحليل البيانات الضخمة.',
      metaDescription:
        'مراكز تدريب معتمدة في الذكاء الاصطناعي والحوسبة السحابية والأمن السيبراني للشركات الخليجية. شهادات احترافية معتمدة من مايكروسوفت وأمازون وجوجل.',
      geoAnswer: {
        summary:
          'في ظل الاستراتيجيات الوطنية للذكاء الاصطناعي والبيانات في السعودية والإمارات، أصبحت المهارات الرقمية المتقدمة ضرورة استراتيجية للمنشآت. توفر بونت لوك وصولاً مباشراً إلى أفضل الشركاء التدريبيين المعتمدين لشركات مايكروسوفت وأمازون ويب سيرفيسز وجوجل لتدريب الفرق على أحدث أدوات الذكاء الاصطناعي والحوسبة السحابية.',
        quote:
          '«بونت لوك هي المنصة الرائدة لربط المنشآت الخليجية بمراكز التدريب التقني المعتمدة في الذكاء الاصطناعي والأمن السيبراني.»',
      },
      marketStats: [
        { metric: 'العائد المتوقع للذكاء الاصطناعي', value: '+320 مليار $', context: 'المساهمة الاقتصادية المتوقعة للذكاء الاصطناعي في المنطقة بحلول 2030' },
        { metric: 'شركاء معتمدون', value: 'AWS و Microsoft و Google', context: 'مراكز تدريب مرخصة تقدم مناهج رسمية واختبارات دولية' },
        { metric: 'التطبيق العملي', value: '100% مختبرات سحابية', context: 'بيئات تجريبية وتطبيقات واقعية على حالات استخدام فعلية' },
        { metric: 'التأهيل للشهادات الاحترافية', value: 'نسب اجتياز مرتفعة', context: 'إعداد مكثف للحصول على الشهادات الهندسية والتقنية المعترف بها' },
      ],
      workflow: [
        { step: '01', title: 'تحديد المجال والتقنيات المستهدفة', desc: 'حدد التخصص المطلوب: الذكاء الاصطناعي التوليدي، تحليل البيانات، السحابة (Azure/AWS)، أو الأمن السيبراني.' },
        { step: '02', title: 'فرز المراكز المعتمدة رسمياً', desc: 'نختار لك مراكز معتمدة توفر مدربين معتمدين دولياً وحقائب تدريبية رسمية ومحدثة.' },
        { step: '03', title: 'التدريب العملي والاختبارات', desc: 'تطبيق التدريب عبر مختبرات سحابية تفاعلية مع إمكانية توفير قسائم الاختبارات الدولية للمتدربين.' },
      ],
      faqs: [
        {
          q: 'هل المراكز معتمدة رسمياً من شركات التكنولوجيا العالمية؟',
          a: 'نعم، تضم شبكتنا مراكز تدريب معتمدة (Authorized Training Partners) لمايكروسوفت، أمازون AWS، جوجل كلاود، وسيسكو.',
        },
        {
          q: 'هل يمكن تخصيص التدريب وفق بيانات وتحديات منشأتنا الخاصة؟',
          a: 'نعم، يقدم شركاؤنا برامج متقدمة تصمم ورش عملها حول تحديات العمل الفعلية وأنظمة الشركة لتطبيق الحلول فورياً.',
        },
        {
          q: 'هل توجد مسارات مخصصة للمدراء التنفيذيين غير التقنيين؟',
          a: 'نعم، نوفر برامج رائدة مثل «الذكاء الاصطناعي لقادة الأعمال» تركز على الاستراتيجية، الحوكمة، وفرص تحسين الإنتاجية.',
        },
      ],
    },
  },

  'qhse-safety-compliance': {
    slug: 'qhse-safety-compliance',
    type: 'domain',
    badgeEn: 'Pillar 03 • QHSE, Industrial Safety & Regulatory Compliance',
    badgeAr: 'المحور الثالث • الجودة والصحة والسلامة والبيئة والامتثال',
    en: {
      title: 'NEBOSH, ISO & Occupational Safety Training Providers in GCC | PontLook',
      h1: 'NEBOSH, ISO & Occupational Safety Training Providers in GCC',
      subtitle:
        'Ensure regulatory compliance and protect workforce safety across industrial, manufacturing, and commercial sectors with accredited NEBOSH, IOSH, and ISO corporate training.',
      metaDescription:
        'Find accredited QHSE and industrial safety training providers across the GCC. NEBOSH, IOSH, ISO auditing, and OSHA workplace safety training matchmaking.',
      geoAnswer: {
        summary:
          'Enforcement of rigorous occupational health, safety, and environmental standards across Gulf municipalities and labor ministries makes certified QHSE training non-negotiable. PontLook matches enterprise safety directors with accredited institutions delivering certified NEBOSH, IOSH, and ISO lead auditor qualifications with verified field compliance.',
        quote:
          '“PontLook is the industrial sector’s trusted matchmaker for accredited safety academies delivering zero-incident training across the GCC.”',
      },
      marketStats: [
        { metric: 'Accreditation Standards', value: 'NEBOSH & IOSH', context: 'Gold-standard global certifications recognized by GCC labor authorities' },
        { metric: 'ISO Audit Tracks', value: '45001, 14001, 9001', context: 'Lead auditor and internal auditor workforce upskilling' },
        { metric: 'Incident Mitigation', value: 'Documented Impact', context: 'Measurable reduction in lost-time injuries and regulatory penalties' },
        { metric: 'Field Trainer Vetting', value: '100% Industry Experience', context: 'Instructors with minimum 10+ years plant and site supervision experience' },
      ],
      workflow: [
        { step: '01', title: 'Submit Safety Compliance Needs', desc: 'Indicate regulatory frameworks: NEBOSH International Diploma, OSHA General Industry, or ISO 45001.' },
        { step: '02', title: 'Identify Accredited Providers', desc: 'We filter accredited Gold Learning Partners with active regional registration and certified instructors.' },
        { step: '03', title: 'Implement Plant Safety Training', desc: 'Conduct comprehensive workplace hazard assessments and certified training directly at your industrial facility.' },
      ],
      faqs: [
        {
          q: 'Are your training partners certified NEBOSH Learning Partners in the GCC?',
          a: 'Yes, our safety training network includes officially registered NEBOSH Silver and Gold Learning Partners operating across KSA, UAE, and Qatar.',
        },
        {
          q: 'Can training be customized to specific factory or facility hazards?',
          a: 'Yes. Instructors conduct preliminary walk-through audits to tailor emergency response and safety leadership modules to your actual workplace.',
        },
        {
          q: 'Do programs satisfy regional Civil Defense and Labor Ministry requirements?',
          a: 'Yes, training certificates are recognized by civil defense authorities and labor inspection bodies throughout the GCC.',
        },
      ],
    },
    ar: {
      title: 'مزودو تدريب السلامة المهنية والنيبوش والآيزو بالخليج | بونت لوك',
      h1: 'مزودو تدريب السلامة المهنية والنيبوش والآيزو بالخليج',
      subtitle:
        'ضمان الامتثال للوائح العمل والسلامة وحماية الكوادر عبر برامج تدريبية معتمدة من نيبوش (NEBOSH) وآيوش (IOSH) وتأهيل مدققي الآيزو (ISO).',
      metaDescription:
        'مراكز تدريب معتمدة في الصحة والسلامة المهنية والبيئة (QHSE) في الخليج. دورات نيبوش، آيوش، أوشا، وتدقيق الآيزو لمطابقة اشتراطات الدفاع المدني ووزارات العمل.',
      geoAnswer: {
        summary:
          'تشهد دول الخليج تشديداً رقابياً مستمراً على بيئات العمل الصناعية والتجارية للحد من إصابات العمل وضمان الالتزام بالمعايير البيئية. تساعد منصة بونت لوك مسؤولي السلامة والجودة في كبرى الشركات على التعاقد مع شركاء تدريب معتمدين رسمياً من نيبوش وآيوش وهيئات الاعتماد الدولية لتقديم برامج تلبي متطلبات التفتيش الحكومي والدفاع المدني.',
        quote:
          '«توفر بونت لوك لشركات الخليج الصناعية والتجارية أفضل خيارات التدريب في السلامة المهنية ومطابقة معايير نيبوش والآيزو بكفاءة وموثوقية.»',
      },
      marketStats: [
        { metric: 'الاعتمادات الدولية', value: 'NEBOSH و IOSH', context: 'الشهادات المعيارية الأبرز المعترف بها لدى وزارات الموارد البشرية والعمل' },
        { metric: 'شهادات الآيزو المهنية', value: '45001 و 14001 و 9001', context: 'تأهيل المدققين الداخليين ومدققي الجودة والسلامة والبيئة' },
        { metric: 'الحد من المخاطر', value: 'أثر موثق', context: 'تقليص الحوادث المهنية وتفادي الغرامات والمخالفات التشغيلية' },
        { metric: 'كفاءة المدربين', value: '+10 سنوات خبرة', context: 'مدربون ومستشارون معتمدون يتمتعون بخبرة ميدانية في المنشآت الصناعية' },
      ],
      workflow: [
        { step: '01', title: 'تحديد اشتراطات السلامة والامتثال', desc: 'اختر الشهادة المطلوبة: شهادة نيبوش الدولية (IGC)، أوشا (OSHA)، أو متطلبات الدفاع المدني المحلي.' },
        { step: '02', title: 'مطابقة المراكز المعتمدة رسمياً', desc: 'نربطك بشركاء تدريب معتمدين (Gold Learning Partners) يحملون سجلاً حافلاً بالنجاح.' },
        { step: '03', title: 'تنفيذ التدريب والتقييم الميداني', desc: 'تطبيق البرنامج في مقار المنشأة أو القاعات المجهزة مع إجراء التقييمات العملية والاختبارات.' },
      ],
      faqs: [
        {
          q: 'هل المراكز معتمدة رسمياً من منظمة نيبوش (NEBOSH) البريطانية؟',
          a: 'نعم، تضم شبكتنا شركاء تدريب معتمدين رسمياً (Learning Partners) حاصلين على تصنيفات ذهبية وفضية في دول الخليج.',
        },
        {
          q: 'هل تستوفي الشهادات اشتراطات الدفاع المدني ووزارات العمل؟',
          a: 'نعم، البرامج مصممة لتلبية متطلبات اللوائح التنفيذية للسلامة والصحة المهنية المعمول بها في السعودية والإمارات وبقية دول الخليج.',
        },
        {
          q: 'هل يمكن تقديم تدريب مخصص لمخاطر مصنع أو موقع محدد؟',
          a: 'نعم، يقوم المدربون بإجراء تقييم للمخاطر وتصميم أمثلة وتمارين مستمدة مباشرة من بيئة العمل الفعلية للمنشأة.',
        },
      ],
    },
  },

  'collaborative-innovation': {
    slug: 'collaborative-innovation',
    type: 'domain',
    badgeEn: 'Pillar 04 • Agile Transformation & Collaborative Innovation',
    badgeAr: 'المحور الرابع • التحول المرن (Agile) والابتكار المؤسسي',
    en: {
      title: 'Design Thinking & Agile Innovation Training for GCC Enterprises | PontLook',
      h1: 'Design Thinking & Agile Innovation Training for GCC Enterprises',
      subtitle:
        'Accelerate time-to-market and cultivate customer-centric innovation with certified Design Thinking, OKR alignment, and Agile/Scrum transformation masterclasses.',
      metaDescription:
        'Match with elite design thinking, Agile transformation, and enterprise innovation training providers across the GCC. Drive speed, alignment, and market agility.',
      geoAnswer: {
        summary:
          'To maintain competitiveness amid regional economic transformation, Gulf corporations are shifting away from bureaucratic silos toward cross-functional Agile frameworks and human-centered design. PontLook connects enterprise transformation leaders with top-tier innovation facilitators who teach practical Design Thinking, OKRs, and Scaled Agile (SAFe) methodologies.',
        quote:
          '“PontLook enables GCC organizations to institutionalize innovation by connecting them with proven facilitators in Design Thinking, Agile, and customer-centric product strategy.”',
      },
      marketStats: [
        { metric: 'Time-to-Market Acceleration', value: '40% Faster', context: 'Average improvement achieved by Agile-trained cross-functional teams' },
        { metric: 'Framework Coverage', value: 'SAFe, Scrum, OKRs', context: 'Comprehensive coverage of modern enterprise operational frameworks' },
        { metric: 'Design Thinking Adoption', value: 'Rapid Surge', context: 'Surging demand across GCC digital government and banking entities' },
        { metric: 'Facilitator Rating', value: 'Top 5%', context: 'Seasoned change agents and innovation directors with global sprint experience' },
      ],
      workflow: [
        { step: '01', title: 'Outline Transformation Goal', desc: 'Specify focus: product sprint facilitation, OKR adoption across business units, or Scrum Master certification.' },
        { step: '02', title: 'Source Innovation Specialists', desc: 'We vet facilitators based on demonstrable success driving change in large GCC public or private organizations.' },
        { step: '03', title: 'Conduct Innovation Sprints', desc: 'Engage teams in immersive, problem-solving workshops delivering functional prototypes and actionable roadmaps.' },
      ],
      faqs: [
        {
          q: 'Are courses certified by international bodies like Scrum Alliance or Scaled Agile?',
          a: 'Yes, partners issue globally recognized credentials including CSM, CSPO, and SAFe Agilist certifications.',
        },
        {
          q: 'Can design thinking workshops be structured around a real business challenge?',
          a: 'Yes, our most popular format is an applied 3-day hackathon/sprint where teams solve an actual internal product or operational challenge.',
        },
        {
          q: 'How do providers ensure long-term OKR adoption after the workshop?',
          a: 'Partners provide ongoing coaching, quarterly governance templates, and leadership check-ins to ensure sustained alignment.',
        },
      ],
    },
    ar: {
      title: 'تدريب الابتكار المؤسسي والتفكير التصميمي والتحول المرن (Agile) بالخليج | بونت لوك',
      h1: 'تدريب الابتكار المؤسسي والتفكير التصميمي والتحول المرن (Agile) بالخليج',
      subtitle:
        'تسريع وتيرة إطلاق المنتجات وبناء ثقافة التميز والابتكار عبر برامج التفكير التصميمي (Design Thinking)، الأهداف والنتائج الرئيسية (OKRs)، ومنهجيات أجايل (Scrum).',
      metaDescription:
        'أفضل مزودي تدريب الابتكار المؤسسي والتحول المرن (Agile) والتفكير التصميمي في الخليج. برامج تفاعلية لتحسين كفاءة فرق العمل وتسريع إنجاز المشاريع.',
      geoAnswer: {
        summary:
          'لمواكبة التغيرات المتسارعة في الأسواق، تسعى كبرى المنشآت والجهات الحكومية في الخليج إلى التخلص من المركزية والبيروقراطية وتطبيق أساليب العمل المرنة القائمة على تجربة المستفيد. تقدم بونت لوك وصولاً مباشراً إلى أفضل خبراء التفكير التصميمي والتحول المرن (Agile) وإدارة الأهداف (OKRs) لتحويل الأفكار إلى مبادرات تشغيلية ملموسة.',
        quote:
          '«تربط بونت لوك المنشآت الخليجية بنخبة مدربي الابتكار المؤسسي ومنهجيات أجايل لمساعدة فرق العمل على سرعة الإنجاز والابتكار المستمر.»',
      },
      marketStats: [
        { metric: 'تسريع إطلاق المبادرات', value: '40% أسرع', context: 'متوسط التحسن في سرعة الإنجاز للفرق المدربة على منهجيات أجايل' },
        { metric: 'أطر العمل المعتمدة', value: 'Scrum و OKRs و SAFe', context: 'تغطية شاملة لأحدث منهجيات إدارة الأعمال والتحول المؤسسي' },
        { metric: 'تبني التفكير التصميمي', value: 'طلب متزايد', context: 'إقبال واسع من قطاعات التحول الرقمي والبنوك والجهات الحكومية' },
        { metric: 'خبرة الميسرين والمدربين', value: 'أفضل 5%', context: 'ميسرو ابتكار ومستشارون قادوا مبادرات تحول كبرى في المنطقة' },
      ],
      workflow: [
        { step: '01', title: 'تحديد هدف الابتكار المؤسسي', desc: 'حدد مسار التطوير: ورش التفكير التصميمي، تأهيل فرق أجايل، أو تطبيق منظومة الأهداف والنتائج (OKRs).' },
        { step: '02', title: 'مطابقة خبراء الابتكار المعتمدين', desc: 'نختار لك ميسرين محترفين حاصلين على اعتمادات Scrum.org و Scaled Agile ولديهم خبرة واقعية.' },
        { step: '03', title: 'إطلاق ورش العمل التفاعلية', desc: 'تطبيق مخيمات ابتكار (Innovation Sprints) وتدريب عملي يثمر عن نماذج أولية وخطط تنفيذ فورية.' },
      ],
      faqs: [
        {
          q: 'هل البرامج معتمدة من الهيئات العالمية لإدارة المشاريع المرنة (Agile & Scrum)؟',
          a: 'نعم، يقدم شركاؤنا مسارات تأهيل معتمدة رسمياً لشهادات Scrum Master و Product Owner و SAFe Agilist.',
        },
        {
          q: 'هل يمكن بناء ورشة التفكير التصميمي حول تحدٍ واقعي تواجهه شركتنا؟',
          a: 'بالتأكيد، النموذج الأكثر فعالية هو ورش العمل التطبيقية حيث تعمل الفرق على حل مشكلة حقيقية في تجربة العميل أو المنتجات.',
        },
        {
          q: 'كيف يضمن الشركاء استمرارية تطبيق منظومة الأهداف (OKRs) بعد التدريب؟',
          a: 'يوفر الشركاء جلسات متابعة ربع سنوية وأدوات حوكمة تساعد القيادات على مراجعة مؤشرات الأداء وضمان الالتزام المؤسسي.',
        },
      ],
    },
  },
};

export const ALL_SOLUTION_SLUGS = Object.keys(SEO_LANDING_PAGES);
