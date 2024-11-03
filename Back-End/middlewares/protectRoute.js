import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies.jwt;

    // Check if token exists
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - No Token Provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // If the token is invalid, return an error
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
    }

    // Find the user by decoded ID (from token)
    const user = await User.findById(decoded.userId).select('-password');
    
    // If no user is found, return an error
    if (!user) {
      return res.status(403).json({ error: 'Unauthorized - User Not Found' });
    }

    // Attach user ID to the request for further use
    req.userid = decoded.userId;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Authorization Error:', error.message);

    // If token verification fails (e.g., token expired), return an error
    return res.status(401).json({ error: 'Unauthorized - Token Verification Failed' });
  }
};
