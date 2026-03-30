import React from 'react';
import { useCart } from '../../hooks/useCart';
import { Minus, Plus, X } from 'lucide-react';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart, loading } = useCart();

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${item.name}" khỏi giỏ hàng?`)) {
      removeFromCart(item.id || item._id);
    }
  };

  const itemId = item.id || item._id;

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 mb-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 transition-all hover:shadow-md">
      {/* Product Image */}
      <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
        <img 
          src={item.image || "/src/assets/images/placeholder-product.png"} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0 text-center sm:text-left">
        <h3 className="text-lg font-black text-gray-900 truncate uppercase tracking-tight">
          {item.name}
        </h3>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
          <span className="text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full uppercase">
            MÀU: {item.color}
          </span>
          <span className="text-xs font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full uppercase">
            SIZE: {item.size}
          </span>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xl font-black text-gray-900 leading-none">
            {((item.priceCents ?? item.price) || 0).toLocaleString('vi-VN')} VND
          </p>
          <p className="text-sm font-bold text-gray-400">
            Tổng: {(((item.priceCents ?? item.price) || 0) * item.quantity).toLocaleString('vi-VN')} VND
          </p>
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex items-center gap-6 sm:gap-8">
        <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100">
          <button
            onClick={() => updateQuantity(itemId, item.quantity - 1)}
            disabled={loading || item.quantity <= 1}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm disabled:opacity-30 transition-all"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(itemId, item.quantity + 1)}
            disabled={loading}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm disabled:opacity-30 transition-all"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all disabled:opacity-30"
          title="Xóa sản phẩm"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
