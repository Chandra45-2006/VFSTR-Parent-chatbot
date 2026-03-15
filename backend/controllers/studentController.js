const Student = require('../models/Student');

// GET /api/student/profile — regNo from JWT
const getStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ regNo: req.user.regNo })
      .select('-otp -otpExpires -phone');
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getStudent };
