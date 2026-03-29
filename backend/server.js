require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const db = require('./db');
require('./auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'rohit-portfolio-secret-2025',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());

// ── Auth routes ──────────────────────────────────────
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/?auth=failed' }),
  (req, res) => { res.redirect('http://localhost:5173/?auth=success'); }
);

app.get('/api/auth/me', (req, res) => {
  if (req.isAuthenticated()) return res.json({ user: req.user });
  res.json({ user: null });
});

app.post('/api/auth/logout', (req, res) => {
  req.logout(() => res.json({ ok: true }));
});

// ── Settings routes ──────────────────────────────────
app.get('/api/settings', (req, res) => {
  const rows = db.prepare('SELECT key, value FROM settings').all();
  const settings = {};
  rows.forEach(r => { settings[r.key] = r.value; });
  res.json(settings);
});

app.put('/api/settings', (req, res) => {
  const { key, value } = req.body;
  if (!key) return res.status(400).json({ error: 'key required' });
  db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, value);
  res.json({ ok: true });
});

// ── Feedback routes ──────────────────────────────────
app.get('/api/feedback/:productId', (req, res) => {
  const { productId } = req.params;
  const upvotes = db.prepare('SELECT COUNT(*) as count FROM feedback WHERE product_id = ? AND type = ?').get(productId, 'upvote');
  const comments = db.prepare('SELECT * FROM comments WHERE product_id = ? ORDER BY created_at DESC LIMIT 50').all(productId);
  const userUpvoted = req.isAuthenticated()
    ? !!db.prepare('SELECT id FROM feedback WHERE product_id = ? AND user_id = ? AND type = ?').get(productId, req.user.id, 'upvote')
    : false;
  res.json({ upvotes: upvotes.count, comments, userUpvoted });
});

app.post('/api/feedback/:productId/upvote', (req, res) => {
  const { productId } = req.params;
  const authRequired = db.prepare("SELECT value FROM settings WHERE key = 'auth_required'").get();
  if (authRequired?.value === 'true' && !req.isAuthenticated()) {
    return res.status(401).json({ error: 'Login required' });
  }
  const userId = req.isAuthenticated() ? req.user.id : `anon_${req.ip}`;
  const existing = db.prepare('SELECT id FROM feedback WHERE product_id = ? AND user_id = ? AND type = ?').get(productId, userId, 'upvote');
  if (existing) {
    db.prepare('DELETE FROM feedback WHERE id = ?').run(existing.id);
    return res.json({ upvoted: false });
  } else {
    db.prepare('INSERT INTO feedback (product_id, user_id, type) VALUES (?, ?, ?)').run(productId, userId, 'upvote');
    return res.json({ upvoted: true });
  }
});

app.post('/api/feedback/:productId/comment', (req, res) => {
  const { productId } = req.params;
  const { body } = req.body;
  if (!body?.trim()) return res.status(400).json({ error: 'Comment is empty' });
  const authRequired = db.prepare("SELECT value FROM settings WHERE key = 'auth_required'").get();
  if (authRequired?.value === 'true' && !req.isAuthenticated()) {
    return res.status(401).json({ error: 'Login required' });
  }
  const userName = req.isAuthenticated() ? req.user.name : 'Anonymous';
  const userAvatar = req.isAuthenticated() ? req.user.avatar : null;
  const userId = req.isAuthenticated() ? req.user.id : `anon_${req.ip}`;
  const result = db.prepare(
    'INSERT INTO comments (product_id, user_id, user_name, user_avatar, body) VALUES (?, ?, ?, ?, ?)'
  ).run(productId, userId, userName, userAvatar, body.trim());
  const comment = db.prepare('SELECT * FROM comments WHERE id = ?').get(result.lastInsertRowid);
  res.json({ comment });
});

app.delete('/api/feedback/:productId/comment/:commentId', (req, res) => {
  const { commentId } = req.params;
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Login required' });
  const comment = db.prepare('SELECT * FROM comments WHERE id = ?').get(commentId);
  if (!comment) return res.status(404).json({ error: 'Not found' });
  if (comment.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  db.prepare('DELETE FROM comments WHERE id = ?').run(commentId);
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`✅ Portfolio backend running on http://localhost:${PORT}`));
