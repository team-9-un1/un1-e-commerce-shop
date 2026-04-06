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
    <div className="min-h-screen w-full bg-[#f3f3f3] flex flex-col">
      <Header />

      <main
        className="w-full flex-1 pb-8 sm:pb-10 flex flex-col items-center"
        style={{ paddingTop: 'calc(var(--app-header-height, 92px) + 32px)' }}
      >
        <section className="w-full max-w-[66vw] px-4 sm:px-6 lg:px-8">
          <div className="w-full overflow-hidden border border-gray-300 bg-[#ececec] shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-300 bg-[#dfdfdf] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-sky-500 text-white">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <p className="text-base font-medium uppercase tracking-wide text-gray-800">Đơn hàng của tôi</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="inline-flex h-3 w-3 rounded-full bg-blue-500" />
                hệ thống đang hoạt động
              </div>
            </div>

            <div className="px-5 py-9 sm:px-7 lg:px-10 text-[16px]">
              <div className="w-full">
                <div className="grid grid-cols-1 gap-8 mb-10 lg:grid-cols-2 lg:gap-10">
                  <div className="bg-[#d2d2d2] px-6 py-6 w-full">
                    <p className="text-2xl text-gray-800 lowercase">tổng chi tiêu</p>
                    <p className="mt-4 text-4xl font-normal text-gray-800 leading-none">{formatCurrencyVnd(stats.totalSpent)}</p>
                    <p className="mt-5 text-blue-500 text-sm">giảm 12% so với tháng trước</p>
                  </div>

                  <div className="bg-[#d2d2d2] px-6 py-6 w-full">
                    <p className="text-2xl text-gray-800 lowercase text-center">số đơn hoàn thành</p>
                    <p className="mt-6 text-6xl leading-none text-gray-900 text-center">{stats.completedOrders}</p>
                  </div>
                </div>

                <OrderFilter
                  status={statusFilter}
                  onStatusChange={setStatusFilter}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />

                <div className="space-y-6 mt-10 w-full">
                  {error && !loading && (
                    <div className="rounded-md border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                      {error}
                    </div>
                  )}

                  {loading ? (
                    <div className="rounded-md border border-gray-300 bg-white px-6 py-10 text-center text-gray-600">
                      Đang tải đơn hàng...
                    </div>
                  ) : filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
                  ) : (
                    <EmptyState />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OrderManagement;
