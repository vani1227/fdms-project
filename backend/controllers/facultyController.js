/*const Faculty = require('../models/Faculty');

const submitFacultyForm = async (req, res) => {
  try {
    // Parse experience and education details
    const experienceDetails = JSON.parse(req.body.experienceDetails || '[]');
    const educationDetails = JSON.parse(req.body.educationDetails || '[]');

    // Map certificate files to education details
    const education = educationDetails.map((edu, index) => ({
      ...edu,
      certificatePath: req.files[`certificates[${index}]`]?.[0]?.path || '',
    }));

    // Construct the properly nested faculty object
    const newFaculty = new Faculty({
      personal: {
        name: req.body.name,
        gender: req.body.gender,
        dob: req.body.dob,
        age: req.body.age,
        email: req.body.email,
        phone: req.body.phone,
        altPhone: req.body.altPhone,
        city: req.body.city,
        state: req.body.state,
        aadhaar: req.body.aadhaar,
        pan: req.body.pan,
        aadhaarPhoto: req.files['aadhaarPhoto']?.[0]?.path,
        panPhoto: req.files['panPhoto']?.[0]?.path,
        profilePhoto: req.files['profilePhoto']?.[0]?.path,
      },
      /*professional: {
        designation: req.body.designation,
        experiences: experienceDetails
      }, */

/*professional: {
  designation: req.body.designation,
  experience: experienceDetails,
  totalExperience: {
    it: { years: 0, months: 0 }, // compute if needed
    teaching: { years: 0, months: 0 },
    combined: { years: 0, months: 0 }
  },
  experienceUnit: req.body.experienceUnit || "y"
},
education: education


});
 

// Save to DB
await newFaculty.save();
res.status(201).json({ message: 'Faculty data saved successfully' });

} catch (err) {
console.error("Submit Faculty Form Error:", err);
res.status(500).json({ error: 'Internal Server Error', details: err.message });
}
};



module.exports = { submitFacultyForm };  */





/*const Faculty = require('../models/Faculty');

const createFaculty = async (req, res) => {
  try {
    const {
      name, gender, dob, age, email, phone, altPhone, city, state,
      aadhaar, pan, designation, department, role, experiences, education
    } = req.body;

    // File paths
    const aadhaarPhoto = req.files['aadhaarPhoto']?.[0]?.path || '';
    const panPhoto = req.files['panPhoto']?.[0]?.path || '';
    const profilePhoto = req.files['profilePhoto']?.[0]?.path || '';

    // Parse JSON strings to objects
    const parsedExperiences = JSON.parse(experiences || '[]');
    const parsedEducation = JSON.parse(education || '[]');

    // Attach certificate file paths
    parsedEducation.forEach((edu, index) => {
      edu.certificateUrl = req.files[`certificate${index}`]?.[0]?.path || '';
    });

    // Calculate total experience
    const calcExperience = (field) => {
      let totalMonths = 0;
      parsedExperiences
        .filter(exp => exp.field === field)
        .forEach(exp => {
          const start = new Date(exp.startDate);
          const end = new Date(exp.endDate);
          const diff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
          totalMonths += diff;
        });
      return {
        years: Math.floor(totalMonths / 12),
        months: totalMonths % 12
      };
    };

    const itExp = calcExperience('IT');
    const teachingExp = calcExperience('Teaching');
    const totalMonthsOverall = parsedExperiences.reduce((acc, exp) => {
      const start = new Date(exp.startDate);
      const end = new Date(exp.endDate);
      return acc + ((end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()));
    }, 0);

    const overallExp = {
      years: Math.floor(totalMonthsOverall / 12),
      months: totalMonthsOverall % 12
    };

    const newFaculty = new Faculty({
      personal: {
        name, gender, dob, age, email, phone, altPhone, city, state,
        aadhaar, pan, aadhaarPhoto, panPhoto, profilePhoto
      },
      professional: {
        designation,
        experiences: parsedExperiences,
        totalExperience: {
          it: itExp,
          teaching: teachingExp,
          overall: overallExp
        },
        department,
        role
      },
      education: parsedEducation
    });

    await newFaculty.save();
    res.status(201).json({ message: 'Faculty data saved successfully', data: newFaculty });

  } catch (error) {
    console.error('Error saving faculty:', error.message);
    res.status(500).json({ error: 'Server Error: ' + error.message });
  }
};

module.exports = { createFaculty };
*/


const Faculty = require('../models/Faculty');

