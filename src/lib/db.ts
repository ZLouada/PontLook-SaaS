import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'pontlook.db');

// Singleton to survive Next.js hot reloads in dev
const globalForDb = globalThis as unknown as { __db?: Database.Database };

function getDb(): Database.Database {
  if (!globalForDb.__db) {
    globalForDb.__db = new Database(DB_PATH);
    globalForDb.__db.pragma('journal_mode = WAL');
    globalForDb.__db.pragma('foreign_keys = ON');

    // Auto-create tables on first access
    globalForDb.__db.exec(`
      CREATE TABLE IF NOT EXISTS bloggers (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        name_title  TEXT    NOT NULL,
        description TEXT    NOT NULL DEFAULT '',
        image_url   TEXT    NOT NULL DEFAULT '',
        created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
      );
    `);
  }
  return globalForDb.__db;
}

export const db = getDb();
