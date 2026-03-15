const express = require('express');
const router = express.Router();
const { getExams } = require('../controllers/examController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getExams);

module.exports = router;
