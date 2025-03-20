const mongoose = require('mongoose');
const { Schema } = mongoose;

const stockLogSchema = new Schema({
  sparePartId: { type: Schema.Types.ObjectId, ref: 'SparePart' },
  action: String,
  quantity: Number,
  reason: String,
});

module.exports = mongoose.model('StockLog', stockLogSchema);
