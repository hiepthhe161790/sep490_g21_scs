const mongoose = require('mongoose');
const { Schema } = mongoose;

const repairRecordSchema = new Schema({
  repairRequestId: { type: Schema.Types.ObjectId, ref: 'RepairRequest' },
  technicianId: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  partsUsed: [{ sparePartId: { type: Schema.Types.ObjectId, ref: 'SparePart' }, quantity: Number }],
  cost: Number,
});

module.exports = mongoose.model('RepairRecord', repairRecordSchema);
