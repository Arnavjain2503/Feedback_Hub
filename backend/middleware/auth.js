const jwt = require('jsonwebtoken');

/**
 * Authentication middleware to verify JWT token.
 * Expects the token to be provided in the `Authorization` header as
 * `Bearer <token>` or in the `x-access-token` header.
 */
module.exports = function auth(req, res, next) {
  const authHeader = req.header('Authorization') || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : req.header('x-access-token');

  if (!token) {
    return res.status(401).json({ message: 'Access denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret');
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Invalid token', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};