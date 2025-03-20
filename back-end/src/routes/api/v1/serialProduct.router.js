const express = require('express');
const router = express.Router();
const { SerialProductController } = require('../../../controllers/index');
const AuthMiddleware = require('../../../middlewares/auth.middleware');

router.post('/create_serial_product', SerialProductController.createSerialProduct);
router.get('/get_all_serial_products', SerialProductController.getAllSerialProducts);
// router.get('/get_serial_products', SerialProductController.getSerialProducts);
router.get('/get_serial_product/:id', SerialProductController.getSerialProductById);
router.put('/update_serial_product/:serialProductId', SerialProductController.updateSerialProduct);
router.delete('/delete_serial_product/:serialProductId', SerialProductController.deleteSerialProduct);
router.get('/get_filtered_serial_products', SerialProductController.getFilteredSerialProducts);
router.get('/get_serial_by_productId/:productId', SerialProductController.getSerialProductByProductId);
router.put('/update-product-stock/:productId', SerialProductController.updateProductStock);

//Check serial if it exist
router.get("/check-serial/:serial", SerialProductController.checkProductSerialToRegister)

module.exports = router;