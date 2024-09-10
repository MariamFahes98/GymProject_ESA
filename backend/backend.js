const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoutes');
require('dotenv').config();
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Utilisation des routes d'authentification
app.use('/api/auth', userRoutes);

mongoose.connect('mongodb://localhost:27017/gym_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



/*vrai sans le code de forgot pass
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoutes');
require('dotenv').config();
const app = express();
//const port = 5001;
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/gym_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

app.use('/api/auth/', userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
*/





















































/*//backend/backend.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import des routes
const productRoutes = require('./routes/Product');
const categoryRoutes = require('./routes/Category');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/gym-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/

/*
//code initial de ce page
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/Product');
const categoryRoutes = require('./routes/Category'); 
//const categoryRoutes = require('./routes/User');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/gym-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes); 
//app.use('/api/user')
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/

