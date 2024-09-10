const express = require('express');
const router = express.Router();
const classController = require('../controllers/Class');

router.get('/count', classController.getClassCount);

router.get('/capacities', classController.getClassCapacities);

// Create new class
router.post('/', classController.createClass);

// Get all classes
router.get('/', classController.getAllClasses);


// Update class
router.put('/:id', classController.updateClass);

// Delete class
router.delete('/:id', classController.deleteClass);

// Route to get the class count
router.get('/count', classController.getClassCount);

// Get class by ID
router.get('/:id', classController.getClassById);

module.exports = router;
