// src/pages/Auth.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import '../styles/Auth.css'; // Import file CSS

const Auth = ({ mode = 'login' }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(mode !== 'register');

  useEffect(() => {
    setIsLogin(mode !== 'register');
  }, [mode]);

  const handleSwitchToRegister = () => {
    setIsLogin(false);
    navigate('/register');
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="logo">un 1</div>
        <div className="page-title">
            {isLogin ? "Sign In" : "Create Account"}
        </div>
      </div>

      <div className="auth-card">
        {isLogin ? (
          <LoginForm onSwitchToRegister={handleSwitchToRegister} />
        ) : (
          <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
        )}
      </div>
    </div>
  );
};

export default Auth;