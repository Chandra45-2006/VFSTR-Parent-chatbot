const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendSMS = async (phone, otp) => {
  const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
    params: {
      authorization: process.env.FAST2SMS_API_KEY,
      variables_values: otp,
      route: 'otp',
      numbers: phone,
    },
  });
  return response.data;
};

// POST /api/auth/login
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

    const otp = generateOTP();
    student.otp = otp;
    student.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await student.save();

    console.log(`\n=============================`);
    console.log(`Generated OTP for ${regNo}: ${otp}`);
    console.log(`=============================\n`);

    try {
      const result = await sendSMS(phone, otp);
      console.log('Fast2SMS result:', JSON.stringify(result));
    } catch (smsErr) {
      console.error('Fast2SMS error:', smsErr.message);
    }

    res.json({
      message: 'OTP sent successfully',
      mobileLast4: phone.slice(-4),
      devOtp: process.env.NODE_ENV !== 'production' ? otp : undefined,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/auth/verify-otp
const verifyOTP = async (req, res) => {
  try {
    const { regNo, otp } = req.body;

    const student = await Student.findOne({ regNo: regNo.toUpperCase() });

    if (!student || student.otp !== otp)
      return res.status(401).json({ error: 'Invalid OTP. Please try again.' });

    if (new Date() > student.otpExpires)
      return res.status(401).json({ error: 'OTP expired. Please request a new one.' });

    student.otp = null;
    student.otpExpires = null;
    await student.save();

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

module.exports = { login, verifyOTP };
