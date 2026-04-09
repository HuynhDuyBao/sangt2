const express = require('express');
const router = express.Router();
const TheLoai = require('../models/TheLoai');

// GET /api/genres
router.get('/', async (req, res) => {
  try {
    const genres = await TheLoai.find().sort({ TenTheLoai: 1 });
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
