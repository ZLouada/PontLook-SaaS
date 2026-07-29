import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { writeFile, unlink, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'bloggers');

interface RouteContext {
  params: Promise<{ id: string }>;
}

/** GET /api/bloggers/[id] — get single blogger */
export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const blogger = db.prepare('SELECT * FROM bloggers WHERE id = ?').get(id);
    if (!blogger) {
      return NextResponse.json({ error: 'Blogger not found' }, { status: 404 });
    }
    return NextResponse.json(blogger);
  } catch (error) {
    console.error('GET /api/bloggers/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch blogger' }, { status: 500 });
  }
}

/** PUT /api/bloggers/[id] — update a blogger */
export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const existing = db.prepare('SELECT * FROM bloggers WHERE id = ?').get(id) as
      | { id: number; name_title: string; description: string; image_url: string }
      | undefined;

    if (!existing) {
      return NextResponse.json({ error: 'Blogger not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const name_title = formData.get('name_title') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;

    if (!name_title?.trim()) {
      return NextResponse.json({ error: 'Name/title is required' }, { status: 400 });
    }

    let image_url = existing.image_url;

    if (imageFile && imageFile.size > 0) {
      await mkdir(UPLOAD_DIR, { recursive: true });
      const ext = imageFile.name.split('.').pop() || 'png';
      const filename = `${randomUUID()}.${ext}`;
      const filepath = path.join(UPLOAD_DIR, filename);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await writeFile(filepath, buffer);

      // Delete old image
      if (existing.image_url) {
        const oldPath = path.join(process.cwd(), 'public', existing.image_url);
        try {
          await unlink(oldPath);
        } catch {
          // Old file may not exist — ignore
        }
      }

      image_url = `/uploads/bloggers/${filename}`;
    }

    db.prepare(
      'UPDATE bloggers SET name_title = ?, description = ?, image_url = ? WHERE id = ?',
    ).run(name_title.trim(), (description || '').trim(), image_url, id);

    const updated = db.prepare('SELECT * FROM bloggers WHERE id = ?').get(id);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT /api/bloggers/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update blogger' }, { status: 500 });
  }
}

/** DELETE /api/bloggers/[id] — remove a blogger */
export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const existing = db.prepare('SELECT * FROM bloggers WHERE id = ?').get(id) as
      | { id: number; image_url: string }
      | undefined;

    if (!existing) {
      return NextResponse.json({ error: 'Blogger not found' }, { status: 404 });
    }

    // Delete image file
    if (existing.image_url) {
      const imgPath = path.join(process.cwd(), 'public', existing.image_url);
      try {
        await unlink(imgPath);
      } catch {
        // File may not exist — ignore
      }
    }

    db.prepare('DELETE FROM bloggers WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/bloggers/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete blogger' }, { status: 500 });
  }
}
