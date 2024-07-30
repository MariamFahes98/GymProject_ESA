const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/Schedule');

// Create a new schedule
router.post('/', scheduleController.createSchedule);

// Get all schedules
router.get('/', scheduleController.getAllSchedules);

// Get a single schedule by ID
router.get('/:id', scheduleController.getScheduleById);

// Update a schedule by ID
router.put('/:id', scheduleController.updateScheduleById);

// Delete a schedule by ID
router.delete('/:id', scheduleController.deleteScheduleById);

module.exports = router;
