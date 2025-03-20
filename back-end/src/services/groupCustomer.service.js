const GroupCustomer = require('../models/groupCustomer.model');

class GroupCustomerService {
  async getAllGroupCustomers() {
    return await GroupCustomer.find();
  }

  async createGroupCustomer(data) {
    return await GroupCustomer.create(data);
  }

  async getGroupCustomerById(id) {
    return await GroupCustomer.findById(id);
  }

  async updateGroupCustomer(id, data) {
    return await GroupCustomer.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteGroupCustomer(id) {
    return await GroupCustomer.findByIdAndDelete(id);
  }

  async getPaginatedGroupCustomers(page = 1, limit = 10, search = '') {
    const skip = (page - 1) * limit;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const groupCustomers = await GroupCustomer.find(query)
      .skip(skip)
      .limit(limit)
      .exec();

    const totalRecords = await GroupCustomer.countDocuments(query);
    const totalPages = Math.ceil(totalRecords / limit);

    return {
      data: groupCustomers,
      meta: {
        total: totalRecords,
        totalPages,
        currentPage: parseInt(page),
        perPage: parseInt(limit)
      }
    };
  }
}

module.exports = new GroupCustomerService();