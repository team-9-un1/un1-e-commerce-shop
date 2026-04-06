import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import AdminSidebar from "../components/admin/AdminSidebar";
import OrderStatusBadge from "../components/orders/OrderStatusBadge";
import { Icons } from "./orders/orderConstants";
import { ORDER_STATUS_FILTER_OPTIONS } from "./orders/orderTypes";
import { formatCurrencyVnd, formatDateTime } from "./orders/orderUtils";
import { useAuth } from "../context/AuthContext";
import { ordersService } from "../services/ordersService";
import "../styles/pages/admin-dashboard.css";

const normalizeSearchValue = (value) => String(value || "").trim().toLowerCase();

const AdminOrderManagement = () => {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const isAdmin = String(user?.role || "").toLowerCase() === "admin";

  useEffect(() => {
    let active = true;

    if (!isAdmin) {
      setLoading(false);
      setOrders([]);
      setError("Bạn không có quyền truy cập trang quản lý đơn hàng.");
      return undefined;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await ordersService.getAdminOrders({
          token,
          search: searchQuery,
          status: statusFilter,
        });

        if (active) {
          setOrders(result.orders || []);
        }
      } catch (fetchError) {
        if (active) {
          setOrders([]);
          setError(fetchError.message || "Không thể tải danh sách đơn hàng.");
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
  }, [token, searchQuery, statusFilter, isAdmin]);

  const filteredOrders = useMemo(() => {
    const keyword = normalizeSearchValue(searchQuery);

    return orders.filter((order) => {
      if (!keyword) {
        return true;
      }

      const haystack = [
        order.id,
        order.orderNumber,
        order.customerId,
        order.customerName,
        order.customerEmail,
        order.customerLabel,
        order.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(keyword);
    });
  }, [orders, searchQuery]);

  const stats = useMemo(() => {
    const totalOrders = filteredOrders.length;
    const pendingOrders = filteredOrders.filter((order) => order.status === "PENDING").length;
    const shippingOrders = filteredOrders.filter((order) => order.status === "SHIPPING").length;
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);

    return {
      totalOrders,
      pendingOrders,
      shippingOrders,
      totalRevenue,
    };
  }, [filteredOrders]);

  return (
    <div className="admin-dashboard-page">
      <Header />

      <main className="admin-dashboard-main admin-order-management-main">
        <div className="admin-dashboard-container admin-order-management-container">
          <AdminSidebar />

          <section className="admin-content-card admin-order-management-card" aria-label="Admin order management">
            <div className="admin-content-header admin-order-management-header">
              <div>
                <h1>Quản lý đơn hàng</h1>
                <p className="admin-order-management-subtitle">Theo dõi trạng thái, doanh thu và chi tiết đơn hàng.</p>
              </div>

              <div className="admin-order-management-controls">
                <label className="admin-order-search" htmlFor="admin-order-search-input">
                  <span className="admin-order-search-icon" aria-hidden="true">
                    <Icons.Search />
                  </span>
                  <input
                    id="admin-order-search-input"
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Tìm kiếm theo mã, user, sđt..."
                  />
                </label>

                <label className="admin-order-status-filter" htmlFor="admin-order-status-filter">
                  <select
                    id="admin-order-status-filter"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                  >
                    {ORDER_STATUS_FILTER_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="admin-order-metrics" aria-label="Thống kê đơn hàng">
              <article className="admin-order-metric-card">
                <span className="admin-order-metric-label">Tổng đơn</span>
                <strong className="admin-order-metric-value">{stats.totalOrders}</strong>
              </article>
              <article className="admin-order-metric-card">
                <span className="admin-order-metric-label">Chờ xác nhận</span>
                <strong className="admin-order-metric-value">{stats.pendingOrders}</strong>
              </article>
              <article className="admin-order-metric-card">
                <span className="admin-order-metric-label">Đang giao</span>
                <strong className="admin-order-metric-value">{stats.shippingOrders}</strong>
              </article>
              <article className="admin-order-metric-card">
                <span className="admin-order-metric-label">Doanh thu</span>
                <strong className="admin-order-metric-value">{formatCurrencyVnd(stats.totalRevenue)}</strong>
              </article>
            </div>

            {error ? <div className="admin-order-alert">{error}</div> : null}

            <div className="admin-order-table-wrap">
              {loading ? (
                <div className="admin-order-empty-state">Đang tải danh sách đơn hàng...</div>
              ) : filteredOrders.length > 0 ? (
                <table className="admin-order-table">
                  <thead>
                    <tr>
                      <th>Mã</th>
                      <th>Khách hàng</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <tr key={order.id}>
                        <td>
                          <div className="admin-order-code">#{index + 1}</div>
                          <div className="admin-order-meta">{formatDateTime(order.date).split(" ")[0]}</div>
                        </td>
                        <td>
                          <div className="admin-order-customer">{order.customerLabel}</div>
                          {order.customerEmail ? <div className="admin-order-meta">{order.customerEmail}</div> : null}
                        </td>
                        <td>
                          <div className="admin-order-total">{Number(order.totalAmount || 0).toLocaleString("vi-VN")}</div>
                        </td>
                        <td>
                          <OrderStatusBadge status={order.status} />
                        </td>
                        <td>
                          <div className="admin-order-actions">
                            <Link className="admin-order-detail-link" to={`/orders/${order.id}`}>
                              Chi tiết
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="admin-order-empty-state">Không tìm thấy đơn hàng phù hợp.</div>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminOrderManagement;