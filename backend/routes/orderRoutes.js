import express from 'express';
import db from '../database.js'; 
import { ensureAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(ensureAuthenticated);

// POST /api/orders/ - Create a new order (user authenticated)
router.post('/', async (req, res) => {
  const userId = req.user.id; 
  const { items, totalPrice, deliveryAddress, phoneNumber } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0 || totalPrice === undefined || totalPrice === null || !deliveryAddress || !deliveryAddress.trim()) {
    return res.status(400).json({ message: "Missing or invalid required order data (items, totalPrice, deliveryAddress)." });
  }
  if (isNaN(parseFloat(totalPrice)) || parseFloat(totalPrice) < 0) {
    return res.status(400).json({ message: "TotalPrice must be a non-negative number." });
  }


  try {
    await db.run("BEGIN TRANSACTION");

    const orderResult = await db.run(
      "INSERT INTO Orders (user_id, total_price, delivery_address, phone_number, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
      [userId, parseFloat(totalPrice), deliveryAddress, phoneNumber, 'pending']
    );
    const orderId = orderResult.id;

    if (!orderId) {
      throw new Error("Failed to create order record.");
    }

    for (const item of items) {
      if (!item.menuItemId || item.quantity === undefined || item.quantity <= 0 || item.priceAtPurchase === undefined || item.priceAtPurchase < 0) {
        throw new Error("Invalid item data in order. Each item must have menuItemId, quantity > 0, and non-negative priceAtPurchase.");
      }
      await db.run(
        "INSERT INTO OrderItems (order_id, menu_item_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)",
        [orderId, item.menuItemId, item.quantity, item.priceAtPurchase]
      );
    }

    await db.run("COMMIT");
    
    const newOrder = await db.get("SELECT * FROM Orders WHERE id = ?", [orderId]);
    const newOrderItems = await db.all("SELECT oi.menu_item_id, mi.name, oi.quantity, oi.price_at_purchase FROM OrderItems oi JOIN MenuItems mi ON oi.menu_item_id = mi.id WHERE oi.order_id = ?", [orderId]);

    res.status(201).json({ ...newOrder, items: newOrderItems }); // Return the full order with items

  } catch (error) {
    await db.run("ROLLBACK"); 
    console.error("Error creating new order:", error.message);
    res.status(500).json({ message: "Server error while creating order.", error: error.message });
  }
});

// GET /api/orders/ - Fetch current user's order history (user authenticated)
router.get('/', async (req, res) => {
  const userId = req.user.id; 
  
  try {
    const orders = await db.all("SELECT id, user_id, total_price, status, delivery_address, phone_number, created_at, updated_at FROM Orders WHERE user_id = ? ORDER BY created_at DESC", [userId]);
    res.status(200).json(orders);
  } catch (error) {
    console.error(`Error fetching order history for user ${userId}:`, error.message);
    res.status(500).json({ message: "Server error while fetching order history." });
  }
});

// GET /api/orders/:orderId - Fetch a specific order by ID (user authenticated, owns order)
router.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id; 

  const numericOrderId = parseInt(orderId, 10);
  if (isNaN(numericOrderId)) {
    return res.status(400).json({ message: "Invalid order ID format." });
  }

  try {
    const order = await db.get(
      "SELECT * FROM Orders WHERE id = ? AND user_id = ?", 
      [numericOrderId, userId]
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found or you do not have access to this order." });
    }

    const items = await db.all(
      "SELECT oi.menu_item_id, mi.name, oi.quantity, oi.price_at_purchase FROM OrderItems oi JOIN MenuItems mi ON oi.menu_item_id = mi.id WHERE oi.order_id = ?", 
      [numericOrderId]
    );

    res.status(200).json({ ...order, items });
  } catch (error) {
    console.error(`Error fetching order ${orderId} for user ${userId}:`, error.message);
    res.status(500).json({ message: "Server error while fetching order details." });
  }
});

export default router;
