import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import HowItWorks from '@/components/home/HowItWorks';
import dynamic from 'next/dynamic';

const WhyDifferent = dynamic(() => import('@/components/home/WhyDifferent'));
const StatsCounter = dynamic(() => import('@/components/home/StatsCounter'));
const ProviderTeaser = dynamic(() => import('@/components/home/ProviderTeaser'));
const FinalCta = dynamic(() => import('@/components/home/FinalCta'));

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
