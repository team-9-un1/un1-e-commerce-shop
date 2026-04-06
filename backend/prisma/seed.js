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
  await prisma.banner.deleteMany();
  await prisma.category.deleteMany();
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
      { id: '1', name: 'NU', slug: 'nu' },
      { id: '2', name: 'NAM', slug: 'nam' },
    ],
  });

  // Seed Banners
  await prisma.banner.createMany({
    data: [
      {
        key: 'HOME_HERO',
        title: 'Welcome to UN1 Store',
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070',
        linkUrl: '/products'
      },
      {
        key: 'CAT_NAM',
        title: "MEN'S COLLECTION",
        imageUrl: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071',
      },
      {
        key: 'CAT_NU',
        title: "WOMEN'S COLLECTION",
        imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070',
      }
    ]
  });

  const productsData = [
    {
      id: '8d868828-7f42-491b-b352-1',
      name: 'Recycled Soft Gloves',
      description: 'Hand-crafted from 100% recycled materials. Soft, warm, and eco-friendly.',
      priceCents: 4880,
      sku: 'M8jcFBMY',
      categoryId: '1',
      inventory: 84,
      image: 'https://images.unsplash.com/photo-1533659021967-1759479b07d1?q=80&w=1974',
    },
    {
      id: 'de09d5ea-debb-42a0-9b44-2',
      name: 'Small Wooden Mouse',
      description: 'Elegant wooden design, wireless and ergonomically sculpted.',
      priceCents: 6680,
      sku: 'GU17c5uY',
      categoryId: '1',
      inventory: 52,
      image: 'https://images.unsplash.com/photo-1527814732934-9ad91a04e330?q=80&w=2042',
    },
    {
      id: '17bcd59c-65ee-46ea-a5b8-3',
      name: 'Rustic Plastic Tuna',
      description: 'A classic accessory for any modern workspace.',
      priceCents: 17100,
      sku: 'JUTJ7TfP',
      categoryId: '2',
      inventory: 134,
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070',
    },
    {
      id: '393e755b-bb89-4f85-9979-4',
      name: 'Sleek Wooden Sausages',
      description: 'Ergonomic executive charm with a rustic twist.',
      priceCents: 6880,
      sku: 'Ty3kYSgg',
      categoryId: '1',
      inventory: 88,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070',
    },
    {
      id: '4ec34a48-9bda-4719-bdf5-5',
      name: 'Handcrafted Rubber Tuna',
      description: 'The Slim & simple Maple design makes it perfect for any home.',
      priceCents: 19600,
      sku: 'so39EV1T',
      categoryId: '1',
      inventory: 193,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070',
    },
    {
      id: '5fe1d6b1-a6a6-4db7-8d84-6',
      name: 'Modern Rubber Chair',
      description: 'New range of formal shirts from top-tier fabrics.',
      priceCents: 5880,
      sku: 'EuQ0mOXi',
      categoryId: '1',
      inventory: 50,
      image: 'https://images.unsplash.com/photo-1511499767390-a73359585524?q=80&w=2080',
    },
    {
      id: '832bcbdd-cac1-4dcb-8dac-7',
      name: 'Practical Bronze Chair',
      description: 'Andy shoes are designed for all-day comfort and stability.',
      priceCents: 7990,
      sku: 'gLW40HF',
      categoryId: '1',
      inventory: 149,
      image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1780',
    },
    {
      id: '8bb7eba9-15bc-4685-bf1c-8',
      name: 'Handmade Soft Soap',
      description: 'The automobile layout consists of a front-engine design.',
      priceCents: 16900,
      sku: 'FFO0xZv',
      categoryId: '2',
      inventory: 182,
      image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1887',
    },
    {
      id: 'ef14808f-c2b5-445c-9246-9',
      name: 'Awesome Metal Chicken',
      description: 'The Football Is Good For Health and Sportsmanship.',
      priceCents: 2000,
      sku: 'G7H1pHtc',
      categoryId: '1',
      inventory: 91,
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1898',
    },
    {
      id: '918d1cfc-e5da-4736-b340-10',
      name: 'Bespoke Metal Towels',
      description: 'Premium quality towels made from organic cotton.',
      priceCents: 3380,
      sku: 'ixsDwZFa',
      categoryId: '2',
      inventory: 46,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1780',
    },
    {
      id: '96e3f43c-ad22-4e2a-b56b-11',
      name: 'Sleek Cotton Pizza',
      description: 'Lightweight and breathable cotton fabric for maximum comfort.',
      priceCents: 5380,
      sku: 'dKS31bb3',
      categoryId: '2',
      inventory: 108,
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1897',
    },
    {
      id: '2af226e-7df8-41de-a3b9-12',
      name: 'Unbranded Metal Gloves',
      description: 'Durable and protective gloves for heavy-duty work.',
      priceCents: 18500,
      sku: 'UHDcIrMp',
      categoryId: '2',
      inventory: 166,
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070',
    },
    {
      id: 'a2f49151-4fc9-49e7-973c-13',
      name: 'Handcrafted Concrete Paper',
      description: 'Unique concrete-textured paper for artistic designs.',
      priceCents: 17900,
      sku: 'eKh73u0G',
      categoryId: '2',
      inventory: 148,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1905',
    },
    {
      id: 'c1494845-cfc9-4c9d-8866-14',
      name: 'Handcrafted Metal Shoes',
      description: 'Stylish metal-trimmed shoes for a unique look.',
      priceCents: 3000,
      sku: '3kesQCDe',
      categoryId: '1',
      inventory: 12,
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1771',
    },
    {
      id: 'c7f26052-980b-4a16-b97e-15',
      name: 'Handmade Rubber Pants',
      description: 'Comfortable and flexible rubber-infused pants.',
      priceCents: 14700,
      sku: 'xxyakr13',
      categoryId: '2',
      inventory: 66,
      image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1911',
    },
    {
      id: 'b1e7dc1-3bb4-4429-a59e-16',
      name: 'Handmade Soft Ball',
      description: 'Perfect for children and soft tissue therapy.',
      priceCents: 12700,
      sku: 'jm20skdv',
      categoryId: '2',
      inventory: 69,
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070',
    },
    {
      id: 'ef1b4887-4044-4dc2-9add-17',
      name: 'Small Plastic Hat',
      description: 'Classic fedora style made from durable plastic materials.',
      priceCents: 17500,
      sku: 'vngkjye6',
      categoryId: '1',
      inventory: 53,
      image: 'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?q=80&w=1935',
    },
    {
      id: 'f23dc6fd-c491-45f7-86aa-18',
      name: 'Rustic Wooden Fish',
      description: 'Hand-carved wooden fish for home decoration.',
      priceCents: 4100,
      sku: 'QvY9H8S5',
      categoryId: '2',
      inventory: 189,
      image: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=1935',
    },
    {
      id: 'f53731c3-2034-442e-a7e7-19',
      name: 'Generic Steel Chicken',
      description: 'Modern steel sculpture for industrial-themed interiors.',
      priceCents: 13500,
      sku: 't6bappB5',
      categoryId: '1',
      inventory: 127,
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070',
    },
    {
      id: 'f85bc645-313a-4410-b1a0-20',
      name: 'Gorgeous Granite Fish',
      description: 'Polished granite fish sculpture, perfect for garden pools.',
      priceCents: 4000,
      sku: 'IMQ4Zm1a',
      categoryId: '2',
      inventory: 40,
      image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1780',
    },
  ];

  // Seed Product
  await prisma.product.createMany({
    data: productsData,
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
        shippingAddress: faker.location.streetAddress(true),
        phone: faker.phone.number(),
        paymentMethod: 'COD',
      },
    });

    for (let j = 0; j < itemsCount; j++) {
      const product = productsData[faker.number.int({ min: 0, max: productsData.length - 1 })];
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
