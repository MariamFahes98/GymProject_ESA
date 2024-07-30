const express = require('express');
const router = express.Router();
const classController = require('../controllers/Class');

// Create new class
router.post('/', classController.createClass);

// Get all classes
router.get('/', classController.getAllClasses);

// Get class by ID
router.get('/:id', classController.getClassById);

// Update class
router.put('/:id', classController.updateClass);

// Delete class
router.delete('/:id', classController.deleteClass);

module.exports = router;
