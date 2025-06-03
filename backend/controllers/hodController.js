/*const Department = require("../models/HOD");
const Faculty = require("../models/Faculty");

// Get departments managed by HOD
exports.loginHod = async (req, res) => {
    try {
        const hodId = req.user.id; // HOD's ID from authentication
        const departments = await Department.find({ hod: hodId });

        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching departments" });
    }
};

// Get faculty by department
exports.getFacultyByDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const facultyList = await Faculty.find({ department: departmentId });

        res.status(200).json(facultyList);
    } catch (error) {
        res.status(500).json({ message: "Error fetching faculty members" });
    }
}; */


/*const HOD = require('../models/HOD');
const Faculty = require('../models/Faculty');

// POST /api/hod/login
exports.loginHod = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hod = await HOD.findOne({ username, password });

        if (!hod) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Successful login
        res.json({
            username: hod.username,
            department: hod.department
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error during HOD login' });
    }
};

// GET /api/hod/faculty/:department
exports.getFacultyByDepartment = async (req, res) => {
    const { department } = req.params;

    try {
        const faculty = await Faculty.find({ department });
        res.json(faculty);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching faculty for department' });
    }
};*/

// controllers/hodController.js

// controllers/hodController.js

const Faculty = require('../models/Faculty'); // Adjust path based on your project

exports.loginHod = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Example static login (replace with your DB lookup)
    if (username === 'hoduser' && password === 'hodpassword') {
      res.status(200).json({
        message: 'Login successful',
        role: 'hod',
        token: 'dummy-token',
        department: 'CSE' // Example department (dynamic in real case)
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Faculty by department
exports.getFacultyByDepartment = async (req, res) => {
  const department = req.params.department;

  try {
    const facultyList = await Faculty.find({ department, role: hodDepartment});
    res.json(facultyList);
  } catch (err) {
    console.error("Error fetching faculty:", error);
    res.status(500).json({ message:  "Error fetching faculty" });
  }
};


module.exports = exports;
