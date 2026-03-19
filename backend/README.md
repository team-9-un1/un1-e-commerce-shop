# UN1 Backend (Node.js + Express)

## Requirements
- Node.js >= 18
- npm >= 9

## Setup
```bash
cd backend
npm install
cp .env.example .env
```

## Run (dev)
```bash
cd backend
npm run dev
```

## Health check
```bash
curl http://localhost:3000/api/health
# {"status":"ok"}
```

## Lint / Format
```bash
cd backend
npm run lint
npm run format
```

## Docker / Postgres

The project uses Docker for the development Postgres instance (image `postgres:14-alpine` with `platform: linux/amd64`).

If you have a local PostgreSQL server running on port `5432`, Docker will conflict with it. To avoid the conflict you can change the port mapping in `backend/docker-compose.yml` to use `5433` on the host:

```yaml
ports:
	- '5433:5432'
```

Then update your `DATABASE_URL` (in `.env`) to point to port `5433`, for example:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/un1_ecommerce
```

Keep the rest of the Docker configuration as-is (`POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB`).

