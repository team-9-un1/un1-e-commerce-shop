const { verifyToken } = require('../utils/jwt.utils');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    
    // Check if the user still exists in the database
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists. Please re-login.' });
    }

    req.user = user; // Attach user payload to req.user
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
