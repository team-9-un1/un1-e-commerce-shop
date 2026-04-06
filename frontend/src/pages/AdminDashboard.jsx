import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useAuth } from "../context/AuthContext";
import "../styles/pages/admin-dashboard.css";

const AdminDashboard = () => {
  const { user } = useAuth();

  const adminInfo = {
    id: user?.id ?? 43,
    email: user?.email ?? "leducthinh@gmail.com",
    username: user?.username ?? user?.name ?? "leducthinh",
    role: user?.role ?? "admin",
  };

  return (
    <div className="admin-dashboard-page">
      <Header />

      <main className="admin-dashboard-main">
        <div className="admin-dashboard-container">
          <aside className="admin-sidebar" aria-label="Admin menu">
            <div className="admin-sidebar-title-wrap">
              <h2 className="admin-sidebar-title">Bảng quản lý</h2>
              <span className="admin-sidebar-arrow" aria-hidden="true">
                ↑
              </span>
            </div>

            <p className="admin-sidebar-subtitle">Thông tin tài khoản quản trị</p>

            <nav>
              <ul className="admin-menu-list">
                <li className="admin-menu-item is-active">Quản lý sản phẩm</li>
                <li className="admin-menu-item">Quản lý danh mục</li>
                <li className="admin-menu-item">Quản lý đơn hàng</li>
              </ul>
            </nav>
          </aside>

          <section className="admin-content-card" aria-label="Admin account info">
            <div className="admin-content-header">
              <span className="admin-avatar" aria-hidden="true">
                A
              </span>
              <h1>Thông tin tài khoản quản trị</h1>
            </div>

            <div className="admin-info-grid">
              <article className="admin-info-item">
                <p className="admin-info-label">ID</p>
                <p className="admin-info-value">{adminInfo.id}</p>
              </article>

              <article className="admin-info-item">
                <p className="admin-info-label">Email người dùng</p>
                <p className="admin-info-value">{adminInfo.email}</p>
              </article>

              <article className="admin-info-item">
                <p className="admin-info-label">Tên người dùng</p>
                <p className="admin-info-value">{adminInfo.username}</p>
              </article>

              <article className="admin-info-item">
                <p className="admin-info-label">Vai trò</p>
                <p className="admin-info-value">{adminInfo.role}</p>
              </article>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
