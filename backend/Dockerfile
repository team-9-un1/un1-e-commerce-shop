# ============================================================
# Stage 1: Build
# ============================================================
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency manifests and install exact locked deps
COPY package.json package-lock.json ./

RUN npm ci

# Copy Prisma schema and generate the Prisma client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy remaining source
COPY . .

# ============================================================
# Stage 2: Production
# ============================================================
FROM node:18-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy only the dependencies & generated Prisma client from build stage
COPY --from=build /app/node_modules ./node_modules

# Copy Prisma schema (needed at runtime by Prisma)
COPY --from=build /app/prisma ./prisma

# Copy application source
COPY --from=build /app/src ./src
COPY --from=build /app/index.js ./index.js
COPY --from=build /app/package.json ./package.json

EXPOSE 3000

# Graceful-shutdown is handled in index.js via SIGTERM
CMD ["node", "index.js"]
