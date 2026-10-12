import LeadTiers from '@/components/providers/LeadTiers';
import { getDictionary } from '@/i18n';
import { Locale } from '@/i18n/config';

export default async function ProviderTeaser({ lang = 'en', dict }: { lang?: string; dict?: any }) {
  const dictionary = dict || (await getDictionary(lang as Locale));
  return <LeadTiers lang={lang} dict={dictionary} showSignals={false} />;
}
