import React from 'react';
import '../../pages/Checkout.css';

const OrderSummary = ({ cartItems = [], subtotal = 0, tax = 0, total = 0, shippingCost = 0 }) => {
  const normalizedItems = cartItems.map((item) => {
    const product = item.product || {};
    return {
      id: item.id,
      name: item.name || product.name || 'Sản phẩm',
      image: item.image || product.image || '/src/assets/images/placeholder-product.png',
      unitPrice: item.price ?? item.priceCents ?? product.price ?? product.priceCents ?? 0,
      quantity: item.quantity || 0,
      size: item.size,
      color: item.color,
    };
  });

  const totalProductCount = normalizedItems.reduce((sum, item) => sum + item.quantity, 0);
  const grandTotal = total + shippingCost;

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' VND';
  };

  return (
    <div className="order-summary">
      <h3>Tổng đơn hàng | {totalProductCount} sản phẩm</h3>
      
      <div className="order-items">
        {normalizedItems.map((item) => (
          <div key={item.id} className="order-item">
            <div className="item-image">
              <img 
                src={item.image} 
                alt={item.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x100?text=Product';
                }}
              />
            </div>
            <div className="item-details">
              <h4>{item.name}</h4>
              {item.size && <p>Size: {item.size}</p>}
              {item.color && <p>Màu: {item.color}</p>}
              <p>Số lượng: {item.quantity}</p>
              <p className="item-price">{formatPrice(item.unitPrice)}</p>
            </div>
          </div>
        ))}
        {normalizedItems.length === 0 && (
          <p>Giỏ hàng đang trống</p>
        )}
      </div>

      <div className="order-calculation">
        <div className="calc-row">
          <span>Tổng:</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="calc-row tax-row">
          <span>Đã bao gồm thuế giá trị gia tăng:</span>
          <span>{formatPrice(tax)}</span>
        </div>
        {shippingCost > 0 && (
          <div className="calc-row">
            <span>Phí vận chuyển:</span>
            <span>{formatPrice(shippingCost)}</span>
          </div>
        )}
        <div className="calc-row total-row">
          <span>Tổng đơn đặt hàng:</span>
          <span className="total-amount">{formatPrice(grandTotal)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
