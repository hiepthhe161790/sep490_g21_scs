const mongoose = require('mongoose');
const { Schema } = mongoose;

const supplierSchema = new Schema({
  name: String,
  contactInfo: String,
  address: String,
  partsProvided: [{ type: Schema.Types.ObjectId, ref: 'SparePart' }]
});

module.exports = mongoose.model('Supplier', supplierSchema);
