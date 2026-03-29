import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import productService from "../../services/productService";
import "../../styles/components/product-card.css";


const ProductCard = ({ product, category, isAdmin }) => {
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

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

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdded(true);
    // TODO: Add to cart logic
    setTimeout(() => setIsAdded(false), 2000);
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
              : ''
          }
          alt={product.name}
          style={{ objectFit: 'cover', width: '100%', height: '100%', cursor: 'pointer' }}
          onClick={() => navigate(`/product/${product.id}`)}
        />
        <button
          className={`add-to-cart-btn ${isAdded ? "added" : ""}`}
          onClick={handleAddToCart}
        >
          {isAdded ? "Đã thêm" : "Thêm vào giỏ"}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price}</p>
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
