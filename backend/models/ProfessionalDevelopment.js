const mongoose = require('mongoose');

const profDevSchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  eventType: { type: String, enum: ['Workshop', 'FDP', 'STTP', 'Conference', 'Event Organized'], required: true },
  title: String,
  date: Date,
  duration: String,
  role: String, // Participant, Organizer, Coordinator
  location: String,
  certificate: String
});

module.exports = mongoose.model('ProfessionalDevelopment', profDevSchema);
