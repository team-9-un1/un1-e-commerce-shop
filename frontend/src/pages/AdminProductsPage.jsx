import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import AdminSidebar from "../components/admin/AdminSidebar";
import productService from "../services/productService";
import "../styles/pages/admin-dashboard.css";
import "../styles/pages/admin-products.css";

const PAGE_SIZE = 100;

const AdminProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearchQuery(searchInput.trim());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await productService.getProducts({
          page: 1,
          limit: PAGE_SIZE,
          search: searchQuery || undefined,
          sortBy: "createdAt",
          sortOrder: "desc",
        });

        if (!isMounted) return;

        setProducts(Array.isArray(response?.data) ? response.data : []);
      } catch {
        if (!isMounted) return;

        setError("Không thể tải danh sách sản phẩm.");
        setProducts([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  const formatPrice = (product) => {
    const rawPrice = product?.priceCents ?? product?.price;

    if (typeof rawPrice === "number") {
      return `${rawPrice.toLocaleString("vi-VN")} VNĐ`;
    }

    const numericPrice = Number(rawPrice);
    if (!Number.isNaN(numericPrice)) {
      return `${numericPrice.toLocaleString("vi-VN")} VNĐ`;
    }

    return rawPrice || "0 VNĐ";
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      await productService.deleteProduct(productId);
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== productId)
      );
    } catch {
      setError("Xóa sản phẩm thất bại.");
    }
  };

  return (
    <div className="admin-dashboard-page admin-products-page">
      <Header />

      <main className="admin-dashboard-main">
        <div className="admin-dashboard-container">
          <AdminSidebar />

          <section className="admin-content-card admin-products-card" aria-label="Quản lý sản phẩm">
            <div className="admin-products-header">
              <h1 className="admin-products-title">Quản lý sản phẩm</h1>

              <button
                type="button"
                className="admin-products-add-btn"
                onClick={() => navigate("/add-product")}
              >
                <span aria-hidden="true">+</span>
                Thêm sản phẩm
              </button>
            </div>

            <div className="admin-products-toolbar">
              <label className="admin-products-search" aria-label="Tìm kiếm sản phẩm theo tên">
                <span className="admin-products-search-icon" aria-hidden="true">
                  🔎
                </span>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="Tìm kiếm sản phẩm theo tên"
                />
              </label>
            </div>

            {loading ? (
              <div className="admin-products-state">Đang tải sản phẩm...</div>
            ) : error ? (
              <div className="admin-products-state admin-products-state-error">{error}</div>
            ) : products.length === 0 ? (
              <div className="admin-products-state">Không có sản phẩm nào phù hợp.</div>
            ) : (
              <div className="admin-products-grid">
                {products.map((product) => (
                  <article key={product.id} className="admin-product-card">
                    <div className="admin-product-image-wrap">
                      <img
                        src={product.image || "/src/assets/images/placeholder-product.png"}
                        alt={product.name}
                        className="admin-product-image"
                      />
                    </div>

                    <div className="admin-product-body">
                      <h2 className="admin-product-name">{product.name}</h2>
                      <p className="admin-product-price">{formatPrice(product)}</p>

                      <div className="admin-product-actions">
                        <button
                          type="button"
                          className="admin-product-action-btn"
                          onClick={() => navigate(`/edit-product/${product.id}`)}
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          className="admin-product-action-btn"
                          onClick={() => handleDelete(product.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminProductsPage;