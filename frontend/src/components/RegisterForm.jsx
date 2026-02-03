import React from 'react';
import { useForm } from 'react-hook-form';

const RegisterForm = ({ onSwitchToLogin }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Register Data:", data);
    // TODO: Implement actual registration logic
    alert("Đăng ký thành công! (Demo)");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="Nhập email của bạn"
          {...register("email", { 
            required: "Email là bắt buộc", 
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email không hợp lệ"
            }
          })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
        <input
          type="password"
          placeholder="Tạo mật khẩu"
          {...register("password", { 
            required: "Mật khẩu là bắt buộc",
            minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự"
            }
          })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          {...register("confirmPassword", { 
            required: "Vui lòng xác nhận mật khẩu",
            validate: value => value === password || "Mật khẩu không khớp"
          })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Đăng ký
      </button>
    </form>
  );
};

export default RegisterForm;
