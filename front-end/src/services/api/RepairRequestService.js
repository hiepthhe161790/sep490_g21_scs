import api from '../index';
import { handleApiCall } from '../../utils/handleApi';

class RepairRequestService {
    createRepairRequest = async (data) => {
        return handleApiCall(() => api.post('/repair-request', data));
    };

    getRepairRequestById = async (id) => {
        return handleApiCall(() => api.get(`/repair-request/${id}`));
    };

    getAllRepairRequests = async () => {
        return handleApiCall(() => api.get('/repair-request'));
    };

    updateRepairRequest = async (id, data) => {
        return handleApiCall(() => api.put(`/repair-request/${id}`, data));
    };

    deleteRepairRequest = async (id) => {
        return handleApiCall(() => api.delete(`/repair-request/${id}`));
    };
    createRepairRequestByCustomer = async (data) => {
        return handleApiCall(() => api.post("/repair-request/create-by-customer", data))
    }
}

export default new RepairRequestService();