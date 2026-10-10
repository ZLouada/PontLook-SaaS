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

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const dirEntries = await fs.readdir(uploadsDir, { withFileTypes: true });

    const mediaList = await Promise.all(
      dirEntries
        .filter((entry) => entry.isFile() && !entry.name.startsWith('.'))
        .map(async (entry) => {
          const filePath = path.join(uploadsDir, entry.name);
          const stat = await fs.stat(filePath);
          return {
            filename: entry.name,
            url: `/uploads/${entry.name}`,
            size: stat.size,
            updatedAt: stat.mtimeMs,
          };
        })
    );

    // Sort by newest first
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
    if (!safeFilename || safeFilename.startsWith('.')) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', 'uploads', safeFilename);

    try {
      await fs.unlink(filePath);
    } catch (unlinkErr: any) {
      if (unlinkErr.code !== 'ENOENT') {
        throw unlinkErr;
      }
    }

    return NextResponse.json({ success: true, deleted: safeFilename });
  } catch (err: any) {
    console.error('Admin delete media error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to delete media file' },
      { status: 500 }
    );
  }
}
