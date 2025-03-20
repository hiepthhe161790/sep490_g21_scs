const { SerialProductService } = require("../services/index");


class serialProductController {
    createSerialProduct = async (req, res, next) => {
        try {
            const data = req.body;
            const newSerialProduct = await SerialProductService.createSerialProduct(data);
            res.status(201).json(newSerialProduct);
        } catch (error) {
            next(error);
        }
    }

    getSerialProductById = async (req, res, next) => {
        try {
            const serialProduct = await SerialProductService.getSerialProductById(req.params.id);
            res.status(200).json(serialProduct);
        } catch (error) {
            next(error);
        }
    }

    getAllSerialProducts = async (req, res, next) => {
        try {
            const serialProducts = await SerialProductService.getAllSerialProducts();
            res.status(200).json(serialProducts);
        } catch (error) {
            next(error);
        }
    }

    updateSerialProduct = async (req, res, next) => {
        try {
            const data = req.body;
            const updatedSerialProduct = await SerialProductService.updateSerialProduct(req.params.id, data);
            res.status(200).json(updatedSerialProduct);
        } catch (error) {
            next(error);
        }
    }

    deleteSerialProduct = async (req, res, next) => {
        try {
            await SerialProductService.deleteSerialProduct(req.params.id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
    getFilteredSerialProducts = async (req, res, next) => {
        try {
            const { page = 1, limit = 6, startDate, endDate, sold, warranty, search } = req.query;
            const serialProducts = await SerialProductService.getFilteredSerialNumberProducts(
                Number(page),
                Number(limit),
                startDate,
                endDate,
                sold,
                warranty,
                search
            );
            res.status(200).json(serialProducts);
        } catch (error) {
            next(error);
        }
    }
    getSerialProductByProductId = async (req, res, next) => {
        try {
            const serialProduct = await SerialProductService.getSerialProductByProductId(req.params.productId);
            res.status(200).json(serialProduct);
        } catch (error) {
            next(error);
        }
    }
    async updateProductStock(req, res, next) {
        try {
            const { productId } = req.params;
            const result = await SerialProductService.updateProductStockBySerials(productId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async checkProductSerialToRegister(req, res, next) {
        try {
            const { serial } = req.params;
            const response = await SerialProductService.checkProductSerialToRegisterService(serial);
            if (response) {
                res.status(200).json({
                    status: 200,
                    data: response
                });
            } else {
                res.status(404).json({
                    status: res.status,
                    message: "Không tìm thấy serial trong hệ thống!"
                });
            }
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new serialProductController;