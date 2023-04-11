// Installer les modules nécessaires
const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const uniqueValidator = require('mongoose-unique-validator');

const sauceRoutes = require('./routes/sauce');

// Creation d'une application express
const app = express(); 

// Se connecter à la base de données mongodb, en utilisant la méthode mongoose.connect
mongoose.connect('mongodb+srv://vjeanty02:jesus123@cluster0.1sagvzb.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Définir un schéma pour les données (utilisateurs)
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

mongoose.model('User', userSchema);

// Utiliser le middleware express.json() pour parser les requêtes avec des données au format JSON
app.use(express.json());

// Définir les options du middleware cors
const corsOptions = {
  origin: '*', // Autoriser toutes les origines
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'Authorization'], // Autoriser les en-têtes spécifiés
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Autoriser les méthodes spécifiées
}

// Utiliser le middleware cors avec les options définies seulement pour la route /sauces
app.use('/api/sauces', cors(corsOptions));
app.use('/api/sauces', sauceRoutes);
module.exports = app;