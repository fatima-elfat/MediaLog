import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Extract token from "Bearer <token>"
    const parts = authHeader.split(' ');
    const token = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : null;
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Validate required fields in token
    if (!decoded.userId || !decoded.email) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }
    
    // Add user ID to request object
    req.userId = decoded.userId;
    req.userEmail = decoded.email;    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    } else {
      console.error('Token verification error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};
