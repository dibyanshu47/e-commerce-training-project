import mongoose from 'mongoose';

// Create the ProductCategory schema
const productCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    }
);

// Create and export the ProductCategory model
const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);
export default ProductCategory;
