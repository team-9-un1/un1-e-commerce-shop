import api from './api';

const healthService = {
  getHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default healthService;
