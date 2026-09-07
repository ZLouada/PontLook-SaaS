import type { Metadata } from 'next';
import Reveal from '@/components/shared/Reveal';
import FAQAccordion from '@/components/faq/FAQAccordion';
import Link from 'next/link';
import { Locale, i18n } from '@/i18n/config';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Frequently Asked Questions about PontLook and how we connect corporate training companies with qualified GCC decision-makers.',
};

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

const faqsEn = [
  { question: "What does PontLook do?", answer: "We help corporate training providers reach verified GCC decision-makers who have a relevant training need and a reason to speak." },
  { question: "Do you provide corporate training?", answer: "No. We do not deliver training programmes; we connect specialist training companies with qualified corporate buyers." },
  { question: "Who do you help?", answer: "We work with mid-sized corporate training providers offering leadership, soft skills, digital transformation, compliance, onboarding, and workforce-development programmes." },
  { question: "Which decision-makers do you target?", answer: "We identify and qualify CEOs, Managing Directors, HR Directors, CHROs, and L&D Managers who influence or own training decisions." },
  { question: "Which markets do you cover?", answer: "Our focus is the GCC: the UAE, Saudi Arabia, Qatar, Kuwait, and Bahrain." },
  { question: "Which industries do you target?", answer: "We focus on construction, real estate, financial services, technology, healthcare, hospitality, manufacturing, and logistics." },
  { question: "Is this just a contact list?", answer: "No. A contact list gives you names and emails; we provide researched prospects with context on their role, company, pain point, and potential need." },
  { question: "How do you qualify each lead?", answer: "We verify the person’s current role, company fit, industry, business challenge, and the evidence that makes your training offer relevant." },
  { question: "How does your pricing work?", answer: "You pay per qualified lead delivered and accepted, rather than paying a monthly retainer for activity or promises." },
  { question: "Do I need to sign a long-term contract?", answer: "No. Our model is designed without a monthly retainer or long-term commitment; you pay for qualified opportunities delivered." },
  { question: "What happens if a lead does not meet our criteria?", answer: "We replace any lead that does not meet the qualification criteria agreed with you at the beginning." },
  { question: "Can you target UAE or Saudi Arabia only?", answer: "Yes. We can focus campaigns on one GCC country, selected cities, or a wider GCC market based on where you deliver training." },
  { question: "Will the leads be relevant to our programme?", answer: "That is the goal: we match the prospect’s documented business problem with the type of training your company provides." },
  { question: "Do you guarantee that every lead will close?", answer: "No ethical agency can guarantee a sale. We guarantee qualified, researched opportunities; your offer, follow-up, sales process, and pricing determine the final result." },
  { question: "What do we need to provide before starting?", answer: "You tell us your ideal client profile, training solutions, target industries, preferred countries, decision-maker roles, and lead qualification criteria." },
  { question: "How quickly can we get started?", answer: "Once we agree on your targeting and lead criteria, we begin research and outreach to identify suitable opportunities." },
];

