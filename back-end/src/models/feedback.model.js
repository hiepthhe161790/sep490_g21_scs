const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  repairRequestId: { type: Schema.Types.ObjectId, ref: 'RepairRequest' },
  rating: Number,
  comment: String,
});

module.exports = mongoose.model('Feedback', feedbackSchema);
