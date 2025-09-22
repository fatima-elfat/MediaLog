import jwt from 'jsonwebtoken';

/**
 * Generate a JWT token
 * @param {object} payload - Data to encode in the token
 * @param {string} secret - JWT secret key
 * @param {string} expiresIn - Token expiration time (default: '24h')
 * @returns {string} - JWT token
 */
export const generateToken = (payload, secret, expiresIn = '24h') => {
  try {
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
  } catch (error) {
    throw new Error('Error generating token');
  }
};

/**
 * Verify a JWT token
 * @param {string} token - JWT token to verify
 * @param {string} secret - JWT secret key
 * @returns {object} - Decoded token payload
 */
export const verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired');
    } else {
      throw new Error('Token verification failed');
    }
  }
};

/**
 * Decode a JWT token without verification
 * WARNING: This does not verify token authenticity - use only for extracting headers/payload structure
 * @param {string} token - JWT token to decode
 * @returns {object} - Decoded token payload
 */
export const decodeToken = (token) => {
  if (!token) {
    throw new Error('Token is required');
  }
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    throw new Error(`Error decoding token: ${error.message}`);
  }
};
/**
 * Check if a token is expired
 * @param {string} token - JWT token to check
 * @returns {boolean} - True if token is expired
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};
