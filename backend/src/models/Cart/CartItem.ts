import mongoose from 'mongoose';

// Create the CartItem schema
const cartItemSchema = new mongoose.Schema(
    {
        cart: {
            type: mongoose.Types.ObjectId,
            ref: 'Cart', // Reference to Cart model
            required: true,
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'Product', // Reference to Product model
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }
);

// Create and export the CartItem model
const CartItem = mongoose.model('CartItem', cartItemSchema);
export default CartItem;
