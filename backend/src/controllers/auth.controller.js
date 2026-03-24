const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { signToken } = require('../utils/jwt.utils');

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password, and name are required' });
    }

    // Check if email exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create User AND default Cart in the same Prisma query (nested create)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        cart: {
          create: {} // Creates a default Cart for the user
        }
      },
    });

    // Generate token
    const token = signToken({ id: user.id, email: user.email, role: user.role });

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate credentials
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare bcrypt password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return JWT token valid for 7d
    const token = signToken({ id: user.id, email: user.email, role: user.role });

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const logout = async (req, res) => {
  // JWT is stateless on the server by default unless using a blocklist.
  // We answer with a success message instructing the client to clear the token.
  return res.status(200).json({
    message: 'Logout successful. Please clear the token on the client side.'
  });
};

const me = async (req, res) => {
  try {
    // This is a PROTECTED route relying on authenticateToken
    // req.user is set by authenticateToken middleware
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Me error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
  logout,
  me
};
