import api from '../index';
import { handleApiCall } from '../../utils/handleApi';

const WarrantyService = {
    getWarranties: async (params) => {
        return handleApiCall(() => api.get('/warranty/get_all_warranties', { params }));
    },
    getWarrantyBySerialId: async (serialId) => {
        return handleApiCall(() => api.get(`/warranty/get_warranty_by_serialId/${serialId}`));
    },
    createWarranty: async (data) => {
        return handleApiCall(() => api.post('/warranty/create_warranty', data));
    },
    updateWarranty: async (id, data) => {
        return handleApiCall(() => api.put(`/warranty/update_warranty/${id}`, data));
    },
    deleteWarranty: async (id) => {
        return handleApiCall(() => api.delete(`/warranty/delete_warranty/${id}`));
    },
    getFilteredWarrantyProducts: async (params) => {
        return handleApiCall(() => api.get('/warranty/get_filtered_warranties', { params }));
    }
};

export default WarrantyService;