const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data (safe for dev seed)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.userSize.deleteMany();
  await prisma.user.deleteMany();

  // Create users: 1 admin, 2 customers
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: 'adminpass',
      role: 'ADMIN',
      cart: { create: {} },
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice Customer',
      password: 'password123',
      role: 'CUSTOMER',
      cart: { create: {} },
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob Customer',
      password: 'password123',
      role: 'CUSTOMER',
      cart: { create: {} },
    },
  });

  const users = [admin, customer1, customer2];

  // Create 20 products
  const products = [];
  for (let i = 0; i < 20; i++) {
    const prod = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        priceCents: Math.floor(parseFloat(faker.commerce.price(10, 200)) * 100),
        sku: faker.string.alphanumeric(8),
        inventory: faker.number.int({ min: 10, max: 200 }),
      },
    });
    products.push(prod);
  }

  // Create 5 orders for customers (customer1 & customer2)
  for (let i = 0; i < 5; i++) {
    const user = i % 2 === 0 ? customer1 : customer2;
    const itemsCount = faker.number.int({ min: 1, max: 4 });
    let total = 0;

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: 'PENDING',
        totalCents: 0,
      },
    });

    for (let j = 0; j < itemsCount; j++) {
      const product = products[faker.number.int({ min: 0, max: products.length - 1 })];
      const qty = faker.number.int({ min: 1, max: 3 });
      const price = product.priceCents;
      total += price * qty;

      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: product.id,
          quantity: qty,
          priceCents: price,
        },
      });
    }

    await prisma.order.update({ where: { id: order.id }, data: { totalCents: total } });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
