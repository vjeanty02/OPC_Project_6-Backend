// Installer les modules nécessaires
const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const uniqueValidator = require('mongoose-unique-validator');


const Sauce = require('./models/Sauce.js');

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
app.use('/api/sauces', cors(corsOptions))

// Créer une route GET qui retournera tous les produits
app.get('/api/sauces', (req, res) => {
Sauce.find()
    .then(Sauces => {
      res.status(200).json({products:Sauces});
      console.log('GET request successful');
    })
    .catch(error => {
      res.status(400).json({ error });
      console.log('GET request failed. Error:', error);
    });
});

// Créer une route GET qui retournera le produit avec l'_id fourni
app.get('/api/sauces/:id', (req, res) => {
Sauce.findOne({ _id: req.params.id })
  .then(Sauce => {
    res.status(200).json({product:Sauce});
    console.log('GET:id request successful');
  })
  .catch(error => {
    res.status(404).json({ error });
    console.log('GET request failed. Error:', error);
  });
});

// Créer une route POST qui créera un nouveau Product dans la base de données, en utilisant la méthode app.post d’express
app.post('/api/sauces', (req, res) => {
  delete req.body._id;
  const sauce = new Sauce({
    ...req.body
  });
  sauce.save()
  .then(Sauce => {
    res.status(200).json({product:Sauce});
    console.log('POST request successful');
  })
  .catch(error => {
    res.status(404).json({ error });
    console.log('POST request failed. Error:', error);
  });
});

// Créer une route PUT qui modifiera le produit avec l'_id fourni
app.put('/api/sauces/:id', (req, res) => {
Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(() => {
    res.status(200).json({ product: req.body});
    console.log('PUT request successful');
  })
  .catch(error => {
    res.status(400).json({ error });
    console.log('PUT request failed. Error:', error);
  });
});

// Créer une route DELETE qui supprimera le produit avec le _id fourni
app.delete('/api/sauces/:id', (req, res) => {
Sauce.deleteOne({ _id: req.params.id })
  .then(() => {
    res.status(200).json({ message: 'Objet supprimé !'})
    console.log('DELETE request successful');
})
  .catch(error => {
    res.status(400).json({ error })});
    console.log('DELETE request failed. Error:', error);
});

module.exports = app;