
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  country: { type: String },
  city: { type: String },
  phoneNumber: { type: String },
  age: { type: Number },
  length: { type: Number },
  weight: { type: Number },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  profileImage: { type: String },
  registeredDate: { type: Date, default: Date.now }
},{ timestamps: true });

// Hash le mot de passe avant de sauvegarder
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);