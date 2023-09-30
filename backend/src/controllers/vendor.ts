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

        // Update the vendor's profile in the database
        const updatedVendor = await User.findByIdAndUpdate(
            vendorId,
            {
                name,
                email,
            },
            { new: true } // Return the updated document
        );

        if (!updatedVendor) {
            return res.status(404).json({ message: 'Vendor not found.' });
        }

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
            await ProductImage.create({ product: newProduct._id, imageUrl });
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

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const vendorId = (req as any).user.userId; // Get the vendor's user ID from the decoded token
        const productId = req.params.productId;
        const { name, description, price, stockQuantity, thumbnail } = req.body;

        // Check if the product exists and belongs to the vendor
        const product = await Product.findOne({ _id: productId, vendor: vendorId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found or does not belong to the vendor.' });
        }

        // Update the product details in the database
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                description,
                price,
                stockQuantity,
            },
            { new: true } // Return the updated document
        );

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Error updating product.' });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const vendorId = (req as any).user.userId; // Get the vendor's user ID from the decoded token
        const productId = req.params.productId;

        // Check if the product exists and belongs to the vendor
        const product = await Product.findOne({ _id: productId, vendor: vendorId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found or does not belong to the vendor.' });
        }

        // Delete the product images from the database
        await ProductImage.deleteMany({ product: productId });

        // Delete the product from the database
        await Product.findByIdAndDelete(productId);

        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'Error deleting product.' });
    }
}