const createFaculty = async (req, res) => {
  try {

    console.log("FILES:", req.files);
    console.log("BODY:", req.body);

    const {
      name, gender, dob, age, email, phone, altPhone, city, state,
      aadhaar, pan, designation, department, role, experiences,
      //researchContributions,
      //professionalDevelopment,
      //reportingMeta,
      paperPresentationTitle,
      conference,
      location,
      presentationDate,
      presentationRole,
      publicationTitle,
      journal,
      volume,
      issue,
      doi,
      publicationDate,
      collabTitle,
      partnerInstitution,
      collabType,
      collabDuration,
      workshopTitle,
      workshopOrganization,
      workshopDuration,
      workshopMode,
      workshopDate,
      conferenceName,
      conferenceOrganizer,
      conferenceDate,
      conferenceLocation,
      eventName,
      eventRole,
      eventDepartment,
      eventDate,
      education
    } = req.body;

    // File paths
    const aadhaarPhoto = req.files['aadhaarPhoto']?.[0]?.path || '';
    const panPhoto = req.files['panPhoto']?.[0]?.path || '';
    const profilePhoto = req.files['profilePhoto']?.[0]?.path || '';


    const schoolCertificate = req.files['school_uploadCertificate']?.[0]?.path || '';
    const institutionCertificate = req.files['institution_uploadCertificate']?.[0]?.path || '';
    const ugCertificate = req.files['ug_certificate']?.[0]?.path || '';
    const pgCertificate = req.files['pg_certificate']?.[0]?.path || '';
    const phdCertificate = req.files['phd_certificate']?.[0]?.path || '';


    const presentationDocument = req.files['presentationDocument']?.[0]?.path || '';
    const publicationDocument = req.files['publicationDocument']?.[0]?.path || '';
    const collabDocument = req.files['collabDocument']?.[0]?.path || '';
    const workshopCertificate = req.files['workshopCertificate']?.[0]?.path || '';
    const conferenceCertificate = req.files['conferenceCertificate']?.[0]?.path || '';
    const eventDocument = req.files['eventDocument']?.[0]?.path || '';
    // Parse JSON inputs
    let parsedExperiences = [];
    let parsedEducation = [];

    try {
      parsedExperiences = JSON.parse(experiences || '[]');
      parsedEducation = JSON.parse(education || '[]');
    } catch (err) {
      return res.status(400).json({ error: 'Invalid experience or education data format.' });
    }

    // Add certificate paths to each education item
    parsedEducation.forEach((edu, index) => {
      edu.certificateUrl = req.files[`certificate${index}`]?.[0]?.path || '';
    });
    console.log("Incoming Files:", req.files);  // Log the whole files object
    console.log("Parsed Education:", parsedEducation);

    // 🔍 Experience Calculation Helper
    const calcExperience = (field) => {
      let totalMonths = 0;
      parsedExperiences
        .filter(exp => exp.field === field)
        .forEach(exp => {
          const start = new Date(exp.startDate);
          const end = new Date(exp.endDate);

          if (!isNaN(start) && !isNaN(end) && end > start) {
            const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
            totalMonths += months;
          }
        });

      return {
        years: Math.floor(totalMonths / 12),
        months: totalMonths % 12,
      };
    };

    const itExp = calcExperience('IT');
    const teachingExp = calcExperience('Teaching');

    const overallMonths = parsedExperiences.reduce((acc, exp) => {
      const start = new Date(exp.startDate);
      const end = new Date(exp.endDate);

      if (!isNaN(start) && !isNaN(end) && end > start) {
        return acc + ((end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()));
      }
      return acc;
    }, 0);

    const overallExp = {
      years: Math.floor(overallMonths / 12),
      months: overallMonths % 12,
    };


    const personalData = JSON.parse(req.body.personal || '{}');
    const professionalData = JSON.parse(req.body.professional || '{}');
    const educationData = JSON.parse(req.body.education || '[]');
    const experienceArray = JSON.parse(professionalData.experience || '[]');

    // Final Document
    const newFaculty = new Faculty({
      /*personal: {
        name, gender, dob, age, email, phone, altPhone, city, state,
        aadhaar, pan, aadhaarPhoto, panPhoto, profilePhoto
      },*/
      personal: JSON.parse(req.body.personal || '{}'),


      city: Array.isArray(personalData.city) ? personalData.city[0] : personalData.city,
      state: Array.isArray(personalData.state) ? personalData.state[0] : personalData.state,


      professional: {
        designation,
        experiences: parsedExperiences,
        totalExperience: {
          it: itExp,
          teaching: teachingExp,
          overall: overallExp
        },
        /*researchContributions: {
          paperPresentations: researchContributions?.paperPresentations || '',
          paperPublications: researchContributions?.paperPublications || '',
          collaborations: researchContributions?.collaborations || ''
        },*/

        researchContributions: {
          paperPresentations: JSON.stringify(researchContributions?.paperPresentations || ''),
          paperPublications: JSON.stringify(researchContributions?.paperPublications || ''),
          collaborations: JSON.stringify(researchContributions?.collaborations || '')
        },
        professionalDevelopment: {
          workshopsAttended: JSON.stringify(professionalDevelopment?.workshopsAttended || ''),
          conferencesAttended: JSON.stringify(professionalDevelopment?.conferencesAttended || ''),
          eventsOrganized: JSON.stringify(professionalDevelopment?.eventsOrganized || '')
        },
        /* reportingMeta: {
           lastReportGeneratedAt: reportingMeta?.lastReportGeneratedAt || null,
           reportFormatsAvailable: reportingMeta?.reportFormatsAvailable || [],
           notes: reportingMeta?.notes || ''
         },*/
      },
      education: parsedEducation // ✅ Store under `professional.education`
    });

    await newFaculty.save();

    res.status(201).json({
      message: 'Faculty data saved successfully',
      data: newFaculty
    });

  } catch (error) {
    console.error('Error saving faculty:', error.message);
    res.status(500).json({ error: 'Server Error: ' + error.message });
  }
};

// Controller to fetch all records
const getAllFacultyData = async (req, res) => {
  try {
    const data = await Faculty.find();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { createFaculty, getAllFacultyData };
