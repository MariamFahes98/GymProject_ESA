const Trainer = require('../models/Trainer');


// Create new trainer
exports.createTrainer = async (req, res) => {
    try {
        const trainer = new Trainer(req.body);
        if (req.file) {
            trainer.imagePath = req.file.filename; // Store only the filename
        }
        await trainer.save();
        res.status(201).json(trainer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update trainer by ID
exports.updateTrainerById = async (req, res) => {
    try {
        const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (req.file) {
            trainer.imagePath = req.file.filename; // Store only the filename
        }
        await trainer.save();
        res.status(200).json(trainer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTrainerById = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id).populate({
            path: 'classes',
            select: 'name' // Only select the title of the class
        });
        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }
        res.status(200).json(trainer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find().populate({
            path: 'classes',
            select: 'name' // Only select the title of the class
        });
        res.status(200).json(trainers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a trainer by ID
exports.deleteTrainerById = async (req, res) => {
    try {
        const trainer = await Trainer.findByIdAndDelete(req.params.id);
        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }
        res.status(200).json({ message: 'Trainer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get the count of all trainer
exports.getTrainerCount = async (req, res) => {
    try {
        const trainerCount = await Trainer.countDocuments();
        res.status(200).json({ count: trainerCount });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get the first 4 trainers created (oldest trainers)
exports.getOldestTrainers = async (req, res) => {
    try {
        const oldestTrainers = await Trainer.find().sort({ createdAt: 1 }).limit(4);
        res.status(200).json(oldestTrainers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
