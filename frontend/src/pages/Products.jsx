import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProductFilter from "../components/product/ProductFilter";
import ProductGrid from "../components/product/ProductGrid";
import SkeletonLoader from "../components/common/SkeletonLoader";
import productService from "../services/productService";
import "../styles/pages/products.css";

const PAGE_SIZE = 12;

const Products = () => {
  // Lấy category từ URL
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [categories, setCategories] = useState([]);

  // Filter state (expand if muốn dùng nhiều filter hơn)
  const [selectedFilters, setSelectedFilters] = useState({});
  const [banner, setBanner] = useState(null);

  // Fetch banner for category
  useEffect(() => {
    // Determine banner key based on the current category slug
    const activeCategory = selectedFilters.category || category;
    const bannerKey = activeCategory === 'nam' ? 'CAT_NAM' : activeCategory === 'nu' ? 'CAT_NU' : null;
    
    if (bannerKey) {
      productService.getBannerByKey(bannerKey)
        .then(setBanner)
        .catch(() => setBanner(null));
    } else {
      setBanner(null);
    }
  }, [category, selectedFilters.category]);

  // Fetch categories from backend (giả sử có API getCategories)
  useEffect(() => {
    if (productService.getCategories) {
      productService.getCategories().then(setCategories).catch(() => {});
    }
  }, []);

  // Fetch products from backend
  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Ưu tiên dùng slug từ bộ lọc bên trái (selectedFilters), nếu không có dùng slug từ URL (category param)
    const activeCategory = selectedFilters.category || category;

    productService
      .getProducts({
        page,
        limit: PAGE_SIZE,
        search: debouncedSearch,
        category: activeCategory || undefined,
      })
      .then((res) => {
        setProducts(res.data || []);
        setTotalPages(res.meta?.totalPages || 1);
      })
      .catch(() => setError("Lỗi tải sản phẩm!"))
      .finally(() => setLoading(false));
  }, [page, debouncedSearch, selectedFilters.category, category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Debounce search
  useEffect(() => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    setDebounceTimeout(
      setTimeout(() => {
        setDebouncedSearch(searchQuery);
        setPage(1);
      }, 400)
    );
    // eslint-disable-next-line
  }, [searchQuery]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value,
    }));
    setPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setDebouncedSearch(searchQuery);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Lấy tên category từ categories nếu có filter
  const categoryName = selectedFilters.category
    ? (categories.find((c) => c.id === selectedFilters.category)?.name?.toUpperCase() || "SẢN PHẨM")
    : "SẢN PHẨM";

  return (
    <div className="products-page">
      <Header />
      <main className="products-main">
        {/* Hero/Cover Section */}
        <div className="products-cover">
          <img
            src={
              banner?.imageUrl || (category === "nam"
                ? "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071"
                : "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070")
            }
            alt={categoryName}
            className="cover-image"
          />
          <div className="cover-overlay">
            <h1 className="cover-title">{categoryName}</h1>
          </div>

          {/* Search Bar - Positioned absolutely in center */}
          <form className="search-bar-product" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input-product"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn-product">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </form>

          {/* Logo - Positioned absolutely on right */}
          <div className="cover-logo">
            <img
              src="/src/assets/images/un1-logo.png"
              alt="UN1"
              className="cover-logo-image"
            />
          </div>
        </div>

        {/* Products Section */}
        <div className="products-container">
          {/* Sidebar Filter */}
          <ProductFilter
            selectedFilters={selectedFilters}
            categories={categories}
            onCategoryChange={(cat) => {
              setSelectedFilters((prev) => ({ ...prev, category: cat }));
              setPage(1);
            }}
            onFilterChange={handleFilterChange}
          />

          {/* Product Grid */}
          <div style={{ flex: 1 }}>
            {loading ? (
              <SkeletonLoader type="card" count={12} />
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              <>
                <ProductGrid products={products} category={category} />
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination-controls">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        disabled={page === i + 1}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;