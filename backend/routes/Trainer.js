const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const trainerController = require('../controllers/Trainer');



// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/trainers')); // Folder where files will be saved
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
  }
});

const upload = multer({ storage });

router.get('/count', trainerController.getTrainerCount);
// Fetch oldest 4 trainers
router.get('/oldest', trainerController.getOldestTrainers);

router.get('/api/trainers/:id', async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).send('Trainer not found');
    }
    res.json(trainer);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


// Create a new trainer
router.post('/', upload.single('imagePath'), trainerController.createTrainer);

// Update a trainer by ID
router.put('/:id', upload.single('imagePath'), trainerController.updateTrainerById);

// Other routes
router.get('/', trainerController.getAllTrainers);
router.get('/:id', trainerController.getTrainerById);
router.delete('/:id', trainerController.deleteTrainerById);

module.exports = router;
