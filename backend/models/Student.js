const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  regNo:       { type: String, required: true, unique: true, uppercase: true },
  studentName: { type: String, required: true },
  parentName:  { type: String },
  phone:       { type: String, required: true },
  branch:      { type: String, required: true },
  year:        { type: Number, required: true },
  section:     { type: String },
  cgpa:        { type: Number, default: 0 },
  otp:         { type: String },
  otpExpires:  { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema, 'students');
