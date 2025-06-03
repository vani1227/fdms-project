// routes/facultyPublicView.js
const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');

router.get('/:facultyId', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.facultyId).select('professional education');
    if (!faculty) return res.status(404).json({ error: 'Faculty not found' });

    res.json(faculty);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all faculty by department (only professional + education)
router.get('/department/:dept', async (req, res) => {
    try {
      const department = req.params.dept;
      const faculties = await Faculty.find({ 'professional.department': department })
        .select('professional education personal.name');
  
      res.json(faculties);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  

module.exports = router;
