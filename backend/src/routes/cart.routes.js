const express = require('express');

const {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require('../controllers/cart.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticateToken);

router.get('/', getCart);
router.post('/items', addCartItem);
router.put('/items/:itemId', updateCartItem);
router.delete('/items/:itemId', removeCartItem);
router.delete('/', clearCart);

module.exports = router;
