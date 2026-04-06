import React, { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import productService from '../../services/productService';

const RecommendedProducts = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getProducts({ limit: 4 })
      .then(res => {
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || products.length === 0) return null;

  return (
    <div className="recommended-products mt-8">
      <h3 className="font-semibold mb-4 text-xl">Sản phẩm gợi ý</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 border border-gray-100 flex flex-col">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-32 object-cover rounded-md mb-3"
            />

            <div className="flex-1">
              <div className="font-medium text-gray-900 line-clamp-1">{p.name}</div>
              <div className="text-sm text-indigo-600 font-semibold mt-1">
                {(p.priceCents / 100).toLocaleString('vi-VN')} VNĐ
              </div>
            </div>

            <button
              onClick={() =>
                addToCart({
                  ...p,
                  quantity: 1,
                  color: 'Trắng',
                  size: 'M',
                })
              }
              className="mt-3 bg-black text-white px-3 py-2 rounded-md w-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Thêm nhanh
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
