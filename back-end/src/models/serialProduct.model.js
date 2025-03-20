const mongoose = require('mongoose');
const { Schema } = mongoose;

const serialProductSchema = new Schema({
  productId : { type: Schema.Types.ObjectId, ref: 'Product' },
    serialList: [{
      serialNumber: String,
      inch: String,
      sold: { type: Boolean, default: false }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Serial', serialProductSchema);
