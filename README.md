# 🛍️ Un1 E-commerce Shop

> Ứng dụng thương mại điện tử hiện đại với tính năng AI Size Assistant

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)
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

**Un1 E-commerce Shop** là một nền tảng thương mại điện tử hiện đại, tập trung vào trải nghiệm người dùng và công nghệ AI. Dự án được phát triển với kiến trúc **monorepo**, bao gồm frontend (ReactJS) và backend (sẽ triển khai sau).

### Điểm nổi bật
- 🤖 **AI Size Assistant**: Gợi ý size phù hợp dựa trên số đo cơ thể
- 🎨 **Modern UI/UX**: Thiết kế từ Figma, responsive trên mọi thiết bị
- ⚡ **Performance**: Tối ưu tốc độ load và trải nghiệm người dùng
- 🔐 **Secure**: Xác thực và bảo mật thông tin người dùng

---

## ✨ Tính năng

### 🛒 Shopping Features
- [x] **Trang chủ**: Hero banner, sản phẩm nổi bật, danh mục
- [x] **Danh sách sản phẩm**: Filter, sort, pagination
- [x] **Chi tiết sản phẩm**: Gallery, size selector, add to cart
- [x] **Giỏ hàng**: Quản lý sản phẩm, mã giảm giá, tính tổng tiền
- [x] **Thanh toán**: Multi-step checkout, chọn vận chuyển & thanh toán

### 👤 User Features
- [x] **Đăng nhập/Đăng ký**: Form validation, authentication
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
- [ ] **AI Chatbot** (Coming soon)

### 📄 Content Pages
- [x] **About Us**: Story thương hiệu, team, giá trị cốt lõi
- [x] **Contact/Support**: Form liên hệ, FAQs, chính sách

---

## 🛠️ Công nghệ sử dụng

### Frontend (Hiện tại)
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| **React** | 18.3.x | UI Library |
| **Vite** | 5.x | Build tool, dev server |
| **React Router** | 6.x | Routing, navigation |
| **React Hook Form** | 7.x | Form management |
| **Zustand** / Context API | - | State management |
| **Axios** | 1.x | HTTP client |
| **Tailwind CSS** / CSS Modules | - | Styling |
| **Framer Motion** | - | Animations (optional) |
| **React Icons** | - | Icon library |

### Backend (Dự kiến)
- **Node.js** + **Express.js** / **NestJS**
- **PostgreSQL** / **MongoDB**
- **Prisma** / **TypeORM**
- **JWT** authentication
- **AI/ML**: Python microservice cho Size Assistant

### DevOps & Tools
- **Git/GitLab**: Version control, CI/CD
- **ESLint** + **Prettier**: Code formatting
- **Husky**: Git hooks
- **Docker**: Containerization (future)

---

## 📁 Cấu trúc dự án

