const Trainer = require('../models/Trainer');

// Create a new trainer
exports.createTrainer = async (req, res) => {
    try {
        const trainer = new Trainer(req.body);
        await trainer.save();
        res.status(201).json(trainer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all trainers
exports.getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find().populate('classes');
        res.status(200).json(trainers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single trainer by ID
exports.getTrainerById = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id).populate('classes');
        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }
        res.status(200).json(trainer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a trainer by ID
exports.updateTrainerById = async (req, res) => {
    try {
        const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('classes');
        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }
        res.status(200).json(trainer);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
