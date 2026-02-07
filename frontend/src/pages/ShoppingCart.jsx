import React from 'react';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import CouponInput from '../components/cart/CouponInput';
import RecommendedProducts from '../components/cart/RecommendedProducts';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
  const { cartItems } = useCart();
  const isEmpty = cartItems.length === 0;

  return (
    <div className="shopping-cart max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Giỏ hàng</h2>

      {/* Empty cart state */}
      {isEmpty && (
        <div className="empty-cart flex flex-col items-center justify-center h-[40vh] mb-8">
          <img
            src="/assets/images/empty-cart.png"
            alt="Empty cart"
            className="w-32 mb-4"
          />
          <div className="text-lg font-semibold mb-2">
            Giỏ hàng của bạn đang trống
          </div>
          <Link
            to="/"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      )}

      {/* Cart items */}
      {!isEmpty && (
        <>
          <div className="flex flex-col gap-4 mb-6">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <CouponInput />
          <CartSummary />
        </>
      )}

      {/* Recommended products luôn hiển thị */}
      <RecommendedProducts />
    </div>
  );
};

export default ShoppingCart;
