/*const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');

// Add Faculty
router.post('/faculty', async (req, res) => {
    try {
        const { name, department } = req.body;
        const newFaculty = new Faculty({ name, department });
        await newFaculty.save();
        res.status(201).json({ message: 'Faculty added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get Faculty (Existing route)
router.get('/faculty', async (req, res) => {
    try {
        const faculty = await Faculty.find();
        res.json(faculty);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router; */



/*const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty'); // Ensure correct path

// POST route to add faculty
router.post('/', async (req, res) => {
    try {
        const { name, department } = req.body;
        const newFaculty = new Faculty({ name, department });
        await newFaculty.save();
        res.status(201).json({ message: 'Faculty added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}); */

/*const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty'); // Ensure correct path to Faculty model */

// Add Faculty API with Duplicate Check
/*router.post('/', async (req, res) => {
    try {
        const { name, department } = req.body;

        // Check if faculty already exists
        const existingFaculty = await Faculty.findOne({ name, department });
        if (existingFaculty) {
            return res.status(400).json({ message: 'Faculty already exists' });
        }

        // If not exists, add new faculty
        const newFaculty = new Faculty({ name, department });
        await newFaculty.save();

        res.status(201).json({ message: 'Faculty added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});   


/*router.post("/add", async (req, res) => {
    try {
        const { name, email, department, designation, courses, contact } = req.body;
        
        const newFaculty = new Faculty({ name, email, department, designation, courses, contact });
        await newFaculty.save();

        res.status(201).json({ message: "Faculty added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});  */


/*router.get('/', async (req, res) => {
    try {
        const facultyList = await Faculty.find(); // Fetch all faculty members
        res.status(200).json(facultyList);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { name, department } = req.body;
        const updatedFaculty = await Faculty.findByIdAndUpdate(req.params.id, { name, department }, { new: true });

        if (!updatedFaculty) return res.status(404).json({ message: 'Faculty not found' });

        res.json(updatedFaculty);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Faculty.findByIdAndDelete(id);
        res.status(200).json({ message: 'Faculty deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});






module.exports = router;

/*const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");

// Add Faculty
router.post("/add", async (req, res) => {
    try {
        const { name, email, password, designation, department, courses } = req.body;
        
        const faculty = new Faculty({
            name,
            email,
            password, // Ensure password is hashed before saving in production
            designation,
            department,
            courses
        });

        await faculty.save();
        res.status(201).json({ message: "Faculty added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Faculty
router.get("/all", async (req, res) => {
    try {
        const faculty = await Faculty.find().populate("department").populate("courses");
        res.status(200).json(faculty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;  */

/*const express = require("express");
const bcrypt = require("bcryptjs"); // For password hashing (optional, but recommended)
const Faculty = require("../models/Faculty");

const router = express.Router();

// Add Faculty
router.post("/add", async (req, res) => {
    try {
        const { name, email, password, designation, department, courses } = req.body;

        // Check if Faculty already exists
        const existingFaculty = await Faculty.findOne({ email });
        if (existingFaculty) {
            return res.status(400).json({ message: "Faculty with this email already exists." });
        }

        // Hash the password (optional, if you want secure password storage)
        const hashedPassword = await bcrypt.hash(password, 10);

        const newFaculty = new Faculty({
            name,
            email,
            password: hashedPassword,  // Store hashed password
            designation,
            department,
            courses
        });

        await newFaculty.save();
        res.status(201).json({ message: "Faculty added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding faculty." });
    }
});

module.exports = router;   */








// backend/routes/facultyRoutes.js
/*const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');

router.post('/submit', async (req, res) => {
  try {
    const data = req.body;

    const newFaculty = new Faculty({
      name: data.name,
      gender: data.gender,
      age: data.age,
      dob: data.dob,
      email: data.email,
      phone: data.phone,
      city: data.city,
      state: data.state,
      designation: data.designation,
      experiences: data.experiences || [],
      education: {
        ug: data.ug,
        pg: data.pg,
        phdCompletionYear: data.phdCompletionYear
      }
    });

    await newFaculty.save();
    res.status(201).json({ message: 'Faculty data saved successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save faculty data.' });
  }
});

module.exports = router;  */





