const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const query = (text, params) => pool.query(text, params);

const initDb = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        google_id TEXT UNIQUE,
        name TEXT,
        email TEXT,
        avatar TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        product_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        type TEXT DEFAULT 'upvote',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(product_id, user_id, type)
      );

      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        product_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        user_name TEXT DEFAULT 'Anonymous',
        user_avatar TEXT,
        body TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
      );

      INSERT INTO settings (key, value) VALUES ('auth_required', 'false') ON CONFLICT (key) DO NOTHING;
      INSERT INTO settings (key, value) VALUES ('notion_url', '') ON CONFLICT (key) DO NOTHING;
    `);
    console.log('✅ PostgreSQL database initialized');
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  }
};

module.exports = {
  query,
  pool,
  initDb
};
