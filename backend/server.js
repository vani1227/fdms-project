/*const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/auth', authRoutes); // Authentication Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); */








/*const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//const experiences = JSON.parse(req.body.experiences); // Save this to MongoDB in your schema



dotenv.config();
console.log('EMAIL:', process.env.EMAIL);

const authRoutes = require('./routes/authRoutes'); // Authentication Routes
const facultyRoutes = require('./routes/facultyRoutes'); // Faculty Routes (Make sure this file exists)

const hodRoutes = require("./routes/hodRoutes");
const adminRoutes = require('./routes/adminRoutes');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('frontend/public'));

app.use('/uploads', express.static('uploads')); // To serve images

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/api/faculty', facultyRoutes); // Faculty routes
app.use("/api/hod", hodRoutes);
app.use('/api/admin', adminRoutes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  */

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const Faculty = require('./models/Faculty');

dotenv.config();
console.log('EMAIL:', process.env.EMAIL);

const authRoutes = require('./routes/authRoutes');       // Authentication Routes
const facultyRoutes = require('./routes/facultyRoutes'); // Faculty Routes
const hodRoutes = require('./routes/hodRoutes');         // HOD Routes
const adminRoutes = require('./routes/adminRoutes');     // Admin Routes

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set true only if using HTTPS
}));

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:3000', // or your frontend URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('frontend/public'));
app.use('/uploads', express.static('uploads')); // To serve uploaded files
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/frontend/public', express.static(path.join(__dirname, 'frontend/public')));


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));



// API Routes
app.use(adminRoutes);
app.use('/auth', authRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/hod', hodRoutes);
app.use('/api/admin', adminRoutes); // ✅ You were missing this line
//app.use('/api/faculty-public', require('./routes/facultyPublicView'));


const facultySchema = new mongoose.Schema({
    name: String,
    department: String,
    role: String,
    leaveRecords: Array,
    reviews: Array,
    announcements: Array,
});

//const Faculty = require('./models/Faculty')
// Login API (simple HOD check)
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    // Replace this with real user lookup and hashing
    if (username === 'hod' && password === 'hod123') {
        return res.json({ success: true, role: 'HOD', department: 'CSE' });
    }
    res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Get faculty by department
app.get('/api/faculty/by-department/:department', async (req, res) => {
    try {
        const department = req.params.department;
        const facultyList = await Faculty.find({ department });
        res.json(facultyList);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching faculty list' });
    }
});

// Get leave records
app.get('/api/faculty/leave/:department', async (req, res) => {
    try {
        const department = req.params.department;
        const leaves = await Faculty.find({ department }, { name: 1, leaveRecords: 1 });
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching leave records' });
    }
});

// Get reviews
app.get('/api/faculty/review/:department', async (req, res) => {
    try {
        const department = req.params.department;
        const reviews = await Faculty.find({ department }, { name: 1, reviews: 1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching reviews' });
    }
});

// Get announcements
app.get('/api/faculty/announcements/:department', async (req, res) => {
    try {
        const department = req.params.department;
        const announcements = await Faculty.find({ department }, { name: 1, announcements: 1 });
        res.json(announcements);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching announcements' });
    }
});
//define port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//define port
//const PORT = process.env.PORT || 5000;
// Start Server
//app.listen(PORT, () => {
 // console.log(`Server running on port ${PORT}`);
//});





