import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthLayout title={isLogin ? 'Đăng Nhập' : 'Đăng Ký Thành Viên'}>
      <div className="mb-4">
        {/* Placeholder for forms */}
        <p className="text-center text-gray-600 mb-4">
          {isLogin ? 'Vui lòng đăng nhập để tiếp tục' : 'Tạo tài khoản mới'}
        </p>
        
        {/* Form content will go here */}
        
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
