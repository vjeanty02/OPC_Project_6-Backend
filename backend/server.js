//Etapes necessaires pour la creation d'un server web avec express

// Installer les modules nécessaires
const express = require('express'); 
const mongoose = require('mongoose');

// Définir le port d'écoute
const port = process.env.PORT || 3000;

// creation d'une application express
const app = express(); 

// Se connecter à la base de données mongodb, en utilisant la méthode mongoose.connect
mongoose.connect('mongodb+srv://vjeanty02:jesus123@cluster0.1sagvzb.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Définir un schéma pour les données
const thingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true }
});

// Créer un modèle à partir du schéma
const Thing = mongoose.model('Thing', thingSchema);

// Middleware pour gérer les requêtes
app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
    next();
  });

// Créer une route GET qui retournera tous les produits
app.get('/api/sauces', (req, res) => {
  Thing.find()
    .then(Products => res.status(200).json({products:Products}))
    .catch(error => res.status(400).json({ error }));
});

// Créer une route GET qui retournera le produit avec le_id fourni
app.get('/api/sauces/:id', (req, res) => {
  Thing.findOne({ _id: req.params.id })
  .then(thing => res.status(200).json({product:thing}))
  .catch(error => res.status(404).json({ error }));
});

// Démarre le serveur et affiche un message dans la console
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

