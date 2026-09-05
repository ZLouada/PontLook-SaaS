import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import HowItWorks from '@/components/home/HowItWorks';
import WhyDifferent from '@/components/home/WhyDifferent';
import StatsCounter from '@/components/home/StatsCounter';
import ProviderTeaser from '@/components/home/ProviderTeaser';
import FinalCta from '@/components/home/FinalCta';
import { i18n } from '@/i18n/config';

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <WhyDifferent />
      <StatsCounter />
      <ProviderTeaser />
      <FinalCta />
    </>
  );
}
