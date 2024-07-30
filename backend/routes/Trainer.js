const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/Trainer');

// Create a new trainer
router.post('/', trainerController.createTrainer);

// Get all trainers
router.get('/', trainerController.getAllTrainers);

// Get a single trainer by ID
router.get('/:id', trainerController.getTrainerById);

// Update a trainer by ID
router.put('/:id', trainerController.updateTrainerById);

// Delete a trainer by ID
router.delete('/:id', trainerController.deleteTrainerById);

module.exports = router;
