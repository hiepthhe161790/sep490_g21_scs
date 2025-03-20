const express = require('express');
const router = express.Router();
const { WarrantyController } = require('../../../controllers/index');
const AuthMiddleware = require('../../../middlewares/auth.middleware');

router.post('/create_warranty', WarrantyController.createWarranty);
router.get('/get_warranties', WarrantyController.getWarranties);
router.get('/get_warranty/:warrantyId', WarrantyController.getWarranty);
router.get('/get_warranties_by_product/:productId', WarrantyController.getWarrantiesByProduct);
router.get('/get_warranties_by_user/:userId', WarrantyController.getWarrantiesByUser);
router.put('/update_warranty/:warrantyId', WarrantyController.updateWarranty);
router.delete('/delete_warranty/:warrantyId', WarrantyController.deleteWarranty);
router.get('/get-paginated-warranties', WarrantyController.getPaginatedWarranties);

module.exports = router;