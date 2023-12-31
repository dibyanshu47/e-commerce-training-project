import { Request, Response } from 'express';

import User from '../models/User/User';
import Product from '../models/Product/Product';
import Cart from '../models/Cart/Cart';
import Order from '../models/Order/Order';
import ProductImage from '../models/Product/ProductImage';

export const getProfile = async (req: Request, res: Response) => {
    try {
        const customerId = (req as any).user.userId; // Assuming you have user information stored in req.user after authentication
        const customer = await User.findById(customerId);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json(customer);
    } catch (error) {
        console.error('Error fetching customer profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const customerId = (req as any).user.userId;
        const { name, email } = req.body;

        const customer = await User.findByIdAndUpdate(
            customerId,
            { name, email },
            { new: true }
        );

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json(customer);
    } catch (error) {
        console.error('Error updating customer profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const viewProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching available products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const viewProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;

        let product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const imageUrls = await ProductImage.find({ product: productId });
        res.status(200).json({ ...product.toJSON(), imageUrls });
    } catch (error) {

    }
}

export const addToCart = async (req: Request, res: Response) => {
    try {
        const customerId = (req as any).user.userId; // Replace with how you get the user ID from authentication
        const { productId, quantity } = req.body;

        // Find or create the user's cart
        let cart = await Cart.findOne({ user: customerId });
        if (!cart) {
            cart = new Cart({ user: customerId, items: [] });
            await cart.save();
        }

        // Check if the item already exists in the cart
        const existingItem = cart.items.find((item: any) => item.product.equals(productId));

        if (existingItem) {
            // If the item exists, update its quantity
            if (existingItem + quantity <= 6)
                existingItem.quantity += quantity;
            else
                existingItem.quantity = 6;
        } else {
            // If not, add a new item to the cart
            cart.items.push({ product: productId, quantity });
        }

        // Save the updated cart
        await cart.save();

        res.status(201).json({ message: 'Item(s) added to cart successfully', cart });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const viewCart = async (req: Request, res: Response) => {
    try {
        const customerId = (req as any).user.userId;

        // Find the user's cart based on their customerId
        let cart = await Cart.findOne({ user: customerId }).populate({
            path: 'items.product',
            select: 'name price thumbnail',
        });

        if (!cart) {
            cart = new Cart({ user: customerId, items: [] });
            await cart.save();
        }

        // Send the cart contents as the response
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateCart = async (req: Request, res: Response) => {
    try {
        const customerId = (req as any).user.userId; // Replace with how you get the user ID from authentication
        const { productId, quantity } = req.body;

        // Find the user's cart based on their id
        const cart = await Cart.findOne({ user: customerId });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Check if the item exists in the cart
        const existingItem = cart.items.find((item: any) => item.product.equals(productId));

        if (!existingItem) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        // Update the quantity of the existing item
        existingItem.quantity = quantity;

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const removeFromCart = async (req: Request, res: Response) => {
    try {
        const customerId = (req as any).user.userId; // Replace with how you get the user ID from authentication
        const productId = req.params.productId;

        // Find the user's cart based on their id
        const cart = await Cart.findOne({ user: customerId });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Check if the item exists in the cart
        const existingItemIndex = cart.items.findIndex((item: any) => item.product.equals(productId));

        if (existingItemIndex === -1) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        // Remove the item from the cart
        cart.items.splice(existingItemIndex, 1);

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const emptyCart = async (req: Request, res: Response) => {
    try {
        const customerId = (req as any).user.userId; // Replace with how you get the user ID from authentication

        // Find the user's cart based on their id
        const cart = await Cart.findOne({ user: customerId });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Remove all items from the cart
        cart.items = [];

        // Save the updated cart
        await cart.save();

        res.status(200).json({ message: 'Cart emptied successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const createOrder = async (req: Request, res: Response) => {
    try {
        const customerId = (req as any).user.userId;
        const { products } = req.body; // add paymentInfo later

        // Validate input (you can add more validation as needed)
        if (!customerId || !products) { // check for paymentInfo later
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const newOrder = await Order.create({
            user: customerId,
            products,
        });

        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getOrders = async (req: Request, res: Response) => {
    try {
        const customerId = (req as any).user.userId;
        const orders = await Order.find({ user: customerId }).populate({
            path: 'products.product',
            select: 'name price thumbnail'
        }).sort({ orderDate: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const viewWishlist = async (req: Request, res: Response) => {

}

export const addToWishlist = async (req: Request, res: Response) => {

}

export const removeFromWishlist = async (req: Request, res: Response) => {

}