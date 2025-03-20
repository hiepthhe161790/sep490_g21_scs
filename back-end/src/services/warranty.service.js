const Warranty = require('../models/warranty.model');
const Product = require('../models/product.model');
const Serial = require('../models/serialProduct.model');

class WarrantyService {
    async createWarranty(data) {
        try {
            if (!data.productId) {
                throw new Error('Product is required');
            }

            const product = await Product.findById(data.productId);
            if (!product) {
                throw new Error('Product does not exist');
            }

            // const serialProduct = await Serial.findOne({ 'inStock.serialList.serialNumber': data.serialNumber });
            // if (!serialProduct) {
            //     throw new Error('Serial number does not exist');
            // }
            // const existingWarranty = await Warranty.findOne({ serialNumber: data.serialNumber });
            // if (existingWarranty) {
            //     throw new Error('Serial number already exists');
            // }
            const newWarranty = new Warranty(data);
            return await newWarranty.save();
        } catch (error) {
            throw new Error('Error creating warranty: ' + error.message);
        }
    }

    async getWarrantyById(id) {
        try {
            if (!id) {
                throw new Error('ID is required');
            }
            const warranty = await Warranty.findById(id);
            if (!warranty) {
                throw new Error('Warranty not found');
            }
            return warranty;
        } catch (error) {
            throw new Error('Error fetching warranty by ID: ' + error.message);
        }
    }

    async getAllWarranties() {
        try {
            const warranties = await Warranty.find()
                .populate({
                    path: 'productId',
                    select: 'name category brand',
                    populate: [
                        { path: 'category', select: 'name' },
                        { path: 'brand', select: 'name' }
                    ]
                })
                .lean();

            const result = warranties.map(warranty => ({
                _id: warranty._id,
                serialNumber: warranty.serialNumber,
                status: warranty.status,
                start_date: warranty.start_date,
                end_date: warranty.end_date,
                productName: warranty.productId?.name || null,
                categoryName: warranty.productId?.category?.name || null,
                brandName: warranty.productId?.brand?.name || null
            }));

            return result;
        } catch (error) {
            throw new Error('Error fetching all warranties: ' + error.message);
        }
    }

    async updateWarranty(id, data) {
        try {
            if (!id) {
                throw new Error('ID is required');
            }
            if (data.productId) {
                const product = await Product.findById(data.productId);
                if (!product) {
                    throw new Error('Product does not exist');
                }
            }
            if (data.serialNumber) {
                const serialProduct = await Serial.findOne({ 'inStock.serialList.serialNumber': data.serialNumber });
                if (!serialProduct) {
                    throw new Error('Serial number does not exist');
                }
                const existingWarranty = await Warranty.findOne({ serialNumber: data.serialNumber });
                if (existingWarranty) {
                    throw new Error('Serial number already exists');
                }
            }
            const updatedWarranty = await Warranty.findByIdAndUpdate(id, data, { new: true });
            if (!updatedWarranty) {
                throw new Error('Warranty not found');
            }
            return updatedWarranty;
        } catch (error) {
            throw new Error('Error updating warranty: ' + error.message);
        }
    }

    async deleteWarranty(id) {
        try {
            if (!id) {
                throw new Error('ID is required');
            }
            const deletedWarranty = await Warranty.findByIdAndDelete(id);
            if (!deletedWarranty) {
                throw new Error('Warranty not found');
            }
            return deletedWarranty;
        } catch (error) {
            throw new Error('Error deleting warranty: ' + error.message);
        }
    }
    async getPaginatedWarranties(page, pageSize, search, category, brand) {
        try {
            const skip = (page - 1) * pageSize;
            let filter = {};
            let productFilter = {};


            if (search) {
                filter.$or = [{ serialNumber: { $regex: search, $options: 'i' } }];
                productFilter.name = { $regex: search, $options: 'i' };
            }


            if (category) productFilter.category = category;
            if (brand) productFilter.brand = brand;


            const matchingProducts = await Product.find(productFilter).select('_id').lean();
            const matchingProductIds = matchingProducts.map(p => p._id);


            if (matchingProductIds.length > 0) {
                filter.$or.push({ productId: { $in: matchingProductIds } });
            }


            const warranties = await Warranty.find(filter)
                .populate({
                    path: 'productId',
                    select: 'name category brand',
                    populate: [
                        { path: 'category', select: 'name' },
                        { path: 'brand', select: 'name' }
                    ]
                })
                .skip(skip)
                .limit(pageSize)
                .lean();


            const totalCount = await Warranty.countDocuments(filter);


            const result = warranties.map(warranty => ({
                _id: warranty._id,
                contactInfo: warranty.contactInfo,
                serialNumber: warranty.serialNumber,
                status: warranty.status,
                start_date: warranty.start_date,
                end_date: warranty.end_date,
                productName: warranty.productId?.name || null,
                categoryName: warranty.productId?.category?.name || null,
                brandName: warranty.productId?.brand?.name || null
            }));

            return {
                data: result,
                currentPage: page,
                totalPages: Math.ceil(totalCount / pageSize),
                totalCount
            };
        } catch (error) {
            throw new Error('Error fetching paginated warranties: ' + error.message);
        }
    }


}

module.exports = new WarrantyService();