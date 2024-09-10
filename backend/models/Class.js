const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  days: { type: [String], required: true },
  time: String,
  duration: Number, // duration in minutes
  capacity: Number,
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
  schedule: [{ day: String, time: String }],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  // Reference to the members registered for the class
  registeredMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }]
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
