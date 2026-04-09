const express = require('express');
const router = express.Router();
const QuocGia = require('../models/QuocGia');

// GET /api/countries
router.get('/', async (req, res) => {
  try {
    const countries = await QuocGia.find().sort({ TenQuocGia: 1 });
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
