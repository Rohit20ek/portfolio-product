const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./db');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    done(null, user || false);
  } catch (e) { done(e); }
});

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/api/auth/google/callback',
  }, (accessToken, refreshToken, profile, done) => {
    const existing = db.prepare('SELECT * FROM users WHERE google_id = ?').get(profile.id);
    if (existing) return done(null, existing);
    const result = db.prepare(
      'INSERT INTO users (google_id, name, email, avatar) VALUES (?, ?, ?, ?)'
    ).run(profile.id, profile.displayName, profile.emails?.[0]?.value || '', profile.photos?.[0]?.value || '');
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
    done(null, user);
  }));
} else {
  console.warn('⚠️  GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set — Google OAuth disabled.');
  // fallback: no-op strategy
  passport.use('google', { name: 'google', authenticate() { this.fail({ message: 'Google OAuth not configured' }); } });
}
