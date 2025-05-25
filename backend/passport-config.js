import { Strategy as LocalStrategy } from 'passport-local';
import db from './database.js';
import bcrypt from 'bcryptjs';

export function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await db.get("SELECT * FROM Users WHERE email = ?", [email]);
      if (!user) {
        return done(null, false, { message: 'No user with that email' });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.get("SELECT id, email, username, role FROM Users WHERE id = ?", [id]);
      done(null, user); // user will be null if not found, which is handled by Passport
    } catch (err) {
      done(err, null);
    }
  });
}