```
un1-e-commerce-shop/          # Monorepo root
├── frontend/                  # [HIỆN TẠI] React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/           # Images, icons, fonts
│   │   │   ├── images/
│   │   │   └── icons/
│   │   ├── components/       # Reusable components
│   │   │   ├── common/       # Shared components
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Navigation.jsx
│   │   │   │   └── Button.jsx
│   │   │   ├── product/      # Product-related
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductGallery.jsx
│   │   │   │   ├── ProductInfo.jsx
│   │   │   │   └── SizeSelector.jsx
│   │   │   ├── cart/         # Shopping cart
│   │   │   │   ├── CartItem.jsx
│   │   │   │   ├── CartSummary.jsx
│   │   │   │   └── CouponInput.jsx
│   │   │   ├── checkout/     # Checkout flow
│   │   │   │   ├── CheckoutForm.jsx
│   │   │   │   ├── ShippingMethod.jsx
│   │   │   │   ├── PaymentMethod.jsx
│   │   │   │   └── OrderSummary.jsx
│   │   │   ├── auth/         # Authentication
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── RegisterForm.jsx
│   │   │   │   └── AuthLayout.jsx
│   │   │   ├── order/        # Order management
│   │   │   │   ├── OrderCard.jsx
│   │   │   │   ├── OrderStatusBadge.jsx
│   │   │   │   └── OrderFilter.jsx
│   │   │   ├── ai/           # AI features
│   │   │   │   ├── SizeForm.jsx
│   │   │   │   ├── BodyVisualization.jsx
│   │   │   │   └── SizeRecommendation.jsx
│   │   │   └── about/        # About page
│   │   │       ├── TeamCard.jsx
│   │   │       ├── BrandStory.jsx
│   │   │       └── CoreValues.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── ProductListing.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── ShoppingCart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderConfirmation.jsx
│   │   │   ├── Auth.jsx
│   │   │   ├── MyAccount.jsx
│   │   │   ├── OrderHistory.jsx
│   │   │   ├── OrderDetail.jsx
│   │   │   ├── AISizeAssistant.jsx
│   │   │   ├── AboutUs.jsx
│   │   │   └── Contact.jsx
│   │   ├── context/          # React Context
│   │   │   ├── CartContext.jsx
│   │   │   ├── AuthContext.jsx
│   │   │   └── UserContext.jsx
│   │   ├── hooks/            # Custom hooks
│   │   │   ├── useCart.js
│   │   │   ├── useAuth.js
│   │   │   └── useLocalStorage.js
│   │   ├── utils/            # Utilities
│   │   │   ├── api.js
│   │   │   ├── helpers.js
│   │   │   └── constants.js
│   │   ├── styles/           # Global styles
│   │   │   ├── global.css
│   │   │   └── variables.css
│   │   ├── App.jsx           # Main app component
│   │   ├── routes.jsx        # Route configuration
│   │   └── main.jsx          # Entry point
│   ├── .env.example          # Environment variables template
│   ├── .eslintrc.js          # ESLint config
│   ├── .prettierrc           # Prettier config
│   ├── vite.config.js        # Vite configuration
│   ├── package.json
│   └── README.md
│
├── backend/                   # [TƯƠNG LAI] Node.js backend
│   └── (chưa triển khai)
│
├── .gitignore                # Git ignore rules
├── README.md                 # 👈 File này
└── package.json              # Root package.json (workspace)
```

---

## 💻 Yêu cầu hệ thống

Trước khi bắt đầu, đảm bảo máy của bạn đã cài đặt:

- **Node.js**: >= 18.x (LTS recommended)
- **npm**: >= 9.x hoặc **yarn**: >= 1.22.x
- **Git**: >= 2.x
- **Code Editor**: VS Code (recommended) với extensions:
  - ESLint
  - Prettier
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense (nếu dùng Tailwind)

### Kiểm tra phiên bản
```bash
node --version    # v18.x.x hoặc cao hơn
npm --version     # 9.x.x hoặc cao hơn
git --version     # 2.x.x hoặc cao hơn
```

---

## 🚀 Cài đặt

### 1. Clone repository
```bash
# Clone qua HTTPS
git clone https://gitlab.com/your-username/un1-e-commerce-shop.git

# hoặc qua SSH
git clone git@gitlab.com:your-username/un1-e-commerce-shop.git

# Di chuyển vào thư mục dự án
cd un1-e-commerce-shop
```

### 2. Cài đặt dependencies (Frontend)
```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt packages với npm
npm install

# hoặc với yarn
yarn install
```

### 3. Cấu hình Environment Variables
```bash
# Copy file .env.example
cp .env.example .env

# Mở và chỉnh sửa file .env
nano .env  # hoặc code .env
```

**File `.env` mẫu:**
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000

# App Configuration
VITE_APP_NAME=Un1 E-commerce Shop
VITE_APP_VERSION=1.0.0

# Features
VITE_ENABLE_AI_ASSISTANT=true
VITE_ENABLE_CHATBOT=false

# Analytics (optional)
VITE_GA_TRACKING_ID=

# Other
NODE_ENV=development
```

---

## 🎮 Chạy dự án

### Development Mode
```bash
# Từ thư mục frontend/
npm run dev

# Server sẽ chạy tại: http://localhost:5173/
# Vite HMR (Hot Module Replacement) enabled
```

### Production Build
```bash
# Build cho production
npm run build

# Preview production build
npm run preview

