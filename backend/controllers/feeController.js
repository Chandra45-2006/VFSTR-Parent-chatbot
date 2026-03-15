const Fee = require('../models/Fee');

// GET /api/fees — regNo from JWT
const getFees = async (req, res) => {
  try {
    const data = await Fee.findOne({ regNo: req.user.regNo });
    if (!data) return res.status(404).json({ error: 'Fee data not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getFees };
