import React from "react";
import "../../styles/components/product-filter.css";

const ProductFilter = ({ selectedFilters, onCategoryChange, categories = [], onResetFilters }) => {
  return (
    <aside className="product-filter">
      {categories.length > 0 && (
        <div className="filter-section">
          <label htmlFor="category-dropdown">Danh mục:</label>
          <select
            id="category-dropdown"
            value={selectedFilters.category || ""}
            onChange={e => onCategoryChange(e.target.value || null)}
            style={{ width: '100%', margin: '8px 0' }}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map(cat => (
              <option key={cat.slug || cat.id} value={cat.slug || cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      )}
      <div className="filter-header" style={{marginTop: 16}}>
        <button className="filter-reset" onClick={onResetFilters} style={{width: '100%', padding: 8, borderRadius: 4, border: '1px solid #1976d2', background: '#fff', color: '#1976d2', cursor: 'pointer'}}>↻ Đặt lại bộ lọc</button>
      </div>
    </aside>
  );
};

export default ProductFilter;
