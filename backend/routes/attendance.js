const express = require('express');
const router = express.Router();
const { getAttendance } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAttendance);

module.exports = router;
