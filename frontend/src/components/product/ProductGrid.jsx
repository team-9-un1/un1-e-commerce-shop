import React from "react";
import ProductCard from "./ProductCard";
import "../../styles/components/product-grid.css";

const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid-wrapper">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
