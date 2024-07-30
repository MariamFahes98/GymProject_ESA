
const express = require('express');
const router = express.Router();
const feedBackController = require('../controllers/FeedBack');

// Create new feedback
router.post('/', feedBackController.createFeedBack);

// Get all feedback
router.get('/', feedBackController.getAllFeedBack);

// Get feedback by ID
router.get('/:id', feedBackController.getFeedBackById);

// Update feedback
router.put('/:id', feedBackController.updateFeedBack);

// Delete feedback
router.delete('/:id', feedBackController.deleteFeedBack);

module.exports = router;
