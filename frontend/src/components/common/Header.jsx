import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/components/header.css";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userDisplayName = user?.name || user?.fullName || user?.email || "Thành viên";
  const isAdmin = String(user?.role || "").toUpperCase() === "ADMIN";

  return (
    <>
      <header className="header">
        {/* Left Section - Navigation Menu */}
        <div className="header-left">
          <nav className="nav-menu">
            <Link to="/" className="nav-item">
              SHOP
            </Link>
            <Link to="/products/nam" className="nav-item">
              NAM
            </Link>
            <Link to="/products/nu" className="nav-item">
              NỮ
            </Link>
            <Link to="/" className="nav-item">
              SALE
            </Link>
            <Link to="/about-us" className="nav-item">
              ABOUT
            </Link>
            <Link to="/contact-us" className="nav-item">
              CONTACT
            </Link>
          </nav>
        </div>

        {/* Center Section - Logo */}
        <div className="header-center">
          <Link to="/" className="logo-link">
            <img
              src="/src/assets/images/un1-logo.png"
              alt="UN1"
              className="logo-image"
            />
          </Link>
        </div>

        {/* Right Section - Icons & Login */}
        <div className="header-right">
          <div className="icon-shopping-card">
            <Link to="/cart">
              <img
                src="/src/assets/images/icon-shopping-card.svg"
                alt="Shopping"
                className="header-icon-image"
              />
            </Link>
          </div>
          <div className="icon-liked-product">
            <img
              src="/src/assets/images/icon-liked-product.svg"
              alt="Like"
              className="header-icon-image"
            />
          </div>

          {isAuthenticated ? (
            <div className="auth-actions">
              {isAdmin ? (
                <Link to="/admin/dashboard" className="admin-dashboard-link">
                  Admin Dashboard
                </Link>
              ) : null}
              <span className="user-name" title={userDisplayName}>{userDisplayName}</span>
              <button type="button" className="login-link logout-button" onClick={handleLogout}>
                Đăng Xuất
              </button>
            </div>
          ) : (
            <div className="auth-actions">
              <Link to="/login" className="login-link">
                Đăng Nhập
              </Link>
              <Link to="/register" className="login-link">
                Đăng Ký
              </Link>
            </div>
          )}
        </div>
      </header>
      <div className="header-spacer" aria-hidden="true" />
    </>
  );
};

export default Header;
