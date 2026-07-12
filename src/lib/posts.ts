import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  pillar: string;
  date: string;
  readingTime: string;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), 'content', 'insights');

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const words = content.split(/\s+/).length;
      return {
        slug,
        title: data.title ?? slug,
        excerpt: data.excerpt ?? '',
        category: data.category ?? 'GCC Market',
        pillar: data.pillar ?? '',
        date: data.date ?? '',
        readingTime: `${Math.max(1, Math.round(words / 220))} min read`,
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
