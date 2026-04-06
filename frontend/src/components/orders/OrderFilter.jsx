import React from 'react';
import { ORDER_STATUS_FILTER_OPTIONS } from '../../pages/orders/orderTypes';

const OrderFilter = ({ status, onStatusChange }) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex justify-end">
      <div className="w-full sm:w-64">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 text-sm cursor-pointer outline-none focus:ring-2 focus:ring-blue-500"
        >
          {ORDER_STATUS_FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default OrderFilter;
