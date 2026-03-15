const mongoose = require('mongoose');

const academicSchema = new mongoose.Schema({
  regNo:    { type: String, required: true, uppercase: true },
  semester: { type: Number, required: true },
  sgpa:     { type: Number, default: 0 },
  cgpa:     { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Academic', academicSchema);
