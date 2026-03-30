const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

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
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: await bcrypt.hash('adminpass', 10),
      role: 'ADMIN',
      cart: { create: {} },
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice Customer',
      password: await bcrypt.hash('password123', 10),
      role: 'CUSTOMER',
      cart: { create: {} },
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob Customer',
      password: await bcrypt.hash('password123', 10),
      role: 'CUSTOMER',
      cart: { create: {} },
    },
  });

  // Seed Category
  await prisma.category.createMany({
    data: [
      { id: 1, name: 'NU' },
      { id: 2, name: 'NAM' },
    ],
  });

  // Seed Product
  await prisma.product.createMany({
    data: [
      {
        id: '8d868828-7f42-491b-b352-1',
        name: 'Recycled Soft Gloves',
        description: 'New ABC 13 9378, 13, ...',
        priceCents: 4880,
        sku: 'M8jcFBMY',
        categoryId: 1,
        inventory: 84,
        image: '/assets/images/products/woman/10.png',
      },
      {
        id: 'de09d5ea-debb-42a0-9b44-2',
        name: 'Small Wooden Mouse',
        description: 'New range of formal shi...',
        priceCents: 6680,
        sku: 'GU17c5uY',
        categoryId: 1,
        inventory: 52,
        image: '/assets/images/products/woman/2.png',
      },
      {
        id: '17bcd59c-65ee-46ea-a5b8-3',
        name: 'Rustic Plastic Tuna',
        description: 'New ABC 13 9378, 13, ...',
        priceCents: 17100,
        sku: 'JUTJ7TfP',
        categoryId: 2,
        inventory: 134,
        image: '/assets/images/products/1.png',
      },
      {
        id: '393e755b-bb89-4f85-9979-4',
        name: 'Sleek Wooden Sausages',
        description: 'Ergonomic executive cha...',
        priceCents: 6880,
        sku: 'Ty3kYSgg',
        categoryId: 1,
        inventory: 88,
        image: '/assets/images/products/woman/4.png',
      },
      {
        id: '4ec34a48-9bda-4719-bdf5-5',
        name: 'Handcrafted Rubber Tuna',
        description: 'The Slim & simple Maple...',
        priceCents: 19600,
        sku: 'so39EV1T',
        categoryId: 1,
        inventory: 193,
        image: '/assets/images/products/woman/16.png',
      },
      {
        id: '5fe1d6b1-a6a6-4db7-8d84-6',
        name: 'Modern Rubber Chair',
        description: 'New range of formal shi...',
        priceCents: 5880,
        sku: 'EuQ0mOXi',
        categoryId: 1,
        inventory: 50,
        image: '/assets/images/products/woman/13.png',
      },
      {
        id: '832bcbdd-cac1-4dcb-8dac-7',
        name: 'Practical Bronze Chair',
        description: 'Andy shoes are designed...',
        priceCents: 7990,
        sku: 'gLW40HF',
        categoryId: 1,
        inventory: 149,
        image: '/assets/images/products/woman/7.png',
      },
      {
        id: '8bb7eba9-15bc-4685-bf1c-8',
        name: 'Handmade Soft Soap',
        description: 'The automobile layout c...',
        priceCents: 16900,
        sku: 'FFO0xZv',
        categoryId: 2,
        inventory: 182,
        image: '/assets/images/products/2.png',
      },
      {
        id: 'ef14808f-c2b5-445c-9246-9',
        name: 'Awesome Metal Chicken',
        description: 'The Football Is Good Fo...',
        priceCents: 2000,
        sku: 'G7H1pHtc',
        categoryId: 1,
        inventory: 91,
        image: '/assets/images/products/woman/12.png',
      },
      {
        id: '918d1cfc-e5da-4736-b340-10',
        name: 'Bespoke Metal Towels',
        description: 'The Football Is Good Fo...',
        priceCents: 3380,
        sku: 'ixsDwZFa',
        categoryId: 2,
        inventory: 46,
        image: '/assets/images/products/3.png',
      },
      {
        id: '96e3f43c-ad22-4e2a-b56b-11',
        name: 'Sleek Cotton Pizza',
        description: 'The automobile layout c...',
        priceCents: 5380,
        sku: 'dKS31bb3',
        categoryId: 2,
        inventory: 108,
        image: '/assets/images/products/man/3.png',
      },
      {
        id: '2af226e-7df8-41de-a3b9-12',
        name: 'Unbranded Metal Gloves',
        description: 'New ABC 13 9378, 13, ...',
        priceCents: 18500,
        sku: 'UHDcIrMp',
        categoryId: 2,
        inventory: 166,
        image: '/assets/images/products/man/16.png',
      },
      {
        id: 'a2f49151-4fc9-49e7-973c-13',
        name: 'Handcrafted Concrete Pa...',
        description: 'The beautiful range of ...',
        priceCents: 17900,
        sku: 'eKh73u0G',
        categoryId: 2,
        inventory: 148,
        image: '/assets/images/products/woman/11.png',
      },
      {
        id: 'c1494845-cfc9-4c9d-8866-14',
        name: 'Handcrafted Metal Shoes',
        description: 'The Nagasaki Lander is ...',
        priceCents: 3000,
        sku: '3kesQCDe',
        categoryId: 1,
        inventory: 12,
        image: '/assets/images/products/woman/6.png',
      },
      {
        id: 'c7f26052-980b-4a16-b97e-15',
        name: 'Handmade Rubber Pants',
        description: 'The beautiful range of ...',
        priceCents: 14700,
        sku: 'xxyakr13',
        categoryId: 2,
        inventory: 66,
        image: '/assets/images/products/man/2.png',
      },
      {
        id: 'b1e7dc1-3bb4-4429-a59e-16',
        name: 'Handmade Soft Ball',
        description: 'New ABC 13 9378, 13, ...',
        priceCents: 12700,
        sku: 'jm20skdv',
        categoryId: 2,
        inventory: 69,
        image: '/assets/images/products/man/15.png',
      },
      {
        id: 'ef1b4887-4044-4dc2-9add-17',
        name: 'Small Plastic Hat',
        description: 'Andy shoes are designed...',
        priceCents: 17500,
        sku: 'vngkjye6',
        categoryId: 1,
        inventory: 53,
        image: '/assets/images/products/woman/5.png',
      },
      {
        id: 'f23dc6fd-c491-45f7-86aa-18',
        name: 'Rustic Wooden Fish',
        description: 'Andy shoes are designed...',
        priceCents: 4100,
        sku: 'QvY9H8S5',
        categoryId: 2,
        inventory: 189,
        image: '/assets/images/products/woman/13.png',
      },
      {
        id: 'f53731c3-2034-442e-a7e7-19',
        name: 'Generic Steel Chicken',
        description: 'Andy shoes are designed...',
        priceCents: 13500,
        sku: 't6bappB5',
        categoryId: 1,
        inventory: 127,
        image: '/assets/images/products/woman/8.png',
      },
      {
        id: 'f85bc645-313a-4410-b1a0-20',
        name: 'Gorgeous Granite Fish',
        description: 'Andy shoes are designed...',
        priceCents: 4000,
        sku: 'IMQ4Zm1a',
        categoryId: 2,
        inventory: 40,
        image: '/assets/images/products/man/14.png',
      },
    ],
  });

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

  // Seed Category
  await prisma.category.createMany({
    data: [
      { id: 1, name: 'NU' },
      { id: 2, name: 'NAM' },
    ],
  });

  // Seed Product
  await prisma.product.createMany({
    data: [
      {
        id: '8d868828-7f42-491b-b352-...',
        name: 'Recycled Soft Gloves',
        description: 'New ABC 13 9378, 13, ...',
        priceCents: 4880,
        sku: 'M8jcFBMY',
        categoryId: 1,
        inventory: 84,
        image: '/assets/images/products/woman/10.png',
      },
      {
        id: 'de09d5ea-debb-42a0-9b44-...',
        name: 'Small Wooden Mouse',
        description: 'New range of formal shi...',
        priceCents: 6680,
        sku: 'GU17c5uY',
        categoryId: 1,
        inventory: 52,
        image: '/assets/images/products/woman/2.png',
      },
      {
        id: '17bcd59c-65ee-46ea-a5b8-...',
        name: 'Rustic Plastic Tuna',
        description: 'New ABC 13 9378, 13, ...',
        priceCents: 17100,
        sku: 'JUTJ7TfP',
        categoryId: 2,
        inventory: 134,
        image: '/assets/images/products/1.png',
      },
      // ... (Thêm các sản phẩm còn lại theo đúng dữ liệu từ ảnh)
    ],
  });

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
