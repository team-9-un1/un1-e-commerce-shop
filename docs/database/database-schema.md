# Database schema (UN1-2)

## ER Diagram (Mermaid)

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER ||--|| CART : owns
    CART ||--o{ CARTITEM : contains
    ORDER ||--o{ ORDERITEM : has
    PRODUCT ||--o{ CARTITEM : referenced_in
    PRODUCT ||--o{ ORDERITEM : referenced_in
    USER ||--o{ USERSIZE : has

    USER {
      String id PK
      String email
      String name
      String password
      Role role
    }
    PRODUCT {
      String id PK
      String name
      String description
      Int priceCents
      Int inventory
    }
    CART {
      String id PK
      String userId FK
    }
    CARTITEM {
      String id PK
      String cartId FK
      String productId FK
      Int quantity
    }
    ORDER {
      String id PK
      String userId FK
      Int totalCents
      OrderStatus status
    }
    ORDERITEM {
      String id PK
      String orderId FK
      String productId FK
      Int quantity
      Int priceCents
    }
    USERSIZE {
      String id PK
      String userId FK
      String sizeLabel
      Float chest
      Float waist
      Float hip
      Float height
    }
```

## How to run locally (Docker + Prisma)

- Copy `.env.example` to `backend/.env` and adjust if needed.
- Start PostgreSQL via Docker Compose from `backend` folder:

```bash
cd backend
npm run db:up
```

- Install dependencies (from `backend`):

```bash
npm install
```

- Generate Prisma client:

```bash
npx prisma generate
```

- Run migration (creates DB schema):

```bash
npx prisma migrate dev --name init
```

- Seed the database:

```bash
npm run db:seed
```

- Open Prisma Studio to inspect data:

```bash
npm run prisma:studio
```

## Checklist for PR

- [ ] ER diagram included in docs
- [ ] `docker-compose.yml` for Postgres
- [ ] `prisma/schema.prisma` with required models and relationships
- [ ] `prisma/seed.js` creating 3 users, 20 products, 5 orders
- [ ] scripts in `backend/package.json` to run migrate, seed, studio
