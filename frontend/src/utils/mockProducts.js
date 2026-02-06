// Mock product data for NAM (Men's) category
export const mockProductsNam = [
  {
    id: 1,
    name: "ÁO NỈ CỔ KHÓA KÉO CƠ BẢN",
    price: "1.399.000 VND",
    image: "/src/assets/images/products/man/1.png",
  },
  {
    id: 2,
    name: "ÁO KHOÁC VẢI DỆT",
    price: "2.599.000 VND",
    image: "/src/assets/images/products/man/2.png",
  },
  {
    id: 3,
    name: "ÁO KHOÁC VẠT ĐẮP CHÉO",
    price: "3.999.000 VND",
    image: "/src/assets/images/products/man/3.png",
  },
  {
    id: 4,
    name: "ÁO KHOÁC REGULAR FIT",
    price: "3.199.000 VND",
    image: "/src/assets/images/products/man/12.png",
  },
  {
    id: 5,
    name: "ÁO PHÔNG DỆT KIM",
    price: "1.199.000 VND",
    image: "/src/assets/images/products/man/11.png",
  },
  {
    id: 6,
    name: "ÁO PHÔNG IN HỌA TIẾT",
    price: "899.000 VND",
    image: "/src/assets/images/products/man/4.png",
  },
  {
    id: 7,
    name: "ÁO PHÔNG KIỂU BẠC MÀU",
    price: "899.000 VND",
    image: "/src/assets/images/products/man/5.png",
  },
  {
    id: 8,
    name: "ÁO HỌA TIẾT PHUN SƠN",
    price: "1.199.000 VND",
    image: "/src/assets/images/products/man/6.png",
  },
  {
    id: 9,
    name: "QUẦN JOGGER RELAXED FIT",
    price: "1.199.000 VND",
    image: "/src/assets/images/products/man/7.png",
  },
  {
    id: 10,
    name: "QUẦN JEANS STRAIGHT FIT",
    price: "1.399.000 VND",
    image: "/src/assets/images/products/man/8.png",
  },
  {
    id: 11,
    name: "QUẦN JEANS FLARE FIT",
    price: "1.899.000 VND",
    image: "/src/assets/images/products/man/9.png",
  },
  {
    id: 12,
    name: "QUẦN ỐNG SUÔNG XẾP LI",
    price: "1.199.000 VND",
    image: "/src/assets/images/products/man/10.png",
  },
];

// Mock product data for NỮ (Women's) category
// Mock product data for NỮ (Women's) category
export const mockProductsNu = [
  // Hàng 1: Áo khoác
  {
    id: 1,
    name: "ÁO KHOÁC PHA LEN",
    price: "1.179.000 VND",
    image: "/src/assets/images/products/woman/1.png",
  },
  {
    id: 2,
    name: "ÁO KHOÁC LÔNG NHÂN TẠO",
    price: "2.599.000 VND",
    image: "/src/assets/images/products/woman/2.png",
  },
  {
    id: 3,
    name: "ÁO KHOÁC DÁNG DÀI PHA LEN",
    price: "4.799.000 VND",
    image: "/src/assets/images/products/woman/3.png",
  },
  {
    id: 4,
    name: "ÁO KHOÁC NGẮN HAI CÚC",
    price: "1.899.000 VND",
    image: "/src/assets/images/products/woman/4.png",
  },
  // Hàng 2: Áo phông
  {
    id: 5,
    name: "ÁO PHÔNG THE MUPPETS",
    price: "799.000 VND",
    image: "/src/assets/images/products/woman/5.png",
  },
  {
    id: 6,
    name: "ÁO PHÔNG KUNST TAY NGẮN",
    price: "799.000 VND",
    image: "/src/assets/images/products/woman/6.png",
  },
  {
    id: 7,
    name: "ÁO PHÔNG VIỀN VẢI BO",
    price: "649.000 VND",
    image: "/src/assets/images/products/woman/7.png",
  },
  {
    id: 8,
    name: "ÁO PHÔNG CỔ TRÒN XẺ",
    price: "649.000 VND",
    image: "/src/assets/images/products/woman/8.png",
  },

  // Hàng 3: Quần
  {
    id: 10,
    name: "QUẦN BALLOON (Z W COLLEC.)",
    price: "1.499.000 VND",
    image: "/src/assets/images/products/woman/10.png",
  },
  {
    id: 11,
    name: "QUẦN NẾT LY ỐNG RỘNG",
    price: "1.099.000 VND",
    image: "/src/assets/images/products/woman/11.png",
  },
  {
    id: 12,
    name: "QUẦN VẢI DỆT THOI JQ",
    price: "1.179.000 VND",
    image: "/src/assets/images/products/woman/12.png",
  },
  {
    id: 13,
    name: "QUẦN ỐNG SUÔNG CẠP CAO",
    price: "1.199.000 VND",
    image: "/src/assets/images/products/woman/13.png",
  },
];

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  if (category === "nam") {
    return mockProductsNam;
  } else if (category === "nu") {
    return mockProductsNu;
  }
  return [];
};
