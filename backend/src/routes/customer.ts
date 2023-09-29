import express from 'express';

import auth from '../middlewares/auth';

const router = express.Router();

// Protected routes requiring authentication
router.use(auth);

// Customer Profile
// router.get('/profile', CustomerController.getProfile);

// Update Customer Profile
// router.put('/profile', CustomerController.updateProfile);

// View Products
// router.get('/products', CustomerController.viewProducts);

// Add to Cart
// router.post('/cart', CustomerController.addToCart);

// View Cart
// router.get('/cart', CustomerController.viewCart);

// Update Cart
// router.put('/cart', CustomerController.updateCart);

// Place Order
// router.post('/orders', CustomerController.placeOrder);

// Order History
// router.get('/orders', CustomerController.orderHistory);

// Wishlist
// router.get('/wishlist', CustomerController.viewWishlist);

// Add to Wishlist
// router.post('/wishlist', CustomerController.addToWishlist);

// Remove from Wishlist
// router.delete('/wishlist/:productId', CustomerController.removeFromWishlist);

export default router;