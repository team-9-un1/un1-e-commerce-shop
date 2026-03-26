const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, category, sortBy, sortOrder } = req.query;

    let whereClause = {};

    if (category) {
      whereClause.category = category;
    }

    if (search) {
      whereClause.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    let orderByClause = {};
    if (sortBy) {
      orderByClause[sortBy] = sortOrder === 'desc' ? 'desc' : 'asc';
    } else {
      orderByClause.createdAt = 'desc'; // default sort
    }

    const [products, totalItems] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        skip: skip,
        take: limit,
        orderBy: orderByClause,
      }),
      prisma.product.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return res.status(200).json({
      data: products,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, priceCents, sku, category, inventory } = req.body;

    // Validate required fields
    if (!name || priceCents === undefined) {
      return res.status(400).json({ message: 'name and priceCents are required fields' });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        priceCents,
        sku,
        category,
        inventory: inventory !== undefined ? inventory : 100,
      },
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, priceCents, sku, category, inventory } = req.body;

    // Check if product exists first
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        priceCents,
        sku,
        category,
        inventory,
      },
    });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await prisma.product.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
