const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  message: String,
  status: String,
});

module.exports = mongoose.model('Notification', notificationSchema);
