import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
    // Extract the JWT token from the request headers, cookies, or wherever you store it
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        // If no token is provided, return a 401 Unauthorized response
        return res.status(401).json({ message: 'Authentication failed. No token provided.' });
    }

    try {
        // Verify the token using your secret key
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace with your actual secret key

        // Attach the decoded token to the request for use in protected routes
        (req as any).user = decodedToken;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // If the token is invalid or has expired, return a 401 Unauthorized response
        return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
    }
}

export default auth;