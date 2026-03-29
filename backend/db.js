const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'portfolio.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    google_id TEXT UNIQUE,
    name TEXT,
    email TEXT,
    avatar TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    type TEXT DEFAULT 'upvote',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, user_id, type)
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    user_name TEXT DEFAULT 'Anonymous',
    user_avatar TEXT,
    body TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  INSERT OR IGNORE INTO settings (key, value) VALUES ('auth_required', 'false');
  INSERT OR IGNORE INTO settings (key, value) VALUES ('notion_url', '');
`);

module.exports = db;
