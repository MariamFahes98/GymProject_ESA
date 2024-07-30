const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookingSchema = new Schema({
    user: {type: Schema.Types.ObjectId,ref: 'User',required: true },
    class: {type: Schema.Types.ObjectId,ref: 'Class',required: true},
    date: {type: Date,required: true},
    status: {type: String,enum: ['booked', 'canceled', 'completed'],default: 'booked'}
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);