import React, { useState, useRef, useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import "../../styles/components/header.css";
import { useAuth } from "../../context/AuthContext";
import productService from "../../services/productService";

const Header = () => {

  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const { searchValue, setSearchValue } = useSearch();
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggest, setLoadingSuggest] = useState(false);
  const debounceRef = useRef();
  const inputRef = useRef();
  // Xử lý tìm kiếm sản phẩm (submit)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Không chuyển trang nữa, chỉ cập nhật searchValue
    setShowSuggestions(false);
  };

  // Xử lý tìm kiếm real-time
  useEffect(() => {
    if (!searchValue.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setLoadingSuggest(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      productService
        .getProducts({ search: searchValue.trim(), limit: 5, page: 1 })
        .then((res) => {
          setSuggestions(res.data || []);
          setShowSuggestions(true);
        })
        .catch(() => setSuggestions([]))
        .finally(() => setLoadingSuggest(false));
    }, 300);
    return () => debounceRef.current && clearTimeout(debounceRef.current);
  }, [searchValue]);

  // Ẩn dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userDisplayName = user?.name || user?.fullName || user?.email || "Thành viên";
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
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

      {/* Right Section - Search, Icons & Login */}
      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Thanh tìm kiếm sản phẩm real-time */}
        <div style={{ position: 'relative' }} ref={inputRef}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: 4 }} autoComplete="off">
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc', minWidth: 160 }}
              onFocus={() => searchValue && setShowSuggestions(true)}
            />
            <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </form>
          {showSuggestions && (
            <div style={{
              position: 'absolute',
              top: '110%',
              left: 0,
              width: '100%',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: 4,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              zIndex: 100,
              maxHeight: 260,
              overflowY: 'auto',
              minWidth: 220
            }}>
              {loadingSuggest ? (
                <div style={{ padding: 12, textAlign: 'center', color: '#888' }}>Đang tìm...</div>
              ) : suggestions.length === 0 ? (
                <div style={{ padding: 12, textAlign: 'center', color: '#888' }}>Không có sản phẩm</div>
              ) : (
                suggestions.map((prod) => (
                  <div
                    key={prod.id}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearchValue("");
                      navigate(`/product/${prod.id}`);
                    }}
                  >
                    {prod.image && (
                      <img src={prod.image.startsWith('http') ? prod.image : prod.image} alt={prod.name} style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4 }} />
                    )}
                    <span style={{ fontSize: 15, color: '#222' }}>{prod.name}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <div className="icon-shopping-card relative">
          <Link to="/cart">
            <img
              src="/src/assets/images/icon-shopping-card.svg"
              alt="Shopping"
              className="header-icon-image"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
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
  );
};

export default Header;
