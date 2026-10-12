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

    // Candidate directories to search across production standalone and development
    const candidatePaths = [
      path.join(process.cwd(), 'public', 'payload-media', relativePath),
      path.join(process.cwd(), 'public', 'payload-media', decodedRelativePath),
      path.join(process.cwd(), 'public', 'payload-media', safeBaseName),
      path.join(process.cwd(), 'public', 'payload-media', decodedBaseName),
      path.join(process.cwd(), '.next', 'standalone', 'public', 'payload-media', relativePath),
      path.join(process.cwd(), '.next', 'standalone', 'public', 'payload-media', safeBaseName),
      path.join(process.cwd(), 'public', 'uploads', relativePath),
      path.join(process.cwd(), 'public', 'uploads', safeBaseName),
      path.join(process.cwd(), 'public', relativePath),
      path.join(process.cwd(), 'public', safeBaseName),
    ];

    let fileBuffer: Buffer | null = null;
    let foundPath: string | null = null;

    for (const p of candidatePaths) {
      try {
        fileBuffer = await fs.readFile(p);
        foundPath = p;
        break;
      } catch {
        // continue searching next candidate path
      }
    }

    if (!fileBuffer || !foundPath) {
      return new NextResponse('File not found', { status: 404 });
    }

    const ext = path.extname(foundPath).toLowerCase();
    const contentType = MIME_MAP[ext] || 'application/octet-stream';

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
