require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const BookingRoutes = require('./routes/Booking');
const CategoryRoutes = require('./routes/Category');
const ClassRoutes = require('./routes/Class');
const feedbackRoutes = require('./routes/Feedback');
const ProductRoutes = require('./routes/Product');
const ScheduleRoutes = require('./routes/Schedule');
const TrainerRoutes = require('./routes/Trainer');
const UserRoutes = require('./routes/User');

app.use('/Booking',BookingRoutes);
app.use('/Category',CategoryRoutes);
app.use('/Class',ClassRoutes);
app.use('/Feedback',feedbackRoutes);
app.use('/Product',ProductRoutes);
app.use('/Schedule',ScheduleRoutes);
app.use('/Trainer',TrainerRoutes);
app.use('/User',UserRoutes);


app.listen(3000 ,() => console.log('Server is started'))

// https://www.youtube.com/watch?v=fgTGADljAeg

