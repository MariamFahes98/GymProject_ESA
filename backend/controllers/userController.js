//usercontroller
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');



// Register User
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, gender, password, length, weight, city, country, phoneNumber, age } = req.body;
    const user = new User({ firstName, lastName, email, gender, password, length, weight, city, country, phoneNumber, age });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
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
    if (!user) return res.status(400).json({ msg: 'Utilisateur inexistant' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Identifiants invalides' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    let redirectUrl = '/mainpage';
    if (email === 'admin@flexzonegym.com' && password === 'admin1234') {
      redirectUrl = '/home2';
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

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    console.log('Update Request Body:', req.body); // Affiche les données reçues dans la console pour le débogage
    const { firstName, lastName, email, password, length, weight, city, country, phoneNumber, age } = req.body;
    const updatedData = { firstName, lastName, email, length, weight, city, country, phoneNumber, age };

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
    console.error('Update Error:', err); // Affiche l'erreur dans la console pour le débogage
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
};


// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    const message = `Vous avez demandé une réinitialisation de mot de passe. Veuillez faire une requête PUT à : \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Réinitialisation du mot de passe',
        message,
      });

      res.status(200).json({ msg: "Email envoyé avec succès" });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error); // Log de l'erreur
      res.status(500).json({ msg: "L'email n'a pas pu être envoyé" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Erreur du serveur", error: err.message });
  }
};


// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    // Hasher le token reçu via l'URL
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    // Trouver l'utilisateur avec ce token et vérifier si le token n'a pas expiré
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, // Vérifier que le token est encore valide
    });

    if (!user) {
      return res.status(400).json({ message: 'Le lien est invalide ou a expiré' });
    }

    // Mettre à jour le mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    // Supprimer le token et la date d'expiration
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};


/*const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, gender, password, length, weight, city,country, phoneNumber, age } = req.body;
    const user = new User({ firstName, lastName, email, gender, password, length, weight, city,country, phoneNumber, age });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ msg: 'Error registering user', err });
  }
};
/*exports.registerUser = async (req, res) => {  // Renommé en registerUser
  try {
    const { firstName, lastName, email, gender, password } = req.body;
    const user = new User({ firstName, lastName, email, gender, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ msg: 'Error registering user', err });
  }
};*/
/*
exports.loginUser = async (req, res) => {  // Renommé en loginUser
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
};

//hon el jdad 

// Function to get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to update user profile
exports.updateProfile = async (req, res) => {
  try {
    console.log('Update Request Body:', req.body); // Ajoutez ceci pour voir les données reçues
    const { firstName, lastName, email, password, length, weight, city,country, phoneNumber, age } = req.body;
    const updatedData = { firstName, lastName, email, length, weight, city,country, phoneNumber, age };

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
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
};
*/