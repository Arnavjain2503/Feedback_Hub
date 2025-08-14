/**
 * Role-based access control middleware.
 * Pass the required role as an argument and the middleware
 * will verify that the authenticated user has that role.
 *
 * @param {string} requiredRole - The role required to access the route.
 */
module.exports = function role(requiredRole) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
    }
    next();
  };
};