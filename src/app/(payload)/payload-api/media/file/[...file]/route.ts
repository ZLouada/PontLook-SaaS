import { NextRequest } from 'next/server';
import { GET as handleGet, HEAD as handleHead } from '@/app/payload-media/[...file]/route';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ file: string[] }> }
) {
  return handleGet(req, context);
}

export async function HEAD(
  req: NextRequest,
  context: { params: Promise<{ file: string[] }> }
) {
  return handleHead(req, context);
}
