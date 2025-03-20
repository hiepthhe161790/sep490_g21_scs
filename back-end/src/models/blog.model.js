const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogNewsSchema = new Schema({
  title: String,
  content: String,
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  status: String,
  thumbnails: [String],
});

module.exports = mongoose.model('BlogNews', blogNewsSchema);
