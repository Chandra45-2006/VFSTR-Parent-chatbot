const Academic = require('../models/Academic');

// GET /api/academic — regNo from JWT
const getAcademic = async (req, res) => {
  try {
    const data = await Academic.findOne({ regNo: req.user.regNo });
    if (!data) return res.status(404).json({ error: 'Academic data not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAcademic };
