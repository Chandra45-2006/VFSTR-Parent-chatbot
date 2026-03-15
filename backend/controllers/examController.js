const Exam = require('../models/Exam');

// GET /api/exams — regNo from JWT
const getExams = async (req, res) => {
  try {
    const data = await Exam.findOne({ regNo: req.user.regNo });
    if (!data) return res.status(404).json({ error: 'Exam data not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getExams };
