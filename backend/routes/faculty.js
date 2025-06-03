
// server/routes/faculty.js
const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty"); // your Mongoose model

// GET all faculty
router.get('/api/faculty/all', async (req, res) => {
  try {
    const facultyList = await Faculty.find({ detailsSubmitted: true }); // fetch only those who submitted details
    res.json(facultyList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch faculty data' });
  }
});

module.exports = router;


