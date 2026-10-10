import { NextRequest, NextResponse } from 'next/server';
import { isRequestAdmin } from '@/lib/admin-auth';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
]);

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

export async function POST(req: NextRequest) {
  try {
    if (!isRequestAdmin(req)) {
      return NextResponse.json({ error: 'Unauthorized admin session' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file format. Allowed formats: PNG, JPG, WebP, GIF, SVG, AVIF.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'File size exceeds maximum 15MB limit.' },
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Sanitize filename and create unique timestamped name
    const originalName = file.name || 'image.png';
    const cleanBaseName = originalName
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, '-')
      .replace(/-+/g, '-');
    const ext = path.extname(cleanBaseName) || '.png';
    const baseNameWithoutExt = path.basename(cleanBaseName, ext);
    const uniqueFilename = `${Date.now()}-${baseNameWithoutExt}${ext}`;

    const filePath = path.join(uploadsDir, uniqueFilename);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFilename,
      size: file.size,
      mimeType: file.type,
    });
  } catch (err: any) {
    console.error('Admin upload error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to process media upload' },
      { status: 500 }
    );
  }
}