/*const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Faculty = require('../models/Faculty');

// File storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/add-faculty', upload.fields([
  { name: 'ugCertificate' },
  { name: 'pgCertificate' }
]), async (req, res) => {
  try {
    const body = req.body;
    const experience = JSON.parse(body.experience || '[]');

    const faculty = new Faculty({
      name: body.name,
      gender: body.gender,
      age: body.age,
      dob: body.dob,
      email: body.email,
      phone: body.phone,
      city: body.city,
      state: body.state,
      designation: body.designation,
      experience,
      education: {
        ug: {
          degree: body.ug,
          specialization: body.ugSpecialization,
          year: body.ugCompletion,
          university: body.ugUniversity,
          certificate: req.files['ugCertificate']?.[0].filename || ''
        },
        pg: {
          degree: body.pg,
          specialization: body.pgSpecialization,
          year: body.pgCompletion,
          university: body.pgUniversity,
          certificate: req.files['pgCertificate']?.[0].filename || ''
        },
        phdCompletionYear: body.phdCompletion
      }
    });

    await faculty.save();
    res.status(200).json({ message: 'Faculty data saved successfully' });
  } catch (error) {
    console.error('Error saving faculty data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;  */





/*const express = require('express');
const router = express.Router();
const Faculty = require('../models/FacultyDetails');

router.post('/submit-faculty-details', async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.status(201).json({ message: 'Faculty details saved successfully' });
  } catch (error) {
    console.error('Error saving faculty details:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;  */



/*const express = require("express");
const multer = require("multer");
const path = require("path");
const FacultyDetails = require("../models/FacultyDetails");

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}_${file.originalname}`)
});

const upload = multer({ storage });

router.post("/submit-faculty-details", upload.any(), async (req, res) => {
  try {
    const filesMap = {};
    req.files.forEach(file => {
      filesMap[file.fieldname] = file.filename;
    });

    const experiences = JSON.parse(req.body.experiences || "[]");

    // Extract education
    const education = [];
    Object.keys(req.body).forEach(key => {
      const match = key.match(/^education_(\d+)_(.+)$/);
      if (match) {
        const index = match[1];
        const field = match[2];
        education[index] = education[index] || {};
        education[index][field] = req.body[key];
      }
    });

    // Attach education files
    Object.keys(filesMap).forEach(key => {
      const match = key.match(/^educationFile_(\d+)_(.+)$/);
      if (match) {
        const index = match[1];
        education[index] = education[index] || {};
        education[index]["educationFile"] = filesMap[key];
      }
    });

    const newFaculty = new FacultyDetails({
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      dob: req.body.dob,
      email: req.body.email,
      phone: req.body.phone,
      altPhone: req.body.altPhone,
      city: req.body.city,
      state: req.body.state,
      aadhaar: req.body.aadhaar,
      pan: req.body.pan,
      profilePhoto: filesMap.profilePhoto,
      aadhaarPhoto: filesMap.aadhaarPhoto,
      panPhoto: filesMap.panPhoto,
      designation: req.body.designation,
      experienceUnit: req.body.experienceUnit,
      totalExperienceIT: req.body.totalExperienceIT,
      totalExperienceTeaching: req.body.totalExperienceTeaching,
      totalExperience: req.body.totalExperience,
      experiences,
      education
    });

    await newFaculty.save();
    res.status(200).json({ message: "Faculty data saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong while saving faculty details." });
  }
});
 

module.exports = router;  */



// routes/facultyFormRoutes.js
/*const express = require('express');
const router = express.Router();
const multer = require('multer');
const Faculty = require('../models/Faculty');
const path = require('path'); 


// Set up multer for file uploads
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Handle form submission
router.post('/submit', upload.fields([
  { name: 'aadhaarPhoto' },
  { name: 'panPhoto' },
  { name: 'profilePhoto' }
]), async (req, res) => {
  try {
    const {
      name, gender, age, dob, email, phone, altPhone, city, state,
      aadhaar, pan, designation, experiences, education
    } = req.body;

    const faculty = new Faculty({
      personal: {
        name, gender, age, dob, email, phone, altPhone, city, state, aadhaar, pan,
        aadhaarPhoto: req.files['aadhaarPhoto'][0].filename,
        panPhoto: req.files['panPhoto'][0].filename,
        profilePhoto: req.files['profilePhoto'][0].filename
      },
      professional: {
        designation,
        experiences: JSON.parse(experiences)  // Array of objects
      },
      education: JSON.parse(education) // Array of education records
    });

    await faculty.save();
    res.status(201).json({ message: 'Faculty details saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save faculty data' });
  }
});

module.exports = router;  */


