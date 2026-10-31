import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js Route Handler: /api/download
 * Forces clean file attachments (save file dialog) even for cross-origin S3/Supabase
 * or formats that browsers default to streaming in-tab (.mp3, .pdf, .wav).
 */
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get('url');
  const requestedFilename = searchParams.get('filename');

  if (!rawUrl) {
    return new NextResponse('Missing required "url" parameter', { status: 400 });
  }

  try {
    // Resolve relative or absolute target URL
    let targetUrl: URL;
    if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
      targetUrl = new URL(rawUrl);
    } else {
      // Local relative path e.g. /payload-media/file.mp3
      targetUrl = new URL(rawUrl, request.url);
    }

    // Sanitize filename for Content-Disposition header
    const fallbackFilename = targetUrl.pathname.split('/').pop() || 'download';
    const filename = (requestedFilename && requestedFilename.trim()) || fallbackFilename;
    const sanitizedFilename = filename.replace(/["\r\n]/g, '').trim();

    // Fetch the upstream file stream
    const upstream = await fetch(targetUrl.toString(), {
      headers: {
        'User-Agent': 'PontLook-Media-Downloader/1.0',
      },
    });

    if (!upstream.ok) {
      return new NextResponse(`Failed to fetch file from source (${upstream.status})`, {
        status: upstream.status,
      });
    }

    const contentType =
      upstream.headers.get('content-type') || 'application/octet-stream';
    const contentLength = upstream.headers.get('content-length');

    const headers = new Headers();
    // Support ASCII fallback and UTF-8 RFC 5987 encoded filename for Arabic/international characters
    const encodedFilename = encodeURIComponent(sanitizedFilename);
    headers.set(
      'Content-Disposition',
      `attachment; filename="${sanitizedFilename}"; filename*=UTF-8''${encodedFilename}`
    );
    headers.set('Content-Type', contentType);
    if (contentLength) {
      headers.set('Content-Length', contentLength);
    }
    headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');

    return new NextResponse(upstream.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('[/api/download] Download proxy error:', error);
    return new NextResponse('Internal error processing file download', { status: 500 });
  }
}
