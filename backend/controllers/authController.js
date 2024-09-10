//authcontroller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ajustez le chemin si nécessaire
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail'); // Assurez-vous que le chemin est correct


// Fonction pour enregistrer un nouvel utilisateur
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, gender, password } = req.body;

    // Vérifiez si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Utilisateur déjà existant' });
    }

    // Créez un nouvel utilisateur
    user = new User({ firstName, lastName, email, gender, password });
    
    // Hachage du mot de passe avant de sauvegarder
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Génération d'un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      token,
      user: { id: user._id, firstName: user.firstName, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fonction pour la connexion d'un utilisateur
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Utilisateur inexistant' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Identifiants invalides' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Déterminer la redirection en fonction du rôle
    let redirectUrl = '/mainpage'; // URL par défaut pour les utilisateurs normaux
    if (email === 'admin@flexzonegym.com' && password === 'admin1234') {
      redirectUrl = '/home2'; // URL spécifique pour l'admin
    }

    res.json({
      token,
      user: { id: user._id, firstName: user.firstName, email: user.email },
      redirectUrl // Ajout de l'URL de redirection
    });
    console.log('Redirect URL:', redirectUrl); // Vérifiez dans les logs du serveur
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*
//authcontroller.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fonction pour enregistrer un nouvel utilisateur
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, gender, password } = req.body;

    // Vérifiez si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Utilisateur déjà existant' });
    }

    // Créez un nouvel utilisateur
    user = new User({ firstName, lastName, email, gender, password });
    
    // Hachage du mot de passe avant de sauvegarder
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Génération d'un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      token,
      user: { id: user._id, firstName: user.firstName, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//hon bass 8ayrna
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifiez si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Utilisateur inexistant' });

    // Validation du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Identifiants invalides' });

    // Vérification si c'est l'administrateur
    if (email === 'admin@flexzonegym.com' && password === 'admin1234') {
      // Redirigez l'utilisateur vers la page admin (home 2)
      return res.status(200).json({ redirectUrl: '/home2', msg: 'Bienvenue, Admin!' });
    }

    // Génération d'un token JWT pour les utilisateurs normaux
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: { id: user._id, firstName: user.firstName, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/
/*
// Fonction pour la connexion d'un utilisateur
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifiez si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Utilisateur inexistant' });

    // Validation du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Identifiants invalides' });

    // Génération d'un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: { id: user._id, firstName: user.firstName, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/







































/*// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, gender, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    user = new User({ firstName, lastName, email, gender, password });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, firstName: user.firstName, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, firstName: user.firstName, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};*/
