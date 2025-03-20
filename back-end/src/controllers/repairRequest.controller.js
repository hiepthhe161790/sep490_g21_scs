const { RepairRequestService } = require('../services/index');

class RepairRequestController {
    async createRepairRequest(req, res, next) {
        try {
            const repairRequest = await RepairRequestService.createRepairRequest(req.body);
            res.status(201).json(repairRequest);
        } catch (error) {
            next(error);
        }
    }

    async getRepairRequestById(req, res, next) {
        try {
            const repairRequest = await RepairRequestService.getRepairRequestById(req.params.id);
            res.status(200).json(repairRequest);
        } catch (error) {
            next(error);
        }
    }

    async getAllRepairRequests(req, res, next) {
        try {
            const repairRequests = await RepairRequestService.getAllRepairRequests();
            res.status(200).json(repairRequests);
        } catch (error) {
            next(error);
        }
    }

    async updateRepairRequest(req, res, next) {
        try {
            const repairRequest = await RepairRequestService.updateRepairRequest(req.params.id, req.body);
            res.status(200).json(repairRequest);
        } catch (error) {
            next(error);
        }
    }

    async deleteRepairRequest(req, res, next) {
        try {
            await RepairRequestService.deleteRepairRequest(req.params.id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    async createRepairRequestByCustomer(req, res, next) {
        try {
            const data = req.body
            if (!data.products || !Array.isArray(data.products) || data.products.length === 0) {
                return {
                    status: 422,
                    message: "Cần ít nhất 1 sản phẩm để tạo yêu cầu!"
                }
            } else {
                if (!data.customerInfo || Object.values(data.customerInfo).some(value => value === null || value === undefined)) {
                    return {
                        status: 422,
                        message: "Thiếu thông tin người dùng"
                    }
                } else {
                    const response = await RepairRequestService.createRepairRequestByCustomerService(req.body)
                    return res.status(response.status).json(response)
                }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new RepairRequestController();