/*const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Faculty = require('../models/Faculty'); // Adjust path as needed

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Accept multiple named fields (exact names from HTML form)
const fileFields = [
  { name: 'aadhaarPhoto', maxCount: 1 },
  { name: 'panPhoto', maxCount: 1 },
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'sscCertificate', maxCount: 1 },
  { name: 'interCertificate', maxCount: 1 },
  { name: 'ugCertificate', maxCount: 1 },
  { name: 'pgCertificate', maxCount: 1 },
  { name: 'phdCertificate', maxCount: 1 }
];

// Helper to extract filename safely
const getFileName = (fieldName, files) =>
  files?.[fieldName]?.[0]?.filename || '';

router.post('/submit', upload.fields(fileFields), async (req, res) => {
  try {
    console.log('Received Body:', req.body);
    console.log('Uploaded Files:', req.files);

    const parsedExperiences = JSON.parse(req.body.experiences || '[]');
    const parsedEducation = JSON.parse(req.body.education || '{}');

    const newFaculty = new Faculty({
      personal: {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        dob: req.body.dob,
        email: req.body.email,
        phone: req.body.phone,
        altPhone: req.body.altPhone,
        city: req.body.city,
        state: req.body.state,
        aadhaar: req.body.aadhaar,
        pan: req.body.pan,
        aadhaarPhoto: getFileName('aadhaarPhoto', req.files),
        panPhoto: getFileName('panPhoto', req.files),
        profilePhoto: getFileName('profilePhoto', req.files)
      },
      professional: {
        designation: req.body.designation,
        experiences: parsedExperiences
      },
      education: {
        ssc: {
          schoolName: req.body.schoolName,
          boardName: req.body.schoolBoardName,
          yearOfCompletion: req.body.schoolYearOfCompletion,
          percentage: req.body.schoolPercentage,
          certificate: getFileName('schoolCertificate', req.files)
        },
        intermediate: {
          institutionName: req.body.institutionName,
          boardName: req.body.intermediateBoardName,
          specialization: req.body.intermediateSpecialization,
          yearOfCompletion: req.body.intermediateYearOfCompletion,
          percentage: req.body.intermediatePercentage,
          certificate: getFileName('intermediateCertificate', req.files)
        },
        ug: {
          degree: req.body.ugDegree,
          specialization: req.body.ugSpecialization,
          yearOfCompletion: req.body.ugYearOfCompletion,
          university: req.body.ugUniversity,
          certificate: getFileName('ugCertificate', req.files)
        },
        pg: {
          degree: req.body.pgDegree,
          specialization: req.body.pgSpecialization,
          yearOfCompletion: req.body.pgYearOfCompletion,
          university: req.body.pgUniversity,
          certificate: getFileName('pgCertificate', req.files)
        },
        phd: {
          status: req.body.phdStatus,
          specialization: req.body.phdSpecialization,
          university: req.body.phdUniversity,
          researchTopic: req.body.phdResearchTopic,
          expectedCompletionYear: req.body.phdExpectedCompletionYear,
          yearOfCompletion: req.body.phdYearOfCompletion,
          certificate: getFileName('phdCertificate', req.files)
        }
      }
    });

    await newFaculty.save();
    res.status(200).json("Faculty data submitted successfully.");
  } catch (err) {
    console.error("Error saving faculty data:", err.message);
    res.status(500).json("Server error.");
  }
});

module.exports = router;   */


