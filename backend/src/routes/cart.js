import express from 'express';
import { addToCart, getCart, removeFromCart, updateQuantity, clearCart } from '../controllers/cartController.js';

const router = express.Router();

// GET /api/cart - Get user's cart
router.get('/', getCart);

// POST /api/cart - Add item to cart
router.post('/', addToCart);

// PUT /api/cart/:cartItemId - Update quantity
router.put('/:cartItemId', updateQuantity);

// DELETE /api/cart/:cartItemId - Remove item from cart
router.delete('/:cartItemId', removeFromCart);

// DELETE /api/cart - Clear entire cart
router.delete('/', clearCart);

export default router;
