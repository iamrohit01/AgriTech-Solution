const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
  question: String,
  askedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Question', QuestionSchema);
