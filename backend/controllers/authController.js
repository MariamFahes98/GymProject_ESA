//authcontroller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');

// Function to register a new user
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, gender, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ firstName, lastName, email, gender, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      token,
      user: { id: user._id, firstName: user.firstName, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function for user login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    let redirectUrl = '/';
    if (email === 'admin@flexzonegym.com' && password === 'admin1234') {
      redirectUrl = '/dashboard';
    }

    res.json({
      token,
      user: { id: user._id, firstName: user.firstName, email: user.email },
      redirectUrl
    });
    console.log('Redirect URL:', redirectUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, email, password, length, weight, city, country, phoneNumber, age } = req.body;
    
    const updatedData = {
      firstName,
      lastName,
      email,
      length,
      weight,
      city,
      country,
      phoneNumber,
      age,
    };

    if (req.file) {
      updatedData.profileImage = `/uploads/admin/${req.file.filename}`;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
};
