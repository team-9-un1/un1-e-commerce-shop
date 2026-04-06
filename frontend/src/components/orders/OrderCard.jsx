import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderStatusBadge from './OrderStatusBadge';
import { Icons } from '../../pages/orders/orderConstants';
import { formatCurrencyVnd, formatDateTime, formatItemCount } from '../../pages/orders/orderUtils';

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const thumbnails = order.itemThumbnails || [];
  const visibleThumbnails = thumbnails.slice(0, 4);
  const remainingCount = Math.max((thumbnails.length || order.itemCount || 0) - visibleThumbnails.length, 0);

  return (
    <button
      type="button"
      onClick={() => navigate(`/orders/${order.id}`)}
      className="w-full text-left bg-[#dcdcdc] border border-gray-300 overflow-hidden hover:bg-[#d6d6d6] transition-colors focus:outline-none"
    >
      <div className="px-4 py-4 sm:px-5 flex items-start gap-5">
        <div className="shrink-0 flex items-center gap-2 pt-0.5">
          {visibleThumbnails.length > 0 ? (
            <div className="flex items-center gap-1.5 flex-wrap max-w-[150px]">
              {visibleThumbnails.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm border border-gray-200 bg-white overflow-hidden"
                >
                  <img
                    src={src}
                    alt={order.items?.[index]?.product?.name || order.items?.[index]?.name || `Sản phẩm ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {remainingCount > 0 && (
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm border border-gray-200 bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-700">
                  +{remainingCount}
                </div>
              )}
            </div>
          ) : (
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center text-gray-400">
              <Icons.Package />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 pt-1">
          <h3 className="text-lg sm:text-xl font-medium text-gray-800 leading-tight">Đơn hàng {order.orderNumber}</h3>
          <p className="text-base text-gray-700 mt-1">Ngày đặt: {formatDateTime(order.date).split(' ')[0]}</p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-2xl text-gray-700 leading-tight">Tổng cộng</p>
          <p className="text-3xl text-gray-700 leading-tight">{formatCurrencyVnd(order.totalAmount)}</p>
          <div className="mt-2 inline-flex">
            <OrderStatusBadge status={order.status} />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-5 pb-4 pt-0 flex items-center justify-between text-base text-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">{formatItemCount(order.itemCount)}</span>
        </div>

        <span className="inline-flex items-center gap-2 text-gray-700">
          xem chi tiết
          <Icons.ChevronRight />
        </span>
      </div>
    </button>
  );
};

export default OrderCard;
