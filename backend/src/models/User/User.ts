import mongoose from 'mongoose';

// Create the User schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        userCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserCategory',
            required: true,
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Create and export the User model
const User = mongoose.model('User', userSchema);
export default User;
