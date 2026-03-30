require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const db = require('./db');
require('./auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize database
db.initDb();

app.use(express.json());
app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  credentials: true 
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'rohit-portfolio-secret-2025',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(passport.initialize());
app.use(passport.session());

// ── Auth routes ──────────────────────────────────────
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/?auth=failed` 
  }),
  (req, res) => { 
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/?auth=success`); 
  }
);

app.get('/api/auth/me', (req, res) => {
  if (req.isAuthenticated()) return res.json({ user: req.user });
  res.json({ user: null });
});

app.post('/api/auth/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ ok: true });
  });
});

// ── Settings routes ──────────────────────────────────
app.get('/api/settings', async (req, res) => {
  try {
    const result = await db.query('SELECT key, value FROM settings');
    const settings = {};
    result.rows.forEach(r => { settings[r.key] = r.value; });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.put('/api/settings', async (req, res) => {
  const { key, value } = req.body;
  if (!key) return res.status(400).json({ error: 'key required' });
  try {
    await db.query(
      'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value',
      [key, value]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// ── Feedback routes ──────────────────────────────────
app.get('/api/feedback/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const upvotesRes = await db.query('SELECT COUNT(*) as count FROM feedback WHERE product_id = $1 AND type = $2', [productId, 'upvote']);
    const commentsRes = await db.query('SELECT * FROM comments WHERE product_id = $1 ORDER BY created_at DESC LIMIT 50', [productId]);
    
    let userUpvoted = false;
    if (req.isAuthenticated()) {
      const userUpvotedRes = await db.query('SELECT id FROM feedback WHERE product_id = $1 AND user_id = $2 AND type = $3', [productId, req.user.id.toString(), 'upvote']);
      userUpvoted = userUpvotedRes.rowCount > 0;
    }
    
    res.json({ upvotes: parseInt(upvotesRes.rows[0].count), comments: commentsRes.rows, userUpvoted });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/feedback/:productId/upvote', async (req, res) => {
  const { productId } = req.params;
  try {
    const settingsRes = await db.query("SELECT value FROM settings WHERE key = 'auth_required'");
    const authRequired = settingsRes.rows[0]?.value === 'true';

    if (authRequired && !req.isAuthenticated()) {
      return res.status(401).json({ error: 'Login required' });
    }
    
    const userId = req.isAuthenticated() ? req.user.id.toString() : `anon_${req.ip}`;
    const existingRes = await db.query('SELECT id FROM feedback WHERE product_id = $1 AND user_id = $2 AND type = $3', [productId, userId, 'upvote']);
    
    if (existingRes.rowCount > 0) {
      await db.query('DELETE FROM feedback WHERE id = $1', [existingRes.rows[0].id]);
      return res.json({ upvoted: false });
    } else {
      await db.query('INSERT INTO feedback (product_id, user_id, type) VALUES ($1, $2, $3)', [productId, userId, 'upvote']);
      return res.json({ upvoted: true });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/feedback/:productId/comment', async (req, res) => {
  const { productId } = req.params;
  const { body } = req.body;
  if (!body?.trim()) return res.status(400).json({ error: 'Comment is empty' });

  try {
    const settingsRes = await db.query("SELECT value FROM settings WHERE key = 'auth_required'");
    const authRequired = settingsRes.rows[0]?.value === 'true';

    if (authRequired && !req.isAuthenticated()) {
      return res.status(401).json({ error: 'Login required' });
    }
    
    const userName = req.isAuthenticated() ? req.user.name : 'Anonymous';
    const userAvatar = req.isAuthenticated() ? req.user.avatar : null;
    const userId = req.isAuthenticated() ? req.user.id.toString() : `anon_${req.ip}`;
    
    const result = await db.query(
      'INSERT INTO comments (product_id, user_id, user_name, user_avatar, body) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [productId, userId, userName, userAvatar, body.trim()]
    );
    res.json({ comment: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/api/feedback/:productId/comment/:commentId', async (req, res) => {
  const { commentId } = req.params;
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Login required' });

  try {
    const commentRes = await db.query('SELECT * FROM comments WHERE id = $1', [commentId]);
    const comment = commentRes.rows[0];
    if (!comment) return res.status(404).json({ error: 'Not found' });
    if (comment.user_id !== req.user.id.toString()) return res.status(403).json({ error: 'Forbidden' });
    
    await db.query('DELETE FROM comments WHERE id = $1', [commentId]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => console.log(`✅ Portfolio backend running on http://localhost:${PORT}`));
