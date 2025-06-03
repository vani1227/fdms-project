/*const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  type: { type: String, enum: ["IT", "Teaching"], required: true },
  company: String,
  designation: String,
  startDate: Date,
  endDate: Date,
  years: Number,
  months: Number
});

const EducationSchema = new mongoose.Schema({
  level: { type: String, enum: ["SSC", "Intermediate", "UG", "PG", "PhD"], required: true },
  instituteName: String,
  boardOrUniversity: String,
  specialization: String,
  city: String,
  state: String,
  yearOfCompletion: Number,
  percentageOrCGPA: Number,
  institutionType: { type: String, enum: ["Govt", "Private", "Deemed"], default: "" },
  certificatePath: String // File upload path
});

const FacultySchema = new mongoose.Schema({
  // Personal Details
  name: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  dob: { type: Date, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  altPhone: String,
  city: String,
  state: String,
  aadhaar: String,
  aadhaarPhoto: String, // Path to uploaded file
  pan: String,
  panPhoto: String,
  profilePhoto: String,

  // Professional Details
  designation: String,
  experience: [ExperienceSchema],
  totalExperience: {
    it: {
      years: Number,
      months: Number
    },
    teaching: {
      years: Number,
      months: Number
    },
    combined: {
      years: Number,
      months: Number
    }
  },

  // Education Details
  education: [EducationSchema]
});

module.exports = mongoose.model("Faculty", FacultySchema);
*/



/*const ExperienceSchema = new mongoose.Schema({
  type: String,
  start: Date,
  end: Date
});*/


// ✅ Professional Details
/*professional: {
  designation: String,
  experience: [ExperienceSchema],
  totalExperience: {
    it: {
      years: Number,
      months: Number
    },
    teaching: {
      years: Number,
      months: Number
    },
    combined: {
      years: Number,
      months: Number
    }
  }
}, */
//this is the older one
/* professional: {
   designation: { type: String, required: true },
   experience: [ExperienceSchema], // array of detailed experience
   totalExperience: {
     it: ExperienceSummarySchema,
     teaching: ExperienceSummarySchema,
     combined: ExperienceSummarySchema
   },
   experienceUnit: { type: String, enum: ["y", "md", "d"], default: "y" } // optional, based on dropdown
 }, */

//const mongoose = require('mongoose');

//This is the older one
/*const ExperienceSchema = new mongoose.Schema({
  field: { type: String, required: true },         // IT or Teaching, etc.
  organization: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  start: { type: Date, required: true },
  end: { type: Date, required: true }
}, { _id: false }); */

/*const experienceSchema = new mongoose.Schema({
  field: {
    type: String,
    enum: ['IT', 'Teaching'],
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  city: String,
  state: String,
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  }
});

// Total experience structure
const ExperienceSummarySchema = new mongoose.Schema({
  years: { type: Number, default: 0 },
  months: { type: Number, default: 0 }
}, { _id: false });

/*const EducationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  year: Number,
  certificatePath: String
}); */

/*const EducationSchema = new mongoose.Schema({
  level: String,
  degree: String,
  specialization: String,
  institution: String,
  boardOrUniversity: String,
  city: String,
  state: String,
  year: Number,
  percentageOrCGPA: Number,
  institutionType: String,
  certificatePath: String
}); */

// Main education schema with each level as a separate required field

/*const FacultySchema = new mongoose.Schema({
  // ✅ Personal Details nested
  personal: {
    name: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dob: { type: Date, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    altPhone: String,
    city: String,
    state: String,
    aadhaar: String,
    aadhaarPhoto: String,
    pan: String,
    panPhoto: String,
    profilePhoto: String
  },

  //professional nested
professional:{
  designation: {
    type: String,
    required: true,
  },
  experienceUnit: {
    type: String,
    enum: ['y', 'md', 'd'], // y = Years & Months, md = Months & Days, d = Days
    default: 'y',
  },
  experiences: [experienceSchema], // Array of experiences
  totalExperience: {
    it: {
      years: { type: Number, default: 0 },
      months: { type: Number, default: 0 },
    },
    teaching: {
      years: { type: Number, default: 0 },
      months: { type: Number, default: 0 },
    },
    overall: {
      years: { type: Number, default: 0 },
      months: { type: Number, default: 0 },
    },
  },

},
//education details nested
  education: [educationSchema],
  
});
module.exports = mongoose.model("Faculty", FacultySchema);  */







const mongoose = require('mongoose');

// Experience schema
const experienceSchema = new mongoose.Schema({
  field: {
    type: String,
    enum: ['IT', 'Teaching'],
    required: true,
  },
  organization: { type: String, required: true },
  city: String,
  state: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

// Total experience summary
const ExperienceSummarySchema = new mongoose.Schema({
  years: { type: Number, default: 0 },
  months: { type: Number, default: 0 }
}, { _id: false });

// Education level schemas
const educationLevelSchema = new mongoose.Schema({
  schoolOrInstitution: { type: String, required: true },
  boardOrUniversity: { type: String, required: true },
  specialization: { type: String },
  degree: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  yearOfCompletion: { type: Number, required: true },
  percentage: { type: Number },
  institutionType: {
    type: String,
    enum: ['Govt', 'Private', 'Deemed'],
  },
  certificateUrl: { type: String, required: true }
}, { _id: false });

const educationLevelSchemaphd = new mongoose.Schema({
  schoolOrInstitution: { type: String },
  boardOrUniversity: { type: String },
  specialization: { type: String },
  degree: { type: String },
  city: { type: String },
  state: { type: String },
  yearOfCompletion: { type: Number },
  percentage: { type: Number },
  institutionType: {
    type: String,
    enum: ['Govt', 'Private', 'Deemed'],
  },
  certificateUrl: { type: String }
}, { _id: false });

const educationSchema = new mongoose.Schema({
  ssc: { type: educationLevelSchema, required: true },
  intermediate: { type: educationLevelSchema, required: true },
  ug: { type: educationLevelSchema, required: true },
  pg: { type: educationLevelSchema, required: true },
  phd: { type: educationLevelSchemaphd }
}, { _id: false });

// Main faculty schema
const FacultySchema = new mongoose.Schema({
  personal: {
    name: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dob: { type: Date, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    altPhone: String,
    city: String,
    state: String,
    aadhaar: String,
    aadhaarPhoto: String,
    pan: String,
    panPhoto: String,
    profilePhoto: String
  },

  professional: {
    designation: { type: String, required: true },
    experienceUnit: {
      type: String,
      enum: ['y', 'md', 'd'],
      default: 'y',
    },
    experiences: [experienceSchema],
    totalExperienceIT: { type: Number },
    totalExperienceTeaching: { type: Number },
    totalExperienceOverall: { type: Number }
  },

  education: { type: educationSchema, required: true },
  detailsSubmitted: { type: Boolean, default: false },

  // ✅ Fields added for HOD dashboard functionality
  department: { type: String, required: true },
  role: { type: String, enum: ['Faculty', 'HOD', 'Admin'], default: 'Faculty' },
  leaveRecords: { type: Array, default: [] },
  reviews: { type: Array, default: [] },
  announcements: { type: Array, default: [] }
});

// ✅ Avoid OverwriteModelError
module.exports = mongoose.models.Faculty || mongoose.model("Faculty", FacultySchema);

