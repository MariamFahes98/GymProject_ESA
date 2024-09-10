//usercontroller
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Update Profile with Image
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, password, length, weight, city, country, phoneNumber, age ,gender } = req.body;
    
    const updatedData = {
      firstName,
      lastName,
      email,
      length,
      weight,
      city,
      country,
      phoneNumber,
      gender,
      age,
    };

    // Check if the profile image was uploaded and add it to the update
    if (req.file) {
      updatedData.profileImage = `/uploads/admin/${req.file.filename}`;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
};

// Other controller methods...

// Get the count of all trainer
exports.getUserCount = async (req, res) => {
  try {
      const userCount = await User.find({ email: { $ne: 'admin@flexzonegym.com' } }).countDocuments();
      res.status(200).json({ count: userCount });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Get the first 4 trainers created (oldest trainers)
exports.getOldestUsers = async (req, res) => {
  try {
      const oldestUsers = await User.find({ email: { $ne: 'admin@flexzonegym.com' } }).sort({ createdAt: 1 }).limit(4);
      res.status(200).json(oldestUsers);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users except the one with the specified email and exclude the password field
    const users = await User.find({ email: { $ne: 'admin@flexzonegym.com' } }).select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Register User
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, gender, password, length, weight, city, country, phoneNumber, age } = req.body;
    const user = new User({ firstName, lastName, email, gender, password, length, weight, city, country, phoneNumber, age });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ msg: 'Error registering user', err });
  }
};

// Login User
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

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Login User
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

    // Send firstName and lastName to the frontend
    res.json({
      token,
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },
      redirectUrl
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};








