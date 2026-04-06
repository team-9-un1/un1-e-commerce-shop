# 🛍️ Un1 E-commerce Shop

> Ứng dụng thương mại điện tử hiện đại với tính năng AI Size Assistant

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?style=flat-square&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-In_Development-yellow?style=flat-square)
[![Backend CI](https://github.com/team-9-un1/un1-e-commerce-shop/actions/workflows/backend-ci.yml/badge.svg?branch=develop)](https://github.com/team-9-un1/un1-e-commerce-shop/actions/workflows/backend-ci.yml)
[![Frontend CI](https://github.com/team-9-un1/un1-e-commerce-shop/actions/workflows/frontend-ci.yml/badge.svg?branch=develop)](https://github.com/team-9-un1/un1-e-commerce-shop/actions/workflows/frontend-ci.yml)

---

## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt & Chạy dự án](#-cài-đặt--chạy-dự-án)
- [Docker](#-docker)
- [Workflow phát triển](#-workflow-phát-triển)
- [Quy ước code](#-quy-ước-code)
- [CI/CD](#-cicd)
- [Team](#-team)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Giới thiệu

**Un1 E-commerce Shop** là một nền tảng thương mại điện tử full-stack hiện đại, được phát triển trong khuôn khổ đồ án môn **Công cụ và Môi trường Phát triển Phần mềm** — HUTECH University. Dự án áp dụng quy trình phát triển chuyên nghiệp, tích hợp đầy đủ các công cụ: Figma, GitHub, Jira, Docker, và GitHub Actions.

Kiến trúc **monorepo** bao gồm:
- **Frontend**: ReactJS — đã hoàn thành giao diện từ Figma
- **Backend**: Node.js + Express.js + PostgreSQL — đang triển khai
- **DevOps**: Docker + GitHub Actions CI/CD

### Điểm nổi bật
- 🤖 **AI Size Assistant**: Gợi ý size phù hợp dựa trên số đo cơ thể
- 🎨 **Modern UI/UX**: Thiết kế từ Figma, responsive trên mọi thiết bị
- ⚡ **RESTful API**: Backend chuẩn MVC với Prisma ORM
- 🐳 **Docker Ready**: Containerized full-stack deployment
- 🔄 **CI/CD**: GitHub Actions tự động build, lint, test

---

## ✨ Tính năng

### 🛒 Shopping Features
- [x] **Trang chủ**: Hero banner, sản phẩm nổi bật, danh mục
- [x] **Danh sách sản phẩm**: Filter, sort, pagination
- [x] **Chi tiết sản phẩm**: Gallery, size selector, add to cart
- [x] **Giỏ hàng**: Quản lý sản phẩm, tính tổng tiền
- [x] **Thanh toán**: Multi-step checkout, chọn vận chuyển & thanh toán

### 👤 User Features
- [x] **Đăng nhập / Đăng ký**: Form validation, JWT authentication
- [x] **Tài khoản cá nhân**: Thông tin, MySize profile
- [x] **Lịch sử đơn hàng**: Tracking, filter theo trạng thái
- [x] **Chi tiết đơn hàng**: Timeline, cancel order

### 🤖 AI Features
- [x] **AI Size Assistant**: Nhập số đo → Gợi ý size chính xác → Lưu profile
- [ ] **AI Chatbot** _(Coming soon)_

### 🔌 Backend APIs (đang triển khai)
- [ ] **Authentication**: Register, Login, Logout, JWT
- [ ] **Products**: CRUD, pagination, filter, search
- [ ] **Cart**: Add/update/remove items, tính tổng
- [ ] **Orders**: Tạo đơn hàng, lịch sử, cập nhật trạng thái
- [ ] **Swagger Docs**: API documentation tại `/api-docs`

---

## 🛠️ Công nghệ sử dụng

### Frontend
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| **React** | 18.x | UI Library |
| **Vite** | 5.x | Build tool, dev server |
| **React Router** | 6.x | Routing |
| **Axios** | 1.x | HTTP client |
| **Tailwind CSS** | 3.x | Styling |
| **React Hook Form** | 7.x | Form management |
| **Context API** | — | State management |

### Backend
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| **Node.js** | 18.x | Runtime |
| **Express.js** | 4.x | Web framework |
| **PostgreSQL** | 14+ | Database |
| **Prisma** | 5.x | ORM |
| **JWT** | 9.x | Authentication |
| **bcrypt** | 5.x | Password hashing |
| **Swagger UI** | — | API documentation |

### DevOps & Công cụ
| Công cụ | Mục đích |
|---------|----------|
| **GitHub** | Version control, source of truth |
| **GitHub Actions** | CI/CD — auto build, lint, test |
| **Docker** | Containerization |
| **Docker Compose** | Multi-service orchestration |
| **Jira** | Sprint planning, task tracking |
| **Figma** | UI/UX design |
| **Cursor / GitHub Copilot** | AI-assisted development |
| **ESLint + Prettier** | Code quality |

---

## 📁 Cấu trúc dự án

```
un1-e-commerce-shop/               # Monorepo root
├── frontend/                      # ReactJS frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/                # Images, icons, fonts
│   │   ├── components/            # Reusable components
│   │   │   ├── common/            # Header, Footer, Button...
│   │   │   ├── product/           # ProductCard, Gallery...
│   │   │   ├── cart/              # CartItem, CartSummary...
│   │   │   ├── checkout/          # CheckoutForm, ShippingMethod...
│   │   │   ├── auth/              # LoginForm, RegisterForm...
│   │   │   ├── order/             # OrderCard, StatusBadge...
│   │   │   ├── ai/                # SizeForm, BodyVisualization...
│   │   │   └── about/             # TeamCard, BrandStory...
│   │   ├── pages/                 # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── ProductListing.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── ShoppingCart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Auth.jsx
│   │   │   ├── MyAccount.jsx
│   │   │   ├── OrderHistory.jsx
│   │   │   ├── AISizeAssistant.jsx
│   │   │   └── ...
│   │   ├── context/               # AuthContext, CartContext
│   │   ├── hooks/                 # useCart, useAuth...
│   │   ├── services/              # API service modules
│   │   │   ├── api.js             # Axios instance
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   ├── cartService.js
│   │   │   └── orderService.js
│   │   ├── utils/                 # helpers, constants
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── backend/                       # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/           # Route handlers
│   │   ├── models/                # Prisma models
│   │   ├── routes/                # Express routers
│   │   ├── middleware/            # auth.js, error handler
│   │   ├── utils/
│   │   ├── config/
│   │   └── app.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── tests/
│   ├── docs/
│   │   └── database-schema.md
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
│
├── .github/
│   └── workflows/
│       ├── backend-ci.yml
│       └── frontend-ci.yml
│
├── docker-compose.yml             # Full-stack orchestration
├── .gitignore
└── README.md                      # 👈 File này
```

---

## 💻 Yêu cầu hệ thống

### Chạy thông thường (local dev)
- **Node.js**: >= 18.x (LTS)
- **npm**: >= 9.x
- **PostgreSQL**: >= 14 (hoặc dùng Docker)
- **Git**: >= 2.x

### Chạy với Docker (khuyến nghị)
- **Docker**: >= 24.x
- **Docker Compose**: >= 2.x

```bash
node --version    # v18.x.x hoặc cao hơn
npm --version     # 9.x.x hoặc cao hơn
docker --version  # 24.x.x hoặc cao hơn
```

---

## 🚀 Cài đặt & Chạy dự án

### Clone repository

```bash
git clone https://github.com/team-9-un1/un1-e-commerce-shop.git
cd un1-e-commerce-shop
```

---

### Option A: Chạy từng service (Local Development)

#### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
# → http://localhost:5173
```

**File `frontend/.env`:**
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Un1 E-commerce Shop
VITE_ENABLE_AI_ASSISTANT=true
```

#### Backend

```bash
cd backend
npm install
cp .env.example .env
# Chỉnh sửa DATABASE_URL, JWT_SECRET trong .env
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
# → http://localhost:3000
# → http://localhost:3000/api/health
# → http://localhost:3000/api-docs (Swagger)
```

**File `backend/.env`:**
```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/un1_shop
JWT_SECRET=your-super-secret-key-32-chars-minimum
```

---

### Option B: Chạy với Docker Compose (khuyến nghị)

```bash
# Ở thư mục root
docker-compose up -d

# Kiểm tra services
docker-compose ps
docker-compose logs -f backend
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost |
| Backend API | http://localhost:3000/api |
| Swagger Docs | http://localhost:3000/api-docs |
| Health Check | http://localhost:3000/api/health |

```bash
# Dừng tất cả services
docker-compose down

# Dừng và xóa volumes (reset database)
docker-compose down -v
```

---

## 🐳 Docker

Dự án sử dụng **multi-stage Docker builds** để tối ưu image size cho production.

### Backend Dockerfile
- **Build stage**: `node:18-alpine` — `npm ci`, `prisma generate`
- **Production stage**: copy only runtime artifacts, expose port `3000`

### Frontend Dockerfile
- **Build stage**: `node:18-alpine` — `npm run build`
- **Production stage**: `nginx:alpine` — serve static files, proxy `/api` → backend

### docker-compose.yml services
- `postgres` — PostgreSQL 14 Alpine, persistent volume `postgres-data`, network `app-network`
- `backend` — Node.js API, port `3000`, depends on `postgres` (health check)

---

### 🚀 Khởi chạy toàn bộ stack với Docker Compose

#### 1. Chuẩn bị file môi trường

```bash
# Ở thư mục root của dự án
cp .env.example .env
# Chỉnh sửa .env: điền JWT_SECRET và CLOUDINARY_URL
```

**File `.env`:**
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=un1_ecommerce
NODE_ENV=production
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_change_me_please
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
```

#### 2. Build và chạy containers

```bash
# Build images và khởi động tất cả services (detached)
docker-compose up -d --build

# Kiểm tra trạng thái containers
docker-compose ps

# Xem logs realtime
docker-compose logs -f backend
docker-compose logs -f postgres
```

#### 3. Chạy Prisma migrations (lần đầu)

```bash
# Chạy migration trong container backend
docker-compose exec backend npx prisma migrate deploy

# (Tùy chọn) Seed dữ liệu mẫu
docker-compose exec backend node prisma/seed.js
```

#### 4. Kiểm tra health check

```bash
curl http://localhost:3000/api/health
# Expected: {"status":"ok", ...}
```

| Service | URL |
|---------|-----|
| Backend API | http://localhost:3000/api |
| Health Check | http://localhost:3000/api/health |
| Swagger Docs | http://localhost:3000/api-docs |

#### 5. Dừng & dọn dẹp

```bash
# Dừng containers (giữ nguyên volumes)
docker-compose down

# Dừng và xóa volumes (reset database)
docker-compose down -v

# Xóa images đã build
docker-compose down --rmi local
```

> **📝 Lưu ý:** Data PostgreSQL được persist qua container restart nhờ volume `postgres-data`. Chỉ mất khi chạy `docker-compose down -v`.

---

## 🔄 Workflow phát triển

### GitHub Flow

```
main              (production-ready)
  ↑
develop           (integration branch)
  ↑
feature/UN1-X-*   (feature branches)
```

### Quy trình làm việc

```bash
# 1. Luôn bắt đầu từ develop
git checkout develop
git pull origin develop

# 2. Tạo feature branch (đặt tên theo Jira ticket)
git checkout -b feature/UN1-1-backend-setup

# 3. Commit thường xuyên
git add .
git commit -m "feat(backend): initialize Node.js project structure"

# 4. Push và tạo Pull Request
git push -u origin feature/UN1-1-backend-setup
# → Tạo PR trên GitHub: source feature/* → target develop
# → Reviewer: Ngọc Hân

# 5. Sau khi approve → Merge → Delete branch
```

### Branch naming
```
feature/UN1-{id}-{short-description}
fix/UN1-{id}-{short-description}
docs/{short-description}

Ví dụ:
feature/UN1-1-backend-setup
feature/UN1-3-auth-apis
fix/UN1-8-auth-redirect-bug
```

---

## 📝 Quy ước code

### Commit Messages (Conventional Commits)

```
<type>(<scope>): <subject>
```

| Type | Ý nghĩa |
|------|---------|
| `feat` | Tính năng mới |
| `fix` | Sửa bug |
| `docs` | Cập nhật tài liệu |
| `style` | Formatting, không ảnh hưởng logic |
| `refactor` | Tái cấu trúc code |
| `test` | Thêm/sửa tests |
| `chore` | Maintenance |

```bash
# Ví dụ
feat(backend): initialize Node.js project structure
feat(auth): implement JWT authentication APIs
feat(cart): integrate shopping cart with backend
fix(checkout): correct shipping cost calculation
docs(api): add Swagger documentation
```

### Naming Conventions

- **React components**: `PascalCase.jsx`
- **Hooks / utils**: `camelCase.js`
- **CSS Modules**: `PascalCase.module.css`
- **Constants**: `UPPER_SNAKE_CASE`
- **Folders**: `lowercase`

---

## ⚙️ CI/CD

Dự án sử dụng **GitHub Actions** với 2 workflows tự động trigger khi push hoặc mở Pull Request vào `develop`:

### `backend-ci.yml`
- **backend:lint** — ESLint check
- **backend:build** — Docker image build test

### `frontend-ci.yml`
- **frontend:lint** — ESLint check
- **frontend:build** — `npm run build` + artifact upload
- **frontend:docker** — Docker image build test

### Deploy (manual trigger)
- **deploy:staging** — `docker-compose up -d` trên `develop` branch

Pipeline status được hiển thị trên badge ở đầu README và trong tab **Actions** của GitHub repository.

---

## 📊 Jira Project Management

**Project**: Un1 E-commerce Shop (`UN1`)  
**Workspace**: Nhóm 9 — Chiêu Thứ 2 (N9CT2)  
**Methodology**: Scrum — 5 Sprints

| Sprint | Nội dung | Thời gian | Story Points |
|--------|----------|-----------|-------------|
| Sprint 1 | Backend Foundation | 07/03 – 20/03 | 42 |
| Sprint 2 | Core Backend APIs + Frontend API Layer | 21/03 – 03/04 | 34 |
| Sprint 3 | Frontend Integration | 04/04 – 17/04 | 34 |
| Sprint 4 | Docker & CI/CD | 18/04 – 01/05 | 34 |
| Sprint 5 | Documentation & Demo | 02/05 – 15/05 | 34 |
| **Total** | — | **10 tuần** | **178** |

### Epics
1. **Epic 1** — Backend Infrastructure & Core APIs
2. **Epic 2** — Frontend Application & Backend Integration
3. **Epic 3** — Docker, CI/CD & Production Setup
4. **Epic 4** — Documentation & Project Presentation

---

## 👥 Team

**Nhóm 9 — Chiêu Thứ 2 | HUTECH University**

| Thành viên | Role | GitHub |
|------------|------|--------|
| **Nguyễn Trần Ngọc Hân** | Team Leader, DevOps | [@ntnhan19](https://github.com/ntnhan19) |
| **Từ Minh Đức** | Lead Backend | [@TuDuc2k4](https://github.com/TuDuc2k4) |
| **Lâm Thúy Vy** | Backend Developer | [@Tuskrus](https://github.com/Tuskrus) |
| **Phạm Đình Hiệp** | Backend Developer | [@hiep0504](https://github.com/hiep0504) |
| **Lưu Trần Thị Bích Luận** | Lead Frontend | [@llllluan2534](https://github.com/llllluan2534) |
| **Phạm Chí Lộc** | Frontend Developer | [@phamchiloc](https://github.com/phamchiloc) |
| **Lê Đức Thịnh** | Frontend Developer | [@LeDucThinh203](https://github.com/LeDucThinh203) |

### GitHub Organization Teams
- 🔵 [**team-frontend**](https://github.com/orgs/team-9-un1/teams/team-frontend) — Bích Luận, Chí Lộc, Đức Thịnh
- 🟢 [**team-backend**](https://github.com/orgs/team-9-un1/teams/team-backend) — Minh Đức, Thúy Vy, Đình Hiệp
- 🟠 [**team-devops**](https://github.com/orgs/team-9-un1/teams/team-devops) — Ngọc Hân

---

## 🗺️ Roadmap

### ✅ Phase 1: Frontend (Hoàn thành)
- [x] Thiết kế UI/UX trên Figma
- [x] Xuất giao diện từ Figma sang React
- [x] Core pages: Home, Products, Cart, Checkout
- [x] Authentication UI, AI Size Assistant
- [x] Responsive design

### 🚧 Phase 2: Backend Integration (Đang triển khai)
- [ ] Node.js + Express project setup
- [ ] PostgreSQL + Prisma schema & migrations
- [ ] Auth APIs (JWT)
- [ ] Product, Cart, Order APIs
- [ ] Connect frontend ↔ backend
- [ ] Swagger documentation

### 🔄 Phase 3: DevOps (Đang triển khai)
- [x] Docker containerization backend (Dockerfile multi-stage, docker-compose)
- [x] Docker containerization frontend (Nginx, SPA routing, API proxy)
- [ ] GitHub Actions CI/CD pipeline
- [ ] Production environment hardening

### 📄 Phase 4: Documentation & Demo
- [ ] Comprehensive project docs
- [ ] Demo preparation & presentation
- [ ] Final submission 15/05/2026

---

## 🤝 Contributing

1. Kiểm tra Jira board để nhận task
2. Tạo feature branch từ `develop`:
   ```bash
   git checkout -b feature/UN1-X-ten-tinh-nang
   ```
3. Code, commit theo Conventional Commits
4. Push và mở Pull Request vào `develop`
5. Reviewer (Ngọc Hân) approve → Merge

**Lưu ý**: Tuân theo coding style, viết commit message rõ ràng, test kỹ trước khi push.

---

## 📞 Liên hệ

- **GitHub Org**: [team-9-un1](https://github.com/team-9-un1)
- **GitHub Issues**: Báo bug, yêu cầu tính năng
- **Jira**: Sprint planning & task tracking

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

_Last Updated: 06/04/2026_  
_Maintained by: Un1 E-commerce Team — Nhóm 9, HUTECH_  
_Version: 2.1.0_