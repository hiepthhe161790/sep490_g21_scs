const SerialProduct = require('../models/serialProduct.model');
const Product = require('../models/product.model');
const Warranty = require('../models/warranty.model');
const Category = require('../models/category.model');
class SerialProductService {
    async createSerialProduct(data) {
        try {
            if (!data.productId) {
                throw new Error('Product is required');
            }
            const product = await Product.findById(data.productId);
            if (!product) {
                throw new Error('Product does not exist');
            }
            // const newSerials = data.serialList.map(serial => serial.serialNumber);
            let existingSerialProduct = await SerialProduct.findOne({ productId: data.productId });
            if (existingSerialProduct) {
                const existingSerialNumbers = existingSerialProduct.serialList.map(serial => serial.serialNumber);
                const uniqueSerials = data.serialList.filter(serial =>
                    !existingSerialNumbers.includes(serial.serialNumber)
                );

                if (uniqueSerials.length === 0) {
                    throw new Error('All serial numbers already exist');
                }

                existingSerialProduct.serialList.push(...uniqueSerials);
                return await existingSerialProduct.save();
            }

            const newSerialProduct = new SerialProduct({
                productId: data.productId,
                serialList: data.serialList
            });

            return await newSerialProduct.save();
        } catch (error) {
            throw new Error('Error creating serial product: ' + error.message);
        }
    }


    async getSerialProductById(id) {
        try {
            if (!id) {
                throw new Error('ID is required');
            }
            const serialProduct = await SerialProduct.findById(id)
                .populate({ path: 'productId', select: 'name' })
                .select('createdAt serialList')
                .lean();
            if (!serialProduct) {
                throw new Error('Empty serial product');
            }

            const serialNumbers = serialProduct.serialList.map(serial => serial.serialNumber);
            const warranties = await Warranty.find({ serialNumber: { $in: serialNumbers } })
                .select('serialNumber start_date')
                .lean();

            const warrantyMap = new Map();
            warranties.forEach(warranty => {
                warrantyMap.set(warranty.serialNumber, warranty.start_date);
            });

            const result = serialProduct.serialList.map(serial => ({
                serialNumber: serial.serialNumber,
                sold: serial.sold,
                productName: serialProduct.productId ? serialProduct.productId.name : null,
                createdAt: serialProduct.createdAt,
                warrantyStartDate: warrantyMap.get(serial.serialNumber) || null
            }));
            return result;
        } catch (error) {
            throw new Error('Error fetching serial product by ID: ' + error.message);
        }
    }
    async getSerialProductByProductId(productId) {
        try {
            if (!productId) {
                throw new Error('Product ID is required');
            }
            const serialProduct = await SerialProduct.findOne({ productId })
                .populate({ path: 'productId', select: 'name' })
                .select('createdAt updatedAt serialList')
                .lean();
            if (!serialProduct) {
                throw new Error('Serial product not found');
            }

            const serialNumbers = serialProduct.serialList.map(serial => serial.serialNumber);
            const warranties = await Warranty.find({ serialNumber: { $in: serialNumbers } })
                .select('serialNumber start_date')
                .lean();

            const warrantyMap = new Map();
            warranties.forEach(warranty => {
                warrantyMap.set(warranty.serialNumber, warranty.start_date);
            });

            const result = serialProduct.serialList.map(serial => ({
                serialNumber: serial.serialNumber,
                sold: serial.sold,
                productName: serialProduct.productId ? serialProduct.productId.name : null,
                createdAt: serialProduct.createdAt,
                updatedAt: serialProduct.updatedAt,
                warrantyStartDate: warrantyMap.get(serial.serialNumber) || null
            }));
            return result;
        } catch (error) {
            throw new Error('Error fetching serial product by product ID: ' + error.message);
        }
    }
    async getAllSerialProducts() {
        try {
            const serialProducts = await SerialProduct.find()
                .populate({ path: 'productId', select: 'name' })
                .select('createdAt serialList')
                .lean();

            const result = serialProducts.flatMap(product =>
                product.serialList.map(serial => ({
                    serialNumber: serial.serialNumber,
                    sold: serial.sold,
                    productName: product.productId ? product.productId.name : null,
                    createdAt: product.createdAt
                }))
            );

            return result;
        } catch (error) {
            throw new Error('Error fetching all serial products: ' + error.message);
        }
    }