// ----------- This code is the existing one -----------
/*const express = require('express');
const router = express.Router();
const multer = require('multer');
const Faculty = require('../models/Faculty');
const path = require('path');
//router.post('/submit', upload.any(), submitFacultyForm);
// File Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// POST: Submit form data
router.post('/submit', upload.fields([
  { name: 'aadhaarPhoto' },
  { name: 'panPhoto' },
  { name: 'profilePhoto' },
  { name: 'certificates' }
]), async (req, res) => {
  try {
    const {
      name, gender, dob, age, email, phone, altPhone,
      city, state, aadhaar, pan, designation,
      experience, education
    } = req.body;

    const newFaculty = new Faculty({
      name, gender, dob, age, email, phone, altPhone,
      city, state, aadhaar, pan, designation,
      aadhaarPhoto: req.files.aadhaarPhoto?.[0]?.path,
      panPhoto: req.files.panPhoto?.[0]?.path,
      profilePhoto: req.files.profilePhoto?.[0]?.path,
      experience: JSON.parse(experience),
      education: JSON.parse(education).map((edu, i) => ({
        ...edu,
        certificate: req.files.certificates?.[i]?.path || ''
      }))
    });

    await newFaculty.save();
    res.status(201).json({ message: 'Faculty data submitted successfully!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Submission failed.' });
  }
});


// GET: Profile by email (or use _id)
router.get('/profile', async (req, res) => {
  try {
    const { email } = req.query;
    const faculty = await Faculty.findOne({ email });
    if (!faculty) return res.status(404).json({ error: 'Faculty not found' });
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

module.exports = router;  */


/*const express = require('express');
const router = express.Router();
const { submitFacultyForm } = require('../controllers/facultyController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create folders if not exist
['aadhaar', 'pan', 'profile', 'certificates'].forEach(folder => {
  const dir = path.join(__dirname, `../uploads/${folder}`);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const field = file.fieldname;
    let dir = 'uploads/';
    if (field.includes('aadhaarPhoto')) dir += 'aadhaar/';
    else if (field.includes('panPhoto')) dir += 'pan/';
    else if (field.includes('profilePhoto')) dir += 'profile/';
    else dir += 'certificates/';
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  '/submit',
  upload.fields([
    { name: 'aadhaarPhoto', maxCount: 1 },
    { name: 'panPhoto', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'certificates[0]' }, { name: 'certificates[1]' }, { name: 'certificates[2]' }, { name: 'certificates[3]' }, { name: 'certificates[4]' },
  ]),
  submitFacultyForm
);

module.exports = router;  */



/*const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const Faculty = require("../models/Faculty");

// Upload fields configuration
const cpUpload = upload.fields([
  { name: "aadhaarPhoto", maxCount: 1 },
  { name: "panPhoto", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
  { name: "educationCertificates", maxCount: 10 } // Certificates for SSC to PhD
]);

router.post("/submit-faculty-form", cpUpload, async (req, res) => {
  try {
    const {
      name, gender, dob, age, email, phone, altPhone, city, state,
      aadhaar, pan, designation, experience, totalExperience, education
    } = req.body;

    // Parse experience and education JSON if coming as strings
    const parsedExperience = JSON.parse(experience);
    const parsedEducation = JSON.parse(education);
    const parsedTotalExp = JSON.parse(totalExperience);

    // Handle file paths
    const files = req.files;
    const getFilePath = (field) => files[field]?.[0]?.path || "";

    // Map education files to education entries
    parsedEducation.forEach((edu, idx) => {
      edu.certificatePath = files["educationCertificates"]?.[idx]?.path || "";
    });

    const faculty = new Faculty({
      name,
      gender,
      dob,
      age,
      email,
      phone,
      altPhone,
      city,
      state,
      aadhaar,
      pan,
      aadhaarPhoto: getFilePath("aadhaarPhoto"),
      panPhoto: getFilePath("panPhoto"),
      profilePhoto: getFilePath("profilePhoto"),
      designation,
      experience: parsedExperience,
      totalExperience: parsedTotalExp,
      education: parsedEducation
    });

    await faculty.save();

    res.status(201).json({ message: "Faculty data submitted successfully" });
  } catch (error) {
    console.error("Error submitting faculty form:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;   */



const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Faculty = require('../models/Faculty');
//const { createFaculty } = require('../controllers/facultyController');
const upload = require('../middleware/upload');
const mongoose = require('mongoose');


const {
  //createFaculty,
  submitFacultyForm,
  saveResearchAndDevelopmentData
} = require("../controllers/facultyController");

