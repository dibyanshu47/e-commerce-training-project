import mongoose from 'mongoose';

// Create the ProductImage schema
const productImageSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'Product', // Reference to Product model
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
    }
);

// Create and export the ProductImage model
const ProductImage = mongoose.model('ProductImage', productImageSchema);
export default ProductImage;
