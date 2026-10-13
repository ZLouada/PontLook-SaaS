import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const MIME_MAP: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
};

function detectMimeType(buffer: Buffer, filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (MIME_MAP[ext]) {
    return MIME_MAP[ext];
  }

  // Magic byte inspection for files without extension or with custom names
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return 'image/png';
  }
  if (
    buffer.length >= 4 &&
    buffer[0] === 0x47 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x38
  ) {
    return 'image/gif';
  }
  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return 'image/webp';
  }
  if (buffer.length >= 12 && buffer.subarray(4, 12).toString('ascii').startsWith('ftypavi')) {
    return 'image/avif';
  }
  if (buffer.length >= 4 && buffer.subarray(0, 4).toString('ascii') === '%PDF') {
    return 'application/pdf';
  }
  if (
    buffer.length >= 3 &&
    (buffer.subarray(0, 3).toString('ascii') === 'ID3' ||
      (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0))
  ) {
    return 'audio/mpeg';
  }
  if (buffer.length >= 12 && buffer.subarray(4, 8).toString('ascii') === 'ftyp') {
    return 'video/mp4';
  }

  // Check SVG XML header
  const headStr = buffer.subarray(0, Math.min(buffer.length, 512)).toString('utf8').trim().toLowerCase();
  if (headStr.includes('<svg') || (headStr.includes('<?xml') && headStr.includes('<svg'))) {
    return 'image/svg+xml';
  }

  return 'image/jpeg'; // Default safe image fallback for web rendering
}

async function handleFileRequest(
  req: NextRequest,
  params: Promise<{ file: string[] }>
) {
  try {
    const resolvedParams = await params;
    const fileSegments = resolvedParams?.file;

    if (!fileSegments || !Array.isArray(fileSegments) || fileSegments.length === 0) {
      return new NextResponse('File not specified', { status: 400 });
    }

    // Sanitize path to prevent directory traversal
    const relativePath = path.join(...fileSegments);
    const safeBaseName = path.basename(relativePath);

    if (!safeBaseName || safeBaseName.includes('..') || safeBaseName.startsWith('/')) {
      return new NextResponse('Invalid file path', { status: 400 });
    }

    // Also handle URL-decoded versions
    let decodedRelativePath = relativePath;
    let decodedBaseName = safeBaseName;
    try {
      decodedRelativePath = decodeURIComponent(relativePath);
      decodedBaseName = path.basename(decodedRelativePath);
    } catch {
      // fallback to raw names
    }

    const searchDirs = [
      path.join(process.cwd(), 'public', 'payload-media'),
      path.join(process.cwd(), 'public', 'media'),
      path.join(process.cwd(), 'public', 'uploads'),
      path.join(process.cwd(), '.next', 'standalone', 'public', 'payload-media'),
      path.join(process.cwd(), '.next', 'standalone', 'public', 'media'),
      path.join(process.cwd(), '.next', 'standalone', 'public', 'uploads'),
      path.join(process.cwd(), 'public'),
      path.join('/tmp', 'pontlook-uploads'),
    ];

    const searchNames = new Set<string>([
      relativePath,
      decodedRelativePath,
      safeBaseName,
      decodedBaseName,
    ]);

    // Add extensions if file has none
    const commonExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
    for (const name of Array.from(searchNames)) {
      const ext = path.extname(name);
      if (!ext) {
        for (const cExt of commonExtensions) {
          searchNames.add(`${name}${cExt}`);
        }
      } else {
        // Also try stripping extension
        searchNames.add(path.parse(name).name);
      }
    }

    let fileBuffer: Buffer | null = null;
    let foundPath: string | null = null;

    for (const dir of searchDirs) {
      for (const name of searchNames) {
        const fullPath = path.join(dir, name);
        try {
          fileBuffer = await fs.readFile(fullPath);
          foundPath = fullPath;
          break;
        } catch {
          // continue search
        }
      }
      if (fileBuffer && foundPath) break;
    }

    // If file is not found on disk, gracefully serve fallback placeholder image
    if (!fileBuffer || !foundPath) {
      const fallbackPaths = [
        path.join(process.cwd(), 'public', 'payload-media', 'executive_training_room.jpg'),
        path.join(process.cwd(), 'public', 'executive_training_room.jpg'),
        path.join(process.cwd(), 'public', 'media', 'executive_training_room.jpg'),
      ];

      for (const fb of fallbackPaths) {
        try {
          const fallbackBuffer = await fs.readFile(fb);
          return new NextResponse(new Uint8Array(fallbackBuffer), {
            status: 200,
            headers: {
              'Content-Type': 'image/jpeg',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Content-Length': fallbackBuffer.length.toString(),
            },
          });
        } catch {
          // continue
        }
      }

      return new NextResponse('File not found', { status: 404 });
    }

    const contentType = detectMimeType(fileBuffer, foundPath);

    // If HEAD request, return headers without body
    if (req.method === 'HEAD') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Content-Length': fileBuffer.length.toString(),
        },
      });
    }

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (err: any) {
    console.error('Error serving payload-media file:', err);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ file: string[] }> }
) {
  return handleFileRequest(req, params);
}

export async function HEAD(
  req: NextRequest,
  { params }: { params: Promise<{ file: string[] }> }
) {
  return handleFileRequest(req, params);
}
