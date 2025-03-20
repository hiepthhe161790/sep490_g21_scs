const express = require('express');
const router = express.Router();
const { OrderController } = require('../../../controllers/index');
const AuthMiddleware = require('../../../middlewares/auth.middleware');

/**
 * Định nghĩa các router ở đây theo feature
 * router.get('<router>', OrderController.<Method>);
 * router.post('<router>', OrderController.<Method>);
 * VD: router.get('/view-all-order')
 */
router.post('/create_order', OrderController.createOrder);
router.post('/create_payment_url', OrderController.createPaymentUrl);
router.get('/vnpay_return_url', OrderController.vnpayReturnUrl);
router.get('/orders/top-selling-products', OrderController.getTopSellingProducts);

router.get('/user/:userId', OrderController.getOrdersByUserId);
router.put('/update_order/:orderId', OrderController.updateOrder);
router.get('/detail_order/:orderId', OrderController.getOrder);
router.get('/', OrderController.getOrders);
router.delete('/delete_order/:orderId', OrderController.deleteOrder);

// Admin
router.get('/get-paginated-orders', OrderController.getPaginatedAllOrders);
router.get('/get-profit',  OrderController.getProfitByMonth);
router.get('/get-all-profits',  OrderController.getAllProfitsByYear);
router.get('/export-profits',  OrderController.exportProfitsByYear);
router.post('/create_order_payos', OrderController.createOrderPayOS);
router.get('/payos-callback', OrderController.handlePayOSCallback);
module.exports = router;