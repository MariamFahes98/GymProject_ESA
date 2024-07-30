const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: {type: String,required: true},
  description: String,
  duration: Number, // duration in minutes
  trainer: {type: Schema.Types.ObjectId,ref: 'Trainer'},
  schedule: [{day: String,time: String}],
  bookings: [{type: Schema.Types.ObjectId,ref: 'Booking'}]}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
