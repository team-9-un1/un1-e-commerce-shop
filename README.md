# 🛍️ NNPTUD Project - E-commerce Shop

> Đồ án môn học: **Ngôn ngữ phát triển ứng dụng mới**  
> Ứng dụng thương mại điện tử hiện đại xây dựng trên nền tảng **PERN Stack**

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-336791?style=flat-square&logo=postgresql&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-In_Development-yellow?style=flat-square)

---

## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt](#-cài-đặt)
- [Chạy dự án](#-chạy-dự-án)
- [Scripts có sẵn](#-scripts-có-sẵn)
- [Workflow phát triển](#-workflow-phát-triển)
- [Quy ước code](#-quy-ước-code)
- [Team](#-team)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Giới thiệu

**NNPTUD Project** là đồ án môn học **Ngôn ngữ phát triển ứng dụng mới**, xây dựng một nền tảng thương mại điện tử hiện đại sử dụng **PERN Stack** (PostgreSQL, Express.js, React, Node.js).

Dự án tập trung vào kiến trúc **full-stack** với frontend (ReactJS + Vite) và backend (Node.js + Express.js + PostgreSQL), kết hợp các tính năng AI.

### Điểm nổi bật
- 🤖 **AI Size Assistant**: Gợi ý size phù hợp dựa trên số đo cơ thể
- 🎨 **Modern UI/UX**: Thiết kế responsive trên mọi thiết bị
- ⚡ **Performance**: Tối ưu tốc độ load và trải nghiệm người dùng
- 🔐 **Secure**: JWT authentication & PostgreSQL với Prisma ORM

---

## ✨ Tính năng

### 🛒 Shopping Features
- [x] **Trang chủ**: Hero banner, sản phẩm nổi bật, danh mục
- [x] **Danh sách sản phẩm**: Filter, sort, pagination
- [x] **Chi tiết sản phẩm**: Gallery, size selector, add to cart
- [x] **Giỏ hàng**: Quản lý sản phẩm, mã giảm giá, tính tổng tiền
- [x] **Thanh toán**: Multi-step checkout, chọn vận chuyển & thanh toán

### 👤 User Features
- [x] **Đăng nhập/Đăng ký**: Form validation, JWT authentication
- [x] **Tài khoản cá nhân**: Thông tin, MySize profile
- [x] **Lịch sử đơn hàng**: Tracking, filter theo trạng thái
- [x] **Chi tiết đơn hàng**: Timeline, cancel/reorder

### 🤖 AI Features (Điểm nhấn)
- [x] **AI Size Assistant**:
  - Nhập thông tin cơ bản (chiều cao, cân nặng, tuổi)
  - Nhập số đo chi tiết (vai, ngực, eo)
  - Visualization cơ thể
  - Gợi ý size chính xác
  - Lưu profile để dùng lại

### 📄 Content Pages
- [x] **About Us**: Story thương hiệu, team, giá trị cốt lõi
- [x] **Contact/Support**: Form liên hệ, FAQs, chính sách

---

## 🛠️ Công nghệ sử dụng

### PERN Stack

| Layer | Công nghệ | Phiên bản | Mục đích |
|-------|-----------|-----------|----------|
| **P** | **PostgreSQL** | 16.x | Cơ sở dữ liệu quan hệ |
| **E** | **Express.js** | 4.x | Web framework cho Node.js |
| **R** | **React** | 18.3.x | UI Library |
| **N** | **Node.js** | 20.x LTS | Runtime môi trường backend |

### Frontend
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| **Vite** | 5.x | Build tool, dev server |
| **React Router** | 6.x | Routing, navigation |
| **React Hook Form** | 7.x | Form management |
| **Zustand** / Context API | - | State management |
| **Axios** | 1.x | HTTP client |
| **Tailwind CSS** / CSS Modules | - | Styling |
| **Framer Motion** | - | Animations |
| **React Icons** | - | Icon library |

### Backend
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| **Node.js** | 20.x | Runtime |
| **Express.js** | 4.x | REST API framework |
| **Prisma** | 5.x | ORM cho PostgreSQL |
| **JWT** | - | Authentication |
| **bcrypt** | - | Password hashing |
| **dotenv** | - | Environment variables |

### DevOps & Tools
- **Git/GitHub**: Version control, CI/CD
- **ESLint** + **Prettier**: Code formatting
- **Husky**: Git hooks
- **Docker**: Containerization (tùy chọn)

---

## 📁 Cấu trúc dự án

```
nnptud-project/               # Monorepo root
├── frontend/                 # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/           # Images, icons, fonts
│   │   ├── components/       # Reusable components
│   │   │   ├── common/       # Header, Footer, Button...
│   │   │   ├── product/      # ProductCard, Gallery...
│   │   │   ├── cart/         # CartItem, CartSummary...
│   │   │   ├── checkout/     # CheckoutForm, Payment...
│   │   │   ├── auth/         # LoginForm, RegisterForm...
│   │   │   ├── order/        # OrderCard, OrderFilter...
│   │   │   ├── ai/           # SizeForm, Visualization...
│   │   │   └── about/        # TeamCard, BrandStory...
│   │   ├── pages/            # Page components
│   │   ├── context/          # React Context (Cart, Auth)
│   │   ├── hooks/            # Custom hooks
│   │   ├── utils/            # Utilities, API helpers
│   │   ├── styles/           # Global styles
│   │   ├── App.jsx
│   │   ├── routes.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── vite.config.js
│   └── package.json
│
├── backend/                  # Node.js + Express backend
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── migrations/
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Auth, error handling
│   │   ├── routes/           # Express routes
│   │   ├── services/         # Business logic
│   │   └── utils/            # Helpers, validators
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md                 
```

---

## 💻 Yêu cầu hệ thống

Trước khi bắt đầu, đảm bảo máy của bạn đã cài đặt:

- **Node.js**: >= 20.x (LTS recommended)
- **npm**: >= 10.x
- **PostgreSQL**: >= 16.x
- **Git**: >= 2.x
- **Code Editor**: VS Code (recommended)

### Kiểm tra phiên bản
```bash
node --version      # v20.x.x hoặc cao hơn
npm --version       # 10.x.x hoặc cao hơn
psql --version      # PostgreSQL 16.x
git --version       # 2.x.x hoặc cao hơn
```

---

## 🚀 Cài đặt

### 1. Clone repository
```bash
# Clone qua HTTPS
git clone https://github.com/ntnhan19/NNPTUD-Project.git

# Di chuyển vào thư mục dự án
cd NNPTUD-Project
```

### 2. Cài đặt dependencies Frontend
```bash
cd frontend
npm install
```

### 3. Cài đặt dependencies Backend
```bash
cd backend
npm install
```

### 4. Cấu hình Database
```bash
# Tạo database PostgreSQL
createdb nnptud_db

# Copy file .env.example
cp .env.example .env

# Mở và chỉnh sửa file .env
code .env
```

**File `.env` Backend mẫu:**
```env
# Database
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/nnptud_db"

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development
```

**File `.env` Frontend mẫu:**
```env
# API
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=NNPTUD Project
VITE_ENABLE_AI_ASSISTANT=true
```

### 5. Chạy Prisma Migrations
```bash
cd backend
npx prisma migrate dev
npx prisma db seed   # (nếu có seed data)
```

---

## 🎮 Chạy dự án

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server chạy tại: http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App chạy tại: http://localhost:5173
```

### Production Build
```bash
# Frontend
cd frontend
npm run build
npm run preview

# Backend
cd backend
npm start
```

---

## 📜 Scripts có sẵn

### Frontend (`/frontend`)
| Script | Mô tả |
|--------|-------|
| `npm run dev` | Chạy dev server với HMR |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build |
| `npm run lint` | Kiểm tra code với ESLint |
| `npm run format` | Format code với Prettier |

### Backend (`/backend`)
| Script | Mô tả |
|--------|-------|
| `npm run dev` | Chạy server với nodemon |
| `npm start` | Chạy server production |
| `npm test` | Chạy unit tests |
| `npx prisma studio` | Mở Prisma Studio (DB GUI) |
| `npx prisma migrate dev` | Chạy migrations |

---

## 🔄 Workflow phát triển

### Git Branching Strategy
Chúng tôi sử dụng **GitHub Flow**:

```
main          (production-ready code)
  ↑
develop       (integration branch)
  ↑
feature/*     (feature branches)
```

### Quy trình làm việc

#### 1. Tạo feature branch
```bash
git checkout develop
git pull origin develop
git checkout -b feature/ten-tinh-nang
```

#### 2. Commit & Push
```bash
git add .
git commit -m "feat: implement product gallery component"
git push -u origin feature/ten-tinh-nang
```

#### 3. Tạo Pull Request
1. Vào GitHub → **Pull Requests** → **New Pull Request**
2. Source: `feature/ten-tinh-nang` → Target: `develop`
3. Điền thông tin, assign reviewer, submit PR

#### 4. Code Review & Merge
- Reviewer comment/approve
- Fix issues nếu được yêu cầu
- Sau khi approve → Merge vào `develop`

---

## 📝 Quy ước code

### Commit Messages
Chúng tôi tuân theo **Conventional Commits**:

```
<type>(<scope>): <subject>
```

**Types:**
- `feat`: Tính năng mới
- `fix`: Sửa bug
- `docs`: Cập nhật documentation
- `style`: Styling/formatting
- `refactor`: Tái cấu trúc code
- `test`: Thêm/sửa tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(product): add image zoom feature to gallery
fix(cart): correct total price calculation
docs(readme): update installation instructions
feat(backend): add user authentication API
fix(db): resolve prisma migration conflict
```

### Naming Conventions

**Files & Folders:**
- Components: `PascalCase.jsx` (e.g., `ProductCard.jsx`)
- Utils/Hooks: `camelCase.js` (e.g., `useCart.js`)
- Controllers: `camelCase.controller.js`
- Routes: `camelCase.routes.js`

---

## 👥 Team

### Core Team (3 thành viên)

| Thành viên | Role | Nhiệm vụ chính | GitHub |
|------------|------|----------------|--------|
| **Nguyễn Trần Ngọc Hân** | Team Leader, Full-stack Developer | Backend API, Database, Authentication, Documentation | [@ntnhan19](https://github.com/ntnhan19) |
| **Lưu Trần Thị Bích Luận** | Frontend Developer | Product pages, Cart, Checkout | [@lllluan](https://github.com/lllluan) |
| **Lâm Thúy Vy** | Frontend Developer | About Us, Contact, UI/UX | [@decom321456](https://github.com/decom321456) |

> 📚 **Môn học**: Ngôn ngữ phát triển ứng dụng mới  
> 🏫 **Trường**: Đại học ...

---

## 🗺️ Roadmap

### ✅ Phase 1: MVP Frontend
- [x] Project setup & architecture
- [x] Core pages: Home, Product, Cart, Checkout
- [x] User authentication UI
- [x] AI Size Assistant interface
- [x] Responsive design

### 🚧 Phase 2: Backend (Node.js + Express + PostgreSQL)
- [ ] Setup Express server & middleware
- [ ] PostgreSQL database + Prisma ORM
- [ ] RESTful API endpoints (CRUD)
- [ ] JWT authentication
- [ ] Connect frontend ↔ backend

### 🔮 Phase 3: Advanced Features
- [ ] AI Chatbot integration
- [ ] Real-time notifications
- [ ] Admin dashboard
- [ ] Email notifications

### 🎯 Phase 4: Production
- [ ] Performance optimization
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Production deployment

---

## 🤝 Contributing

### 1. Clone repository
```bash
git clone https://github.com/ntnhan19/NNPTUD-Project.git
```

### 2. Create Branch
```bash
git checkout -b feature/amazing-feature
```

### 3. Commit & Push
```bash
git add .
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature
```

### 4. Tạo Pull Request trên GitHub

---

## 📞 Contact

### Team Communication
- **GitHub Issues**: Bug reports, feature requests
- **GitHub Discussions**: Team discussions

### Repository
🔗 [https://github.com/ntnhan19/NNPTUD-Project](https://github.com/ntnhan19/NNPTUD-Project)

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/ntnhan19/NNPTUD-Project?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/ntnhan19/NNPTUD-Project?style=flat-square)

**Build Status**: ![Passing](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)

---

_Last Updated: 13/03/2026_  
_Maintained by: NNPTUD Team (Hân, Luận, Vy)_  
_Stack: PERN (PostgreSQL, Express, React, Node.js)_