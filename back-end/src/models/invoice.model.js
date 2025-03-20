const mongoose = require('mongoose');
const { Schema } = mongoose;

const invoiceSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  repairRequestId: { type: Schema.Types.ObjectId, ref: 'RepairRequest', required: true },

  totalAmount: { type: Number, required: true }, // Tổng số tiền cần thanh toán
  paidAmount: { type: Number, default: 0 }, // Số tiền đã trả
  remainingDebt: { type: Number, default: 0 }, // Số tiền còn nợ (totalAmount - paidAmount)

  debtStatus: { 
    type: String, 
    enum: ['PAID', 'PARTIAL', 'UNPAID'], 
    default: 'UNPAID' 
  }, // Trạng thái ghi nợ

  payments: [
    {
      amount: Number, // Số tiền thanh toán
      method: { type: String, enum: ['CASH', 'BANK_TRANSFER', 'CARD'], required: true }, // Phương thức thanh toán
      date: { type: Date, default: Date.now } // Ngày thanh toán
    }
  ]
}, { timestamps: true });

// Middleware cập nhật trạng thái nợ trước khi lưu
invoiceSchema.pre('save', function (next) {
  this.remainingDebt = this.totalAmount - this.paidAmount;

  if (this.remainingDebt === 0) {
    this.debtStatus = 'PAID';
  } else if (this.paidAmount > 0) {
    this.debtStatus = 'PARTIAL';
  } else {
    this.debtStatus = 'UNPAID';
  }

  next();
});

module.exports = mongoose.model('Invoice', invoiceSchema);
