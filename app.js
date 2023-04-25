// Installer les modules nécessaires
const express = require('express'); 
const mongoose = require('mongoose');
require('dotenv').config()
const helmet = require('helmet');
const { swaggerUi, swaggerSpec } = require('./swagger.js')
const Ddos = require('ddos');
const ddos = new Ddos;

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const swaggerDocument = require('./swagger.json')

const path = require('path');

// Creation d'une application express
const app = express(); 

// Se connecter à la base de données mongodb, en utilisant la méthode mongoose.connect
mongoose.connect(process.env.DB_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Utiliser le middleware express.json() pour parser les requêtes avec des données au format JSON
app.use(express.json());

const imagesPath = path.join(__dirname, 'images');
app.use('/images', express.static(imagesPath));
app.use(helmet());
app.use(ddos.express);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;