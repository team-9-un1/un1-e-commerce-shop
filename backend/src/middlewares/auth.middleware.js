const { verifyToken } = require('../utils/jwt.utils');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user payload to req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const requireAdmin = (req, res, next) => {
  // Assuming req.user.role comes from Prisma enum (ADMIN or CUSTOMER)
  // Converting to lowercase to safely match the requirement `req.user.role === 'admin'` or Prisma's `ADMIN`
  if (!req.user || req.user.role.toLowerCase() !== 'admin') {
    return res.status(403).json({ message: 'Forbidden. Admin access required.' });
  }
  next();
};

module.exports = {
  authenticateToken,
  requireAdmin,
};
