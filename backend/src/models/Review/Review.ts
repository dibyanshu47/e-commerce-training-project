import mongoose from 'mongoose';

// Create the Review schema
const reviewSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference to Product model
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to User model
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
        },
        datePosted: {
            type: Date,
            default: Date.now,
        },
    }
);

// Create and export the Review model
const Review = mongoose.model('Review', reviewSchema);
export default Review;
