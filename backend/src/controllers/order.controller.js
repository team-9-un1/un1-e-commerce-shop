const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SHIPPING_COSTS = {
  STANDARD: 30000,
  EXPRESS: 50000,
  SAME_DAY: 80000
};

/**
 * 1. POST /api/orders (Create Order)
 */
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingMethod, shippingAddress, phone, paymentMethod } = req.body;

    if (!shippingMethod || !SHIPPING_COSTS[shippingMethod]) {
      return res.status(400).json({
        message: 'Invalid or missing shippingMethod. Valid values: STANDARD, EXPRESS, SAME_DAY'
      });
    }

    const shippingCost = SHIPPING_COSTS[shippingMethod];

    // Fetch user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Validate stock / inventory
    for (const item of cart.items) {
      if (item.quantity > item.product.inventory) {
        return res.status(400).json({
          message: `Product ${item.product.name} out of stock. Available: ${item.product.inventory}, Requested: ${item.quantity}`
        });
      }
    }

    // Calculate subtotal
    let subtotal = 0;
    cart.items.forEach(item => {
      subtotal += item.product.priceCents * item.quantity;
    });

    const tax = Math.round(subtotal * 0.08);
    const totalCents = subtotal + tax + shippingCost;

    // Use Prisma $transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create Order
      const order = await tx.order.create({
        data: {
          userId,
          status: 'PENDING',
          totalCents,
          shippingAddress,
          phone,
          paymentMethod,
          items: {
            create: cart.items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              priceCents: item.product.priceCents
            }))
          }
        },
        include: { items: true }
      });

      // Decrease inventory mapping to requirement 'stock'
      for (const item of cart.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            inventory: { decrement: item.quantity }
          }
        });
      }

      // Clear the cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id }
      });

      return order;
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * 2. GET /api/orders (Get Order History)
 */
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;

    const skip = (page - 1) * limit;

    const whereClause = { userId };
    if (status) {
      const VALID_STATUSES = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ message: `Invalid status. Valid values: ${VALID_STATUSES.join(', ')}` });
      }
      whereClause.status = status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      }),
      prisma.order.count({ where: whereClause })
    ]);

    return res.status(200).json({
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * 2b. GET /api/orders/admin (Admin Order List)
 */
const getAdminOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;
    const search = String(req.query.search || '').trim();

    const skip = (page - 1) * limit;
    const whereClause = {};

    if (status) {
      const VALID_STATUSES = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({ message: `Invalid status. Valid values: ${VALID_STATUSES.join(', ')}` });
      }
      whereClause.status = status;
    }

    if (search) {
      whereClause.OR = [
        { id: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { phone: { contains: search, mode: 'insensitive' } },
        { shippingAddress: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
          items: {
            include: {
              product: true,
            },
          },
        },
      }),
      prisma.order.count({ where: whereClause }),
    ]);

    return res.status(200).json({
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching admin orders:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * 3. GET /api/orders/:id (Get Order Details)
 */
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId !== userId && userRole !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden: You cannot access this order' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order details:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * 4. PUT /api/orders/:id/cancel (Cancel Order)
 */
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId !== userId && userRole !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden: You cannot modify this order' });
    }

    if (order.status !== 'PENDING') {
      return res.status(400).json({ message: 'Only PENDING orders can be cancelled' });
    }

    const result = await prisma.$transaction(async (tx) => {
      const cancelledOrder = await tx.order.update({
        where: { id },
        data: { status: 'CANCELLED' }
      });

      // Restore inventory
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { inventory: { increment: item.quantity } }
        });
      }

      return cancelledOrder;
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error cancelling order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * 5. PUT /api/orders/:id/status (Update Status - ADMIN ONLY)
 */
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    let { status } = req.body;
    const VALID_STATUSES = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Valid values: ${VALID_STATUSES.join(', ')}` });
    }

    const order = await prisma.order.findUnique({ where: { id } });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const statusOrder = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
    const currentIdx = statusOrder.indexOf(order.status);
    const newIdx = statusOrder.indexOf(status);

    // Ensure we only follow the normal progression: PENDING -> PROCESSING -> SHIPPED -> DELIVERED
    if (newIdx === -1 || currentIdx === -1 || newIdx !== currentIdx + 1) {
      return res.status(400).json({
        message: `Invalid status transition from ${order.status} to ${status}. Expected transitions: PENDING -> PROCESSING -> SHIPPED -> DELIVERED.`
      });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status }
    });

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getAdminOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus
};
