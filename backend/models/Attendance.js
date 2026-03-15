const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  regNo:          { type: String, required: true, uppercase: true },
  subject:        { type: String, required: true },
  presentClasses: { type: Number, default: 0 },
  totalClasses:   { type: Number, default: 0 },
  percentage:     { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
