const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'member',
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  bundle: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Path to the image
  },
  // Link to the User model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // Reference to the classes the member is registered for
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
