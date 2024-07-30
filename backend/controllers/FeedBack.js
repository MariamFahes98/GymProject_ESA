const Feedback = require('../models/FeedBack'); // Assuming feedback.js is the model file

// Create new feedback
exports.createFeedBack = async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json(feedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all feedback
exports.getAllFeedBack = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('user');
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get feedback by ID
exports.getFeedBackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id).populate('user');
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json(feedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update feedback
exports.updateFeedBack = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json(feedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete feedback
exports.deleteFeedBack = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
