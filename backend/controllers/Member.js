const Member = require('../models/Member');
const User = require('../models/User');

// Function to calculate end date based on bundle
const calculateEndDate = (registeredDate, bundle) => {
  const date = new Date(registeredDate);
  switch (bundle) {
    case '1 month':
      date.setMonth(date.getMonth() + 1);
      break;
    case '3 months':
      date.setMonth(date.getMonth() + 3);
      break;
    case '6 months':
      date.setMonth(date.getMonth() + 6);
      break;
    case '12 months':
      date.setFullYear(date.getFullYear() + 1);
      break;
    default:
      throw new Error('Invalid bundle duration');
  }
  return date;
};

// Create a new member
exports.createMember = async (req, res) => {
  try {
    const { name, email, password, bundle } = req.body;

    // Calculate end date based on bundle
    const registeredDate = new Date(); // Assuming the registration date is today
    const endDate = calculateEndDate(registeredDate, bundle);

    // Create a new User
    const newUser = new User({
      firstname: name.split(' ')[0], // Assuming the first word in name is the firstname
      lastname: name.split(' ')[1] || '', // Assuming the second word in name is the lastname
      email,
      password,
      role: 'member',
    });

    const savedUser = await newUser.save();

    // Create a new Member
    const newMember = new Member({
      name,
      email,
      password: savedUser.password,
      registeredDate,
      endDate,
      bundle,
      user: savedUser._id,
    });

    const savedMember = await newMember.save();

    res.status(201).json({ message: 'Member created successfully', member: savedMember });
  } catch (error) {
    res.status(500).json({ message: 'Error creating member', error: error.message });
  }
};

// Get all members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().populate('user');
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members', error: error.message });
  }
};

// Get a specific member by ID
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate('user');
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching member', error: error.message });
  }
};

// Update a member
exports.updateMember = async (req, res) => {
  try {
    const { name, email, bundle } = req.body;
    const member = await Member.findById(req.params.id);

    if (!member) return res.status(404).json({ message: 'Member not found' });

    member.name = name || member.name;
    member.email = email || member.email;
    member.bundle = bundle || member.bundle;

    // Recalculate end date if the bundle changes
    if (bundle) {
      member.endDate = calculateEndDate(member.registeredDate, bundle);
    }

    const updatedMember = await member.save();

    res.status(200).json({ message: 'Member updated successfully', member: updatedMember });
  } catch (error) {
    res.status(500).json({ message: 'Error updating member', error: error.message });
  }
};

// Delete a member
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) return res.status(404).json({ message: 'Member not found' });

    await member.remove();

    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member', error: error.message });
  }
};

