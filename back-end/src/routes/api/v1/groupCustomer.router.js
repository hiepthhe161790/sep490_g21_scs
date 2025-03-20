const express = require('express');
const router = express.Router();
const { GroupCustomerController } = require('../../../controllers/index');
router.get('/all', GroupCustomerController.getAllGroupCustomers);
router.post('/', GroupCustomerController.createGroupCustomer);
router.get('/:id', GroupCustomerController.getGroupCustomerById);
router.put('/:id', GroupCustomerController.updateGroupCustomer);
router.delete('/:id', GroupCustomerController.deleteGroupCustomer);
router.get('/', GroupCustomerController.getPaginatedGroupCustomers);


module.exports = router;