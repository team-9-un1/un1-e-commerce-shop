import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#e5e5e5', padding: '50px 40px', marginTop: '50px', fontSize: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Cột Logo */}
        <div style={{ fontSize: '40px', fontStyle: 'italic', fontWeight: 'bold' }}>un 1</div>

        {/* Cột About Uni */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase' }}>About Uni</h4>
          <span>about us</span>
          <span>delivery</span>
          <span>careers at uni</span>
        </div>

        {/* Cột Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase' }}>Contact</h4>
          <span>uni2026@gmail.com</span>
          <span>84+ 0312345678</span>
        </div>

        {/* Cột Return Policy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase' }}>Return Policy</h4>
          <span>Sales Policy</span>
          <span>Shipping & Delivery Policy</span>
          <span>Returns & Refunds Policy</span>
          <span>Exchange Policy</span>
        </div>

        {/* Cột Đăng ký */}
        <div>
          <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Đăng ký thành viên</h4>
          <div style={{ display: 'flex' }}>
            <input type="email" placeholder="Email của bạn" style={{ padding: '8px', border: 'none' }} />
            <button style={{ backgroundColor: '#333', color: 'white', border: 'none', padding: '8px 15px' }}>Đăng ký</button>
          </div>
          <div style={{ marginTop: '10px' }}>Bạn đã có tài khoản →</div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px', opacity: 0.6 }}>@2026 UNI</div>
    </footer>
  );
};

export default Footer;