// Multiple file upload (5 certificates)
const cpUpload = upload.fields([
  { name: "aadhaarPhoto", maxCount: 1 },
  { name: "panPhoto", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
  { name: 'school_uploadCertificate', maxCount: 1 },
  { name: 'institution_uploadCertificate', maxCount: 1 },
  { name: 'ug_certificate', maxCount: 1 },
  { name: 'pg_certificate', maxCount: 1 },
  { name: 'phd_certificate', maxCount: 1 },
  // R&D and Development Docs
  { name: 'presentationDocument', maxCount: 10 },
  { name: 'publicationDocument', maxCount: 10 },
  { name: 'collabDocument', maxCount: 10 },
  { name: 'workshopCertificate', maxCount: 10 },
  { name: 'conferenceCertificate', maxCount: 10 },
  { name: 'eventDocument', maxCount: 10 }
]);

//router.post('/submit-rnd', cpUpload, saveResearchAndDevelopmentData);

/*router.post('/submit-form', upload.any(), (req, res) => {
  console.log('Files:', req.files);
  console.log('Body:', req.body);
  res.send("OK");
}); */

router.post('/submit-education', cpUpload, async (req, res) => {
  console.log('Files:', req.files); // See what file fields are actually coming
  console.log('Body:', req.body);
  res.send('Received');
  try {
    const body = req.body;
    console.log('request body from frontend', req.body);

    // Research Contributions
    /*const researchContributions = {
      paperPresentations: JSON.parse(body.paperPresentations || '[]').map((item, i) => ({
        ...item,
        documentUrl: req.files['presentationDocument']?.[index]?.path || ''
      })),
      paperPublications: JSON.parse(body.paperPublications || '[]').map((item, i) => ({
        ...item,
        documentUrl: req.files['publicationDocument']?.[index]?.path || ''
      })),
      collaborations: JSON.parse(body.collaborations || '[]').map((item, i) => ({
        ...item,
        documentUrl: req.files['collabDocument']?.[index]?.path || ''
      }))
    };*/

    const researchContributions = {
      paperPresentations: {
        paperPresentationTitle: body.paperPresentationTitle || '',
        conference: body.conference || '',
        location: body.location || '',
        presentationDate: new Date(body.presentationDate) || '',
        presentationRole: body.presentationRole || '',
        presentationDocument: req.files?.['presentationDocument']?.[0]?.path || ''
      },
      paperPublications: {
        publicationTitle: body.publicationTitle || '',
        journal: body.journal || '',
        volume: body.volume || '',
        issue: body.issue || '',
        doi: body.doi || '',
        publicationDate: new Date(body.publicationDate) || '',
        publicationDocument: req.files?.['publicationDocument']?.[0]?.path || ''
      },
      collaborations: {
        collabTitle: body.collabTitle || '',
        partnerInstitution: body.partnerInstitution,
        collabType: body.collabType,
        collabDuration: body.collabDuration,
        collabDocument: req.files?.['collabDocument']?.[0]?.path || ''
      }
    };

    const professionalDevelopment = {
      workshopsAttended: {
        workshopTitle: body.workshopTitle || '',
        workshopOrganization: body.workshopOrganization || '',
        workshopDuration: body.workshopDuration || '',
        workshopMode: body.workshopMode || '', // Online/Offline
        workshopDate: body.workshopDate || '',
        workshopCertificate: req.files?.['workshopCertificate']?.[0]?.path || ''
      },
      conferencesAttended: {
        conferenceName: body.conferenceName || '',
        conferenceOrganizer: body.conferenceOrganizer || '',
        conferenceDate: body.conferenceDate || '',
        conferenceLocation: body.conferenceLocation || '',
        conferenceCertificate: req.files?.['conferenceCertificate']?.[0]?.path || ''
      },
      eventsOrganized: {
        eventName: body.eventName || '',
        eventRole: body.eventRole || '', // Coordinator/Convenor
        eventDepartment: body.eventDepartment || '',
        eventDate: body.eventDate || '',
        eventDocument: req.files?.['eventDocument']?.[0]?.path || ''
      }
    };


    // Professional Development
    /*const professionalDevelopment = {
      workshopsAttended: JSON.parse(body.workshopsAttended || '[]').map((item, i) => ({
        ...item,
        certificateUrl: req.files['workshopCertificate']?.[index]?.path || ''
      })),
      conferencesAttended: JSON.parse(body.conferencesAttended || '[]').map((item, i) => ({
        ...item,
        certificateUrl: req.files['conferenceCertificate']?.[index]?.path || ''
      })),
      eventsOrganized: JSON.parse(body.eventsOrganized || '[]').map((item, i) => ({
        ...item,
        documentUrl: req.files['eventDocument']?.[index]?.path || ''
      }))
    };*/

    // Extract and construct education section
    const education = {
      ssc: {
        schoolOrInstitution: body.school_name,
        boardOrUniversity: body.school_board_name,
        city: body.school_city,
        state: body.school_state,
        yearOfCompletion: body.school_yearOfCompletion,
        percentage: body.school_percentage,
        certificateUrl: req.files['school_uploadCertificate']?.[0]?.path || ''
      },
      intermediate: {
        schoolOrInstitution: body.institution_name,
        boardOrUniversity: body.institution_board_name,
        specialization: body.institution_specialization,
        city: body.institution_city,
        state: body.institution_state,
        yearOfCompletion: body.institution_yearOfCompletion,
        percentage: body.institution_percentage,
        certificateUrl: req.files['institution_uploadCertificate']?.[0]?.path || ''
      },
      ug: {
        degree: body.ug_degree,
        specialization: body.ug_specialization,
        schoolOrInstitution: body.ug_institution,
        city: body.ug_city,
        state: body.ug_state,
        yearOfCompletion: body.ug_yearOfCompletion,
        boardOrUniversity: body.ug_university,
        institutionType: body.ug_institutionType,
        percentage: body.ug_percentage,
        certificateUrl: req.files['ug_certificate']?.[0]?.path || ''
      },
      pg: {
        degree: body.pg_degree,
        specialization: body.pg_specialization,
        schoolOrInstitution: body.pg_institution,
        city: body.pg_city,
        state: body.pg_state,
        yearOfCompletion: body.pg_yearOfCompletion,
        boardOrUniversity: body.pg_university,
        institutionType: body.pg_institutionType,
        percentage: body.pg_percentage,
        certificateUrl: req.files['pg_certificate']?.[0]?.path || ''
      },
      phd: {
        degree: body.phd_degree,
        specialization: body.phd_specialization,
        schoolOrInstitution: body.phd_institution,
        city: body.phd_city,
        state: body.phd_state,
        yearOfCompletion: body.phd_yearOfCompletion,
        boardOrUniversity: body.phd_university,
        certificateUrl: req.files['phd_certificate']?.[0]?.path || ''
      }
    };

    const personal = {
      name: body.name,
      gender: body.gender,
      dob: new Date(body.dob),
      age: Number(body.age),
      email: body.email,
      phone: body.phone,
      altPhone: body.altPhone || '',
      city: body.personal_city || '',
      state: body.personal_state || '',
      aadhaar: body.aadhaar || '',
      aadhaarPhoto: req.files['aadhaarPhoto']?.[0]?.path || '',
      pan: body.pan || '',
      panPhoto: req.files['panPhoto']?.[0]?.path || '',
      profilePhoto: req.files['profilePhoto']?.[0]?.path || ''
    };

    const professional = {
      designation: body.professional_designation || 'Faculty', // Set default if needed
      experienceUnit: body.professional_experienceUnit || 'y',
      totalExperienceIT: parseFloat(body.totalExperienceIT) || 0,
      totalExperienceTeaching: parseFloat(body.totalExperienceTeaching) || 0,
      totalExperienceOverall: parseFloat(body.totalExperienceOverall) || 0,
      experiences: JSON.parse(body.experiences || '[]'),
      researchContributions,
      professionalDevelopment
    };

    const newFaculty = new Faculty({
      personal,
      professional,
      education
    });

    await newFaculty.save();

    res.status(201).json({
      message: 'Education details submitted successfully',
      facultyId: newFaculty._id
    });
  } catch (error) {
    console.error('Error saving education:', error);
    res.status(500).json({ message: 'Server error', error });
  }

  console.log("Reached /submit-education");
});

router.get('/basic-info', async (req, res) => {
  try {
    const facultyList = await Faculty.find({}, {
      'personal.name': 1,
      'personal.email': 1,
      'personal.profilePhoto': 1,
      'professional.designation': 1,
      'professional.department': 1,
      _id: 0
    });
    res.json(facultyList);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;






