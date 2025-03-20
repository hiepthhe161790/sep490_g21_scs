const RepairRequest = require('../models/repairRequest.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const Warranty = require('../models/warranty.model');

class RepairRequestService {
    async createRepairRequest(data) {
        // Validate customerId
        if (!data.customerId) {
            throw new Error('Customer ID is required');
        }
        const customer = await User.findById(data.customerId);
        if (!customer) {
            throw new Error('Customer not found');
        }

        // Validate assignedTechnicianId
        if (data.assignedTechnicianId) {
            const technician = await User.findById(data.assignedTechnicianId);
            if (!technician) {
                throw new Error('Assigned technician not found');
            }
        }

        // Validate products
        if (!data.products || !Array.isArray(data.products) || data.products.length === 0) {
            throw new Error('At least one product is required');
        }
        for (const product of data.products) {
            const productData = await Product.findById(product.productId);
            if (!productData) {
                throw new Error(`Product with ID ${product.productId} not found`);
            }
            if (product.warrantyId) {
                const warranty = await Warranty.findById(product.warrantyId);
                if (!warranty) {
                    throw new Error(`Warranty with ID ${product.warrantyId} not found`);
                }
            }
        }

        // Validate pay
        if (!data.pay || typeof data.pay.totalAmount !== 'number' || data.pay.totalAmount <= 0) {
            throw new Error('Total amount must be a positive number');
        }

        const repairRequest = new RepairRequest(data);
        return await repairRequest.save();
    }

    async getRepairRequestById(id) {
        return await RepairRequest.findById(id)
            .populate('customerId')
            .populate('assignedTechnicianId')
            .populate('products.productId')
            .populate('products.warrantyId')
            .populate('repairRecords');
    }

    async getAllRepairRequests() {
        return await RepairRequest.find()
            .populate('customerId')
            .populate('assignedTechnicianId')
            .populate('products.productId')
            .populate('products.warrantyId')
            .populate('repairRecords');
    }

    async updateRepairRequest(id, data) {
        return await RepairRequest.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteRepairRequest(id) {
        return await RepairRequest.findByIdAndDelete(id);
    }

    async createRepairRequestByCustomerService(data) {
        try {
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
                    const request = new RepairRequest(data);
                    await request.save()
                    return {
                        status: 201,
                        message: "Tạo yêu cầu thành công"
                    }
                }
            }
        } catch (error) {
            return {
                status: 500,
                message: error.message
            }
        }
    }
}

module.exports = new RepairRequestService();