import React from 'react';
import Link from 'next/link';

interface HomeGuaranteeSectionProps {
  isAr?: boolean;
  lang: string;
}

export default function HomeGuaranteeSection({
  isAr = false,
  lang,
}: HomeGuaranteeSectionProps) {
  return (
    <section
      data-nav-light="true"
      className="bg-white text-black py-20 sm:py-28 lg:py-36 border-t border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-600 mb-3 sm:mb-4">
          {isAr ? 'ضماننا المؤسسي' : 'OUR GUARANTEE'}
        </div>
        <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-black mb-4 sm:mb-6">
          {isAr ? 'وعدنا لك' : 'Our promise'}
        </h2>
        <p className="text-base sm:text-lg text-neutral-700 max-w-2xl font-normal leading-relaxed mb-8 sm:mb-12">
          {isAr
            ? 'نسلمك صناع قرار موثوقين في كبرى المنشآت مع احتياج تدريبي مؤسسي مؤكد، وبدون أي مخاطرة مالية.'
            : 'We deliver verified enterprise decision makers with a confirmed corporate training need, with zero financial risk.'}
        </p>

        <div className="font-heading font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-black my-8 sm:my-14">
          {isAr ? (
            <>
              بدون اشتراك شهري.
              <br />
              بدون أي مخاطرة.
            </>
          ) : (
            <>
              No retainer.
              <br />
              No risk.
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
          <Link
            href={`/${lang}/find-training`}
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-black text-white text-xs sm:text-sm font-semibold tracking-wide border-[1.5px] border-black hover:bg-white hover:text-black transition-colors duration-200"
          >
            {isAr ? 'ابحث عن شريكك التدريبي' : 'Find your training partner'}
          </Link>
          <Link
            href={`/${lang}/for-providers`}
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent text-black text-xs sm:text-sm font-semibold tracking-wide border-[1.5px] border-black hover:bg-black hover:text-white transition-colors duration-200"
          >
            {isAr ? 'انضم كمزود تدريب معتمد' : 'Join as a training provider'}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent text-neutral-600 text-xs sm:text-sm font-semibold tracking-wide border-[1.5px] border-neutral-300 hover:border-black hover:text-black transition-colors duration-200"
          >
            {isAr ? 'احجز مكالمة استكشافية' : 'Book a discovery call'}
          </Link>
        </div>
      </div>
    </section>
  );
}
