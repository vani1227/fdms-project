const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
    name: String,
    hod: { type: mongoose.Schema.Types.ObjectId, ref: "hod" }
});

module.exports = mongoose.model("Department", DepartmentSchema);
