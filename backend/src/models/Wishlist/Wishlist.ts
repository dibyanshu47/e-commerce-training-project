import mongoose from 'mongoose';

// Create the Wishlist schema
const wishlistSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User', // Reference to User model
            required: true,
        },
        items: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'WishlistItem', // Reference to WishlistItem model
            },
        ],
    }
);

// Create and export the Wishlist model
const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;