# Build output sẽ ở thư mục: frontend/dist/
```

### Lint & Format
```bash
# Kiểm tra lỗi ESLint
npm run lint

# Fix lỗi ESLint tự động
npm run lint:fix

# Format code với Prettier
npm run format
```

---

## 📜 Scripts có sẵn

| Script | Mô tả |
|--------|-------|
| `npm run dev` | Chạy dev server với HMR |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build |
| `npm run lint` | Kiểm tra code với ESLint |
| `npm run lint:fix` | Fix lỗi ESLint tự động |
| `npm run format` | Format code với Prettier |
| `npm test` | Chạy unit tests (nếu có) |

---

## 🔄 Workflow phát triển

### Git Branching Strategy
Chúng tôi sử dụng **GitLab Flow**:

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
# Luôn bắt đầu từ develop
git checkout develop
git pull origin develop

# Tạo feature branch mới
git checkout -b feature/ten-tinh-nang
# Ví dụ: feature/product-detail-page
```

#### 2. Development
```bash
# Code your feature...

# Commit thường xuyên với message rõ ràng
git add .
git commit -m "feat: implement product gallery component"

# Push lên remote
git push -u origin feature/ten-tinh-nang
```

#### 3. Tạo Merge Request
1. Vào GitLab → **Merge Requests** → **New Merge Request**
2. Source: `feature/ten-tinh-nang` → Target: `develop`
3. Điền thông tin:
   - Title: `[Feature] Tên tính năng`
   - Description: Mô tả changes, screenshots
   - Assignee: Yourself
   - Reviewer: Team Leader (Ngọc Hân)
4. Submit MR và đợi review

#### 4. Code Review & Merge
- Reviewer sẽ comment/approve
- Fix issues nếu được yêu cầu
- Sau khi approve → Merge vào `develop`
- Delete source branch

---

## 📝 Quy ước code

### Commit Messages
Chúng tôi tuân theo **Conventional Commits**:

```
<type>(<scope>): <subject>

<body>
<footer>
```

**Types:**
- `feat`: Tính năng mới
- `fix`: Sửa bug
- `docs`: Cập nhật documentation
- `style`: Styling/formatting (không ảnh hưởng logic)
- `refactor`: Tái cấu trúc code
- `test`: Thêm/sửa tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(product): add image zoom feature to gallery
fix(cart): correct total price calculation
docs(readme): update installation instructions
style(checkout): adjust spacing in form layout
refactor(components): extract reusable Button component
```

### Naming Conventions

**Files & Folders:**
- Components: `PascalCase.jsx` (e.g., `ProductCard.jsx`)
- Utils/Hooks: `camelCase.js` (e.g., `useCart.js`)
- CSS Modules: `PascalCase.module.css`
- Folders: `lowercase` hoặc `kebab-case`

**Code:**
```javascript
// Components: PascalCase
const ProductCard = () => { ... }

// Functions: camelCase
const calculateTotal = () => { ... }

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = '...'

