const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  regNo:       { type: String, required: true, uppercase: true },
  subject:     { type: String, required: true },
  midMarks:    { type: Number, default: 0 },
  labMarks:    { type: Number, default: 0 },
  finalMarks:  { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);