const faqsAr = [
  { question: "ما الذي تقوم به منصة بونت لوك بالضبط؟", answer: "نساعد مزودي ومراكز تدريب الشركات في الوصول إلى صناع قرار موثوقين ومؤهلين في منطقة الخليج ممن لديهم احتياج تدريبي فعلي واستعداد للتواصل." },
  { question: "هل تقدمون برامج تدريب للشركات بأنفسكم؟", answer: "لا. نحن لا نقدم الدورات والبرامج بأنفسنا؛ بل نربط مزودي ومراكز التدريب المتخصصة بالجهات والشركات الطالبة للتدريب." },
  { question: "من هي الفئات والشركات التي تخدمونها؟", answer: "نعمل مع مزودي ومراكز تدريب الشركات المتخصصة في القيادة التنفيذية، والمهارات الشخصية، والتحول الرقمي، والامتثال، والتأهيل الوظيفي وتطوير الكوادر." },
  { question: "ما هي الفئات المستهدفة من صناع القرار؟", answer: "نحدد ونؤهل الرؤساء التنفيذيين، والمدراء العامين، ومدراء الموارد البشرية، ورؤساء قطاع رأس المال البشري، ومدراء التدريب والتطوير المؤثرين على قرارات الشراء التدريبي." },
  { question: "ما هي الأسواق الجغرافية التي تغطونها؟", answer: "نركز على كافة دول مجلس التعاون الخليجي: المملكة العربية السعودية، والإمارات العربية المتحدة، وقطر، والكويت، والبحرين، وعُمان." },
  { question: "ما هي القطاعات الاقتصادية التي تستهدفونها؟", answer: "نركز على قطاعات التشييد والمقاولات، والتطوير العقاري، والخدمات المالية، والتقنية، والرعاية الصحية، والضيافة، والصناعة، والخدمات اللوجستية." },
  { question: "هل ما تقدمونه مجرد قوائم بيانات اتصال؟", answer: "إطلاقاً. قوائم الاتصال تمنحك فقط أسماء وإيميلات مجردة؛ نحن نقدم لك فرصاً مدروسة بعناية مع سياق كامل حول المنصب، والشركة، ونقاط الألم، ونوع الاحتياج التدريبي." },
  { question: "كيف تقومون بتأهيل وتوثيق كل فرصة؟", answer: "نتحقق من المنصب الحالي للمسؤول، وملاءمة المنشأة، والقطاع، والتحدي المؤسسي القائم، ومؤشرات الحاجة التي تجعل عرضك التدريبي مناسباً وملائماً." },
  { question: "كيف يعمل نموذج التسعير لديكم؟", answer: "تدفع فقط لكل فرصة مؤهلة ومقبولة يتم تسليمها لك، بدلاً من دفع رسوم شهرية ثابتة مقابل نشاطات أو وعود غير مؤكدة." },
  { question: "هل يتطلب الأمر توقيع عقد التزام طويل الأجل؟", answer: "لا. نموذجنا مصمم بدون أي رسوم اشتراك شهرية أو التزامات طويلة الأجل؛ أنت تدفع حصراً مقابل الفرص المؤهلة المستلمة." },
  { question: "ماذا يحدث إذا لم تطابق إحدى الفرص معاييرنا المتفق عليها؟", answer: "نلتزم باستبدال أي فرصة لا تطابق معايير التأهيل المحددة والمتفق عليها مسبقاً معك في بداية التعاقد." },
  { question: "هل يمكننا استهداف السعودية أو الإمارات فقط؟", answer: "نعم بالتأكيد. يمكننا تركيز الحملات على دولة خليجية واحدة، أو مدن محددة كالرياض أو دبي، أو تغطية السوق الخليجي الأوسع بحسب نطاق عملكم." },
  { question: "هل ستكون الفرص ملائمة لنوعية برامجنا؟", answer: "هذا هو جوهر خدمتنا: نقوم بمطابقة التحدي المؤسسي الموثق لدى العميل مع تخصصات وحلول التدريب التي تبرعون في تقديمها." },
  { question: "هل تضمنون إغلاق الصفقات بنسبة 100%؟", answer: "لا توجد أي منصة مهنية ذات مصداقية تضمن نتائج البيع النهائية. نحن نضمن فرصاً مؤهلة ومدروسة مع صناع قرار؛ بينما يعتمد الإغلاق النهائي على عرضكم التجاري وسعركم وجودة متابعتكم." },
  { question: "ما هي المتطلبات التي نحتاج تقديمها لبدء العمل؟", answer: "تزودنا بملف العميل المثالي لديكم، وحلولكم التدريبية، والقطاعات المستهدفة، والدول المفضلة، والمناصب المستهدفة، ومعايير تأهيل الفرص." },
  { question: "كم يستغرق بدء استقبال الفرص؟", answer: "بمجرد الاتفاق على معايير الاستهداف وشروط التأهيل، يبدأ فريقنا فوراً بعمليات البحث والتواصل وتأهيل الفرص الملائمة." },
];

export default async function FAQPage({ params }: { params: Promise<{ lang: Locale }> | { lang: Locale } }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isAr = lang === 'ar';
  const faqs = isAr ? faqsAr : faqsEn;

  return (
    <>
      <section className="bg-hero-gradient pt-36 pb-20 relative overflow-hidden">
        <div className="container-site max-w-4xl relative z-10 text-center mx-auto">
          <Reveal>
            <span className="chip mx-auto">
              {isAr ? 'المساعدة والمعلومات' : 'Help & Information'}
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl text-slate-800 font-heading">
              {isAr ? (
                <>
                  الأسئلة الأكثر <span className="text-primary">شيوعاً وتكراراً</span>
                </>
              ) : (
                <>
                  Frequently Asked <span className="text-primary">Questions</span>
                </>
              )}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto">
              {isAr
                ? 'كل ما تحتاج معرفته حول كيفية قيام بونت لوك بربط مزودي تدريب الشركات بصناع القرار المؤهلين في دول الخليج.'
                : 'Everything you need to know about how PontLook connects corporate training companies with qualified GCC decision-makers.'}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24" id="faq">
        <div className="container-site max-w-3xl mx-auto">
          <FAQAccordion faqs={faqs} />

          <Reveal delay={0.4}>
            <div className="mt-16 bg-gradient-to-br from-primary-50 to-white border border-primary-100 p-10 rounded-3xl text-center shadow-sm">
              <h3 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                {isAr ? 'هل ما زال لديك أي استفسار؟' : 'Still have questions?'}
              </h3>
              <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
                {isAr
                  ? 'فريقنا جاهز لمساعدتك دائماً. تواصل معنا لمناقشة متطلباتك المحددة وكيف يمكننا دعم نمو أعمالك في منطقة الخليج.'
                  : 'We’re here to help. Reach out to our team to discuss your specific needs and how we can support your growth in the GCC.'}
              </p>
              <Link href={`/${lang}/contact`} className="btn-primary inline-flex">
                {isAr ? 'تواصل معنا' : 'Contact Us'}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
