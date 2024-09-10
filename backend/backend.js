//backend.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoutes');
require('dotenv').config();

const productRoutes = require('./routes/Product');
const categoryRoutes = require('./routes/Category'); 
const trainerRoutes = require('./routes/Trainer');
const classRoutes = require('./routes/Class');
const bookingRoutes = require('./routes/Booking');
const memberRoutes =require('./routes/Member');
const feedBackRoutes = require('./routes/FeedBack');
const scheduleRoutes = require('./routes/Schedule');



const uploadRoutes = require('./routes/Upload');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());




mongoose.connect('mongodb://localhost:27017/gym-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes); 
app.use('/api/trainers', trainerRoutes);
app.use('/api/class', classRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/members',memberRoutes);

// Utilisation des routes d'authentification
app.use('/api/auth', userRoutes);






app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
