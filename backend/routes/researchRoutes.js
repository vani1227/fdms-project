const express = require('express');
const router = express.Router();
const Research = require('../models/Research');

// Add research contribution
router.post('/add', async (req, res) => {
  const newResearch = new Research(req.body);
  await newResearch.save();
  res.json({ success: true });
});

// Get all by faculty
router.get('/faculty/:id', async (req, res) => {
  const records = await Research.find({ facultyId: req.params.id });
  res.json(records);
});
