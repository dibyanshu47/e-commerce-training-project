import { Request, Response } from 'express';

import User from '../models/User/User';
import Product from '../models/Product/Product';
import ProductImage from '../models/Product/ProductImage';

export const getProfile = async (req: Request, res: Response) => {
    try {
        const vendorId = (req as any).user.userId; // Get the vendor's user ID from the decoded token

        // Fetch the vendor's profile from the database
        const vendor = await User.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found.' });
        }

        return res.status(200).json(vendor);
    } catch (error) {
        console.error('Error fetching vendor profile:', error);
        return res.status(500).json({ message: 'Error fetching vendor profile.' });
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const vendorId = (req as any).user.userId; // Get the vendor's user ID from the decoded token
        const { name, email } = req.body;

        // Find the vendor document by ID
        const vendor = await User.findById(vendorId);

        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found.' });
        }

        // Update the vendor's profile based on the fields provided in the request
        if (name) {
            vendor.name = name;
        }
        if (email) {
            vendor.email = email;
        }

        // Save the updated vendor document
        const updatedVendor = await vendor.save();

        return res.status(200).json(updatedVendor);
    } catch (error) {
        console.error('Error updating vendor profile:', error);
        return res.status(500).json({ message: 'Error updating vendor profile.' });
    }
}

export const addProduct = async (req: Request, res: Response) => {
    try {
        const vendorId = (req as any).user.userId; // Get the vendor's user ID from the decoded token
        const { name, description, price, stockQuantity, thumbnail, imageUrls } = req.body;

        // Create a new product document and save to the database
        const newProduct: any = await Product.create({ name, description, price, stockQuantity, thumbnail, vendor: vendorId, });

        // Iterate through the provided image URLs and save them to the database
        for (const imageUrl of imageUrls) {
            const productImage = await ProductImage.create({ product: newProduct._id, imageUrl });
        }

        // Default should be ...newProduct, but the main object is in _doc property and if we use spread operator we get to see other properties as well
        // const result = { ...newProduct._doc, imageUrls: newImageUrls };

        return res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ message: 'Error adding product.' });
    }
}

export const viewProducts = async (req: Request, res: Response) => {
    try {
        const vendorId = (req as any).user.userId; // Get the vendor's user ID from the decoded token

        // Fetch all products associated with the vendor from the database
        const products = await Product.find({ vendor: vendorId });

        return res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching vendor products:', error);
        return res.status(500).json({ message: 'Error fetching vendor products.' });
    }
}