import { getDictionary } from '@/i18n';
import { Locale, i18n } from '@/i18n/config';
import PartnershipForm from '@/components/providers/PartnershipForm';
import LeadTiers from '@/components/providers/LeadTiers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Training Providers | PontLook',
  description:
    'Receive verified corporate training opportunities across the GCC on a pay-per-lead model.',
};

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function ForProvidersPage({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  let dict: any = {};

  try {
    dict = await getDictionary(lang);
  } catch (err) {
    console.error('Error loading dictionary:', err);
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        <LeadTiers dict={dict} lang={lang} />
        <div id="apply">
          <PartnershipForm dict={dict} lang={lang} />
        </div>
      </div>
    </main>
  );
}
