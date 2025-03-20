const express = require('express');
const router = express.Router();
const { RepairRequestController } = require('../../../controllers/index');

router.post('/', RepairRequestController.createRepairRequest);
router.get('/:id', RepairRequestController.getRepairRequestById);
router.get('/', RepairRequestController.getAllRepairRequests);
router.put('/:id', RepairRequestController.updateRepairRequest);
router.delete('/:id', RepairRequestController.deleteRepairRequest);
router.post("/create-by-customer", RepairRequestController.createRepairRequestByCustomer)

module.exports = router;