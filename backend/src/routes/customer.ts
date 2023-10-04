import express from 'express';
import auth from '../middlewares/auth';

import { getProfile, updateProfile, viewProducts, viewProduct, addToCart, viewCart, updateCart, removeFromCart, emptyCart, viewWishlist, addToWishlist, removeFromWishlist, createOrder, getOrders } from '../controllers/customer';

const router = express.Router();

// Protected routes requiring authentication
router.use(auth);

// Customer Profile
router.get('/profile', getProfile);

// Update Customer Profile
router.put('/profile', updateProfile);

// View Products
router.get('/products', viewProducts);

// View Product
router.get('/products/:productId', viewProduct);

// Add to Cart
router.post('/cart', addToCart);

// View Cart
router.get('/cart', viewCart);

// Update Cart
router.put('/cart', updateCart);

// Delete from Cart
router.delete('/cart/:productId', removeFromCart);

// Empty Cart
router.delete('/cart', emptyCart);

// Create Order
router.post('/order', createOrder);

// Get Orders
router.get('/order', getOrders);

// Wishlist
router.get('/wishlist', viewWishlist);

// Add to Wishlist
router.post('/wishlist', addToWishlist);

// Remove from Wishlist
router.delete('/wishlist/:productId', removeFromWishlist);

export default router;