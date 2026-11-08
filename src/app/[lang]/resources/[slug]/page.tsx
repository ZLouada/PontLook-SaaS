import { redirect } from 'next/navigation';
import type { Locale } from '@/i18n/config';

export const dynamic = 'force-dynamic';

export default async function ResourceSlugCatchAll({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  redirect(`/${lang}/resources/blog/${slug}`);
}
