const { WarrantyService } = require('../services/index');

class WarrantyController {
    async createWarranty(req, res) {
        try {
            const warranty = await WarrantyService.createWarranty(req.body);
            res.status(201).json(warranty);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async getWarranties(req, res) {
        try {
            const warranties = await WarrantyService.getAllWarranties();
            res.status(200).json(warranties);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async getWarranty(req, res) {
        try {
            const warranty = await WarrantyService.getWarrantyById(req.params.warrantyId);
            res.status(200).json(warranty);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async getWarrantiesByProduct(req, res) {
        try {
            const warranties = await WarrantyService.getWarrantiesByProductId(req.params.productId);
            res.status(200).json(warranties);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async getWarrantiesByUser(req, res) {
       
    }

    async deleteWarranty(req, res) {
        try {
            await WarrantyService.deleteWarranty(req.params.warrantyId);
            res.json({ message: 'Warranty deleted successfully' });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async updateWarranty(req, res) {
        try {
            const warranty = await WarrantyService.updateWarranty(req.params.warrantyId, req.body);
            res.status(200).json(warranty);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    async getPaginatedWarranties(req, res) {
        try {
            const { page = 1, limit = 10, search, category, brand } = req.query;
            const warranties = await WarrantyService.getPaginatedWarranties(
                Number(page),
                Number(limit),
                search,
                category,
                brand
            );
            res.status(200).json(warranties);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
  
}
module.exports = new WarrantyController;