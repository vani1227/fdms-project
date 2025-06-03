const ProfDev = require('../models/ProfessionalDevelopment');

router.post('/add', async (req, res) => {
  const newEntry = new ProfDev(req.body);
  await newEntry.save();
  res.json({ success: true });
});

module.exports = router;