const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainerSchema = new Schema({
    firstName: {type: String,required: true},
    lastName: {type: String,required: true},
    email: {type: String,required: true,unique: true},
    phoneNumber: String,
    specialties: [String],
    classes: [{type: Schema.Types.ObjectId,ref: 'Class'}]
}, { timestamps: true });

module.exports = mongoose.model('Trainer', trainerSchema);