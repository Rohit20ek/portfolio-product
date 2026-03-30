const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./db');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const res = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, res.rows[0] || false);
  } catch (e) { done(e); }
});

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const res = await db.query('SELECT * FROM users WHERE google_id = $1', [profile.id]);
      const existing = res.rows[0];
      if (existing) return done(null, existing);
      
      const insertRes = await db.query(
        'INSERT INTO users (google_id, name, email, avatar) VALUES ($1, $2, $3, $4) RETURNING *',
        [profile.id, profile.displayName, profile.emails?.[0]?.value || '', profile.photos?.[0]?.value || '']
      );
      done(null, insertRes.rows[0]);
    } catch (e) {
      done(e);
    }
  }));
} else {
  console.warn('⚠️  GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set — Google OAuth disabled.');
  passport.use('google', { 
    name: 'google', 
    authenticate() { this.fail({ message: 'Google OAuth not configured' }); } 
  });
}
