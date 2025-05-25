import express from 'express';
import bcrypt from 'bcryptjs'; 
import passport from 'passport'; 
import db from '../database.js'; 

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required." });
  }
  if (password.length < 8) { // Added password length validation consistent with frontend
    return res.status(400).json({ message: "Password must be at least 8 characters long." });
  }

  try {
    const existingUser = await db.get("SELECT * FROM Users WHERE username = ? OR email = ?", [username, email]);
    if (existingUser) {
      return res.status(409).json({ message: "Username or email already exists." });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const result = await db.run(
      "INSERT INTO Users (username, email, password_hash, role) VALUES (?, ?, ?, ?)", // Added default role
      [username, email, password_hash, 'customer'] // Explicitly set role
    );
    
    const newUser = { id: result.id, username, email, role: 'customer' };
    req.login(newUser, (err) => { // Pass the full user object expected by deserializeUser
      if (err) {
        console.error("Error logging in after signup:", err);
        // Even if auto-login fails, signup was successful.
        // Send 201 with user data, but client might need to login manually.
        return res.status(201).json({
          message: "User created successfully, but auto-login failed. Please log in.",
          user: { username, email, role: 'customer' } // Don't send ID if login failed to attach it to session
        });
      }
      res.status(201).json({
        message: "User created successfully and logged in",
        user: newUser
      });
    });

  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Server error during signup." });
  }
});

// POST /api/auth/login
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({
    message: 'Logged in successfully',
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// POST /api/auth/logout
router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return next(err); 
    }
    req.session.destroy((err) => { 
        if (err) {
            console.error("Session destruction error during logout:", err);
            // Still send success as logout operation itself (clearing req.user) was successful
            return res.status(200).json({ message: "Logged out but session destruction failed." }); 
        }
        res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

// GET /api/auth/status
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      isAuthenticated: true,
      user: { // Ensure all fields deserialized are sent
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role
      }
    });
  } else {
    res.status(200).json({ isAuthenticated: false, user: null });
  }
});

export default router;
