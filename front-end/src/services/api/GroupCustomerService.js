import api from '../index';
import { handleApiCall } from '../../utils/handleApi';

const GroupCustomerService = {
  getAllGroupCustomers: async () => {
    return handleApiCall(() => api.get('/group-customer/all'));
  },


  createGroupCustomer: async (data) => {
    return handleApiCall(() => api.post('/group-customer', data));
  },

  getGroupCustomerById: async (id) => {
    return handleApiCall(() => api.get(`/group-customer/${id}`));
  },

  updateGroupCustomer: async (id, data) => {
    return handleApiCall(() => api.put(`/group-customer/${id}`, data));
  },

  deleteGroupCustomer: async (id) => {
    return handleApiCall(() => api.delete(`/group-customer/${id}`));
  },

  getPaginatedGroupCustomers: async (params) => {
    return handleApiCall(() => api.get('/group-customer', { params }));
  }
};

export default GroupCustomerService;