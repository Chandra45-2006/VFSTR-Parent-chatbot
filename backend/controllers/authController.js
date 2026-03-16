const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

// POST /api/auth/login — direct login, no OTP required
const login = async (req, res) => {
  try {
    const { regNo, phone } = req.body;

    if (!regNo || !phone)
      return res.status(400).json({ error: 'Registration number and phone are required' });

    const student = await Student.findOne({ regNo: regNo.toUpperCase() });

    if (!student)
      return res.status(404).json({ error: 'Invalid registration number or phone number' });

    if (student.phone !== phone)
      return res.status(401).json({ error: 'Invalid registration number or phone number' });

    const token = jwt.sign(
      { regNo: student.regNo },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      token,
      student: {
        regNo: student.regNo,
        name: student.studentName,
        branch: student.branch,
        year: student.year,
        section: student.section,
        cgpa: student.cgpa,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Kept for route compatibility
const verifyOTP = async (req, res) => {
  res.status(400).json({ error: 'OTP flow disabled.' });
};

module.exports = { login, verifyOTP };
