import express from 'express';
import db from '../database.js'; 
import { ensureAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(ensureAdmin);

// GET /api/admin/orders/ - Fetch all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await db.all(`
      SELECT 
        o.id, o.user_id, u.username, u.email, o.total_price, o.status, 
        o.delivery_address, o.phone_number, o.created_at, o.updated_at
      FROM Orders o
      LEFT JOIN Users u ON o.user_id = u.id  -- LEFT JOIN in case user was deleted but orders remain
      ORDER BY o.created_at DESC
    `);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Admin: Error fetching all orders:", error.message);
    res.status(500).json({ message: "Server error while fetching all orders." });
  }
});

// PUT /api/admin/orders/:orderId - Update an order's status (admin)
router.put('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body; 

  if (!status) {
    return res.status(400).json({ message: "Status is required to update the order." });
  }

  const allowedStatuses = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: `Invalid status value. Must be one of: ${allowedStatuses.join(', ')}` });
  }

  try {
    const result = await db.run(
      "UPDATE Orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [status, orderId]
    );

    if (result.changes === 0) {
      return res.status(404).json({ message: "Order not found or status not changed." });
    }

    const updatedOrder = await db.get("SELECT * FROM Orders WHERE id = ?", [orderId]);
    res.status(200).json(updatedOrder); // Return the full updated order
  } catch (error) {
    console.error(`Admin: Error updating order status for ID ${orderId}:`, error.message);
    res.status(500).json({ message: "Server error while updating order status." });
  }
});

export default router;
