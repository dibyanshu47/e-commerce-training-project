import mongoose from 'mongoose';

// Create the Cart schema
const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to User model
            required: true,
        },
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true },
                unitPrice: { type: Number, required: true },
            },
        ],
    }
);

// Create and export the Cart model
const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
