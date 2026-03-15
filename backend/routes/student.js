const express = require('express');
const router = express.Router();
const { getStudent } = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

// regNo comes from JWT token, not URL
router.get('/profile', protect, getStudent);

module.exports = router;
