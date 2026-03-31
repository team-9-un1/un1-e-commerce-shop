export const OrderStatus = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    SHIPPING: 'SHIPPING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
};

export const ORDER_STATUS_FILTER_OPTIONS = [
    { value: 'ALL', label: 'Tất cả' },
    { value: OrderStatus.PENDING, label: 'Chờ xác nhận' },
    { value: OrderStatus.PROCESSING, label: 'Đang xử lý' },
    { value: OrderStatus.SHIPPING, label: 'Đang giao' },
    { value: OrderStatus.COMPLETED, label: 'Hoàn thành' },
    { value: OrderStatus.CANCELLED, label: 'Đã huỷ' },
];