    async updateSerialProduct(id, data) {
        try {
            if (!id) {
                throw new Error('ID is required');
            }
            if (data.productId && !data.productId.trim()) {
                throw new Error('Product cannot be empty');
            }
            if (data.productId) {
                const product = await Product.findById(data.productId);
                if (!product) {
                    throw new Error('Product does not exist');
                }
            }

            if (data.serialList) {
                for (const serial of data.serialList) {
                    const existingSerial = await SerialProduct.findOne({ 'serialList.serialNumber': serial.serialNumber });
                    if (existingSerial && existingSerial._id.toString() !== id) {
                        throw new Error('Serial number must be unique');
                    }
                }
            }

            const updatedSerialProduct = await SerialProduct.findByIdAndUpdate(id, data, { new: true });
            if (!updatedSerialProduct) {
                throw new Error('Serial product not found');
            }
            return updatedSerialProduct;
        } catch (error) {
            throw new Error('Error updating serial product: ' + error.message);
        }
    }

    async deleteSerialProduct(id) {
        try {
            if (!id) {
                throw new Error('ID is required');
            }
            const deletedSerialProduct = await SerialProduct.findByIdAndDelete(id);
            if (!deletedSerialProduct) {
                throw new Error('Serial product not found');
            }
            return deletedSerialProduct;
        } catch (error) {
            throw new Error('Error deleting serial product: ' + error.message);
        }
    }

