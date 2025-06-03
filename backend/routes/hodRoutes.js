/*const express = require("express");
const router = express.Router();
const { verifyHOD } = require("../middleware/authMiddleware.js");
const { getDepartments, getFacultyByDepartment } = require("../controllers/hodController");

// Get all departments managed by the HOD
router.get("/departments", verifyHOD, getDepartments);

// Get faculty members in a department
router.get("/faculty/:departmentId", verifyHOD, getFacultyByDepartment);

module.exports = router; */

/*const express = require('express');
const router = express.Router();
const hodController = require('../controllers/hodController');

// Middleware to check if HOD is logged in
function requireHodLogin(req, res, next) {
    if (!req.session.user || req.session.user.role !== 'hod') {
        return res.status(401).json({ message: 'Unauthorized access. Please login as HOD.' });
    }
    next();
}

// Get faculty under the HOD's department
router.get('/faculty/:department', requireHodLogin, hodController.getFacultyByDepartment);

module.exports = router;*/

const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty'); // Adjust path if different

// Get all faculty in HOD's department
router.get('/faculty/:department', async (req, res) => {
  try {
    const department = req.params.department;
    const facultyList = await Faculty.find({ department });
    res.json(facultyList);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching faculty list' });
  }
});

// Get leave records by department
router.get('/leave/:department', async (req, res) => {
  try {
    const department = req.params.department;
    const leaves = await Faculty.find({ department }, { name: 1, leaveRecords: 1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leave records' });
  }
});

// Get review records by department
router.get('/reviews/:department', async (req, res) => {
  try {
    const department = req.params.department;
    const reviews = await Faculty.find({ department }, { name: 1, reviews: 1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

// Get announcements by department
router.get('/announcements/:department', async (req, res) => {
  try {
    const department = req.params.department;
    const announcements = await Faculty.find({ department }, { name: 1, announcements: 1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching announcements' });
  }
});

module.exports = router;
