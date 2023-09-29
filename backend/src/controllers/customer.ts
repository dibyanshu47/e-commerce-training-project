import { Request, Response } from 'express';
import 'dotenv/config';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User/User';

import { CATEGORY_CUSTOMER_ID } from '../constants/constants';

// Controller for customer registration
export const register = async (req: Request, res: Response) => {
    try {
        // Extract user registration data from the request body
        const { name, password, email } = req.body;

        // Validate the email address
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address.' });
        }

        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already in use.' });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        // Create a new user document and save to the database
        const newUser = await User.create({ name, password: hashedPassword, email, userCategory: CATEGORY_CUSTOMER_ID });

        // Generate a JWT token for the registered user
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY);

        // Return the token in the response along with the user data
        return res.status(201).json({ message: 'Registration successful', user: newUser, token });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Registration failed. Please try again later.' });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        // Extract login data from the request body
        const { email, password } = req.body;

        // Check if a user with the provided username exists
        const user = await User.findOne({ email });

        // If no user found, return an error
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. Invalid credentials.' });
        }

        // Verify the password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If the password is invalid, return an error
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed. Invalid credentials.' });
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

        // Return the token in the response
        return res.status(200).json({ message: 'Authentication successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Authentication failed. Please try again later.' });
    }
}