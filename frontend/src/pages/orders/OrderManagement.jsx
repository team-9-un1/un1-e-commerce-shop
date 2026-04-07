import React, { useEffect, useMemo, useState } from 'react';
import OrderFilter from '../../components/orders/OrderFilter';
import OrderCard from '../../components/orders/OrderCard';
import EmptyState from '../../components/orders/EmptyState';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 w-full py-8 sm:py-10 px-4 sm:px-6 lg:px-8 flex justify-center">
        <section className="w-full lg:w-2/3 max-w-[1280px]">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 lg:p-12 shadow-sm">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Lịch sử đơn hàng</h2>
              <p className="text-gray-600 text-sm">Theo dõi và quản lý các giao dịch của bạn.</p>
            </div>

            <OrderFilter
              status={statusFilter}
              onStatusChange={setStatusFilter}
            />

            <div className="space-y-7">
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OrderManagement;
