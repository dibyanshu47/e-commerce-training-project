import mongoose from 'mongoose';

// Create the UserCategory schema
const userCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    }
);

// Create and export the UserCategory model
const UserCategory = mongoose.model('UserCategory', userCategorySchema);
export default UserCategory;
