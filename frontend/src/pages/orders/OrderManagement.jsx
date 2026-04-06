import React, { useEffect, useMemo, useState } from 'react';
import OrderFilter from '../../components/orders/OrderFilter';
import OrderCard from '../../components/orders/OrderCard';
import EmptyState from '../../components/orders/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { ordersService } from '../../services/ordersService';

const OrderManagement = () => {
  const { token } = useAuth();
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError('');
        const result = await ordersService.getOrders({
          status: statusFilter,
          token,
        });

        if (active) {
          setOrders(result);
        }
      } catch (err) {
        if (active) {
          setOrders([]);
          setError(err.message || 'Không thể tải danh sách đơn hàng.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      active = false;
    };
  }, [statusFilter, token]);

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [orders]);

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">G</div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 tracking-tight">Gemini Mart</h1>
              <p className="text-xs text-gray-500">Order Management</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Lịch sử đơn hàng</h2>
          <p className="text-gray-600 text-sm">Theo dõi và quản lý các giao dịch của bạn.</p>
        </div>

        <OrderFilter
          status={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <div className="space-y-4">
          {error && !loading && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="rounded-2xl border border-gray-100 bg-white px-6 py-10 text-center text-gray-600">
              Đang tải đơn hàng...
            </div>
          ) : sortedOrders.length > 0 ? (
            sortedOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
};

export default OrderManagement;
