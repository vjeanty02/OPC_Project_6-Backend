// Installer les modules nécessaires
const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const helmet = require('helmet');
const Ddos = require('ddos');
const ddos = new Ddos;

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const path = require('path');

// Creation d'une application express
const app = express(); 

// Se connecter à la base de données mongodb, en utilisant la méthode mongoose.connect
mongoose.connect(process.env.DB_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Utiliser le middleware express.json() pour parser les requêtes avec des données au format JSON
app.use(express.json());

const imagesPath = path.join(__dirname, 'images');
app.use('/images', express.static(imagesPath));
app.use(helmet());
app.use(ddos.express);

// Définir les options du middleware cors
const corsOptions = {
  origin: '*', // Autoriser toutes les origines
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'Authorization'], // Autoriser les en-têtes spécifiés
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Autoriser les méthodes spécifiées
}
app.use(cors(corsOptions))

// Utiliser le middleware cors avec les options définies seulement pour la route /sauces
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;