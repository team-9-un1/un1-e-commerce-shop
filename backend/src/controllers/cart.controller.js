const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const TAX_RATE = 0.08;
const MAX_ITEM_QUANTITY = 10;

const normalizeVariantValue = (value) => {
  if (value === undefined || value === null) {
    return null;
  }

  const normalized = String(value).trim();
  return normalized.length > 0 ? normalized : null;
};

const toCurrency = (cents) => Number((cents / 100).toFixed(2));

const calculateCartTotals = (items) => {
  const subtotalCents = items.reduce((sum, item) => {
    return sum + item.quantity * item.product.priceCents;
  }, 0);

  const taxCents = Math.round(subtotalCents * TAX_RATE);
  const totalCents = subtotalCents + taxCents;

  return {
    subtotal: toCurrency(subtotalCents),
    tax: toCurrency(taxCents),
    total: toCurrency(totalCents),
    subtotalCents,
    taxCents,
    totalCents,
  };
};

const mapCart = (cart) => {
  const items = cart.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
    product: item.product,
    lineSubtotal: toCurrency(item.product.priceCents * item.quantity),
    lineSubtotalCents: item.product.priceCents * item.quantity,
  }));

  const totals = calculateCartTotals(cart.items);

  return {
    id: cart.id,
    userId: cart.userId,
    items,
    ...totals,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
  };
};

const getOrCreateCart = async (userId) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  return cart;
};

const getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    return res.status(200).json({ cart: mapCart(cart) });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const addCartItem = async (req, res) => {
  try {
    const { productId, quantity = 1, size, color } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'productId is required' });
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_ITEM_QUANTITY) {
      return res.status(400).json({ message: 'quantity must be an integer between 1 and 10' });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const normalizedSize = normalizeVariantValue(size);
    const normalizedColor = normalizeVariantValue(color);

    const cart = await getOrCreateCart(req.user.id);

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        size: normalizedSize,
        color: normalizedColor,
      },
    });

    const nextQuantity = (existingItem ? existingItem.quantity : 0) + quantity;

    if (nextQuantity > MAX_ITEM_QUANTITY) {
      return res.status(400).json({ message: 'Total quantity per item cannot exceed 10' });
    }

    if (nextQuantity > product.inventory) {
      return res.status(400).json({ message: 'Quantity exceeds available stock' });
    }

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: nextQuantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          size: normalizedSize,
          color: normalizedColor,
        },
      });
    }

    const updatedCart = await getOrCreateCart(req.user.id);
    return res.status(201).json({
      message: 'Item added to cart',
      cart: mapCart(updatedCart),
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_ITEM_QUANTITY) {
      return res.status(400).json({ message: 'quantity must be an integer between 1 and 10' });
    }

    const cart = await getOrCreateCart(req.user.id);

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: {
        product: true,
      },
    });

    if (!cartItem || cartItem.cartId !== cart.id) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (quantity > cartItem.product.inventory) {
      return res.status(400).json({ message: 'Quantity exceeds available stock' });
    }

    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    const updatedCart = await getOrCreateCart(req.user.id);
    return res.status(200).json({
      message: 'Cart item updated',
      cart: mapCart(updatedCart),
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const cart = await getOrCreateCart(req.user.id);

    const cartItem = await prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!cartItem || cartItem.cartId !== cart.id) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await prisma.cartItem.delete({ where: { id: itemId } });

    const updatedCart = await getOrCreateCart(req.user.id);
    return res.status(200).json({
      message: 'Cart item removed',
      cart: mapCart(updatedCart),
    });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    const updatedCart = await getOrCreateCart(req.user.id);
    return res.status(200).json({
      message: 'Cart cleared',
      cart: mapCart(updatedCart),
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
};
