# ============================================================
# Stage 1: Build — compile React app với Vite
# ============================================================
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency manifests và cài dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy toàn bộ source code và build production bundle
COPY . .
RUN npm run build

# ============================================================
# Stage 2: Production — Nginx serve static files
# ============================================================
FROM nginx:alpine AS production

# Xóa cấu hình mặc định của Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copy cấu hình Nginx tùy chỉnh (SPA routing + API proxy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output từ stage 1 vào thư mục Nginx serve
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
