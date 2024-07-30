const Class = require('../models/Class'); 

// Create new class
exports.createClass = async (req, res) => {
    try {
        const newClass = new Class(req.body);
        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all classes
exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate('trainer').populate('bookings');
        res.status(200).json(classes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get class by ID
exports.getClassById = async (req, res) => {
    try {
        const classObj = await Class.findById(req.params.id).populate('trainer').populate('bookings');
        if (!classObj) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json(classObj);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update class
exports.updateClass = async (req, res) => {
    try {
        const classObj = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!classObj) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json(classObj);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete class
exports.deleteClass = async (req, res) => {
    try {
        const classObj = await Class.findByIdAndDelete(req.params.id);
        if (!classObj) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