    async getFilteredSerialNumberProducts(page, limit, startDate, endDate, sold, warranty, search) {
        try {
            const serialProducts = await SerialProduct.find()
                .populate({ path: 'productId', select: 'modelNumber name category warrantyPeriod' })
                .select('createdAt serialList')
                .lean();

            let serialNumberList = serialProducts.flatMap(product =>
                product.serialList.map(serial => ({
                    serialNumber: serial.serialNumber,
                    sold: serial.sold,
                    inch: serial.inch,
                    modelNumber: product.productId ? product.productId.modelNumber : null,
                    createdAt: product.createdAt,
                    productId: product.productId ? product.productId._id : null,
                    warrantyPeriod: product.productId ? product.productId.warrantyPeriod : null,
                    categoryId: product.productId ? product.productId.category : null,
                    productName: product.productId ? product.productId.name : null
                }))
            );

            if (startDate && endDate) {
                const start = new Date(new Date(startDate).setHours(0, 0, 0, 0));
                const end = new Date(new Date(endDate).setHours(23, 59, 59, 999));
                serialNumberList = serialNumberList.filter(serial =>
                    serial.createdAt >= start && serial.createdAt <= end
                );
            }

            if (sold !== undefined && sold !== '') {
                const soldBoolean = sold === 'true' || sold === true;
                serialNumberList = serialNumberList.filter(serial => serial.sold === soldBoolean);
            }

            const serialNumbers = serialNumberList.map(serial => serial.serialNumber);

            const warranties = await Warranty.find({ serialNumber: { $in: serialNumbers } })
                .select('serialNumber status start_date end_date _id')
                .lean();

            const categories = await Category.find({ _id: { $in: serialNumberList.map(s => s.categoryId) } })
                .select('name')
                .lean();

            const warrantyMap = new Map();
            warranties.forEach(warranty => {
                warrantyMap.set(warranty.serialNumber, warranty);
            });

            const categoryMap = new Map();
            categories.forEach(category => {
                categoryMap.set(category._id.toString(), category.name);
            });

            serialNumberList = serialNumberList.map(serial => {
                const warranty = warrantyMap.get(serial.serialNumber);
                return {
                    serialNumber: serial.serialNumber,
                    sold: serial.sold,
                    createdAt: serial.createdAt,
                    productName: serial.productName,
                    warrantyStatus: warranty ? warranty.status : null,
                    warrantyStartDate: warranty ? warranty.start_date : null,
                    warrantyEndDate: warranty ? warranty.end_date : null,
                    warrantyId: warranty ? warranty._id : null,
                    inch: serial.inch,
                    productId: serial.productId,
                    productModelNumber: serial.modelNumber,
                    warrantyPeriod: serial.warrantyPeriod,
                    categoryName: categoryMap.get(serial.categoryId.toString()) || null,
                };
            });

            if (warranty === 'true') {
                serialNumberList = serialNumberList.filter(serial => serial.warrantyStatus === true);
            } else if (warranty === 'false') {
                serialNumberList = serialNumberList.filter(serial => serial.warrantyStatus === false);
            } else if (warranty === 'null') {
                serialNumberList = serialNumberList.filter(serial => serial.warrantyStatus === null);
            }

            if (search) {
                const searchLower = search.toLowerCase();
                serialNumberList = serialNumberList.filter(serial =>
                    serial.serialNumber.toLowerCase().includes(searchLower) ||
                    (serial.productName && serial.productName.toLowerCase().includes(searchLower))
                );
            }

            const totalSerialProducts = serialNumberList.length;
            const totalPages = Math.ceil(totalSerialProducts / limit);
            const paginatedSerialNumbers = serialNumberList.slice((page - 1) * limit, page * limit);

            return {
                serialProducts: paginatedSerialNumbers,
                totalSerialProducts,
                totalPages,
                currentPage: page
            };
        } catch (error) {
            throw new Error('Error fetching filtered serial products: ' + error.message);
        }
    }
    async updateProductStockBySerials(productId) {
        try {
            // Tìm sản phẩm serial dựa trên productId và trạng thái sold là false
            const serialProduct = await SerialProduct.findOne({ productId, 'serialList.sold': false }).lean();
            if (!serialProduct) {
                throw new Error('Serial product not found');
            }

            // Tạo một đối tượng để lưu trữ số lượng serial numbers theo màu sắc (inch)
            const colorQuantities = {};

            // Duyệt qua từng serial number trong danh sách serialList
            for (const serial of serialProduct.serialList) {
                if (!serial.sold) { // Nếu serial number chưa được bán
                    if (!colorQuantities[serial.inch]) {
                        colorQuantities[serial.inch] = 0; // Khởi tạo số lượng cho màu sắc nếu chưa có
                    }
                    colorQuantities[serial.inch]++; // Tăng số lượng cho màu sắc tương ứng
                }
            }

            // Tìm sản phẩm dựa trên productId
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('Product not found');
            }

            // Duyệt qua từng màu sắc trong đối tượng colorQuantities
            for (const color in colorQuantities) {
                // Tìm mục inStock của sản phẩm dựa trên màu sắc
                const inStockItem = product.inStock.find(stock => stock.color === color);
                if (inStockItem) {
                    inStockItem.quantity = colorQuantities[color]; // Cập nhật số lượng cho màu sắc tương ứng
                } else {
                    // Nếu không tìm thấy mục inStock cho màu sắc, thêm mới vào danh sách inStock
                    product.inStock.push({ color, quantity: colorQuantities[color] });
                }
            }

            // Lưu lại các thay đổi vào cơ sở dữ liệu
            await product.save();

            return { message: 'Product stock updated based on serial numbers' };
        } catch (error) {
            throw new Error('Error updating product stock: ' + error.message);
        }
    }

    async checkProductSerialToRegisterService(serial) {
        try {
            const existSerial = await SerialProduct.findOne({ 'serialList.serialNumber': serial })
                .populate({
                    path: "productId",
                    select: "_id name modelNumber images category brand",
                    populate: [
                        { path: "brand", select: "name thumails" },
                        { path: "category", select: "name thumails" }
                    ]
                })
            if (existSerial) {
                const existWarranty = await Warranty.findOne({ serialNumber: serial })
                    .select("_id start_date end_date status contactInfo")
                return {
                    product: existSerial.productId,
                    serial: serial,
                    warranty: existWarranty
                }
            } else {
                return null
            }
        } catch (error) {
            throw new Error('Error updating product stock: ' + error.message);
        }
    }
}

module.exports = new SerialProductService();