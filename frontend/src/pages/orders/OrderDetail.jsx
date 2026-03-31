import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import OrderStatusBadge from "../../components/orders/OrderStatusBadge";
import { ordersService } from "../../services/ordersService";
import { formatCurrencyVnd, formatDateTime, formatItemCount } from "./orderUtils";

const OrderDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const result = await ordersService.getOrderById({ id, token });

        if (active) {
          setOrder(result);
        }
      } catch {
        if (active) {
          setOrder(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchOrder();

    return () => {
      active = false;
    };
  }, [id, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-4xl mx-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-gray-600">
          Đang tải chi tiết đơn hàng...
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-4xl mx-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-gray-700">Không tìm thấy đơn hàng.</p>
          <Link to="/orders" className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-700">
            Quay lại lịch sử đơn hàng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-4">
        <Link to="/orders" className="inline-flex text-sm text-blue-600 font-medium hover:text-blue-700">
          ← Quay lại lịch sử đơn hàng
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Đơn hàng {order.orderNumber}</h1>
              <p className="text-sm text-gray-500">{formatDateTime(order.date)}</p>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs text-gray-500 uppercase">Tổng tiền</p>
              <p className="text-base font-semibold text-gray-900">{formatCurrencyVnd(order.totalAmount)}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs text-gray-500 uppercase">Số lượng</p>
              <p className="text-base font-semibold text-gray-900">{formatItemCount(order.itemCount)}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs text-gray-500 uppercase">Mã đơn</p>
              <p className="text-base font-semibold text-gray-900">{order.id}</p>
            </div>
          </div>

          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={item?.id || `${item?.product?.name || item?.name || "item"}-${index}`} className="flex items-center gap-3 border border-gray-100 rounded-xl p-3">
                <img
                  src={item?.image || item?.thumbnail || item?.product?.image || "https://placehold.co/80x80?text=No+Image"}
                  alt={item?.product?.name || item?.name || "Sản phẩm"}
                  className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                />
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">{item?.product?.name || item?.name || "Sản phẩm"}</p>
                  <p className="text-sm text-gray-500">
                    {item?.quantity || 0} x {formatCurrencyVnd(item?.priceCents || item?.price || 0)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
