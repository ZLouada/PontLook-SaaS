import { NextRequest, NextResponse } from 'next/server';
import { isRequestAdmin } from '@/lib/admin-auth';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/pjpeg',
  'image/png',
  'image/x-png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
]);

const ALLOWED_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.svg',
  '.avif',
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

    // Determine extension early
    const originalName = file.name || 'image.png';
    const rawExt = path.extname(originalName).toLowerCase() || '.png';

    const isValidMime = file.type && ALLOWED_MIME_TYPES.has(file.type.toLowerCase());
    const isValidExt = ALLOWED_EXTENSIONS.has(rawExt);

    if (!isValidMime && !isValidExt) {
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

    // Sanitize filename and create unique timestamped name
    const cleanBaseName = originalName
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, '-')
      .replace(/-+/g, '-');
    const ext = rawExt;
    const baseNameWithoutExt = path.basename(cleanBaseName, ext) || 'media';
    const uniqueFilename = `${Date.now()}-${baseNameWithoutExt}${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    // 1. Primary write to public/uploads
    let savedToPrimary = false;
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadsDir, { recursive: true });
      const primaryFilePath = path.join(uploadsDir, uniqueFilename);
      await fs.writeFile(primaryFilePath, buffer);
      savedToPrimary = true;
    } catch (primaryErr) {
      console.warn('[Admin Upload] Could not write to public/uploads:', primaryErr);
    }

    // 2. Backup write to /tmp/pontlook-uploads
    let savedToBackup = false;
    try {
      const backupDir = path.join('/tmp', 'pontlook-uploads');
      await fs.mkdir(backupDir, { recursive: true });
      const backupFilePath = path.join(backupDir, uniqueFilename);
      await fs.writeFile(backupFilePath, buffer);
      savedToBackup = true;
    } catch (backupErr) {
      console.warn('[Admin Upload] Could not write to /tmp/pontlook-uploads:', backupErr);
    }

    if (!savedToPrimary && !savedToBackup) {
      throw new Error('Could not persist file to disk storage');
    }

    const publicUrl = `/uploads/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFilename,
      size: file.size,
      mimeType: file.type || 'image/png',
    });
  } catch (err: any) {
    console.error('Admin upload error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to process media upload' },
      { status: 500 }
    );
  }
}
