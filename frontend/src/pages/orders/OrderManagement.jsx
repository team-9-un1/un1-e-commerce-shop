import React, { useEffect, useMemo, useState } from 'react';
import OrderFilter from '../../components/orders/OrderFilter';
import OrderCard from '../../components/orders/OrderCard';
import EmptyState from '../../components/orders/EmptyState';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { useAuth } from '../../context/AuthContext';
import { ordersService } from '../../services/ordersService';
import { formatCurrencyVnd } from './orderUtils';

const OrderManagement = () => {
  const { token } = useAuth();
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError('');
        const result = await ordersService.getOrders({ token });

        if (active) {
          setOrders(result);
        }
      } catch (err) {
        if (active) {
          setOrders([]);
          setError(err.message || 'Khong the tai danh sach don hang.');
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
  }, [token]);

  const filteredOrders = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();

    return orders
      .filter((order) => (statusFilter === 'ALL' ? true : order.status === statusFilter))
      .filter((order) => {
        if (!keyword) return true;

        const firstItemName = order.items?.[0]?.product?.name || order.items?.[0]?.name || '';

        return (
          order.orderNumber.toLowerCase().includes(keyword) ||
          order.id.toLowerCase().includes(keyword) ||
          firstItemName.toLowerCase().includes(keyword)
        );
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [orders, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    const totalSpent = orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
    const completedOrders = orders.filter((order) => order.status === 'COMPLETED').length;

    return { totalSpent, completedOrders };
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

            {/* Thống kê: merged from develop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 flex flex-col justify-center items-center">
                <p className="text-sm font-medium text-gray-500 mb-2 uppercase">Tổng chi tiêu</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrencyVnd(stats.totalSpent)}</p>
                <p className="mt-2 text-sm text-green-600">Giảm 12% so với tháng trước</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 flex flex-col justify-center items-center">
                <p className="text-sm font-medium text-gray-500 mb-2 uppercase">Số đơn hoàn thành</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedOrders}</p>
              </div>
            </div>

            <OrderFilter
              status={statusFilter}
              onStatusChange={setStatusFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <div className="space-y-7 mt-8">
              {error && !loading && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="rounded-2xl border border-gray-100 bg-white px-6 py-10 text-center text-gray-600">
                  Đang tải đơn hàng...
                </div>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
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
