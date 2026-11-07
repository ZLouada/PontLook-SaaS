import React from 'react';
import Link from 'next/link';

interface BlogSkylineCtaProps {
  lang: string;
  isAr?: boolean;
}

export function BlogSkylineCta({ lang, isAr = false }: BlogSkylineCtaProps) {
  return (
    <section
      aria-label={isAr ? 'حجز استشارة تدريبية' : 'Book a Training Consultation'}
      dir={isAr ? 'rtl' : 'ltr'}
      className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] px-6 sm:px-8 pt-16 sm:pt-20 pb-40 sm:pb-48 text-center text-white bg-gradient-to-br from-[#FF7A33] via-[#FF5A1F] to-[#FFA52E] shadow-xl my-16 sm:my-20"
    >
      {/* Halftone subtle dot overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1.5px, transparent 2px)',
          backgroundSize: '18px 18px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight text-white mb-4">
          {isAr
            ? 'هل أنت مستعد لمناقشة أهدافك التدريبية؟'
            : 'Ready to discuss your training objectives?'}
        </h2>

        <p className="font-sans text-sm sm:text-base md:text-lg text-white/95 max-w-xl mx-auto leading-relaxed mb-8">
          {isAr
            ? 'تواصل مباشرة مع فريقنا الاستشاري لبحث خيارات المطابقة المعتمدة مع أفضل مزودي التدريب أو مناقشة فرص الشراكة المؤسسية عبر دول الخليج.'
            : 'Connect directly with our enterprise advisory team to explore verified provider matching or discuss partnership opportunities across the region.'}
        </p>

        <Link
          href={`/${lang}/find-training`}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0B0B10] hover:bg-black text-white font-semibold text-sm transition-transform duration-200 hover:-translate-y-0.5 shadow-lg active:scale-95"
        >
          <span>{isAr ? 'احجز استشارة مجانية' : 'Book a consultation'}</span>
          <svg
            className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Gulf Skyline Vector Silhouette at bottom */}
      <svg
        className="absolute left-0 bottom-0 w-full h-28 sm:h-36 md:h-40 block pointer-events-none"
        viewBox="0 0 1200 150"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <g fill="#0B0B10">
          <rect x="0" y="100" width="90" height="50" />
          <rect x="100" y="70" width="50" height="80" />
          <rect x="160" y="90" width="70" height="60" />
          <rect x="250" y="48" width="42" height="102" />
          <rect x="259" y="14" width="24" height="40" />
          <rect x="268" y="0" width="6" height="20" />
          <rect x="310" y="82" width="80" height="68" />
          <rect x="400" y="60" width="52" height="90" />
          <rect x="462" y="96" width="90" height="54" />
          <rect x="570" y="72" width="60" height="78" />
          <rect x="642" y="100" width="80" height="50" />
          <rect x="740" y="54" width="46" height="96" />
          <rect x="796" y="86" width="74" height="64" />
          <rect x="884" y="66" width="56" height="84" />
          <rect x="950" y="98" width="86" height="52" />
          <rect x="1050" y="74" width="52" height="76" />
          <rect x="1112" y="96" width="88" height="54" />
        </g>
      </svg>
    </section>
  );
}

export default BlogSkylineCta;
