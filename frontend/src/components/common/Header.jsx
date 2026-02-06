import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/header.css";

const Header = () => {
  return (
    <header className="header">
      {/* Left Section - Logo/Icon */}
      <div className="header-left">
        <nav className="nav-menu">
          <Link to="/" className="nav-item">
            SHOP
          </Link>
          <Link to="/" className="nav-item">
            NAM
          </Link>
          <Link to="/" className="nav-item">
            NỮ
          </Link>
          <Link to="/" className="nav-item">
            SALE
          </Link>
        </nav>
      </div>

      {/* Center Section - Logo */}
      <div className="logo-placeholder">
        <img
          src="/src/assets/images/un1-logo.png"
          alt="UN1"
          className="logo-image"
        />
      </div>

      {/* Right Section - Icons & Login */}
      <div className="header-right">
        <div className="icon-shopping-card">
          <img
            src="/src/assets/images/icon-shopping-card.svg"
            alt="Shopping"
            className="header-icon-image"
          />
        </div>
        <div className="icon-liked-product">
          <img
            src="/src/assets/images/icon-liked-product.svg"
            alt="Like"
            className="header-icon-image"
          />
        </div>
        <Link to="/auth/login" className="login-link">
          Đăng Nhập
        </Link>
      </div>
    </header>
  );
};

export default Header;
