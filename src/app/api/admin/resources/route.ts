import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isCurrentRequestAdmin, isRequestAdmin } from '@/lib/admin-auth';
import { getResourcesStore, saveResourcesStore } from '@/lib/resources-store';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const isAdmin = await isCurrentRequestAdmin();
  if (!isAdmin && !isRequestAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = getResourcesStore();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const isAdmin = await isCurrentRequestAdmin();
  if (!isAdmin && !isRequestAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const success = saveResourcesStore(body);
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to save resources to disk' },
        { status: 500 }
      );
    }

    // Revalidate all resources pages across all languages immediately
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/[lang]/resources', 'page');
      revalidatePath('/[lang]/resources/blog', 'page');
      revalidatePath('/[lang]/resources/blog/[slug]', 'page');
      revalidatePath('/[lang]/resources/downloads', 'page');
      revalidatePath('/[lang]/resources/events', 'page');
      revalidatePath('/[lang]/resources/podcasts', 'page');
      revalidatePath('/en/resources');
      revalidatePath('/ar/resources');
      revalidatePath('/en/resources/blog');
      revalidatePath('/ar/resources/blog');
      revalidatePath('/en/resources/downloads');
      revalidatePath('/ar/resources/downloads');
      revalidatePath('/en/resources/events');
      revalidatePath('/ar/resources/events');
      revalidatePath('/en/resources/podcasts');
      revalidatePath('/ar/resources/podcasts');
    } catch (revalErr) {
      console.warn('[PontLook Admin] Revalidation warning:', revalErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Resources updated successfully and live on the website!',
    });
  } catch (err: any) {
    console.error('Error saving resources:', err);
    return NextResponse.json(
      { error: 'Internal server error saving resources' },
      { status: 500 }
    );
  }
}
