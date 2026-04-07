import React from 'react';
import { ORDER_STATUS_FILTER_OPTIONS } from '../../pages/orders/orderTypes';

const OrderFilter = ({ status, onStatusChange, searchQuery, onSearchChange }) => {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="relative w-full max-w-[320px] shrink-0">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="tìm kiếm mã đơn, tên sản phẩm"
            className="w-full rounded-full bg-[#dcdcdc] border border-gray-300 py-2.5 pl-11 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-500"
          />
      </div>

      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto whitespace-nowrap pb-1">
        {ORDER_STATUS_FILTER_OPTIONS.map((option) => {
          const isActive = status === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onStatusChange(option.value)}
              className={`min-w-[70px] rounded-sm border px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-sky-500 text-white border-sky-500'
                  : 'bg-[#dcdcdc] text-gray-700 border-gray-300'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrderFilter;
