const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const ERROR_MESSAGES = {
  400: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.",
  401: "Email hoặc mật khẩu không đúng.",
  403: "Bạn không có quyền thực hiện thao tác này.",
  404: "Không tìm thấy tài nguyên yêu cầu.",
  409: "Email đã được đăng ký. Vui lòng dùng email khác.",
  422: "Thông tin chưa hợp lệ. Vui lòng kiểm tra lại.",
  500: "Hệ thống đang bận. Vui lòng thử lại sau.",
};

const normalizeAuthPayload = (payload) => {
  const source = payload?.data || payload || {};
  const token = source.token || source.accessToken || source.jwt || null;

  const user =
    source.user ||
    source.profile ||
    (source.id || source.email
      ? {
          id: source.id,
          email: source.email,
          name: source.name || source.fullName || source.username,
        }
      : null);

  return { token, user };
};

const toErrorMessage = async (response) => {
  let backendMessage = "";

  try {
    const payload = await response.json();
    backendMessage = payload?.message || payload?.error || payload?.errors?.[0]?.message || "";
  } catch {
    backendMessage = "";
  }

  return backendMessage || ERROR_MESSAGES[response.status] || "Có lỗi xảy ra, vui lòng thử lại.";
};

const post = async (endpoint, body) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const message = await toErrorMessage(response);
    throw new Error(message);
  }

  return response.json();
};

export const authService = {
  async login(credentials) {
    const payload = await post("/auth/login", credentials);
    return normalizeAuthPayload(payload);
  },

  async register(registerData) {
    const payload = await post("/auth/register", registerData);
    return normalizeAuthPayload(payload);
  },
};
