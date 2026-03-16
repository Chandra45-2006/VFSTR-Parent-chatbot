const Attendance = require('../models/Attendance');

// GET /api/attendance — regNo from JWT
const getAttendance = async (req, res) => {
  try {
    const data = await Attendance.find({ regNo: req.user.regNo });
    if (!data || data.length === 0) return res.status(404).json({ error: 'Attendance data not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAttendance };
