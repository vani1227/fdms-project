// backend/middleware/upload.js
/*const multer = require("multer");
const path = require("path");


const fs = require("fs");

const dir = "uploads/education_certificates";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/certificates/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

module.exports = upload;  */




/*const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/faculty_docs");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;*/


const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //cb(null, uniqueSuffix + '-' + file.originalname);
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

//const upload = multer({
  //storage: storage,
  //limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//});

const upload = multer({ storage: storage });
module.exports = upload;
