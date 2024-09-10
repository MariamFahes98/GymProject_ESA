//UserRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure this path is correct
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/admin')); // Folder where files will be saved
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
  }
});
const upload = multer({ storage });

// Route for registration
router.post('/register', userController.registerUser);

// Route for login
router.post('/login', userController.loginUser);

// Route to get profile
router.get('/profile', authMiddleware, userController.getProfile);

// Route to update profile with image
router.put('/profile', authMiddleware, upload.single('profileImage'), userController.updateProfile);




// Route to get all users
router.get('/users', authMiddleware, userController.getAllUsers);

router.get('/count', authMiddleware,userController.getUserCount);
// Fetch oldest 4 trainers
router.get('/oldest', authMiddleware,userController.getOldestUsers);

module.exports = router;


