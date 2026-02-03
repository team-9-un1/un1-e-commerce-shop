import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthLayout title={isLogin ? 'Đăng Nhập' : 'Đăng Ký Thành Viên'}>
      <div className="mb-4">
        <p className="text-center text-gray-600 mb-6">
          {isLogin ? 'Vui lòng đăng nhập để tiếp tục' : 'Tạo tài khoản mới'}
        </p>
        
        {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
        
        <div className="mt-6 text-center">
            {isLogin ? (
                <p>
                    Bạn chưa có tài khoản?{' '}
                    <button 
                        className="text-blue-600 hover:underline"
                        onClick={() => setIsLogin(false)}
                    >
                        Đăng ký ngay
                    </button>
                </p>
            ) : (
                <p>
                    Bạn đã có tài khoản?{' '}
                    <button 
                        className="text-blue-600 hover:underline"
                        onClick={() => setIsLogin(true)}
                    >
                        Đăng nhập
                    </button>
                </p>
            )}
        </div>
      </div>
    </AuthLayout>
  );
};

export default Auth;
