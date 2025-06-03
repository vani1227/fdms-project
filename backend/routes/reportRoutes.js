// routes/reportRoutes.js
const ExcelJS = require('exceljs');
const Research = require('../models/Research');
const router = express.Router();

router.get('/excel/:facultyId', async (req, res) => {
  const data = await Research.find({ facultyId: req.params.facultyId });
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Research Report');
  sheet.columns = [
    { header: 'Type', key: 'type' },
    { header: 'Title', key: 'title' },
    { header: 'Date', key: 'date' }
  ];
  data.forEach(d => sheet.addRow(d));
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  await workbook.xlsx.write(res);
  res.end();
});

module.exports = router;