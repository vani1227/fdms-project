// routes/dashboardRoutes.js
const router = express.Router();
const ProfDev = require('../models/ProfessionalDevelopment');

router.get('/stats/:facultyId', async (req, res) => {
  const researchCount = await Research.countDocuments({ facultyId: req.params.facultyId });
  const profDevCount = await ProfDev.countDocuments({ facultyId: req.params.facultyId });
  res.json({ researchCount, profDevCount });
});

module.exports = router;