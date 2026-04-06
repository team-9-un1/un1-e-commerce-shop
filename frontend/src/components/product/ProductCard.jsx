import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import productService from "../../services/productService";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../context/AuthContext";
import "../../styles/components/product-card.css";


const ProductCard = ({ product, category, isAdmin }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleEdit = () => {
    navigate(`/edit-product/${product.id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    setDeleting(true);
    try {
      await productService.deleteProduct(product.id);
      window.location.reload();
    } catch {
      alert("Xóa thất bại!");
    } finally {
      setDeleting(false);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (adding) return;

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      setAdding(true);
      await addToCart({
        ...product,
        color: product?.color || product?.colors?.[0]?.name || "Mặc định",
        size: product?.size || product?.sizes?.[0] || "M",
      });
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    } finally {
      setAdding(false);
    }
  };

  // Format price with thousands separator and add 'VNĐ'
  // Ưu tiên lấy priceCents nếu có, fallback sang price
  const formatPrice = (product) => {
    const price = product.priceCents ?? product.price;
    if (typeof price === 'number') {
      return price.toLocaleString('vi-VN') + ' VNĐ';
    }
    if (!isNaN(Number(price))) {
      return Number(price).toLocaleString('vi-VN') + ' VNĐ';
    }
    return price;
  };

  return (
    <div className="product-card">
      {isAdmin && (
        <div className="admin-actions">
          <button
            className="edit-btn product-action-btn"
            onClick={handleEdit}
            title="Sửa sản phẩm"
          >
            <span style={{marginRight: 4}}>✏️</span> Sửa
          </button>
          <button
            className="delete-btn product-action-btn"
            onClick={handleDelete}
            disabled={deleting}
            title="Xóa sản phẩm"
          >
            <span style={{marginRight: 4}}>🗑️</span> {deleting ? "Đang xóa..." : "Xóa"}
          </button>
        </div>
      )}
      <div className="product-image">
        <img
          src={
            product.image
              ? product.image
              : '/src/assets/images/placeholder-product.png'
          }
          alt={product.name}
          style={{ objectFit: 'cover', width: '100%', height: '100%', cursor: 'pointer' }}
          onClick={() => navigate(`/product/${product.id}`)}
        />
        <button
          className={`add-to-cart-btn ${isAdded ? "added" : ""}`}
          onClick={handleAddToCart}
          disabled={adding}
        >
          {adding ? "Đang thêm..." : isAdded ? "Đã thêm" : "Thêm vào giỏ"}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{formatPrice(product)}</p>
        <Link
          to={`/product/${product.id}`}
          className="product-link"
        >
          Chi tiết
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
