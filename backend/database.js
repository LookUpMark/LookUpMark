import sqlite3 from 'sqlite3';

const DBSOURCE = "backend/database.db";

// Create and export a db object
const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    db.serialize(() => {
      // Create Users table
      db.run(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'customer',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) {
          console.error("Error creating Users table:", err.message);
        } else {
          console.log("Users table ensured.");
        }
      });

      // Create MenuItems table
      db.run(`CREATE TABLE IF NOT EXISTS MenuItems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        image_url TEXT,
        category TEXT,
        is_available INTEGER NOT NULL DEFAULT 1,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) {
          console.error("Error creating MenuItems table:", err.message);
        } else {
          console.log("MenuItems table ensured.");
        }
      });

      // Create Orders table
      db.run(`CREATE TABLE IF NOT EXISTS Orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        total_price REAL NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        delivery_address TEXT,
        phone_number TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id)
      )`, (err) => {
        if (err) {
          console.error("Error creating Orders table:", err.message);
        } else {
          console.log("Orders table ensured.");
        }
      });

      // Create OrderItems table
      db.run(`CREATE TABLE IF NOT EXISTS OrderItems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        menu_item_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price_at_purchase REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES Orders(id),
        FOREIGN KEY (menu_item_id) REFERENCES MenuItems(id)
      )`, (err) => {
        if (err) {
          console.error("Error creating OrderItems table:", err.message);
        } else {
          console.log("OrderItems table ensured.");
        }
      });

      // Create CartItems table
      db.run(`CREATE TABLE IF NOT EXISTS CartItems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        session_id TEXT,
        menu_item_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        added_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users(id),
        FOREIGN KEY (menu_item_id) REFERENCES MenuItems(id),
        CONSTRAINT chk_user_or_session CHECK (user_id IS NOT NULL OR session_id IS NOT NULL)
      )`, (err) => {
        if (err) {
          console.error("Error creating CartItems table:", err.message);
        } else {
          console.log("CartItems table ensured.");
        }
      });
      console.log("Database connected and tables ensured.");
    });
  }
});

// Helper functions
function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) { // Use function keyword to access this.lastID
      if (err) {
        console.error('Error running sql ' + sql);
        console.error(err);
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, result) => {
      if (err) {
        console.error('Error running sql: ' + sql);
        console.error(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error('Error running sql: ' + sql);
        console.error(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export default {
  db, // Export the raw db instance if needed elsewhere, though direct use is discouraged
  run,
  get,
  all
};
