const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Lấy tất cả category
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      select: { name: true, id: true, slug: true },
      orderBy: { name: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
