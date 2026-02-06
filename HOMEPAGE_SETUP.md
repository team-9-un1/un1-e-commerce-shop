# Homepage UI Setup - UN1 E-Commerce

## Cấu trúc thư mục mới

```
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx       # Header với navigation
│   │   ├── Hero.jsx         # Hero section
│   │   └── Footer.jsx       # Footer
│   └── product/
│       ├── FeaturedProducts.jsx  # Featured products section
│       ├── ProductCard.jsx       # Product card component
│       └── ProductShowcase.jsx   # Product showcase (About/Contact)
├── pages/
│   └── Home.jsx             # Homepage main component
├── styles/
│   ├── components/
│   │   ├── header.css
│   │   ├── hero.css
│   │   ├── footer.css
│   │   ├── featured-products.css
│   │   ├── product-card.css
│   │   └── product-showcase.css
│   └── pages/
│       └── home.css
├── App.jsx
├── App.css
├── index.css
└── routes.jsx
```

## Các Components

### Header
- Logo UN1
- Navigation menu (SHOP, ABOUT, NAM, SALE)
- Search icon
- Shopping cart icon
- Login link

### Hero Section
- Banner image background
- Full width hero area

### Featured Products
- Grid layout (5 columns on desktop)
- Product cards với image, name, price
- Divider line

### Product Showcase
- 2 sections (About Us, Contact Us)
- Background images
- Overlay buttons

### Footer
- About UNI section
- Contact information
- Return Policy section
- Newsletter subscription
- Copyright info

## Điều chỉnh cần làm

### 1. Thêm Image Assets
Tạo thư mục `src/assets/images/` và thêm các file:
- `hero-bg.jpg` - Hero section background
- `product-1.jpg` đến `product-5.jpg` - Product images
- `showcase-1.jpg`, `showcase-2.jpg` - Showcase images
- `footer-image.jpg` - Footer image

### 2. Cài đặt React Router
```bash
npm install react-router-dom
```

### 3. Import Router vào main.jsx
```jsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

### 4. Thêm fonts Roboto và Inter
Thêm vào file `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;800&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
```

## Color Palette

- Primary Black: `#000000`
- Secondary Black: `#2C2C2C`
- Background Gray: `#D9D9D9`, `#F5F5F5`
- Text Color: `#000000`
- Border Color: `#E0E0E0`, `#4B4949`

## Typography

- Headings: Roboto 500, 32px, line-height 40px
- Title: Inter 800, 36px
- Body: Roboto 400, 14-24px
- Button: Inter 400, 16px

## Responsive Breakpoints

- Desktop: 1440px (base)
- Tablet: 768px
- Mobile: 480px

## Tiếp theo

1. Thêm hình ảnh vào `src/assets/images/`
2. Cập nhật file `main.jsx` với BrowserRouter
3. Chạy dev server và kiểm tra layout
4. Điều chỉnh styling nếu cần
5. Thêm functionality (cart, login, search, etc.)
