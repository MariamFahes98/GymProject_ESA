const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    trainer: { type: Schema.Types.ObjectId, ref: 'Trainer', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true }, // e.g., '09:00'
    endTime: { type: String, required: true }, // e.g., '10:00'
    location: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Schedule', scheduleSchema);