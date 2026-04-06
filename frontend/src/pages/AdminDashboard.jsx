import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import AdminSidebar from "../components/admin/AdminSidebar";
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
          <AdminSidebar />

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
