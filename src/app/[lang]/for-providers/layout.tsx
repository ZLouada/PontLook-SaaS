import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { providerIcons } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  icons: providerIcons,
};

export default function ForProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
