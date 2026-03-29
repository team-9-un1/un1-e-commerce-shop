import React from "react";
import ProductCard from "./ProductCard";
import "../../styles/components/product-grid.css";

const ProductGrid = ({ products, category, isAdmin }) => {
  return (
    <div className="product-grid-wrapper">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} category={category} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
