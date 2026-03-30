import React from 'react';
import SkeletonLoader from '../components/common/SkeletonLoader';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import CouponInput from '../components/cart/CouponInput';
import RecommendedProducts from '../components/cart/RecommendedProducts';
import { ShoppingBag, ArrowLeft, Info } from 'lucide-react';

const ShoppingCart = () => {
  const { cartItems, loading } = useCart();

  const isEmpty = cartItems.length === 0;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <SkeletonLoader type="list" count={3} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation / Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase">GIỎ HÀNG</h1>
          {!isEmpty && (
            <span className="bg-black text-white text-[10px] font-black px-2.5 py-1 rounded-full ml-2 tracking-widest uppercase">
              {totalItems} MÓN
            </span>
          )}
        </div>

        {isEmpty ? (
          <div className="bg-white rounded-[40px] p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[500px]">
            <div className="bg-gray-50 p-8 rounded-full mb-8">
              <ShoppingBag size={64} className="text-gray-200" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-400 mb-10 max-w-xs mx-auto font-medium leading-relaxed">
              Có vẻ như bạn chưa thêm sản phẩm nào. Khám phá các bộ sưu tập mới nhất để tìm thấy phong cách của mình.
            </p>
            <Link
              to="/"
              className="bg-black text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Cart Items */}
            <div className="lg:col-span-8">
              <div className="space-y-4">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              
              <div className="mt-8">
                <CouponInput />
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <CartSummary />
                
                {/* Shipping Info Card */}
                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-[32px] p-6 flex gap-4 items-start">
                  <div className="bg-blue-600 text-white p-1.5 rounded-xl mt-0.5">
                    <Info size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-blue-900 uppercase tracking-tight">Miễn phí vận chuyển</h4>
                    <p className="text-xs text-blue-700 mt-1 font-medium leading-relaxed">
                      Đơn hàng của bạn đủ điều kiện nhận ưu đãi miễn phí giao hàng tiêu chuẩn trên toàn quốc.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products */}
        <div className="mt-24">
          <RecommendedProducts />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShoppingCart;
