import mongoose from 'mongoose';

// Create the WishlistItem schema
const wishlistItemSchema = new mongoose.Schema(
    {
        wishlist: {
            type: mongoose.Types.ObjectId,
            ref: 'Wishlist', // Reference to Wishlist model
            required: true,
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'Product', // Reference to Product model
            required: true,
        },
    }
);

// Create and export the WishlistItem model
const WishlistItem = mongoose.model('WishlistItem', wishlistItemSchema);
export default WishlistItem;
