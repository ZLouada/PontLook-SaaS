import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import { i18n } from '@/i18n/config';

const HowItWorks = dynamic(() => import('@/components/home/HowItWorks'));
const WhyDifferent = dynamic(() => import('@/components/home/WhyDifferent'));
const StatsCounter = dynamic(() => import('@/components/home/StatsCounter'));
const ProviderTeaser = dynamic(() => import('@/components/home/ProviderTeaser'));
const FinalCta = dynamic(() => import('@/components/home/FinalCta'));

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
