const mongoose = require("mongoose");

const HodSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
});

module.exports = mongoose.model("HOD", HodSchema);
