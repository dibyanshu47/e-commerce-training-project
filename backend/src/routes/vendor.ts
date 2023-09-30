import express from 'express';
import auth from '../middlewares/auth';

import { getProfile, updateProfile, addProduct, viewProducts, updateProduct, deleteProduct } from '../controllers/vendor';

const router = express.Router();

// Protected routes requiring authentication (for vendors)
router.use(auth);

// Vendor Profile
router.get('/profile', getProfile);

// Update Vendor Profile
router.put('/profile', updateProfile);

// Add Product
router.post('/products', addProduct);

// View Vendor's Products
router.get('/products', viewProducts);

// Update Product
router.put('/products/:productId', updateProduct);

// Delete Product
router.delete('/products/:productId', deleteProduct);

export default router;
