import api from './api';


const productService = {
    getCategories: async () => {
      const response = await api.get('/categories');
      // Trả về mảng object { id, name }
      return response.data;
    },
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  addProduct: async (data) => {
    const response = await api.post('/products', data);
    return response.data;
  },

  editProduct: async (id, data) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

export default productService;
