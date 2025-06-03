const express = require('express');

//const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Faculty = require("../models/Faculty");
const User = require('../models/User'); // ✅ This is missing
const authController = require('../controllers/authController');


const authMiddleware = require('../middleware/authMiddleware');

const { registerUser, loginUser } = require('../controllers/authController');

const { resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.registerUser);  // Register a new user
router.post('/login', authController.loginUser);        // Login a user

router.post('/forgot-password', authController.sendResetLink);
router.post('/reset-password/:token', authController.resetPassword);
/*router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
         
        // Check if faculty exists
        const faculty = await Faculty.findOne({ email });
        if (!faculty) {
            return res.status(400).json({ message: "Faculty not found." });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, faculty.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in." });
    }
});  */

router.post("/hod/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const hod = await Faculty.findOne({ email, role: "hod" }); // Ensure role is HOD
        if (!hod) return res.status(400).json({ message: "HOD not found" });

        const isMatch = await bcrypt.compare(password, hod.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });


         // Set session
        const token = jwt.sign(
      {
        id: hod._id,
        name: hod.name,
        email: hod.email,
        department: hod.department,
        role: hod.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "HOD login successful",
      token, // send token to frontend
      user: {
        id: hod._id,
        name: hod.name,
        email: hod.email,
        department: hod.department,
        role: hod.role
      }
    });
  } catch (error) {
    console.error("HOD login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Logout failed' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout successful' });
    });
});

// Fetch all users for admin
router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({ role: { $in: ['faculty', 'hod'] } });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});


       // const token = jwt.sign({ id: hod._id, role: hod.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        //res.json({ token, user: { id: hod._id, name: hod.name, email: hod.email, role: hod.role } });
    //} catch (error) {
      //  res.status(500).json({ message: "Server Error" });
    //}
///});



  router.get('/api/users', async (req, res) => {
    try {
      const users = await User.find({ role: { $in: ['faculty', 'hod'] } });
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
  

//-----------extra added----------
  // In your authRoutes.js or adminRoutes.js
router.get('/api/all-users-test', async (req, res) => {
  try {
    const users = await User.find(); // No filter
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

  


//router.post('/reset-password/:token', resetPassword);

module.exports = router;






// Get all users (Admin only)
/*router.get('/all-users', authMiddleware, async (req, res) => {
    try {
      const users = await User.find().select('-password'); // exclude passwords
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users', error });
    }
  });  */


  /*router.get('/api/users', async (req, res) => {
    try {
      const users = await Faculty.find().populate('department'); // If department is a reference
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });  */

  /*router.get('/api/users', async (req, res) => {
    try {
      const users = await User.find(); // 🔁 Removed .populate()
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error); // Will print real reason in terminal
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }); */