import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '20px 40px',
      borderBottom: '1px solid #eee'
    }}>
      {/* Menu bên trái */}
      <nav style={{ display: 'flex', gap: '25px', fontWeight: 'bold', fontSize: '14px', color: '#666' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>SHOP</Link>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>NAM</Link>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>NỮ</Link>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>SALE</Link>
      </nav>

      {/* Logo ở giữa */}
      <div style={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 'bold' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>un 1</Link>
      </div>

      {/* Icon bên phải */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {/* Giả lập icon giỏ hàng và tim bằng ký tự */}
        <span style={{ fontSize: '20px', cursor: 'pointer' }}>🛒</span>
        <span style={{ fontSize: '20px', cursor: 'pointer' }}>♡</span>
        <span style={{ fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>Đăng Nhập</span>
      </div>
    </header>
  );
};

export default Header;