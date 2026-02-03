import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import LoginForm from '../components/LoginForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthLayout title={isLogin ? 'Đăng Nhập' : 'Đăng Ký Thành Viên'}>
      <div className="mb-4">
        <p className="text-center text-gray-600 mb-6">
          {isLogin ? 'Vui lòng đăng nhập để tiếp tục' : 'Tạo tài khoản mới'}
        </p>
        
        {isLogin ? (
            <LoginForm />
        ) : (
            <div className="text-center py-8 bg-gray-50 rounded border border-dashed border-gray-300">
                <p>Register Form Component (Coming Soon)</p>
            </div>
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
