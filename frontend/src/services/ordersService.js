const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const buildHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const normalizeStatus = (status) => {
  if (!status) {
    return "PENDING";
  }

  const normalized = String(status).trim().toUpperCase();

  if (["PENDING", "WAITING", "CHO_XAC_NHAN"].includes(normalized)) {
    return "PENDING";
  }

  if (["PROCESSING", "IN_PROGRESS", "DANG_XU_LY"].includes(normalized)) {
    return "PROCESSING";
  }

  if (["SHIPPING", "DELIVERING", "DANG_GIAO"].includes(normalized)) {
    return "SHIPPING";
  }

  if (["COMPLETED", "SUCCESS", "DELIVERED", "HOAN_THANH"].includes(normalized)) {
    return "COMPLETED";
  }

  if (["CANCELLED", "CANCELED", "FAILED", "HUY"].includes(normalized)) {
    return "CANCELLED";
  }

  return normalized;
};

const normalizeOrder = (order) => {
  const items = Array.isArray(order?.items) ? order.items : [];
  const firstItem = items[0] || null;

  const itemCount =
    order?.itemCount ||
    items.reduce((total, item) => total + Number(item?.quantity || 0), 0) ||
    items.length;

  const totalAmount =
    Number(order?.totalCents ?? order?.totalAmount ?? order?.total ?? order?.amount ?? order?.grandTotal ?? 0) || 0;

  return {
    id: String(order?.id || order?._id || order?.orderId || ""),
    orderNumber: order?.orderNumber || order?.code || `#${order?.id || order?._id || ""}`,
    date: order?.createdAt || order?.date || order?.orderDate || new Date().toISOString(),
    status: normalizeStatus(order?.status),
    totalAmount,
    items,
    itemCount,
    firstItemThumbnail:
      firstItem?.image ||
      firstItem?.thumbnail ||
      firstItem?.product?.image ||
      firstItem?.product?.thumbnail ||
      null,
  };
};

const parseOrdersPayload = async (response) => {
  const payload = await response.json();

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.orders)) {
    return payload.orders;
  }

  return [];
};

const getOrders = async ({ status, token }) => {
  const query = new URLSearchParams();

  if (status && status !== "ALL") {
    query.set("status", status);
  }

  const suffix = query.toString() ? `?${query.toString()}` : "";
  const response = await fetch(`${API_BASE_URL}/orders${suffix}`, {
    method: "GET",
    headers: buildHeaders(token),
  });

  if (!response.ok) {
    throw new Error("Không thể tải lịch sử đơn hàng.");
  }

  const orders = await parseOrdersPayload(response);
  return orders.map(normalizeOrder);
};

const getOrderById = async ({ id, token }) => {
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "GET",
    headers: buildHeaders(token),
  });

  if (response.ok) {
    const payload = await response.json();
    const order = payload?.data || payload?.order || payload;
    return normalizeOrder(order);
  }

  // Fallback when backend does not expose /orders/:id.
  const orders = await getOrders({ token });
  return orders.find((order) => order.id === String(id)) || null;
};

export const ordersService = {
  getOrders,
  getOrderById,
};
