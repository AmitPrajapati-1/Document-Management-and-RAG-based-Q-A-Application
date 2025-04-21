const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
