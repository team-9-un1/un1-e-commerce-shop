import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderStatusBadge from './OrderStatusBadge';
import { Icons } from '../../pages/orders/orderConstants';
import { formatCurrencyVnd, formatDateTime, formatItemCount } from '../../pages/orders/orderUtils';

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/orders/${order.id}`)}
      className="w-full text-left bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="p-4 sm:p-5 flex items-center gap-4 border-b border-gray-100 bg-gray-50">
        {order.firstItemThumbnail ? (
          <img
            src={order.firstItemThumbnail}
            alt={order.items?.[0]?.name || 'Sản phẩm đầu tiên'}
            className="w-14 h-14 rounded-lg object-cover border border-gray-200 shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-lg bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center text-gray-400">
            <Icons.Package />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-xs text-gray-500">Mã đơn hàng: <span className="font-medium text-gray-700">{order.id}</span></p>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">{order.orderNumber}</h3>
          <p className="text-xs text-gray-500 mt-1">{formatDateTime(order.date)}</p>
        </div>

        <div className="shrink-0">
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      <div className="px-4 sm:px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500 uppercase">Tổng số tiền</p>
          <p className="text-base font-semibold text-gray-900">{formatCurrencyVnd(order.totalAmount)}</p>
        </div>

        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-500 uppercase">Số lượng mặt hàng</p>
          <p className="text-base font-semibold text-gray-900">{formatItemCount(order.itemCount)}</p>
        </div>
      </div>
    </button>
  );
};

export default OrderCard;
