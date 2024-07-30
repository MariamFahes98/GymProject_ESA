const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/Booking');

// Create new booking
router.post('/', bookingController.createBooking);

// Get all bookings
router.get('/', bookingController.getAllBookings);

// Get booking by ID
router.get('/:id', bookingController.getBookingById);

// Update booking
router.put('/:id', bookingController.updateBooking);

// Delete booking
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
