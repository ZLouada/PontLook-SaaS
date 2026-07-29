import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'bloggers');

/** GET /api/bloggers — list all bloggers */
export async function GET() {
  try {
    const bloggers = db.prepare('SELECT * FROM bloggers ORDER BY created_at DESC').all();
    return NextResponse.json(bloggers);
  } catch (error) {
    console.error('GET /api/bloggers error:', error);
    return NextResponse.json({ error: 'Failed to fetch bloggers' }, { status: 500 });
  }
}

/** POST /api/bloggers — create a new blogger */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name_title = formData.get('name_title') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;

    if (!name_title?.trim()) {
      return NextResponse.json({ error: 'Name/title is required' }, { status: 400 });
    }

    let image_url = '';

    if (imageFile && imageFile.size > 0) {
      await mkdir(UPLOAD_DIR, { recursive: true });
      const ext = imageFile.name.split('.').pop() || 'png';
      const filename = `${randomUUID()}.${ext}`;
      const filepath = path.join(UPLOAD_DIR, filename);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await writeFile(filepath, buffer);
      image_url = `/uploads/bloggers/${filename}`;
    }

    const stmt = db.prepare(
      'INSERT INTO bloggers (name_title, description, image_url) VALUES (?, ?, ?)',
    );
    const result = stmt.run(name_title.trim(), (description || '').trim(), image_url);

    const blogger = db
      .prepare('SELECT * FROM bloggers WHERE id = ?')
      .get(result.lastInsertRowid);

    return NextResponse.json(blogger, { status: 201 });
  } catch (error) {
    console.error('POST /api/bloggers error:', error);
    return NextResponse.json({ error: 'Failed to create blogger' }, { status: 500 });
  }
}
