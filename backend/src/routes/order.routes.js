const express = require('express');
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus
} = require('../controllers/order.controller');

const {
  authenticateToken,
  requireAdmin
} = require('../middlewares/auth.middleware');

// ALL order routes require authentication
router.use(authenticateToken);

// Customer Routes
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id/cancel', cancelOrder);

// Admin Routes
router.put('/:id/status', requireAdmin, updateOrderStatus);

module.exports = router;
