import express from 'express';

import { register, login } from '../controllers/customer';

const router = express.Router();

// Customer Registration
router.post('/register', register);

// Customer Login
router.post('/login', login);

export default router;