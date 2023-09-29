import mongoose from 'mongoose';

// Create the Cart schema
const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User', // Reference to User model
            required: true,
        },
        items: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'CartItem', // Reference to CartItem model
            },
        ],
    }
);

// Create and export the Cart model
const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
