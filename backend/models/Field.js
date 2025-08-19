const mongoose = require('mongoose');
const FieldSchema = new mongoose.Schema({
  originalName: String,
  fileName: String,
  uploadedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Field', FieldSchema);
