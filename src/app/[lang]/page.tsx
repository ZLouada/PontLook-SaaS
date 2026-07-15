import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import HowItWorks from '@/components/home/HowItWorks';
import dynamic from 'next/dynamic';

const WhyDifferent = dynamic(() => import('@/components/home/WhyDifferent'));
const StatsCounter = dynamic(() => import('@/components/home/StatsCounter'));
const ProviderTeaser = dynamic(() => import('@/components/home/ProviderTeaser'));
const FindTrainingTeaser = dynamic(() => import('@/components/home/FindTrainingTeaser'));
const InsightsPreview = dynamic(() => import('@/components/home/InsightsPreview'));
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
      <FindTrainingTeaser />
      <InsightsPreview />
      <FinalCta />
    </>
  );
}
