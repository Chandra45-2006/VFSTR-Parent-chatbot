const express = require('express');
const router = express.Router();
const { getFees } = require('../controllers/feeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getFees);

module.exports = router;
