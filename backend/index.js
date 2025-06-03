require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db"); // Database connection
const authRoutes = require("./routes/authRoutes"); // Authentication routes

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for frontend communication

// Routes
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
}); 
