const Class = require('../models/Class');
const Member = require('../models/Member');

// Create new class
exports.createClass = async (req, res) => {
    try {
        const { trainerIds, ...classData } = req.body;
        const newClass = new Class({ ...classData, trainers: trainerIds });
        await newClass.save();

        if (Array.isArray(trainerIds)) {
            await Trainer.updateMany(
                { _id: { $in: trainerIds } },
                { $push: { classes: newClass._id } }
            );
        }

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

// Register a member for a class
exports.registerForClass = async (req, res) => {
    try {
        const { memberId, classId } = req.body;

        const member = await Member.findById(memberId);
        const classToRegister = await Class.findById(classId);

        if (!member) return res.status(404).json({ message: 'Member not found' });
        if (!classToRegister) return res.status(404).json({ message: 'Class not found' });

        // Define bundle limits
        const bundleLimits = {
            'bronze': 1,
            'silver': 2,
            'gold': 4
        };

        // Check the member's bundle
        const allowedClasses = bundleLimits[member.bundle.toLowerCase()] || 0;
        if (member.classes.length >= allowedClasses) {
            return res.status(400).json({ message: `Bundle limit reached. You can register up to ${allowedClasses} classes.` });
        }

        // Check if already registered
        if (member.classes.includes(classId)) {
            return res.status(400).json({ message: 'Already registered for this class' });
        }

        // Add class to member's classes
        member.classes.push(classId);
        await member.save();

        // Add member to class's registered members
        classToRegister.bookings.push(memberId);
        await classToRegister.save();

        res.status(200).json({ message: 'Successfully registered for class', member });
    } catch (error) {
        res.status(500).json({ message: 'Error registering for class', error: error.message });
    }
};
// Get the count of all classes
exports.getClassCount = async (req, res) => {
    try {
        const classCount = await Class.countDocuments();
        res.status(200).json({ count: classCount });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get class capacities
exports.getClassCapacities = async (req, res) => {
    try {
        const classes = await Class.find({}, 'name capacity'); // Fetch only name and capacity
        res.status(200).json(classes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

