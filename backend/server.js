import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { initialize as initializePassport } from './passport-config.js'; // Renamed to avoid conflict

import authRoutes from './routes/authRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import adminMenuRoutes from './routes/adminMenuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminOrderRoutes from './routes/adminOrderRoutes.js';

// Initialize Passport
initializePassport(passport);

// Create an Express application instance
const app = express();

// Define a port
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies - THIS MUST BE BEFORE ROUTE DEFINITIONS
app.use(express.json());

// Express Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_fallback_secret_key_12345', // Fallback secret, ensure it's strong
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: process.env.NODE_ENV === 'production' } // Enable for HTTPS in production
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


// Use the authentication routes
app.use('/api/auth', authRoutes);

// Use the public menu routes
app.use('/api/menu', menuRoutes);

// Use the admin menu routes
app.use('/api/admin/menu', adminMenuRoutes);

// Use the user order routes
app.use('/api/orders', orderRoutes);

// Use the admin order routes
app.use('/api/admin/orders', adminOrderRoutes);

// Simple test GET route (can be kept for general server testing or removed)
app.get('/api/test', (req, res) => {
  res.json({ message: "Backend server is running and test route is accessible!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
