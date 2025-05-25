import express from 'express';
import db from '../database.js'; 

const router = express.Router();

// GET /api/menu/ - Fetch all available menu items (public)
router.get('/', async (req, res) => {
  try {
    const items = await db.all("SELECT id, name, description, price, image_url, category FROM MenuItems WHERE is_available = 1 ORDER BY name ASC");
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching menu items:", error.message);
    res.status(500).json({ message: "Server error while fetching menu items." });
  }
});

// GET /api/menu/:id - Fetch a single menu item by ID (public)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Ensure ID is a number to prevent potential issues if non-numeric IDs are passed, though SQLite might handle it.
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: "Invalid menu item ID format." });
    }

    const item = await db.get("SELECT id, name, description, price, image_url, category FROM MenuItems WHERE id = ? AND is_available = 1", [numericId]);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Menu item not found or not available." });
    }
  } catch (error) {
    console.error(`Error fetching menu item with ID ${id}:`, error.message);
    res.status(500).json({ message: "Server error while fetching menu item." });
  }
});

export default router;
