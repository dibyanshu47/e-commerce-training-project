import express from 'express';
import auth from '../middlewares/auth';

import { getProfile, updateProfile, viewProducts, addToCart, viewCart, updateCart, removeFromCart, emptyCart, viewWishlist, addToWishlist, removeFromWishlist } from '../controllers/customer';

const router = express.Router();

// Protected routes requiring authentication
router.use(auth);

// Customer Profile
router.get('/profile', getProfile);

// Update Customer Profile
router.put('/profile', updateProfile);

// View Products
router.get('/products', viewProducts);

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

// Wishlist
router.get('/wishlist', viewWishlist);

// Add to Wishlist
router.post('/wishlist', addToWishlist);

// Remove from Wishlist
router.delete('/wishlist/:productId', removeFromWishlist);

export default router;