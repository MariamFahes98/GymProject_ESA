const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainerSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  phoneNumber: String,
  specialties: [String],
  imagePath: String, 
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
},{ timestamps: true });

module.exports = mongoose.model('Trainer', trainerSchema);




