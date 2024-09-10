//routes/UserRoutes.js

const express = require('express');
const { registerUser, loginUser, forgotPassword, resetPassword, getProfile, updateProfile } = require('../controllers/userController');
const router = express.Router();
const auth = require('../middleware/auth');

// Route pour l'inscription
router.post('/register', registerUser);

// Route pour la connexion
router.post('/login', loginUser);

// Route pour obtenir le profil utilisateur
router.get('/profile', auth, getProfile);

// Route pour mettre à jour le profil utilisateur
router.put('/profile', auth, updateProfile);


// Route pour l'oubli de mot de passe
router.post('/forgot-password', forgotPassword);

// Route pour réinitialiser le mot de passe
router.put('/reset-password/:token', resetPassword);

module.exports = router;

/*
//code vrai sans password forgot
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile, forgotPassword, resetPassword } = require('../controllers/userController');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Route pour l'inscription
router.post('/register', registerUser);

// Route pour la connexion
router.post('/login', loginUser);

// Route pour obtenir le profil utilisateur
router.get('/profile', auth, getProfile);

// Route pour mettre à jour le profil utilisateur
router.put('/profile', auth, updateProfile);

// Route for forgot password
router.post('/forgot-password', forgotPassword);

// Route for resetting password
router.post('/reset-password/:token', resetPassword);

// Route pour "forgot password"
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;
*/




/*const express = require('express');
const router = express.Router();
//const { registerUser, loginUser } = require('../controllers/UserController');
const { registerUser, loginUser, getProfile, updateProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');



// Route pour l'inscription
router.post('/register', registerUser);

// Route pour la connexion
router.post('/login', loginUser);

// Route to get user profile
router.get('/profile', auth, getProfile);

// Route to update user profile
router.put('/profile', auth, updateProfile);


module.exports = router;
*/




