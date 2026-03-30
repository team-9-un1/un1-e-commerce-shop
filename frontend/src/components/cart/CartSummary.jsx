import React from 'react';
import { useCart } from '../../hooks/useCart';
import { ShoppingBag, ChevronRight } from 'lucide-react';

const CartSummary = () => {
  const { subtotal = 0, tax = 0, total = 0 } = useCart();
  const shipping = 0; // Mock shipping for now

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tight flex items-center gap-3">
        Tóm tắt đơn hàng
      </h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Tạm tính</span>
          <span className="text-gray-900 font-bold">{subtotal.toLocaleString()} VND</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Phí vận chuyển</span>
          <span className="text-green-600 font-bold uppercase text-xs bg-green-50 px-2 py-0.5 rounded-full">Miễn phí</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Thuế (VAT 10%)</span>
          <span className="text-gray-900 font-bold">{tax.toLocaleString()} VND</span>
        </div>
        
        <div className="h-px bg-gray-100 my-6"></div>
        
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Tổng cộng</span>
            <p className="text-3xl font-black text-gray-900 mt-1 leading-none">
              {total.toLocaleString()} <span className="text-sm">VND</span>
            </p>
          </div>
        </div>
      </div>

      <button className="w-full bg-black text-white rounded-full py-5 font-black text-sm uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 group">
        Thanh toán ngay
        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>

      <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-widest font-bold">
        Đảm bảo thanh toán an toàn & bảo mật
      </p>
    </div>
  );
};

export default CartSummary;
