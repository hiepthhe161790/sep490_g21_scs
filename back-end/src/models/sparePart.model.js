const mongoose = require('mongoose');
const { Schema } = mongoose;

const sparePartSchema = new Schema({
  name: String,
  code: String,
  inStock: Number,
  price: Number,
  minimumStock: Number,
  supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier' },
});

module.exports = mongoose.model('SparePart', sparePartSchema);
