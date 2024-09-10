const mongoose = require('mongoose');
const Trainer = require('../models/Trainer'); // Update with the correct path to your Trainer model
const Class = require('../models/Class'); // Update with the correct path to your Class model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gym-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const seedData = async () => {
  try {
    // Clear existing data
    await Trainer.deleteMany({});
    await Class.deleteMany({});

    // Create classes
    const classes = await Class.create([
      {
        name: 'Yoga Basics',
        description: 'An introductory yoga class for beginners.',
        days: ['Monday', 'Wednesday'],
        time: '6:00 PM',
        duration: 60,
        capacity: 20
      },
      {
        name: 'Advanced Pilates',
        description: 'A challenging Pilates class for experienced practitioners.',
        days: ['Tuesday', 'Thursday'],
        time: '7:00 PM',
        duration: 45,
        capacity: 15
      },
      {
        name: 'Cardio Kickboxing',
        description: 'High-intensity cardio kickboxing class.',
        days: ['Friday'],
        time: '5:00 PM',
        duration: 60,
        capacity: 25
      }
    ]);

    // Create trainers
    await Trainer.create([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '555-1234',
        specialties: ['Yoga', 'Pilates'],
        classes: [classes[0]._id, classes[1]._id], // References to class IDs
        imagePath: 'path/to/image1.jpg'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phoneNumber: '555-5678',
        specialties: ['Pilates', 'Stretching'],
        classes: [classes[1]._id], // References to class IDs
        imagePath: 'path/to/image2.jpg'
      },
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        phoneNumber: '555-8765',
        specialties: ['Kickboxing', 'Cardio'],
        classes: [classes[2]._id], // References to class IDs
        imagePath: 'path/to/image3.jpg'
      }
    ]);

    console.log('Sample data inserted successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error inserting data:', err);
    mongoose.connection.close();
  }
};

seedData();
