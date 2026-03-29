// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginForm = ({ onSwitchToRegister }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const onSubmit = async (data) => {
    setSubmitError('');

    try {
      await login({
        email: data.email,
        password: data.password,
      });

      navigate('/');
    } catch (error) {
      setSubmitError(error.message || 'Không thể đăng nhập. Vui lòng thử lại.');
    }
  };

  return (
    <div className="login-layout">
      {/* Left Side: Login Form */}
      <div className="left-panel">
        <h2>Đăng Nhập Thành Viên</h2>
        <p className="helper-text">Đăng nhập bằng địa chỉ email và mật khẩu của bạn</p>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {submitError && <p className="error-message">{submitError}</p>}

          <div className="form-group">
            <label className="form-label">Địa Chỉ Email* :</label>
            <input 
              className="form-input"
              placeholder="Nhập địa chỉ hợp lệ"
              {...register("email", { 
                required: "Email là bắt buộc",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email không hợp lệ"
                }
              })} 
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Mật Khẩu* :</label>
            <input 
              type={showPassword ? "text" : "password"}
              className="form-input"
              {...register("password", { required: "Mật khẩu là bắt buộc" })} 
            />
             {errors.password && <p className="error-message">{errors.password.message}</p>}
            
            <p className="helper-text">
              Mật khẩu phải có từ 8 đến 20 kí tự bao gồm cả chữ và số. 
              Có thể sử dụng các ký hiệu sau !@#$%^&*()
            </p>
          </div>

          <div className="checkbox-group">
            <input 
              type="checkbox" 
              id="showPassLogin" 
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassLogin">Hiện Mật Khẩu</label>
          </div>

          <div className="link-group">
            <a href="#" className="link-text">Điều Khoản Sử Dụng</a>
            <a href="#" className="link-text">Chính Sách Bảo Mật</a>
          </div>

          <button type="submit" className="btn-black" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </button>
          
          <div style={{marginTop: '15px'}}>
             <a href="#" className="link-text">Quên Mật Khẩu?</a>
          </div>
        </form>
      </div>

      {/* Right Side: Switch to Register */}
      <div className="right-panel">
        <h2>Tạo Tài Khoản</h2>
        <p style={{marginBottom: '20px'}}>
          Hãy tạo tài khoản ngay! Bạn có thể nhận được các dịch vụ đặc biệt cho riêng bạn...
        </p>
        <button className="btn-black" onClick={onSwitchToRegister}>
          Tạo Tài Khoản
        </button>
      </div>
    </div>
  );
};

export default LoginForm;