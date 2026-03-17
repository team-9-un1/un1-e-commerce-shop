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

