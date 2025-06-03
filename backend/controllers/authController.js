const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, password, email, department, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, password: hashedPassword, email, department, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    // const user = await User.findOne({ username: { $regex: new RegExp("^" + username + "$", "i") } });


    if (!user) return res.status(400).json({ message: 'User not found' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendResetLink = async (req, res) => {
  const { emailOrUsername } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ id: user._id }, process.env.RESET_SECRET, { expiresIn: '15m' });

    //const resetLink = `http://localhost:5000/auth/reset-password/${token}`;
    const resetLink = `http://localhost:3000/frontend/public/reset_password.html?token=${token}`;
// Or however you're serving the HTML page from your frontend server


    // Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Reset Your Password',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link valid for 15 minutes.</p>`
    });

    res.status(200).json({ message: 'Reset link sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending reset link', error });
  }
};



/*exports.resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const token = req.params.token;

    if (!token) {
      return res.status(400).json({ message: 'Token is missing' });
    }

    //const decoded = jwt.verify(token, process.env.RESET_SECRET);
    console.log("RESET_SECRET:", process.env.RESET_SECRET);
const decoded = jwt.verify(token, process.env.RESET_SECRET);

    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error("Error during reset:", err.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};   */



exports.resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const token = req.params.token;

    console.log("Token received:", token);
    console.log("RESET_SECRET from env:", process.env.RESET_SECRET);

    //const decoded = jwt.verify(token, process.env.RESET_SECRET); // <-- this might fail

    
    // Verify the token
    const decoded = jwt.verify(token, process.env.RESET_SECRET);
    const userId = decoded.id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error("JWT verification failed:", err.message); // <-- Important
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};




const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS  // app password (NOT your real Gmail password)
  }
});



/*exports.createUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email: username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: username,
      password: hashedPassword,
      email: username,
      role: role.toLowerCase(), // 'faculty' or 'hod'
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });

  } catch (err) {
    console.error('Create User Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};   */








