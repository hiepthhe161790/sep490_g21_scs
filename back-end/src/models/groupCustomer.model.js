const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupCustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['Khách hàng lẻ', 'Thợ / Doanh nghiệp nhỏ', 'Đại lý / Ủy quyền'],
  },
  description: {
    type: String,
    default: '',
  },
  discountRate: {
    type: Number,
    default: 0, // % giảm giá khi mua linh kiện, sản phẩm, dịch vụ
  },
  creditLimit: {
    type: Number,
    default: 0, // Hạn mức công nợ, ví dụ: 10,000,000 VND
  },
  specialPrivileges: {
    type: [String], // Đặc quyền riêng, ví dụ: miễn phí vận chuyển, hỗ trợ kỹ thuật 24/7, ...
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true, // Để sau này có thể ngừng cung cấp cho nhóm đó
  },
  setting: {
    type: Object, // Tùy biến nếu cần thêm các cấu hình khác sau này
    default: {},
  },
}, { timestamps: true });

module.exports = mongoose.model('GroupCustomer', groupCustomerSchema);
