
const {GroupCustomerService} = require('../services/index');
class GroupCustomerController {
    getAllGroupCustomers = async (req, res, next) => {
        try {
        const groupCustomers = await GroupCustomerService.getAllGroupCustomers();
        res.json(groupCustomers);
        } catch (error) {
        next(error);
        }
    }

    createGroupCustomer = async (req, res, next) => {
        try {
        const groupCustomer = await GroupCustomerService.createGroupCustomer(req.body);
        res.status(201).json(groupCustomer);
        } catch (error) {
        next(error);
        }
    }
    
    getGroupCustomerById = async (req, res, next) => {
        try {
        const groupCustomer = await GroupCustomerService.getGroupCustomerById(req.params.id);
        res.json(groupCustomer);
        } catch (error) {
        next(error);
        }
    }
    
    updateGroupCustomer = async (req, res, next) => {
        try {
        const groupCustomer = await GroupCustomerService.updateGroupCustomer(req.params.id, req.body);
        res.json(groupCustomer);
        } catch (error) {
        next(error);
        }
    }
    
    deleteGroupCustomer = async (req, res, next) => {
        try {
        await GroupCustomerService.deleteGroupCustomer(req.params.id);
        res.status(204).json();
        } catch (error) {
        next(error);
        }
    }
    
    getPaginatedGroupCustomers = async (req, res, next) => {
        try {
        const { page, limit, search } = req.query;
        const groupCustomers = await GroupCustomerService.getPaginatedGroupCustomers(page, limit, search);
        res.json(groupCustomers);
        } catch (error) {
        next(error);
        }
    }
  
}

module.exports = new GroupCustomerController;