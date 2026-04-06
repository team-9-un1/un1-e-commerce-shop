
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProductFilter from "../components/product/ProductFilter";
import ProductGrid from "../components/product/ProductGrid";
import SkeletonLoader from "../components/common/SkeletonLoader";
import productService from "../services/productService";
import "../styles/pages/products.css";

const PAGE_SIZE = 12;

const Home = () => {
  const { user } = useAuth();
  const isAdmin = user && (user.role === "ADMIN" || user.role === "admin");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const { searchValue } = useSearch();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [banner, setBanner] = useState(null);

  // Fetch banner for home
  useEffect(() => {
    productService.getBannerByKey('HOME_HERO')
      .then(setBanner)
      .catch((err) => console.error("Error fetching home banner:", err));
  }, []);

  // Lắng nghe searchValue từ context để lọc real-time
  useEffect(() => {
    setSearchQuery(searchValue);
  }, [searchValue]);

  useEffect(() => {
    if (productService.getCategories) {
      productService.getCategories().then(setCategories).catch(() => {});
    }
  }, []);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(null);
    productService
      .getProducts({
        page,
        limit: PAGE_SIZE,
        search: debouncedSearch,
        categoryId: selectedFilters.category || undefined,
      })
      .then((res) => {
        setProducts(res.data || []);
        setTotalPages(res.meta?.totalPages || 1);
      })
      .catch(() => setError("Lỗi tải sản phẩm!"))
      .finally(() => setLoading(false));
  }, [page, debouncedSearch, selectedFilters.category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Nếu searchQuery thay đổi (do nhập ở header), debounce fetch lại sản phẩm
  useEffect(() => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    setDebounceTimeout(
      setTimeout(() => {
        setDebouncedSearch(searchQuery);
        setPage(1);
      }, 300)
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="products-page">
      <Header />
      {/* Đã xóa thanh tìm kiếm sản phẩm theo yêu cầu */}
      <main className="products-main">
        <div style={{ width: '100%', marginBottom: 0 }}>
          <img
            src={banner?.imageUrl || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070"}
            alt={banner?.title || "Banner"}
            style={{ width: '100%', height: 900, objectFit: 'cover', borderRadius: 12, display: 'block' }}
          />
        </div>
        <div style={{ width: '100%', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="cover-title" style={{ margin: '24px 0 12px 0', textAlign: 'center' }}>DANH SÁCH SẢN PHẨM</h1>
        </div>
        <div className="products-container">
          <ProductFilter
            selectedFilters={selectedFilters}
            categories={categories}
            onCategoryChange={(catId) => {
              setSelectedFilters((prev) => ({ ...prev, category: catId }));
              setPage(1);
            }}
            onResetFilters={() => {
              setSelectedFilters({});
              setPage(1);
            }}
          />
          <div style={{ flex: 1 }}>
            {loading ? (
              <SkeletonLoader type="card" count={12} />
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              <>
                {isAdmin && (
                  <div style={{ marginBottom: 16 }}>
                    <button
                      className="add-product-btn product-action-btn"
                      onClick={() => navigate("/add-product")}
                      style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                      <span style={{fontSize: 20}}>➕</span> Thêm sản phẩm
                    </button>
                  </div>
                )}
                <ProductGrid products={products} isAdmin={isAdmin} />
                {totalPages > 1 && (
                  <div className="pagination-controls" style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '24px 0' }}>
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      style={{ padding: '6px 14px' }}
                    >
                      &lt; Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        disabled={page === i + 1}
                        style={{
                          fontWeight: page === i + 1 ? 'bold' : 'normal',
                          background: page === i + 1 ? '#1976d2' : '#fff',
                          color: page === i + 1 ? '#fff' : '#222',
                          border: '1px solid #1976d2',
                          borderRadius: 4,
                          padding: '6px 14px',
                          cursor: 'pointer',
                        }}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      style={{ padding: '6px 14px' }}
                    >
                      Next &gt;
                    </button>
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

export default Home;


