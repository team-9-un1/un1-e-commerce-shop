import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/product-card.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price}</p>
        <Link to={`/product/${product.id}`} className="product-link">
          Chi tiết
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
