const express = require('express');
const router = express.Router();
const { getAcademic } = require('../controllers/academicController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAcademic);

module.exports = router;
