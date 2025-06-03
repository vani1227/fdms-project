const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAdmin } = require('../middleware/authMiddleware');

// Create Faculty or HOD account

//router.post('/create-user', isAdmin, async (req, res) => {
  /*router.post('/create-user', async (req, res) => {
  const { username, password, email, role } = req.body;

  // Validate input
  if (!username || !password || !['faculty', 'hod'].includes(role)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, password, email, role });
    await newUser.save();

    res.status(201).json({ message: `${role} created successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}); */

module.exports = router;
