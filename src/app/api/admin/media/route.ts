import { NextRequest, NextResponse } from 'next/server';
import { isRequestAdmin } from '@/lib/admin-auth';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    if (!isRequestAdmin(req)) {
      return NextResponse.json({ error: 'Unauthorized admin session' }, { status: 401 });
    }

    const primaryDir = path.join(process.cwd(), 'public', 'uploads');
    const backupDir = path.join('/tmp', 'pontlook-uploads');

    await fs.mkdir(primaryDir, { recursive: true }).catch(() => {});
    await fs.mkdir(backupDir, { recursive: true }).catch(() => {});

    const mediaMap = new Map<string, { filename: string; url: string; size: number; updatedAt: number }>();

    // 1. Read primary
    try {
      const primaryEntries = await fs.readdir(primaryDir, { withFileTypes: true });
      for (const entry of primaryEntries) {
        if (entry.isFile() && !entry.name.startsWith('.')) {
          const filePath = path.join(primaryDir, entry.name);
          const stat = await fs.stat(filePath);
          mediaMap.set(entry.name, {
            filename: entry.name,
            url: `/uploads/${entry.name}`,
            size: stat.size,
            updatedAt: stat.mtimeMs,
          });
        }
      }
    } catch {}

    // 2. Read backup and fill any missing
    try {
      const backupEntries = await fs.readdir(backupDir, { withFileTypes: true });
      for (const entry of backupEntries) {
        if (entry.isFile() && !entry.name.startsWith('.') && !mediaMap.has(entry.name)) {
          const filePath = path.join(backupDir, entry.name);
          const stat = await fs.stat(filePath);
          mediaMap.set(entry.name, {
            filename: entry.name,
            url: `/uploads/${entry.name}`,
            size: stat.size,
            updatedAt: stat.mtimeMs,
          });
        }
      }
    } catch {}

    const mediaList = Array.from(mediaMap.values());
    mediaList.sort((a, b) => b.updatedAt - a.updatedAt);

    return NextResponse.json({
      success: true,
      media: mediaList,
    });
  } catch (err: any) {
    console.error('Admin list media error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to list media files' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!isRequestAdmin(req)) {
      return NextResponse.json({ error: 'Unauthorized admin session' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const filenameParam = searchParams.get('filename');

    if (!filenameParam) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    // Prevent directory traversal
    const safeFilename = path.basename(filenameParam);
    if (!safeFilename || safeFilename.startsWith('.') || safeFilename.includes('..')) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    const primaryPath = path.join(process.cwd(), 'public', 'uploads', safeFilename);
    const backupPath = path.join('/tmp', 'pontlook-uploads', safeFilename);

    await fs.unlink(primaryPath).catch(() => {});
    await fs.unlink(backupPath).catch(() => {});

    return NextResponse.json({ success: true, deleted: safeFilename });
  } catch (err: any) {
    console.error('Admin delete media error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to delete media file' },
      { status: 500 }
    );
  }
}
