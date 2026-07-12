import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import HowItWorks from '@/components/home/HowItWorks';
import WhyDifferent from '@/components/home/WhyDifferent';
import Industries from '@/components/home/Industries';
import StatsCounter from '@/components/home/StatsCounter';
import ProviderTeaser from '@/components/home/ProviderTeaser';
import FindTrainingTeaser from '@/components/home/FindTrainingTeaser';
import InsightsPreview from '@/components/home/InsightsPreview';
import FinalCta from '@/components/home/FinalCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <WhyDifferent />
      <Industries />
      <StatsCounter />
      <ProviderTeaser />
      <FindTrainingTeaser />
      <InsightsPreview />
      <FinalCta />
    </>
  );
}
