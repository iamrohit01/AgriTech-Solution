const mongoose = require('mongoose');
const WorkshopSchema = new mongoose.Schema({
  name: String,
  email: String,
  registeredAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Workshop', WorkshopSchema);
