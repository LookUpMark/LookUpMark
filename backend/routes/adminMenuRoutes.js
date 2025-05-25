import express from 'express';
import db from '../database.js'; 
import { ensureAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(ensureAdmin);

// GET /api/admin/menu/ - Fetch all menu items (admin, including unavailable)
router.get('/', async (req, res) => {
  try {
    const items = await db.all("SELECT id, name, description, price, image_url, category, is_available FROM MenuItems ORDER BY name ASC");
    res.status(200).json(items);
  } catch (error) {
    console.error("Admin: Error fetching all menu items:", error.message);
    res.status(500).json({ message: "Server error while fetching all menu items." });
  }
});

// POST /api/admin/menu/ - Add a new menu item (admin)
router.post('/', async (req, res) => {
  const { name, description, price, image_url, category, is_available = 1 } = req.body;

  if (!name || price === undefined || price === null || price === '') { // More robust price check
    return res.status(400).json({ message: "Name and price are required." });
  }
  if (isNaN(parseFloat(price)) || parseFloat(price) < 0) {
    return res.status(400).json({ message: "Price must be a non-negative number." });
  }


  try {
    const result = await db.run(
      "INSERT INTO MenuItems (name, description, price, image_url, category, is_available) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, parseFloat(price), image_url, category, is_available ? 1 : 0] // Ensure is_available is 0 or 1
    );
    // Fetch the newly created item to return it
    const newItem = await db.get("SELECT * FROM MenuItems WHERE id = ?", [result.id]);
    res.status(201).json(newItem); // Return the full new item
  } catch (error) {
    console.error("Admin: Error adding new menu item:", error.message);
    if (error.message.includes("UNIQUE constraint failed")) { // More specific error
        return res.status(409).json({ message: "Menu item with this name already exists." });
    }
    res.status(500).json({ message: "Server error while adding menu item." });
  }
});

// PUT /api/admin/menu/:id - Update an existing menu item (admin)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url, category, is_available } = req.body;

  if (name === undefined && description === undefined && price === undefined && image_url === undefined && category === undefined && is_available === undefined) {
    return res.status(400).json({ message: "No update data provided." });
  }
  if (price !== undefined && (isNaN(parseFloat(price)) || parseFloat(price) < 0)) {
    return res.status(400).json({ message: "Price must be a non-negative number." });
  }
  
  const fields = [];
  const params = [];
  if (name !== undefined) { fields.push("name = ?"); params.push(name); }
  if (description !== undefined) { fields.push("description = ?"); params.push(description); }
  if (price !== undefined) { fields.push("price = ?"); params.push(parseFloat(price)); }
  if (image_url !== undefined) { fields.push("image_url = ?"); params.push(image_url); }
  if (category !== undefined) { fields.push("category = ?"); params.push(category); }
  if (is_available !== undefined) { fields.push("is_available = ?"); params.push(is_available ? 1 : 0); } // Ensure 0 or 1

  if (fields.length === 0) {
      return res.status(400).json({ message: "No valid fields to update provided." });
  }

  params.push(id); 

  const sql = `UPDATE MenuItems SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`; // Added updated_at

  try {
    const result = await db.run(sql, params);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Menu item not found or no changes made." });
    }
    const updatedItem = await db.get("SELECT * FROM MenuItems WHERE id = ?", [id]);
    res.status(200).json(updatedItem); // Return the full updated item
  } catch (error) {
    console.error(`Admin: Error updating menu item with ID ${id}:`, error.message);
     if (error.message.includes("UNIQUE constraint failed")) {
        return res.status(409).json({ message: "Another menu item with this name already exists." });
    }
    res.status(500).json({ message: "Server error while updating menu item." });
  }
});

// DELETE /api/admin/menu/:id - Delete a menu item (admin)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the menu item is part of any non-completed order.
    // This is a simplified check. A more robust check might involve order statuses.
    const orderItem = await db.get("SELECT o.id FROM OrderItems oi JOIN Orders o ON oi.order_id = o.id WHERE oi.menu_item_id = ? AND o.status NOT IN ('delivered', 'cancelled')", [id]);
    if (orderItem) {
      return res.status(400).json({ message: "Cannot delete menu item. It is part of an active or pending order. Consider marking it as unavailable instead." });
    }

    const result = await db.run("DELETE FROM MenuItems WHERE id = ?", [id]);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Menu item not found." });
    }
    res.status(200).json({ message: "Menu item deleted successfully", id: id });
  } catch (error) {
    console.error(`Admin: Error deleting menu item with ID ${id}:`, error.message);
    res.status(500).json({ message: "Server error while deleting menu item." });
  }
});

export default router;