// CSS Classes: kebab-case hoặc camelCase
.product-card { ... }
```

### Code Style
- **Indentation**: 2 spaces (không dùng tabs)
- **Quotes**: Single quotes `'...'` cho strings
- **Semicolons**: Có (ESLint enforced)
- **Max line length**: 100 characters
- **Arrow functions**: Prefer cho short functions

---

## 👥 Team

### Core Team (7 thành viên)

| Thành viên | Role | Nhiệm vụ chính | GitLab |
|------------|------|----------------|--------|
| **Nguyễn Trần Ngọc Hân** | Team Leader, Frontend | Project structure, AI Assistant, Documentation | [@ntnhan19](https://gitlab.com/ntnhan19) |
| **Lưu Trần Thị Bích Luận** | Frontend Developer | Product Detail page | [@lllluan](https://gitlab.com/lllluan) |
| **Lâm Thúy Vy** | Frontend Developer | About Us, Contact pages | [@decom321456](https://gitlab.com/decom321456) |
| **Từ Minh Đức** | Frontend Developer | Auth, User Account | [@TuDuc2k4](https://gitlab.com/TuDuc2k4) |
| **Phạm Chí Lộc** | Frontend Developer | Order Management | [@phamloc629](https://gitlab.com/phamloc629) |
| **Phạm Đình Hiệp** | Frontend Developer | Shopping Cart | [@hiep542004s](https://gitlab.com/hiep542004s) |
| **Lê Đức Thịnh** | Frontend Developer | Checkout, Payment | [@leducthinh203](https://gitlab.com/leducthinh203) |

---

## 🗺️ Roadmap

### ✅ Phase 1: MVP Frontend (Hiện tại - 08/02/2026)
- [x] Project setup & architecture
- [x] Core pages: Home, Product, Cart, Checkout
- [x] User authentication UI
- [x] AI Size Assistant interface
- [x] Responsive design
- [x] Documentation

### 🚧 Phase 2: Backend Integration (Q1 2026)
- [ ] Setup Node.js + Express backend
- [ ] Database design & implementation
- [ ] RESTful API endpoints
- [ ] JWT authentication
- [ ] Connect frontend ↔ backend
- [ ] AI Size Assistant ML model

### 🔮 Phase 3: Advanced Features (Q2 2026)
- [ ] AI Chatbot implementation
- [ ] Real-time notifications
- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Analytics & reporting
- [ ] Email notifications

### 🎯 Phase 4: Production (Q3 2026)
- [ ] Performance optimization
- [ ] SEO implementation
- [ ] Security hardening
- [ ] CI/CD pipeline
- [ ] Monitoring & logging
- [ ] Production deployment

---

## 🤝 Contributing

Chúng tôi hoan nghênh mọi đóng góp! Để contribute:

### 1. Fork & Clone
```bash
# Fork repository trên GitLab
# Clone fork về máy
git clone https://gitlab.com/YOUR_USERNAME/un1-e-commerce-shop.git
```

### 2. Create Branch
```bash
git checkout -b feature/amazing-feature
```

### 3. Make Changes
```bash
# Code your feature
git add .
git commit -m "feat: add amazing feature"
```

### 4. Push & Create MR
```bash
git push origin feature/amazing-feature
# Tạo Merge Request trên GitLab
```

### Contribution Guidelines
- Tuân theo coding style hiện tại
- Viết commit messages rõ ràng
- Thêm comments cho code phức tạp
- Test kỹ trước khi push
- Update documentation nếu cần

---

## 🐛 Bug Reports

Phát hiện bug? Vui lòng tạo issue với thông tin:
- Mô tả bug chi tiết
- Steps to reproduce
- Expected vs Actual behavior
- Screenshots/videos (nếu có)
- Browser/OS information

---

## 📞 Contact & Support

### Team Communication
- **GitLab Issues**: Cho bug reports, feature requests
- **Slack/Discord**: [Link to channel]
- **Email**: team@un1shop.com

### Documentation
- [GitLab Wiki](https://gitlab.com/un1-team/un1-e-commerce-shop/-/wikis/home)
- [API Documentation](https://gitlab.com/un1-team/un1-e-commerce-shop/-/wikis/api) (coming soon)
- [Design System](https://www.figma.com/file/...) (Figma)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Un1 E-commerce Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🙏 Acknowledgments

- Design inspiration: [Figma Community](https://www.figma.com/community)
- Icons: [React Icons](https://react-icons.github.io/react-icons/)
- Fonts: [Google Fonts](https://fonts.google.com/)
- AI/ML resources: [TensorFlow.js](https://www.tensorflow.org/js)

---

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/un1-team/un1-e-commerce-shop?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/un1-team/un1-e-commerce-shop?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/un1-team/un1-e-commerce-shop?style=flat-square)

**Current Sprint**: Sprint 1 - MVP Frontend  
**Target Release**: 08/02/2026  
**Build Status**: ![Passing](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)

---

## 🎉 Let's Build Something Amazing!

Bắt đầu với:
```bash
git clone https://gitlab.com/un1-team/un1-e-commerce-shop.git
cd un1-e-commerce-shop/frontend
npm install
npm run dev
```

**Happy Coding! 🚀**

---

_Last Updated: 03/02/2026_  
_Maintained by: Un1 E-commerce Team_  
_Version: 1.0.0_