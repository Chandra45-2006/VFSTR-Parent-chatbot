const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  regNo:           { type: String, required: true, uppercase: true },
  totalFee:        { type: Number, default: 0 },
  paidFee:         { type: Number, default: 0 },
  dueFee:          { type: Number, default: 0 },
  lastPaymentDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Fee', feeSchema);
