import api from '../index';
import { handleApiCall } from '../../utils/handleApi';

const SerialProductService = {
    getSerials: async (params) => {
        return handleApiCall(() => api.get('/serial-product/get_all_serial_products', { params }));
    },
    getSerialByProductId: async (productId) => {
        return handleApiCall(() => api.get(`/serial-product/get_serial_by_productId/${productId}`));
    },
    createSerial: async (data) => {
        return handleApiCall(() => api.post('/serial-product/create_serial_product', data));
    },
    updateSerial: async (id, data) => {
        return handleApiCall(() => api.put(`/serial-product/update_serial_product/${id}`, data));
    },
    deleteSerial: async (id) => {
        return handleApiCall(() => api.delete(`/serial-product/delete_serial_product/${id}`));
    },
    getFilteredSerialNumberProducts: async (params) => {
        return handleApiCall(() => api.get('/serial-product/get_filtered_serial_products', { params }));
    },
    checkProductSerialToRegister: async (serial) => {
        return handleApiCall(() => api.get(`/serial-product/check-serial/${serial}`))
    }
};

export default SerialProductService;
