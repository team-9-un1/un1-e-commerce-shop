import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Thông tin tài khoản quản trị",
    to: "/admin/dashboard",
  },
  {
    label: "Quản lý sản phẩm",
    to: "/admin-products",
  },
  {
    label: "Quản lý danh mục",
    to: "/admin-orders",
  },
  {
    label: "Quản lý đơn hàng",
    to: "/admin-categories",
  },
];

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar" aria-label="Admin menu">
      <div className="admin-sidebar-title-wrap">
        <h2 className="admin-sidebar-title">Bảng quản lý</h2>
        <span className="admin-sidebar-arrow" aria-hidden="true">
          ↑
        </span>
      </div>

      <nav>
        <ul className="admin-menu-list">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `admin-menu-link ${isActive ? "is-active" : ""}`.trim()
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
