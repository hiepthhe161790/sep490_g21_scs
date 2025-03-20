const mongoose = require('mongoose');
const { Schema } = mongoose;

const warrantySchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  start_date: Date,
  end_date: Date,
  serialNumber: String ,
  description: String,
  contactInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: Boolean,
    default: true
  },
  repairRequestId: { type: Schema.Types.ObjectId, ref: 'RepairRequest' },
});

module.exports = mongoose.model('Warranty', warrantySchema);
