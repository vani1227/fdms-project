const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  type: { type: String, enum: ['Presentation', 'Publication', 'Collaboration'], required: true },
  title: String,
  conferenceOrJournal: String,
  date: Date,
  location: String,
  collaborators: [String],
  doi: String,
  file: String // Path to uploaded certificate or proof
});

module.exports = mongoose.model('Research', researchSchema);
